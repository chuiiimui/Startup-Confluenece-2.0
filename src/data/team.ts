import { TeamMember } from '../types';
import { assetSrc } from '../lib/utils';
import prakharImage from '../assets/team/prakhar-pandey.jpg';
import harshImage from '../assets/team/harsh-srivastava.png';
import ayushImage from '../assets/team/ayush-yadav.png';
import shanuImage from '../assets/team/shanu-srivastava.png';
import yasirImage from '../assets/team/mohammad-yasir-siddiqui.png';
import adarshImage from '../assets/team/adarsh srivastava.jpeg';
import piyushImage from '../assets/team/piyush-verma.png';
import sakshiImage from '../assets/team/sakshi-pandey.png';
import arohiImage from '../assets/team/arohi-singh.png';
import shikshaImage from '../assets/team/shiksha.jpg';
import vinayakImage from '../assets/team/vinayak-srivastava.jpg';
import hemantImage from '../assets/team/hemant.jpg';
import anshImage from '../assets/team/ansh-kumar.jpg';

/** Core organizing team shown by default. */
export const teamMembers: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Prakhar Pandey',
    role: 'Team Leader, Organizer',
    image: assetSrc(prakharImage),
  },
  {
    id: 'tm-2',
    name: 'Shanu Srivastava',
    role: 'Organizer',
    image: assetSrc(shanuImage),
  },
  {
    id: 'tm-3',
    name: 'Harsh Srivastava',
    role: 'Design Lead, Tech Lead',
    image: assetSrc(harshImage),
  },
  {
    id: 'tm-4',
    name: 'Ayush Yadav',
    role: 'Tech Lead',
    image: assetSrc(ayushImage),
  },
  {
    id: 'tm-5',
    name: 'Mohammad Yasir Siddiqui',
    role: 'Content / Media Lead',
    image: assetSrc(yasirImage),
  },
  {
    id: 'tm-6',
    name: 'Adarsh Srivastava',
    role: 'Logistics Manager',
    image: assetSrc(adarshImage),
  },
  {
    id: 'tm-7',
    name: 'Piyush Verma',
    role: 'Media Expert',
    image: assetSrc(piyushImage),
  },
  {
    id: 'tm-8',
    name: 'Sakshi Pandey',
    role: 'Public Relations Lead',
    image: assetSrc(sakshiImage),
  },
  {
    id: 'tm-9',
    name: 'Arohi Singh',
    role: 'Tech Expert',
    image: assetSrc(arohiImage),
  },
];

/** Extended team revealed via View More. */
export const extendedTeamMembers: TeamMember[] = [
  {
    id: 'tm-ext-5',
    name: 'Hemant',
    role: 'Editor Team',
    image: assetSrc(hemantImage),
  },
  {
    id: 'tm-ext-1',
    name: 'Shiksha',
    role: 'Design Team',
    image: assetSrc(shikshaImage),
  },
  {
    id: 'tm-ext-2',
    name: 'Aditya Rai',
    role: 'Design Team',
    image: '',
  },
  {
    id: 'tm-ext-3',
    name: 'Vinayak Srivastava',
    role: 'Content Team',
    image: assetSrc(vinayakImage),
  },
  {
    id: 'tm-ext-4',
    name: 'Vanshika Dayal',
    role: 'Content Team',
    image: '',
  },
  {
    id: 'tm-ext-6',
    name: 'Ansh Kumar',
    role: 'Camera Team',
    image: assetSrc(anshImage),
  },
];
