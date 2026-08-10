import type { Metadata } from 'next';
import SpeakersPage from '@/views/SpeakersPage';

export const metadata: Metadata = {
  title: 'Speakers',
  description:
    'Meet the founders, investors, and innovators speaking at Startup Confluence 2.0.',
};

export default function Page() {
  return <SpeakersPage />;
}
