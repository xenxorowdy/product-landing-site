const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

const URL_ = process.env.URL || 'http://localhost:3000';
const OUT = process.env.OUT || path.join(process.cwd(), 'shots');
const WIDTHS = (process.env.WIDTHS || '1440,390').split(',').map(Number);
const HEIGHTS = { 1440: 900, 390: 844 };
const MAX_SHOTS = Number(process.env.MAX_SHOTS || 14);
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

app.disableHardwareAcceleration();

async function shoot(win, width) {
    const height = HEIGHTS[width] || 900;
    win.setContentSize(width, height);
    await win.loadURL(URL_);
    await wait(2500);
    const total = await win.webContents.executeJavaScript('document.documentElement.scrollHeight');
    const step = Math.round(height * 0.8);
    const count = Math.min(MAX_SHOTS, Math.ceil(total / step));
    for (let i = 0; i < count; i++) {
        await win.webContents.executeJavaScript(`window.scrollTo(0, ${i * step})`);
        await wait(900);
        const image = await win.webContents.capturePage();
        fs.writeFileSync(path.join(OUT, `${width}-${String(i).padStart(2, '0')}.png`), image.toPNG());
    }
    console.log(`${width}px: ${count} shots of a ${total}px page`);
}

app.whenReady().then(async () => {
    fs.mkdirSync(OUT, { recursive: true });
    const win = new BrowserWindow({ show: false, width: 1440, height: 900, useContentSize: true, webPreferences: { paintWhenInitiallyHidden: true } });
    for (const width of WIDTHS) await shoot(win, width);
    app.quit();
}).catch(error => {
    console.error(error);
    app.exit(1);
});
