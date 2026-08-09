import { lazy } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const Sponsors = lazy(() => import('../sections/Sponsors'));

export default function SponsorsPage() {
  return (
    <PageLayout
      title="Sponsors | Startup Confluence 2.0"
      description="Partners and sponsors powering Startup Confluence 2.0."
    >
      <Section>
        <Sponsors />
      </Section>
    </PageLayout>
  );
}
