import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();

// Create Redis instance only if URL and TOKEN are provided
export const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

if (redis) {
  console.log('Redis cache enabled (Upstash)');
} else {
  console.warn('Redis cache disabled (Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN)');
}

export async function safeRedisGet<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  try {
    return await redis.get<T>(key);
  } catch (err) {
    console.error(`[REDIS GET ERROR] Key "${key}":`, err);
    return null;
  }
}

export async function safeRedisSet(key: string, value: any, options?: any): Promise<boolean> {
  if (!redis) return false;
  try {
    await redis.set(key, value, options);
    return true;
  } catch (err) {
    console.error(`[REDIS SET ERROR] Key "${key}":`, err);
    return false;
  }
}

export async function safeRedisDel(key: string): Promise<boolean> {
  if (!redis) return false;
  try {
    await redis.del(key);
    return true;
  } catch (err) {
    console.error(`[REDIS DEL ERROR] Key "${key}":`, err);
    return false;
  }
}
