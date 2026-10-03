import { SITE } from '@/lib/site';
import styles from './Closing.module.css';

export function Closing() {
    return (
        <section className={styles.closing} data-theme="light" aria-labelledby="closing-title">
            <div className="wrap">
                <h2 id="closing-title" className={`display ${styles.title}`} data-reveal>
                    The closing line, <span className="em">said plainly.</span>
                </h2>
                <div className={styles.actions} data-reveal style={{ '--d': '150ms' } as React.CSSProperties}>
                    <a className="btn" href={SITE.cta.href}>
                        {SITE.cta.heroLabel}
                    </a>
                    <p className={styles.note}>{SITE.note}</p>
                </div>
            </div>
        </section>
    );
}
