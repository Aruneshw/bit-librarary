import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { supabaseAdmin } from '../config/supabase';
import { safeRedisGet, safeRedisSet } from '../config/redis';

export const subjectsRouter = Router();

// GET /subjects
subjectsRouter.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    // Get user's department
    const department = req.query.department as string;
    let userDept = department;

    if (!userDept) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('department')
        .eq('id', req.userId!)
        .single();

      userDept = profile?.department;
    }

    if (!userDept) {
      res.status(400).json({
        error: { code: 'BAD_REQUEST', message: 'Department not set. Please select a department first.', status: 400 },
      });
      return;
    }

    // Fetch all subjects (with Redis Caching)
    let allSubjects: any[] | null = null;

    allSubjects = await safeRedisGet<any[]>('all_subjects');

    if (!allSubjects) {
      const { data, error } = await supabaseAdmin
        .from('subjects')
        .select('*');

      if (error) {
        res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch subjects', status: 500 } });
        return;
      }

      allSubjects = data;

      if (allSubjects) {
        await safeRedisSet('all_subjects', allSubjects, { ex: 3600 }); // Cache for 1 hour
        console.log('[CACHE MISS] Subjects fetched from Supabase and cached.');
      }
    } else {
      console.log('[CACHE HIT] Subjects fetched from Redis.');
    }

    // Filter subjects: show all subjects to everyone, EXCEPT hide "Electronics" for CS, AL, AD, IT
    const restrictedDepts = ['CS', 'IT', 'AL', 'AD'];
    const subjects = (allSubjects || []).filter(subject => {
      const isElectronics = subject.subject_name.toLowerCase().includes('electronics');
      if (isElectronics && restrictedDepts.includes(userDept.toUpperCase())) {
        return false;
      }
      return true;
    });

    // Fetch all user views in a single query
    const { data: allViews } = await supabaseAdmin
      .from('question_views')
      .select('subject_id, question_id')
      .eq('user_id', req.userId!)
      .eq('viewed', true);

    const viewsBySubject = new Map<string, number>();
    if (allViews) {
      for (const view of allViews) {
        const currentCount = viewsBySubject.get(view.subject_id) || 0;
        viewsBySubject.set(view.subject_id, currentCount + 1);
      }
    }

    // Get completion for each subject
    const subjectsWithCompletion = await Promise.all(
      (subjects || []).map(async (subject) => {
        let totalCount = 0;
        const totalCountCacheKey = `subject_question_count:${subject.id}`;

        const cachedCount = await safeRedisGet<number>(totalCountCacheKey);
        if (cachedCount !== null && cachedCount !== undefined) {
          totalCount = Number(cachedCount);
        }

        if (totalCount === 0) {
          const { count: total } = await supabaseAdmin
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .eq('subject_id', subject.id);
          totalCount = total || 0;
          await safeRedisSet(totalCountCacheKey, totalCount, { ex: 86400 }); // Cache for 24 hours
        }

        const viewedCount = viewsBySubject.get(subject.id) || 0;
        const completion = totalCount > 0 ? Math.round((viewedCount / totalCount) * 100 * 10) / 10 : 0;

        return {
          ...subject,
          total_questions: totalCount,
          viewed_count: viewedCount,
          completion_percent: completion,
          mastered: completion >= 100,
        };
      })
    );

    res.json({ subjects: subjectsWithCompletion });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});
