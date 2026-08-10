'use client';

import { lazy } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const Speakers = lazy(() => import('../sections/Speakers'));

export default function SpeakersPage() {
  return (
    <PageLayout>
      <Section>
        <Speakers />
      </Section>
    </PageLayout>
  );
}
