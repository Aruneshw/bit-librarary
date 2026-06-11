'use client';

import { useEffect, useRef, useCallback, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { type QuestionWithStatus } from '@/types';

/* ─── Selection & Focus Cleanup ─── */
function clearSelection() {
  const sel = window.getSelection();
  if (sel) {
    sel.removeAllRanges();
    sel.empty?.();
  }
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

interface QuestionModalProps {
  question: QuestionWithStatus | null;
  onClose: () => void;
  theme?: 'blue' | 'green';
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

/* ─── Memoized Markdown Renderer ─── */
const MarkdownContent = ReactMarkdown as any;

const QuestionContent = memo(function QuestionContent({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <MarkdownContent
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          pre({ children, ...props }: any) {
            const child = Array.isArray(children) ? children[0] : children;
            if (child?.props?.['data-mermaid']) {
              return <div className="w-full my-6 notranslate" translate="no">{children}</div>;
            }
            return <pre {...props} className={`notranslate ${props.className || ''}`} translate="no">{children}</pre>;
          },
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            if (!inline && language === 'mermaid') {
              return (
                <div className="notranslate" translate="no">
                  <Mermaid chart={String(children).replace(/\n$/, '')} data-mermaid />
                </div>
              );
            }
            return <code className={`${className || ''} notranslate`} translate="no" {...props}>{children}</code>;
          },
        }}
      >
        {content}
      </MarkdownContent>
    </div>
  );
});

/* ─── Mermaid Diagram Renderer ─── */
const Mermaid = memo(function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const renderChart = async () => {
      if (ref.current && chart) {
        try {
          const mermaidModule = await import('mermaid');
          const mermaid = mermaidModule.default || mermaidModule;
          mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: 'Rajdhani, sans-serif',
          });
          const sanitizedChart = chart.replace(/"([^"]+)"\s*-->\s*"([^"]+)"/g, (match, p1, p2) => {
            const id1 = p1.replace(/[^a-zA-Z0-9]/g, '') || 'NodeA';
            const id2 = p2.replace(/[^a-zA-Z0-9]/g, '') || 'NodeB';
            return `${id1}["${p1}"] --> ${id2}["${p2}"]`;
          });
          const id = `mermaid_${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, sanitizedChart);
          if (isMounted && ref.current) {
            ref.current.innerHTML = svg;
            setError(null);
          }
        } catch (err: any) {
          if (isMounted) {
            setError(err?.message || String(err));
          }
        }
      }
    };
    renderChart();
    return () => { isMounted = false; };
  }, [chart]);

  if (error) {
    return (
      <div className="w-full my-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 font-mono text-xs overflow-auto">
        <p className="font-bold mb-2">Mermaid Render Error:</p>
        <pre className="whitespace-pre-wrap bg-transparent p-0">{error}</pre>
      </div>
    );
  }

  return <div ref={ref} className="flex justify-center w-full my-6 overflow-x-auto overflow-y-hidden" />;
});

/* ─── Chevron Button ─── */
function NavChevron({ direction, onClick, title }: { direction: 'left' | 'right'; onClick: () => void; title: string }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="flex md:hidden absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white/60 hover:text-white hover:border-arc-blue/50 active:scale-90 transition-all backdrop-blur-sm
                 md:flex md:w-12 md:h-12 md:border-arc-blue/30 md:bg-black/60 md:text-text-white/60 md:hover:text-white md:hover:border-arc-blue"
      style={direction === 'left' ? { left: '4px' } : { right: '4px' }}
      title={title}
      aria-label={title}
    >
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        {direction === 'left' ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

/* ─── Main Modal ─── */
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

  /* ── Scroll to top & clear selection on question change ── */
  useEffect(() => {
    if (!question) return;
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    clearSelection();
    const id = requestAnimationFrame(() => {
      clearSelection();
      requestAnimationFrame(() => clearSelection());
    });
    return () => cancelAnimationFrame(id);
  }, [question?.id]);

  /* ── Clear selection on modal mount ── */
  useEffect(() => {
    clearSelection();
  }, []);

  /* ── Prevent selectstart during active swipe ── */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      if (swipeRef.current.swiping) {
        e.preventDefault();
      }
    };
    el.addEventListener('selectstart', handler);
    return () => el.removeEventListener('selectstart', handler);
  }, []);

  /* ── Swipe gesture handling with pointer events ── */
  const swipeRef = useRef({ startX: 0, startY: 0, swiping: false, handled: false });

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    swipeRef.current = { startX: e.clientX, startY: e.clientY, swiping: false, handled: false };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (swipeRef.current.handled) return;

    const dx = e.clientX - swipeRef.current.startX;
    const dy = e.clientY - swipeRef.current.startY;

    if (!swipeRef.current.swiping && (Math.abs(dx) > 15 || Math.abs(dy) > 15)) {
      if (Math.abs(dx) > Math.abs(dy)) {
        swipeRef.current.swiping = true;
        contentRef.current?.classList.add('swipe-no-select');
        clearSelection();
      }
    }

    if (swipeRef.current.swiping) {
      e.preventDefault();
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    const wasSwiping = swipeRef.current.swiping;
    swipeRef.current.swiping = false;
    contentRef.current?.classList.remove('swipe-no-select');

    if (!wasSwiping) return;

    const dx = e.clientX - swipeRef.current.startX;
    const dy = e.clientY - swipeRef.current.startY;
    const minSwipe = window.innerWidth < 480 ? 35 : 50;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipe) {
      swipeRef.current.handled = true;
      if (dx < 0 && onNext && hasNext) {
        onNext();
      } else if (dx > 0 && onPrev && hasPrev) {
        onPrev();
      }
    }

    clearSelection();
  }, [onNext, onPrev, hasNext, hasPrev]);

  const handlePointerCancel = useCallback(() => {
    swipeRef.current.swiping = false;
    swipeRef.current.handled = false;
    contentRef.current?.classList.remove('swipe-no-select');
    clearSelection();
  }, []);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    if (!question) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowRight' && onNext && hasNext) { e.preventDefault(); onNext(); return; }
      if (e.key === 'ArrowLeft' && onPrev && hasPrev) { e.preventDefault(); onPrev(); }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, onClose, onNext, onPrev, hasNext, hasPrev]);

  /* ── Double-click to close ── */
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    clickCountRef.current += 1;
    if (clickCountRef.current === 1) {
      doubleClickTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 300);
    } else if (clickCountRef.current === 2) {
      if (doubleClickTimerRef.current) clearTimeout(doubleClickTimerRef.current);
      clickCountRef.current = 0;
      onClose();
    }
  }, [onClose]);

  if (!question) return null;

  const isGreen = theme === 'green';
  const textClass = isGreen ? 'text-terminal-green/60' : 'text-arc-blue/60';
  const gradientClass = isGreen ? 'from-terminal-green/30' : 'from-arc-blue/30';
  const borderClass = isGreen ? 'border-terminal-green/30' : 'border-glass-border';

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const animConfig = isMobile
    ? { duration: 0.15, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
    : { duration: 0.25, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: animConfig.duration }}
        onClick={handleOverlayClick}
      >
        <div className="absolute inset-0 bg-black/80" />

        <div
          className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[600px] z-10 flex items-center"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ touchAction: 'pan-y' }}
        >
          {hasPrev && onPrev && (
            <NavChevron direction="left" onClick={onPrev} title="Previous Question (Left Arrow)" />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              ref={contentRef}
              className={`relative modal-content touch-pan-y ${
                isGreen ? 'glass-panel-green' : 'glass-panel-blue'
              } p-4 sm:p-6 md:p-8 w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto will-change-transform`}
              initial={{ scale: 0.95, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -4 }}
              transition={animConfig}
              style={{ borderRadius: 'var(--radius-modal)', backgroundColor: '#070707' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-text-white/40 hover:text-text-white hover:bg-white/5 transition-all z-10"
                id="question-modal-close"
                aria-label="Close modal"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div>
                  <div className="mb-4 sm:mb-6">
                    <h3 className={`font-rajdhani text-[10px] sm:text-xs ${textClass} uppercase tracking-[3px] mb-2 sm:mb-3`}>
                      Question
                    </h3>
                    <div className={`w-full h-px bg-gradient-to-r ${gradientClass} to-transparent mb-3 sm:mb-4`} />
                    <div className="font-exo2 text-sm font-bold text-terminal-green leading-relaxed prose prose-invert prose-p:my-1 prose-p:text-terminal-green prose-p:font-bold max-w-none translate">
                      <QuestionContent content={question.question} />
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <h3 className={`font-rajdhani text-[10px] sm:text-xs ${textClass} uppercase tracking-[3px] mb-2 sm:mb-3`}>
                      Answer
                    </h3>
                    <div className={`w-full h-px bg-gradient-to-r ${gradientClass} to-transparent mb-3 sm:mb-4`} />
                    <div className="font-exo2 text-sm text-text-white leading-relaxed prose prose-invert prose-p:my-1 prose-p:text-text-white max-w-none translate">
                      <QuestionContent content={question.answer || 'Answer not available'} />
                    </div>
                  </div>

                  {question.image_url && (
                    <div className="mb-4 sm:mb-6">
                      <img
                        src={question.image_url}
                        alt="Question illustration"
                        className={`w-full rounded-lg border ${borderClass}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}

                  {question.references && (
                    <div className="mb-4 sm:mb-6">
                      <h3 className={`font-rajdhani text-[10px] sm:text-xs ${textClass} uppercase tracking-[3px] mb-2 sm:mb-3`}>
                        References
                      </h3>
                      <div className={`w-full h-px bg-gradient-to-r ${gradientClass} to-transparent mb-3 sm:mb-4`} />
                      <p className="font-mono text-xs text-text-white/60 leading-relaxed notranslate" translate="no">
                        {question.references}
                      </p>
                    </div>
                  )}

                  {question.notes && (
                    <div>
                      <h3 className={`font-rajdhani text-[10px] sm:text-xs ${textClass} uppercase tracking-[3px] mb-2 sm:mb-3`}>
                        Notes
                      </h3>
                      <div className={`w-full h-px bg-gradient-to-r ${gradientClass} to-transparent mb-3 sm:mb-4`} />
                      <p className="font-exo2 text-xs text-text-white/50 leading-relaxed italic notranslate" translate="no">
                        {question.notes}
                      </p>
                    </div>
                  )}
                </div>
            </motion.div>
          </AnimatePresence>

          {hasNext && onNext && (
            <NavChevron direction="right" onClick={onNext} title="Next Question (Right Arrow)" />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
