'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';

export default function AuthorizationCard() {
  const { signInWithGoogle } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch {
      setError('Authentication failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleBypassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all operator credentials.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/bypass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
      });
      const data = await res.json();
      if (data.success && data.actionLink) {
        window.location.href = data.actionLink;
      } else {
        setError(data.error || 'Invalid operator credentials.');
        setIsLoading(false);
      }
    } catch {
      setError('Bypass authorization failed.');
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Background reactor glow */}
      <div
        className="absolute -inset-20 rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,65,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Auth Card */}
      <div
        className="relative glass-panel-green px-10 py-10 w-[340px] md:w-[380px] flex flex-col items-center gap-5"
      >
        {/* Title */}
        <h1
          className="font-orbitron text-arc-blue text-2xl md:text-[28px] font-bold tracking-wider"
          style={{ textShadow: '0 0 12px rgba(0,217,255,0.5)' }}
        >
          BIT LIBRARY
        </h1>

        {/* Subtitle */}
        <p className="font-rajdhani text-[13px] text-text-white/60 uppercase tracking-[4px]">
          Authorization Required
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-terminal-green/40 to-transparent" />

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-800 rounded-lg font-rajdhani font-semibold text-sm tracking-wide hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          id="google-sign-in-btn"
        >
          {/* Google Icon */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {isLoading ? 'Connecting...' : 'Sign in with Google'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 w-full my-1">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-[2px] whitespace-nowrap">
            OR BYPASS WITH KEY
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* Bypass Form */}
        <form onSubmit={handleBypassSubmit} className="w-full flex flex-col gap-3">
          <div className="flex flex-col gap-1.5 text-left">
            <input
              type="text"
              placeholder="Operator ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-text-white font-mono text-xs focus:outline-none focus:border-terminal-green transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5 text-left">
            <input
              type="password"
              placeholder="Passcode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-text-white font-mono text-xs focus:outline-none focus:border-terminal-green transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-terminal-green/10 border border-terminal-green/30 text-terminal-green hover:bg-terminal-green/20 transition-all rounded-lg font-rajdhani text-xs font-semibold tracking-widest uppercase disabled:opacity-50"
          >
            {isLoading ? 'VERIFYING...' : '[ > AUTHORIZE KEY ]'}
          </button>
        </form>

        {/* Error Display */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-warning-red font-mono text-[10px] text-center"
          >
            {error}
          </motion.p>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-terminal-green/40 to-transparent" />

        {/* Domain Notice */}
        <p className="font-mono text-[10px] text-terminal-green tracking-wider">
          @bitsathy.ac.in only
        </p>
      </div>
    </motion.div>
  );
}
