import { TeamMember } from '../types';
import { assetSrc } from '../lib/utils';
import sanjayImage from '../assets/organizers/Dr. Sanjay Srivastava.jpeg';
import amitabhImage from '../assets/organizers/Mr. Amitabh Srivastava.jpeg';
import gargiImage from '../assets/organizers/Ms. Gargi Agrawal.jpeg';
import shiveshImage from '../assets/organizers/Shivesh Gaur.jpeg';

export const organizers: TeamMember[] = [
  {
    id: 'org-1',
    name: 'Dr. Sanjay Srivastava',
    role: 'Organizer',
    image: assetSrc(sanjayImage),
  },
  {
    id: 'org-2',
    name: 'Shivesh Gaur',
    role: 'Organizer',
    image: assetSrc(shiveshImage),
  },
  {
    id: 'org-3',
    name: 'Mr. Amitabh Srivastava',
    role: 'Organizer',
    image: assetSrc(amitabhImage),
  },
  {
    id: 'org-4',
    name: 'Ms. Gargi Agrawal',
    role: 'Organizer',
    image: assetSrc(gargiImage),
  },
];
