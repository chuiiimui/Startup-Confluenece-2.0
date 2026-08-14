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
  linkedin: 'https://www.linkedin.com/company/united-incubation-hub/',
  instagram: 'https://www.instagram.com/united_incubationhub?igsh=dGNxdTl6amwxbWJy',
  facebook: 'https://www.facebook.com/share/1B7u65PANq/',
  youtube: 'https://youtube.com/@unitedincubationhub?si=phJkowpp_LhV8pGu',
};
