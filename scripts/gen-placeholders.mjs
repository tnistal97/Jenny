// Genera placeholders editoriales (SVG) que muestran el OFICIO de maquilladora:
// brochas, paletas, ojos, labios, preparación de piel, espejo, novia, backstage,
// antes/después y resultado final. Texturas premium (gradiente nude/blush + luz + grano)
// con un motivo de line-art y una etiqueta de escena.
//
// Pensados para reemplazarse por fotos reales (desde /admin o dejando .jpg con el mismo nombre).
// Uso: node scripts/gen-placeholders.mjs
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'images');

const palettes = {
  warmNude: { from: '#f3e8db', via: '#e7cdb8', to: '#d6b39a', light: '#fcf4ea', shadow: '#b9967c', accent: '#a47c63' },
  blushRose: { from: '#f7e8e3', via: '#eccabf', to: '#d8a89d', light: '#fdefe9', shadow: '#c08a7f', accent: '#a86b60' },
  softBeige: { from: '#f8f2e9', via: '#eaddca', to: '#d7c5ad', light: '#fdf8ef', shadow: '#b6a486', accent: '#8c7355' },
  skinGlow: { from: '#f5e5d7', via: '#e9c6ab', to: '#d6a585', light: '#fdf0e3', shadow: '#b9876a', accent: '#9c6f4f' },
  moody: { from: '#262019', via: '#3c3128', to: '#5c4334', light: '#caa183', shadow: '#15110d', accent: '#e3c3a6' },
  porcelain: { from: '#f9f5f0', via: '#efe6db', to: '#e0d3c2', light: '#fffaf3', shadow: '#bdac96', accent: '#8d7a62' },
};

/* ── Motivos de line-art (centrados ~450,540 en lienzo 900x1180) ─────── */
const stroke = (c, w = 9, extra = '') =>
  `stroke="${c}" fill="none" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}`;

const motifs = {
  brushes: (c) => `
    <g ${stroke(c)} opacity="0.34">
      ${[-22, 0, 22]
        .map((a, i) => {
          const x = 450 + (i - 1) * 70;
          return `<g transform="rotate(${a} ${x} 540)">
            <line x1="${x}" y1="360" x2="${x}" y2="600"/>
            <path d="M${x - 26} 600 q26 130 0 180 q-26 -50 0 -180" fill="${c}" fill-opacity="0.12"/>
            <line x1="${x - 26}" y1="600" x2="${x + 26}" y2="600"/>
          </g>`;
        })
        .join('')}
    </g>`,
  palette: (c) => `
    <g ${stroke(c, 8)} opacity="0.34">
      <rect x="270" y="430" width="360" height="220" rx="26"/>
      ${[0, 1, 2, 3]
        .map((col) =>
          [0, 1]
            .map((row) => `<circle cx="${320 + col * 87}" cy="${495 + row * 90}" r="30" fill="${c}" fill-opacity="0.12"/>`)
            .join(''),
        )
        .join('')}
    </g>`,
  eye: (c) => `
    <g ${stroke(c)} opacity="0.34">
      <path d="M250 540 Q450 410 650 540 Q450 660 250 540 Z"/>
      <circle cx="450" cy="540" r="58" fill="${c}" fill-opacity="0.12"/>
      ${[290, 350, 410, 470, 530, 590, 610]
        .map((x, i) => `<line x1="${x}" y1="${500 - (i % 2) * 6}" x2="${x - 8}" y2="${455 - (i % 2) * 8}"/>`)
        .join('')}
    </g>`,
  lips: (c) => `
    <g ${stroke(c)} opacity="0.36">
      <path d="M300 540 Q380 492 450 522 Q520 492 600 540 Q520 612 450 600 Q380 612 300 540 Z" fill="${c}" fill-opacity="0.12"/>
      <path d="M300 540 Q450 560 600 540"/>
    </g>`,
  mirror: (c) => `
    <g ${stroke(c, 8)} opacity="0.34">
      <ellipse cx="450" cy="500" rx="150" ry="195"/>
      <line x1="450" y1="695" x2="450" y2="770"/>
      <path d="M380 800 Q450 760 520 800"/>
      ${Array.from({ length: 16 })
        .map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return `<circle cx="${(450 + Math.cos(a) * 178).toFixed(0)}" cy="${(500 + Math.sin(a) * 223).toFixed(0)}" r="6" fill="${c}" fill-opacity="0.3" stroke="none"/>`;
        })
        .join('')}
    </g>`,
  droplet: (c) => `
    <g ${stroke(c)} opacity="0.34">
      <path d="M450 380 C 350 520, 372 632, 450 660 C 528 632, 550 520, 450 380 Z" fill="${c}" fill-opacity="0.1"/>
      <path d="M425 560 q25 40 60 18"/>
      <g transform="translate(600 430)"><path d="M0 -34 L9 -9 L34 0 L9 9 L0 34 L-9 9 L-34 0 L-9 -9 Z" fill="${c}" fill-opacity="0.4" stroke="none"/></g>
    </g>`,
  glow: (c) => `
    <g ${stroke(c)} opacity="0.34">
      <path d="M540 330 C 470 380, 500 470, 470 520 C 440 575, 470 640, 430 700 C 405 740, 470 790, 540 800"/>
      <g transform="translate(360 430)"><path d="M0 -40 C6 -12 12 -6 40 0 C12 6 6 12 0 40 C-6 12 -12 6 -40 0 C-12 -6 -6 -12 0 -40 Z" fill="${c}" fill-opacity="0.45" stroke="none"/></g>
      <g transform="translate(300 620)"><path d="M0 -20 C3 -6 6 -3 20 0 C6 3 3 6 0 20 C-3 6 -6 3 -20 0 C-6 -3 -3 -6 0 -20 Z" fill="${c}" fill-opacity="0.4" stroke="none"/></g>
    </g>`,
  bride: (c) => `
    <g ${stroke(c, 8)} opacity="0.32">
      <ellipse cx="450" cy="500" rx="118" ry="150"/>
      <path d="M340 420 Q450 300 560 420"/>
      <path d="M338 430 C 250 560, 280 760, 360 860"/>
      <path d="M562 430 C 650 560, 620 760, 540 860"/>
      <g transform="translate(450 360)"><circle r="14" fill="${c}" fill-opacity="0.25"/>${[0, 72, 144, 216, 288].map((a) => `<circle cx="${(Math.cos((a * Math.PI) / 180) * 26).toFixed(0)}" cy="${(Math.sin((a * Math.PI) / 180) * 26).toFixed(0)}" r="13" fill="${c}" fill-opacity="0.2" stroke="none"/>`).join('')}</g>
    </g>`,
  ringlight: (c) => `
    <g ${stroke(c, 8)} opacity="0.32">
      <circle cx="450" cy="470" r="180"/>
      <circle cx="450" cy="470" r="120" stroke-dasharray="6 22"/>
      <line x1="450" y1="650" x2="450" y2="800"/>
      <path d="M370 840 L450 800 L530 840"/>
    </g>`,
  beforeafter: (c) => `
    <g opacity="0.34">
      <circle cx="450" cy="540" r="210" ${stroke(c, 8)}/>
      <line x1="450" y1="330" x2="450" y2="750" ${stroke(c, 6, 'stroke-dasharray="4 16"')}/>
      <path d="M360 470 q30 70 0 140" ${stroke(c, 6, 'stroke-opacity="0.5"')}/>
      <path d="M540 450 C 590 510, 590 570, 540 630" ${stroke(c, 9)}/>
      <g transform="translate(560 430)"><path d="M0 -22 C3 -7 7 -3 22 0 C7 3 3 7 0 22 C-3 7 -7 3 -22 0 C-7 -3 -3 -7 0 -22 Z" fill="${c}" fill-opacity="0.5" stroke="none"/></g>
    </g>`,
  model: (c) => `
    <g ${stroke(c, 8)} opacity="0.33">
      <ellipse cx="450" cy="500" rx="135" ry="172"/>
      <path d="M360 470 Q420 440 470 475"/>
      <path d="M330 455 L300 430"/>
      <circle cx="450" cy="690" r="16" fill="${c}" fill-opacity="0.2"/>
      <path d="M520 560 q40 30 0 70"/>
    </g>`,
  hand: (c) => `
    <g ${stroke(c)} opacity="0.34">
      <path d="M640 330 C 560 470, 560 610, 640 760"/>
      <g transform="rotate(34 360 560)">
        <line x1="250" y1="560" x2="520" y2="560"/>
        <path d="M520 534 q120 26 0 52 q-40 -26 0 -52" fill="${c}" fill-opacity="0.12"/>
      </g>
    </g>`,
};

function sceneSvg({ w, h, p, type, caption, seed, brand }) {
  const id = `g${seed}`;
  const inner = motifs[type] ? motifs[type](p.accent) : '';
  // El motivo se diseñó en 900x1180; lo escalamos al lienzo real.
  const sx = w / 900;
  const sy = h / 1180;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${caption || 'Maquillaje profesional'}">
  <defs>
    <linearGradient id="bg${id}" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${p.from}"/><stop offset="0.55" stop-color="${p.via}"/><stop offset="1" stop-color="${p.to}"/>
    </linearGradient>
    <radialGradient id="light${id}" cx="0.32" cy="0.26" r="0.75">
      <stop offset="0" stop-color="${p.light}" stop-opacity="0.95"/><stop offset="0.45" stop-color="${p.light}" stop-opacity="0.22"/><stop offset="1" stop-color="${p.light}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="shadow${id}" cx="0.78" cy="0.84" r="0.7">
      <stop offset="0" stop-color="${p.shadow}" stop-opacity="0.5"/><stop offset="1" stop-color="${p.shadow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig${id}" cx="0.5" cy="0.42" r="0.85">
      <stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.18"/>
    </radialGradient>
    <filter id="grain${id}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" seed="${seed}"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.07"/></feComponentTransfer></filter>
    <filter id="soft${id}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${Math.round(w * 0.05)}"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg${id})"/>
  <ellipse cx="${w * 0.3}" cy="${h * 0.24}" rx="${w * 0.4}" ry="${h * 0.32}" fill="${p.light}" opacity="0.5" filter="url(#soft${id})"/>
  <ellipse cx="${w * 0.82}" cy="${h * 0.86}" rx="${w * 0.4}" ry="${h * 0.3}" fill="${p.shadow}" opacity="0.38" filter="url(#soft${id})"/>
  <rect width="${w}" height="${h}" fill="url(#light${id})"/>
  <rect width="${w}" height="${h}" fill="url(#shadow${id})"/>
  <g transform="translate(${w / 2 - 450 * sx} ${h / 2 - 540 * sy}) scale(${sx} ${sy})">${inner}</g>
  <rect width="${w}" height="${h}" fill="url(#vig${id})"/>
  <rect width="${w}" height="${h}" filter="url(#grain${id})" opacity="0.5"/>
  ${
    caption
      ? `<g font-family="Arial, sans-serif" text-anchor="middle"><text x="${w / 2}" y="${h - h * 0.07}" font-size="${Math.round(h * 0.024)}" letter-spacing="${Math.round(w * 0.006)}" fill="${p.accent}" opacity="0.7">${caption.toUpperCase()}</text></g>`
      : ''
  }
  ${
    brand
      ? `<g fill="${p.accent}" text-anchor="middle" font-family="Georgia, serif"><text x="${w / 2}" y="${h * 0.45}" font-size="${h * 0.17}" letter-spacing="6">J</text><text x="${w / 2}" y="${h * 0.6}" font-size="${h * 0.06}" letter-spacing="10" font-family="Arial, sans-serif">JENNIFER · MAKEUP ARTIST</text><text x="${w / 2}" y="${h * 0.7}" font-size="${h * 0.038}" letter-spacing="6" font-family="Arial, sans-serif" fill="${p.shadow}">Belleza que te representa · CABA</text></g>`
      : ''
  }
</svg>`;
}

const portrait = { w: 900, h: 1180 };
const wide = { w: 1600, h: 1100 };

// Tipos de escena y su etiqueta + paletas por variante.
const sceneTypes = {
  skin: { caption: 'Preparación de piel', ps: ['skinGlow', 'porcelain', 'warmNude'] },
  eye: { caption: 'Maquillaje de ojos', ps: ['warmNude', 'moody', 'blushRose'] },
  lips: { caption: 'Labios', ps: ['blushRose', 'warmNude', 'moody'] },
  glow: { caption: 'Resultado final', ps: ['skinGlow', 'porcelain', 'blushRose'] },
  bride: { caption: 'Novia', ps: ['porcelain', 'blushRose', 'softBeige'] },
  mirror: { caption: 'Frente al espejo', ps: ['softBeige', 'porcelain', 'warmNude'] },
  model: { caption: 'Producción', ps: ['moody', 'warmNude', 'skinGlow'] },
  brushes: { caption: 'Brochas', ps: ['warmNude', 'softBeige', 'blushRose'] },
  palette: { caption: 'Paleta', ps: ['blushRose', 'softBeige', 'warmNude'] },
  ringlight: { caption: 'Backstage', ps: ['moody', 'softBeige', 'warmNude'] },
  beforeafter: { caption: 'Antes y después', ps: ['warmNude', 'blushRose', 'porcelain'] },
  hand: { caption: 'Maquillando', ps: ['warmNude', 'skinGlow', 'blushRose'] },
};

const manifest = [];
// Librería de escenas: 3 variantes por tipo (portrait).
let seed = 1;
for (const [type, cfg] of Object.entries(sceneTypes)) {
  cfg.ps.forEach((pName, i) => {
    manifest.push({ name: `mk-${type}-${i + 1}.svg`, ...portrait, p: palettes[pName], type, caption: cfg.caption, seed: seed++ });
  });
}
// Hero (wide, "maquillando") y about (portrait, brochas).
manifest.push({ name: 'mk-hero.svg', ...wide, p: palettes.warmNude, type: 'hand', caption: '', seed: seed++ });
manifest.push({ name: 'mk-about.svg', ...portrait, p: palettes.porcelain, type: 'brushes', caption: '', seed: seed++ });
// Open Graph con marca.
manifest.push({ name: 'og.svg', w: 1200, h: 630, p: palettes.porcelain, type: '', caption: '', brand: true, seed: seed++ });

mkdirSync(OUT, { recursive: true });
let created = 0;
for (const img of manifest) {
  const file = join(OUT, img.name);
  if (existsSync(file.replace(/\.svg$/, '.jpg'))) continue; // respeta fotos reales
  writeFileSync(file, sceneSvg(img));
  created += 1;
}
console.log(`✓ Placeholders de maquillaje generados: ${created} archivos en public/images`);
