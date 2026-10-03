import { NAV, SITE } from '@/lib/site';
import { Wordmark } from './Logo';
import { NavMenu } from './NavMenu';
import styles from './Nav.module.css';

export function Nav() {
    return (
        <header className={styles.nav}>
            <div className={`wrap ${styles.inner}`}>
                <a href="#top" className={styles.brand} aria-label={`${SITE.name} home`}>
                    <Wordmark />
                </a>
                <nav aria-label="Sections" className={styles.inline}>
                    <ul className={styles.links}>
                        {NAV.map(link => (
                            <li key={link.href}>
                                <a href={link.href}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <NavMenu links={NAV} />
                <a className={styles.cta} href={SITE.cta.href}>
                    {SITE.cta.label}
                </a>
            </div>
        </header>
    );
}
