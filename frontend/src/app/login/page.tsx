'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BootSequence from '@/components/animations/BootSequence';
import AuthorizationCard from '@/components/auth/AuthorizationCard';
import DepartmentSelector from '@/components/auth/DepartmentSelector';
import { useAuthStore } from '@/store/authStore';
import { type Department } from '@/types';

export default function LoginPage() {
  const [phase, setPhase] = useState<'boot' | 'auth' | 'department'>('boot');
  const { user, isAuthenticated, fetchUser, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.department) {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, user, router]);

  const handleBootComplete = () => {
    setPhase('auth');
  };

  const handleDepartmentSelect = (_dept: Department) => {
    router.push('/dashboard');
  };

  // If user is authenticated but no department, show department selector
  useEffect(() => {
    if (isAuthenticated && user && !user.department) {
      setPhase('department');
    }
  }, [isAuthenticated, user]);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dot grid background */}
      <div className="arc-bg" />

      {/* Boot Sequence */}
      {phase === 'boot' && <BootSequence onComplete={handleBootComplete} />}

      {/* Authorization Screen */}
      {phase === 'auth' && (
        <div className="relative z-10 flex flex-col items-center">
          <AuthorizationCard />
        </div>
      )}

      {/* Department Selection */}
      {phase === 'department' && (
        <div className="relative z-10 flex flex-col items-center">
          <AuthorizationCard />
          <DepartmentSelector onSelect={handleDepartmentSelect} />
        </div>
      )}
    </main>
  );
}
