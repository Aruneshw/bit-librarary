'use client';

import { useEffect, useRef } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip animation entirely if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters for the matrix rain
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const charArray = chars.split('');
    const fontSize = 14;
    // Use every other column to reduce draw calls by 50%
    const columns = Math.ceil(canvas.width / (fontSize * 2));
    
    // Array of drops (y coordinate)
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height / fontSize; 
    }

    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const deltaTime = (currentTime - lastTime) / 1000;
      if (deltaTime <= 0) return;
      lastTime = currentTime;

      // Limit deltaTime to avoid huge jumps when tab is inactive
      const activeDelta = Math.min(deltaTime, 0.1);

      // Decayed trail fill scaled to frame rate (exponential decay equivalence)
      const baseDecay = 0.05; // 5% at 30 FPS
      const decayAlpha = 1 - Math.pow(1 - baseDecay, activeDelta * 30);
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0.01, Math.min(0.2, decayAlpha))})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Arc Blue characters
      ctx.fillStyle = 'rgba(0, 217, 255, 0.4)';
      ctx.font = `${fontSize}px monospace`;

      const speed = 18; // Row units per second

      for (let i = 0; i < drops.length; i++) {
        // Increment drop position based on delta time
        drops[i] += speed * activeDelta;

        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize * 2;
        const y = Math.floor(drops[i]) * fontSize;

        // Draw only if on screen
        if (y >= 0 && y <= canvas.height + fontSize) {
          ctx.fillText(text, x, y);
        }

        // Reset drop to a staggered starting point above the screen
        if (y > canvas.height) {
          drops[i] = -Math.random() * 20;
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newColumns = Math.ceil(canvas.width / (fontSize * 2));
      for (let x = drops.length; x < newColumns; x++) {
        drops[x] = -Math.random() * 20;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-40 mix-blend-screen"
      style={{ zIndex: 0 }}
    />
  );
}

