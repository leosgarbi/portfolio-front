"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const skillCategories = [
    {
      title: "Front-End",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      color: "from-primary to-primary/50",
    },
    {
      title: "3D & Animações",
      skills: ["Three.js", "React Three Fiber", "GSAP", "WebGL", "Canvas API"],
      color: "from-secondary to-secondary/50",
    },
    {
      title: "Back-End & Tools",
      skills: ["Node.js", "GraphQL", "REST APIs", "Git", "Docker"],
      color: "from-accent to-accent/50",
    },
    {
      title: "UI/UX Design",
      skills: ["Figma", "Adobe XD", "Responsive Design", "Accessibility", "Design Systems"],
      color: "from-chart-4 to-chart-4/50",
    },
  ]

  return (
    <section className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-5xl md:text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          HABILIDADES
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, i) => (
            <Card
              key={i}
              className="glass-effect p-8 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <h3 className="text-2xl font-bold mb-6 text-foreground relative z-10">{category.title}</h3>

              <div className="flex flex-wrap gap-2 relative z-10">
                {category.skills.map((skill, j) => (
                  <Badge
                    key={j}
                    variant="secondary"
                    className={`glass-effect transition-all duration-300 ${
                      hoveredIndex === i ? "animate-glow scale-110" : ""
                    }`}
                    style={{ animationDelay: `${j * 0.05}s` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
