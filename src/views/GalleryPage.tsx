'use client';

import { lazy } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const Gallery = lazy(() => import('../sections/Gallery'));

export default function GalleryPage() {
  return (
    <PageLayout>
      <Section>
        <Gallery />
      </Section>
    </PageLayout>
  );
}
