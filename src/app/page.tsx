import { Navigation } from '@/components/navigation';
import NoiseBackground from '@/components/noise-background';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Hero } from '@/components/sections/hero';
import { Skills } from '@/components/sections/skills';

export default function Page() {
  return (
    <main className='relative min-h-screen overflow-hidden'>
      <Navigation />
      <NoiseBackground />
      <Hero />
      <About />
      <Skills />
      {/* <Projects /> */}
      <Contact />
    </main>
  );
}
