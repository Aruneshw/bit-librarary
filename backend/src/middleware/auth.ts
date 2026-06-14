import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { isAdminEmail } from '../lib/adminEmails';
import { verifyRS256 } from '../lib/jwt';
import { PUBLIC_KEY } from '../config/keys';
import { redis } from '../config/redis';

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
  userRole?: string;
  trustScore?: number;
}

// Memory fallback store for fingerprints and revocation in development
const memoryFingerprints = new Map<string, string>();
const memoryRevokedTokens = new Set<string>();

function calculateTrustScore(user: any, req: Request): number {
  let score = 100;

  // 1. Account age check
  if (user.created_at) {
    const ageMs = Date.now() - new Date(user.created_at).getTime();
    const ageDays = ageMs / (1000 * 60 * 60 * 24);
    if (ageDays < 1) score -= 30; // New account
    else if (ageDays < 7) score -= 15;
    else if (ageDays < 30) score -= 5;
  }

  // 2. Email verification check
  if (user.email_confirmed_at === null) {
    score -= 40; // Unverified email
  }

  // 3. User-agent verification
  const ua = req.headers['user-agent'] || '';
  if (!ua || ua.includes('curl') || ua.includes('PostmanRuntime') || ua.includes('headless')) {
    score -= 40; // Bot-like User-Agent
  }

  return Math.max(0, Math.min(100, score));
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Missing or invalid authorization header', status: 401 },
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  // 🛡️ JWT Algorithm Enforcement: Reject HS256 to prevent algorithm confusion attacks
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    res.status(401).json({
      error: { code: 'INVALID_JWT', message: 'Malformed token structure', status: 401 },
    });
    return;
  }
  try {
    const header = JSON.parse(Buffer.from(tokenParts[0], 'base64').toString('utf8'));
    if (header.alg === 'HS256') {
      res.status(401).json({
        error: { code: 'ALGORITHM_REJECTED', message: 'HS256 algorithm is rejected in production', status: 401 },
      });
      return;
    }
  } catch {
    res.status(401).json({
      error: { code: 'INVALID_JWT', message: 'Malformed token header', status: 401 },
    });
    return;
  }

  // 🛡️ Token Revocation Check via Redis blacklist
  const revocationKey = `revoked:token:${token}`;
  if (redis) {
    try {
      const isRevoked = await redis.get(revocationKey);
      if (isRevoked) {
        res.status(401).json({
          error: { code: 'REVOKED_TOKEN', message: 'Token has been revoked', status: 401 },
        });
        return;
      }
    } catch (err) {
      console.error('Redis token revocation check error:', err);
    }
  } else {
    if (memoryRevokedTokens.has(token)) {
      res.status(401).json({
        error: { code: 'REVOKED_TOKEN', message: 'Token has been revoked', status: 401 },
      });
      return;
    }
  }

  let authenticatedUser: any = null;
  let decodedBypass: any = null;

  // 1. Try RS256 Bypass Token
  try {
    const decoded = verifyRS256(token, PUBLIC_KEY);
    if (decoded && (decoded.sub === 'adminah' || decoded.role === 'admin' || decoded.email === 'aruneshownsty1@gmail.com')) {
      decodedBypass = decoded;
      req.userId = decoded.userId || 'admin-bypass-id';
      req.userEmail = decoded.email || 'aruneshownsty1@gmail.com';
      req.userRole = decoded.role || 'admin';
      req.trustScore = 100; // Admin bypass is trusted fully
    }
  } catch (err) {
    // fall through to Supabase
  }

  // 2. Fallback to Supabase authentication if bypass not active
  if (!decodedBypass) {
    try {
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

      if (error || !user) {
        res.status(401).json({
          error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token', status: 401 },
        });
        return;
      }

      // Validate email domain (allow admin emails outside bitsathy domain)
      if (!user.email?.endsWith('@bitsathy.ac.in') && !isAdminEmail(user.email)) {
        res.status(403).json({
          error: { code: 'FORBIDDEN', message: 'Access restricted to @bitsathy.ac.in accounts', status: 403 },
        });
        return;
      }

      authenticatedUser = user;
      req.userId = user.id;
      req.userEmail = user.email;
      // Extract role from Supabase user metadata (or fallback to 'student')
      req.userRole = user.user_metadata?.role || (isAdminEmail(user.email) ? 'admin' : 'student');
      
      // Calculate trust score (Layer 5)
      req.trustScore = calculateTrustScore(user, req);

      // Flag low trust score
      if (req.trustScore < 50) {
        res.status(403).json({
          error: {
            code: 'LOW_TRUST_SCORE',
            message: 'Suspicious activity detected. Step-up verification required.',
            status: 403,
          },
        });
        return;
      }
    } catch {
      res.status(401).json({
        error: { code: 'UNAUTHORIZED', message: 'Token verification failed', status: 401 },
      });
      return;
    }
  }

  // 🛡️ Device Fingerprint Locking (Layer 5)
  const clientFingerprint = req.headers['x-device-fingerprint'] as string;
  if (!clientFingerprint) {
    res.status(401).json({
      error: { code: 'UNAUTHORIZED_FINGERPRINT', message: 'Device fingerprint missing', status: 401 },
    });
    return;
  }

  const identityKey = `fingerprint:session:${req.userId}`;
  if (redis) {
    try {
      const storedFingerprint = await redis.get(identityKey);
      if (!storedFingerprint) {
        // Lock session to fingerprint (expires in 7 days)
        await redis.set(identityKey, clientFingerprint, { ex: 86400 * 7 });
      } else if (storedFingerprint !== clientFingerprint) {
        res.status(401).json({
          error: { code: 'FINGERPRINT_DRIFT', message: 'Session invalid: Device fingerprint mismatch', status: 401 },
        });
        return;
      }
    } catch (err) {
      console.error('Redis fingerprint validation error:', err);
      // Fail closed
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Fingerprint check failed', status: 500 } });
      return;
    }
  } else {
    // Memory fallback
    const storedFingerprint = memoryFingerprints.get(identityKey);
    if (!storedFingerprint) {
      memoryFingerprints.set(identityKey, clientFingerprint);
    } else if (storedFingerprint !== clientFingerprint) {
      res.status(401).json({
        error: { code: 'FINGERPRINT_DRIFT', message: 'Session invalid: Device fingerprint mismatch', status: 401 },
      });
      return;
    }
  }

  next();
}

/**
 * Manually adds a token to the blacklist (revocation).
 */
export async function revokeToken(token: string): Promise<void> {
  const revocationKey = `revoked:token:${token}`;
  if (redis) {
    try {
      // Blacklist token for 7 days
      await redis.set(revocationKey, '1', { ex: 86400 * 7 });
    } catch (err) {
      console.error('Failed to revoke token in Redis:', err);
    }
  } else {
    memoryRevokedTokens.add(token);
  }
}
