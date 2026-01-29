'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className='relative flex justify-center items-center px-4 min-h-screen'>
      <div className='mx-auto w-full max-w-7xl text-center'>
        <div
          className='transition-transform duration-300 ease-out'
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        >
          <h1
            className='bg-clip-text bg-linear-to-r from-primary via-secondary to-accent mb-6 font-bold text-transparent text-7xl md:text-9xl animate-glow'
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            FRONT-END
          </h1>
          <h2 className='mb-8 font-bold text-foreground/90 text-5xl md:text-7xl'>
            {'<Developer />'}
          </h2>
        </div>

        <p className='mx-auto mb-12 max-w-2xl text-muted-foreground text-xl md:text-2xl leading-relaxed'>
          Contribuindo na criação de aplicações interativas com tecnologias
          modernas
        </p>

        <div className='flex flex-wrap justify-center gap-4 mb-16'>
          <Button
            size='lg'
            className='group relative bg-primary hover:bg-primary/90 overflow-hidden text-primary-foreground'
          >
            <a
              href='#contact'
              className='z-10 relative flex items-center gap-2'
            >
              Entre em Contato
              {/* <ArrowDown className='w-4 h-4 transition-transform group-hover:translate-y-1' /> */}
            </a>
            <span className='absolute inset-0 bg-linear-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity' />
          </Button>
        </div>
        <div className='bottom-8 left-1/2 absolute -translate-x-1/2 animate-bounce'>
          <ArrowDown className='w-6 h-6 text-muted-foreground' />
        </div>
      </div>
    </section>
  );
}
