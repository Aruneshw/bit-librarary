import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { supabaseAdmin } from '../config/supabase';
import { z } from 'zod';
import { validateBody } from '../middleware/validate';

export const profileRouter = Router();

const VALID_DEPARTMENTS = ['CS', 'IT', 'AL', 'AD', 'EEE', 'ECE', 'EIE', 'ME', 'MZ', 'AG', 'BT'] as const;

const updateDepartmentSchema = z.object({
  department: z.enum(VALID_DEPARTMENTS),
});

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
profileRouter.patch('/department', authMiddleware, validateBody(updateDepartmentSchema), async (req: AuthRequest, res: Response) => {
  try {
    const { department } = req.body;

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
