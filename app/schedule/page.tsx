import type { Metadata } from 'next';
import SchedulePage from '@/views/SchedulePage';

export const metadata: Metadata = {
  title: 'Schedule',
  description: 'Full event schedule for Startup Confluence 2.0.',
};

export default function Page() {
  return <SchedulePage />;
}
