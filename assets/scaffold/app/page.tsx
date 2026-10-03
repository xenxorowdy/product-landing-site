import { Ask } from '@/components/Ask';
import { Closing } from '@/components/Closing';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Nav } from '@/components/Nav';
import { Pricing } from '@/components/Pricing';
import { Story } from '@/components/Story';

export default function Home() {
    return (
        <>
            <Nav />
            <main id="main">
                <Hero />
                <Marquee />
                <Story />
                <Ask />
                <Pricing />
                <Faq />
                <Closing />
            </main>
            <Footer />
        </>
    );
}
