'use client';

import { Suspense, lazy } from 'react';
import { Section } from '@/components/PageLayout';
import { Hero } from '@/sections';
import { usePerfMode } from '@/hooks/usePerfMode';
import { useRevealed } from '@/context/RevealContext';

const About = lazy(() => import('@/sections/About'));
const EventHighlights = lazy(() => import('@/sections/EventHighlights'));
const WhyAttend = lazy(() => import('@/sections/WhyAttend'));
const Team = lazy(() => import('@/sections/Team'));
const Registration = lazy(() =>
  import('@/sections/Registration').then((m) => ({ default: m.Registration }))
);
const Contact = lazy(() =>
  import('@/sections/Contact').then((m) => ({ default: m.Contact }))
);
const Footer = lazy(() =>
  import('@/sections/Footer').then((m) => ({ default: m.Footer }))
);

export default function HomePage() {
  const revealed = useRevealed();
  const { isMobile, reduceMotion } = usePerfMode();

  return (
    <>
      <main
        className={`relative z-10 pb-[4.5rem] transition-opacity duration-500 md:pb-0 ${
          revealed || reduceMotion || isMobile ? 'opacity-100' : 'opacity-90'
        }`}
      >
        <Hero />
        <Section band="cream">
          <About />
        </Section>
        <Section band="cyan">
          <EventHighlights />
        </Section>
        <Section band="peach">
          <WhyAttend />
        </Section>
        <Section band="cream">
          <Team />
        </Section>
        <Section band="cyan">
          <Registration />
        </Section>
        <Section band="peach">
          <Contact />
        </Section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
