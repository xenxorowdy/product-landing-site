import 'server-only';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const LICENSED = [
    { file: 'display-regular.woff2', weight: 400 },
    { file: 'display-bold.woff2', weight: 700 },
];
const STAND_IN = [{ file: 'instrument-serif-latin.woff2', weight: 400 }];

const FONT_DIR = join(process.cwd(), 'public', 'fonts');
const licensed = LICENSED.filter(face => existsSync(join(FONT_DIR, face.file)));

export const DISPLAY_FACES = licensed.length ? licensed : STAND_IN;

export const DISPLAY_FONT_CSS = DISPLAY_FACES.map(
    face =>
        `@font-face{font-family:'Brand Display';src:url(/fonts/${face.file}) format('woff2');font-weight:${face.weight};font-style:normal;font-display:swap}`,
).join('');
