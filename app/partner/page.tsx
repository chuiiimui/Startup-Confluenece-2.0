import type { Metadata } from 'next';
import PartnerPage from '@/views/PartnerPage';

export const metadata: Metadata = {
  title: 'Partner',
  description: 'Partnership opportunities for Startup Confluence 2.0.',
};

export default function Page() {
  return <PartnerPage />;
}
