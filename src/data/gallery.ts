import { GalleryImage } from '../types';
import { assetSrc, type AssetSrc } from '../lib/utils';

import full0 from '../assets/gallery/DSC_7889.jpg';
import full1 from '../assets/gallery/DSC_7976.jpg';
import full2 from '../assets/gallery/DSC_7999.jpg';
import full3 from '../assets/gallery/DSC_8169.jpg';
import full4 from '../assets/gallery/UBD_0266.jpg';
import full5 from '../assets/gallery/UBD_0281.jpg';
import full6 from '../assets/gallery/UBD_0313.jpg';
import full7 from '../assets/gallery/UBD_0355.jpg';
import full8 from '../assets/gallery/UBD_0415.jpg';
import full9 from '../assets/gallery/UBD_0424.jpg';
import full10 from '../assets/gallery/UBD_0448.jpg';
import full11 from '../assets/gallery/UBD_0457.jpg';
import full12 from '../assets/gallery/whatsapp-1.jpg';
import full13 from '../assets/gallery/whatsapp-2.jpg';
import full14 from '../assets/gallery/whatsapp-3.jpg';

import thumb0 from '../assets/gallery/thumbs/DSC_7889.webp';
import thumb1 from '../assets/gallery/thumbs/DSC_7976.webp';
import thumb2 from '../assets/gallery/thumbs/DSC_7999.webp';
import thumb3 from '../assets/gallery/thumbs/DSC_8169.webp';
import thumb4 from '../assets/gallery/thumbs/UBD_0266.webp';
import thumb5 from '../assets/gallery/thumbs/UBD_0281.webp';
import thumb6 from '../assets/gallery/thumbs/UBD_0313.webp';
import thumb7 from '../assets/gallery/thumbs/UBD_0355.webp';
import thumb8 from '../assets/gallery/thumbs/UBD_0415.webp';
import thumb9 from '../assets/gallery/thumbs/UBD_0424.webp';
import thumb10 from '../assets/gallery/thumbs/UBD_0448.webp';
import thumb11 from '../assets/gallery/thumbs/UBD_0457.webp';
import thumb12 from '../assets/gallery/thumbs/whatsapp-1.webp';
import thumb13 from '../assets/gallery/thumbs/whatsapp-2.webp';
import thumb14 from '../assets/gallery/thumbs/whatsapp-3.webp';

import preview0 from '../assets/gallery/medium/DSC_7889.webp';
import preview1 from '../assets/gallery/medium/DSC_7976.webp';
import preview2 from '../assets/gallery/medium/DSC_7999.webp';
import preview3 from '../assets/gallery/medium/DSC_8169.webp';
import preview4 from '../assets/gallery/medium/UBD_0266.webp';
import preview5 from '../assets/gallery/medium/UBD_0281.webp';
import preview6 from '../assets/gallery/medium/UBD_0313.webp';
import preview7 from '../assets/gallery/medium/UBD_0355.webp';
import preview8 from '../assets/gallery/medium/UBD_0415.webp';
import preview9 from '../assets/gallery/medium/UBD_0424.webp';
import preview10 from '../assets/gallery/medium/UBD_0448.webp';
import preview11 from '../assets/gallery/medium/UBD_0457.webp';
import preview12 from '../assets/gallery/medium/whatsapp-1.webp';
import preview13 from '../assets/gallery/medium/whatsapp-2.webp';
import preview14 from '../assets/gallery/medium/whatsapp-3.webp';

function entry(
  id: string,
  src: AssetSrc,
  thumb: AssetSrc,
  preview: AssetSrc,
  category: GalleryImage['category'],
  n: number
): GalleryImage {
  const title = `Event Moment ${n}`;
  return {
    id,
    src: assetSrc(src),
    thumb: assetSrc(thumb),
    preview: assetSrc(preview),
    category,
    title,
    alt: title,
  };
}

export const gallery: GalleryImage[] = [
  entry('gal-12', full12, thumb12, preview12, 'expo', 12),
  entry('gal-13', full13, thumb13, preview13, 'workshops', 13),
  entry('gal-14', full14, thumb14, preview14, 'speakers', 14),
  entry('gal-0', full0, thumb0, preview0, 'expo', 0),
  entry('gal-1', full1, thumb1, preview1, 'workshops', 1),
  entry('gal-2', full2, thumb2, preview2, 'speakers', 2),
  entry('gal-3', full3, thumb3, preview3, 'audience', 3),
  entry('gal-4', full4, thumb4, preview4, 'expo', 4),
  entry('gal-5', full5, thumb5, preview5, 'workshops', 5),
  entry('gal-6', full6, thumb6, preview6, 'speakers', 6),
  entry('gal-7', full7, thumb7, preview7, 'audience', 7),
  entry('gal-8', full8, thumb8, preview8, 'expo', 8),
  entry('gal-9', full9, thumb9, preview9, 'workshops', 9),
  entry('gal-10', full10, thumb10, preview10, 'speakers', 10),
  entry('gal-11', full11, thumb11, preview11, 'audience', 11),
];
