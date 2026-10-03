import type { Metadata, Viewport } from 'next';
import { Mona_Sans } from 'next/font/google';
import { preload } from 'react-dom';
import { RevealObserver } from '@/components/RevealObserver';
import { DISPLAY_FACES, DISPLAY_FONT_CSS } from '@/lib/fonts';
import { SITE } from '@/lib/site';
import './globals.css';

const monaSans = Mona_Sans({ subsets: ['latin'], axes: ['wdth'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
    metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:3000'),
    title: SITE.title,
    description: SITE.description,
    openGraph: { title: SITE.title, description: SITE.description, type: 'website' },
};

export const viewport: Viewport = {
    themeColor: SITE.themeColor,
};

const PRE_PAINT = `(function(){var d=document.documentElement;d.classList.add('js');try{var c=localStorage.getItem('${SITE.slug}-currency');if(c!=='usd'&&c!=='inr'){var z=Intl.DateTimeFormat().resolvedOptions().timeZone;c=z==='Asia/Kolkata'||z==='Asia/Calcutta'?'inr':'usd'}d.dataset.currency=c}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    for (const face of DISPLAY_FACES) preload(`/fonts/${face.file}`, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });

    return (
        <html lang="en" className={monaSans.variable} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
                <style dangerouslySetInnerHTML={{ __html: DISPLAY_FONT_CSS }} />
            </head>
            <body>
                <a className="skip" href="#main">
                    Skip to content
                </a>
                {children}
                <RevealObserver />
            </body>
        </html>
    );
}
