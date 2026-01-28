import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { Hero } from '@/components/hero';
import { Navigation } from '@/components/navigation';
import NoiseBackground from '@/components/noise-background';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';

export default function Page() {
  return (
    <main className='relative min-h-screen overflow-hidden'>
      <Navigation />
      <NoiseBackground />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
