'use client';

import { useState, useEffect } from 'react';
import FeedbackForm from './FeedbackForm';
import NotificationCenter from './NotificationCenter';

export default function MobileActionDock() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div
        className="fixed z-50 flex flex-col items-end gap-3"
        style={{
          bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
          right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
        }}
      >
        {menuOpen && (
          <div className="flex flex-col items-end gap-3 mb-1">
            <NotificationCenter mobileInline />
            <FeedbackForm mobileInline onOpen={() => setMenuOpen(false)} />
          </div>
        )}

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="w-14 h-14 rounded-full bg-arc-blue/15 border border-arc-blue/40 backdrop-blur-md flex items-center justify-center text-arc-blue shadow-[0_0_20px_rgba(0,217,255,0.25)] cursor-pointer"
          aria-label="Open actions menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${menuOpen ? 'rotate-45' : ''}`}
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed z-50 flex flex-col items-end gap-3"
      style={{
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
      }}
    >
      <NotificationCenter />
      <FeedbackForm />
    </div>
  );
}
