import { useState, useEffect } from 'react';
import { safeGetItem, safeSetItem } from '../utils/storage';

/**
 * Custom hook to manage muted state with localStorage persistence
 */
export function useMutedState() {
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return safeGetItem<boolean>('videoWall.muted', true);
  });

  useEffect(() => {
    safeSetItem('videoWall.muted', muted);
  }, [muted]);

  return { muted, setMuted };
}
