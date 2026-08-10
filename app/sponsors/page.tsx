import type { Metadata } from 'next';
import SponsorsPage from '@/views/SponsorsPage';

export const metadata: Metadata = {
  title: 'Sponsors',
  description: 'Partners and sponsors supporting Startup Confluence 2.0.',
};

export default function Page() {
  return <SponsorsPage />;
}
