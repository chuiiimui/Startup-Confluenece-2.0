import { TeamMember } from '../types';
import sanjayImage from '../assets/organizers/Dr. Sanjay Srivastava.jpeg';
import amitabhImage from '../assets/organizers/Mr. Amitabh Srivastava.jpeg';
import gargiImage from '../assets/organizers/Ms. Gargi Agrawal.jpeg';
import shiveshImage from '../assets/organizers/Shivesh Gaur.jpeg';

export const organizers: TeamMember[] = [
  {
    id: 'org-1',
    name: 'Dr. Sanjay Srivastava',
    role: 'Organizer',
    image: sanjayImage,
  },
  {
    id: 'org-2',
    name: 'Mr. Amitabh Srivastava',
    role: 'Organizer',
    image: amitabhImage,
  },
  {
    id: 'org-3',
    name: 'Ms. Gargi Agrawal',
    role: 'Organizer',
    image: gargiImage,
  },
  {
    id: 'org-4',
    name: 'Shivesh Gaur',
    role: 'Organizer',
    image: shiveshImage,
  },
];
