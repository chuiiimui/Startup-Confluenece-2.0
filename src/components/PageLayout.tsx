import React, { Suspense, lazy } from 'react';
import { SEO, ScrollProgress } from './index';
import SectionReveal from './SectionReveal';
import { usePerfMode } from '../hooks/usePerfMode';

const Footer = lazy(() =>
  import('../sections/Footer').then((m) => ({ default: m.Footer }))
);

export function Section({
  children,
  band,
}: {
  children: React.ReactNode;
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
  children: React.ReactNode;
  title?: string;
  description?: string;
  revealed?: boolean;
}

export default function PageLayout({
  children,
  title,
  description,
  revealed = true,
}: PageLayoutProps) {
  const { isMobile, reduceMotion } = usePerfMode();

  return (
    <>
      <SEO title={title} description={description} />
      <main
        className={`relative z-10 min-h-[60dvh] pb-[4.5rem] pt-20 transition-opacity duration-500 md:pb-0 md:pt-24 ${
          revealed || reduceMotion || isMobile ? 'opacity-100' : 'opacity-90'
        }`}
      >
        {children}
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      {!isMobile && <ScrollProgress />}
    </>
  );
}
