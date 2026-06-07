'use client';

import { useEffect } from 'react';

export default function TranslatorPopup() {
  useEffect(() => {
    // Only add the script if it doesn't exist
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { 
            pageLanguage: 'en', 
            includedLanguages: 'en,ta', 
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE 
          },
          'google_translate_element'
        );
      };
    }

    return () => {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + window.location.hostname + '; path=/;';
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 border border-[var(--glass-border)] rounded-full px-4 py-2 shadow-[var(--glow-blue)] backdrop-blur-md transition-all hover:scale-105 group">
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00D9FF] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <div id="google_translate_element" className="translate-widget" />
      </div>
      <style jsx global>{`
        /* Hide the Google Translate branding and styling to make it fit ARC_OS theme */
        .goog-te-gadget {
          color: transparent !important;
          font-family: 'Rajdhani', sans-serif !important;
          font-size: 0px !important; /* Hides extra text */
        }
        .goog-te-gadget .goog-te-combo {
          color: var(--arc-blue) !important;
          background-color: #050A15 !important;
          border: 1px solid rgba(0, 217, 255, 0.4) !important;
          border-radius: 12px !important;
          padding: 4px 8px !important;
          font-family: 'Rajdhani', sans-serif !important;
          font-weight: 600 !important;
          font-size: 12px !important;
          outline: none !important;
          cursor: pointer !important;
          box-shadow: 0 0 8px rgba(0, 217, 255, 0.2) !important;
          appearance: none !important; /* Removes default OS styling on mobile */
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
        }
        .goog-te-gadget .goog-te-combo option {
          background-color: #050A15 !important;
          color: #fff !important;
          font-family: 'Rajdhani', sans-serif !important;
        }
        /* Hide the top banner frame */
        .skiptranslate iframe {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
      `}</style>
    </div>
  );
}

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}
