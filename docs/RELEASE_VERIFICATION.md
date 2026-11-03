# BIT HUB release verification — 2026-11-03

Production: https://bit-librarary-fkda.vercel.app/hub

Local source: `/media/aruneshwaran/FDrive/bit-library`

## Database ownership

- Neon Postgres: `bithub.hub_projects` and `bithub.hub_project_xp`.
- Neon Object Storage: private project covers in `uploads`.
- Supabase: Google authentication, profiles, room membership, chat, connections,
  events, notifications, and project policy.
- Production Neon credentials are stored as private Vercel production secrets.
  Preview deployments are not given production Neon credentials.
- Legacy Supabase project tables are retained, but the Hub application writes
  projects and reads project XP through its authenticated Neon API.

## Fixes included

- Named administrator `aruneshownsty1@gmail.com` can access Hub records after
  Google verifies the email. Private-profile and room-membership rules still apply.
- Leaderboards use Neon project XP without adding the legacy project ledger.
- Project archiving and XP revocation use one atomic SQL statement.
- Supabase profile and policy failures produce errors instead of silently using
  empty profiles or default project limits.
- Local edits removing demo writes are preserved. The UI's stale demo link and
  resulting type error are fixed; connection failures remain visible with Retry.
- CI includes every frontend test file and both database schemas.

## Verification evidence

- Four frontend test files cover access rules, redirects, chat ordering, and
  project validation.
- 50 database assertions passed in disposable PostgreSQL 17: 37 existing Hub
  integration/moderation checks, three Gmail-admin checks, and ten Neon checks.
- The live Supabase database accepted profile, room, membership, and message
  writes under authenticated access rules, and read them back. The entire
  transaction was rolled back.
- The live Neon database accepted temporary project and XP writes inside a
  deliberately rolled-back transaction. A follow-up query found no test rows.
- The private Neon storage bucket passed upload, download-content comparison,
  and cleanup verification for a new disposable object.
- The server-side Supabase credential successfully read profile visibility and
  the project policy without returning secrets or personal records in logs.
- All 11 Supabase Hub tables have row-level security enabled. Chat and
  notifications are included in the Realtime publication.
- The live named administrator passes both Hub access and reviewer checks;
  separate local tests deny other Gmail accounts and unconfirmed admins.

## Limits of this verification

These checks do not establish that every browser/device combination or concurrent
multi-user flow has been tested. A full two-user browser chat/notification test
and a real project moderation/upload journey remain acceptance checks. Database
and storage writes were tested independently without publishing fake portfolio
content or creating test user accounts in production.

Existing Library security-advisor warnings about older privileged functions
remain outside this release. The previously blocked broad cleanup proposal has
not been applied. See `proposals/legacy-function-security-review.sql`.

Discovery still has the documented 500-record client limit and profile-visibility
lookup has a 5,000-record server limit. Larger-campus pagination remains future
work; this release does not claim unbounded leaderboard coverage.
