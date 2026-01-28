'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'E-commerce 3D',
      description:
        'Loja virtual com visualização 3D interativa de produtos usando Three.js',
      tech: ['Next.js', 'Three.js', 'Stripe', 'TypeScript'],
      gradient: 'from-primary to-secondary',
    },
    {
      title: 'Dashboard Analytics',
      description:
        'Dashboard em tempo real com gráficos animados e visualização de dados complexos',
      tech: ['React', 'D3.js', 'WebSocket', 'Tailwind'],
      gradient: 'from-secondary to-accent',
    },
    {
      title: 'Portfolio Interativo',
      description:
        'Site portfolio com animações avançadas e experiência imersiva',
      tech: ['Next.js', 'Framer Motion', 'GSAP', 'R3F'],
      gradient: 'from-accent to-chart-4',
    },
    {
      title: 'App de IA',
      description:
        'Aplicação com integração de IA para geração de conteúdo e assistente virtual',
      tech: ['Next.js', 'OpenAI', 'Vercel AI', 'Prisma'],
      gradient: 'from-chart-4 to-primary',
    },
  ];

  return (
    <section className='relative px-4 py-32'>
      <div className='mx-auto max-w-7xl'>
        <h2
          className='bg-clip-text bg-linear-to-r from-accent to-chart-4 mb-16 font-bold text-transparent text-5xl md:text-6xl text-center'
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          PROJETOS
        </h2>

        <div className='gap-8 grid md:grid-cols-2'>
          {projects.map((project, i) => (
            <Card
              key={i}
              className='group relative p-8 overflow-hidden cursor-pointer glass-effect'
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`}
              />

              <div className='z-10 relative'>
                <h3 className='mb-4 font-bold text-foreground group-hover:text-primary text-3xl transition-colors'>
                  {project.title}
                </h3>

                <p className='mb-6 text-muted-foreground leading-relaxed'>
                  {project.description}
                </p>

                <div className='flex flex-wrap gap-2 mb-6'>
                  {project.tech.map((tech, j) => (
                    <Badge
                      key={j}
                      variant='outline'
                      className={`border-primary/50 transition-all duration-300 ${
                        hoveredProject === i
                          ? 'animate-glow border-primary'
                          : ''
                      }`}
                      style={{ animationDelay: `${j * 0.05}s` }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className='flex gap-4'>
                  <Button
                    size='sm'
                    className='group/btn bg-primary hover:bg-primary/90 text-primary-foreground'
                  >
                    <ExternalLink className='mr-2 w-4 h-4 group-hover/btn:scale-110 transition-transform' />
                    Demo
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    className='bg-transparent border-primary/50 hover:border-primary glass-effect'
                  >
                    <Github className='mr-2 w-4 h-4' />
                    Código
                  </Button>
                </div>
              </div>

              <div
                className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-linear-to-br ${project.gradient} opacity-0 group-hover:opacity-30 blur-3xl transition-all duration-500 group-hover:scale-150`}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
