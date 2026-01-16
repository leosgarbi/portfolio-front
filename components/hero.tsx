"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="max-w-7xl w-full mx-auto text-center">
        <div
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        >
          <h1
            className="text-7xl md:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-glow"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            FRONT-END
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground/90">{"<Developer />"}</h2>
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Criando experiências web únicas e interativas com tecnologias modernas
        </p>

        <div className="flex gap-4 justify-center mb-16 flex-wrap">
          <Button
            size="lg"
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <span className="relative z-10 flex items-center gap-2">
              Ver Projetos
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="glass-effect border-primary/50 hover:border-primary hover:bg-primary/10 bg-transparent"
          >
            Entre em Contato
          </Button>
        </div>

        <div className="flex gap-6 justify-center">
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Twitter, href: "#", label: "Twitter" },
            { icon: Mail, href: "#", label: "Email" },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              aria-label={social.label}
              className="w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300 hover:animate-glow"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <social.icon className="w-5 h-5 text-primary" />
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  )
}
