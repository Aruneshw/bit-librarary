'use client';

import { useEffect, useState } from 'react';

export default function PwaInstallBanner() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Check if already running in standalone mode (installed)
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (navigator as any).standalone === true;

    if (isStandalone) return;

    // 2. Check user agent for iOS detection
    const userAgent = window.navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    // 3. For iOS, we show instructions since it doesn't support beforeinstallprompt
    if (ios) {
      // Show iOS banner after a short delay so it doesn't feel spammy
      const timer = setTimeout(() => {
        const dismissed = localStorage.getItem('pwa_ios_banner_dismissed');
        if (!dismissed) setShowBanner(true);
      }, 5000);
      return () => clearTimeout(timer);
    }

    // 4. Capture the browser's native beforeinstallprompt event (Android/Chrome/Edge/Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent default browser banner
      e.preventDefault();
      // Store the event so we can trigger it later
      setInstallPrompt(e);
      // Verify user hasn't dismissed it recently
      const dismissed = localStorage.getItem('pwa_banner_dismissed');
      if (!dismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    // Hide banner first
    setShowBanner(false);
    
    // Show the browser install prompt
    installPrompt.prompt();
    
    // Wait for user's decision
    const { outcome } = await installPrompt.userChoice;
    console.log(`PWA: User installation choice outcome: ${outcome}`);
    
    // Reset the prompt state
    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // Remember dismissal for 7 days so we don't annoy the user
    const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem(isIOS ? 'pwa_ios_banner_dismissed' : 'pwa_banner_dismissed', String(expiry));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:right-6 md:left-auto md:w-[350px] z-50 animate-fade-in-up">
      <div 
        className="glass-panel-blue p-4 border border-arc-blue/30 bg-[#070707]/90 text-white rounded-xl shadow-2xl relative overflow-hidden"
        style={{
          boxShadow: '0 0 25px rgba(0, 217, 255, 0.15)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Glow effect */}
        <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-arc-blue/10 blur-2xl" />
        
        {/* Dismiss button */}
        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-text-white/40 hover:text-white transition-colors text-sm w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/5"
        >
          ×
        </button>

        <div className="flex gap-3 items-start pr-4">
          {/* App Icon */}
          <div className="w-10 h-10 rounded-lg border border-arc-blue/30 overflow-hidden flex-shrink-0 bg-black flex items-center justify-center">
            <img src="/icon.png" alt="App Logo" className="w-full h-full object-cover" />
          </div>

          <div>
            <h4 className="font-orbitron text-[11px] text-arc-blue font-bold tracking-widest uppercase">
              INSTALL BIT LIBRARY
            </h4>
            <p className="font-exo2 text-[10px] text-text-white/70 leading-normal mt-1">
              {isIOS 
                ? 'Tap Share icon at the bottom of Safari, then select "Add to Home Screen" to install.'
                : 'Install BIT LIBRARY on your home screen for rapid offline launching and native execution.'
              }
            </p>

            {/* Android/Chrome Action Button */}
            {!isIOS && (
              <button
                onClick={handleInstallClick}
                className="mt-3 px-3 py-1.5 bg-arc-blue/10 hover:bg-arc-blue/25 border border-arc-blue/40 hover:border-arc-blue text-arc-blue hover:text-white font-rajdhani text-[10px] tracking-wider uppercase font-bold rounded transition-all w-full text-center"
                style={{
                  textShadow: '0 0 8px rgba(0, 217, 255, 0.4)'
                }}
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
