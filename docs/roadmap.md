# ARC_OS — Development Roadmap

## Phase 1 — Foundation (Est: 2 hours)
- [x] Documentation suite (architecture, database, api, design-system, roadmap)
- [ ] Next.js 15 project scaffold with TypeScript + Tailwind
- [ ] Express.js backend scaffold
- [ ] Design tokens + globals.css + dot-grid background
- [ ] Tailwind config with custom theme
- [ ] Database schema.sql + seed.sql
- [ ] Supabase client library setup

## Phase 2 — Authentication (Est: 3 hours)
- [ ] 5-step boot sequence animation
- [ ] Authorization screen with glassmorphism card
- [ ] Google OAuth flow via Supabase
- [ ] @bitsathy.ac.in domain validation
- [ ] Department selector dropdown
- [ ] Route protection middleware
- [ ] Zustand auth store

## Phase 3 — Dashboard (Est: 4 hours)
- [ ] ARC Reactor Three.js component (lazy-loaded)
- [ ] ARC Reactor CSS fallback
- [ ] Post-login intro animation sequence
- [ ] Subject orbit layout (desktop ≥1024px)
- [ ] Subject card stack (mobile <768px)
- [ ] Subject card with completion ring
- [ ] First-time tutorial modal
- [ ] Dashboard page assembly
- [ ] Zustand subject store

## Phase 4 — Learning Flow (Est: 3 hours)
- [ ] Subject page with animated progress bar
- [ ] Question list component (ID + title + status)
- [ ] Question modal with scale+fade animation
- [ ] Close: double-click / ESC / × button
- [ ] View tracking + Supabase sync (debounced 300ms)
- [ ] 100% completion celebration overlay
- [ ] Zustand progress store

## Phase 5 — Backend API (Est: 2 hours)
- [ ] Express server with CORS, helmet
- [ ] JWT auth middleware
- [ ] Routes: auth, profile, subjects, questions, progress, settings
- [ ] Controllers + Services + Supabase admin client

## Phase 6 — Polish (Est: 2 hours)
- [ ] Full responsive audit
- [ ] Error states + loading skeletons
- [ ] Performance optimization (Lighthouse 90+)
- [ ] Final QA + walkthrough document
