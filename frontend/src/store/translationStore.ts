import { create } from 'zustand';

const LANG_STORAGE_KEY = 'bitlib_language';

function getStoredLanguage(): 'en' | 'ta' {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'ta' || stored === 'en') return stored;
  } catch {}
  return 'en';
}

function persistLanguage(lang: 'en' | 'ta') {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {}
}

interface TranslationState {
  language: 'en' | 'ta';
  translationCache: Record<string, string>;
  isTranslating: boolean;
  setLanguage: (lang: 'en' | 'ta') => void;
  translateTexts: (texts: string[]) => Promise<string[]>;
  clearCache: () => void;
}

export const useTranslationStore = create<TranslationState>((set, get) => ({
  language: getStoredLanguage(),
  translationCache: {},
  isTranslating: false,

  setLanguage: (lang) => {
    persistLanguage(lang);
    set({ language: lang, translationCache: {} });
  },

  translateTexts: async (texts) => {
    const { language, translationCache } = get();

    if (language === 'en') return texts;

    const results: string[] = [];
    const uncached: { index: number; text: string }[] = [];

    texts.forEach((text, index) => {
      if (!text) {
        results[index] = text;
        return;
      }
      const cached = translationCache[text];
      if (cached) {
        results[index] = cached;
      } else {
        results[index] = text;
        uncached.push({ index, text });
      }
    });

    if (uncached.length === 0) return results;

    set({ isTranslating: true });
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: uncached.map(u => u.text),
          targetLanguage: language,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.translations) {
          const newCache = { ...translationCache };
          data.translations.forEach((translated: string, i: number) => {
            const { index, text } = uncached[i];
            if (translated) {
              results[index] = translated;
              newCache[text] = translated;
            }
          });
          set({ translationCache: newCache });
        }
      }
    } catch (err) {
      console.warn('Translation error:', err);
    } finally {
      set({ isTranslating: false });
    }

    return results;
  },

  clearCache: () => set({ translationCache: {} }),
}));
