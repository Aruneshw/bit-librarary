'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostComposer({ isOpen, onClose }: Props) {
  const { user, isAdmin } = useAuthStore();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [downloadable, setDownloadable] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setTitle('');
    setBody('');
    setImageUrl('');
    setVideoUrl('');
    setMediaFile(null);
    setDownloadable(true);
    setSubmitted(false);
    setError('');
  };

  const uploadMedia = async (): Promise<{ url: string | null; type: 'image' | 'pdf' | null }> => {
    if (!mediaFile) return { url: null, type: null };
    const isPdf = mediaFile.type === 'application/pdf';
    const supabase = createClient();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (apiUrl) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const formData = new FormData();
          formData.append('file', mediaFile);
          const res = await fetch(`${apiUrl}/posts/upload-media`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${session.access_token}` },
            body: formData,
          });
          if (res.ok) {
            const result = await res.json();
            return { url: result.url, type: isPdf ? 'pdf' : 'image' };
          }
        }
      } catch {
        // fall through to mock
      }
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ url: reader.result as string, type: isPdf ? 'pdf' : 'image' });
      reader.onerror = () => resolve({ url: null, type: null });
      reader.readAsDataURL(mediaFile);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim() || !user) return;

    setIsSubmitting(true);
    setError('');

    const supabase = createClient();
    const { url: mediaUrl, type: mediaType } = await uploadMedia();
    const finalImageUrl = mediaType === 'image' ? mediaUrl : (imageUrl.trim() || null);
    const finalPdfUrl = mediaType === 'pdf' ? mediaUrl : null;

    const { error: err } = await supabase.from('admin_posts').insert({
      title: title.trim() || null,
      body: body.trim(),
      image_url: finalImageUrl,
      video_url: videoUrl.trim() || null,
      pdf_url: finalPdfUrl,
      downloadable,
      created_by: user.id,
    });

    setIsSubmitting(false);

    if (err) {
      setError(err.message || 'Failed to publish post');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      onClose();
      reset();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 40 }}
            className="w-full sm:max-w-lg bg-black/90 border border-arc-blue/30 rounded-t-2xl sm:rounded-xl shadow-[0_0_40px_rgba(0,217,255,0.1)] p-6 relative max-h-[90vh] overflow-y-auto"
            style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
          >
            <button
              onClick={() => { onClose(); reset(); }}
              className="absolute top-4 right-4 text-text-white/50 hover:text-white transition-colors p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="mb-6 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-arc-blue/10 border border-arc-blue/30 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-arc-blue"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <h3 className="font-orbitron text-lg sm:text-xl text-arc-blue tracking-widest text-center">
                {isAdmin ? 'PUBLISH MESSAGE' : 'SHARE POST'}
              </h3>
              <p className="font-mono text-xs text-text-white/50 mt-1 text-center">
                {isAdmin ? 'Send an announcement to all users' : 'Share images and videos with everyone'}
              </p>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 rounded-full border-2 border-terminal-green flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-terminal-green"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <p className="font-orbitron text-terminal-green text-lg tracking-wider">PUBLISHED</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <p className="font-mono text-xs text-warning-red bg-warning-red/10 border border-warning-red/30 rounded-lg p-3">
                    {error}
                  </p>
                )}
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title (optional)"
                  className="w-full bg-black/50 border border-arc-blue/30 rounded-lg p-3 text-text-white font-mono text-base sm:text-sm focus:outline-none focus:border-arc-blue focus:ring-1 focus:ring-arc-blue transition-all placeholder:text-text-white/20"
                />
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={isAdmin ? 'Write your announcement...' : 'Write something about your media...'}
                  className="w-full bg-black/50 border border-arc-blue/30 rounded-lg p-3 text-text-white font-mono text-base sm:text-sm min-h-[100px] focus:outline-none focus:border-arc-blue focus:ring-1 focus:ring-arc-blue transition-all resize-none placeholder:text-text-white/20"
                  required
                />
                {!isAdmin && (
                  <>
                    <input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Image URL (optional)"
                      className="w-full bg-black/50 border border-arc-blue/30 rounded-lg p-3 text-text-white font-mono text-base sm:text-sm focus:outline-none focus:border-arc-blue focus:ring-1 focus:ring-arc-blue transition-all placeholder:text-text-white/20"
                    />
                    <input
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="YouTube or video URL (optional)"
                      className="w-full bg-black/50 border border-arc-blue/30 rounded-lg p-3 text-text-white font-mono text-base sm:text-sm focus:outline-none focus:border-arc-blue focus:ring-1 focus:ring-arc-blue transition-all placeholder:text-text-white/20"
                    />
                  </>
                )}
                {isAdmin && (
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                      Upload Media (PDF, JPG, PNG — optional)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                      onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
                      className="w-full bg-black/50 border border-arc-blue/30 rounded-lg p-2.5 text-text-white font-mono text-base sm:text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-arc-blue/20 file:text-arc-blue file:text-xs file:font-orbitron hover:file:bg-arc-blue/30 focus:outline-none focus:border-arc-blue cursor-pointer placeholder:text-text-white/20"
                    />
                    {mediaFile && (
                      <p className="font-mono text-[10px] text-terminal-green">
                        Selected: {mediaFile.name} ({(mediaFile.size / 1024).toFixed(1)} KB)
                      </p>
                    )}
                    <label className="flex items-center gap-2 cursor-pointer mt-1">
                      <button
                        type="button"
                        onClick={() => setDownloadable(!downloadable)}
                        className={`w-9 h-5 rounded-full transition-colors relative ${
                          downloadable ? 'bg-terminal-green' : 'bg-white/20'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                            downloadable ? 'translate-x-4' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                      <span className="font-mono text-xs text-white/60">
                        {downloadable ? 'Download enabled' : 'View only (no download)'}
                      </span>
                    </label>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !body.trim()}
                  className="w-full px-6 py-3 bg-arc-blue/10 border border-arc-blue text-arc-blue font-orbitron text-sm font-bold tracking-wider rounded hover:bg-arc-blue/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'PUBLISHING...' : 'PUBLISH'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
