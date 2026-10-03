import { LANGUAGES } from '@/lib/site';
import styles from './Languages.module.css';

export function Languages() {
    return (
        <section className={styles.languages} data-theme="light" aria-labelledby="lang-title">
            <div className="wrap">
                <div className={styles.head}>
                    <p className="label" data-scramble>
                        Languages
                    </p>
                    <h2 id="lang-title" className="display h2" data-reveal>
                        Speak the way <span className="em">your team</span> speaks.
                    </h2>
                    <p className="lead" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
                        Kesami transcribes English and ten Indian languages, and works out which one is being spoken on its own.
                    </p>
                </div>
                <ul className={styles.wall} data-reveal>
                    {LANGUAGES.map(language => (
                        <li key={language.lang}>
                            <span lang={language.lang} dir={language.lang === 'ur' ? 'rtl' : undefined} className={styles.native}>
                                {language.native}
                            </span>
                            <span className={styles.name}>{language.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
