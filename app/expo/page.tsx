import type { Metadata } from 'next';
import ExpoPage from '@/views/ExpoPage';

export const metadata: Metadata = {
  title: 'Startup Expo',
  description: 'Discover startups across domains at the Startup Confluence Expo.',
};

export default function Page() {
  return <ExpoPage />;
}
