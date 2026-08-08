import { TeamMember } from '../types';
import prakharImage from '../assets/team/prakhar-pandey.jpg';
import harshImage from '../assets/team/harsh-srivastava.png';
import ayushImage from '../assets/team/ayush-yadav.png';
import shanuImage from '../assets/team/shanu-srivastava.png';
import yasirImage from '../assets/team/mohammad-yasir-siddiqui.png';
import adarshImage from '../assets/team/adarsh srivastava.jpeg';

export const teamMembers: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Prakhar Pandey',
    role: 'Team Leader, Organizer',
    image: prakharImage
  },
  {
    id: 'tm-2',
    name: 'Shanu Srivastava',
    role: 'Organizer',
    image: shanuImage
  },
  {
    id: 'tm-3',
    name: 'Harsh Srivastava',
    role: 'Design Lead, Tech Lead',
    image: harshImage
  },
  {
    id: 'tm-4',
    name: 'Ayush Yadav',
    role: 'Tech Lead',
    image: ayushImage
  },
  {
    id: 'tm-5',
    name: 'Mohammad Yasir Siddiqui',
    role: 'Media / PR Lead',
    image: yasirImage
  },
  {
    id: 'tm-6',
    name: 'Adarsh Srivastava',
    role: 'Organizer',
    image: adarshImage
  }
];
