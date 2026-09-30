// Cuts the white background (and the grey sticker shadow) out of the logo JPEG,
// keeping the sticker's own white outline. Run: `npm run logo`.
// Source stays untouched in src/assets/source/; outputs go to public/images/.
import sharp from "sharp";

const SRC = "src/assets/source/logo-original.jpg";
const BG = 252; // brighter than this = paper background (or the white outline)

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: ch } = info;
const lum = new Uint8Array(w * h);
for (let i = 0; i < w * h; i++) lum[i] = Math.min(data[i * ch], data[i * ch + 1], data[i * ch + 2]);

const outside = new Uint8Array(w * h);
const queue = [];
const push = (i) => {
  if (!outside[i]) {
    outside[i] = 1;
    queue.push(i);
  }
};
const flood = (canEnter) => {
  while (queue.length) {
    const i = queue.pop();
    const x = i % w;
    const y = (i - x) / w;
    for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const n = ny * w + nx;
      if (!outside[n] && canEnter(lum[n])) push(n);
    }
  }
};

// 1) Background: bright pixels connected to the image border.
for (let x = 0; x < w; x++) {
  if (lum[x] > BG) push(x);
  if (lum[(h - 1) * w + x] > BG) push((h - 1) * w + x);
}
for (let y = 0; y < h; y++) {
  if (lum[y * w] > BG) push(y * w);
  if (lum[y * w + w - 1] > BG) push(y * w + w - 1);
}
flood((v) => v > BG);

// 2) Shadow ring: from the background, walk through the grey pixels; the white
//    outline (> BG) stops the walk, so the sheep itself is never reached.
for (let i = 0; i < w * h; i++) if (outside[i]) queue.push(i);
flood((v) => v <= BG);

const rgba = Buffer.alloc(w * h * 4);
for (let i = 0; i < w * h; i++) {
  rgba[i * 4] = data[i * ch];
  rgba[i * 4 + 1] = data[i * ch + 1];
  rgba[i * 4 + 2] = data[i * ch + 2];
  rgba[i * 4 + 3] = outside[i] ? 0 : 255;
}

const cut = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
const trimmed = await sharp(cut).trim().png().toBuffer();

await sharp(trimmed).resize({ width: 800 }).png({ compressionLevel: 9 }).toFile("public/images/logo.png");
// Square, padded master for icons.
await sharp(trimmed)
  .resize(1024, 1024, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile("src/assets/source/logo-square.png");

const meta = await sharp("public/images/logo.png").metadata();
console.log(`logo: ${meta.width}x${meta.height}`);
