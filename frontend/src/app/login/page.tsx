'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BootSequence from '@/components/animations/BootSequence';
import AuthorizationCard from '@/components/auth/AuthorizationCard';
import DepartmentSelector from '@/components/auth/DepartmentSelector';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const [phase, setPhase] = useState<'boot' | 'auth'>('boot');
  const { user, isAuthenticated, isAdmin, fetchUser, isLoading } = useAuthStore();
  const router = useRouter();
  const needsDepartment = !isLoading && isAuthenticated && !isAdmin && Boolean(user && !user.department);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && (user?.department || isAdmin)) {
      router.replace('/dashboard');
    }
  }, [isLoading, isAuthenticated, isAdmin, user, router]);

  const handleBootComplete = () => {
    setPhase('auth');
  };

  const handleDepartmentSelect = () => {
    router.replace('/dashboard');
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dot grid background */}
      <div className="arc-bg" />

      {/* Boot Sequence */}
      {phase === 'boot' && <BootSequence onComplete={handleBootComplete} />}

      {/* Authorization Screen */}
      {phase === 'auth' && (
        <div className="relative z-10 flex flex-col items-center">
          {needsDepartment ? (
            <div className="relative glass-panel-green px-8 py-10 w-[340px] md:w-[420px] flex flex-col items-center gap-5">
              <h1
                className="font-orbitron text-arc-blue text-2xl md:text-[28px] font-bold tracking-wider"
                style={{ textShadow: '0 0 12px rgba(0,217,255,0.5)' }}
              >
                BIT LIBRARY
              </h1>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-terminal-green/40 to-transparent" />

              <div className="flex flex-col items-center gap-1">
                <p className="font-rajdhani text-[13px] text-text-white/60 uppercase tracking-[4px]">
                  Operator Verified
                </p>
                <p className="font-mono text-xs text-terminal-green break-all text-center">
                  {user?.name || user?.email}
                </p>
              </div>

              <DepartmentSelector onSelect={handleDepartmentSelect} />
            </div>
          ) : (
            <AuthorizationCard />
          )}
        </div>
      )}
    </main>
  );
}
