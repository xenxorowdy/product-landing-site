'use client';

import { useEffect, useRef } from 'react';

function format(total: number) {
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function RecTimer({ from }: { from: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        let elapsed = from;
        const id = window.setInterval(() => {
            elapsed += 1;
            if (ref.current) ref.current.textContent = format(elapsed);
        }, 1000);
        return () => window.clearInterval(id);
    }, [from]);
    return (
        <span ref={ref} suppressHydrationWarning>
            {format(from)}
        </span>
    );
}
