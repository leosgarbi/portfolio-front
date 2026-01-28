'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

export function Contact() {
  return (
    <section className='relative px-4 py-32'>
      <div className='mx-auto max-w-4xl'>
        <h2
          className='bg-clip-text bg-linear-to-r from-primary via-secondary to-accent mb-16 font-bold text-transparent text-5xl md:text-6xl text-center'
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          CONTATO
        </h2>

        <Card className='p-8 md:p-12 glass-effect'>
          <div className='gap-12 grid md:grid-cols-2 mb-8'>
            <div className='space-y-6'>
              <a
                href='mailto:seu@email.com'
                className='group flex items-start gap-4 cursor-pointer'
              >
                <div className='flex justify-center items-center bg-primary/20 group-hover:bg-primary/30 rounded-full w-12 h-12 transition-colors group-hover:animate-glow'>
                  <Mail className='w-6 h-6 text-primary' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold text-foreground group-hover:text-primary text-lg transition-colors'>
                    Email
                  </h3>
                  <p className='text-muted-foreground'>seu@email.com</p>
                </div>
              </a>

              <a
                href='https://linkedin.com/in/seu-perfil'
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-start gap-4 cursor-pointer'
              >
                <div className='flex justify-center items-center bg-secondary/20 group-hover:bg-secondary/30 rounded-full w-12 h-12 transition-colors group-hover:animate-glow'>
                  <Linkedin className='w-6 h-6 text-secondary' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold text-foreground group-hover:text-secondary text-lg transition-colors'>
                    LinkedIn
                  </h3>
                  <p className='text-muted-foreground'>
                    linkedin.com/in/seu-perfil
                  </p>
                </div>
              </a>

              <a
                href='https://github.com/seu-usuario'
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-start gap-4 cursor-pointer'
              >
                <div className='flex justify-center items-center bg-accent/20 group-hover:bg-accent/30 rounded-full w-12 h-12 transition-colors group-hover:animate-glow'>
                  <Github className='w-6 h-6 text-accent' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold text-foreground group-hover:text-accent text-lg transition-colors'>
                    GitHub
                  </h3>
                  <p className='text-muted-foreground'>
                    github.com/seu-usuario
                  </p>
                </div>
              </a>
            </div>

            <form className='space-y-4'>
              <Input
                placeholder='Seu nome'
                className='bg-card/50 border-primary/30 focus:border-primary glass-effect'
              />
              <Input
                type='email'
                placeholder='Seu email'
                className='bg-card/50 border-primary/30 focus:border-primary glass-effect'
              />
              <Textarea
                placeholder='Sua mensagem'
                rows={4}
                className='bg-card/50 border-primary/30 focus:border-primary resize-none glass-effect'
              />
              <Button
                type='submit'
                className='group bg-linear-to-r from-primary via-secondary to-accent hover:opacity-90 w-full text-primary-foreground'
                size='lg'
              >
                <Send className='mr-2 w-4 h-4 transition-transform group-hover:translate-x-1' />
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </Card>

        <p className='mt-12 text-muted-foreground text-center'>
          © 2026 Front-End Developer. Feito com paixão e muito café
        </p>
      </div>
    </section>
  );
}
