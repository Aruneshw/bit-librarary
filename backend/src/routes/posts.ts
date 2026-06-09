import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { supabaseAdmin } from '../config/supabase';
import { safeRedisGet, safeRedisSet, safeRedisDel } from '../config/redis';
import { isAdminEmail } from '../lib/adminEmails';

export const postsRouter = Router();

const POSTS_CACHE_KEY = 'admin_posts:recent';

async function fetchActivePosts() {
  const { data, error } = await supabaseAdmin
    .from('admin_posts')
    .select('id, title, body, video_url, image_url, created_at, created_by')
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
  const { title, body, video_url, image_url } = req.body;
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
