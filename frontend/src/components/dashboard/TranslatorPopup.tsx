'use client';

import { useEffect, useCallback } from 'react';
import { useTranslationStore } from '@/store/translationStore';

const LANG_COOKIE = 'googtrans';
const TAMIL_COOKIE = '/en/ta';

function setCookie(name: string, value: string, days: number) {
  const expires = value ? new Date(Date.now() + days * 864e5).toUTCString() : 'Thu, 01 Jan 1970 00:00:00 UTC';
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    document.cookie = `${name}=${value}; expires=${expires}; path=/; domain=${window.location.hostname}; SameSite=Lax`;
  }
}

export default function TranslatorPopup() {
  const language = useTranslationStore(s => s.language);
  const setStoreLang = useTranslationStore(s => s.setLanguage);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (language === 'ta' && !document.getElementById('google-translate-script')) {
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
            autoDisplay: false,
          },
          'google_translate_element'
        );
      };
    }
  }, [language]);

  const handleToggle = useCallback((targetLang: 'en' | 'ta') => {
    if (targetLang === language) return;

    if (targetLang === 'ta') {
      setCookie(LANG_COOKIE, TAMIL_COOKIE, 365);
    } else {
      setCookie(LANG_COOKIE, '', -1);
    }
    setStoreLang(targetLang);

    if (targetLang === 'ta' && !document.getElementById('google-translate-script')) {
      window.location.reload();
      return;
    }

    if (targetLang === 'ta' && window.google && window.google.translate) {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = 'ta';
        select.dispatchEvent(new Event('change'));
      }
    }
  }, [language, setStoreLang]);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[#050A15]/90 border border-[#00D9FF]/30 rounded-full p-1 shadow-[0_0_15px_rgba(0,217,255,0.25)] backdrop-blur-md flex items-center space-x-1 transition-all hover:scale-105 no-select">
      <div id="google_translate_element" className="absolute invisible pointer-events-none w-0 h-0 overflow-hidden" />

      <button
        onClick={() => handleToggle('en')}
        className={`px-3 py-1 rounded-full text-[10px] font-bold font-orbitron tracking-wider transition-all duration-300 ${
          language === 'en'
            ? 'bg-[#00D9FF] text-[#050A15] shadow-[0_0_10px_rgba(0,217,255,0.5)]'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleToggle('ta')}
        className={`px-3 py-1 rounded-full text-[10px] font-bold font-orbitron tracking-wider transition-all duration-300 ${
          language === 'ta'
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
