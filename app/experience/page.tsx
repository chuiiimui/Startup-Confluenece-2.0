import type { Metadata } from 'next';
import ExperiencePage from '@/views/ExperiencePage';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Explore the Startup Confluence 2.0 experience — pitching arena, expo, and more.',
};

export default function Page() {
  return <ExperiencePage />;
}
