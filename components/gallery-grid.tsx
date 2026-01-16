"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ZoomIn } from "lucide-react"

const galleries = [
  {
    id: "portrait",
    title: "Retratos",
    description: "Capturando a essência humana",
    color: "from-purple-500 to-pink-500",
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/placeholder.svg?height=600&width=400&query=professional+portrait+photography+${i + 1}`,
      alt: `Retrato ${i + 1}`,
    })),
  },
  {
    id: "landscape",
    title: "Paisagens",
    description: "A beleza natural em pixels",
    color: "from-green-500 to-blue-500",
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/placeholder.svg?height=400&width=600&query=stunning+landscape+photography+${i + 1}`,
      alt: `Paisagem ${i + 1}`,
    })),
  },
  {
    id: "urban",
    title: "Urbano",
    description: "A vida nas cidades",
    color: "from-orange-500 to-red-500",
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/placeholder.svg?height=600&width=600&query=urban+street+photography+${i + 1}`,
      alt: `Urbano ${i + 1}`,
    })),
  },
  {
    id: "events",
    title: "Eventos",
    description: "Momentos inesquecíveis",
    color: "from-cyan-500 to-purple-500",
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/placeholder.svg?height=500&width=600&query=event+photography+${i + 1}`,
      alt: `Evento ${i + 1}`,
    })),
  },
]

export function GalleryGrid() {
  const [activeGallery, setActiveGallery] = useState("portrait")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const currentGallery = galleries.find((g) => g.id === activeGallery)!

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-5xl md:text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          GALERIAS
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">Explore diferentes universos visuais</p>

        {/* Gallery Tabs */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {galleries.map((gallery) => (
            <Button
              key={gallery.id}
              onClick={() => setActiveGallery(gallery.id)}
              className={`group relative overflow-hidden ${
                activeGallery === gallery.id ? "bg-gradient-to-r " + gallery.color : "glass-effect hover:bg-primary/10"
              }`}
              size="lg"
            >
              <span className="relative z-10">{gallery.title}</span>
              {activeGallery === gallery.id && (
                <span className="absolute inset-0 bg-gradient-to-r opacity-20 group-hover:opacity-30 transition-opacity" />
              )}
            </Button>
          ))}
        </div>

        {/* Gallery Description */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-2">{currentGallery.title}</h3>
          <p className="text-muted-foreground text-lg">{currentGallery.description}</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentGallery.images.map((image, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass-effect cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedImage(image.src)}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${currentGallery.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <Image src={selectedImage || "/placeholder.svg"} alt="Selected image" fill className="object-contain" />
          </div>
        </div>
      )}
    </section>
  )
}
