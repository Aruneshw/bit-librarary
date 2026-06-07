import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { supabaseAdmin } from '../config/supabase';

export const progressRouter = Router();

// GET /progress/:subject_id
progressRouter.get('/:subject_id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { subject_id } = req.params;

    const { data: subject } = await supabaseAdmin
      .from('subjects')
      .select('subject_name')
      .eq('id', subject_id)
      .single();

    const { count: total } = await supabaseAdmin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('subject_id', subject_id);

    const { count: viewed } = await supabaseAdmin
      .from('question_views')
      .select('*', { count: 'exact', head: true })
      .eq('subject_id', subject_id)
      .eq('user_id', req.userId!)
      .eq('viewed', true);

    const totalCount = total || 0;
    const viewedCount = viewed || 0;

    res.json({
      subject_id,
      subject_name: subject?.subject_name || '',
      total_questions: totalCount,
      viewed_count: viewedCount,
      completion_percent: totalCount > 0 ? Math.round((viewedCount / totalCount) * 1000) / 10 : 0,
    });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});

// POST /progress/mark-viewed
progressRouter.post('/mark-viewed', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { question_id, subject_id } = req.body;

    if (!question_id || !subject_id) {
      res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'question_id and subject_id are required', status: 400 },
      });
      return;
    }

    const now = new Date().toISOString();

    const { error } = await supabaseAdmin
      .from('question_views')
      .upsert(
        {
          user_id: req.userId!,
          subject_id,
          question_id,
          viewed: true,
          viewed_at: now,
        },
        { onConflict: 'user_id,question_id' }
      );

    if (error) {
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to mark viewed', status: 500 } });
      return;
    }

    // Calculate updated completion
    const { count: total } = await supabaseAdmin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('subject_id', subject_id);

    const { count: viewed } = await supabaseAdmin
      .from('question_views')
      .select('*', { count: 'exact', head: true })
      .eq('subject_id', subject_id)
      .eq('user_id', req.userId!)
      .eq('viewed', true);

    const totalCount = total || 0;
    const viewedCount = viewed || 0;

    res.json({
      question_id,
      viewed: true,
      viewed_at: now,
      subject_completion: {
        total: totalCount,
        viewed: viewedCount,
        percent: totalCount > 0 ? Math.round((viewedCount / totalCount) * 1000) / 10 : 0,
      },
    });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});

// GET /progress/overview
progressRouter.get('/overview', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    // Get user department
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('department')
      .eq('id', req.userId!)
      .single();

    if (!profile?.department) {
      res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Department not set', status: 400 } });
      return;
    }

    const { data: subjects } = await supabaseAdmin
      .from('subjects')
      .select('*')
      .contains('department', [profile.department]);

    const subjectsProgress = await Promise.all(
      (subjects || []).map(async (subject) => {
        const { count: total } = await supabaseAdmin
          .from('questions')
          .select('*', { count: 'exact', head: true })
          .eq('subject_id', subject.id);

        const { count: viewed } = await supabaseAdmin
          .from('question_views')
          .select('*', { count: 'exact', head: true })
          .eq('subject_id', subject.id)
          .eq('user_id', req.userId!)
          .eq('viewed', true);

        const totalCount = total || 0;
        const viewedCount = viewed || 0;
        const completion = totalCount > 0 ? Math.round((viewedCount / totalCount) * 1000) / 10 : 0;

        return {
          subject_id: subject.id,
          subject_name: subject.subject_name,
          total_questions: totalCount,
          viewed_count: viewedCount,
          completion_percent: completion,
          mastered: completion >= 100,
        };
      })
    );

    const totalAll = subjectsProgress.reduce((sum, s) => sum + s.total_questions, 0);
    const viewedAll = subjectsProgress.reduce((sum, s) => sum + s.viewed_count, 0);

    res.json({
      subjects: subjectsProgress,
      overall_percent: totalAll > 0 ? Math.round((viewedAll / totalAll) * 1000) / 10 : 0,
    });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});
