/**
 * One-shot / CI helper: regenerate gallery thumbs + medium WebPs.
 * Usage: node scripts/optimize-gallery.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'src/assets/gallery');

async function writeSet(subdir, width, quality, cover) {
  const outDir = path.join(srcDir, subdir);
  fs.mkdirSync(outDir, { recursive: true });
  const files = fs.readdirSync(srcDir).filter((f) => /\.(jpe?g|png)$/i.test(f));
  for (const file of files) {
    const input = path.join(srcDir, file);
    const base = path.parse(file).name;
    const out = path.join(outDir, `${base}.webp`);
    let pipeline = sharp(input).rotate();
    pipeline = cover
      ? pipeline.resize({
          width,
          height: Math.round(width * 0.75),
          fit: 'cover',
          withoutEnlargement: true,
        })
      : pipeline.resize({ width, withoutEnlargement: true });
    await pipeline.webp({ quality, effort: 4 }).toFile(out);
    console.log(subdir, path.basename(out), Math.round(fs.statSync(out).size / 1024) + 'KB');
  }
}

await writeSet('thumbs', 720, 62, true);
await writeSet('medium', 1400, 70, false);
console.log('gallery optimize done');
