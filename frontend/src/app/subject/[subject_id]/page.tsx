'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useProgressStore } from '@/store/progressStore';
import { useSubjectStore } from '@/store/subjectStore';
import QuestionList from '@/components/questions/QuestionList';
import QuestionModal from '@/components/questions/QuestionModal';
import CompletionCelebration from '@/components/animations/CompletionCelebration';
import { type QuestionWithStatus } from '@/types';
import { createClient } from '@/lib/supabase';

export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.subject_id as string;

  const { user, isAuthenticated, isLoading: authLoading, fetchUser } = useAuthStore();
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

  // Fetch user
  useEffect(() => {
    if (!isAuthenticated && !authLoading) fetchUser();
  }, [isAuthenticated, authLoading, fetchUser]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push('/login');
  }, [authLoading, isAuthenticated, router]);

  // Fetch subject name
  useEffect(() => {
    const fetchSubjectName = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('subjects')
        .select('subject_name')
        .eq('id', subjectId)
        .single();
      if (data) setSubjectName(data.subject_name);
    };
    fetchSubjectName();
  }, [subjectId]);

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
    setPrevCompletion(completionPercent);
  }, [completionPercent, prevCompletion, totalQuestions]);

  const handleSelectQuestion = (question: QuestionWithStatus) => {
    setSelectedQuestion(question);
  };

  const handleCloseModal = useCallback(async () => {
    if (selectedQuestion && !selectedQuestion.viewed) {
      await markViewed(selectedQuestion.id, subjectId);
      // Update the subject store too
      updateSubjectProgress(subjectId, viewedCount + 1, totalQuestions);
    }
    setSelectedQuestion(null);
  }, [selectedQuestion, subjectId, markViewed, updateSubjectProgress, viewedCount, totalQuestions]);

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

      {/* Question Modal */}
      <QuestionModal
        question={selectedQuestion}
        onClose={handleCloseModal}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/dashboard')}
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
          className="mb-8"
        >
          <h1
            className="font-orbitron text-xl md:text-2xl text-arc-blue font-bold uppercase tracking-wider"
            style={{ textShadow: '0 0 12px rgba(0,217,255,0.4)' }}
          >
            {subjectName || 'Loading...'}
          </h1>
        </motion.div>

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
