'use client';

import { useEffect, useState } from 'react';

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isDismissedThisSession(key: string): boolean {
  return sessionStorage.getItem(key) === '1';
}

export default function PwaInstallBanner() {
  const [installPrompt, setInstallPrompt] = useState<{ prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> } | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;

    const userAgent = window.navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;
    setIsIOS(ios);

    const sessionKey = ios ? 'pwa_ios_prompt_shown' : 'pwa_prompt_shown';

    if (ios) {
      const timer = setTimeout(() => {
        if (!isDismissedThisSession(sessionKey)) {
          setShowBanner(true);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as unknown as typeof installPrompt);
      if (!isDismissedThisSession(sessionKey)) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    setShowBanner(false);
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem(isIOS ? 'pwa_ios_prompt_shown' : 'pwa_prompt_shown', '1');
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed left-4 right-4 z-[55] animate-fade-in-up md:bottom-6 md:right-6 md:left-auto md:w-[350px]"
      style={{ bottom: 'calc(5.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div
        className="glass-panel-blue p-4 border border-arc-blue/30 bg-[#070707]/90 text-white rounded-xl shadow-2xl relative overflow-hidden"
        style={{ boxShadow: '0 0 25px rgba(0, 217, 255, 0.15)', backdropFilter: 'blur(10px)' }}
      >
        <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-arc-blue/10 blur-2xl" />

        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-text-white/40 hover:text-white transition-colors text-sm w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/5"
        >
          ×
        </button>

        <div className="flex gap-3 items-start pr-4">
          <div className="w-10 h-10 rounded-lg border border-arc-blue/30 overflow-hidden flex-shrink-0 bg-black flex items-center justify-center">
            <img src="/icon.png" alt="App Logo" className="w-full h-full object-cover" />
          </div>

          <div>
            <h4 className="font-orbitron text-[11px] text-arc-blue font-bold tracking-widest uppercase">
              INSTALL BIT LIBRARY
            </h4>
            <p className="font-exo2 text-[10px] text-text-white/70 leading-normal mt-1">
              {isIOS
                ? 'Tap Share in Safari, then "Add to Home Screen" for the best experience.'
                : 'Install on your home screen for faster access and offline use.'}
            </p>

            {!isIOS && installPrompt && (
              <button
                onClick={handleInstallClick}
                className="mt-3 px-3 py-1.5 bg-arc-blue/10 hover:bg-arc-blue/25 border border-arc-blue/40 hover:border-arc-blue text-arc-blue hover:text-white font-rajdhani text-[10px] tracking-wider uppercase font-bold rounded transition-all w-full text-center"
              >
                INSTALL APP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
