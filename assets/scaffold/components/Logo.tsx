import { SITE } from '@/lib/site';
import styles from './Logo.module.css';

const BARS = [
    { x: 6.4, height: 10 },
    { x: 11.6, height: 18 },
    { x: 16.8, height: 13 },
    { x: 22, height: 20 },
].map(bar => ({ left: `${(bar.x / 32) * 100}%`, height: `${(bar.height / 32) * 100}%` }));

export function LogoMark({ size = 28, live = false }: { size?: number; live?: boolean }) {
    return (
        <span className={live ? `${styles.mark} ${styles.live}` : styles.mark} style={{ width: size, height: size }} aria-hidden="true">
            {BARS.map((bar, index) => (
                <span key={bar.left} className={styles.bar} style={{ left: bar.left, height: bar.height, animationDelay: `${index * 140}ms` }} />
            ))}
        </span>
    );
}

export function Wordmark({ live = false }: { live?: boolean }) {
    return (
        <span className={styles.wordmark}>
            <LogoMark live={live} />
            <span>{SITE.wordmark}</span>
        </span>
    );
}
