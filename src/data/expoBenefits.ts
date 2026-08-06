export interface ExpoBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  colSpan?: number;
  rowSpan?: number;
}

export const expoBenefits: ExpoBenefit[] = [
  {
    id: 'b-1',
    title: 'Investor Connect',
    description: 'Direct access to VCs, angel investors, and funding opportunities.',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800',
    colSpan: 2,
    rowSpan: 2,
  },
  {
    id: 'b-2',
    title: 'Mentorship Access',
    description: 'Learn from industry veterans and successful founders.',
    icon: 'Users',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 'b-3',
    title: 'Media Visibility',
    description: 'Get featured in top tech publications and news outlets.',
    icon: 'Radio',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=800',
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 'b-4',
    title: 'Partnership Opportunities',
    description: 'Collaborate with leading enterprises and other startups.',
    icon: 'Handshake',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
    colSpan: 1,
    rowSpan: 2,
  },
  {
    id: 'b-5',
    title: 'Incubation Support',
    description: 'Secure spots in top-tier global accelerator programs.',
    icon: 'Rocket',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    colSpan: 2,
    rowSpan: 1,
  },
  {
    id: 'b-6',
    title: 'Startup Ecosystem',
    description: 'Immerse yourself in a thriving community of innovators.',
    icon: 'Globe',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    colSpan: 2,
    rowSpan: 1,
  },
];
