/** Limit post-login destinations to app pages, including against encoded slashes. */
export function safeNextPath(value: string | null | undefined): string {
  if (!value || /[\\\r\n]/.test(value)) return '/hub';
  let decoded: string;
  try { decoded = decodeURIComponent(value); } catch { return '/hub'; }
  if (!/^\/(hub|dashboard|journey|events|admin|subject)(\/|\?|#|$)/.test(decoded) || /[\\\r\n]/.test(decoded)) return '/hub';
  const target = new URL(decoded, 'https://app.invalid');
  if (target.origin !== 'https://app.invalid' || !/^\/(hub|dashboard|journey|events|admin|subject)(\/|$)/.test(target.pathname)) return '/hub';
  return target.pathname + target.search + target.hash;
}
export function demoAllowed(environment: string | undefined, enabled: string | undefined) {
  return environment !== 'production' || enabled === 'true';
}
/** Choose the landing page after sign-in; a plain administrator sign-in opens the admin view. */
export function resolvePostLoginPath(requestedNext: string | null | undefined, isAdmin: boolean): string {
  if (requestedNext) return safeNextPath(requestedNext);
  return isAdmin ? '/admin' : '/hub';
}
