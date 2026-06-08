import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { supabaseAdmin } from '../config/supabase';
import { redis } from '../config/redis';

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

    if (redis) {
      allSubjects = await redis.get('all_subjects');
    }

    if (!allSubjects) {
      const { data, error } = await supabaseAdmin
        .from('subjects')
        .select('*');

      if (error) {
        res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch subjects', status: 500 } });
        return;
      }

      allSubjects = data;

      if (redis && allSubjects) {
        await redis.set('all_subjects', allSubjects, { ex: 3600 }); // Cache for 1 hour
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

    // Get completion for each subject
    const subjectsWithCompletion = await Promise.all(
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
          ...subject,
          completion,
        };
      })
    );

    res.json({ subjects: subjectsWithCompletion });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});
