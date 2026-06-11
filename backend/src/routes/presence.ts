import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/heartbeat', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { error } = await supabaseAdmin.rpc('upsert_user_session', {
      p_user_id: req.userId,
    });

    if (error) {
      console.error('Heartbeat upsert error:', error);
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
