# BIT HUB implementation

BIT HUB extends the existing Next.js 16 / React 19 / Supabase app. The default entry opens `/hub`; existing Library routes, subjects, resources, progress, login, and administration remain available. The Library dashboard has a BIT HUB button, and the Hub sidebar links back to `/dashboard`.

## What is implemented

- Screenshot-led cyan HUD dashboard, existing Orbitron / Rajdhani / Share Tech Mono fonts, matrix background, framed sidebar, compact discovery cards, skill radar, community activity, and hackathon list. Responsive navigation at tablet/mobile widths.
- Student profiles with department, college, year, bio, skills, portfolio URL, availability, and campus/private visibility. The Hub public-facing profile never selects email from Library profiles.
- Discovery by text, skill, year and availability; connection requests and recipient acceptance.
- Bubble waiting rooms and teams with configurable capacities, atomic joins, automatic host membership, member-only message history, 50-message pagination, live Postgres Changes subscriptions, reconnect history refresh, and message rate limiting.
- Project title, description, domain, technologies, HTTPS repository/demo links, optional cover image upload to Neon Object Storage, pending/approved/rejected/archive state, portfolio display, and owner archiving. PNG/JPEG/WebP only, up to 5 MB. Project records live in Neon; see [BIT HUB project storage on Neon](NEON_PROJECTS.md).
- A trusted project XP ledger in Neon: five points once per approved project (configurable through Supabase `hub_policy`); pending submissions cannot assign XP; reapproval is idempotent; archiving/rejecting revokes points while preserving the ledger row.
- Leaderboard, stable tie ordering by XP descending/name/ID, notifications, and a Courses entry into the original Library.
- An explicit interactive demo, with synthetic students/events/projects in `frontend/src/lib/hub/demo.ts`. It uses sessionStorage only and never writes sample data to the database. `?demo=1` enables it in development. Production requires real sign-in unless `NEXT_PUBLIC_HUB_DEMO_ENABLED=true` is explicitly set. New demo projects remain pending and do not create fake approval points.
- Bubble and team lifecycle: every room is visible to all signed-in students, joining is atomic with a one-room-per-student rule (joining moves you out of your previous room; full rooms refuse with a clear message), members can exit any time, and hosts can cancel their room or remove members. Team rooms support host invitations with accept/decline, host finalisation of the finalist list, a hackathon end date, live typing indicators ("X is typing…") with names in the roster, and automatic deletion of team rooms once their end date passes.

## Run locally

From `frontend`, run `npm install` if dependencies are not installed, then `npm run dev:fast`. It keeps the build directory on local disk (`/tmp/bithub-dev`) instead of the slow project drive, which makes page loads and hot reloads several times faster; plain `npm run dev -- --webpack` still works on fast disks. Open `http://localhost:3000/hub?demo=1` for the interactive demo. The existing local environment remains in use; do not commit credentials. Use `npm run build` for the production build.

## Database activation required

The Arun Supabase connection now has access to the configured project (`wyczuyicyswcdsrcbfwa`). The collaboration and review/metrics migrations were applied on 2026-11-02. The remaining Hub tables (profiles, rooms, messages, connections, notifications, hackathons) have RLS; messages and notifications are published for Realtime. Local database tests use isolated PostgreSQL 17 with minimal Supabase auth/storage contracts.

Project records, project XP, and cover images have moved out of Supabase. Apply `database/neon_projects.sql` once to the Neon database and set the server-only `NEON_DATABASE_URL`; create the private `uploads` bucket with `neon deploy` and set the `AWS_*` variables. See [Neon project storage](NEON_PROJECTS.md). The legacy `public.hub_projects` table, its RPCs, and the `hub-covers` bucket created by the Supabase migrations are retained for history but are no longer written or read by the BIT HUB project UI.

Apply the SQL files in `supabase/migrations` in timestamp order once through that project's SQL editor or the team's normal migration process. It is transactional and additive. Do not reset the existing database. The migration expects the existing `public.profiles`, Supabase auth/storage schemas, and Supabase roles. It adds only `hub_*` objects and a `hub_private` internal schema. On a normal Supabase instance it adds messages/notifications to `supabase_realtime`.

Then use two verified `@bitsathy.ac.in` accounts to verify actual sign-in, storage uploads/signed image URLs, multi-client live messages, reconnect behavior, notification delivery, and visibility policies against the deployed service. The frontend reuses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or the existing anon-key fallback); no new secret is required.

## Configurable policy

`hub_policy` is readable by students but writable only by trusted administrators/service role:

- `max_projects = NULL`: unlimited total projects. Twenty submissions per hour limits bursts. An optional positive total limit can be set without changing the UI.
- `project_xp = 5`: points awarded on the first approval and recorded in the Neon project ledger. Existing ledger values do not change when policy changes.
- `max_room_capacity = 16`, `max_owned_rooms = 20`.
- `hub_domains`: domain lookup table. The current interface exposes the seven initial domains; add new UI options alongside new domain records.

Trusted reviewers use `/hub/review` to approve or reject pending submissions. Review access requires a confirmed account with server-managed `app_metadata.role = admin` or an existing allowlisted Library administrator email. User-editable metadata cannot grant access. Reviewers cannot approve their own projects; the database records reviewer identity and time. Repeated approvals cannot duplicate points. The review queue displays the oldest 100 submissions and refreshes after each decision. Browser roles have no direct project-update or ledger-write privileges.

Review the repository URL and evidence before approval. Duplicate active titles per owner and duplicate active repository URLs are rejected. These checks are not semantic plagiarism detection. Trusted reviewers manage `hub_hackathons`; no unverified external events are auto-published.

## Access and limits

All Hub tables in Supabase have row-level security and explicit grants. Project records are held in Neon behind authenticated server routes, so browser roles never receive the Neon connection string or direct write access. Student access requires a confirmed campus email. Private profiles and their projects are excluded from other users' queries. Members can read room history; after leaving they lose access. Teams are open campus rooms with capacity controls, rather than approval-based private teams. Hub administrators (`hub_private.is_admin()` — confirmed email from the named allowlist or server-managed `app_metadata.role='admin'`) additionally get a superuser view in the ADMIN TERMINAL: a live room directory with per-room online counts, cross-room message logs, and the ability to cancel any bubble or team room. Students cannot see rooms they have not joined and have no cancellation path; the host restriction is unchanged. Every administrator read and cancellation is recorded in `hub_private.hub_admin_actions`, which browser roles cannot query, and cancelled-room owners receive a notification.

The XP ledger is separate from skill evidence. Radar values are `min(5, declared-domain membership + approved projects in that domain)`. They do not claim verified expertise. Achievements are reserved in the dashboard layout and currently show zero; achievement submission, credential verification, DMs, typing/read receipts, user blocking/reporting, account deletion, webhook delivery are not part of this release. Do not advertise them as implemented. Messages are stored as plaintext under membership RLS and transported using Supabase's secure connection; **end-to-end encryption is not implemented** and the UI says so.

Discovery/showcase currently load up to 500 visible students/projects; rooms and upcoming events load up to 100. Dashboard totals and your rank use merged Supabase profile data and Neon project aggregates, subject to visibility checks. Your own profile is fetched separately so it remains editable beyond the first 500 students. Before a larger campus rollout, add paginated discovery/leaderboard endpoints. Cover uploads and multi-client Realtime still need verification on the actual deployment. Cover size/type limits are enforced by the project API before upload.

## Validation

- Production build completed successfully, including `/hub` and all preserved Library routes.
- TypeScript project check passed.
- Five project-input validation tests passed (title/description/domain limits, HTTPS-only links, technology normalization/cap, UUID checks) via `node --experimental-strip-types frontend/tests/hub-project-validation.test.mjs`.
- Three message-ordering tests passed, covering delayed history responses, reconnect duplicates, room isolation, and equal-timestamp ordering (`node --experimental-strip-types frontend/tests/hub-messages.test.mjs`).
- Hub-scoped ESLint: no errors (the native image warning is intentional for remote and data-URL covers).
- 25 isolated PostgreSQL checks for the legacy Supabase project schema still pass as regression coverage: RLS, profile upsert, anonymous/non-campus denial, protected XP/review writes, pending-project privacy, duplicate submission rejection, membership/capacity, idempotent join and approval, persisted message history, upload ownership, connection acceptance, notifications, private discovery, XP revocation, and Library-profile preservation. The live project path is now the Neon API, verified with schema/query smoke tests against the Neon database.
- Browser demo checks passed for filters/search, connection requests, bubble join/send, team creation, project submission, unchanged XP while pending, profile editing, leaderboard, reload persistence, and mobile navigation. No browser runtime exceptions.
- Desktop/tablet/mobile visual inspection preserves screenshot-specific gradients, glow, uppercase labels, strong cyan borders and three existing fonts intentionally. These are user-required exceptions to the design skill defaults. Initial cold development compilation delayed hydration; interaction checks explicitly wait for the populated page. Final visual measurements at 1680, 768 and 390 pixels had zero failures; the compact secondary text warning is retained to match the supplied dashboard. Screenshots showed aligned panels and no horizontal page overflow.

The SQL test files are under `database/tests/`. `hub-bootstrap.sql` is **only** for a disposable empty PostgreSQL database; never apply it to Supabase or production. Run bootstrap, all migrations, `hub-integration.sql`, and `hub-review.sql` using `psql -v ON_ERROR_STOP=1` on a fresh test database. The integration test rolls back its sample records. `hub-admin-surveillance.sql` covers the administrator superuser: cross-room surveillance, live logs, cancellation, audit attribution, and the student denials for each.

## Production hardening

Google sign-in uses PKCE with a server-verified callback, restricted return paths, shared session refresh, explicit sign-out, and production demo gating. The legacy shared-key administrator bypass and embedded signing keys are removed. Backend roles use trusted app metadata, never user-editable metadata. Private navigation and API responses are excluded from service-worker caching. See `deployment.md` for the exposed legacy credential rotation prerequisite and hosting configuration.

Additional checks: two auth/redirect tests and twelve moderation/metrics database checks cover untrusted-role denial, reviewer authorization, self-review prevention, idempotent awards, rejection notifications, private ranking and reviewer audit identity on the legacy Supabase project schema. The live project API repeats the self-review and idempotency rules against Neon.

Legacy Library administrative upload, file deletion, poll-management, analytics and storage APIs now verify server-side admin permissions. Voting derives the voter ID from the verified session. Four additional auth-policy tests check confirmed campus access, trusted roles and rejection of user-editable admin claims.

The live audit also identified missing RLS on legacy hackathon/session tables and broadly callable legacy privileged functions. The third migration targets only the two tables. The broader function proposal in `docs/proposals/legacy-function-security-review.sql` was rejected by automatic approval review because of possible service disruption and has NOT been applied. It needs a separate reviewed rollout. Authentication and multi-user browser acceptance still require real campus users.
