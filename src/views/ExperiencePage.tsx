'use client';

import { lazy, Suspense } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const ExperienceStrip = lazy(() => import('../sections/ExperienceStrip'));
const PitchingArena = lazy(() => import('../sections/PitchingArena'));

export default function ExperiencePage() {
  return (
    <PageLayout>
      {/* Sticky horizontal pin needs a transform-free ancestor */}
      <Suspense fallback={null}>
        <ExperienceStrip />
      </Suspense>
      <Section>
        <PitchingArena />
      </Section>
    </PageLayout>
  );
}
