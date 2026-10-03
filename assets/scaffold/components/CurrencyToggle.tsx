'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';
import styles from './Pricing.module.css';

type Currency = 'usd' | 'inr';

const OPTIONS: { value: Currency; label: string }[] = [
    { value: 'usd', label: 'USD $' },
    { value: 'inr', label: 'INR ₹' },
];

export function CurrencyToggle() {
    const [currency, setCurrency] = useState<Currency | null>(null);

    useEffect(() => {
        setCurrency(document.documentElement.dataset.currency === 'inr' ? 'inr' : 'usd');
    }, []);

    const choose = (next: Currency) => {
        document.documentElement.dataset.currency = next;
        try {
            localStorage.setItem(`${SITE.slug}-currency`, next);
        } catch {}
        setCurrency(next);
    };

    return (
        <div className={styles.toggle} role="group" aria-label="Currency">
            {OPTIONS.map(option => (
                <button
                    key={option.value}
                    type="button"
                    className={styles[option.value]}
                    aria-pressed={currency === null ? undefined : currency === option.value}
                    onClick={() => choose(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
