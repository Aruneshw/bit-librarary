import { DOMAINS } from './types';

export interface ProjectInput {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  repository_url: string;
  demo_url: string;
}

export type ValidationResult =
  | { ok: true; value: ProjectInput }
  | { ok: false; error: string };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HTTPS_RE = /^https:\/\/\S+$/i;
const MAX_TECHNOLOGY_LENGTH = 40;

export function isUuid(value: unknown): value is string {
  return typeof value === 'string' && UUID_RE.test(value);
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Students paste or type bare hosts ("vaanwing.vercel.app", "github.com/me/repo")
 * far more often than full URLs, and a scheme-less value fails native browser URL
 * validation with no useful message. Treat a scheme-less host as https.
 */
export function normalizeUrl(value: unknown): string {
  const raw = text(value);
  if (!raw) return '';
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw)) return raw;
  return `https://${raw.replace(/^\/+/, '')}`;
}

function httpsUrl(value: unknown): { ok: true; value: string } | { ok: false; error: string } {
  const url = normalizeUrl(value);
  if (!url) return { ok: true, value: '' };
  if (url.length > 500 || !HTTPS_RE.test(url)) {
    return { ok: false, error: 'Links must start with https:// and be under 500 characters.' };
  }
  return { ok: true, value: url };
}

/**
 * Validate untrusted project input on the server. The same helper can be used
 * by the form, but the API never trusts a client-side check.
 */
export function validateProjectInput(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, error: 'Project details are required.' };
  }
  const input = raw as Record<string, unknown>;
  const title = text(input.title);
  if (title.length < 3 || title.length > 100) {
    return { ok: false, error: 'The title must be between 3 and 100 characters.' };
  }
  const description = text(input.description);
  if (description.length < 20 || description.length > 2000) {
    return { ok: false, error: 'The description must be between 20 and 2000 characters.' };
  }
  const category = text(input.category);
  if (!(DOMAINS as readonly string[]).includes(category)) {
    return { ok: false, error: 'Choose a valid project domain.' };
  }
  const rawTechnologies = Array.isArray(input.technologies) ? input.technologies : [];
  const technologies = [...new Set(
    rawTechnologies
      .filter((value): value is string => typeof value === 'string')
      .map((value) => value.trim())
      .filter(Boolean),
  )];
  if (technologies.length > 20) {
    return { ok: false, error: 'List no more than 20 technologies.' };
  }
  if (technologies.some((value) => value.length > MAX_TECHNOLOGY_LENGTH)) {
    return { ok: false, error: 'Each technology must be under 40 characters.' };
  }
  const repository = httpsUrl(input.repository_url);
  if (!repository.ok) return repository;
  const demo = httpsUrl(input.demo_url);
  if (!demo.ok) return demo;
  return {
    ok: true,
    value: {
      title,
      description,
      category,
      technologies,
      repository_url: repository.value,
      demo_url: demo.value,
    },
  };
}
