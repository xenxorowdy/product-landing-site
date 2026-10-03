import styles from './Privacy.module.css';

const POINTS = [
    {
        n: '01',
        title: 'No bot, no invite.',
        body: 'Kesami records from your Mac’s microphone and speakers. Nobody on the call sees a bot, a join request or a stranger in the participant list.',
    },
    {
        n: '02',
        title: 'Your library is a folder.',
        body: 'Every meeting is saved in Documents › Kesami Meetings as Markdown and JSON. Open it in any editor, back it up, or delete it.',
    },
    {
        n: '03',
        title: 'The cloud only where it has to be.',
        body: 'While you record, audio streams to Kesami’s relay for live transcription. Meeting text goes to the AI only when you make a summary or ask a question.',
    },
];

const FILES = [
    { name: 'meeting.json', kind: 'JSON' },
    { name: 'transcript.md', kind: 'Markdown', open: true },
    { name: 'summary.md', kind: 'Markdown' },
    { name: 'recording.webm', kind: 'Screen recording' },
];

const OTHER_FOLDERS = ['2026-09-30 Design review', '2026-09-29 Customer call — Northwind', '2026-09-25 Hiring loop'];

function Folder() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
                d="M1.5 4a1.5 1.5 0 0 1 1.5-1.5h3.2l1.5 1.5H13A1.5 1.5 0 0 1 14.5 5.5v6A1.5 1.5 0 0 1 13 13H3a1.5 1.5 0 0 1-1.5-1.5Z"
                fill="#5aa5e8"
            />
        </svg>
    );
}

function Doc() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 1.5h5.5L12.5 4.5v9a1 1 0 0 1-1 1h-7.5a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z" fill="#fff" stroke="#b9b9b2" />
            <path d="M9.5 1.5v3h3" fill="none" stroke="#b9b9b2" />
        </svg>
    );
}

export function Privacy() {
    return (
        <section className={styles.privacy} id="privacy" data-theme="paper" aria-labelledby="privacy-title">
            <div className={`wrap ${styles.layout}`}>
                <div className={styles.copy}>
                    <p className="label" data-scramble>
                        Privacy
                    </p>
                    <h2 id="privacy-title" className="display h2" data-reveal>
                        Your meetings are files, <span className="em">not a feed.</span>
                    </h2>
                    <ol className={styles.points}>
                        {POINTS.map((point, i) => (
                            <li key={point.n} data-reveal style={{ '--d': `${i * 100}ms` } as React.CSSProperties}>
                                <span className="chip">{point.n}</span>
                                <h3 className={styles.title}>{point.title}</h3>
                                <p>{point.body}</p>
                            </li>
                        ))}
                    </ol>
                </div>

                <figure className={styles.finder} data-reveal aria-label="The Kesami Meetings folder in Finder, with a transcript open">
                    <div className={styles.bar}>
                        <span className={styles.lights} aria-hidden="true">
                            <i />
                            <i />
                            <i />
                        </span>
                        <span className={styles.path}>
                            Documents <span aria-hidden="true">›</span> <strong>Kesami Meetings</strong>
                        </span>
                    </div>
                    <div className={styles.body}>
                        <ul className={styles.tree}>
                            <li className={styles.folderOpen}>
                                <span className={styles.row}>
                                    <span className={styles.chev} aria-hidden="true">
                                        ▾
                                    </span>
                                    <Folder />
                                    2026-10-02 Weekly product sync
                                </span>
                                <ul>
                                    {FILES.map(file => (
                                        <li key={file.name} className={file.open ? styles.selected : undefined}>
                                            <span className={styles.row}>
                                                <Doc />
                                                <span className={styles.file}>{file.name}</span>
                                                <span className={styles.kind}>{file.kind}</span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {OTHER_FOLDERS.map(folder => (
                                <li key={folder}>
                                    <span className={styles.row}>
                                        <span className={styles.chev} aria-hidden="true">
                                            ▸
                                        </span>
                                        <Folder />
                                        {folder}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <pre className={styles.preview}>
                            <span className={styles.h}># Weekly product sync — transcript</span>
                            {'\n\n'}
                            <b>**[14:02] Kabir:**</b> Okay, launch. Are we still on for the 14th?
                            {'\n\n'}
                            <b>**[14:09] You:**</b> If the pricing page is done by Thursday, yes.
                            {'\n\n'}
                            <b>**[14:15] Aditi:**</b> Pricing copy is with me. I’ll have it Wednesday.
                        </pre>
                    </div>
                </figure>
            </div>
        </section>
    );
}
