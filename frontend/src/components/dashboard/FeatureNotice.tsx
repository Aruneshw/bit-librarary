'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';

interface FeatureItem {
  title: string;
  description: string;
}

interface FeatureNoticeData {
  id: string;
  message: string;
  features: FeatureItem[];
  duration_seconds: number;
}

interface Props {
  onDismiss: () => void;
}

function featureIcon(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('time') || lower.includes('track')) return '⏱';
  if (lower.includes('title') || lower.includes('progression')) return '🏅';
  if (lower.includes('streak')) return '🔥';
  if (lower.includes('journey') || lower.includes('hub')) return '🗺';
  if (lower.includes('poll') || lower.includes('vot')) return '📊';
  if (lower.includes('storage') || lower.includes('upload')) return '💾';
  if (lower.includes('analytics') || lower.includes('dashboard')) return '📈';
  if (lower.includes('download')) return '📥';
  return '✨';
}

export default function FeatureNotice({ onDismiss }: Props) {
  const [data, setData] = useState<FeatureNoticeData | null>(null);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dismissedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const fetchNotice = async () => {
      try {
        const supabase = createClient();
        const { data: row } = await supabase
          .from('system_notices')
          .select('id, message, features, duration_seconds')
          .eq('is_active', true)
          .eq('notice_type', 'feature')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (cancelled) return;

        if (row) {
          setData(row as FeatureNoticeData);
        } else {
          // No feature notice — skip to dashboard
          if (!dismissedRef.current) {
            dismissedRef.current = true;
            onDismiss();
          }
        }
      } catch {
        if (!cancelled && !dismissedRef.current) {
          dismissedRef.current = true;
          onDismiss();
        }
      }
    };
    fetchNotice();
    return () => { cancelled = true; };
  }, [onDismiss]);

  // Auto-dismiss timer + progress bar
  useEffect(() => {
    if (!data) return;
    const durationMs = (data.duration_seconds || 5) * 1000;
    const interval = 50;
    const step = (interval / durationMs) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev - step;
        if (next <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          if (!dismissedRef.current) {
            dismissedRef.current = true;
            onDismiss();
          }
          return 0;
        }
        return next;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [data, onDismiss]);

  return (
    <AnimatePresence>
      <motion.div
        key="feature-notice"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black" />

        <div className="absolute inset-0 arc-bg opacity-20" />

        {!data ? (
          // Loading state — blocking spinner
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-arc-blue/40 border-t-arc-blue animate-spin" />
            <p className="font-mono text-[10px] text-arc-blue/40 uppercase tracking-[3px]">
              Initializing...
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="relative w-full max-w-lg mx-4"
          >
            <div className="relative overflow-hidden rounded-2xl border border-arc-blue/20 bg-black/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,217,255,0.08)]">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-arc-blue/10 rounded-full blur-3xl" />

              <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-arc-blue via-purple-400 to-terminal-green"
                  style={{ boxShadow: '0 0 10px rgba(0,217,255,0.5)' }}
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-arc-blue/10 border border-arc-blue/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-arc-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="font-orbitron text-lg text-white font-bold tracking-wide">
                      {data.message || 'New Features Available'}
                    </h1>
                    <p className="font-mono text-[10px] text-white/30 mt-0.5">
                      What&apos;s new on BIT Library
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {(data.features ?? []).map((feat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.04 }}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
                    >
                      <span className="text-lg shrink-0 mt-0.5">{featureIcon(feat.title)}</span>
                      <div>
                        <p className="font-orbitron text-[11px] text-arc-blue/90 font-semibold">
                          {feat.title}
                        </p>
                        <p className="font-mono text-[9px] text-white/50 leading-relaxed mt-0.5">
                          {feat.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="font-mono text-[9px] text-white/20 tracking-wider uppercase">
                    Automatically closing in {Math.ceil((progress / 100) * (data.duration_seconds || 5))}s
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
