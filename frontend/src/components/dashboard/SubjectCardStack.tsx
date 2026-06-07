'use client';

import { type SubjectWithProgress } from '@/types';
import SubjectCard from './SubjectCard';

interface SubjectCardStackProps {
  subjects: SubjectWithProgress[];
}

export default function SubjectCardStack({ subjects }: SubjectCardStackProps) {
  return (
    <div className="w-full max-w-md mx-auto px-4 space-y-3">
      {subjects.map((subject, index) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          index={index}
          delay={0.2}
        />
      ))}
    </div>
  );
}
