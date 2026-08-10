'use client';

import { lazy } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const Venue = lazy(() =>
  import('../sections/Venue').then((m) => ({ default: m.Venue }))
);
const FAQ = lazy(() =>
  import('../sections/FAQ').then((m) => ({ default: m.FAQ }))
);

export default function VenuePage() {
  return (
    <PageLayout>
      <Section>
        <Venue />
      </Section>
      <Section>
        <FAQ />
      </Section>
    </PageLayout>
  );
}
