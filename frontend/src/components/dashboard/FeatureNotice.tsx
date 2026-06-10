'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNoticeStore } from '@/store/noticeStore';
import { useAuthStore } from '@/store/authStore';
import { createClient } from '@/lib/supabase';
import type { FeatureItem } from '@/store/noticeStore';

export default function FeatureNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState('');
  const [editDuration, setEditDuration] = useState(5);
  const [editFeatures, setEditFeatures] = useState<FeatureItem[]>([]);

  const { featureNotice, fetchNotice, updateFeatureNotice, isLoading } = useNoticeStore();
  const { isAdmin } = useAuthStore();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetchNotice();
  }, [fetchNotice]);

  useEffect(() => {
    const shown = sessionStorage.getItem('feature_notice_shown');
    if (!shown && featureNotice) {
      setIsVisible(true);
      sessionStorage.setItem('feature_notice_shown', 'true');
    }

    const supabase = createClient();
    const channel = supabase
      .channel('feature-notices-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'system_notices' },
        () => {
          fetchNotice();
          const alreadyShown = sessionStorage.getItem('feature_notice_shown');
          if (!alreadyShown) setIsVisible(true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [featureNotice, fetchNotice]);

  // Auto-dismiss timer
  useEffect(() => {
    if (!isVisible || isEditing || isAdmin) return;
    const duration = (featureNotice?.duration_seconds ?? 5) * 1000;
    timerRef.current = setTimeout(() => setIsVisible(false), duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible, isEditing, isAdmin, featureNotice?.duration_seconds]);

  const handleStartEdit = () => {
    if (!featureNotice) return;
    setEditMessage(featureNotice.message);
    setEditDuration(featureNotice.duration_seconds);
    setEditFeatures(featureNotice.features || []);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateFeatureNotice({
      message: editMessage.trim(),
      features: editFeatures,
      duration_seconds: editDuration,
    });
    if (success) setIsEditing(false);
  };

  const addFeature = () => {
    setEditFeatures([...editFeatures, { title: '', description: '' }]);
  };

  const removeFeature = (i: number) => {
    setEditFeatures(editFeatures.filter((_, idx) => idx !== i));
  };

  const updateFeature = (i: number, field: keyof FeatureItem, val: string) => {
    const next = [...editFeatures];
    next[i] = { ...next[i], [field]: val };
    setEditFeatures(next);
  };

  const dismiss = () => {
    setIsVisible(false);
    if (isEditing) setIsEditing(false);
  };

  const featureIcon = (title: string): string => {
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
  };

  if (isLoading || !featureNotice) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto w-[92%] max-w-[520px]"
        >
          <div className="relative overflow-hidden border border-arc-blue/20 bg-black/70 backdrop-blur-xl rounded-xl shadow-[0_0_40px_rgba(0,217,255,0.1)]">
            {/* Shimmer line */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-arc-blue/50 to-transparent" />

            <div className="p-4 sm:p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-arc-blue/10 border border-arc-blue/30 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-arc-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="font-orbitron text-[10px] text-arc-blue tracking-widest uppercase drop-shadow-[0_0_5px_rgba(0,217,255,0.5)]">
                    {featureNotice.message || 'New Features'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {isAdmin && !isEditing && (
                    <button
                      onClick={handleStartEdit}
                      className="text-[9px] font-orbitron text-arc-blue/60 hover:text-arc-blue border border-arc-blue/20 px-2 py-0.5 rounded bg-arc-blue/5 transition-all"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={dismiss}
                    className="text-white/30 hover:text-white/60 text-sm px-1 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Editing mode */}
              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-3">
                  <div>
                    <label className="font-mono text-[9px] text-white/30 uppercase tracking-wider block mb-1">Heading</label>
                    <input
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      className="w-full bg-black/50 border border-arc-blue/30 rounded px-2.5 py-1.5 text-white font-mono text-sm focus:outline-none focus:border-arc-blue"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[9px] text-white/30 uppercase tracking-wider block mb-1">
                      Duration (seconds)
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={30}
                      value={editDuration}
                      onChange={(e) => setEditDuration(Math.max(2, Math.min(30, parseInt(e.target.value) || 5)))}
                      className="w-20 bg-black/50 border border-arc-blue/30 rounded px-2.5 py-1.5 text-white font-mono text-sm focus:outline-none focus:border-arc-blue"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[9px] text-white/30 uppercase tracking-wider block mb-1">
                      Features ({editFeatures.length})
                    </label>
                    <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
                      {editFeatures.map((f, i) => (
                        <div key={i} className="flex gap-1.5 items-start bg-white/5 rounded p-2">
                          <div className="flex-1 space-y-1">
                            <input
                              value={f.title}
                              onChange={(e) => updateFeature(i, 'title', e.target.value)}
                              placeholder="Feature title"
                              className="w-full bg-black/50 border border-arc-blue/20 rounded px-2 py-1 text-white font-orbitron text-[10px] focus:outline-none focus:border-arc-blue"
                            />
                            <input
                              value={f.description}
                              onChange={(e) => updateFeature(i, 'description', e.target.value)}
                              placeholder="Description"
                              className="w-full bg-black/50 border border-arc-blue/20 rounded px-2 py-1 text-white/80 font-mono text-[9px] focus:outline-none focus:border-arc-blue"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFeature(i)}
                            className="text-warning-red/50 hover:text-warning-red p-1 mt-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="mt-1 text-[9px] font-mono text-arc-blue/60 hover:text-arc-blue transition-colors"
                    >
                      + Add feature
                    </button>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="text-[10px] font-mono text-white/40 hover:text-white/70 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-[10px] font-orbitron bg-arc-blue/20 text-arc-blue px-3 py-1.5 rounded border border-arc-blue/30 hover:bg-arc-blue/30 transition-all"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {/* Progress bar */}
                  <div className="h-0.5 bg-white/5 rounded-full mb-3 overflow-hidden">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: (featureNotice.duration_seconds ?? 5), ease: 'linear' }}
                      className="h-full bg-gradient-to-r from-arc-blue to-terminal-green rounded-full"
                      style={{ boxShadow: '0 0 6px rgba(0,217,255,0.4)' }}
                    />
                  </div>

                  {/* Feature list */}
                  {(featureNotice.features ?? []).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {featureNotice.features.map((feat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06]"
                        >
                          <span className="text-base shrink-0 mt-0.5">{featureIcon(feat.title)}</span>
                          <div className="min-w-0">
                            <p className="font-orbitron text-[9px] text-arc-blue/90 font-semibold tracking-wide truncate">
                              {feat.title}
                            </p>
                            <p className="font-mono text-[8px] text-white/50 leading-tight mt-0.5 line-clamp-2">
                              {feat.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-mono text-xs text-white/40 text-center py-3">
                      No features listed.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
