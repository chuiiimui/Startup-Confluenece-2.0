import { lazy } from 'react';
import PageLayout, { Section } from '../components/PageLayout';

const StartupExpo = lazy(() => import('../sections/StartupExpo'));

export default function ExpoPage() {
  return (
    <PageLayout
      title="Startup Expo | Startup Confluence 2.0"
      description="Discover startups across domains at the Startup Confluence 2.0 expo."
    >
      <Section>
        <StartupExpo />
      </Section>
    </PageLayout>
  );
}
