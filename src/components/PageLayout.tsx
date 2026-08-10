'use client';

import { Suspense, lazy, type ReactNode } from 'react';
import SectionReveal from './SectionReveal';
import { usePerfMode } from '../hooks/usePerfMode';
import { useRevealed } from '../context/RevealContext';

const Footer = lazy(() =>
  import('../sections/Footer').then((m) => ({ default: m.Footer }))
);

export function Section({
  children,
  band,
}: {
  children: ReactNode;
  band?: 'cyan' | 'peach' | 'cream';
}) {
  return (
    <SectionReveal>
      <div className={band ? `section-band section-band--${band}` : undefined}>
        <Suspense fallback={null}>{children}</Suspense>
      </div>
    </SectionReveal>
  );
}

interface PageLayoutProps {
  children: ReactNode;
  revealed?: boolean;
}

export default function PageLayout({
  children,
  revealed,
}: PageLayoutProps) {
  const contextRevealed = useRevealed();
  const { isMobile, reduceMotion } = usePerfMode();
  const isRevealed = revealed ?? contextRevealed;

  return (
    <>
      <main
        className={`relative z-10 min-h-[60dvh] pb-[4.5rem] pt-20 transition-opacity duration-500 md:pb-0 md:pt-24 ${
          isRevealed || reduceMotion || isMobile ? 'opacity-100' : 'opacity-90'
        }`}
      >
        {children}
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
