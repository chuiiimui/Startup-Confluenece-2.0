import type { Metadata } from 'next';
import TeamPage from '@/views/TeamPage';

export const metadata: Metadata = {
  title: 'Team',
  description: 'The organizers and team behind Startup Confluence 2.0.',
};

export default function Page() {
  return <TeamPage />;
}
