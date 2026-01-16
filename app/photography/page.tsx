import { Navigation } from "@/components/navigation"
import { PhotoHero } from "@/components/photo-hero"
import { GalleryGrid } from "@/components/gallery-grid"
import { VideoShowcase } from "@/components/video-showcase"
import { CinemaBackground } from "@/components/cinema-background"

export default function PhotographyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <CinemaBackground />
      <Navigation />
      <PhotoHero />
      <GalleryGrid />
      <VideoShowcase />
    </main>
  )
}
