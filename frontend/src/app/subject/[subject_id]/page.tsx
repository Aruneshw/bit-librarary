'use client';

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useProgressStore } from '@/store/progressStore';
import { useSubjectStore } from '@/store/subjectStore';
import QuestionList from '@/components/questions/QuestionList';
import QuestionModal from '@/components/questions/QuestionModal';
import CompletionCelebration from '@/components/animations/CompletionCelebration';
import TranslatorPopup from '@/components/dashboard/TranslatorPopup';
import AddQuestionModal from '@/components/questions/AddQuestionModal';
import { type QuestionWithStatus } from '@/types';
import { createClient } from '@/lib/supabase';

export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.subject_id as string;

  const { user, isAuthenticated, isAdmin, isLoading: authLoading, fetchUser } = useAuthStore();
  const {
    questions,
    isLoading,
    totalQuestions,
    viewedCount,
    completionPercent,
    fetchQuestions,
    markViewed,
  } = useProgressStore();
  const { updateSubjectProgress } = useSubjectStore();

  const [selectedQuestion, setSelectedQuestion] = useState<QuestionWithStatus | null>(null);
  const [subjectName, setSubjectName] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [prevCompletion, setPrevCompletion] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [studyStats, setStudyStats] = useState<{ studying_count: number; recently_active: number } | null>(null);

  // Refs for navigation (avoids stale closures on rapid clicks)
  const navLockRef = useRef(false);
  const currentIdxRef = useRef(-1);
  currentIdxRef.current = selectedQuestion
    ? questions.findIndex(q => q.id === selectedQuestion.id)
    : -1;

  // Memoized navigation flags
  const hasNext = useMemo(
    () => currentIdxRef.current >= 0 && currentIdxRef.current < questions.length - 1,
    [selectedQuestion?.id, questions.length]
  );
  const hasPrev = useMemo(
    () => currentIdxRef.current > 0,
    [selectedQuestion?.id]
  );

  const theme = subjectId === 'a1000000-0000-0000-0000-000000000005' ? 'green' : 'blue';

  // Fetch user
  useEffect(() => {
    if (!isAuthenticated) fetchUser();
  }, [isAuthenticated, fetchUser]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      // Small timeout to prevent aggressive redirects
      const timer = setTimeout(() => router.push('/login'), 500);
      return () => clearTimeout(timer);
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch subject name
  useEffect(() => {
    let cancelled = false;
    const fetchSubjectName = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('subjects')
        .select('subject_name')
        .eq('id', subjectId)
        .single();
      if (data && !cancelled) setSubjectName(data.subject_name);
    };
    fetchSubjectName();
    return () => { cancelled = true; };
  }, [subjectId]);

  // Fetch admin study stats
  useEffect(() => {
    if (!isAdmin || !subjectId) return;
    let cancelled = false;

    const fetchStats = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.rpc('get_subject_study_stats', {
        target_subject_id: subjectId,
      });
      if (!error && data && !cancelled) {
        setStudyStats({
          studying_count: Number(data.studying_count) || 0,
          recently_active: Number(data.recently_active) || 0,
        });
      }
    };

    fetchStats();
    return () => { cancelled = true; };
  }, [isAdmin, subjectId]);

  // Fetch questions
  useEffect(() => {
    if (subjectId && isAuthenticated) {
      fetchQuestions(subjectId);
    }
  }, [subjectId, isAuthenticated, fetchQuestions]);

  // Track completion for celebration
  useEffect(() => {
    if (prevCompletion < 100 && completionPercent >= 100 && totalQuestions > 0) {
      setShowCelebration(true);
    }
  }, [completionPercent, prevCompletion, totalQuestions]);

  // Track prevCompletion separately to avoid re-triggering
  useEffect(() => {
    setPrevCompletion(completionPercent);
  }, [completionPercent]);

  const selectedQRef = useRef<QuestionWithStatus | null>(null);
  selectedQRef.current = selectedQuestion;

  const markViewedIfNeeded = useCallback(async () => {
    const q = selectedQRef.current;
    if (q && !q.viewed) {
      await markViewed(q.id, subjectId);
      updateSubjectProgress(subjectId, viewedCount + 1, totalQuestions);
    }
  }, [subjectId, markViewed, updateSubjectProgress, viewedCount, totalQuestions]);

  const fetchAbortRef = useRef<AbortController | null>(null);

  const handleSelectQuestion = useCallback((question: QuestionWithStatus) => {
    window.getSelection()?.removeAllRanges();

    // Cancel any in-flight fetch
    if (fetchAbortRef.current) {
      fetchAbortRef.current.abort();
    }

    // Open modal immediately with basic info
    setSelectedQuestion({ ...question, answer: question.answer || 'Loading answer from cache...' });

    // Fetch full details from backend API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl && !question.answer) {
      const controller = new AbortController();
      fetchAbortRef.current = controller;

      (async () => {
        try {
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            const res = await fetch(`${apiUrl}/questions/${question.id}/detail`, {
              signal: controller.signal,
              headers: {
                'Authorization': `Bearer ${session.access_token}`,
              },
            });
            if (res.ok) {
              const detail = await res.json();
              setSelectedQuestion(detail);
              return;
            }
          }
        } catch (err: any) {
          if (err?.name === 'AbortError') return;
          console.warn('Failed to fetch question detail from cached API:', err);
        }

        // Direct database query fallback
        try {
          const supabase = createClient();
          const { data } = await supabase
            .from('questions')
            .select('*')
            .eq('id', question.id)
            .single();
          if (data) {
            setSelectedQuestion({ ...question, ...data });
          }
        } catch (err) {
          console.error('Failed to fetch question detail from Supabase:', err);
        }
      })();
    }
  }, []);

  const navigateToQuestion = useCallback(async (targetQuestion: QuestionWithStatus) => {
    if (navLockRef.current) return;
    navLockRef.current = true;
    try {
      await markViewedIfNeeded();
      handleSelectQuestion(targetQuestion);
    } finally {
      navLockRef.current = false;
    }
  }, [markViewedIfNeeded, handleSelectQuestion]);

  const handleCloseModal = useCallback(async () => {
    if (navLockRef.current) return;
    window.getSelection()?.removeAllRanges();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    await markViewedIfNeeded();
    setSelectedQuestion(null);
    selectedQRef.current = null;
  }, [markViewedIfNeeded]);

  const handleNextQuestion = useCallback(() => {
    window.getSelection()?.removeAllRanges();
    const idx = currentIdxRef.current;
    if (idx < 0 || idx >= questions.length - 1) return;
    navigateToQuestion(questions[idx + 1]);
  }, [questions, navigateToQuestion]);

  const handlePrevQuestion = useCallback(() => {
    window.getSelection()?.removeAllRanges();
    const idx = currentIdxRef.current;
    if (idx <= 0) return;
    navigateToQuestion(questions[idx - 1]);
  }, [questions, navigateToQuestion]);

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm("Are you sure you want to permanently delete this question?")) return;
    
    const supabase = createClient();
    const { error } = await supabase.from('questions').delete().eq('id', questionId);
    if (!error) {
      // Clear cache on backend
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiUrl) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            await fetch(`${apiUrl}/questions/clear-cache?subject_id=${subjectId}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${session.access_token}`,
              },
            });
          }
        } catch (err) {
          console.warn('Failed to clear cache on delete:', err);
        }
      }
      fetchQuestions(subjectId);
    } else {
      alert("Failed to delete question");
    }
  };

  return (
    <main className="relative min-h-screen">
      {/* Background */}
      <div className="arc-bg" />

      {/* Celebration */}
      <CompletionCelebration
        subjectName={subjectName}
        isVisible={showCelebration}
        onDismiss={() => setShowCelebration(false)}
      />

      {/* Add Question Modal (Admin Only) */}
      <AddQuestionModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        subjectId={subjectId as string}
        onSuccess={async () => {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          if (apiUrl) {
            try {
              const supabase = createClient();
              const { data: { session } } = await supabase.auth.getSession();
              if (session) {
                await fetch(`${apiUrl}/questions/clear-cache?subject_id=${subjectId}`, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                  },
                });
              }
            } catch (err) {
              console.warn('Failed to clear cache on add:', err);
            }
          }
          fetchQuestions(subjectId as string);
        }} 
      />

      {/* Question Modal */}
      <QuestionModal
        question={selectedQuestion}
        onClose={handleCloseModal}
        theme={theme}
        onNext={handleNextQuestion}
        onPrev={handlePrevQuestion}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />

      {/* Conditionally Render Translator for Tamils Subject */}
      {subjectId === 'a1000000-0000-0000-0000-000000000006' && (
        <TranslatorPopup />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            if (subjectId === 'a1000000-0000-0000-0000-000000000006') {
              // Force reload to clear Google Translate DOM mutations
              window.location.href = '/dashboard';
            } else {
              router.push('/dashboard');
            }
          }}
          className="flex items-center gap-2 text-text-white/40 hover:text-arc-blue transition-colors mb-6"
          id="back-to-dashboard"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-rajdhani text-xs uppercase tracking-[2px]">Dashboard</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex justify-between items-center"
        >
          <h1
            className="font-orbitron text-xl md:text-2xl text-arc-blue font-bold uppercase tracking-wider"
            style={{ textShadow: '0 0 12px rgba(0,217,255,0.4)' }}
          >
            {subjectName || 'Loading...'}
          </h1>
          
          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-terminal-green/10 border border-terminal-green/50 text-terminal-green font-orbitron text-xs tracking-widest uppercase rounded-lg hover:bg-terminal-green/20 hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all flex items-center gap-2"
            >
              <span>+</span>
              <span className="hidden sm:inline">Add Node</span>
            </button>
          )}
        </motion.div>

        {isAdmin && studyStats && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-panel p-4 mb-6 border border-terminal-green/20"
          >
            <p className="font-orbitron text-[10px] text-terminal-green tracking-[3px] uppercase mb-3">
              Admin Intel — {subjectName}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-mono text-[10px] text-text-white/40 uppercase">Users Studying</p>
                <p className="font-orbitron text-2xl text-arc-blue">{studyStats.studying_count}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-text-white/40 uppercase">Active This Week</p>
                <p className="font-orbitron text-2xl text-terminal-green">{studyStats.recently_active}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-rajdhani text-[11px] text-text-white/50 uppercase tracking-[3px]">
              Completion Progress
            </span>
            <span
              className="font-mono text-sm font-bold"
              style={{
                color: completionPercent >= 100 ? 'var(--terminal-green)' : 'var(--arc-blue)',
                textShadow: completionPercent >= 100
                  ? '0 0 8px rgba(0,255,65,0.5)'
                  : '0 0 8px rgba(0,217,255,0.5)',
              }}
            >
              {completionPercent}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercent}%` }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              style={{
                background: completionPercent >= 100
                  ? 'var(--terminal-green)'
                  : 'var(--arc-blue)',
                boxShadow: completionPercent >= 100
                  ? '0 0 12px rgba(0,255,65,0.5)'
                  : '0 0 12px rgba(0,217,255,0.5)',
              }}
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="font-mono text-[10px] text-text-white/30">
              {viewedCount} / {totalQuestions} questions
            </span>
            {completionPercent >= 100 && (
              <span className="font-rajdhani text-[10px] uppercase tracking-[2px] text-terminal-green">
                ✓ Mastered
              </span>
            )}
          </div>
        </motion.div>

        {/* Question List */}
        {!isLoading ? (
          <QuestionList
            questions={questions}
            onSelect={handleSelectQuestion}
            onDelete={isAdmin ? handleDeleteQuestion : undefined}
          />
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-arc-blue/40 border-t-arc-blue animate-spin" />
              <p className="font-mono text-xs text-arc-blue/40">Loading questions...</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
