'use client';

import { lazy } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const Schedule = lazy(() => import('../sections/Schedule'));

export default function SchedulePage() {
  return (
    <PageLayout>
      <Section>
        <Schedule />
      </Section>
    </PageLayout>
  );
}
