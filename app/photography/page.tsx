import { CinemaBackground } from '@/components/cinema-background';
import { GalleryGrid } from '@/components/gallery-grid';
import { Navigation } from '@/components/navigation';
import NoiseBackground from '@/components/noise-background';
import { PhotoHero } from '@/components/photo-hero';
import { VideoShowcase } from '@/components/video-showcase';

export default function PhotographyPage() {
  return (
    <main className='relative min-h-screen overflow-hidden'>
      <CinemaBackground />
      <NoiseBackground />
      <Navigation />
      <PhotoHero />
      <GalleryGrid />
      <VideoShowcase />
    </main>
  );
}
