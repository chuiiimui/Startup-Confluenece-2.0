import { lazy, Suspense } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const ExperienceStrip = lazy(() => import('../sections/ExperienceStrip'));
const PitchingArena = lazy(() => import('../sections/PitchingArena'));

export default function ExperiencePage() {
  return (
    <PageLayout
      title="Experience | Startup Confluence 2.0"
      description="Explore the Confluence experience — pitch live, raise capital, and grow your network."
    >
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
