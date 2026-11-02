'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthorizationCard from '@/components/auth/AuthorizationCard';
import DepartmentSelector from '@/components/auth/DepartmentSelector';
import { useAuthStore } from '@/store/authStore';
import { resolvePostLoginPath } from '@/lib/auth/redirect';

export default function LoginPage() {
  const { user, isAuthenticated, isAdmin, fetchUser, isLoading } = useAuthStore();
  const router = useRouter();
  const [authError, setAuthError] = useState('');
  const destination = () => resolvePostLoginPath(new URLSearchParams(window.location.search).get('next'), isAdmin);
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('error');
    if (code) queueMicrotask(() => setAuthError(code === 'campus-account-required' ? 'Please use your verified campus Google account or an approved admin account.' : code === 'profile-unavailable' ? 'Your profile could not be loaded. Please try signing in again.' : 'Sign-in could not be completed. Please try again.'));
  }, []);
  const needsDepartment = !isLoading && isAuthenticated && !isAdmin && Boolean(user && !user.department);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && (user?.department || isAdmin)) {
      router.replace(destination());
    }
  }, [isLoading, isAuthenticated, isAdmin, user, router]);

  const handleDepartmentSelect = () => {
    router.replace(destination());
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dot grid background */}
      <div className="arc-bg" />

      {/* Authorization Screen */}
      <div className="relative z-10 flex flex-col items-center">
        {needsDepartment ? (
          <div className="relative glass-panel-green px-8 py-10 w-[340px] md:w-[420px] flex flex-col items-center gap-5">
            <h1
              className="font-orbitron text-arc-blue text-2xl md:text-[28px] font-bold tracking-wider"
              style={{ textShadow: '0 0 12px rgba(0,217,255,0.5)' }}
            >
              BIT HUB
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
          <><AuthorizationCard />{authError && <p role="alert" className="mt-4 max-w-sm text-center text-warning-red">{authError}</p>}</>
        )}
      </div>
    </main>
  );
}
