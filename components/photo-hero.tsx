"use client"

import { useEffect, useState } from "react"
import { Camera, Video, Award } from "lucide-react"

export function PhotoHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-7xl w-full mx-auto text-center">
        <div
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        >
          <h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 animate-glow"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            VISUAL STORYTELLER
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground/90">Photography & Videography</h2>
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Capturando momentos únicos e criando narrativas visuais que inspiram e emocionam
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Camera, label: "Fotografia", count: "500+ Shoots" },
            { icon: Video, label: "Videografia", count: "200+ Videos" },
            { icon: Award, label: "Premiações", count: "15 Awards" },
          ].map((item, i) => (
            <div
              key={i}
              className="glass-effect p-6 rounded-2xl hover:bg-primary/10 transition-all duration-300 hover:scale-105 group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <item.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">{item.label}</h3>
              <p className="text-muted-foreground">{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
