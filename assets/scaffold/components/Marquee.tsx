import { SITE, TICKER } from '@/lib/site';
import { LogoMark } from './Logo';
import styles from './Marquee.module.css';

function Row({ hidden = false }: { hidden?: boolean }) {
    return (
        <ul className={styles.row} aria-hidden={hidden || undefined}>
            {TICKER.map(item => (
                <li key={item.text} className={styles[item.voice]}>
                    {item.text}
                    <LogoMark size={28} />
                </li>
            ))}
        </ul>
    );
}

export function Marquee() {
    return (
        <section className={styles.band} data-theme="tint" aria-label={`${SITE.name} at a glance`}>
            <div className={styles.track}>
                <Row />
                <Row hidden />
            </div>
        </section>
    );
}
