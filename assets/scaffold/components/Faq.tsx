import { FAQ } from '@/lib/site';
import { Plus } from './Icons';
import styles from './Faq.module.css';

export function Faq() {
    return (
        <section className={styles.faq} id="faq" data-theme="paper" aria-labelledby="faq-title">
            <div className={`wrap ${styles.layout}`}>
                <div className={styles.head}>
                    <p className="label" data-scramble>
                        FAQ
                    </p>
                    <h2 id="faq-title" className="display h2" data-reveal>
                        Questions, <span className="em">answered.</span>
                    </h2>
                </div>
                <div className={styles.list}>
                    {FAQ.map(item => (
                        <details key={item.q} className={styles.item}>
                            <summary>
                                <span>{item.q}</span>
                                <span className={styles.icon}>
                                    <Plus />
                                </span>
                            </summary>
                            <p>{item.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
