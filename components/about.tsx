'use client';

import { Card } from '@/components/ui/card';
import { Code2, Rocket, Sparkles, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function About() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              'animate-in',
              'fade-in',
              'slide-in-from-bottom-8',
              'duration-1000',
            );
          }
        });
      },
      { threshold: 0.1 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Code2, label: 'Projetos', value: '8+', color: 'text-primary' },
    {
      icon: Rocket,
      label: 'Tecnologias',
      value: '30+',
      color: 'text-secondary',
    },
    { icon: Sparkles, label: 'Anos de XP', value: '3+', color: 'text-accent' },
    { icon: Zap, label: 'Café/dia', value: '∞', color: 'text-chart-4' },
  ];

  return (
    <section className='relative px-4 py-32'>
      <div className='mx-auto max-w-7xl'>
        <div ref={cardRef} className='opacity-100'>
          <h2
            className='bg-clip-text bg-linear-to-r from-primary to-secondary mb-16 font-bold text-transparent text-5xl md:text-6xl text-center'
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            SOBRE MIM
          </h2>

          <div className='items-center gap-12 grid md:grid-cols-2 mb-20'>
            <div className='space-y-6'>
              <p className='text-muted-foreground text-lg leading-relaxed'>
                Desenvolvedor front-end inspirado a criar experiências web que
                combinam
                <span className='font-semibold text-primary'>
                  {' '}
                  design funcional
                </span>{' '}
                com
                <span className='font-semibold text-secondary'>
                  {' '}
                  performance
                </span>
                .
              </p>

              <p className='text-muted-foreground text-lg leading-relaxed'>
                Especializado em React, Next.js, TypeScript. Transformo ideias
                complexas em interfaces intuitivas e memoráveis.
              </p>

              <p className='text-muted-foreground text-lg leading-relaxed'>
                Quando não estou escrevendo código, estou contando histórias
                através da fotografia e do vídeo, duas formas diferentes de
                criar experiências.
              </p>
            </div>

            <div className='gap-6 grid grid-cols-2'>
              {stats.map((stat, i) => (
                <Card
                  key={i}
                  className='group hover:bg-card/80 p-6 hover:scale-105 transition-all duration-300 cursor-pointer glass-effect'
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <stat.icon
                    className={`w-8 h-8 mb-4 ${stat.color} group-hover:animate-glow`}
                  />
                  <div className='mb-2 font-bold text-foreground text-4xl'>
                    {stat.value}
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
