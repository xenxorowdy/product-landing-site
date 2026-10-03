import { SCENARIO } from '@/lib/demo';
import { SITE } from '@/lib/site';
import { ArrowDown } from './Icons';
import { RecTimer } from './RecTimer';
import { WaveFloor } from './WaveFloor';
import styles from './Hero.module.css';

const TURNS = SCENARIO.lines.slice(0, 3);

export function Hero() {
    const { widget, live } = SCENARIO;
    return (
        <section className={styles.hero} id="top" data-theme="light" aria-labelledby="hero-title">
            <div className={`wrap ${styles.content}`}>
                <p className={styles.eyebrow}>
                    <span className={styles.rec}>
                        <span className={styles.dot} aria-hidden="true" />
                        LIVE <RecTimer from={widget.clockFrom} />
                    </span>
                    <span className={styles.eyebrowText}>{SITE.eyebrow}</span>
                </p>

                <div className={styles.grid}>
                    <div className={styles.copy}>
                        <h1 id="hero-title" className={`display ${styles.title}`}>
                            <span>{SITE.headline.lead}</span> <span className="em">{SITE.headline.accent}</span>
                        </h1>
                        <p className={`lead ${styles.lead}`}>{SITE.lead}</p>
                        <div className={styles.actions}>
                            <a className="btn" href={SITE.cta.href}>
                                {SITE.cta.heroLabel}
                            </a>
                            <a className="link" href={SITE.secondaryCta.href}>
                                {SITE.secondaryCta.label} <ArrowDown size={16} />
                            </a>
                        </div>
                        <p className={styles.note}>{SITE.note}</p>
                    </div>

                    <figure className={styles.widget} data-theme="dark" aria-label={widget.label}>
                        <div className={styles.widgetHead}>
                            <span className={styles.state}>
                                <span className={styles.dot} aria-hidden="true" /> {widget.state}
                            </span>
                            <span className={styles.meeting}>{SCENARIO.title}</span>
                        </div>
                        <ol className={styles.turns}>
                            {TURNS.map((turn, i) => (
                                <li key={turn.who + i} className={styles.turn} style={{ '--d': `${400 + i * 900}ms` } as React.CSSProperties}>
                                    <span className={styles.avatar} data-tone={turn.tone} aria-hidden="true">
                                        {turn.who[0]}
                                    </span>
                                    <span className={styles.speaker} data-tone={turn.tone}>
                                        {turn.who}
                                    </span>
                                    <p>{turn.text}</p>
                                </li>
                            ))}
                            <li className={`${styles.turn} ${styles.interim}`} style={{ '--d': '3100ms' } as React.CSSProperties}>
                                <span className={styles.avatar} data-tone={live.tone} aria-hidden="true">
                                    {live.who[0]}
                                </span>
                                <span className={styles.speaker} data-tone={live.tone}>
                                    {live.who}
                                </span>
                                <p>
                                    {live.text}
                                    <span className={styles.caret} aria-hidden="true" />
                                </p>
                            </li>
                        </ol>
                        <div className={styles.controls} aria-hidden="true">
                            {widget.controls.map(control => (
                                <span key={control}>{control}</span>
                            ))}
                            <span className={styles.stop}>{widget.stop}</span>
                        </div>
                        <figcaption className={`chip ${styles.count}`}>{widget.chip}</figcaption>
                    </figure>
                </div>
            </div>
            <WaveFloor />
        </section>
    );
}
