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
    <PageLayout
      title="Venue & FAQ | Startup Confluence 2.0"
      description="Location details and frequently asked questions for Startup Confluence 2.0."
    >
      <Section>
        <Venue />
      </Section>
      <Section>
        <FAQ />
      </Section>
    </PageLayout>
  );
}
