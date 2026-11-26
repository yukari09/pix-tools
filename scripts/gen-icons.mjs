import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = path.join(root, 'public', 'favicon.svg');
const svg = await readFile(svgPath, 'utf8');

// Render the vector at the exact target size (no bitmap upscaling).
const render = async (size) => {
  const sized = svg.replace('<svg ', `<svg width="${size}" height="${size}" `);
  return sharp(Buffer.from(sized)).png({ compressionLevel: 9 }).toBuffer();
};

const pngTargets = {
  'apple-touch-icon-180.png': 180,
  'icon-192.png': 192,
  'icon-512.png': 512,
};
const buffers = new Map();
for (const size of [16, 32, 48, 180, 192, 512]) {
  buffers.set(size, await render(size));
}
for (const [name, size] of Object.entries(pngTargets)) {
  await writeFile(path.join(root, 'public', name), buffers.get(size));
}

// A real multi-size ICO: one directory with 16, 32 and 48 PNG-compressed entries.
const icoSizes = [16, 32, 48];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoSizes.length, 4);
const entries = [];
let offset = 6 + 16 * icoSizes.length;
for (const size of icoSizes) {
  const data = buffers.get(size);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(data.length, 8);
  entry.writeUInt32LE(offset, 12);
  entries.push(entry);
  offset += data.length;
}
const ico = Buffer.concat([header, ...entries, ...icoSizes.map((size) => buffers.get(size))]);
await writeFile(path.join(root, 'public', 'favicon.ico'), ico);

const manifest = {
  name: 'PixTools 图片工具箱',
  short_name: 'PixTools',
  start_url: '/',
  display: 'standalone',
  background_color: '#F6F7F5',
  theme_color: '#121417',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
  ],
};
await writeFile(path.join(root, 'public', 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);

console.log('icons written:', [...Object.keys(pngTargets), 'favicon.ico', 'site.webmanifest'].join(', '));
console.log('ico entries:', icoSizes.join(', '));
