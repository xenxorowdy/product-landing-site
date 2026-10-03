export const SITE = {
    name: 'Product',
    slug: 'product',
    wordmark: 'PRODUCT',
    title: 'Product — The promise in four words',
    shortTitle: 'Product — The promise in four words',
    description: 'One plain sentence on what it does, for whom, and the thing that sets it apart.',
    tagline: 'The promise in four words.',
    eyebrow: 'Category line for the hero',
    headline: { lead: 'The promise,', accent: 'kept.' },
    lead: 'Two sentences at most: what the product does, then what you get from it that you could not get before.',
    note: 'Free to start · Platform note',
    themeColor: '#f5f5f0',
    cta: { label: 'Download', heroLabel: 'Download the app', href: '#' },
    secondaryCta: { label: 'See how it works', href: '#how' },
    releasesUrl: '#',
} as const;

export const NAV = [
    { href: '#how', label: 'How it works' },
    { href: '#ask', label: 'Ask' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' },
];

export const TICKER = [
    { text: 'The claim you can stand behind', voice: 'serif' },
    { text: 'Platforms · formats · integrations', voice: 'tech' },
    { text: 'The second claim', voice: 'serif' },
    { text: 'The spec that proves it', voice: 'tech' },
] as const;

export const PLANS = {
    free: {
        name: 'Free',
        features: ['Limit stated exactly as the product enforces it', 'Second free feature', 'Third free feature'],
    },
    pro: {
        name: 'Pro',
        usd: 10,
        inr: 499,
        features: ['Unlimited use', 'Feature the free plan lacks', 'Another one'],
    },
    enterprise: {
        name: 'Enterprise',
        features: ['Volume licensing', 'Custom contracts and invoicing', 'Deployment support'],
    },
} as const;

export const FAQ = [
    { q: 'The question people actually ask first?', a: 'A direct answer, checked against the product or its README.' },
    { q: 'Which platforms are supported?', a: 'Exactly the builds that ship today, and what is not available yet.' },
    { q: 'Where does my data go?', a: 'State the real boundary, including the parts that leave the device.' },
];
