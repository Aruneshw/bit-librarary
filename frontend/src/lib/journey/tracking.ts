export async function trackResourceView() {
  try {
    await fetch('/api/journey/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ durationSeconds: 0, trackView: true }),
    });
  } catch {}
}

export async function trackDownload() {
  try {
    await fetch('/api/journey/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ durationSeconds: 0, trackDownload: true }),
    });
  } catch {}
}
