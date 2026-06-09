'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

interface Props {
  mobileInline?: boolean;
  onOpen?: () => void;
}

export default function FeedbackForm({ mobileInline, onOpen }: Props) {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    setIsSubmitting(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('user_feedbacks')
      .insert({
        user_id: user.id,
        message: message.trim(),
      });

    setIsSubmitting(false);

    if (!error) {
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setMessage('');
      }, 3000);
    } else {
      console.error('Failed to submit feedback:', error);
    }
  };

  const openModal = () => {
    onOpen?.();
    setIsOpen(true);
  };

  const fabClass = mobileInline
    ? 'w-12 h-12 rounded-full bg-arc-blue/10 border border-arc-blue/30 backdrop-blur-md flex items-center justify-center text-arc-blue hover:bg-arc-blue/20 transition-all'
    : 'fixed w-12 h-12 rounded-full bg-arc-blue/10 border border-arc-blue/30 backdrop-blur-md flex items-center justify-center text-arc-blue hover:bg-arc-blue/20 hover:shadow-[0_0_15px_rgba(0,217,255,0.4)] transition-all duration-300 group';

  const fabStyle = mobileInline
    ? undefined
    : {
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
      };

  return (
    <>
      <button
        onClick={openModal}
        className={`${fabClass} ${mobileInline ? '' : 'z-50 fixed'}`}
        style={fabStyle}
        aria-label="Send Feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={mobileInline ? '' : 'group-hover:scale-110 transition-transform'}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        {mobileInline && <span className="sr-only">Feedback</span>}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
              className="w-full sm:max-w-md bg-black/90 border border-arc-blue/30 rounded-t-2xl sm:rounded-xl shadow-[0_0_40px_rgba(0,217,255,0.1)] p-6 relative max-h-[85vh] overflow-y-auto"
              style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-text-white/50 hover:text-white transition-colors p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <div className="mb-6 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-arc-blue/10 border border-arc-blue/30 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-arc-blue"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </div>
                <h3 className="font-orbitron text-lg sm:text-xl text-arc-blue tracking-widest text-center">TRANSMIT FEEDBACK</h3>
                <p className="font-mono text-xs text-text-white/50 mt-1 text-center">Report anomalies or suggest improvements</p>
              </div>

              {submitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-8">
                  <div className="w-12 h-12 rounded-full border-2 border-terminal-green flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terminal-green"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="font-orbitron text-terminal-green text-lg tracking-wider">TRANSMISSION SENT</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your transmission here..."
                    className="w-full bg-black/50 border border-arc-blue/30 rounded-lg p-3 text-text-white font-mono text-base sm:text-sm min-h-[120px] focus:outline-none focus:border-arc-blue focus:ring-1 focus:ring-arc-blue transition-all resize-none placeholder:text-text-white/20"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className="w-full px-6 py-3 bg-arc-blue/10 border border-arc-blue text-arc-blue font-orbitron text-sm font-bold tracking-wider rounded hover:bg-arc-blue/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND TRANSMISSION'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
