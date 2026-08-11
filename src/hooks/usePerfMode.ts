import { useEffect, useState } from 'react';
import {
  applyPerfToDocument,
  getPerfProfile,
  PERF_SSR_DEFAULT,
  type PerfProfile,
} from '../lib/perf';

let cached: PerfProfile | null = null;

function readProfile(): PerfProfile {
  if (!cached) {
    cached = getPerfProfile();
    applyPerfToDocument(cached);
  }
  return cached;
}

/**
 * Shared performance profile for low-end / Android / mobile.
 * First paint always uses PERF_SSR_DEFAULT so SSR HTML matches the client
 * hydrate tree; the real device profile is applied after mount.
 */
export function usePerfMode(): PerfProfile {
  const [profile, setProfile] = useState<PerfProfile>(PERF_SSR_DEFAULT);

  useEffect(() => {
    cached = null;
    const next = readProfile();
    setProfile(next);

    const onChange = () => {
      cached = null;
      const refreshed = readProfile();
      setProfile(refreshed);
    };

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqNarrow = window.matchMedia('(max-width: 768px)');
    mqReduce.addEventListener('change', onChange);
    mqNarrow.addEventListener('change', onChange);
    return () => {
      mqReduce.removeEventListener('change', onChange);
      mqNarrow.removeEventListener('change', onChange);
    };
  }, []);

  return profile;
}
