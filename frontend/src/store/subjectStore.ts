import { create } from 'zustand';
import { type SubjectWithProgress } from '@/types';
import { createClient } from '@/lib/supabase';
import { getAuthHeaders } from '@/lib/authHelpers';

interface SubjectState {
  subjects: SubjectWithProgress[];
  isLoading: boolean;
  fetchSubjects: (department: string) => Promise<void>;
  updateSubjectProgress: (subjectId: string, viewedCount: number, totalQuestions: number) => void;
}

export const useSubjectStore = create<SubjectState>((set, get) => ({
  subjects: [],
  isLoading: false,

  fetchSubjects: async (department: string) => {
    set({ isLoading: true });
    const supabase = createClient();

    // Try fetching from the backend cache first
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${apiUrl}/subjects?department=${department}${department === 'ALL' ? '&all=true' : ''}`, {
          headers,
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.subjects) {
            set({ subjects: data.subjects, isLoading: false });
            return;
          }
        }
      } catch (err) {
        console.warn('Failed to fetch subjects from cached API, falling back to direct Supabase query:', err);
      }
    }

    // Fallback: direct Supabase query
    try {
      let query = supabase.from('subjects').select('*');
      
      if (department !== 'ALL') {
        query = query.contains('department', [department]);
      }

      const { data: subjects } = await query;

      if (!subjects) {
        set({ subjects: [], isLoading: false });
        return;
      }

      // Fetch user's progress for each subject
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ subjects: [], isLoading: false });
        return;
      }

      // Fetch all question counts in a single query
      const { data: allQuestions } = await supabase
        .from('questions')
        .select('subject_id');

      const questionCounts: Record<string, number> = {};
      if (allQuestions) {
        for (const q of allQuestions) {
          if (q.subject_id) {
            questionCounts[q.subject_id] = (questionCounts[q.subject_id] || 0) + 1;
          }
        }
      }

      // Fetch all viewed counts for this user in a single query
      const { data: allViews } = await supabase
        .from('question_views')
        .select('subject_id')
        .eq('user_id', user.id)
        .eq('viewed', true);

      const viewedCounts: Record<string, number> = {};
      if (allViews) {
        for (const v of allViews) {
          if (v.subject_id) {
            viewedCounts[v.subject_id] = (viewedCounts[v.subject_id] || 0) + 1;
          }
        }
      }

      const subjectsWithProgress: SubjectWithProgress[] = subjects.map((subject: any) => {
        const total = questionCounts[subject.id] || 0;
        const viewed = viewedCounts[subject.id] || 0;
        const completion = total > 0 ? Math.round((viewed / total) * 100 * 10) / 10 : 0;

        return {
          ...subject,
          total_questions: total,
          viewed_count: viewed,
          completion_percent: completion,
          mastered: completion >= 100,
        };
      });

      set({ subjects: subjectsWithProgress, isLoading: false });
    } catch (err) {
      console.error('Error fetching subjects fallback:', err);
      set({ subjects: [], isLoading: false });
    }
  },

  updateSubjectProgress: (subjectId, viewedCount, totalQuestions) => {
    const subjects = get().subjects.map((s) => {
      if (s.id === subjectId) {
        const completion = totalQuestions > 0
          ? Math.round((viewedCount / totalQuestions) * 100 * 10) / 10
          : 0;
        return {
          ...s,
          viewed_count: viewedCount,
          completion_percent: completion,
          mastered: completion >= 100,
        };
      }
      return s;
    });
    set({ subjects });
  },
}));
