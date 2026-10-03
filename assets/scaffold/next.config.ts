import type { NextConfig } from 'next';

const root = __dirname;

const nextConfig: NextConfig = {
    turbopack: { root },
    outputFileTracingRoot: root,
    poweredByHeader: false,
};

export default nextConfig;
