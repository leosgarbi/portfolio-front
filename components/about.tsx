"use client"

import { Card } from "@/components/ui/card"
import { Code2, Rocket, Sparkles, Zap } from "lucide-react"
import { useEffect, useRef } from "react"

export function About() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-8", "duration-1000")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: Code2, label: "Projetos", value: "50+", color: "text-primary" },
    { icon: Rocket, label: "Tecnologias", value: "30+", color: "text-secondary" },
    { icon: Sparkles, label: "Anos de XP", value: "8+", color: "text-accent" },
    { icon: Zap, label: "Café/dia", value: "∞", color: "text-chart-4" },
  ]

  return (
    <section className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div ref={cardRef} className="opacity-0">
          <h2
            className="text-5xl md:text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            SOBRE MIM
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Desenvolvedor front-end sênior apaixonado por criar experiências web que combinam
                <span className="text-primary font-semibold"> design impecável</span> com
                <span className="text-secondary font-semibold"> performance excepcional</span>.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Especializado em React, Next.js, TypeScript e animações 3D com Three.js. Transformo ideias complexas em
                interfaces intuitivas e memoráveis.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Quando não estou codificando, você me encontra explorando novas tecnologias, contribuindo em projetos
                open source ou tomando meu café infinito ☕
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <Card
                  key={i}
                  className="glass-effect p-6 hover:scale-105 hover:bg-card/80 transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <stat.icon className={`w-8 h-8 mb-4 ${stat.color} group-hover:animate-glow`} />
                  <div className="text-4xl font-bold mb-2 text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
