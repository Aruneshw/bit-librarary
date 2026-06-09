export const ADMIN_EMAILS = [
  'aruneshownsty1@gmail.com',
  'harishraghav489@gmail.com',
  'admin@bitsathy.ac.in',
] as const;

export function isAdminEmail(email?: string | null): boolean {
  return email ? ADMIN_EMAILS.includes(email as (typeof ADMIN_EMAILS)[number]) : false;
}
