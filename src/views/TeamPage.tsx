'use client';

import { lazy } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const Team = lazy(() => import('../sections/Team'));

export default function TeamPage() {
  return (
    <PageLayout>
      <Section>
        <Team />
      </Section>
    </PageLayout>
  );
}
