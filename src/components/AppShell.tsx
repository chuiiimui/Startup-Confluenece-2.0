'use client';

import { Suspense, lazy, useCallback, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScrollProgress,
  Navbar,
  PremiumLoader,
} from './index';
import PremiumBackground from './PremiumBackground';
import CursorTrail from './CursorTrail';
import SmoothScroll from './SmoothScroll';
import MobileRegisterDock from './MobileRegisterDock';
import BecomePartnerButton from './BecomePartnerButton';
import { usePerfMode } from '../hooks/usePerfMode';
import { RevealProvider } from '../context/RevealContext';
import { applyPerfToDocument } from '../lib/perf';

const RegistrationModal = lazy(() => import('./RegistrationModal'));
const PartnerModal = lazy(() => import('./PartnerModal'));

// Run once on the client as early as this module loads.
if (typeof window !== 'undefined') {
  applyPerfToDocument();
}

export default function AppShell({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const { reduceMotion, isMobile } = usePerfMode();
  const lightEffects = !reduceMotion && !isMobile;

  const finishLoading = useCallback(() => {
    setIsLoading(false);
    requestAnimationFrame(() => setRevealed(true));
    window.setTimeout(() => setShowLoader(false), isMobile ? 400 : 700);
  }, [isMobile]);

  return (
    <SmoothScroll>
      {showLoader && <PremiumLoader onComplete={finishLoading} />}

      <div
        className={`relative min-h-[100dvh] font-body ${
          isLoading ? 'h-[100dvh] overflow-hidden' : ''
        }`}
        style={{
          color: 'var(--text-primary)',
          backgroundColor: 'var(--bg)',
        }}
      >
        <PremiumBackground />
        {!isMobile && <CursorTrail />}

        <AnimatePresence>
          {revealed && lightEffects && (
            <motion.div
              key="reveal-sweep"
              className="pointer-events-none fixed inset-0 z-[180]"
              initial={{ opacity: 0.55, x: '-30%' }}
              animate={{ opacity: 0, x: '40%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background:
                  'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 48%, rgba(255,122,0,0.12) 52%, transparent 70%)',
              }}
            />
          )}
        </AnimatePresence>

        <Navbar />

        <div className="relative z-10 min-w-0">
          <RevealProvider value={revealed}>{children}</RevealProvider>
        </div>

        <Suspense fallback={null}>
          <RegistrationModal />
        </Suspense>
        <Suspense fallback={null}>
          <PartnerModal />
        </Suspense>
      </div>

      {!isLoading && <BecomePartnerButton />}
      {!isLoading && <MobileRegisterDock />}

      {!isMobile && <ScrollProgress />}
    </SmoothScroll>
  );
}
