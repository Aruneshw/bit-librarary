'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { hubClient } from '@/lib/hub/client';
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
    const client = hubClient();
    if (!client) throw new Error('Database connection unavailable.');
    const { data, error } = await client.rpc('hub_review_queue');
    if (error) throw new Error(error.message);
    setProjects(data || []);
  }, []);
  useEffect(() => {
    let active = true;
    const client = hubClient();
    if (!client) return;
    void client.rpc('hub_review_queue').then(({ data, error }) => {
      if (!active) return;
      if (error) setError(error.message);
      else setProjects(data || []);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);
  async function review(project: ReviewProject, decision: 'approved' | 'rejected') {
    setBusy(project.id); setError(''); setNotice('');
    try {
      const { error } = await hubClient()!.rpc('hub_review_project', { project: project.id, decision });
      if (error) throw new Error(error.message);
      setNotice(`${project.title} ${decision}.`);
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : 'Review failed. Please retry.'); }
    finally { setBusy(''); }
  }
  return <main className="hub-app hub-review">
    <Link href="/hub" className="hub-text-button">← Back to BIT HUB</Link>
    <section className="hub-panel">
      <div className="hub-panel-heading"><h1>PROJECT REVIEW</h1></div>
      <p>Review original student work before awarding points. Approvals award the configured project XP once. You cannot review your own projects.</p>
      <p>Showing the oldest 100 pending submissions. The queue refreshes after each decision.</p>
      {error && <p role="alert">{error} <button onClick={() => { setError(''); load().catch(e => setError(e.message)); }}>Retry</button></p>}
      {notice && <p role="status">{notice}</p>}
      {loading ? <p role="status">Loading submissions…</p> : !error && !projects.length ? <p>No projects are waiting for review.</p> : null}
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
