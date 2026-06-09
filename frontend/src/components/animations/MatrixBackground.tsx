'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const colorRef = useRef('rgba(0, 217, 255, 0.4)');
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const isSubjectPage = pathname?.startsWith('/subject/');
    colorRef.current = isSubjectPage ? 'rgba(0, 255, 65, 0.4)' : 'rgba(0, 217, 255, 0.4)';
  }, [pathname]);

  // Check display conditions
  useEffect(() => {
    const checkConditions = () => {
      if (typeof window === 'undefined') return;
      const isIntroActive = document.documentElement.classList.contains('intro-active');
      const isLoginPage = pathname === '/login' || pathname === '/' || pathname?.startsWith('/auth');

      setShouldShow(!isIntroActive && !isLoginPage);
    };

    // Initial check
    checkConditions();

    // Mutation observer to watch class changes on html element
    const observer = new MutationObserver(checkConditions);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!shouldShow) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters for the matrix rain
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+~`|}{[]:;?><,./-=';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);
    
    // Array of drops (y coordinate)
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height / fontSize; 
    }

    const draw = () => {
      // Translucent black background creates the trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Character color based on current active route
      ctx.fillStyle = colorRef.current;
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly if it's past the bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let animationFrameId: number;
    let lastDrawTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const render = (time: number) => {
      if (time - lastDrawTime > interval) {
        draw();
        lastDrawTime = time;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newColumns = Math.ceil(canvas.width / fontSize);
      for (let x = drops.length; x < newColumns; x++) {
        drops[x] = Math.random() * canvas.height / fontSize;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [shouldShow]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-40 mix-blend-screen"
      style={{ zIndex: 0, display: shouldShow ? 'block' : 'none' }}
    />
  );
}
