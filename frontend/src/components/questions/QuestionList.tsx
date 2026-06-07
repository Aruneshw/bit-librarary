'use client';

import { motion } from 'framer-motion';
import { type QuestionWithStatus } from '@/types';
import { formatQuestionId, cn } from '@/lib/utils';

interface QuestionListProps {
  questions: QuestionWithStatus[];
  onSelect: (question: QuestionWithStatus) => void;
}

import { useState } from 'react';

export default function QuestionList({ questions, onSelect }: QuestionListProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const getCategory = (note: string | null) => {
    if (!note) return 'Questions';
    const match = note.match(/^(.*?) Q\d+$/);
    if (match) return match[1].trim();
    return note.trim();
  };

  const groupedQuestions = questions.reduce((acc, q) => {
    const cat = getCategory(q.notes);
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(q);
    return acc;
  }, {} as Record<string, QuestionWithStatus[]>);

  const groups = Object.keys(groupedQuestions).sort();

  return (
    <div className="space-y-6">
      {groups.map((group, groupIndex) => {
        const groupQs = groupedQuestions[group];
        const isExpanded = expandedGroups[group] !== false; // Default to true

        return (
          <div key={group} className="space-y-2">
            <button
              onClick={() => toggleGroup(group)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <h2 className="font-orbitron text-sm text-arc-blue tracking-wider uppercase">
                {group} <span className="text-text-white/30 text-xs ml-2">({groupQs.length})</span>
              </h2>
              <svg
                className={cn("w-4 h-4 text-arc-blue transition-transform duration-300", isExpanded ? "rotate-180" : "")}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isExpanded && (
              <div className="space-y-2 pl-2 border-l border-white/5">
                {groupQs.map((q, index) => (
                  <motion.button
                    key={q.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    onClick={() => onSelect(q)}
                    className={cn(
                      'w-full flex items-center gap-4 p-4 rounded-xl text-left',
                      'transition-all duration-200 backdrop-blur-xl bg-glass-surface border',
                      q.viewed
                        ? 'border-terminal-green/20 hover:border-terminal-green/40'
                        : 'border-glass-border hover:border-arc-blue/40 hover:shadow-[0_0_12px_rgba(0,217,255,0.15)]'
                    )}
                    id={`question-${q.id}`}
                  >
                    {/* Question ID */}
                    <span className="font-mono text-sm text-arc-blue flex-shrink-0 w-12">
                      {formatQuestionId(q.order_index)}
                    </span>

                    {/* Question Title */}
                    <span className="flex-1 font-exo2 text-sm text-text-white/90 truncate translate">
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
            )}
          </div>
        );
      })}
    </div>
  );
}
