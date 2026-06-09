'use client';

import { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import NotificationCenter from './NotificationCenter';

export default function MobileActionDock() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="fixed z-50 flex flex-col items-end gap-3"
      style={{
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
      }}
    >
      <div className="hidden sm:contents">
        <NotificationCenter />
        <FeedbackForm />
      </div>

      <div className="sm:hidden contents">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="w-14 h-14 rounded-full bg-arc-blue/15 border border-arc-blue/40 backdrop-blur-md flex items-center justify-center text-arc-blue shadow-[0_0_20px_rgba(0,217,255,0.25)]"
          aria-label="Open actions menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>

        {menuOpen && (
          <div className="flex flex-col items-end gap-3 mb-1">
            <NotificationCenter mobileInline />
            <FeedbackForm mobileInline onOpen={() => setMenuOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
