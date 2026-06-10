'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNoticeStore } from '@/store/noticeStore';
import type { FeatureItem } from '@/store/noticeStore';

export default function FeatureNoticeEditor() {
  const { featureNotice, fetchNotice, updateFeatureNotice, isLoading } = useNoticeStore();
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(5);
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchNotice();
  }, [fetchNotice]);

  useEffect(() => {
    if (featureNotice) {
      setMessage(featureNotice.message);
      setDuration(featureNotice.duration_seconds);
      setFeatures(featureNotice.features || []);
    }
  }, [featureNotice]);

  const addFeature = () => {
    setFeatures([...features, { title: '', description: '' }]);
  };

  const removeFeature = (i: number) => {
    setFeatures(features.filter((_, idx) => idx !== i));
  };

  const updateFeature = (i: number, field: keyof FeatureItem, val: string) => {
    const next = [...features];
    next[i] = { ...next[i], [field]: val };
    setFeatures(next);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const success = await updateFeatureNotice({
      message: message.trim(),
      features: features.filter((f) => f.title.trim()),
      duration_seconds: duration,
    });
    setSaving(false);
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 border border-arc-blue/20 rounded-xl backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,217,255,0.05)]"
    >
      <div className="p-6 border-b border-arc-blue/20 bg-arc-blue/5">
        <h2 className="font-orbitron text-xl text-white tracking-wider flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-arc-blue shadow-[0_0_8px_rgba(0,217,255,1)]" />
          Feature Notice Editor
        </h2>
        <p className="font-mono text-[10px] text-white/30 mt-1 ml-5">
          Edit the feature announcement shown to all users on login (auto-dismisses after configurable duration).
        </p>
      </div>

      <div className="p-6">
        {isLoading ? (
          <p className="text-center text-white/50 font-mono animate-pulse py-8">Loading...</p>
        ) : !featureNotice ? (
          <p className="text-center text-white/30 font-mono py-8">No feature notice found. Run the migration first.</p>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            {/* Heading */}
            <div>
              <label className="font-mono text-[10px] text-white/40 uppercase tracking-wider block mb-1">
                Heading Text
              </label>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="New Features Available"
                className="w-full bg-black/60 border border-arc-blue/30 rounded px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-arc-blue"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="font-mono text-[10px] text-white/40 uppercase tracking-wider block mb-1">
                Display Duration (seconds)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={2}
                  max={30}
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="flex-1 accent-arc-blue"
                />
                <span className="font-orbitron text-sm text-arc-blue w-8 text-right">{duration}s</span>
              </div>
              <div className="flex justify-between font-mono text-[8px] text-white/20 mt-0.5">
                <span>2s</span>
                <span>30s</span>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="font-mono text-[10px] text-white/40 uppercase tracking-wider block mb-1">
                Feature Items ({features.length})
              </label>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-2 items-start bg-white/[0.03] border border-white/[0.08] rounded-lg p-3">
                    <div className="flex-1 space-y-1.5">
                      <input
                        value={f.title}
                        onChange={(e) => updateFeature(i, 'title', e.target.value)}
                        placeholder="Feature title (e.g. Study Time Tracking)"
                        className="w-full bg-black/60 border border-arc-blue/20 rounded px-2.5 py-1.5 text-white font-orbitron text-xs focus:outline-none focus:border-arc-blue"
                      />
                      <input
                        value={f.description}
                        onChange={(e) => updateFeature(i, 'description', e.target.value)}
                        placeholder="Brief description of the feature"
                        className="w-full bg-black/60 border border-arc-blue/20 rounded px-2.5 py-1.5 text-white/80 font-mono text-[11px] focus:outline-none focus:border-arc-blue"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="text-warning-red/50 hover:text-warning-red p-1 mt-1.5 shrink-0"
                      title="Remove feature"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addFeature}
                className="mt-2 text-[10px] font-mono text-arc-blue/60 hover:text-arc-blue transition-colors"
              >
                + Add feature item
              </button>
            </div>

            {/* Save */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving || !message.trim()}
                className="px-5 py-2 bg-arc-blue/20 border border-arc-blue/40 text-arc-blue font-orbitron text-xs tracking-wider rounded-lg hover:bg-arc-blue/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {saving ? 'Saving...' : 'Save Feature Notice'}
              </button>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-mono text-[10px] text-terminal-green"
                >
                  ✓ Saved
                </motion.span>
              )}
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}
