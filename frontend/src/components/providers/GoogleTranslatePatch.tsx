'use client';

import { useEffect } from 'react';

export default function GoogleTranslatePatch() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function <T extends Node>(child: T): T {
        try {
          return originalRemoveChild.call(this, child) as T;
        } catch (error: any) {
          if (error.name === 'NotFoundError' || error.message?.includes('not a child of this node')) {
            console.warn('Blocked a crash caused by Google Translate (removeChild)');
            return child;
          }
          throw error;
        }
      };

      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
        try {
          return originalInsertBefore.call(this, newNode, referenceNode) as T;
        } catch (error: any) {
          if (error.name === 'NotFoundError' || error.message?.includes('not a child of this node')) {
            console.warn('Blocked a crash caused by Google Translate (insertBefore)');
            return newNode;
          }
          throw error;
        }
      };
    }
  }, []);

  return null;
}
