# BIT HUB production deployment

The repository contains a Next.js frontend (`frontend`) and the existing Library Express API (`backend`). BIT HUB talks to Supabase directly with database-enforced authorization. Keep the existing Library database and backend; do not run the old schema/seed scripts against production.

## Required environment

Use `frontend/.env.local.example` and `backend/.env.example` as templates. Store real values in the hosting provider's secret settings and local ignored environment files.

Frontend:
- `NEXT_PUBLIC_SUPABASE_URL`: the existing project's API URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: its publishable key (legacy anon fallback remains supported).
- `SUPABASE_SERVICE_ROLE_KEY`: server-only secret for existing Library/admin APIs. Never prefix this with `NEXT_PUBLIC_`.
- `NEXT_PUBLIC_API_URL`: the deployed Library API URL, ending in `/api/v1`.
- `NEXT_PUBLIC_HUB_DEMO_ENABLED=false`: production uses real authentication/data. Enable only for explicitly requested public previews.
- Existing optional AI, analytics, upload and Redis secrets must remain server-only as applicable.

Backend: `SUPABASE_URL`, server-only `SUPABASE_SERVICE_ROLE_KEY`, exact `CORS_ORIGIN`, and the existing Redis configuration.

## Security prerequisite

The old repository contained a service-role credential in this document and a custom signing key in source. Those values must be treated as exposed. This release removes the shared-key admin bypass and its signing keys; all API authentication now verifies Supabase-issued sessions. It also stops accepting administrator roles from user-editable metadata.

Rotate the exposed Supabase credential in the project's API-key settings and replace it in every backend/frontend hosting secret and ignored local environment file. Revoke old privileged sessions as appropriate. Removing the text from this commit does not remove it from Git history. Do not publish a replacement credential in Git, chat, or screenshots.

## Google OAuth

1. In Google Cloud, use a Web application OAuth client. The authorized redirect URI is `https://<project-ref>.supabase.co/auth/v1/callback`.
2. In Supabase Authentication → Providers → Google, enable Google and save the client ID/secret there.
3. In Supabase Authentication → URL Configuration, set the Site URL to the actual HTTPS production domain. Allow `https://<production-domain>/auth/callback` and the local development callback `http://localhost:3000/auth/callback`. Add exact preview domains only when needed.
4. The app starts Google PKCE sign-in, verifies the returned session on the server, restricts return paths to app routes, checks confirmed campus identity (plus existing explicitly allowed Library administrators), and redirects to `/hub` by default.
5. Verify the complete sign-in/sign-out/re-login flow with a real campus account. The Google `hd` hint is not an authorization check; database policies enforce campus access.

## Supabase schema

Apply the additive migrations in `supabase/migrations` in timestamp order to the existing Library project. The first migration expects the existing `profiles` table. Never reset the live database. Verify the Hub tables, private `hub-covers` bucket, row-level policies, and Realtime publication afterward.

## Hosting and release

The Git remote is `https://github.com/Aruneshw/bit-librarary.git`. For the existing Vercel deployment, keep Root Directory `frontend`, Build Command `npm run build`, and the Next.js framework preset. The Express Library backend must be deployed separately using its existing host, `npm run build`, and `npm start`.

Push only after tests pass and secrets have been removed from tracked files. A GitHub push may trigger the existing hosting integration; verify the deployment status, live `/login`, `/hub`, and the OAuth return URL afterward. A successful Git push alone is not evidence of a successful live deployment.

Production pages and auth/API responses are not cached by the service worker. Only versioned Next.js static assets use the runtime cache. Protected pages refresh sessions using the Next.js proxy.

See `BIT_HUB.md` for the feature model and current limitations.
