'use client';

import { lazy } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const Sponsors = lazy(() => import('../sections/Sponsors'));

export default function SponsorsPage() {
  return (
    <PageLayout>
      <Section>
        <Sponsors />
      </Section>
    </PageLayout>
  );
}
