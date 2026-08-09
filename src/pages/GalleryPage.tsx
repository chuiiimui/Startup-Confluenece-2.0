import { lazy } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const Gallery = lazy(() => import('../sections/Gallery'));

export default function GalleryPage() {
  return (
    <PageLayout
      title="Gallery | Startup Confluence 2.0"
      description="Moments from Startup Confluence — stages, pitches, and community."
    >
      <Section>
        <Gallery />
      </Section>
    </PageLayout>
  );
}
