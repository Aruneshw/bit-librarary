import { Router } from 'express';

export const authRouter = Router();

// Auth is primarily handled by Supabase client SDK on the frontend.
// These endpoints exist for server-side session management if needed.

authRouter.post('/google', (_req, res) => {
  res.json({
    message: 'Google OAuth is handled via Supabase client SDK on the frontend.',
    instructions: 'Use supabase.auth.signInWithOAuth({ provider: "google" })',
  });
});

authRouter.post('/logout', (_req, res) => {
  res.json({ message: 'Logged out successfully' });
});
