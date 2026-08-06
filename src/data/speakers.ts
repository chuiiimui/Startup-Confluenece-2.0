import { Speaker } from '../types';

export const speakers: Speaker[] = Array.from({ length: 4 }).map((_, index) => ({
  id: `speaker-${index + 1}`,
  name: 'To Be Revealed',
  role: 'Industry Leader',
  company: 'Top Tier Tech',
  image: '',
  bio: 'A visionary leader joining us to share insights and transform the startup ecosystem.'
}));
