import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { supabaseAdmin } from '../config/supabase';
import { redis } from '../config/redis';

export const questionsRouter = Router();

// GET /questions/:subject_id — list questions for a subject
questionsRouter.get('/:subject_id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { subject_id } = req.params;

    // Get subject name (Cacheable)
    let subjectName = '';
    const subjectCacheKey = `subject_name:${subject_id}`;
    
    if (redis) {
      const cachedName = await redis.get(subjectCacheKey);
      if (cachedName) subjectName = cachedName as string;
    }

    if (!subjectName) {
      const { data: subject } = await supabaseAdmin
        .from('subjects')
        .select('subject_name')
        .eq('id', subject_id)
        .single();
        
      if (subject?.subject_name) {
        subjectName = subject.subject_name;
        if (redis) await redis.set(subjectCacheKey, subjectName, { ex: 86400 }); // Cache for 24 hours
      }
    }

    // Get questions (Cacheable)
    let questions: any[] | null = null;
    const questionsCacheKey = `subject_questions:${subject_id}`;

    if (redis) {
      questions = await redis.get(questionsCacheKey);
    }

    if (!questions) {
      const { data, error } = await supabaseAdmin
        .from('questions')
        .select('*')
        .eq('subject_id', subject_id)
        .order('order_index', { ascending: true });

      if (error) {
        res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch questions', status: 500 } });
        return;
      }
      
      questions = data;
      
      if (redis && questions) {
        await redis.set(questionsCacheKey, questions, { ex: 3600 });
        console.log(`[CACHE MISS] Fetched questions for subject ${subject_id} from Supabase.`);
      }
    } else {
      console.log(`[CACHE HIT] Fetched questions for subject ${subject_id} from Redis.`);
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
      subject_name: subjectName,
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

    let question: any = null;
    const questionDetailCacheKey = `question_detail:${question_id}`;

    if (redis) {
      question = await redis.get(questionDetailCacheKey);
    }

    if (!question) {
      const { data, error } = await supabaseAdmin
        .from('questions')
        .select('*')
        .eq('id', question_id)
        .single();

      if (error || !data) {
        res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Question not found', status: 404 } });
        return;
      }
      
      question = data;

      if (redis && question) {
        // Cache question detail for a long time since answers are static and large
        await redis.set(questionDetailCacheKey, question, { ex: 86400 }); 
        console.log(`[CACHE MISS] Fetched question ${question_id} from Supabase.`);
      }
    } else {
      console.log(`[CACHE HIT] Fetched question ${question_id} from Redis.`);
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
