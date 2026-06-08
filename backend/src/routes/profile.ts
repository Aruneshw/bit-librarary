import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { supabaseAdmin } from '../config/supabase';

export const profileRouter = Router();

const VALID_DEPARTMENTS = ['CS', 'IT', 'AL', 'AD', 'EEE', 'ECE', 'EIE', 'ME', 'MZ', 'AG', 'BT'];

// GET /profile
profileRouter.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', req.userId!)
      .single();

    if (error || !data) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Profile not found', status: 404 } });
      return;
    }

    res.json(data);
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch profile', status: 500 } });
  }
});

// PATCH /profile/department
profileRouter.patch('/department', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { department } = req.body;

    if (!department || !VALID_DEPARTMENTS.includes(department)) {
      res.status(400).json({
        error: { code: 'BAD_REQUEST', message: `Invalid department. Must be one of: ${VALID_DEPARTMENTS.join(', ')}`, status: 400 },
      });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ department })
      .eq('id', req.userId!)
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to update department', status: 500 } });
      return;
    }

    res.json({ id: data.id, department: data.department, updated: true });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});
