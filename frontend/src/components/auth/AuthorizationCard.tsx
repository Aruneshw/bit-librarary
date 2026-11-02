'use client';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { safeNextPath } from '@/lib/auth/redirect';

export default function AuthorizationCard() {
  const signInWithGoogle = useAuthStore(s => s.signInWithGoogle);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function signIn() {
    setError(''); setLoading(true);
    try { await signInWithGoogle(safeNextPath(new URLSearchParams(window.location.search).get('next'))); }
    catch { setError('Google sign-in could not start. Please try again.'); setLoading(false); }
  }
  return <div className="glass-panel-green px-8 py-10 w-[340px] md:w-[400px] flex flex-col items-center gap-6">
    <h1 className="font-orbitron text-arc-blue text-3xl font-bold tracking-wider">BIT HUB</h1>
    <p className="font-rajdhani text-lg text-white/80 text-center">Your next teammate is one conversation away.</p>
    <button id="google-sign-in-btn" type="button" onClick={signIn} disabled={loading} className="w-full min-h-12 px-5 py-3 bg-white text-gray-900 rounded-lg font-rajdhani text-lg font-semibold disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-arc-blue focus-visible:outline-offset-4">{loading ? 'Connecting to Google…' : 'Continue with Google'}</button>
    <p className="font-mono text-xs text-terminal-green text-center">Use your @bitsathy.ac.in account.</p>
    <p className="text-white/60 text-sm text-center">Your Google account connects you to BIT HUB and BIT Library.</p>
    {error && <p role="alert" className="text-warning-red text-sm text-center">{error}</p>}
  </div>;
}
