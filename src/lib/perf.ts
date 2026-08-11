export type PerfMode = 'low' | 'high';

export interface PerfProfile {
  mode: PerfMode;
  isMobile: boolean;
  isAndroid: boolean;
  isLowEnd: boolean;
  reduceMotion: boolean;
  /** WebGL / R3F scenes */
  enable3D: boolean;
  /** Scroll-linked parallax, orb motion, sheen */
  enableParallax: boolean;
  /** Heavy backdrop-filter / animated blur */
  enableHeavyBlur: boolean;
  /** 3D tilt / magnetic hover */
  enableTilt: boolean;
  dpr: [number, number];
}

/** Conservative profile used for SSR + first client paint (must match). */
export const PERF_SSR_DEFAULT: PerfProfile = {
  mode: 'low',
  isMobile: false,
  isAndroid: false,
  isLowEnd: false,
  reduceMotion: false,
  enable3D: false,
  enableParallax: false,
  enableHeavyBlur: false,
  enableTilt: false,
  dpr: [1, 1],
};

function readConnectionSaveData(): boolean {
  const conn = (navigator as Navigator & {
    connection?: { saveData?: boolean };
  }).connection;
  return Boolean(conn?.saveData);
}

/**
 * Detect device capability once. Prefer conservative defaults on Android /
 * touch / low RAM so scroll stays near 60fps.
 */
export function getPerfProfile(): PerfProfile {
  if (typeof window === 'undefined') {
    return PERF_SSR_DEFAULT;
  }

  const isMobile =
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 768px)').matches;
  const isAndroid = /Android/i.test(navigator.userAgent);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const saveData = readConnectionSaveData();

  // Only treat clearly constrained devices as low-end. A typical 4-core
  // desktop must stay on high so neon/parallax layers remain active.
  const isLowEnd =
    saveData ||
    memory <= 2 ||
    cores <= 2 ||
    (isAndroid && isMobile) ||
    (isMobile && (memory <= 4 || cores <= 4));

  const mode: PerfMode = isLowEnd || isMobile ? 'low' : 'high';

  return {
    mode,
    isMobile,
    isAndroid,
    isLowEnd: mode === 'low',
    // Respect OS preference only — do not fake reduce-motion on low mode
    // or cursor/neon layers get silently disabled on normal desktops.
    reduceMotion,
    enable3D: mode === 'high' && !reduceMotion,
    enableParallax: mode === 'high' && !reduceMotion,
    enableHeavyBlur: mode === 'high',
    enableTilt: mode === 'high' && !isMobile,
    dpr: mode === 'low' ? [1, 1] : [1, 1.25],
  };
}

/** Apply html[data-perf] for CSS hooks (safe to call repeatedly). */
export function applyPerfToDocument(profile: PerfProfile = getPerfProfile()): void {
  const root = document.documentElement;
  root.setAttribute('data-perf', profile.mode);
  root.setAttribute('data-mobile', profile.isMobile ? 'true' : 'false');
  if (profile.isAndroid) root.setAttribute('data-android', 'true');
  else root.removeAttribute('data-android');
}
