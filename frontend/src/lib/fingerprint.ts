/**
 * Generates a SHA-256 device fingerprint from the browser context.
 */
export async function getDeviceFingerprint(): Promise<string> {
  if (typeof window === 'undefined') return 'server-side';

  const userAgent = navigator.userAgent || '';
  const screenResolution = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  
  // Canvas Fingerprinting
  let canvasHash = '';
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = "14px 'Arial'";
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('bit-library-fingerprint', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('bit-library-fingerprint', 4, 17);
      // Retrieve canvas data and take a slice to hash
      canvasHash = canvas.toDataURL().slice(-100);
    }
  } catch {
    canvasHash = 'no-canvas';
  }

  const rawString = `${userAgent}|${screenResolution}|${timezone}|${canvasHash}`;
  
  try {
    const msgBuffer = new TextEncoder().encode(rawString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback hash function
    let hash = 0;
    for (let i = 0; i < rawString.length; i++) {
      hash = (hash << 5) - hash + rawString.charCodeAt(i);
      hash |= 0;
    }
    return String(Math.abs(hash));
  }
}
