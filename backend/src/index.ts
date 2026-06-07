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

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', service: 'arc-os-api', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/subjects', subjectsRouter);
app.use('/api/v1/questions', questionsRouter);
app.use('/api/v1/progress', progressRouter);
app.use('/api/v1/settings', settingsRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Endpoint not found', status: 404 } });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error', status: 500 } });
});

app.listen(PORT, () => {
  console.log(`🚀 ARC_OS API running on port ${PORT}`);
});

export default app;
