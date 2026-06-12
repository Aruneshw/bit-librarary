# 🔒 BIT LIBRARY — Security Audit Checklist

Run this checklist after every deployment or security-sensitive change.

---

## 10-Point DevTools Verification

### 1. ✅ Network Tab: No Direct Anthropic Calls
- Open Chrome DevTools → Network tab
- Send a chat message from the AI panel
- **Verify**: All requests go to `/api/chat` — NEVER to `api.anthropic.com`

### 2. ✅ Network Tab: No API Key in Headers
- Inspect the `/api/chat` request headers
- **Verify**: No `x-api-key`, `Authorization: Bearer sk-ant-`, or any API key visible

### 3. ✅ Network Tab: Bypass Password is Hashed
- Attempt a bypass login with operator credentials
- Inspect the `/api/auth/bypass` request body
- **Verify**: Body contains `{ "credential": "06ceef..." }` — NEVER plaintext password

### 4. ✅ Build Bundle: No API Key Leaked
```bash
grep -r "ANTHROPIC_API_KEY" .next/
# Expected: NO results (empty output)
```

### 5. ✅ Source Code: No Hardcoded Secrets
```bash
grep -r "sk-ant" ./src/
# Expected: NO results (empty output)

grep -r "NEXT_PUBLIC_ANTHROPIC" ./
# Expected: NO results (empty output)

grep -r "2127" ./src/
# Expected: NO results (password stored only as SHA-256 hash)
```

### 6. ✅ Auth Guard: Unauthenticated Requests Rejected
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'
# Expected: 401 Unauthorized
```

### 7. ✅ Rate Limiting: Excess Requests Rejected
- Send 11+ rapid requests to `/api/chat` within 1 minute
- **Verify**: The 11th request returns `429 Rate limit exceeded`

### 8. ✅ .env.local is Gitignored
```bash
git check-ignore .env.local
# Expected: .env.local (file is ignored)
```

### 9. ✅ Response Contains Only Reply
- Inspect the `/api/chat` response body
- **Verify**: Response is `{ "reply": "..." }` — no API key, no model metadata, no raw errors

### 10. ✅ Browser Console: No Env Variable Leaks
- Open Chrome DevTools → Console
- **Verify**: No environment variable values (API keys, tokens) printed
- Run in console: `JSON.stringify(process.env)` — should return `undefined` or only public vars

---

## Emergency Procedures

### If API Key is Compromised
1. **Immediately** revoke the key at https://console.anthropic.com/settings/keys
2. Generate a new key
3. Update `.env.local` with the new key
4. Redeploy to Vercel
5. Monitor Anthropic dashboard for unauthorized usage

### If Bypass Password is Compromised
1. Compute new SHA-256 hash: `echo -n "NEW_PASSWORD" | sha256sum`
2. Update `VALID_PASSCODE_HASH` in:
   - `src/components/auth/AuthorizationCard.tsx`
   - `src/app/api/auth/bypass/route.ts`
3. Redeploy

---

## Architecture Summary

```
Browser (Client)                    Server (Next.js)
┌─────────────────┐                ┌──────────────────────────┐
│ AIChatPanel.tsx  │──POST /api/──▶│ /api/chat/route.ts       │
│                  │    chat       │  1. Auth guard (Supabase) │
│ ❌ No API key    │               │  2. Validate input (Zod) │
│ ❌ No Anthropic  │               │  3. Rate limit (Upstash) │
│    SDK import    │◀─{ reply }───│  4. Call Anthropic API    │
│                  │               │  5. Return { reply }     │
└─────────────────┘                └──────────────────────────┘
                                            │
                                            ▼
                                   ┌──────────────────┐
                                   │ api.anthropic.com │
                                   │ (server-to-server)│
                                   └──────────────────┘
```

The API key ONLY exists in:
- `.env.local` (gitignored, server-only)
- Server memory at runtime (never in browser bundle)
