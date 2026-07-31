import { NavItem } from '../types';

export const EVENT_DATE = '2026-10-23T09:00:00+05:30';
export const EVENT_NAME = 'Startup Confluence 2.0';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Expo', href: '#expo' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'FAQ', href: '#faq' },
];

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/startupconfluence',
  linkedin: 'https://linkedin.com/company/startupconfluence',
  instagram: 'https://instagram.com/startupconfluence',
};

export const CONTACT_INFO = {
  email: 'hello@startupconfluence.in',
  phone: '+91 98765 43210',
  address: 'Convention Centre, Tech Park, Bangalore',
};

export const ORGANIZERS = [
  {
    name: 'E-Cell',
    role: 'Primary Organizer',
    website: 'https://ecell.example.com',
  },
  {
    name: 'Incubation Center',
    role: 'Co-Organizer',
    website: 'https://incubation.example.com',
  }
];
