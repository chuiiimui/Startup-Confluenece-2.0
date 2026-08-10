import type { Metadata } from 'next';
import VenuePage from '@/views/VenuePage';

export const metadata: Metadata = {
  title: 'Venue',
  description: 'Venue details and FAQ for Startup Confluence 2.0.',
};

export default function Page() {
  return <VenuePage />;
}
