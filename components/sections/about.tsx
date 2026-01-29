'use client';

import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
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
                Desenvolvedor front-end contribuindo na criação de experiências
                web que combinam
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
                em interfaces intuitivas e memoráveis.
              </p>

              <p className='text-muted-foreground text-lg leading-relaxed'>
                Quando não estou escrevendo código, estou contando histórias
                através da{' '}
                <a
                  href='/photography'
                  className='bg-clip-text bg-linear-to-r from-primary via-secondary-foreground to-secondary underline'
                >
                  fotografia e do vídeo,
                </a>{' '}
                duas formas diferentes de criar experiências.
              </p>
            </div>

            <div className='flex justify-center items-center'>
              <div className='relative group w-full max-w-sm'>
                <div className='absolute -inset-0.5 bg-linear-to-r from-primary to-secondary rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200' />
                <div className='relative p-8 bg-black/50 backdrop-blur-xl border border-white/10 rounded-lg flex flex-col items-center text-center space-y-6'>
                  <div className='p-3 rounded-full bg-white/5 border border-white/10'>
                    <FileText className='w-8 h-8 text-primary' />
                  </div>

                  <div className='space-y-2'>
                    <h3 className='text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/70'>
                      Curriculum Vitae
                    </h3>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      Baixe meu currículo completo para conhecer minha
                      experiência, habilidades técnicas e projetos
                      desenvolvidos.
                    </p>
                  </div>

                  <Button
                    className='w-full group/btn relative overflow-hidden'
                    size='lg'
                    asChild
                  >
                    <a href='/api/download-cv' download='cv_alisson_sgarbi.pdf'>
                      <span className='relative z-10 flex items-center justify-center gap-2'>
                        <Download className='w-4 h-4' />
                        Baixar CV
                      </span>
                      <span className='absolute inset-0 bg-linear-to-r from-primary via-secondary to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300' />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
