import { useState, useEffect } from 'react';
import { VIDEO_CONFIG } from '../config';
import { safeGetItem, safeSetItem } from '../utils/storage';

export function useVideoUrls() {
  const defaultUrls = (): string[] => {
    const init = [...VIDEO_CONFIG].slice(0, 4);
    while (init.length < 4) init.push('');
    return init;
  };

  const loadUrls = (): string[] => {
    const parsed = safeGetItem<unknown>('videoWall.urls', null);
    if (Array.isArray(parsed)) {
      const a = parsed.slice(0, 4);
      while (a.length < 4) a.push('');
      return a;
    }
    return defaultUrls();
  };

  const [urls, setUrls] = useState<string[]>(() => {
    if (typeof window === 'undefined') return defaultUrls();
    return loadUrls();
  });

  const handleUrlChange = (index: number, value: string) => {
    setUrls((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  useEffect(() => {
    safeSetItem('videoWall.urls', urls);
  }, [urls]);

  return { urls, setUrls, handleUrlChange };
}
