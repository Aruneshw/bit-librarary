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
