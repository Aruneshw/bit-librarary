import { type Department } from '@/types';

/**
 * Returns subjects visible to a given department.
 */
export function getSubjectsForDepartment(department: Department): string[] {
  const common = [
    'Engineering Mathematics II',
    'Electromagnetism and Modern Physics',
    'Engineering Chemistry II',
    'Computational Problem Solving',
    'Tamils and Technology',
  ];

  switch (department) {
    case 'CS':
    case 'IT':
    case 'AL':
    case 'AD':
      return [...common, 'Digital Computer Electronics'];

    case 'EEE':
    case 'EIE':
    case 'ME':
    case 'MZ':
      return [...common, 'Basics of Electronics Engineering'];

    case 'ECE':
      return [...common, 'Basics of Electrical Engineering'];


    case 'AG':
    case 'BT':
      return [...common, 'Basics of Electronics Engineering'];

    default:
      return common;
  }
}

/**
 * Format question ID with zero-padded index (Q001, Q002, etc.)
 */
export function formatQuestionId(index: number): string {
  return `Q${String(index).padStart(3, '0')}`;
}

/**
 * Calculate completion percentage
 */
export function calcCompletion(viewed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((viewed / total) * 100 * 10) / 10;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/**
 * cn - simple class name merger
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
