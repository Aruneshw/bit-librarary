'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { safeUrl, type Project } from '@/lib/hub/types';
import './hub.css';
type ReviewProject = Project & { owner_name: string };
export default function HubReview() {
  const [projects, setProjects] = useState<ReviewProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const load = useCallback(async () => {
    const response = await fetch('/api/hub/review', {
      cache: 'no-store',
      credentials: 'same-origin',
    });
    const payload = (await response.json().catch(() => null)) as
      | { projects?: ReviewProject[]; error?: string }
      | null;
    if (!response.ok) {
      throw new Error(payload?.error || 'The review queue could not be loaded.');
    }
    setProjects(payload?.projects || []);
  }, []);
  useEffect(() => {
    let active = true;
    fetch('/api/hub/review', { cache: 'no-store', credentials: 'same-origin' })
      .then(async (response) => {
        const payload = (await response.json().catch(() => null)) as
          | { projects?: ReviewProject[]; error?: string }
          | null;
        if (!response.ok) {
          throw new Error(payload?.error || 'The review queue could not be loaded.');
        }
        return payload?.projects || [];
      })
      .then((queue) => {
        if (active) {
          setProjects(queue);
          setLoading(false);
        }
      })
      .catch((reason) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : 'The review queue could not be loaded.');
          setLoading(false);
        }
      });
    return () => { active = false; };
  }, []);
  async function review(project: ReviewProject, decision: 'approved' | 'rejected') {
    setBusy(project.id); setError(''); setNotice('');
    try {
      const response = await fetch('/api/hub/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project.id, decision }),
        credentials: 'same-origin',
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) throw new Error(payload?.error || 'The review decision could not be saved.');
      setNotice(`${project.title} ${decision}.`);
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : 'Review failed. Please retry.'); }
    finally { setBusy(''); }
  }
  return <main className="hub-app hub-review">
    <Link href="/hub" className="hub-text-button">← Back to BIT HUB</Link>
    <section className="hub-panel">
      <div className="hub-panel-heading"><h1>PROJECT REVIEW</h1></div>
      <p>Projects now publish to the campus showcase the moment a student submits them, and their XP is awarded at that point, so there is normally nothing to approve here. Use this page only to withdraw a project that breaks the rules; rejection removes its XP and notifies the owner. You cannot act on your own projects.</p>
      <p>Showing the oldest 100 submissions still waiting from the retired review flow.</p>
      {error && <p role="alert">{error} <button onClick={() => { setError(''); load().catch(e => setError(e.message)); }}>Retry</button></p>}
      {notice && <p role="status">{notice}</p>}
      {loading ? <p role="status">Loading submissions…</p> : !error && !projects.length ? <p>Nothing is waiting. New projects are published automatically, so this queue stays empty.</p> : null}
      <div className="hub-review-list">{projects.map(project => <article key={project.id} className="hub-panel">
        <h2>{project.title}</h2><p>{project.owner_name} · {project.category} · {new Date(project.created_at).toLocaleDateString()}</p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{project.description}</p><p>{project.technologies.join(' · ')}</p>
        <div className="hub-review-actions">
          {safeUrl(project.repository_url) && <a href={safeUrl(project.repository_url)} target="_blank" rel="noopener noreferrer">View repository ↗</a>}
          {safeUrl(project.demo_url) && <a href={safeUrl(project.demo_url)} target="_blank" rel="noopener noreferrer">View demo ↗</a>}
          <button disabled={!!busy} onClick={() => review(project, 'approved')}>{busy === project.id ? 'Saving…' : 'Approve'}</button>
          <button disabled={!!busy} onClick={() => review(project, 'rejected')}>Reject</button>
        </div>
      </article>)}</div>
    </section>
  </main>;
}
