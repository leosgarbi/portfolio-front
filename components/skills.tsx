'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

export function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const skillCategories = [
    {
      title: 'Front-End',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Tailwind UI'],
      color: 'from-primary to-primary/50',
    },

    {
      title: 'Infraestrutura & Integração',
      skills: ['Node.js', 'AWS', 'MongoDB', 'Git', 'Docker', 'Virtual Machine'],
      color: 'from-accent to-accent/50',
    },
    {
      title: 'UI/UX Design',
      skills: [
        'Figma',
        'Responsive Design',
        'Accessibility',
        'Design Systems',
        'UI Libraries',
      ],
      color: 'from-chart-4 to-chart-4/50',
    },
  ];

  return (
    <section className='relative px-4 py-32'>
      <div className='mx-auto max-w-7xl'>
        <h2
          className='bg-clip-text bg-linear-to-r from-secondary to-accent mb-16 font-bold text-transparent text-5xl md:text-6xl text-center'
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          HABILIDADES
        </h2>

        <div className='gap-8 grid md:grid-cols-2 lg:grid-cols-3'>
          {skillCategories.map((category, i) => (
            <Card
              key={i}
              className='group relative p-8 overflow-hidden hover:scale-105 transition-all duration-300 glass-effect'
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <h3 className='z-10 relative mb-6 font-bold text-foreground text-2xl'>
                {category.title}
              </h3>

              <div className='z-10 relative flex flex-wrap gap-2'>
                {category.skills.map((skill, j) => (
                  <Badge
                    key={j}
                    variant='secondary'
                    className={`glass-effect transition-all duration-300 ${
                      hoveredIndex === i ? 'animate-glow scale-110' : ''
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
  );
}
