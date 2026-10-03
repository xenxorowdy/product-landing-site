import { AskDemo } from './AskDemo';
import styles from './Ask.module.css';

export function Ask() {
    return (
        <section className={styles.ask} id="ask" data-theme="paper" aria-labelledby="ask-title">
            <div className="wrap">
                <div className={styles.head}>
                    <p className="label" data-scramble>
                        Ask
                    </p>
                    <h2 id="ask-title" className="display h2" data-reveal>
                        Ask last Tuesday <span className="em">anything.</span>
                    </h2>
                    <p className="lead" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
                        Say how answers are produced and what the reader can do to verify them. Here every claim carries the time it came from: tap or
                        hover a time to see the line.
                    </p>
                </div>
                <AskDemo />
            </div>
        </section>
    );
}
