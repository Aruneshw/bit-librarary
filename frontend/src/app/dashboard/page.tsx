'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useSubjectStore } from '@/store/subjectStore';
import SubjectOrbit from '@/components/dashboard/SubjectOrbit';
import SubjectCardStack from '@/components/dashboard/SubjectCardStack';
import IntroAnimation from '@/components/animations/IntroAnimation';
import TutorialModal from '@/components/tutorial/TutorialModal';
import { createClient } from '@/lib/supabase';

export default function DashboardPage() {
  const { user, avatarUrl, isAuthenticated, isLoading: authLoading, fetchUser, signOut } = useAuthStore();
  const { subjects, isLoading: subjectsLoading, fetchSubjects } = useSubjectStore();
  const router = useRouter();

  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch user if not loaded
  useEffect(() => {
    if (!isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated, fetchUser]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch subjects when user is ready
  useEffect(() => {
    if (user?.department) {
      fetchSubjects(user.department);
    }
  }, [user?.department, fetchSubjects]);

  // Check tutorial status
  useEffect(() => {
    const checkTutorial = async () => {
      if (!user) return;
      const supabase = createClient();
      const { data } = await supabase
        .from('settings')
        .select('tutorial_seen')
        .eq('user_id', user.id)
        .single();

      if (data && !data.tutorial_seen) {
        setShowTutorial(true);
      }
    };
    if (introComplete) checkTutorial();
  }, [introComplete, user]);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    setIntroComplete(true);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="arc-bg" />
        <div className="relative z-10 w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-arc-blue/40"
            style={{ animation: 'spin-clockwise 2s linear infinite' }} />
          <div className="absolute inset-3 rounded-full bg-arc-blue/20"
            style={{ boxShadow: '0 0 20px rgba(0,217,255,0.5)' }} />
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background */}
      <div className="arc-bg" />

      {/* Intro Animation */}
      {showIntro && (
        <IntroAnimation
          subjectCount={subjects.length || 6}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Tutorial Modal */}
      <TutorialModal
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
      />

      {/* Dashboard Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 pointer-events-none z-50">
          <div className="flex items-center gap-3 pointer-events-auto">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" className="w-10 h-10 rounded-full border border-arc-blue/30" />
            ) : (
              <div className="w-10 h-10 rounded-full border border-arc-blue/30 bg-arc-blue/10 flex items-center justify-center">
                <span className="font-orbitron text-arc-blue font-bold text-sm">
                  {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h1
                className="font-orbitron text-arc-blue text-lg font-bold tracking-wider"
                style={{ textShadow: '0 0 12px rgba(0,217,255,0.4)' }}
              >
                BIT LIBRARY
              </h1>
              <p className="font-mono text-[10px] text-text-white/60 tracking-wider mt-0.5">
                {user?.name || user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 pointer-events-auto">
            {user?.department && (
              <span className="font-rajdhani text-xs text-arc-blue/60 uppercase tracking-[3px] border border-arc-blue/20 px-3 py-1 rounded-lg">
                {user.department}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="font-rajdhani text-xs text-text-white/40 uppercase tracking-wider hover:text-warning-red transition-colors"
              id="logout-btn"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Subject Display */}
        {!subjectsLoading && introComplete && (
          <div className="w-full pb-12 pt-24 lg:pt-0">
            {/* Compact reactor + title for mobile */}
            {isMobile && (
              <div className="flex flex-col items-center mb-8">
                {/* Compact ARC Reactor */}
                <div className="relative w-24 h-24 mb-4">
                  <div className="absolute inset-0 rounded-full border border-arc-blue/30"
                    style={{ animation: 'spin-counter 8s linear infinite' }} />
                  <div className="absolute inset-2 rounded-full border border-arc-blue/50"
                    style={{ animation: 'spin-clockwise 6s linear infinite' }} />
                  <div className="absolute inset-4 rounded-full bg-arc-blue/10"
                    style={{ boxShadow: '0 0 20px rgba(0,217,255,0.3)', animation: 'pulse-glow-blue 3s ease-in-out infinite' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-arc-blue"
                    style={{ boxShadow: '0 0 8px rgba(0,217,255,0.8)' }} />
                </div>

                <h2 className="font-orbitron text-sm text-arc-blue/60 uppercase tracking-[4px]">
                  Knowledge Nodes
                </h2>
              </div>
            )}

            {isMobile ? (
              <SubjectCardStack subjects={subjects} />
            ) : (
              <SubjectOrbit subjects={subjects} />
            )}
          </div>
        )}

        {/* Loading State */}
        {subjectsLoading && introComplete && (
          <div className="flex items-center justify-center mt-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-arc-blue/40 border-t-arc-blue animate-spin" />
              <p className="font-mono text-xs text-arc-blue/40">Loading subjects...</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
