import { NextRequest, NextResponse } from 'next/server';

const translationCache = new Map<string, string>();
const MAX_CACHE_SIZE = 500;

function getCacheKey(text: string, targetLang: string): string {
  return `${targetLang}:${text}`;
}

function setCache(key: string, value: string): void {
  if (translationCache.size >= MAX_CACHE_SIZE) {
    const firstKey = translationCache.keys().next().value;
    if (firstKey !== undefined) translationCache.delete(firstKey);
  }
  translationCache.set(key, value);
}

export async function POST(request: NextRequest) {
  try {
    const { texts, targetLanguage } = await request.json();

    if (!Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json({ error: 'No texts provided' }, { status: 400 });
    }

    if (!targetLanguage || targetLanguage === 'en') {
      return NextResponse.json({ translations: texts });
    }

    const results: string[] = [];
    const uncachedIndices: number[] = [];
    const uncachedTexts: string[] = [];

    texts.forEach((text, index) => {
      if (!text) {
        results[index] = text;
        return;
      }
      const key = getCacheKey(text, targetLanguage);
      const cached = translationCache.get(key);
      if (cached) {
        results[index] = cached;
      } else {
        results[index] = text;
        uncachedIndices.push(index);
        uncachedTexts.push(text);
      }
    });

    if (uncachedTexts.length > 0) {
      const params = new URLSearchParams({
        client: 'gtx',
        sl: 'en',
        tl: targetLanguage,
        dt: 't',
      });
      uncachedTexts.forEach(t => params.append('q', t));

      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?${params.toString()}`,
        { headers: { Accept: 'application/json' } }
      );

      if (response.ok) {
        const data = await response.json();
        if (data?.[0] && Array.isArray(data[0])) {
          data[0].forEach((item: any, i: number) => {
            if (item?.[0]) {
              const originalIndex = uncachedIndices[i];
              const translatedText = item[0];
              results[originalIndex] = translatedText;
              setCache(getCacheKey(uncachedTexts[i], targetLanguage), translatedText);
            }
          });
        }
      }
    }

    return NextResponse.json({ translations: results });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}
