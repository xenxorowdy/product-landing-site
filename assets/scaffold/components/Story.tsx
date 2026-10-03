import { SCENARIO, STEPS, TABS, type Part } from '@/lib/demo';
import { StepObserver } from './StepObserver';
import styles from './Story.module.css';

const ANSWER = SCENARIO.questions[0];
const QUOTE = SCENARIO.lines[3];

function Answer({ parts }: { parts: readonly Part[] }) {
    return (
        <>
            {parts.map((part, i) =>
                typeof part === 'string' ? (
                    part
                ) : (
                    <span key={i} className={styles.cite}>
                        {part.cite}
                    </span>
                ),
            )}
        </>
    );
}

export function Story() {
    return (
        <section className={styles.story} id="how" data-theme="paper" data-active="1" aria-labelledby="how-title">
            <StepObserver />
            <div className="wrap">
                <header className={styles.head}>
                    <p className="label" data-scramble>
                        How it works
                    </p>
                    <h2 id="how-title" className="display h2" data-reveal>
                        From the first step to the{' '}
                        <span className="em" style={{ whiteSpace: 'nowrap' }}>
                            payoff.
                        </span>
                    </h2>
                </header>

                <div className={styles.layout}>
                    <div className={styles.frameWrap}>
                        <div
                            className={styles.frame}
                            data-theme="dark"
                            role="img"
                            aria-label="The app showing the transcript, the brief and an answer"
                        >
                            <div className={styles.titlebar}>
                                <span className={styles.lights} aria-hidden="true">
                                    <i />
                                    <i />
                                    <i />
                                </span>
                                <span className={styles.windowTitle}>{SCENARIO.title}</span>
                                <span className={styles.tabs}>
                                    {TABS.map((tab, i) => (
                                        <span key={tab} className={styles.tab} data-tab={i + 1}>
                                            {tab}
                                        </span>
                                    ))}
                                </span>
                            </div>

                            <div className={styles.panes}>
                                <div className={styles.pane} data-pane="1">
                                    <div className={styles.paneHead}>
                                        <span>Transcript</span>
                                        <span className={styles.meta}>4 speakers</span>
                                    </div>
                                    <ol className={styles.lines}>
                                        {SCENARIO.lines.map(line => (
                                            <li key={line.t}>
                                                <span className={styles.time}>{line.t}</span>
                                                <span className={styles.who} data-tone={line.tone}>
                                                    {line.who}
                                                </span>
                                                <span>{line.text}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>

                                <div className={styles.pane} data-pane="2">
                                    <div className={styles.paneHead}>
                                        <span>Summary</span>
                                        <span className={styles.meta}>Generated when the meeting ended</span>
                                    </div>
                                    <p className={styles.summary}>{SCENARIO.summary}</p>
                                    <p className={styles.sub}>Decisions</p>
                                    <ul className={styles.decisions}>
                                        {SCENARIO.decisions.map(decision => (
                                            <li key={decision}>{decision}</li>
                                        ))}
                                    </ul>
                                    <p className={styles.sub}>Action items</p>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Task</th>
                                                <th>Owner</th>
                                                <th>Due</th>
                                                <th>Source</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {SCENARIO.actions.map(action => (
                                                <tr key={action.task}>
                                                    <td>{action.task}</td>
                                                    <td>{action.owner}</td>
                                                    <td>{action.due}</td>
                                                    <td>
                                                        <span className={styles.cite}>{action.src}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className={styles.email}>
                                        <span>
                                            <strong>{SCENARIO.email.label}</strong> · {SCENARIO.email.subject}
                                        </span>
                                        <span className={styles.copy}>{SCENARIO.email.action}</span>
                                    </div>
                                </div>

                                <div className={styles.pane} data-pane="3">
                                    <div className={styles.paneHead}>
                                        <span>Ask</span>
                                        <span className={styles.meta}>This meeting</span>
                                    </div>
                                    <div className={styles.chat}>
                                        <p className={styles.question}>{ANSWER.q}</p>
                                        <p className={styles.answer}>
                                            <Answer parts={ANSWER.answer} />
                                        </p>
                                        <div className={styles.source}>
                                            <span className={styles.meta}>
                                                {SCENARIO.title} · {QUOTE.t}
                                            </span>
                                            <q>{QUOTE.text}</q>
                                        </div>
                                    </div>
                                    <div className={styles.input}>Ask about this meeting…</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ol className={styles.steps}>
                        {STEPS.map((step, i) => (
                            <li key={step.n} className={styles.step} data-step={i + 1}>
                                <span className="chip">{step.n}</span>
                                <h3 className={`display ${styles.stepTitle}`}>{step.title}</h3>
                                <p className={styles.body}>{step.body}</p>
                                <ul className={styles.facts}>
                                    {step.facts.map(fact => (
                                        <li key={fact}>{fact}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
