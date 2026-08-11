import { TeamMember } from '../types';
import { assetSrc } from '../lib/utils';
import sanjayImage from '../assets/organizers/Dr. Sanjay Srivastava.jpeg';
import amitabhImage from '../assets/organizers/Mr. Amitabh Srivastava.jpeg';
import gargiImage from '../assets/organizers/Ms. Gargi Agrawal.jpeg';
import shiveshImage from '../assets/organizers/Shivesh Gaur.jpeg';

export const organizers: TeamMember[] = [
  {
    id: 'org-1',
    name: 'Prof. Sanjay Srivastava',
    role: 'Senior Technical Advisor UIH',
    image: assetSrc(sanjayImage),
  },
  {
    id: 'org-2',
    name: 'Shivesh Gaur',
    role: 'CEO UIH',
    image: assetSrc(shiveshImage),
  },
  {
    id: 'org-3',
    name: 'Amitabh Srivastava',
    role: 'Senior Alumni and Head Entrepreneurship & Innovation UIH',
    image: assetSrc(amitabhImage),
  },
  {
    id: 'org-4',
    name: 'Ms. Gargi Agarwal',
    role: 'Manager UIH',
    image: assetSrc(gargiImage),
  },
];
