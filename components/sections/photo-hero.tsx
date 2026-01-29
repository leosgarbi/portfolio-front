'use client';

import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export function PhotoHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className='relative flex justify-center items-center px-4 pt-20 min-h-screen'>
      <div className='mx-auto w-full max-w-7xl text-center'>
        <div
          className='transition-transform duration-300 ease-out'
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        >
          <h1
            className='bg-clip-text bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 mb-6 font-bold text-transparent text-5xl md:text-8xl animate-glow'
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            HISTÓRIAS EM IMAGENS
          </h1>
          <h2 className='mb-8 font-bold text-foreground/90 text-4xl md:text-6xl'>
            Fotógrafo & Cinegrafista
          </h2>
        </div>

        <p className='mx-auto mb-12 max-w-3xl text-muted-foreground text-xl md:text-2xl leading-relaxed'>
          Capturando momentos únicos, criando narrativas visuais que inspiram e
          emocionam.
        </p>

        <div className='bottom-8 left-1/2 absolute -translate-x-1/2 animate-bounce'>
          <ArrowDown className='w-6 h-6 text-muted-foreground' />
        </div>
      </div>
    </section>
  );
}
