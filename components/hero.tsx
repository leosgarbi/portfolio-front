'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, Twitter } from 'lucide-react';
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
          Criando experiências web únicas e interativas com tecnologias modernas
        </p>

        <div className='flex flex-wrap justify-center gap-4 mb-16'>
          <Button
            size='lg'
            className='group relative bg-primary hover:bg-primary/90 overflow-hidden text-primary-foreground'
          >
            <span className='z-10 relative flex items-center gap-2'>
              Ver Projetos
              <ArrowDown className='w-4 h-4 transition-transform group-hover:translate-y-1' />
            </span>
            <span className='absolute inset-0 bg-linear-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity' />
          </Button>

          <Button
            size='lg'
            variant='outline'
            className='bg-transparent hover:bg-primary/10 border-primary/50 hover:border-primary glass-effect'
          >
            Entre em Contato
          </Button>
        </div>

        <div className='flex justify-center gap-6'>
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Twitter, href: '#', label: 'Twitter' },
            { icon: Mail, href: '#', label: 'Email' },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              aria-label={social.label}
              className='flex justify-center items-center hover:bg-primary/20 rounded-full w-12 h-12 hover:scale-110 transition-all hover:animate-glow duration-300 glass-effect'
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <social.icon className='w-5 h-5 text-primary' />
            </a>
          ))}
        </div>
      </div>

      <div className='bottom-8 left-1/2 absolute -translate-x-1/2 animate-bounce'>
        <ArrowDown className='w-6 h-6 text-muted-foreground' />
      </div>
    </section>
  );
}
