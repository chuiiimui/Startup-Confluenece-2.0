export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  bio: string;
}

export interface Event {
  id: string;
  time: string;
  title: string;
  description: string;
  speaker?: string;
  type: 'keynote' | 'panel' | 'pitch' | 'networking' | 'workshop' | 'other';
}

export interface ScheduleDay {
  id: string;
  date: string;
  title: string;
  events: Event[];
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'title' | 'gold' | 'silver' | 'community' | 'incubation' | 'technology' | 'media' | 'ecosystem';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ExpoCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  image?: string;
}

export interface GalleryImage {
  id: string;
  /** Full / high-res (desktop lightbox) */
  src: string;
  /** Compressed grid thumbnail */
  thumb: string;
  /** Medium WebP for mobile / low-end lightbox */
  preview: string;
  alt: string;
  category: string;
  title: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface PitchStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}
