'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { type Department, DEPARTMENTS } from '@/types';
import { useAuthStore } from '@/store/authStore';

interface DepartmentSelectorProps {
  onSelect: (dept: Department) => void;
}

export default function DepartmentSelector({ onSelect }: DepartmentSelectorProps) {
  const [selected, setSelected] = useState<Department | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateDepartment } = useAuthStore();

  const handleSubmit = async () => {
    if (!selected) return;
    setIsSubmitting(true);
    await updateDepartment(selected);
    onSelect(selected);
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col items-center gap-4 mt-8"
    >
      {/* Label */}
      <p className="font-rajdhani text-[11px] text-text-white/50 uppercase tracking-[3px]">
        Select Department
      </p>

      {/* Department Grid */}
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept.value}
            onClick={() => setSelected(dept.value)}
            className={`
              px-3 py-2 rounded-lg font-rajdhani text-sm font-semibold tracking-wider
              transition-all duration-200 border
              ${
                selected === dept.value
                  ? 'bg-arc-blue/20 border-arc-blue text-arc-blue shadow-[0_0_12px_rgba(0,217,255,0.3)]'
                  : 'bg-glass-surface border-glass-border text-text-white/60 hover:border-arc-blue/40 hover:text-text-white/80'
              }
            `}
            id={`dept-${dept.value.toLowerCase()}`}
          >
            {dept.label}
          </button>
        ))}
      </div>

      {/* Confirm Button */}
      {selected && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-2 px-8 py-2.5 border border-arc-blue text-arc-blue font-rajdhani font-semibold text-sm tracking-wider uppercase rounded-lg
            hover:bg-arc-blue/10 hover:shadow-[0_0_16px_rgba(0,217,255,0.3)]
            active:scale-[0.98] transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
          id="dept-confirm-btn"
        >
          {isSubmitting ? 'Initializing...' : 'Initialize System'}
        </motion.button>
      )}
    </motion.div>
  );
}
