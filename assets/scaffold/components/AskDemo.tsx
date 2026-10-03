'use client';

import { useState } from 'react';
import { SCENARIO, type Part } from '@/lib/demo';
import styles from './Ask.module.css';

const { lines: LINES, questions: QUESTIONS } = SCENARIO;

function sequence(parts: Part[]) {
    let index = 0;
    return parts.flatMap((part, p) =>
        typeof part === 'string'
            ? part
                  .split(/(?=\s)/)
                  .filter(Boolean)
                  .map((word, w) => ({ key: `${p}-${w}`, word, cite: null as string | null, i: index++ }))
            : [{ key: `${p}-cite`, word: '', cite: part.cite, i: index++ }],
    );
}

const SEQUENCES = QUESTIONS.map(question => sequence(question.answer));

export function AskDemo() {
    const [active, setActive] = useState(0);
    const [focus, setFocus] = useState<string | null>(null);

    const cited = new Set(QUESTIONS[active].answer.flatMap(part => (typeof part === 'string' ? [] : [part.cite])));

    return (
        <div className={styles.demo}>
            <div className={styles.chat}>
                <p className={styles.try}>Try asking</p>
                <div className={styles.questions} role="group" aria-label="Example questions">
                    {QUESTIONS.map((question, i) => (
                        <button
                            key={question.q}
                            type="button"
                            className={styles.question}
                            aria-pressed={active === i}
                            onClick={() => {
                                setActive(i);
                                setFocus(null);
                            }}
                        >
                            {question.q}
                        </button>
                    ))}
                </div>

                <div className={styles.thread} aria-live="polite">
                    <p className={styles.asked}>{QUESTIONS[active].q}</p>
                    <p key={active} className={styles.answer}>
                        {SEQUENCES[active].map(token =>
                            token.cite ? (
                                <button
                                    key={token.key}
                                    type="button"
                                    className={styles.cite}
                                    style={{ '--i': token.i } as React.CSSProperties}
                                    aria-label={`Show the line at ${token.cite}`}
                                    onMouseEnter={() => setFocus(token.cite)}
                                    onMouseLeave={() => setFocus(null)}
                                    onFocus={() => setFocus(token.cite)}
                                    onBlur={() => setFocus(null)}
                                    onClick={() => setFocus(token.cite)}
                                >
                                    {token.cite}
                                </button>
                            ) : (
                                <span key={token.key} className={styles.word} style={{ '--i': token.i } as React.CSSProperties}>
                                    {token.word}
                                </span>
                            ),
                        )}
                    </p>
                </div>
            </div>

            <figure className={styles.transcript}>
                <figcaption>
                    <span>{SCENARIO.title}</span>
                    <span className={styles.kind}>Transcript</span>
                </figcaption>
                <ol>
                    {LINES.map(line => (
                        <li key={line.t} className={focus === line.t ? styles.focused : cited.has(line.t) ? styles.cited : undefined}>
                            <span className={styles.time}>{line.t}</span>
                            <span className={styles.who} data-tone={line.tone}>
                                {line.who}
                            </span>
                            <span>{line.text}</span>
                        </li>
                    ))}
                </ol>
            </figure>
        </div>
    );
}
