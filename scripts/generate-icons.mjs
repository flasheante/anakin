// Generates the favicon set from the band logo (run `npm run logo` first) and
// the pixel-art cursors from the bitmaps below. Run with `npm run icons`.
import { rmSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const LOGO = "src/assets/source/logo-square.png";
const INK = { r: 11, g: 11, b: 10, alpha: 1 };

const PALETTE = {
  K: [11, 11, 10], // ink
  R: [255, 59, 46], // blood
  G: [168, 255, 26], // acid
};

// Cursors: "." = transparent, F = fill color.
const ARROW = [
  "K...........",
  "KK..........",
  "KFK.........",
  "KFFK........",
  "KFFFK.......",
  "KFFFFK......",
  "KFFFFFK.....",
  "KFFFFFFK....",
  "KFFFFFFFK...",
  "KFFFFFFFFK..",
  "KFFFFFKKKKK.",
  "KFFKFFK.....",
  "KFK.KFFK....",
  "KK..KFFK....",
  "K....KFFK...",
  ".....KKK....",
];

const withFill = (rows, fill) => rows.map((r) => r.replaceAll("F", fill));

function toSvg(rows) {
  const h = rows.length;
  const w = rows[0].length;
  const rects = [];
  rows.forEach((row, y) => {
    // Merge horizontal runs of the same color to keep the file small.
    let x = 0;
    while (x < w) {
      const c = row[x];
      let run = 1;
      while (x + run < w && row[x + run] === c) run++;
      if (c !== ".") {
        const [r, g, b] = PALETTE[c];
        rects.push(`<rect x="${x}" y="${y}" width="${run}" height="1" fill="rgb(${r},${g},${b})"/>`);
      }
      x += run;
    }
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w * 2}" height="${h * 2}" shape-rendering="crispEdges">${rects.join("")}</svg>\n`;
}

// ICO container with PNG-compressed entries.
function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, png }) => {
    const e = Buffer.alloc(16);
    e[0] = size >= 256 ? 0 : size;
    e[1] = size >= 256 ? 0 : size;
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.png)]);
}

// Transparent square icon; the sticker's white outline keeps it visible on light and dark tabs.
const icon = (size) => sharp(LOGO).resize(size, size).png().toBuffer();

// Opaque icon on ink with some breathing room (iOS home screen).
async function paddedIcon(size, pad) {
  const inner = await sharp(LOGO).resize(size - pad * 2, size - pad * 2).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: INK } })
    .composite([{ input: inner, top: pad, left: pad }])
    .png()
    .toBuffer();
}

writeFileSync(
  "src/app/favicon.ico",
  toIco(await Promise.all([16, 32, 48].map(async (size) => ({ size, png: await icon(size) })))),
);
writeFileSync("src/app/icon.png", await icon(192));
const apple = await paddedIcon(180, 14);
writeFileSync("src/app/apple-icon.png", apple);
writeFileSync("public/apple-touch-icon.png", apple);
rmSync("src/app/icon.svg", { force: true }); // old pixel "A" favicon

writeFileSync("public/icons/cursor.svg", toSvg(withFill(ARROW, "G")));
writeFileSync("public/icons/cursor-hand.svg", toSvg(withFill(ARROW, "R")));
console.log("icons written");
