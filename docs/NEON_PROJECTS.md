# BIT HUB project storage on Neon

BIT HUB project records and project XP are stored in **Neon Postgres**, and
project cover images are stored in **Neon Object Storage**. Profiles, rooms,
events, connections, and notifications remain in Supabase. The browser never
receives the Neon connection string or storage credentials.

## Architecture

```
Browser
  └── /api/hub/projects              GET list, POST submit
  └── /api/hub/projects/[id]         PATCH archive
  └── /api/hub/projects/[id]/cover   GET authenticated cover stream
  └── /api/hub/review                GET queue, POST approve/reject
          │
          ├── Neon Postgres  (bithub.hub_projects, bithub.hub_project_xp)
          ├── Neon Object Storage  (private `uploads` bucket)
          └── Supabase service role
                ├── reads hub_profiles (owner name + visibility)
                ├── reads hub_policy (project XP policy)
                └── writes approval/rejection notifications
```

Every route calls `requireApiUser` first. Project list/cover visibility is
enforced on the server: owners see their own non-archived projects, and other
students see approved projects whose owner profile is campus-visible. Review
routes require an allowlisted administrator or `app_metadata.role = admin`.

## Environment

Set these server-only variables (locally in `frontend/.env.local`, and in the
hosting provider's environment settings):

```bash
NEON_DATABASE_URL=postgresql://user:password@host/db?sslmode=require
SUPABASE_SERVICE_ROLE_KEY=...   # already used by other server routes

# Pulled by `neon deploy` for the linked branch. Keep server-only.
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_ENDPOINT_URL_S3=https://<branch>.storage.<region>.aws.neon.tech
AWS_REGION=us-east-2
NEON_STORAGE_BUCKET=uploads     # optional; defaults to uploads
```

`NEON_DATABASE_URL` and every `AWS_*` value must never be prefixed with
`NEXT_PUBLIC_`. `neon deploy` writes the storage values to the root
`.env.local`; copy the `AWS_*` lines into `frontend/.env.local` (or set them in
Vercel) because Next.js reads the app directory.

## Apply the schema

Run once against the Neon database:

```bash
psql "$NEON_DATABASE_URL" -v ON_ERROR_STOP=1 -f database/neon_projects.sql
```

The file creates the `bithub` schema, `bithub.hub_projects`, the
`bithub.hub_project_xp` ledger, indexes, and duplicate-title/repository
constraints. It is additive and safe to re-run.

If the local resolver cannot resolve the Neon host, connect with the pooler
hostname and `hostaddr` (the IPv4 address shown by `dig`):

```bash
psql "host=<pooler-host> hostaddr=<ipv4> port=5432 dbname=neondb \
  user=<user> sslmode=require" -f database/neon_projects.sql
```

## Data model

`bithub.hub_projects`

| Column | Notes |
|---|---|
| `id` | UUID primary key |
| `owner_id` | Supabase auth user UUID |
| `title` / `description` | Length limits enforced by SQL and the API |
| `category` | Must be one of `DOMAINS` in `frontend/src/lib/hub/types.ts` |
| `technologies` | `text[]`, at most 20 items |
| `repository_url` / `demo_url` | Empty or `https://…`, at most 500 chars |
| `cover_key` | Private Neon Object Storage key (`hub-covers/<owner>/<uuid>.<ext>`) or `NULL` |
| `cover_url` | Legacy URL fallback; new covers use `cover_key` |
| `status` | `pending`, `approved`, `rejected`, `archived` |
| `reviewed_at` / `reviewed_by` | Set by `/api/hub/review` |
| `created_at` | Defaults to `now()` |

`bithub.hub_project_xp`

One row per approved project. `points` is read from the existing Supabase
`hub_policy.project_xp` value (default 5) at approval time. Re-approval is
idempotent; archiving sets `revoked_at`. Leaderboard XP is
`Supabase hub_xp_ledger + Neon project XP`, merged in `loadHub`.

## API

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/hub/projects` | Visible projects plus per-owner XP/count stats |
| `POST` | `/api/hub/projects` | Submit a project (`multipart/form-data`; optional `cover` file) |
| `PATCH` | `/api/hub/projects/[id]` | `{ "action": "archive" }` |
| `GET` | `/api/hub/projects/[id]/cover` | Authenticated, visibility-checked cover stream |
| `GET` | `/api/hub/review` | Oldest 100 pending projects (admin only) |
| `POST` | `/api/hub/review` | `{ "projectId": "...", "decision": "approved" \\| "rejected" }` |

Server-side safeguards: confirmed campus/admin session, 20 submissions per
hour, optional `hub_policy.max_projects`, one active title per owner, one
active repository URL across projects, reviewer cannot approve their own
project, and only `pending` projects can be reviewed.

## Cover images

Covers are uploaded by the API with the Files SDK to the private Neon Object
Storage bucket `uploads` under
`hub-covers/<owner-uuid>/<random>.<png|jpg|webp>`. PNG, JPEG, and WebP up to
5 MB are accepted. The object key is stored in
`bithub.hub_projects.cover_key`.

Because the bucket is private, the browser loads covers through
`/api/hub/projects/[id]/cover`. That route checks the Supabase session and the
same visibility rules as the project list before streaming the object. Admins
can view pending covers while reviewing. `NEON_STORAGE_BUCKET` can override the
bucket name; it defaults to `uploads`.

The live smoke test uploaded
`smoke/neon-object-storage-<timestamp>.txt` to the bucket, listed `smoke/`, and
read the same contents back through the Files SDK. The previous Supabase
`hub-covers` bucket and the Vercel Blob cover path are no longer used by the
project flow.

## Moving existing rows

The live `hub_projects` table was empty when this migration was written, so no
data move was required. If another environment has rows, export them with the
Supabase service role and insert them into `bithub.hub_projects`, preserving
`id`, `owner_id`, `status`, `created_at`, and `cover_path` → `cover_url` (legacy
public URL) or upload the file to the `uploads` bucket and set `cover_key`.
Existing `hub_xp_ledger` rows can be copied into `bithub.hub_project_xp`
(project_id, owner_id, points, awarded_at, revoked_at).

## Validation

```bash
cd frontend
npx tsc --noEmit
node --experimental-strip-types tests/hub-project-validation.test.mjs
node --experimental-strip-types tests/auth-redirect.test.mjs
node --experimental-strip-types tests/auth-access.test.mjs
```

With real accounts, verify: student submission (with and without a cover),
owner sees pending project, another student cannot see it until approved,
administrator approval grants XP once, rejection hides it, archive revokes XP,
and the review queue refuses self-review and non-admin access.
