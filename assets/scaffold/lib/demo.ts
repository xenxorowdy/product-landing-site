export type Part = string | { cite: string };

export const SCENARIO = {
    title: 'Weekly product sync',
    lines: [
        { t: '14:02', who: 'Kabir', tone: 'speaker-1', text: 'Okay, launch. Are we still on for the 14th?' },
        { t: '14:09', who: 'You', tone: 'you', text: 'If the pricing page is done by Thursday, yes.' },
        { t: '14:15', who: 'Aditi', tone: 'speaker-2', text: 'Pricing copy is with me. I’ll have it Wednesday.' },
        { t: '14:21', who: 'Kabir', tone: 'speaker-1', text: 'Then the 14th it is. Let’s write that down.' },
        { t: '14:33', who: 'Aditi', tone: 'speaker-2', text: 'I’ll loop in design for the screenshots.' },
        { t: '14:40', who: 'Meera', tone: 'speaker-3', text: 'Can someone send the recap to the sales channel?' },
    ],
    live: { who: 'Kabir', tone: 'speaker-1', text: 'Then the 14th it is' },
    widget: {
        state: 'Recording',
        controls: ['Mic on', 'Audio on', 'Pause'],
        stop: 'Stop',
        chip: '3 people in the call · 0 bots',
        label: 'The floating widget during a meeting',
        clockFrom: 14 * 60 + 21,
    },
    summary:
        'The team confirmed the launch for the 14th, on the condition that the pricing page is live by Thursday. Aditi owns the pricing copy and will deliver it Wednesday. Screenshots for the launch post still have no date.',
    decisions: ['Launch on the 14th', 'The pricing page must be live by Thursday'],
    actions: [
        { task: 'Write the pricing copy', owner: 'Aditi', due: 'Wed', src: '14:15' },
        { task: 'Review the pricing page', owner: 'You', due: 'Thu', src: '14:09' },
        { task: 'Screenshots for the launch post', owner: 'Aditi', due: '—', src: '14:33' },
    ],
    email: { label: 'Follow-up email', subject: 'Launch on the 14th: next steps', action: 'Copy' },
    questions: [
        {
            q: 'When are we launching?',
            answer: [
                'On the 14th. Kabir confirmed it',
                { cite: '14:21' },
                ' once Aditi committed to the pricing copy by Wednesday',
                { cite: '14:15' },
                '.',
            ],
        },
        {
            q: 'Who owns the pricing page?',
            answer: [
                'Aditi is writing the copy and will have it Wednesday',
                { cite: '14:15' },
                '. You made the launch depend on the page being done by Thursday',
                { cite: '14:09' },
                ', so the review is yours.',
            ],
        },
        {
            q: 'What’s still open?',
            answer: [
                'Two things. Aditi will loop in design for the launch screenshots, but no date was set',
                { cite: '14:33' },
                '. And nobody took Meera’s request to send the recap to sales',
                { cite: '14:40' },
                '.',
            ],
        },
    ] as { q: string; answer: Part[] }[],
} as const;

export const STEPS = [
    {
        n: '01',
        title: 'The first moment, in the user’s terms.',
        body: 'What the user does, what the product does in response, and what they can see happening. Concrete verbs, no adjectives.',
        facts: ['A precise detail', 'Another precise detail'],
    },
    {
        n: '02',
        title: 'The thing that happens without being asked.',
        body: 'The output the user would otherwise have written by hand, and where it can go next.',
        facts: ['What it contains', 'Where it exports to'],
    },
    {
        n: '03',
        title: 'The payoff, a week later.',
        body: 'How the stored work comes back: search, questions, reuse. Say how the answer can be checked.',
        facts: ['Grounded in the source', 'One item or all of them'],
    },
] as const;

export const TABS = ['Transcript', 'Brief', 'Ask'] as const;
