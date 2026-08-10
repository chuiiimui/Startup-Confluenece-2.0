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
