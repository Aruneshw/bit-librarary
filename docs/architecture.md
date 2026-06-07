# ARC_OS — System Architecture

## Overview

ARC_OS is a three-tier web application consisting of a Next.js 15 frontend, an Express.js API backend, and a Supabase PostgreSQL database with built-in authentication.

---

## System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                        │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Next.js 15 Frontend (Vercel)            │   │
│  │                                                      │   │
│  │  ┌─────────┐  ┌──────────┐  ┌───────────────────┐   │   │
│  │  │ App     │  │ Zustand  │  │ React Three Fiber │   │   │
│  │  │ Router  │  │ Store    │  │ (ARC Reactor)     │   │   │
│  │  └────┬────┘  └────┬─────┘  └───────────────────┘   │   │
│  │       │             │                                │   │
│  │  ┌────┴─────────────┴────────────────────────────┐   │   │
│  │  │          Supabase Client SDK                  │   │   │
│  │  │  (Auth, Realtime, Direct DB Reads)            │   │   │
│  │  └───────────────┬───────────────────────────────┘   │   │
│  └──────────────────┼───────────────────────────────────┘   │
│                     │                                       │
└─────────────────────┼───────────────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
┌──────────────────┐   ┌──────────────────────────┐
│  Express.js API  │   │      Supabase Cloud      │
│  (Render)        │   │                          │
│                  │   │  ┌────────────────────┐  │
│  /api/v1/*       │   │  │   PostgreSQL DB    │  │
│                  │   │  │   ─────────────    │  │
│  ┌────────────┐  │   │  │   profiles         │  │
│  │ Auth MW    │──┼──►│  │   subjects         │  │
│  │ Controllers│  │   │  │   questions        │  │
│  │ Services   │  │   │  │   question_views   │  │
│  └────────────┘  │   │  │   settings         │  │
│                  │   │  └────────────────────┘  │
│  Supabase Admin  │   │                          │
│  SDK (Service    │   │  ┌────────────────────┐  │
│  Role Key)       │   │  │   Auth Service     │  │
└──────────────────┘   │  │   Google OAuth     │  │
                       │  └────────────────────┘  │
                       │                          │
                       │  ┌────────────────────┐  │
                       │  │   Row Level        │  │
                       │  │   Security (RLS)   │  │
                       │  └────────────────────┘  │
                       └──────────────────────────┘
```

---

## Data Flow

### Authentication Flow
```
1. User clicks "Sign in with Google"
2. Supabase Auth redirects to Google OAuth
3. Google authenticates → returns token
4. Supabase creates/updates auth.users record
5. Frontend receives session token
6. App checks email domain (@bitsathy.ac.in)
7. If valid → prompt department selection
8. Profile record created/updated in profiles table
9. User redirected to dashboard
```

### Question Viewing Flow
```
1. User navigates to subject page
2. Frontend fetches questions (Supabase client SDK)
3. User clicks question → modal opens
4. User reads content → closes modal
5. Frontend sends POST /progress/mark-viewed to backend
6. Backend (with service role) upserts question_views
7. Frontend updates Zustand store optimistically
8. Progress bar animates to new percentage
9. If 100% → trigger completion celebration
```

### Read vs Write Strategy
```
READS  → Supabase Client SDK (direct, with RLS)
WRITES → Express API (validated, with service role key)
```

This split ensures:
- Fast reads without API roundtrip
- Secure writes with server-side validation
- RLS provides read-level security even for direct access

---

## Component Architecture

```
app/
├── (auth)/
│   └── login/page.tsx          ← Boot sequence + auth
├── dashboard/page.tsx          ← Subject orbit/stack
├── subject/[subject_id]/
│   └── page.tsx                ← Questions + progress
└── layout.tsx                  ← Global providers

components/
├── animations/
│   ├── BootSequence.tsx        ← 5-step boot animation
│   ├── IntroAnimation.tsx      ← Post-login reactor charge
│   └── CompletionCelebration.tsx
├── auth/
│   ├── AuthorizationCard.tsx   ← Login card
│   └── DepartmentSelector.tsx  ← Dept dropdown
├── dashboard/
│   ├── SubjectOrbit.tsx        ← Desktop circular layout
│   ├── SubjectCardStack.tsx    ← Mobile vertical layout
│   └── SubjectCard.tsx         ← Shared card component
├── questions/
│   ├── QuestionList.tsx        ← Question rows
│   └── QuestionModal.tsx       ← Full content modal
├── reactor/
│   ├── ArcReactor.tsx          ← Three.js reactor
│   └── ArcReactorFallback.tsx  ← CSS-only fallback
├── tutorial/
│   └── TutorialModal.tsx       ← First-time onboarding
└── ui/                         ← Shadcn base components

store/
├── authStore.ts                ← User session + profile
├── subjectStore.ts             ← Subjects + mapping
└── progressStore.ts            ← Views + completion %

lib/
├── supabase.ts                 ← Client initialization
├── api.ts                      ← Backend API client
└── utils.ts                    ← Helpers
```

---

## Deployment Architecture

| Service | Platform | URL Pattern |
|---------|----------|------------|
| Frontend | Vercel | `arc-os.vercel.app` |
| Backend | Render | `arc-os-api.onrender.com` |
| Database | Supabase | `*.supabase.co` |

### Environment Variables

**Frontend (.env.local):**
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_URL=
```

**Backend (.env):**
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
PORT=3001
CORS_ORIGIN=
```

---

## Security Model

1. **Authentication**: Google OAuth via Supabase Auth (domain-restricted)
2. **Authorization**: Row Level Security on all tables
3. **API Security**: JWT verification on all Express routes
4. **Client Validation**: Email domain check before OAuth completion
5. **CORS**: Restricted to frontend origin only
