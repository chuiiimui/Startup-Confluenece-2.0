import { NavItem } from '../types';

/**
 * Full nav — shown as one aligned row on desktop; hamburger list on mobile.
 * Hash hrefs scroll on `/`; path hrefs navigate.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Highlights', href: '/#highlights' },
  { label: 'Why Attend', href: '/#why-attend' },
  { label: 'Team', href: '/#team' },
  { label: 'Register', href: '/#register' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Speakers', href: '/speakers' },
  { label: 'Experience', href: '/experience' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Expo', href: '/expo' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Partner', href: '/partner' },
  { label: 'Venue', href: '/venue' },
];

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/startupconfluence',
  instagram: 'https://instagram.com/startupconfluence',
};
