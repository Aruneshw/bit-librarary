'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function PollComposer({ isOpen, onClose, onCreated }: Props) {
  const { user } = useAuthStore();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [showLiveResults, setShowLiveResults] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const addOption = () => {
    if (options.length >= 20) return;
    setOptions([...options, '']);
  };

  const removeOption = (i: number) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, idx) => idx !== i));
  };

  const updateOption = (i: number, val: string) => {
    const next = [...options];
    next[i] = val;
    setOptions(next);
  };

  const reset = () => {
    setQuestion('');
    setOptions(['', '']);
    setEndDate('');
    setEndTime('');
    setMultipleChoice(false);
    setAnonymous(false);
    setShowLiveResults(true);
    setError('');
    setSuccess(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || options.filter((o) => o.trim()).length < 2) {
      setError('Question and at least 2 options required.');
      return;
    }
    setCreating(true);
    setError('');

    try {
      const supabase = createClient();

      const endDateTime = endDate && endTime
        ? new Date(`${endDate}T${endTime}`).toISOString()
        : null;

      const { data: poll, error: pollErr } = await supabase
        .from('polls')
        .insert({
          question: question.trim(),
          created_by: user?.id || null,
          end_date: endDateTime,
          multiple_choice: multipleChoice,
          anonymous,
          show_live_results: showLiveResults,
          status: 'active',
        })
        .select()
        .single();

      if (pollErr || !poll) {
        throw new Error(pollErr?.message || 'Failed to create poll');
      }

      const validOptions = options.filter((o) => o.trim()).map((text, i) => ({
        poll_id: poll.id,
        option_text: text.trim(),
        sort_order: i,
      }));

      const { error: optErr } = await supabase
        .from('poll_options')
        .insert(validOptions);

      if (optErr) throw new Error(optErr.message);

      setSuccess(true);
      onCreated?.();
      setTimeout(() => { reset(); onClose(); }, 1500);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) { reset(); onClose(); } }}
        >
          <motion.div
            initial={{ scale: 0.95, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 40 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="w-full sm:max-w-lg bg-black/90 border border-arc-blue/30 rounded-t-2xl sm:rounded-xl p-6 relative max-h-[90vh] overflow-y-auto"
            style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
          >
            {/* Close */}
            <button
              onClick={() => { reset(); onClose(); }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {success ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="w-14 h-14 rounded-full bg-terminal-green/20 border border-terminal-green flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00FF41" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </motion.div>
                <p className="font-orbitron text-sm text-terminal-green">Poll Created!</p>
              </div>
            ) : (
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📊</span>
                  <h2 className="font-orbitron text-sm text-amber-400 tracking-widest uppercase">Create Poll</h2>
                </div>

                {/* Question */}
                <div>
                  <label className="font-mono text-[10px] text-white/40 uppercase tracking-wider block mb-1">Poll Question</label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Which subject needs more study materials?"
                    rows={2}
                    className="w-full bg-black/60 border border-arc-blue/30 rounded p-2.5 text-white font-mono text-sm focus:outline-none focus:border-arc-blue resize-none"
                  />
                </div>

                {/* Options */}
                <div>
                  <label className="font-mono text-[10px] text-white/40 uppercase tracking-wider block mb-1">
                    Options ({options.length}/20)
                  </label>
                  <div className="space-y-1.5">
                    {options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-white/30 w-5 shrink-0">{i + 1}.</span>
                        <input
                          value={opt}
                          onChange={(e) => updateOption(i, e.target.value)}
                          placeholder={`Option ${i + 1}`}
                          className="flex-1 bg-black/60 border border-arc-blue/20 rounded px-2.5 py-1.5 text-white font-mono text-sm focus:outline-none focus:border-arc-blue"
                        />
                        {options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(i)}
                            className="text-warning-red/50 hover:text-warning-red p-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {options.length < 20 && (
                    <button
                      type="button"
                      onClick={addOption}
                      className="mt-1.5 text-[10px] font-mono text-arc-blue/60 hover:text-arc-blue transition-colors"
                    >
                      + Add option
                    </button>
                  )}
                </div>

                {/* Settings row */}
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={multipleChoice}
                      onChange={(e) => setMultipleChoice(e.target.checked)}
                      className="w-3.5 h-3.5 accent-arc-blue"
                    />
                    <span className="font-mono text-[10px] text-white/60">Multiple choice</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className="w-3.5 h-3.5 accent-arc-blue"
                    />
                    <span className="font-mono text-[10px] text-white/60">Anonymous voting</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showLiveResults}
                      onChange={(e) => setShowLiveResults(e.target.checked)}
                      className="w-3.5 h-3.5 accent-arc-blue"
                    />
                    <span className="font-mono text-[10px] text-white/60">Show live results</span>
                  </label>
                </div>

                {/* End date */}
                <div>
                  <label className="font-mono text-[10px] text-white/40 uppercase tracking-wider block mb-1">Auto-close (optional)</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="flex-1 bg-black/60 border border-arc-blue/20 rounded px-2.5 py-1.5 text-white font-mono text-sm focus:outline-none focus:border-arc-blue"
                    />
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="flex-1 bg-black/60 border border-arc-blue/20 rounded px-2.5 py-1.5 text-white font-mono text-sm focus:outline-none focus:border-arc-blue"
                    />
                  </div>
                </div>

                {error && (
                  <p className="font-mono text-[10px] text-warning-red">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={creating || !question.trim() || options.filter((o) => o.trim()).length < 2}
                  className="w-full py-2.5 bg-amber-400/10 border border-amber-400 text-amber-400 font-orbitron text-xs tracking-widest uppercase rounded-lg hover:bg-amber-400/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {creating ? 'Creating...' : 'Create Poll'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
