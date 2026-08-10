import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
  title: "Startup Confluence 2.0 | India's Premier Startup Summit",
  description:
    'Join the biggest startup ecosystem gathering in India. Discover, connect, and grow with top founders, investors, and mentors at United Incubation Hub.',
};

export default function Page() {
  return <HomePage />;
}
