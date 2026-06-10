'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

export interface PollOption {
  id: string;
  option_text: string;
  sort_order: number;
}

export interface PollData {
  id: string;
  question: string;
  created_by: string | null;
  created_at: string;
  end_date: string | null;
  multiple_choice: boolean;
  anonymous: boolean;
  show_live_results: boolean;
  status: 'active' | 'closed';
  options: PollOption[];
}

interface PollResults {
  total_votes: number;
  options: {
    option_id: string;
    option_text: string;
    votes: number;
    percentage: number;
  }[];
  user_vote: { option_id: string }[] | null;
}

interface Props {
  poll: PollData;
  onEdit?: (poll: PollData) => void;
  onDelete?: (pollId: string) => void;
}

export default function PollCard({ poll, onEdit, onDelete }: Props) {
  const { user, isAdmin } = useAuthStore();
  const [results, setResults] = useState<PollResults | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [voting, setVoting] = useState(false);
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [managing, setManaging] = useState(false);

  const isClosed = poll.status === 'closed' || (poll.end_date ? new Date(poll.end_date) < new Date() : false);

  const fetchResults = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase.rpc('get_poll_results', { p_poll_id: poll.id });
      if (data) {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        setResults(parsed);
        if (parsed.user_vote && parsed.user_vote.length > 0) {
          setVoted(true);
          setSelectedOptions(new Set(parsed.user_vote.map((v: any) => v.option_id)));
        }
      }
    } catch { /* ignore */ }
  }, [poll.id]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  useEffect(() => {
    if (!poll.show_live_results && !voted && !isClosed) return;
    const supabase = createClient();
    const channel = supabase
      .channel(`poll-${poll.id}`)
      .on(
        'postgres_changes' as any,
        { event: '*', schema: 'public', table: 'poll_votes', filter: `poll_id=eq.${poll.id}` },
        () => fetchResults(),
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [poll.id, poll.show_live_results, voted, isClosed, fetchResults]);

  const toggleOption = (optionId: string) => {
    if (voted || isClosed) return;
    setSelectedOptions((prev) => {
      const next = new Set(prev);
      if (poll.multiple_choice) {
        if (next.has(optionId)) next.delete(optionId);
        else next.add(optionId);
      } else {
        if (next.has(optionId)) next.delete(optionId);
        else { next.clear(); next.add(optionId); }
      }
      return next;
    });
  };

  const castVote = async () => {
    if (selectedOptions.size === 0 || voted || !user) return;
    setVoting(true);
    setError('');
    try {
      const res = await fetch('/api/polls/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pollId: poll.id,
          optionIds: Array.from(selectedOptions),
          userId: user.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Vote failed');
      setVoted(true);
      await fetchResults();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setVoting(false);
    }
  };

  const handleClose = async () => {
    setManaging(true);
    try {
      await fetch('/api/polls/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'close', pollId: poll.id }),
      });
      poll.status = 'closed';
    } finally {
      setManaging(false);
    }
  };

  const handleReopen = async () => {
    setManaging(true);
    try {
      await fetch('/api/polls/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reopen', pollId: poll.id }),
      });
      poll.status = 'active';
    } finally {
      setManaging(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch('/api/polls/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', pollId: poll.id }),
      });
      onDelete?.(poll.id);
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const showResults = voted || isClosed || !poll.show_live_results;

  const totalVotes = results?.total_votes ?? 0;
  const maxVotes = Math.max(...(results?.options.map((o) => o.votes) ?? [0]), 1);

  const isExpired = isClosed && !voted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-4 border border-amber-400/20 relative"
    >
      {/* Admin controls */}
      {isAdmin && (
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <button
            onClick={() => onEdit?.(poll)}
            className="p-1.5 rounded bg-white/5 hover:bg-arc-blue/20 border border-white/10 hover:border-arc-blue/30 transition-all group"
            title="Edit poll"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-arc-blue transition-colors">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-1.5 rounded bg-white/5 hover:bg-warning-red/20 border border-white/10 hover:border-warning-red/30 transition-all group"
            title="Delete poll"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-warning-red transition-colors">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
          {poll.status === 'active' ? (
            <button
              onClick={handleClose}
              disabled={managing}
              className="px-1.5 py-1 rounded bg-white/5 hover:bg-warning-red/20 border border-white/10 hover:border-warning-red/30 text-[8px] font-mono text-white/40 hover:text-warning-red transition-all disabled:opacity-50"
            >
              Close
            </button>
          ) : (
            <button
              onClick={handleReopen}
              disabled={managing}
              className="px-1.5 py-1 rounded bg-white/5 hover:bg-terminal-green/20 border border-white/10 hover:border-terminal-green/30 text-[8px] font-mono text-white/40 hover:text-terminal-green transition-all disabled:opacity-50"
            >
              Reopen
            </button>
          )}
        </div>
      )}

      {/* Delete confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center"
          >
            <div className="text-center p-6">
              <p className="font-orbitron text-xs text-warning-red mb-2">Delete this poll?</p>
              <p className="font-mono text-[10px] text-white/40 mb-4">This action cannot be undone.</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-3 py-1.5 bg-warning-red/10 border border-warning-red text-warning-red font-orbitron text-[10px] tracking-wider rounded-lg hover:bg-warning-red/20 disabled:opacity-50 transition-all"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/60 font-orbitron text-[10px] tracking-wider rounded-lg hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📊</span>
        <span className="font-orbitron text-[10px] text-amber-400/70 uppercase tracking-widest">Poll</span>
        {isExpired && (
          <span className="font-mono text-[9px] text-white/40 bg-white/10 px-1.5 py-0.5 rounded">Closed</span>
        )}
        {isAdmin && (
          <span className="font-mono text-[9px] text-arc-blue/40 bg-arc-blue/10 px-1.5 py-0.5 rounded ml-auto">
            {totalVotes} vote{totalVotes !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Question */}
      <h3 className="font-orbitron text-sm text-white mb-3">{poll.question}</h3>

      {/* Options */}
      <div className="space-y-2">
        {poll.options.sort((a, b) => a.sort_order - b.sort_order).map((option) => {
          const optResult = results?.options.find((r) => r.option_id === option.id);
          const voteCount = optResult?.votes ?? 0;
          const percentage = optResult?.percentage ?? 0;
          const isSelected = selectedOptions.has(option.id);
          const barWidth = showResults && totalVotes > 0 ? percentage : 0;
          const isWinner = showResults && voteCount === maxVotes && maxVotes > 0;

          return (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              disabled={voted || isClosed}
              className={`relative w-full text-left p-3 rounded-lg border transition-all overflow-hidden ${
                isSelected
                  ? 'border-amber-400 bg-amber-400/10'
                  : voted || isClosed
                    ? 'border-white/10 bg-white/5'
                    : 'border-white/10 bg-white/5 hover:border-amber-400/30 hover:bg-amber-400/5'
              } ${voted || isClosed ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {/* Bar background */}
              {showResults && totalVotes > 0 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`absolute inset-0 rounded-lg ${
                    isWinner ? 'bg-terminal-green/10' : 'bg-amber-400/8'
                  }`}
                  style={{
                    background: isWinner
                      ? 'linear-gradient(90deg, rgba(0,255,65,0.12) 0%, rgba(0,255,65,0.04) 100%)'
                      : 'linear-gradient(90deg, rgba(251,191,36,0.1) 0%, rgba(251,191,36,0.03) 100%)',
                  }}
                />
              )}

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected ? 'border-amber-400 bg-amber-400' : 'border-white/30'
                  }`}>
                    {isSelected && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <span className={`font-mono text-sm ${voted || isClosed ? 'text-white/70' : 'text-white/90'} truncate`}>
                    {option.option_text}
                  </span>
                  {isWinner && showResults && totalVotes > 0 && (
                    <span className="font-mono text-[9px] text-terminal-green shrink-0">Leading</span>
                  )}
                </div>
                {showResults && totalVotes > 0 && (
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="font-orbitron text-xs text-amber-400">{percentage}%</span>
                    <span className="font-mono text-[9px] text-white/40 w-8 text-right">{voteCount}</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Vote button */}
      {!voted && !isClosed && (
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={castVote}
            disabled={selectedOptions.size === 0 || voting}
            className={`px-4 py-2 text-xs font-orbitron tracking-widest uppercase rounded-lg border transition-all ${
              selectedOptions.size > 0
                ? 'bg-amber-400/10 border-amber-400 text-amber-400 hover:bg-amber-400/20 hover:shadow-[0_0_12px_rgba(251,191,36,0.15)]'
                : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {voting ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-amber-400/40 border-t-amber-400 animate-spin" />
                Voting...
              </span>
            ) : (
              `Vote${poll.multiple_choice ? ' (' + selectedOptions.size + ')' : ''}`
            )}
          </button>
          {error && <span className="font-mono text-[10px] text-warning-red">{error}</span>}
        </div>
      )}

      {/* Voted confirmation */}
      {voted && (
        <div className="mt-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
          <span className="font-mono text-[10px] text-terminal-green">Vote recorded</span>
          {totalVotes > 0 && (
            <span className="font-mono text-[9px] text-white/30 ml-auto">{totalVotes} total vote{totalVotes !== 1 ? 's' : ''}</span>
          )}
        </div>
      )}

      {isClosed && !voted && (
        <div className="mt-3 font-mono text-[10px] text-white/40">This poll is closed.</div>
      )}

      {/* Expiry info */}
      {poll.end_date && (
        <div className="mt-2 font-mono text-[9px] text-white/30">
          {isClosed ? 'Ended' : 'Ends'}: {new Date(poll.end_date).toLocaleString()}
        </div>
      )}
    </motion.div>
  );
}
