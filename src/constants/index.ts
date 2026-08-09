import { NavItem } from '../types';

export const EVENT_DATE = '2026-10-23T09:00:00+05:30';
export const EVENT_NAME = 'Startup Confluence 2.0';

/**
 * Nav follows homepage scroll order first, then satellite pages.
 * Hash hrefs scroll on `/`; path hrefs navigate.
 */
export const NAV_ITEMS: NavItem[] = [
  // Homepage flow
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Highlights', href: '/#highlights' },
  { label: 'Why Attend', href: '/#why-attend' },
  { label: 'Team', href: '/#team' },
  { label: 'Register', href: '/#register' },
  { label: 'Contact', href: '/#contact' },
  // More pages
  { label: 'Speakers', href: '/speakers' },
  { label: 'Experience', href: '/experience' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Expo', href: '/expo' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Venue', href: '/venue' },
];

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/startupconfluence',
  linkedin: 'https://linkedin.com/company/startupconfluence',
  instagram: 'https://instagram.com/startupconfluence',
};

export const CONTACT_INFO = {
  email: 'hello@startupconfluence.in',
  phone: '+91-6390903018',
  phones: ['+91-6390903018', '+91-89536 15232'],
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
