import styles from './Cleanup.module.css';

const HEARD = [
    { kind: 'noise', text: '~ steady fan hum ~', tag: 'Noise · filtered' },
    { kind: 'kept', who: 'You', tone: 'you', text: 'If the pricing page is done by Thursday, yes.' },
    { kind: 'echo', who: 'You', tone: 'you', text: 'Then the 14th it is.', tag: 'Echo of Kabir · dropped' },
    { kind: 'noise', text: '~ air conditioner ~', tag: 'Noise · filtered' },
];

const SPECS = [
    {
        value: '32 ms',
        text: 'frames for the noise filter, which tracks the room’s noise floor band by band so steady hum falls below the speech threshold.',
    },
    { value: '600 ms', text: 'of speaker-to-mic delay searched by the echo check, against the last 12 seconds of what the meeting played.' },
    { value: '10 s', text: 'window in which a mic turn that repeats the meeting’s words is dropped as text, too.' },
];

export function Cleanup() {
    return (
        <section className={styles.cleanup} data-theme="light" aria-labelledby="clean-title">
            <div className="wrap">
                <div className={styles.head}>
                    <p className="label" data-scramble>
                        Clean audio
                    </p>
                    <h2 id="clean-title" className="display h2" data-reveal>
                        The room is noisy. <span className="em">The notes aren’t.</span>
                    </h2>
                    <p className="lead" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
                        Kesami cleans your microphone before anything listens to it, and drops the meeting audio that leaks back in through your
                        speakers. A sentence lands once, under the right name.
                    </p>
                </div>

                <div className={styles.compare}>
                    <figure className={styles.panel} data-reveal>
                        <figcaption>What the mic heard</figcaption>
                        <ol>
                            {HEARD.map((line, i) => (
                                <li key={i} className={styles[line.kind]} style={{ '--d': `${300 + i * 220}ms` } as React.CSSProperties}>
                                    {line.who ? (
                                        <span className={styles.who} data-tone={line.tone}>
                                            {line.who}
                                        </span>
                                    ) : null}
                                    <span className={styles.text}>{line.text}</span>
                                    {line.tag ? <span className={`chip ${styles.tag}`}>{line.tag}</span> : null}
                                </li>
                            ))}
                        </ol>
                    </figure>

                    <span className={styles.arrow} aria-hidden="true">
                        →
                    </span>

                    <figure className={`${styles.panel} ${styles.clean}`} data-reveal style={{ '--d': '200ms' } as React.CSSProperties}>
                        <figcaption>What Kesami wrote</figcaption>
                        <ol>
                            <li>
                                <span className={styles.time}>14:09</span>
                                <span className={styles.who} data-tone="you">
                                    You
                                </span>
                                <span>If the pricing page is done by Thursday, yes.</span>
                            </li>
                            <li>
                                <span className={styles.time}>14:21</span>
                                <span className={styles.who} data-tone="speaker-1">
                                    Kabir
                                </span>
                                <span>Then the 14th it is.</span>
                            </li>
                        </ol>
                    </figure>
                </div>

                <dl className={styles.specs}>
                    {SPECS.map((spec, i) => (
                        <div key={spec.value} data-reveal style={{ '--d': `${i * 120}ms` } as React.CSSProperties}>
                            <dt className="tech">{spec.value}</dt>
                            <dd>{spec.text}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
