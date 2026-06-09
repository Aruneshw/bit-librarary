import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { supabaseAdmin } from '../config/supabase';

export const reactionsRouter = Router();

// GET /posts/:postId/reactions
reactionsRouter.get('/posts/:postId/reactions', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('post_reactions')
      .select('id, user_id, reaction_type')
      .eq('post_id', req.params.postId);

    if (error) {
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch reactions', status: 500 } });
      return;
    }

    res.json({ reactions: data || [] });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});

// POST /posts/:postId/reactions
reactionsRouter.post('/posts/:postId/reactions', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { reaction_type } = req.body;
  if (!reaction_type?.trim()) {
    res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'reaction_type is required', status: 400 } });
    return;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('post_reactions')
      .insert({
        post_id: req.params.postId,
        user_id: req.userId,
        reaction_type: reaction_type.trim(),
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        res.status(409).json({ error: { code: 'CONFLICT', message: 'Already reacted', status: 409 } });
        return;
      }
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to add reaction', status: 500 } });
      return;
    }

    res.status(201).json({ reaction: data });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});

// DELETE /posts/:postId/reactions/:reactionType
reactionsRouter.delete('/posts/:postId/reactions/:reactionType', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabaseAdmin
      .from('post_reactions')
      .delete()
      .eq('post_id', req.params.postId)
      .eq('user_id', req.userId)
      .eq('reaction_type', req.params.reactionType);

    if (error) {
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Failed to remove reaction', status: 500 } });
      return;
    }

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error', status: 500 } });
  }
});
