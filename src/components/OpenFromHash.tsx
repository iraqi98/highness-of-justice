'use client';

import { useEffect } from 'react';

/** Opens the <details> inside the element targeted by the URL hash (e.g. /en/#practice-03). */
export function OpenFromHash() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const details = document.getElementById(id)?.querySelector('details');
      if (details && !details.open) details.open = true;
    };
    open();
    window.addEventListener('hashchange', open);
    return () => window.removeEventListener('hashchange', open);
  }, []);
  return null;
}
