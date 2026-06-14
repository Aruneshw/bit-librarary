import { Response, NextFunction } from 'express';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { AuthRequest } from './auth';

const LOG_FILE_PATH = path.join(__dirname, '../../audit.log');

function hashIP(ip: string): string {
  // Hashing client IP to ensure GDPR compliance while tracking threats
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}

// In-memory sliding tracker for anomaly detection (rapid route scanning)
const routeScanTracker = new Map<string, { timestamps: number[]; routes: Set<string> }>();

export function auditLogger(req: AuthRequest, res: Response, next: NextFunction): void {
  const startTime = Date.now();
  const rawIp = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown-ip').split(',')[0].trim();
  const hashedIp = hashIP(rawIp);
  const route = req.originalUrl || req.url;
  const method = req.method;

  res.on('finish', () => {
    const statusCode = res.statusCode;
    const duration = Date.now() - startTime;
    const userId = req.userId || 'anonymous';
    const trustScore = req.trustScore !== undefined ? req.trustScore : 100;
    const timestamp = new Date().toISOString();

    // 1. Build log entry (never log tokens, passwords, or PII)
    const logEntry = {
      timestamp,
      method,
      route,
      statusCode,
      hashedIp,
      userId,
      trustScore,
      durationMs: duration,
    };

    // Append to file (tamper-evident simulated store)
    try {
      fs.appendFileSync(LOG_FILE_PATH, JSON.stringify(logEntry) + '\n', 'utf8');
    } catch (err) {
      console.error('Failed to write audit log entry:', err);
    }

    // 2. Anomaly Detection
    const now = Date.now();

    // Check privilege escalation attempts (403 on protected/admin resources)
    if (statusCode === 403 && (route.includes('/admin') || route.includes('/settings'))) {
      const alertEntry = {
        alert: 'PRIVILEGE_ESCALATION_ATTEMPT',
        timestamp,
        userId,
        hashedIp,
        route,
        method,
      };
      console.warn('⚠️ [SECURITY ALERT] Privilege escalation attempt detected:', alertEntry);
      try {
        fs.appendFileSync(LOG_FILE_PATH, JSON.stringify(alertEntry) + '\n', 'utf8');
      } catch {}
    }

    // Check rapid route scanning (different paths within a 5-second window)
    let scanner = routeScanTracker.get(hashedIp);
    if (!scanner) {
      scanner = { timestamps: [], routes: new Set() };
      routeScanTracker.set(hashedIp, scanner);
    }

    scanner.timestamps.push(now);
    scanner.routes.add(route);

    // Filter to last 5 seconds
    scanner.timestamps = scanner.timestamps.filter(t => t > now - 5000);
    if (scanner.timestamps.length > 15 && scanner.routes.size > 8) {
      const alertEntry = {
        alert: 'RAPID_ROUTE_SCANNING',
        timestamp,
        hashedIp,
        requestCount: scanner.timestamps.length,
        uniqueRoutesCount: scanner.routes.size,
      };
      console.warn('⚠️ [SECURITY ALERT] Rapid route scanning detected:', alertEntry);
      try {
        fs.appendFileSync(LOG_FILE_PATH, JSON.stringify(alertEntry) + '\n', 'utf8');
      } catch {}
      // Clear to prevent repeat alerts
      routeScanTracker.delete(hashedIp);
    }
  });

  next();
}
