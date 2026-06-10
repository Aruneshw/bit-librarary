import { Router, Response } from 'express';
import multer from 'multer';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { supabaseAdmin } from '../config/supabase';
import { safeRedisGet, safeRedisSet, safeRedisDel } from '../config/redis';
import { isAdminEmail } from '../lib/adminEmails';

export const postsRouter = Router();

const STORAGE_CACHE_KEY = 'storage:stats';
const MB = 1024 * 1024;
const GB = 1024 * MB;

async function getStorageBucketSize(bucket: string): Promise<{ size: number; count: number }> {
  try {
    const { data, error } = await supabaseAdmin.storage.from(bucket).list('', { limit: 1000 });
    if (error || !data) return { size: 0, count: 0 };
    const files = data.filter((f: any) => !f.id?.endsWith('/'));
    let totalSize = 0;
    for (const file of files) {
      totalSize += (file.metadata?.size as number) || 0;
    }
    return { size: totalSize, count: files.length };
  } catch {
    return { size: 0, count: 0 };
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, JPG, and PNG files are allowed'));
    }
  },
});

const POSTS_CACHE_KEY = 'admin_posts:recent';

async function fetchActivePosts() {
  const { data, error } = await supabaseAdmin
    .from('admin_posts')
    .select('id, title, body, video_url, image_url, pdf_url, downloadable, created_at, created_by, view_count')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) throw error;
  return data || [];
}

// GET /posts
postsRouter.get('/', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    let posts = await safeRedisGet<any[]>(POSTS_CACHE_KEY);
    if (!posts) {
      posts = await fetchActivePosts();
      await safeRedisSet(POSTS_CACHE_KEY, posts, { ex: 300 });
    }
    res.json({ posts });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch posts', status: 500 } });
  }
});

// POST /posts
postsRouter.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { title, body, video_url, image_url, pdf_url, downloadable } = req.body;
  if (!body?.trim()) {
    res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Post body is required', status: 400 } });
    return;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('admin_posts')
      .insert({
        title: title?.trim() || null,
        body: body.trim(),
        video_url: video_url?.trim() || null,
        image_url: image_url?.trim() || null,
        pdf_url: pdf_url || null,
        downloadable: downloadable !== false,
        created_by: req.userId,
      })
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to create post', status: 500 } });
      return;
    }

    await safeRedisDel(POSTS_CACHE_KEY);
    res.status(201).json({ post: data });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});

// DELETE /posts/:id
postsRouter.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  if (!isAdminEmail(req.userEmail)) {
    res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Admin access required', status: 403 } });
    return;
  }

  try {
    const { error } = await supabaseAdmin
      .from('admin_posts')
      .update({ is_active: false })
      .eq('id', req.params.id);

    if (error) {
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to delete post', status: 500 } });
      return;
    }

    await safeRedisDel(POSTS_CACHE_KEY);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});

// GET /posts/storage-stats
postsRouter.get('/storage-stats', authMiddleware, async (_req: AuthRequest, res: Response) => {
  if (!isAdminEmail(_req.userEmail)) {
    res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Admin access required', status: 403 } });
    return;
  }

  try {
    let stats = await safeRedisGet<any>(STORAGE_CACHE_KEY);
    if (!stats) {
      const [pdfsStats, mediaStats] = await Promise.all([
        getStorageBucketSize('pdfs'),
        getStorageBucketSize('media'),
      ]);

      const totalSize = pdfsStats.size + mediaStats.size;
      const planLimit = 500 * MB; // Supabase free plan ~500MB

      stats = {
        pdfs: { size: pdfsStats.size, count: pdfsStats.count },
        media: { size: mediaStats.size, count: mediaStats.count },
        totalSize,
        totalLimit: planLimit,
        usedPercent: totalSize > 0 ? Math.round((totalSize / planLimit) * 100) : 0,
        remaining: Math.max(0, planLimit - totalSize),
      };

      await safeRedisSet(STORAGE_CACHE_KEY, stats, { ex: 60 });
    }
    res.json({ stats });
  } catch (err: any) {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: err?.message || 'Failed to fetch storage stats', status: 500 } });
  }
});

// POST /posts/:id/view
postsRouter.post('/:id/view', authMiddleware, async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Not authenticated', status: 401 } });
    return;
  }

  try {
    const { error } = await supabaseAdmin.rpc('increment_post_view', {
      post_id: req.params.id,
      user_id: req.userId,
    });

    if (error) {
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: error.message, status: 500 } });
      return;
    }

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});

// POST /posts/upload-media
postsRouter.post('/upload-media', authMiddleware, upload.single('file'), async (req: AuthRequest, res: Response) => {
  if (!isAdminEmail(req.userEmail)) {
    res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Admin access required', status: 403 } });
    return;
  }

  if (!req.file) {
    res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'No file provided', status: 400 } });
    return;
  }

  const maxSize = 200 * 1024 * 1024;
  if (req.file.size > maxSize) {
    res.status(400).json({ error: { code: 'FILE_TOO_LARGE', message: `File exceeds maximum size of ${maxSize / 1024 / 1024}MB`, status: 400 } });
    return;
  }

  try {
    const isPdf = req.file.mimetype === 'application/pdf';
    const ext = isPdf ? '.pdf' : (req.file.mimetype === 'image/jpeg' ? '.jpg' : '.png');
    const bucket = isPdf ? 'pdfs' : 'media';
    const fileName = `${bucket}/${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`;

    // Ensure bucket exists
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    if (!buckets?.find((b: any) => b.name === bucket)) {
      await supabaseAdmin.storage.createBucket(bucket, {
        public: false,
        fileSizeLimit: maxSize,
        allowedMimeTypes: isPdf ? ['application/pdf'] : ['image/jpeg', 'image/png'],
      });
    }

    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) {
      res.status(500).json({ error: { code: 'UPLOAD_ERROR', message: error.message, status: 500 } });
      return;
    }

    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(fileName);

    res.json({ url: urlData.publicUrl });
  } catch (err: any) {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: err?.message || 'Server error', status: 500 } });
  }
});
