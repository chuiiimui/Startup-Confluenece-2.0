import { lazy } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const Team = lazy(() => import('../sections/Team'));

export default function TeamPage() {
  return (
    <PageLayout
      title="Team | Startup Confluence 2.0"
      description="The organizers and team behind Startup Confluence 2.0."
    >
      <Section>
        <Team />
      </Section>
    </PageLayout>
  );
}
