import { NAV, SITE } from '@/lib/site';
import styles from './Footer.module.css';

const COLUMNS = [
    { title: 'Product', links: NAV },
    {
        title: 'Download',
        links: [
            { href: SITE.cta.href, label: 'Latest release' },
            { href: SITE.releasesUrl, label: 'All releases' },
        ],
    },
];

export function Footer() {
    return (
        <footer className={styles.footer} data-theme="paper">
            <div className={`wrap ${styles.top}`}>
                <p className={styles.tagline}>{SITE.tagline}</p>
                {COLUMNS.map(column => (
                    <nav key={column.title} aria-label={column.title} className={styles.column}>
                        <p className={styles.columnTitle}>{column.title}</p>
                        <ul>
                            {column.links.map(link => (
                                <li key={link.label}>
                                    <a className="link" href={link.href}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>
            <div className={styles.wordmark} aria-hidden="true">
                {SITE.wordmark}
            </div>
            <div className={`wrap ${styles.bottom}`}>
                <span className="chip">© {new Date().getFullYear()}</span>
                <span>
                    {SITE.name}. {SITE.description.split('. ')[0]}.
                </span>
            </div>
        </footer>
    );
}
