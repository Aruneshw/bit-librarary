import { create } from 'zustand';
import { type SubjectWithProgress } from '@/types';
import { createClient } from '@/lib/supabase';

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
    const supabase = createClient();
    set({ isLoading: true });

    try {
      // Fetch subjects that include this department
      const { data: subjects } = await supabase
        .from('subjects')
        .select('*')
        .contains('department', [department]);

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

      const subjectsWithProgress: SubjectWithProgress[] = await Promise.all(
        subjects.map(async (subject) => {
          // Count total questions
          const { count: totalQuestions } = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .eq('subject_id', subject.id);

          // Count viewed questions
          const { count: viewedCount } = await supabase
            .from('question_views')
            .select('*', { count: 'exact', head: true })
            .eq('subject_id', subject.id)
            .eq('user_id', user.id)
            .eq('viewed', true);

          const total = totalQuestions || 0;
          const viewed = viewedCount || 0;
          const completion = total > 0 ? Math.round((viewed / total) * 100 * 10) / 10 : 0;

          return {
            ...subject,
            total_questions: total,
            viewed_count: viewed,
            completion_percent: completion,
            mastered: completion >= 100,
          };
        })
      );

      set({ subjects: subjectsWithProgress, isLoading: false });
    } catch {
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
