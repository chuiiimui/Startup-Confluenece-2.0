import fs from 'fs';
import path from 'path';

const dir = 'd:/Startup Confluence 2.0/src/assets/Previous image Gallery';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.JPG') || f.endsWith('.png'));

const categories = ['expo', 'workshops', 'speakers', 'audience'];

let output = `import { GalleryImage } from '../types';\n\n`;

files.forEach((file, i) => {
  output += `import img${i} from '../assets/Previous image Gallery/${file}';\n`;
});

output += `\nexport const gallery: GalleryImage[] = [\n`;

files.forEach((file, i) => {
  const cat = categories[i % categories.length];
  output += `  {
    id: 'gal-${i+1}',
    src: img${i},
    title: 'Event Moment ${i+1}',
    category: '${cat}',
    alt: 'Event Moment ${i+1}'
  },\n`;
});

output += `];\n`;

fs.writeFileSync('d:/Startup Confluence 2.0/src/data/gallery.ts', output);
console.log('Done generating gallery.ts');
