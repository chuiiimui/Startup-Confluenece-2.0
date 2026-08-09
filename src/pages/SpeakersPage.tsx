import { lazy } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const Speakers = lazy(() => import('../sections/Speakers'));

export default function SpeakersPage() {
  return (
    <PageLayout
      title="Speakers | Startup Confluence 2.0"
      description="Meet the founders, investors, and innovators speaking at Startup Confluence 2.0."
    >
      <Section>
        <Speakers />
      </Section>
    </PageLayout>
  );
}
