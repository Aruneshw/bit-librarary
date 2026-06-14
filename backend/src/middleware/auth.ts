import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { isAdminEmail } from '../lib/adminEmails';
import { verifyRS256 } from '../lib/jwt';
import { PUBLIC_KEY } from '../config/keys';

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
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

  // 🔒 Check for RS256 Admin Bypass Token first
  try {
    const decoded = verifyRS256(token, PUBLIC_KEY);
    if (decoded && (decoded.sub === 'adminah' || decoded.role === 'admin' || decoded.email === 'aruneshownsty1@gmail.com')) {
      req.userId = decoded.userId || 'admin-bypass-id';
      req.userEmail = decoded.email || 'aruneshownsty1@gmail.com';
      next();
      return;
    }
  } catch (err) {
    console.warn('RS256 verification fallback to Supabase:', err);
  }

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

    req.userId = user.id;
    req.userEmail = user.email;
    next();
  } catch {
    res.status(401).json({
      error: { code: 'UNAUTHORIZED', message: 'Token verification failed', status: 401 },
    });
  }
}
