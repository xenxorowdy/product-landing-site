#!/usr/bin/env node
const [, , brandArg, ...rest] = process.argv;

if (!brandArg || brandArg === '--help') {
    console.log(`Usage: node accent.mjs <brand-hex> [--canvas #f5f5f0] [--ink #111111] [--check fg:bg ...]

Derives the tokens a light page needs from one brand colour:
  --brand-tint      brand at 10% over the canvas, flattened to an opaque colour
  --accent          brand darkened until it reaches 4.5:1 on canvas, white and the tint (small text)
  --accent-display  brand darkened until it reaches 3:1 on the same (headline-size text)
  label colour      whichever of ink or white reads better on a filled brand button

--check takes extra pairs such as "#66665f:#f5f5f0" and prints their ratios.`);
    process.exit(0);
}

const args = { canvas: '#f5f5f0', ink: '#111111', checks: [] };
for (let i = 0; i < rest.length; i++) {
    if (rest[i] === '--canvas') args.canvas = rest[++i];
    else if (rest[i] === '--ink') args.ink = rest[++i];
    else if (rest[i] === '--check') while (rest[i + 1] && !rest[i + 1].startsWith('--')) args.checks.push(rest[++i]);
}

const hexToRgb = hex => {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? [...h].map(c => c + c).join('') : h;
    return [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16));
};
const rgbToHex = rgb => '#' + rgb.map(v => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('');

const luminance = rgb => {
    const [r, g, b] = rgb.map(v => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
};

const rgbToHsl = ([r, g, b]) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h * 60, s, l];
};
const hslToRgb = ([h, s, l]) => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
    return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
};

const brand = hexToRgb(brandArg);
const canvas = hexToRgb(args.canvas);
const ink = hexToRgb(args.ink);
const white = [255, 255, 255];
const tint = brand.map((v, i) => v * 0.1 + canvas[i] * 0.9);
const surfaces = [canvas, white, tint];

const darkenTo = target => {
    const [h, s, l0] = rgbToHsl(brand);
    for (let l = l0; l > 0; l -= 0.002) {
        const candidate = hslToRgb([h, s, l]).map(Math.round);
        if (surfaces.every(surface => ratio(candidate, surface) >= target)) return candidate;
    }
    return ink;
};

const fmt = rgb => rgbToHex(rgb);
const worst = rgb => Math.min(...surfaces.map(surface => ratio(rgb, surface))).toFixed(2);

const accent = darkenTo(4.5);
const display = darkenTo(3);

console.log(`--brand: ${fmt(brand)};`);
console.log(`--brand-tint (flattened over canvas): ${fmt(tint)}   (use rgba(${brand.join(', ')}, 0.1) for the translucent form)`);
console.log(`--accent: ${fmt(accent)};            worst ratio on canvas/white/tint ${worst(accent)}:1   (target 4.5)`);
console.log(`--accent-display: ${fmt(display)};    worst ratio ${worst(display)}:1   (target 3)`);
console.log('');
console.log(`brand on canvas as text: ${ratio(brand, canvas).toFixed(2)}:1  -> ${ratio(brand, canvas) >= 4.5 ? 'passes; no darkening needed' : 'fails 4.5:1, so use --accent for text'}`);
const onInk = ratio(ink, brand);
const onWhite = ratio(white, brand);
console.log(`label on a filled brand button: ink ${onInk.toFixed(2)}:1, white ${onWhite.toFixed(2)}:1  -> use ${onInk >= onWhite ? 'ink' : 'white'}${Math.max(onInk, onWhite) < 4.5 ? '  (neither reaches 4.5:1: adjust the brand fill or make the label larger and bolder)' : ''}`);

for (const pair of args.checks) {
    const [fg, bg] = pair.split(':');
    console.log(`${fg} on ${bg}: ${ratio(hexToRgb(fg), hexToRgb(bg)).toFixed(2)}:1`);
}
