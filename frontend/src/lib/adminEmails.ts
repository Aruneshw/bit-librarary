export const ADMIN_EMAILS = [
  'aruneshownsty1@gmail.com',
  'harishraghav489@gmail.com',
  'admin@bitsathy.ac.in',
] as const;

export function isAdminEmail(email?: string | null): boolean {
  return email ? ADMIN_EMAILS.includes(email as (typeof ADMIN_EMAILS)[number]) : false;
}

export function sumNonAdminLoginCount(
  profiles: { email?: string | null; login_count?: number | null }[]
): number {
  return profiles.reduce(
    (acc, profile) => acc + (isAdminEmail(profile.email) ? 0 : profile.login_count || 0),
    0
  );
}
