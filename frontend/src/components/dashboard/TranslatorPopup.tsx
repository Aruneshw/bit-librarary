'use client';

import { useEffect, useState } from 'react';

export default function TranslatorPopup() {
  const [lang, setLang] = useState<'en' | 'ta'>('en');

  const getTranslateCookie = () => {
    if (typeof document === 'undefined') return 'en';
    const match = document.cookie.match(/(^|;)\s*googtrans\s*=\s*([^;]+)/);
    if (match) {
      const val = match[2];
      if (val.includes('/ta')) return 'ta';
    }
    return 'en';
  };

  useEffect(() => {
    setLang(getTranslateCookie());

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
          },
          'google_translate_element'
        );
      };
    }
  }, []);

  const handleToggle = (targetLang: 'en' | 'ta') => {
    if (targetLang === lang) return;

    if (targetLang === 'ta') {
      document.cookie = "googtrans=/en/ta; path=/;";
      if (window.location.hostname !== 'localhost') {
        document.cookie = "googtrans=/en/ta; path=/; domain=" + window.location.hostname + ";";
      }
    } else {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      if (window.location.hostname !== 'localhost') {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/;";
      }
    }

    setLang(targetLang);
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[#050A15]/90 border border-[#00D9FF]/30 rounded-full p-1 shadow-[0_0_15px_rgba(0,217,255,0.25)] backdrop-blur-md flex items-center space-x-1 transition-all hover:scale-105">
      <div id="google_translate_element" className="absolute invisible pointer-events-none w-0 h-0 overflow-hidden" />

      <button
        onClick={() => handleToggle('en')}
        className={`px-3 py-1 rounded-full text-[10px] font-bold font-orbitron tracking-wider transition-all duration-300 ${
          lang === 'en'
            ? 'bg-[#00D9FF] text-[#050A15] shadow-[0_0_10px_rgba(0,217,255,0.5)]'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleToggle('ta')}
        className={`px-3 py-1 rounded-full text-[10px] font-bold font-orbitron tracking-wider transition-all duration-300 ${
          lang === 'ta'
            ? 'bg-[#00D9FF] text-[#050A15] shadow-[0_0_10px_rgba(0,217,255,0.5)]'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        தமிழ்
      </button>

      <style jsx global>{`
        .skiptranslate iframe, iframe.skiptranslate, .goog-te-banner-frame {
          display: none !important;
          visibility: hidden !important;
        }
        body {
          top: 0 !important;
        }
        #goog-gt-tt, .goog-te-balloon-frame, .goog-tooltip, .goog-tooltip:hover {
          display: none !important;
          visibility: hidden !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
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
