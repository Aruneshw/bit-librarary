/* ═══════════════════════════════════════════
   ARC_OS Type Definitions
   ═══════════════════════════════════════════ */

export type Department = 'CS' | 'IT' | 'AL' | 'AD' | 'EEE' | 'EIE' | 'ME' | 'MZ' | 'AG' | 'BT';

export interface Profile {
  id: string;
  email: string;
  name: string | null;
  department: Department | null;
  created_at: string;
}

export interface Subject {
  id: string;
  department: string[];
  subject_name: string;
  icon: string;
}

export interface SubjectWithProgress extends Subject {
  total_questions: number;
  viewed_count: number;
  completion_percent: number;
  mastered: boolean;
}

export interface Question {
  id: string;
  subject_id: string;
  question: string;
  answer: string;
  image_url: string | null;
  references: string | null;
  notes: string | null;
  order_index: number;
}

export interface QuestionWithStatus extends Question {
  viewed: boolean;
  viewed_at: string | null;
}

export interface QuestionView {
  id: string;
  user_id: string;
  subject_id: string;
  question_id: string;
  viewed: boolean;
  viewed_at: string | null;
}

export interface UserSettings {
  id: string;
  user_id: string;
  tutorial_seen: boolean;
}

export interface ProgressOverview {
  subject_id: string;
  subject_name: string;
  total_questions: number;
  viewed_count: number;
  completion_percent: number;
  mastered: boolean;
}

/* Boot sequence step tracking */
export type BootStep = 'void' | 'point' | 'reactor' | 'terminal' | 'transition' | 'done';

/* Terminal boot lines */
export interface BootLine {
  text: string;
  pauseMs: number;
}

export const BOOT_LINES: BootLine[] = [
  { text: '> SYSTEM INITIALIZING...', pauseMs: 400 },
  { text: '> LOADING ARC_OS...', pauseMs: 300 },
  { text: '> CONNECTING KNOWLEDGE NODES...', pauseMs: 300 },
  { text: '> AUTHENTICATING DATABASE...', pauseMs: 300 },
  { text: '> ESTABLISHING SECURE CHANNEL...', pauseMs: 300 },
  { text: '> READY.', pauseMs: 600 },
];

/* Department display names */
export const DEPARTMENTS: { value: Department; label: string }[] = [
  { value: 'CS', label: 'CS' },
  { value: 'IT', label: 'IT' },
  { value: 'AL', label: 'AL' },
  { value: 'AD', label: 'AD' },
  { value: 'EEE', label: 'EEE' },
  { value: 'EIE', label: 'EIE' },
  { value: 'ME', label: 'ME' },
  { value: 'MZ', label: 'MZ' },
  { value: 'AG', label: 'AG' },
  { value: 'BT', label: 'BT' },
];

/* Subject icon mapping */
export const SUBJECT_ICONS: Record<string, string> = {
  'Engineering Mathematics II': '∑',
  'Electromagnetism and Modern Physics': '⚛',
  'Engineering Chemistry II': '🧪',
  'Computational Problem Solving': '<>',
  'Basics of Electrical Engineering': '⚡',
  'Basics of Electronics Engineering': '🔌',
  'Digital Computer Electronics': '🖥',
  'Tamils and Technology': '🏛',
};
