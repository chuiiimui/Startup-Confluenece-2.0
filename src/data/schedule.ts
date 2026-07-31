import { ScheduleDay } from '../types';

export const schedule: ScheduleDay[] = [
  {
    id: 'day-1',
    date: '23 Oct 2026',
    title: 'Day 1: Innovation & Expo',
    events: [
      {
        id: 'evt-1',
        time: '9:00 AM',
        title: 'Registration',
        description: 'Check-in, collect your badges, and grab some coffee.',
        type: 'networking'
      },
      {
        id: 'evt-2',
        time: '10:00 AM',
        title: 'Inauguration Ceremony',
        description: 'Lighting of the lamp and welcome address by the organizers.',
        type: 'keynote'
      },
      {
        id: 'evt-3',
        time: '11:00 AM',
        title: 'Keynote: Future of Startups in India',
        description: 'Insights into the evolving landscape of Indian startups.',
        type: 'keynote',
        speaker: 'Rajiv Mehta'
      },
      {
        id: 'evt-4',
        time: '1:00 PM',
        title: 'Lunch & Networking',
        description: 'Connect with peers and industry experts over lunch.',
        type: 'networking'
      },
      {
        id: 'evt-5',
        time: '2:00 PM',
        title: 'Workshop: Building Scalable Products',
        description: 'Learn the architectural principles for scalable startup products.',
        type: 'workshop',
        speaker: 'Arun Krishnan'
      },
      {
        id: 'evt-6',
        time: '4:00 PM',
        title: 'Startup Expo Opening',
        description: 'Explore the latest innovations and products from emerging startups.',
        type: 'other'
      },
      {
        id: 'evt-7',
        time: '5:00 PM',
        title: 'Pitching Session Round 1',
        description: 'Shortlisted startups pitch their ideas to a panel of investors.',
        type: 'other'
      }
    ]
  },
  {
    id: 'day-2',
    date: '24 Oct 2026',
    title: 'Day 2: Funding & Awards',
    events: [
      {
        id: 'evt-8',
        time: '9:00 AM',
        title: 'Morning Networking',
        description: 'Start the day by building new connections.',
        type: 'networking'
      },
      {
        id: 'evt-9',
        time: '10:00 AM',
        title: 'Panel: Funding Landscape 2026',
        description: 'A deep dive into current investment trends and VC perspectives.',
        type: 'keynote',
        speaker: 'Priya Sharma, Vikram Singh'
      },
      {
        id: 'evt-10',
        time: '11:00 AM',
        title: 'Workshop: AI for Startups',
        description: 'Practical applications of AI to accelerate your startup growth.',
        type: 'workshop'
      },
      {
        id: 'evt-11',
        time: '1:00 PM',
        title: 'Lunch Break',
        description: 'Relax and network before the final sessions.',
        type: 'networking'
      },
      {
        id: 'evt-12',
        time: '2:00 PM',
        title: 'Pitching Session Finals',
        description: 'The top finalists battle it out for the grand prize.',
        type: 'other'
      },
      {
        id: 'evt-13',
        time: '3:30 PM',
        title: 'Investor Meetup',
        description: 'Exclusive 1-on-1 sessions between founders and investors.',
        type: 'networking'
      },
      {
        id: 'evt-14',
        time: '5:00 PM',
        title: 'Closing Ceremony & Awards',
        description: 'Winner announcements, awards distribution, and closing remarks.',
        type: 'other'
      }
    ]
  }
];
