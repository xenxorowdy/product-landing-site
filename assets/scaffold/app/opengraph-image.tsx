import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BARS = [
    { x: 19, h: 30 },
    { x: 35, h: 54 },
    { x: 50, h: 39 },
    { x: 66, h: 60 },
];

export default function OpengraphImage() {
    return new ImageResponse(
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 72,
                background: '#f5f5f0',
                color: '#111111',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ position: 'relative', display: 'flex', width: 96, height: 96, borderRadius: 27, background: '#ff5e00' }}>
                    {BARS.map(bar => (
                        <div
                            key={bar.x}
                            style={{
                                position: 'absolute',
                                left: bar.x,
                                top: (96 - bar.h) / 2,
                                width: 11,
                                height: bar.h,
                                borderRadius: 6,
                                background: '#ffffff',
                            }}
                        />
                    ))}
                </div>
                <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: 4 }}>{SITE.wordmark}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 112, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>
                <span>{SITE.headline.lead}</span>
                <span style={{ color: '#e25300' }}>{SITE.headline.accent}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 30, color: '#4a4a46' }}>
                <div style={{ display: 'flex', padding: '10px 24px', borderRadius: 999, background: '#ff5e00', color: '#111111', fontWeight: 700 }}>
                    {SITE.cta.heroLabel}
                </div>
                {SITE.note}
            </div>
        </div>,
        size,
    );
}
