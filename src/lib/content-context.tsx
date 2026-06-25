'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { SiteContent } from '@/types/content';
import { defaultContent } from './content';
import { loadStoredContent } from './storage';

interface ContentContextValue {
  content: SiteContent;
  /** true una vez leído el localStorage del lado del cliente. */
  hydrated: boolean;
}

const ContentContext = createContext<ContentContextValue>({
  content: defaultContent,
  hydrated: false,
});

/**
 * Provee el contenido del sitio.
 * Estrategia anti-hydration-mismatch: el primer render (SSR + cliente) usa el
 * contenido por defecto; tras montar, si hay una versión guardada en localStorage
 * (editada desde /admin), se aplica. Los crawlers/SEO ven el contenido default.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadStoredContent();
    if (stored) setContent(stored);
    setHydrated(true);

    // Mantener varias pestañas sincronizadas.
    const onStorage = () => {
      const next = loadStoredContent();
      if (next) setContent(next);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo(() => ({ content, hydrated }), [content, hydrated]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): SiteContent {
  return useContext(ContentContext).content;
}

export function useContentMeta(): ContentContextValue {
  return useContext(ContentContext);
}
