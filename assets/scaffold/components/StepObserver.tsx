'use client';

import { useEffect, useRef } from 'react';

export function StepObserver() {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const section = ref.current?.closest('section');
        if (!section) return;
        const steps = section.querySelectorAll<HTMLElement>('[data-step]');
        const band = window.matchMedia('(max-width: 960px)').matches ? '-58% 0px -22% 0px' : '-45% 0px -45% 0px';
        const observer = new IntersectionObserver(
            entries => {
                for (const entry of entries) {
                    if (entry.isIntersecting) section.dataset.active = (entry.target as HTMLElement).dataset.step;
                }
            },
            { rootMargin: band },
        );
        steps.forEach(step => observer.observe(step));
        return () => observer.disconnect();
    }, []);

    return <span ref={ref} hidden />;
}
