"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useState } from "react"

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects = [
    {
      title: "E-commerce 3D",
      description: "Loja virtual com visualização 3D interativa de produtos usando Three.js",
      tech: ["Next.js", "Three.js", "Stripe", "TypeScript"],
      gradient: "from-primary to-secondary",
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard em tempo real com gráficos animados e visualização de dados complexos",
      tech: ["React", "D3.js", "WebSocket", "Tailwind"],
      gradient: "from-secondary to-accent",
    },
    {
      title: "Portfolio Interativo",
      description: "Site portfolio com animações avançadas e experiência imersiva",
      tech: ["Next.js", "Framer Motion", "GSAP", "R3F"],
      gradient: "from-accent to-chart-4",
    },
    {
      title: "App de IA",
      description: "Aplicação com integração de IA para geração de conteúdo e assistente virtual",
      tech: ["Next.js", "OpenAI", "Vercel AI", "Prisma"],
      gradient: "from-chart-4 to-primary",
    },
  ]

  return (
    <section className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-5xl md:text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-accent to-chart-4"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          PROJETOS
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <Card
              key={i}
              className="glass-effect p-8 group relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`}
              />

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, j) => (
                    <Badge
                      key={j}
                      variant="outline"
                      className={`border-primary/50 transition-all duration-300 ${
                        hoveredProject === i ? "animate-glow border-primary" : ""
                      }`}
                      style={{ animationDelay: `${j * 0.05}s` }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button size="sm" className="group/btn bg-primary hover:bg-primary/90 text-primary-foreground">
                    <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Demo
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-effect border-primary/50 hover:border-primary bg-transparent"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Código
                  </Button>
                </div>
              </div>

              <div
                className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-30 blur-3xl transition-all duration-500 group-hover:scale-150`}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
