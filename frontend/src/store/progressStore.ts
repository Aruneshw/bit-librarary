import { create } from 'zustand';
import { type QuestionWithStatus } from '@/types';
import { createClient } from '@/lib/supabase';
import { getAuthToken } from '@/lib/authHelpers';

interface ProgressState {
  questions: QuestionWithStatus[];
  isLoading: boolean;
  totalQuestions: number;
  viewedCount: number;
  completionPercent: number;

  fetchQuestions: (subjectId: string) => Promise<void>;
  markViewed: (questionId: string, subjectId: string) => Promise<void>;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  questions: [],
  isLoading: false,
  totalQuestions: 0,
  viewedCount: 0,
  completionPercent: 0,

  fetchQuestions: async (subjectId: string) => {
    set({ isLoading: true });
    const supabase = createClient();

    // Try fetching from the backend cache first
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      try {
        const token = await getAuthToken();
        if (token) {
          const res = await fetch(`${apiUrl}/questions/${subjectId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            if (data && data.questions) {
              set({
                questions: data.questions,
                isLoading: false,
                totalQuestions: data.total_questions || 0,
                viewedCount: data.viewed_count || 0,
                completionPercent: data.completion_percent || 0,
              });
              return;
            }
          }
        }
      } catch (err) {
        console.warn('Failed to fetch questions from cached API, falling back to direct Supabase query:', err);
      }
    }

    // Fallback: direct Supabase query
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch questions
      const { data: questions } = await supabase
        .from('questions')
        .select('*')
        .eq('subject_id', subjectId)
        .order('order_index', { ascending: true });

      if (!questions) {
        set({ questions: [], isLoading: false, totalQuestions: 0, viewedCount: 0, completionPercent: 0 });
        return;
      }

      // Fetch views
      const { data: views } = await supabase
        .from('question_views')
        .select('*')
        .eq('subject_id', subjectId)
        .eq('user_id', user.id);

      const viewMap = new Map(
        (views || []).map((v: any) => [v.question_id, v])
      );

      const questionsWithStatus: QuestionWithStatus[] = questions.map((q: any) => {
        const view: any = viewMap.get(q.id);
        return {
          ...q,
          viewed: view?.viewed ?? false,
          viewed_at: view?.viewed_at ?? null,
        };
      });

      const total = questionsWithStatus.length;
      const viewed = questionsWithStatus.filter((q) => q.viewed).length;
      const completion = total > 0 ? Math.round((viewed / total) * 100 * 10) / 10 : 0;

      set({
        questions: questionsWithStatus,
        isLoading: false,
        totalQuestions: total,
        viewedCount: viewed,
        completionPercent: completion,
      });
    } catch {
      set({ questions: [], isLoading: false });
    }
  },

  markViewed: async (questionId: string, subjectId: string) => {
    const supabase = createClient();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Optimistic update
      const questions = get().questions.map((q) => {
        if (q.id === questionId && !q.viewed) {
          return { ...q, viewed: true, viewed_at: new Date().toISOString() };
        }
        return q;
      });

      const total = questions.length;
      const viewed = questions.filter((q) => q.viewed).length;
      const completion = total > 0 ? Math.round((viewed / total) * 100 * 10) / 10 : 0;

      set({
        questions,
        viewedCount: viewed,
        completionPercent: completion,
      });

      // Try syncing to the backend first
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiUrl) {
        try {
          const token = await getAuthToken();
          if (token) {
            const res = await fetch(`${apiUrl}/progress/mark-viewed`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ question_id: questionId, subject_id: subjectId }),
            });
            if (res.ok) return;
          }
        } catch (err) {
          console.warn('Failed to post mark-viewed to backend, trying direct Supabase upsert:', err);
        }
      }

      // Fallback: Sync to Supabase
      await supabase
        .from('question_views')
        .upsert(
          {
            user_id: user.id,
            subject_id: subjectId,
            question_id: questionId,
            viewed: true,
            viewed_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,question_id' }
        );
    } catch {
      // Revert on error
      get().fetchQuestions(subjectId);
    }
  },
}));
