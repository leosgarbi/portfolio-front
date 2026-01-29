'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      setSuccess(true);
      e.currentTarget.reset();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id='contact' className='relative px-4 py-32'>
      <div className='mx-auto max-w-4xl'>
        <h2
          className='bg-clip-text bg-linear-to-r from-primary via-secondary to-accent mb-16 font-bold text-transparent text-5xl md:text-6xl text-center'
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          CONTATO
        </h2>

        <Card className='p-8 md:p-12 glass-effect'>
          <div className='gap-12 grid md:grid-cols-2 mb-8'>
            {/* CONTATOS */}
            <div className='space-y-6'>
              <a
                href='mailto:leosgarbi92@gmail.com'
                target='_blank'
                className='group flex items-start gap-4 cursor-pointer'
              >
                <div className='flex justify-center items-center bg-primary/20 group-hover:bg-primary/30 rounded-full w-12 h-12 transition-colors group-hover:animate-glow'>
                  <Mail className='w-6 h-6 text-primary' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold group-hover:text-primary text-lg transition-colors'>
                    Email
                  </h3>
                  <p className='text-muted-foreground'>leosgarbi92@gmail.com</p>
                </div>
              </a>

              <a
                href='https://linkedin.com/in/leosgarbi'
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-start gap-4 cursor-pointer'
              >
                <div className='flex justify-center items-center bg-secondary/20 group-hover:bg-secondary/30 rounded-full w-12 h-12 transition-colors group-hover:animate-glow'>
                  <Linkedin className='w-6 h-6 text-secondary' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold group-hover:text-secondary text-lg transition-colors'>
                    LinkedIn
                  </h3>
                  <p className='text-muted-foreground'>
                    linkedin.com/in/leosgarbi
                  </p>
                </div>
              </a>

              <a
                href='https://github.com/leosgarbi'
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-start gap-4 cursor-pointer'
              >
                <div className='flex justify-center items-center bg-accent/20 group-hover:bg-accent/30 rounded-full w-12 h-12 transition-colors group-hover:animate-glow'>
                  <Github className='w-6 h-6 text-accent' />
                </div>
                <div>
                  <h3 className='mb-1 font-semibold group-hover:text-accent text-lg transition-colors'>
                    GitHub
                  </h3>
                  <p className='text-muted-foreground'>github.com/leosgarbi</p>
                </div>
              </a>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              <Input
                name='name'
                placeholder='Seu nome'
                required
                className='bg-card/50 border-primary/30 focus:border-primary glass-effect'
              />
              <Input
                name='email'
                type='email'
                placeholder='Seu email'
                required
                className='bg-card/50 border-primary/30 focus:border-primary glass-effect'
              />
              <Textarea
                name='message'
                placeholder='Sua mensagem'
                rows={4}
                required
                className='bg-card/50 border-primary/30 focus:border-primary resize-none glass-effect'
              />

              <Button
                type='submit'
                size='lg'
                disabled={loading}
                className='group bg-linear-to-r from-primary via-secondary to-accent hover:opacity-90 w-full text-primary-foreground'
              >
                <Send className='mr-2 w-4 h-4 transition-transform group-hover:translate-x-1' />
                {loading ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>

              {success && (
                <p className='pt-2 text-green-500 text-sm'>
                  Mensagem enviada com sucesso!
                </p>
              )}

              {error && (
                <p className='pt-2 text-red-500 text-sm'>
                  Ocorreu um erro ao enviar. Tente novamente.
                </p>
              )}
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
