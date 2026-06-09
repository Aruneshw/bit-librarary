'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectId: string;
  onSuccess: () => void;
}

export default function AddQuestionModal({ isOpen, onClose, subjectId, onSuccess }: AddQuestionModalProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [notes, setNotes] = useState('Unit 1 - 2-Mark');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    setIsSubmitting(true);
    const supabase = createClient();
    
    // Auto-generate order index (we can just put it high up or fetch max, simpler is high number or random so it appears at end)
    const { count } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('subject_id', subjectId);
      
    const nextOrder = (count || 0) + 1;

    const { error } = await supabase.from('questions').insert([
      {
        subject_id: subjectId,
        question: question.trim(),
        answer: answer.trim(),
        notes: notes.trim(),
        order_index: nextOrder,
        "references": "Admin Upload"
      }
    ]);

    setIsSubmitting(false);
    if (!error) {
      setQuestion('');
      setAnswer('');
      onSuccess();
      onClose();
    } else {
      alert("Failed to insert question: " + error.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-black border border-terminal-green/30 rounded-2xl shadow-[0_0_30px_rgba(0,255,65,0.15)] overflow-hidden"
          >
            <div className="p-6">
              <h2 className="font-orbitron text-xl text-terminal-green tracking-wider mb-6">Deploy New Question Node</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-rajdhani text-xs text-terminal-green uppercase tracking-widest mb-2">Question Title</label>
                  <textarea
                    required
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-text-white font-exo2 focus:outline-none focus:border-terminal-green transition-colors"
                    rows={2}
                  />
                </div>
                
                <div>
                  <label className="block font-rajdhani text-xs text-terminal-green uppercase tracking-widest mb-2">Answer (Markdown/Mermaid Supported)</label>
                  <textarea
                    required
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-text-white font-mono text-sm focus:outline-none focus:border-terminal-green transition-colors"
                    rows={8}
                  />
                </div>
                
                <div>
                  <label className="block font-rajdhani text-xs text-terminal-green uppercase tracking-widest mb-2">Unit / Type (e.g. "Unit 1 - 16-Mark")</label>
                  <input
                    required
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-text-white font-exo2 focus:outline-none focus:border-terminal-green transition-colors"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 border border-white/20 text-white/70 font-orbitron text-xs rounded hover:bg-white/10 transition-all"
                  >
                    Abort
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-terminal-green/20 border border-terminal-green/50 text-terminal-green font-orbitron text-xs rounded hover:bg-terminal-green/30 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'UPLOADING...' : 'INITIATE UPLOAD'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
