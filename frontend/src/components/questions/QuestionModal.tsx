'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import mermaid from 'mermaid';
import { type QuestionWithStatus } from '@/types';

interface QuestionModalProps {
  question: QuestionWithStatus | null;
  onClose: () => void;
}

const Mermaid = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current && chart) {
      try {
        mermaid.initialize({ theme: 'dark', startOnLoad: false });
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        mermaid.render(id, chart).then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        }).catch(err => console.error("Mermaid render error", err));
      } catch (err) {
        console.error("Mermaid parse error", err);
      }
    }
  }, [chart]);

  return <div ref={ref} className="flex justify-center w-full my-6 overflow-x-auto overflow-y-hidden" />;
};

export default function QuestionModal({ question, onClose }: QuestionModalProps) {
  const doubleClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickCountRef = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (question) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, onClose]);

  // Double-click to close
  const handleOverlayClick = useCallback(() => {
    clickCountRef.current += 1;

    if (clickCountRef.current === 1) {
      doubleClickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 300);
    } else if (clickCountRef.current === 2) {
      if (doubleClickTimerRef.current) clearTimeout(doubleClickTimerRef.current);
      clickCountRef.current = 0;
      onClose();
    }
  }, [onClose]);

  if (!question) return null;

  return (
    <AnimatePresence>
      {question && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            ref={contentRef}
            className="relative glass-panel-blue p-6 md:p-8 w-full max-w-[600px] max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ borderRadius: 'var(--radius-modal)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-text-white/40 hover:text-text-white hover:bg-white/5 transition-all"
              id="question-modal-close"
            >
              ×
            </button>

            {/* QUESTION */}
            <div className="mb-6">
              <h3 className="font-rajdhani text-xs text-arc-blue/60 uppercase tracking-[3px] mb-3">
                Question
              </h3>
              <div className="w-full h-px bg-gradient-to-r from-arc-blue/30 to-transparent mb-4" />
              <div className="font-exo2 text-sm text-text-white/90 leading-relaxed prose prose-invert prose-p:my-1 max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';

                      if (!inline && language === 'mermaid') {
                        return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                      }
                      return <code className={className} {...props}>{children}</code>;
                    }
                  }}
                >
                  {question.question}
                </ReactMarkdown>
              </div>
            </div>

            {/* ANSWER */}
            <div className="mb-6">
              <h3 className="font-rajdhani text-xs text-arc-blue/60 uppercase tracking-[3px] mb-3">
                Answer
              </h3>
              <div className="w-full h-px bg-gradient-to-r from-arc-blue/30 to-transparent mb-4" />
              <div className="font-exo2 text-sm text-text-white/80 leading-relaxed prose prose-invert prose-p:my-1 max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';

                      if (!inline && language === 'mermaid') {
                        return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                      }
                      return <code className={className} {...props}>{children}</code>;
                    }
                  }}
                >
                  {question.answer}
                </ReactMarkdown>
              </div>
            </div>

            {/* IMAGE */}
            {question.image_url && (
              <div className="mb-6">
                <img
                  src={question.image_url}
                  alt="Question illustration"
                  className="w-full rounded-lg border border-glass-border"
                />
              </div>
            )}

            {/* REFERENCES */}
            {question.references && (
              <div className="mb-6">
                <h3 className="font-rajdhani text-xs text-arc-blue/60 uppercase tracking-[3px] mb-3">
                  References
                </h3>
                <div className="w-full h-px bg-gradient-to-r from-arc-blue/30 to-transparent mb-4" />
                <p className="font-mono text-xs text-text-white/60 leading-relaxed">
                  {question.references}
                </p>
              </div>
            )}

            {/* NOTES */}
            {question.notes && (
              <div>
                <h3 className="font-rajdhani text-xs text-arc-blue/60 uppercase tracking-[3px] mb-3">
                  Notes
                </h3>
                <div className="w-full h-px bg-gradient-to-r from-arc-blue/30 to-transparent mb-4" />
                <p className="font-exo2 text-xs text-text-white/50 leading-relaxed italic">
                  {question.notes}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
