export type GuidelineRole = 'startup' | 'ideaPitch' | 'speaker' | 'delegate';

export interface RoleGuideline {
  type: GuidelineRole;
  title: string;
  subtitle: string;
  summary: string;
  guidelines: string[];
  checklist: string[];
}

export const REGISTRATION_GUIDELINES: RoleGuideline[] = [
  {
    type: 'startup',
    title: 'Startup',
    subtitle: 'Register your venture',
    summary:
      'Showcase your product, meet investors, and apply for expo stalls or the pitching arena at Startup Confluence 2.0.',
    guidelines: [
      'Open to early-stage and growth-stage startups with a clear problem–solution fit.',
      'Provide accurate founder contact details — confirmation and shortlist updates are sent by email.',
      'If you want to pitch, prepare a concise pitch deck (PDF/PPT, max ~3.5 MB) before submitting.',
      'Expo stall requests are limited; mention your requirement clearly during registration.',
      'Accommodation support for out-station teams is available on request at a nominal fee.',
      'Selected startups may be contacted for additional documents or a screening call.',
    ],
    checklist: [
      'Startup name, stage, industry, and short description',
      'Company name, registration number, DPIIT number',
      'Founder name, email, phone, and LinkedIn',
      'Team size and website (if available)',
      'Stall / accommodation preferences',
      'Pitch interest + pitch deck (optional but recommended)',
    ],
  },
  {
    type: 'ideaPitch',
    title: 'Idea Pitching',
    subtitle: 'For budding entrepreneurs',
    summary:
      'Have a brilliant idea but haven\'t incorporated yet? Register to pitch your concept, get feedback from mentors, and connect with potential co-founders and investors.',
    guidelines: [
      'Open to individuals or teams at the idea or early concept stage — no company registration required.',
      'Prepare a clear description of the problem you\'re solving and your proposed solution.',
      'If you want to pitch, a concise pitch deck (PDF/PPT, max ~3.5 MB) is recommended.',
      'Expo stall bookings are available on a first-come, first-served basis.',
      'Accommodation support for out-station participants is available on request.',
      'Shortlisted pitchers may be contacted for a brief screening call before the event.',
    ],
    checklist: [
      'Idea / startup name, stage, and industry',
      'Founder name, email, phone, and LinkedIn',
      'Team size and website (if available)',
      'Short description of your idea (max 500 characters)',
      'Stall / accommodation preferences',
      'Pitch deck (optional but recommended)',
    ],
  },
  {
    type: 'delegate',
    title: 'Visitor / Delegate',
    subtitle: 'Attend as a guest',
    summary:
      'Join keynotes, workshops, the startup expo, investor meetups, and ceremony sessions as a registered delegate.',
    guidelines: [
      'Registration is free for delegates; carry a valid photo ID for check-in on both days.',
      'Select the sessions you plan to attend so we can plan seating and access.',
      'Entry is subject to capacity for high-demand sessions — arrive early for preferred seats.',
      'Networking is encouraged; respect speakers, founders, and venue protocols.',
      'Confirmation email includes your selected events and check-in guidance — check Inbox and Spam.',
    ],
    checklist: [
      'Full name and active email / phone',
      'Valid ID details for on-site verification',
      'Preferred event sessions (or Full Event)',
    ],
  },
  {
    type: 'speaker',
    title: 'Speaker',
    subtitle: 'Share your expertise',
    summary:
      'Propose a talk or session that helps founders with idea building, product, IP, marketing, or related themes.',
    guidelines: [
      'Share a clear bio, designation, organization, and area of expertise.',
      'Propose a focused topic aligned with the summit themes (or suggest a custom topic).',
      'Previous speaking experience helps curation but is not mandatory.',
      'Selected speakers will receive session timing, AV needs checklist, and venue brief by email.',
      'Keep contact details current — the program team may follow up for confirmation.',
    ],
    checklist: [
      'Full name, organization, and designation',
      'Email, phone, and LinkedIn / website',
      'Speaker bio and expertise',
      'Topic proposal / preferred theme',
      'Previous speaking experience (if any)',
    ],
  },
];
