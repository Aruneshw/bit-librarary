'use client';

import { useCallback } from 'react';
import { useTranslationStore } from '@/store/translationStore';

export default function TranslatorPopup() {
  const language = useTranslationStore(s => s.language);
  const setStoreLang = useTranslationStore(s => s.setLanguage);

  const handleToggle = useCallback((targetLang: 'en' | 'ta') => {
    if (targetLang === language) return;
    setStoreLang(targetLang);
  }, [language, setStoreLang]);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[#050A15]/90 border border-[#00D9FF]/30 rounded-full p-1 shadow-[0_0_15px_rgba(0,217,255,0.25)] backdrop-blur-md flex items-center space-x-1 transition-all hover:scale-105 no-select">
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
    </div>
  );
}
