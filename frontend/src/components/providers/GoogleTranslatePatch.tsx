'use client';

import { useEffect } from 'react';

export default function GoogleTranslatePatch() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Monkeypatch removeChild to catch Google Translate manipulation errors
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      try {
        return originalRemoveChild.call(this, child) as T;
      } catch (error: any) {
        if (error.name === 'NotFoundError' || error.message?.includes('not a child of this node')) {
          return child;
        }
        throw error;
      }
    };

    // 2. Monkeypatch insertBefore to catch Google Translate manipulation errors
    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
      try {
        return originalInsertBefore.call(this, newNode, referenceNode) as T;
      } catch (error: any) {
        if (error.name === 'NotFoundError' || error.message?.includes('not a child of this node')) {
          return newNode;
        }
        throw error;
      }
    };

    // 3. Monkeypatch appendChild for additional safety
    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function <T extends Node>(newNode: T): T {
      try {
        return originalAppendChild.call(this, newNode) as T;
      } catch (error: any) {
        if (error.name === 'NotFoundError' || error.message?.includes('not a child of this node')) {
          return newNode;
        }
        throw error;
      }
    };

    // 4. Prevent Google Translate banner from appearing
    const hideBanner = () => {
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner) {
        (banner as HTMLElement).style.display = 'none';
      }
      const body = document.body;
      if (body.style.top) {
        body.style.top = '0px';
      }
    };

    const observer = new MutationObserver(() => {
      hideBanner();
      // Also ensure no unwanted styles are applied
      const html = document.documentElement;
      if (html.style.marginTop) {
        html.style.marginTop = '0';
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    hideBanner();

    return () => {
      observer.disconnect();
      Node.prototype.removeChild = originalRemoveChild;
      Node.prototype.insertBefore = originalInsertBefore;
      Node.prototype.appendChild = originalAppendChild;
    };
  }, []);

  return null;
}
