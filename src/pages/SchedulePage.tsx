import { lazy } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const Schedule = lazy(() => import('../sections/Schedule'));

export default function SchedulePage() {
  return (
    <PageLayout
      title="Schedule | Startup Confluence 2.0"
      description="Full event schedule for Startup Confluence 2.0 — keynotes, workshops, pitches, and networking."
    >
      <Section>
        <Schedule />
      </Section>
    </PageLayout>
  );
}
