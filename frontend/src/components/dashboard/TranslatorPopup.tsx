'use client';

import { useEffect, useState, useCallback } from 'react';

const LANG_COOKIE = 'googtrans';
const LANG_STORAGE_KEY = 'bitlib_language';
const TAMIL_COOKIE = '/en/ta';

function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = value ? new Date(Date.now() + days * 864e5).toUTCString() : 'Thu, 01 Jan 1970 00:00:00 UTC';
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    document.cookie = `${name}=${value}; expires=${expires}; path=/; domain=${window.location.hostname}; SameSite=Lax`;
  }
}

function getStoredLanguage(): 'en' | 'ta' {
  const fromStorage = localStorage.getItem(LANG_STORAGE_KEY);
  if (fromStorage === 'ta' || fromStorage === 'en') return fromStorage;

  const cookie = getCookieValue(LANG_COOKIE);
  if (cookie?.includes('/ta')) return 'ta';

  return 'en';
}

export default function TranslatorPopup() {
  const [lang, setLang] = useState<'en' | 'ta'>(getStoredLanguage);

  const applyLanguage = useCallback((targetLang: 'en' | 'ta') => {
    if (targetLang === 'ta') {
      setCookie(LANG_COOKIE, TAMIL_COOKIE, 365);
      localStorage.setItem(LANG_STORAGE_KEY, 'ta');
    } else {
      setCookie(LANG_COOKIE, '', -1);
      localStorage.setItem(LANG_STORAGE_KEY, 'en');
    }
    setLang(targetLang);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = getStoredLanguage();
    setLang(stored);

    if (stored === 'ta' && !document.getElementById('google-translate-script')) {
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
  }, []);

  const handleToggle = useCallback((targetLang: 'en' | 'ta') => {
    if (targetLang === lang) return;
    applyLanguage(targetLang);

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
  }, [lang, applyLanguage]);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[#050A15]/90 border border-[#00D9FF]/30 rounded-full p-1 shadow-[0_0_15px_rgba(0,217,255,0.25)] backdrop-blur-md flex items-center space-x-1 transition-all hover:scale-105 no-select">
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
