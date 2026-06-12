import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Rate limiter for API routes.
 * Uses Upstash Redis in production, in-memory fallback for development.
 *
 * Limits:
 *   - 10 requests per minute per user
 *   - 50 requests per day per user
 */

// Check if Upstash credentials are available
const hasUpstash =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

// Per-minute limiter: 10 requests per 60 seconds
const minuteLimiter = hasUpstash
  ? new Ratelimit({
      redis: new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      }),
      limiter: Ratelimit.slidingWindow(10, '60 s'),
      prefix: 'ratelimit:chat:minute',
    })
  : null;

// Per-day limiter: 50 requests per 24 hours
const dailyLimiter = hasUpstash
  ? new Ratelimit({
      redis: new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      }),
      limiter: Ratelimit.slidingWindow(50, '1440 m'),
      prefix: 'ratelimit:chat:daily',
    })
  : null;

// ─── In-memory fallback for development ───
const inMemoryStore = new Map<string, { count: number; resetAt: number }>();

function inMemoryCheck(
  userId: string,
  windowMs: number,
  maxRequests: number,
  prefix: string
): { success: boolean; remaining: number; reset: number } {
  const key = `${prefix}:${userId}`;
  const now = Date.now();
  const entry = inMemoryStore.get(key);

  if (!entry || now >= entry.resetAt) {
    inMemoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: maxRequests - 1, reset: now + windowMs };
  }

  if (entry.count >= maxRequests) {
    return { success: false, remaining: 0, reset: entry.resetAt };
  }

  entry.count++;
  return {
    success: true,
    remaining: maxRequests - entry.count,
    reset: entry.resetAt,
  };
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

/**
 * Check rate limit for a user.
 * Returns { success: false } if either per-minute or per-day limit is exceeded.
 */
export async function checkRateLimit(
  userId: string
): Promise<RateLimitResult> {
  // Use Upstash if available
  if (minuteLimiter && dailyLimiter) {
    const [minuteResult, dailyResult] = await Promise.all([
      minuteLimiter.limit(userId),
      dailyLimiter.limit(userId),
    ]);

    if (!minuteResult.success) {
      return {
        success: false,
        remaining: minuteResult.remaining,
        reset: minuteResult.reset,
      };
    }

    if (!dailyResult.success) {
      return {
        success: false,
        remaining: dailyResult.remaining,
        reset: dailyResult.reset,
      };
    }

    return {
      success: true,
      remaining: Math.min(minuteResult.remaining, dailyResult.remaining),
      reset: Math.min(minuteResult.reset, dailyResult.reset),
    };
  }

  // In-memory fallback for development
  const minuteCheck = inMemoryCheck(userId, 60_000, 10, 'minute');
  if (!minuteCheck.success) return minuteCheck;

  const dailyCheck = inMemoryCheck(userId, 86_400_000, 50, 'daily');
  if (!dailyCheck.success) return dailyCheck;

  return {
    success: true,
    remaining: Math.min(minuteCheck.remaining, dailyCheck.remaining),
    reset: Math.min(minuteCheck.reset, dailyCheck.reset),
  };
}
