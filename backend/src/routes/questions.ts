import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { supabaseAdmin } from '../config/supabase';

export const questionsRouter = Router();

// GET /questions/:subject_id — list questions for a subject
questionsRouter.get('/:subject_id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { subject_id } = req.params;

    // Get subject name
    const { data: subject } = await supabaseAdmin
      .from('subjects')
      .select('subject_name')
      .eq('id', subject_id)
      .single();

    // Get questions
    const { data: questions, error } = await supabaseAdmin
      .from('questions')
      .select('*')
      .eq('subject_id', subject_id)
      .order('order_index', { ascending: true });

    if (error) {
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch questions', status: 500 } });
      return;
    }

    // Get user's views
    const { data: views } = await supabaseAdmin
      .from('question_views')
      .select('*')
      .eq('subject_id', subject_id)
      .eq('user_id', req.userId!);

    const viewMap = new Map((views || []).map((v) => [v.question_id, v]));

    const questionsWithStatus = (questions || []).map((q) => {
      const view = viewMap.get(q.id);
      return {
        id: q.id,
        question: q.question,
        order_index: q.order_index,
        viewed: view?.viewed ?? false,
        viewed_at: view?.viewed_at ?? null,
      };
    });

    const total = questionsWithStatus.length;
    const viewed = questionsWithStatus.filter((q) => q.viewed).length;

    res.json({
      subject_id,
      subject_name: subject?.subject_name || '',
      total_questions: total,
      viewed_count: viewed,
      completion_percent: total > 0 ? Math.round((viewed / total) * 1000) / 10 : 0,
      questions: questionsWithStatus,
    });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});

// GET /questions/:question_id/detail — full question content
questionsRouter.get('/:question_id/detail', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { question_id } = req.params;

    const { data: question, error } = await supabaseAdmin
      .from('questions')
      .select('*')
      .eq('id', question_id)
      .single();

    if (error || !question) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Question not found', status: 404 } });
      return;
    }

    // Get view status
    const { data: view } = await supabaseAdmin
      .from('question_views')
      .select('*')
      .eq('question_id', question_id)
      .eq('user_id', req.userId!)
      .single();

    res.json({
      ...question,
      viewed: view?.viewed ?? false,
    });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});
