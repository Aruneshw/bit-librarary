import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/heartbeat', async (req: AuthRequest, res) => {
  try {
    let userId: string | undefined;

    // Try header-based auth (normal heartbeat)
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const { data: { user } } = await supabaseAdmin.auth.getUser(token);
      userId = user?.id;
    }

    // Fallback: token in query string (sendBeacon, which cannot set headers)
    const queryToken = req.query.token as string | undefined;
    if (!userId && queryToken) {
      const { data: { user } } = await supabaseAdmin.auth.getUser(queryToken);
      userId = user?.id;
    }

    if (!userId) {
      res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid token', status: 401 } });
      return;
    }

    const isOffline = req.body?.offline === true || req.query.offline === 'true';

    if (isOffline) {
      const { error } = await supabaseAdmin.rpc('mark_user_offline', {
        p_user_id: userId,
      });
      if (error) console.error('Mark offline error:', error);
    } else {
      const { error } = await supabaseAdmin.rpc('upsert_user_session', {
        p_user_id: userId,
      });
      if (error) console.error('Heartbeat upsert error:', error);
    }

    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Heartbeat error:', err);
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Heartbeat failed', status: 500 },
    });
  }
});

router.get('/count', async (_req, res) => {
  try {
    const { data, error } = await supabaseAdmin.rpc('get_online_count');

    if (error) throw error;

    res.json({ onlineCount: Number(data) || 0 });
  } catch (err) {
    console.error('Online count error:', err);
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to get online count', status: 500 },
    });
  }
});

router.get('/online', async (_req, res) => {
  try {
    const { data, error } = await supabaseAdmin.rpc('get_online_user_ids');

    if (error) throw error;

    const userIds = (data as { user_id: string }[] | null)?.map((r) => r.user_id) || [];
    res.json({ onlineUserIds: userIds });
  } catch (err) {
    console.error('Online users error:', err);
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Failed to get online users', status: 500 },
    });
  }
});

export default router;
