export interface SponsorOfferingTier {
  type: 'Title Sponsor' | 'Brand Sponsor' | 'Event Sponsor' | 'Food Sponsor';
  suggestedAmount: number;
  offerings: string[];
}

export const SPONSORSHIP_INTRO =
  'Startup Confluence 2.0 provides brands and organizations with an excellent opportunity to connect with students, entrepreneurs, innovators, and a diverse audience through impactful branding, networking, and promotional opportunities.';

export const PARTNER_INTRO =
  'Startup Confluence 2.0 offers partners a valuable platform to enhance brand visibility, engage with a young and dynamic audience, and build meaningful connections with emerging entrepreneurs and innovators.';

export const SPONSOR_OFFERING_TIERS: SponsorOfferingTier[] = [
  {
    type: 'Title Sponsor',
    suggestedAmount: 200000,
    offerings: [
      'Brand logo prominently displayed on the backdrop of every event',
      'Brand logo featured on certificates',
      '10 standees at prominent event locations',
      'Brand logo featured on all publicity materials (posters, flyers, banners, and more)',
      'Brand logo promotion and tagging across all official social media platforms',
      'One dedicated stall at the Expo Area',
      'Display of advertisements during event break intervals',
      'Brand logo featured on event ID cards',
      '5-minute Elevator Pitch on Stage to showcase the brand, product, or services',
      'Certificate recognizing the Title Sponsor Partnership',
    ],
  },
  {
    type: 'Brand Sponsor',
    suggestedAmount: 100000,
    offerings: [
      'Brand logo displayed on the backdrop of every event',
      '5 standees at prominent event locations',
      'Brand logo featured on all publicity materials (posters, flyers, banners, and more)',
      'One dedicated stall at the Expo Area',
      'Certificate recognizing the Brand Sponsor Partnership',
    ],
  },
  {
    type: 'Event Sponsor',
    suggestedAmount: 50000,
    offerings: [
      'Brand logo displayed on the backdrop of the sponsored event',
      '3 standees at the sponsored event',
      'Brand logo featured on publicity materials related to the sponsored event',
      'Brand logo promotion and tagging across official social media for the sponsored event',
      'One stall at the Expo Area',
      'Certificate recognizing the Event Sponsor Partnership for the selected event(s)',
    ],
  },
  {
    type: 'Food Sponsor',
    suggestedAmount: 10000,
    offerings: [
      'Dedicated stall at the Food Corner',
      'Electricity and water facilities provided for the stall',
      'Social media promotion and tagging for the Food Sponsor',
    ],
  },
];

export const PARTNER_CATEGORIES_OFFERINGS = [
  {
    category: 'Incubation Partner',
    offerings: [
      'Co-branded visibility across selected summit touchpoints',
      'Opportunity to engage with shortlisted startups and founders',
      'Social media mention as an official incubation partner',
      'Certificate recognizing the partnership',
    ],
  },
  {
    category: 'Technology Partner',
    offerings: [
      'Recognition as the technology partner for Startup Confluence 2.0',
      'Logo placement on relevant digital and on-ground assets',
      'Opportunity to demo products/services to attendees',
      'Certificate recognizing the partnership',
    ],
  },
  {
    category: 'Media Partner',
    offerings: [
      'Official media partner credit across campaign materials',
      'Access to summit highlights for coverage and amplification',
      'Cross-promotion on official social channels',
      'Certificate recognizing the partnership',
    ],
  },
];
