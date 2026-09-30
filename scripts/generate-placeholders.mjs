// Writes placeholder "photos" so the layout works before real pictures exist.
// Replace them with real files in public/images/photos/ and update src/data/photos.ts.
import { writeFileSync } from "node:fs";

const shapes = [
  // silhouettes of a stage: mic stand, amp stack, figures
  (w, h) => `<rect x="${w * 0.1}" y="${h * 0.55}" width="${w * 0.18}" height="${h * 0.45}" fill="#222"/><rect x="${w * 0.72}" y="${h * 0.5}" width="${w * 0.2}" height="${h * 0.5}" fill="#1b1b1b"/><circle cx="${w * 0.5}" cy="${h * 0.35}" r="${h * 0.09}" fill="#303030"/><rect x="${w * 0.42}" y="${h * 0.44}" width="${w * 0.16}" height="${h * 0.56}" fill="#2a2a2a"/>`,
  (w, h) => `<circle cx="${w * 0.3}" cy="${h * 0.4}" r="${h * 0.12}" fill="#2d2d2d"/><rect x="${w * 0.2}" y="${h * 0.52}" width="${w * 0.2}" height="${h * 0.48}" fill="#262626"/><circle cx="${w * 0.68}" cy="${h * 0.45}" r="${h * 0.1}" fill="#252525"/><rect x="${w * 0.58}" y="${h * 0.55}" width="${w * 0.2}" height="${h * 0.45}" fill="#202020"/>`,
  (w, h) => `<rect x="${w * 0.15}" y="${h * 0.15}" width="${w * 0.7}" height="${h * 0.7}" fill="none" stroke="#3a3a3a" stroke-width="${w * 0.02}"/><path d="M${w * 0.15} ${h * 0.85} L${w * 0.5} ${h * 0.35} L${w * 0.85} ${h * 0.85}" fill="#2a2a2a"/>`,
];

function placeholder(w, h, label, variant) {
  const spot = `<radialGradient id="s" cx="50%" cy="20%" r="70%"><stop offset="0" stop-color="#5a5a5a"/><stop offset="1" stop-color="#0d0d0d"/></radialGradient>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs>${spot}<filter id="g"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .35 0"/></filter></defs>
<rect width="100%" height="100%" fill="url(#s)"/>
${shapes[variant % shapes.length](w, h)}
<rect width="100%" height="100%" filter="url(#g)"/>
<text x="${w * 0.05}" y="${h * 0.1}" font-family="Courier New, monospace" font-size="${Math.round(w * 0.035)}" fill="#bdb8aa">${label}</text>
<text x="${w * 0.05}" y="${h * 0.95}" font-family="Courier New, monospace" font-size="${Math.round(w * 0.028)}" fill="#8a867b">FOTO PROVISORIA // REEMPLAZAR</text>
</svg>
`;
}

const sizes = [
  [1200, 800], [800, 1000], [1000, 1000], [1200, 800],
  [800, 1000], [1200, 800], [1000, 1000], [800, 1000],
];
sizes.forEach(([w, h], i) => {
  const n = String(i + 1).padStart(2, "0");
  writeFileSync(`public/images/photos/placeholder-${n}.svg`, placeholder(w, h, `IMG_${n}.JPG`, i));
});
writeFileSync("public/images/photos/band-placeholder.svg", placeholder(1200, 800, "ANAKIN_PROMO.JPG", 1));
console.log("placeholders written");
