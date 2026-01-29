import { Navigation } from '@/components/navigation';
import NoiseBackground from '@/components/noise-background';
import { GalleryGrid } from '@/components/sections/gallery-grid';
import { PhotoHero } from '@/components/sections/photo-hero';
import { VideoShowcase } from '@/components/sections/video-showcase';

export default function PhotographyPage() {
  return (
    <main className='relative min-h-screen overflow-hidden'>
      <NoiseBackground />
      <Navigation />
      <PhotoHero />
      <GalleryGrid />
      <VideoShowcase />
    </main>
  );
}
