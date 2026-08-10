import type { Metadata } from 'next';
import RegisterPage from '@/views/RegisterPage';

export const metadata: Metadata = {
  title: 'Register',
  description:
    'Read guidelines for startups, visitors, and speakers, then continue to registration for Startup Confluence 2.0.',
};

export default function Page() {
  return <RegisterPage />;
}
