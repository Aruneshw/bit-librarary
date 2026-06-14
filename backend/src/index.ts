import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRouter } from './routes/auth';
import { profileRouter } from './routes/profile';
import { subjectsRouter } from './routes/subjects';
import { questionsRouter } from './routes/questions';
import { progressRouter } from './routes/progress';
import { settingsRouter } from './routes/settings';
import { postsRouter } from './routes/posts';
import { reactionsRouter } from './routes/reactions';
import presenceRouter from './routes/presence';
import { rateLimiter } from './middleware/rateLimiter';
import { sanitizeBody } from './middleware/validate';
import { auditLogger } from './middleware/auditLogger';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(auditLogger);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:", "https:"],
      connectSrc: ["'self'", "https:", "http://localhost:3000"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  frameguard: {
    action: 'deny',
  },
  noSniff: true,
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin',
  },
}));

// Strict CORS implementation (Layer 3)
const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map(o => o.trim());

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const origin = req.headers.origin;
  if (origin) {
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else {
      res.status(403).json({
        error: {
          code: 'FORBIDDEN_CORS',
          message: 'CORS policy violation: Origin not allowed',
          status: 403,
        },
      });
      return;
    }
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-device-fingerprint');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.sendStatus(204);
    return;
  }
  next();
});

app.use(express.json({ limit: '10mb' })); // Restrict payload size (Layer 8 requirement)
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(sanitizeBody);

// Health check
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', service: 'arc-os-api', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/v1/auth', rateLimiter('auth'), authRouter);
app.use('/api/v1/profile', rateLimiter('public'), profileRouter);
app.use('/api/v1/subjects', rateLimiter('public'), subjectsRouter);
app.use('/api/v1/questions', rateLimiter('public'), questionsRouter);
app.use('/api/v1/progress', rateLimiter('public'), progressRouter);
app.use('/api/v1/settings', rateLimiter('public'), settingsRouter);
app.use('/api/v1/posts', rateLimiter('public'), postsRouter);
app.use('/api/v1', rateLimiter('public'), reactionsRouter);
app.use('/api/v1/presence', rateLimiter('public'), presenceRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Endpoint not found', status: 404 } });
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);

  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    res.status(400).json({
      error: {
        code: 'MALFORMED_REQUEST_BODY',
        message: 'The request body could not be parsed as valid JSON',
        status: 400,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
      status: 500,
    },
  });
});

// Periodic stale user sessions cleanup (every 6 hours)
const SESSION_CLEANUP_INTERVAL = 6 * 60 * 60 * 1000;
const runSessionCleanup = async () => {
  try {
    const { supabaseAdmin } = await import('./config/supabase');
    const { error } = await supabaseAdmin.rpc('cleanup_old_sessions');
    if (error) {
      console.error('[Session Cleanup] Error pruning old user sessions:', error);
    } else {
      console.log('[Session Cleanup] Stale presence sessions cleaned up successfully.');
    }
  } catch (err) {
    console.error('[Session Cleanup] Failed to run session cleanup:', err);
  }
};

app.listen(PORT, () => {
  console.log(`🚀 ARC_OS API running on port ${PORT}`);
  // Run once on startup, then on interval
  runSessionCleanup();
  setInterval(runSessionCleanup, SESSION_CLEANUP_INTERVAL);
});

export default app;
