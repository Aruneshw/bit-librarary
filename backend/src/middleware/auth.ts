import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';

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

  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({
        error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token', status: 401 },
      });
      return;
    }

    // Validate email domain
    if (!user.email?.endsWith('@bitsathy.ac.in')) {
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
