'use client';

import { useEffect, useId, useState } from 'react';
import styles from './Nav.module.css';

type Link = { href: string; label: string };

export function NavMenu({ links }: { links: Link[] }) {
    const [open, setOpen] = useState(false);
    const panelId = useId();

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <div className={styles.menu}>
            <button type="button" className={styles.menuButton} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(value => !value)}>
                {open ? 'Close' : 'Menu'}
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    {open ? (
                        <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    ) : (
                        <path d="M2.5 5.5h11M2.5 10.5h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    )}
                </svg>
            </button>
            <nav id={panelId} aria-label="Sections" className={styles.menuPanel} hidden={!open}>
                <ul>
                    {links.map(link => (
                        <li key={link.href}>
                            <a href={link.href} onClick={() => setOpen(false)}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
