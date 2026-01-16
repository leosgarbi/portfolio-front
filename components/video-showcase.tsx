"use client"

import { Play, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

const videos = [
  {
    title: "Cinematográfico - Casamento",
    category: "Wedding",
    duration: "3:45",
    thumbnail: "/cinematic-wedding-video.jpg",
    awards: 2,
  },
  {
    title: "Comercial - Moda",
    category: "Commercial",
    duration: "1:30",
    thumbnail: "/fashion-commercial-video.jpg",
    awards: 1,
  },
  {
    title: "Documentário - Viagem",
    category: "Documentary",
    duration: "5:20",
    thumbnail: "/travel-documentary-video.jpg",
    awards: 3,
  },
  {
    title: "Música - Clipe",
    category: "Music Video",
    duration: "4:15",
    thumbnail: "/music-video-production.png",
    awards: 0,
  },
  {
    title: "Corporativo - Tech",
    category: "Corporate",
    duration: "2:00",
    thumbnail: "/tech-corporate-video.jpg",
    awards: 1,
  },
  {
    title: "Drone - Aéreo",
    category: "Aerial",
    duration: "2:45",
    thumbnail: "/drone-aerial-cinematography.jpg",
    awards: 2,
  },
]

export function VideoShowcase() {
  return (
    <section className="relative py-20 px-4 mb-20">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-5xl md:text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          VIDEOGRAFIA
        </h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">Narrativas visuais em movimento</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, i) => (
            <div
              key={i}
              className="group relative glass-effect rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-black ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-effect text-sm font-semibold">
                  {video.duration}
                </div>

                {/* Awards Badge */}
                {video.awards > 0 && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500/90 text-white text-sm font-semibold flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    {video.awards}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{video.category}</span>
                <h3 className="text-xl font-bold mt-2 mb-4 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                >
                  Assistir Agora
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
