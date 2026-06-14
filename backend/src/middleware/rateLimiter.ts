import { Request, Response, NextFunction } from 'express';
import { redis } from '../config/redis';

// Simple in-memory fallback store for development when Redis is not configured
interface InMemLog {
  timestamps: number[];
}
const memoryLogs = new Map<string, InMemLog>();
const memoryBreaches = new Map<string, { count: number; expiresAt: number }>();
const memoryBlacklist = new Map<string, number>(); // ip -> expiresAt

export function rateLimiter(routeType: 'auth' | 'public') {
  const limit = routeType === 'auth' ? 10 : 100;
  const windowMs = 60000; // 1 minute

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Treat proxy headers securely
    const ip = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown-ip').split(',')[0].trim();
    const now = Date.now();

    const blacklistKey = `ratelimit:blacklisted:${ip}`;
    const breachKey = `ratelimit:breaches:${ip}`;
    const logKey = `ratelimit:log:${ip}:${routeType}`;

    // 1. Check if blacklisted
    if (redis) {
      try {
        const isBlacklisted = await redis.get(blacklistKey);
        if (isBlacklisted) {
          res.status(403).json({
            error: {
              code: 'IP_BLOCKED',
              message: 'Your IP has been temporarily blocked due to excessive rate limit violations.',
              status: 403,
            },
          });
          return;
        }
      } catch (err) {
        console.error('Redis blacklist check error:', err);
      }
    } else {
      const blockExpiry = memoryBlacklist.get(ip);
      if (blockExpiry && blockExpiry > now) {
        res.status(403).json({
          error: {
            code: 'IP_BLOCKED',
            message: 'Your IP has been temporarily blocked due to excessive rate limit violations.',
            status: 403,
          },
        });
        return;
      }
    }

    // 2. Perform Sliding Window Rate Limiting
    let requestCount = 0;
    let oldestTimestamp = now;

    if (redis) {
      try {
        const p = redis.pipeline();
        // Remove logs older than 1 minute
        p.zremrangebyscore(logKey, 0, now - windowMs);
        // Get all timestamps in current window
        p.zrange(logKey, 0, -1);
        const results = await p.exec();

        // Check if there was any error in pipeline results
        const rawLogs = results[1] as string[] || [];
        const logs = rawLogs.map(Number).filter(t => !isNaN(t));

        requestCount = logs.length;
        if (logs.length > 0) {
          oldestTimestamp = logs[0];
        }
      } catch (err) {
        console.error('Redis sliding window read error:', err);
        // Fall closed on error
        res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Rate limiter failure', status: 500 } });
        return;
      }
    } else {
      // In-Memory sliding window implementation
      let log = memoryLogs.get(logKey);
      if (!log) {
        log = { timestamps: [] };
        memoryLogs.set(logKey, log);
      }
      log.timestamps = log.timestamps.filter(t => t > now - windowMs);
      requestCount = log.timestamps.length;
      if (log.timestamps.length > 0) {
        oldestTimestamp = log.timestamps[0];
      }
    }

    // 3. Evaluate limit breach
    if (requestCount >= limit) {
      // Limit breached!
      let consecutiveBreaches = 0;

      if (redis) {
        try {
          // Increment breach counter (TTL 1 hour)
          consecutiveBreaches = await redis.incr(breachKey);
          await redis.expire(breachKey, 3600);

          if (consecutiveBreaches >= 5) {
            // Block repeat offender for 24 hours
            await redis.set(blacklistKey, '1', { ex: 86400 });
            await redis.del(breachKey);
          }
        } catch (err) {
          console.error('Redis breach tracking error:', err);
        }
      } else {
        // In-Memory breach tracking
        let breach = memoryBreaches.get(breachKey);
        if (!breach || breach.expiresAt < now) {
          breach = { count: 0, expiresAt: now + 3600000 };
        }
        breach.count += 1;
        memoryBreaches.set(breachKey, breach);
        consecutiveBreaches = breach.count;

        if (consecutiveBreaches >= 5) {
          memoryBlacklist.set(ip, now + 86400000); // 24 hours block
          memoryBreaches.delete(breachKey);
        }
      }

      const retryMs = oldestTimestamp + windowMs - now;
      const retryAfterSeconds = Math.max(1, Math.ceil(retryMs / 1000));

      res.setHeader('Retry-After', String(retryAfterSeconds));
      res.status(429).json({
        error: {
          code: 'TOO_MANY_REQUESTS',
          message: `Rate limit exceeded. Please try again in ${retryAfterSeconds} seconds.`,
          status: 429,
        },
      });
      return;
    }

    // 4. Success: Log current request timestamp and reset breach counter if success
    if (redis) {
      try {
        const p = redis.pipeline();
        p.zadd(logKey, { score: now, member: String(now) });
        p.expire(logKey, 65); // Expire log key after 65 seconds
        // Reset breach counter on successful request inside window limits
        p.del(breachKey);
        await p.exec();
      } catch (err) {
        console.error('Redis write request log error:', err);
      }
    } else {
      let log = memoryLogs.get(logKey);
      if (!log) {
        log = { timestamps: [] };
        memoryLogs.set(logKey, log);
      }
      log.timestamps.push(now);
      memoryBreaches.delete(breachKey);
    }

    next();
  };
}
