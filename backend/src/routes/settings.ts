import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { supabaseAdmin } from '../config/supabase';
import { z } from 'zod';
import { validateBody } from '../middleware/validate';

export const settingsRouter = Router();

const updateSettingsSchema = z.object({
  tutorial_seen: z.boolean(),
});

// GET /settings
settingsRouter.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .eq('user_id', req.userId!)
      .single();

    if (error || !data) {
      // Create default settings if not found
      const { data: newSettings } = await supabaseAdmin
        .from('settings')
        .insert({ user_id: req.userId! })
        .select()
        .single();

      res.json(newSettings || { user_id: req.userId, tutorial_seen: false });
      return;
    }

    res.json(data);
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});

// PATCH /settings
settingsRouter.patch('/', authMiddleware, validateBody(updateSettingsSchema), async (req: AuthRequest, res: Response) => {
  try {
    const { tutorial_seen } = req.body;

    const { data, error } = await supabaseAdmin
      .from('settings')
      .update({ tutorial_seen })
      .eq('user_id', req.userId!)
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to update settings', status: 500 } });
      return;
    }

    res.json({ ...data, updated: true });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});
