'use client';

import { motion } from 'framer-motion';
import { type QuestionWithStatus } from '@/types';
import { formatQuestionId, cn } from '@/lib/utils';

interface QuestionListProps {
  questions: QuestionWithStatus[];
  onSelect: (question: QuestionWithStatus) => void;
}

export default function QuestionList({ questions, onSelect }: QuestionListProps) {
  return (
    <div className="space-y-2">
      {questions.map((q, index) => (
        <motion.button
          key={q.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.04 }}
          onClick={() => onSelect(q)}
          className={cn(
            'w-full flex items-center gap-4 p-4 rounded-xl text-left',
            'transition-all duration-200 backdrop-blur-xl bg-glass-surface border',
            q.viewed
              ? 'border-terminal-green/20 hover:border-terminal-green/40'
              : 'border-glass-border hover:border-arc-blue/40 hover:shadow-[0_0_12px_rgba(0,217,255,0.15)]'
          )}
          id={`question-${index}`}
        >
          {/* Question ID */}
          <span className="font-mono text-sm text-arc-blue flex-shrink-0 w-12">
            {formatQuestionId(q.order_index)}
          </span>

          {/* Question Title */}
          <span className="flex-1 font-exo2 text-sm text-text-white/90 truncate">
            {q.question.length > 80 ? q.question.slice(0, 80) + '...' : q.question}
          </span>

          {/* Status */}
          <span
            className={cn(
              'flex items-center gap-1.5 font-rajdhani text-xs flex-shrink-0',
              q.viewed ? 'text-terminal-green' : 'text-text-white/30'
            )}
          >
            {q.viewed ? (
              <>
                <span>✓</span>
                <span className="hidden sm:inline">Viewed</span>
              </>
            ) : (
              <>
                <span>○</span>
                <span className="hidden sm:inline">Not Viewed</span>
              </>
            )}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
