'use client';

import { lazy } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const StartupExpo = lazy(() => import('../sections/StartupExpo'));

export default function ExpoPage() {
  return (
    <PageLayout>
      <Section>
        <StartupExpo />
      </Section>
    </PageLayout>
  );
}
