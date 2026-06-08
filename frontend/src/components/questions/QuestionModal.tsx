'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { type QuestionWithStatus } from '@/types';

interface QuestionModalProps {
  question: QuestionWithStatus | null;
  onClose: () => void;
  theme?: 'blue' | 'green';
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const Mermaid = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let isMounted = true;

    const renderChart = async () => {
      if (ref.current && chart) {
        try {
          // Dynamically import mermaid to prevent huge bundle sizes and UI freezes
          const mermaidModule = await import('mermaid');
          const mermaid = mermaidModule.default || mermaidModule;
          
          mermaid.initialize({ 
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: 'Rajdhani, sans-serif'
          });

          // Auto-fix legacy mermaid syntax from database ("A" --> "B" to NodeA["A"] --> NodeB["B"])
          const sanitizedChart = chart.replace(/"([^"]+)"\s*-->\s*"([^"]+)"/g, (match, p1, p2) => {
            const id1 = p1.replace(/[^a-zA-Z0-9]/g, '') || 'NodeA';
            const id2 = p2.replace(/[^a-zA-Z0-9]/g, '') || 'NodeB';
            return `${id1}["${p1}"] --> ${id2}["${p2}"]`;
          });

          // Generate a unique ID that starts with a letter (required by Mermaid)
          const id = `mermaid_${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, sanitizedChart);
          if (isMounted && ref.current) {
            ref.current.innerHTML = svg;
            setError(null);
          }
        } catch (err: any) {
          console.error("Mermaid render error", err);
          if (isMounted) {
            setError(err?.message || String(err));
          }
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="w-full my-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 font-mono text-xs overflow-auto">
        <p className="font-bold mb-2">Mermaid Render Error:</p>
        <pre className="whitespace-pre-wrap bg-transparent p-0">{error}</pre>
        <p className="font-bold mt-4 mb-2">Chart Source:</p>
        <pre className="whitespace-pre-wrap text-white/50 bg-transparent p-0">{chart}</pre>
      </div>
    );
  }

  return <div ref={ref} className="flex justify-center w-full my-6 overflow-x-auto overflow-y-hidden" />;
};

export default function QuestionModal({
  question,
  onClose,
  theme = 'blue',
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}: QuestionModalProps) {
  const doubleClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickCountRef = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchStartY.current || !touchEndX.current || !touchEndY.current) return;
    
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = touchStartY.current - touchEndY.current;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0 && onNext && hasNext) {
        onNext();
      } else if (deltaX < 0 && onPrev && hasPrev) {
        onPrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  const isGreen = theme === 'green';
  const panelClass = isGreen ? 'glass-panel-green' : 'glass-panel-blue';
  const textClass = isGreen ? 'text-terminal-green/60' : 'text-arc-blue/60';
  const borderClass = isGreen ? 'border-terminal-green/30' : 'border-glass-border';
  const gradientClass = isGreen ? 'from-terminal-green/30' : 'from-arc-blue/30';

  // ESC and Arrow keys keydown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onNext && hasNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev && hasPrev) {
        onPrev();
      }
    };
    if (question) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, onClose, onNext, onPrev, hasNext, hasPrev]);

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
          <div className="absolute inset-0 bg-black/80" />

          {/* Wrapper */}
          <div className="relative w-full max-w-[600px] z-10 flex items-center">
            {/* Left Chevron */}
            {hasPrev && onPrev && (
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="hidden md:flex absolute -left-16 w-12 h-12 items-center justify-center rounded-full border border-arc-blue/30 bg-black/60 text-text-white/60 hover:text-white hover:border-arc-blue transition-all"
                title="Previous Question (Left Arrow)"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Modal */}
            <motion.div
              ref={contentRef}
              className={`relative ${panelClass} p-6 md:p-8 w-full max-h-[80vh] overflow-y-auto`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
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
                <h3 className={`font-rajdhani text-xs ${textClass} uppercase tracking-[3px] mb-3`}>
                  Question
                </h3>
                <div className={`w-full h-px bg-gradient-to-r ${gradientClass} to-transparent mb-4`} />
                <div className="font-exo2 text-sm font-bold text-terminal-green leading-relaxed prose prose-invert prose-p:my-1 prose-p:text-terminal-green prose-p:font-bold max-w-none translate">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      pre({ children, ...props }: any) {
                        const child = Array.isArray(children) ? children[0] : children;
                        if (child?.props?.['data-mermaid']) {
                          return <div className="w-full my-6">{children}</div>;
                        }
                        return <pre {...props}>{children}</pre>;
                      },
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';

                        if (!inline && language === 'mermaid') {
                          return <Mermaid chart={String(children).replace(/\n$/, '')} data-mermaid />;
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
                <h3 className={`font-rajdhani text-xs ${textClass} uppercase tracking-[3px] mb-3`}>
                  Answer
                </h3>
                <div className={`w-full h-px bg-gradient-to-r ${gradientClass} to-transparent mb-4`} />
                <div className="font-exo2 text-sm text-text-white leading-relaxed prose prose-invert prose-p:my-1 prose-p:text-text-white max-w-none translate">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      pre({ children, ...props }: any) {
                        const child = Array.isArray(children) ? children[0] : children;
                        if (child?.props?.['data-mermaid']) {
                          return <div className="w-full my-6">{children}</div>;
                        }
                        return <pre {...props}>{children}</pre>;
                      },
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';

                        if (!inline && language === 'mermaid') {
                          return <Mermaid chart={String(children).replace(/\n$/, '')} data-mermaid />;
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
                    className={`w-full rounded-lg border ${borderClass}`}
                  />
                </div>
              )}

              {/* REFERENCES */}
              {question.references && (
                <div className="mb-6">
                  <h3 className={`font-rajdhani text-xs ${textClass} uppercase tracking-[3px] mb-3`}>
                    References
                  </h3>
                  <div className={`w-full h-px bg-gradient-to-r ${gradientClass} to-transparent mb-4`} />
                  <p className="font-mono text-xs text-text-white/60 leading-relaxed">
                    {question.references}
                  </p>
                </div>
              )}

              {/* NOTES */}
              {question.notes && (
                <div>
                  <h3 className={`font-rajdhani text-xs ${textClass} uppercase tracking-[3px] mb-3`}>
                    Notes
                  </h3>
                  <div className={`w-full h-px bg-gradient-to-r ${gradientClass} to-transparent mb-4`} />
                  <p className="font-exo2 text-xs text-text-white/50 leading-relaxed italic">
                    {question.notes}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Right Chevron */}
            {hasNext && onNext && (
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="hidden md:flex absolute -right-16 w-12 h-12 items-center justify-center rounded-full border border-arc-blue/30 bg-black/60 text-text-white/60 hover:text-white hover:border-arc-blue transition-all"
                title="Next Question (Right Arrow)"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
