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
  speaker?: Speaker;
  type: 'keynote' | 'panel' | 'pitch' | 'networking' | 'workshop';
}

export interface ScheduleDay {
  day: number;
  date: string;
  events: Event[];
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'title' | 'gold' | 'silver' | 'community';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
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
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  college: string;
  role: 'student' | 'professional' | 'investor' | 'founder';
  startupName?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PitchStep {
  step: number;
  title: string;
  description: string;
}
