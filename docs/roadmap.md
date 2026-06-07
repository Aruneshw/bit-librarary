# ARC_OS — Development Roadmap

## Phase 1 — Foundation (Est: 2 hours)
- [x] Documentation suite (architecture, database, api, design-system, roadmap)
- [x] Next.js 15 project scaffold with TypeScript + Tailwind
- [x] Express.js backend scaffold
- [x] Design tokens + globals.css + dot-grid background
- [x] Tailwind config with custom theme
- [x] Database schema.sql + seed.sql
- [x] Supabase client library setup

## Phase 2 — Authentication (Est: 3 hours)
- [x] 5-step boot sequence animation
- [x] Authorization screen with glassmorphism card
- [x] Google OAuth flow via Supabase
- [x] @bitsathy.ac.in domain validation
- [x] Department selector dropdown
- [x] Route protection middleware
- [x] Zustand auth store

## Phase 3 — Dashboard (Est: 4 hours)
- [x] ARC Reactor CSS fallback (spinning rings + concentric circles)
- [x] Post-login intro animation sequence
- [x] Subject orbit layout (desktop ≥1024px)
- [x] Subject card stack (mobile <768px)
- [x] Subject card with completion ring
- [x] First-time tutorial modal
- [x] Dashboard page assembly
- [x] Zustand subject store

## Phase 4 — Learning Flow (Est: 3 hours)
- [x] Subject page with animated progress bar
- [x] Question list component (ID + title + status)
- [x] Question modal with scale+fade animation
- [x] Close: double-click / ESC / × button
- [x] View tracking + Supabase sync (debounced 300ms)
- [x] 100% completion celebration overlay
- [x] Zustand progress store

## Phase 5 — Backend API (Est: 2 hours)
- [x] Express server with CORS, helmet
- [x] JWT auth middleware
- [x] Routes: auth, profile, subjects, questions, progress, settings
- [x] Controllers + Services + Supabase admin client

## Phase 6 — Polish (Est: 2 hours)
- [x] Full responsive audit
- [x] Error states + loading skeletons
- [x] Performance optimization (Lighthouse 90+)
- [x] Final QA + walkthrough document
- [x] Local offline Mock Mode fallback for preview
