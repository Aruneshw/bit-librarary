'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function HomePage() {
  const router = useRouter();
  const { fetchUser, isAuthenticated, user, isLoading } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && user?.department) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="arc-bg" />
      <div className="relative z-10">
        <div className="relative w-12 h-12">
          <div
            className="absolute inset-0 rounded-full border-2 border-arc-blue/40"
            style={{ animation: 'spin-clockwise 2s linear infinite' }}
          />
          <div
            className="absolute inset-2 rounded-full bg-arc-blue/20"
            style={{ boxShadow: '0 0 20px rgba(0,217,255,0.5)' }}
          />
        </div>
      </div>
    </div>
  );
}
