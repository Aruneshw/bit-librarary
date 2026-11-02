import { createHash } from 'node:crypto';
import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { isAdminEmail } from '../lib/adminEmails';
import { redis } from '../config/redis';
export interface AuthRequest extends Request { userId?: string; userEmail?: string; userRole?: string; trustScore?: number; }
const memoryRevokedTokens = new Set<string>();
const tokenKey = (token: string) => `revoked:sha256:${createHash('sha256').update(token).digest('hex')}`;
export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) { res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Sign in with Google.', status: 401 } }); return; }
  const token = authHeader.slice(7);
  try {
    const key = tokenKey(token);
    if ((redis ? await redis.get(key) : memoryRevokedTokens.has(key))) { res.status(401).json({ error: { code: 'REVOKED_TOKEN', message: 'Please sign in again.', status: 401 } }); return; }
    // Supabase validates its supported JWT signing algorithms and current user.
    // User-editable metadata and browser device fingerprints never grant roles.
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user?.email || !user.email_confirmed_at) { res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid or expired session.', status: 401 } }); return; }
    if (!user.email.toLowerCase().endsWith('@bitsathy.ac.in') && !isAdminEmail(user.email)) { res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Use a campus account.', status: 403 } }); return; }
    req.userId = user.id; req.userEmail = user.email;
    req.userRole = isAdminEmail(user.email) || user.app_metadata?.role === 'admin' ? 'admin' : 'student';
    req.trustScore = 100;
    next();
  } catch { res.status(503).json({ error: { code: 'AUTH_UNAVAILABLE', message: 'Authentication is temporarily unavailable.', status: 503 } }); }
}
export async function revokeToken(token: string): Promise<void> {
  const key = tokenKey(token);
  if (redis) await redis.set(key, '1', { ex: 86400 * 7 });
  else memoryRevokedTokens.add(key);
}
