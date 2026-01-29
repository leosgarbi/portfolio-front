'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile: {
      render: (selector: string, options: any) => string;
      reset: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string | undefined;
    };
  }
}

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.turnstile) {
        setTimeout(() => {
          const widgetId = window.turnstile.render('#cf-turnstile', {
            sitekey: process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY,
            theme: 'dark',
          });
          turnstileRef.current = widgetId;
          setTurnstileReady(true);
        }, 100);
      }
    };
    document.head.appendChild(script);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Prevenir múltiplos envios
    if (submitted) {
      setError(
        'Você já enviou um formulário. Aguarde antes de enviar novamente.',
      );
      return;
    }

    // Verificar token do Turnstile
    const token = window.turnstile?.getResponse(
      turnstileRef.current || undefined,
    );
    if (!token) {
      setError('Por favor, complete a verificação de segurança.');
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      honeypot: formData.get('website'),
      turnstileToken: token,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao enviar mensagem');
        setSuccess(false);
        return;
      }

      setSuccess(true);
      setError(null);
      setSubmitted(true);
      e.currentTarget.reset();

      // Reset Turnstile
      if (turnstileRef.current && window.turnstile) {
        window.turnstile.reset(turnstileRef.current);
      }

      // Permitir novo envio após 5 minutos
      setTimeout(() => setSubmitted(false), 5 * 60 * 1000);
    } catch (err) {
      setError(
        'Erro ao processar sua mensagem. Verifique sua conexão e tente novamente.',
      );
      setSuccess(false);
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
            <form ref={formRef} onSubmit={handleSubmit} className='space-y-4'>
              {/* Honeypot field (invisible para usuários, roda bots) */}
              <input
                type='text'
                name='website'
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete='off'
              />

              <Input
                name='name'
                placeholder='Seu nome'
                required
                disabled={submitted || loading}
                className='bg-card/50 border-primary/30 focus:border-primary glass-effect'
              />
              <Input
                name='email'
                type='email'
                placeholder='Seu email'
                required
                disabled={submitted || loading}
                className='bg-card/50 border-primary/30 focus:border-primary glass-effect'
              />
              <Textarea
                name='message'
                placeholder='Sua mensagem'
                rows={4}
                required
                disabled={submitted || loading}
                className='bg-card/50 border-primary/30 focus:border-primary resize-none glass-effect'
              />

              {/* Cloudflare Turnstile */}
              <div id='cf-turnstile' className='flex justify-center my-4' />

              <Button
                type='submit'
                size='lg'
                disabled={loading || submitted}
                className='group bg-linear-to-r from-primary via-secondary to-accent hover:opacity-90 w-full text-primary-foreground'
              >
                <Send className='mr-2 w-4 h-4 transition-transform group-hover:translate-x-1' />
                {loading
                  ? 'Enviando...'
                  : submitted
                    ? 'Mensagem enviada! ✓'
                    : 'Enviar Mensagem'}
              </Button>

              {success && !error && (
                <div className='bg-green-500/10 p-3 border border-green-500/30 rounded'>
                  <p className='text-green-600 dark:text-green-400 text-sm'>
                    ✓ Mensagem enviada com sucesso! Obrigado pelo contato.
                  </p>
                </div>
              )}

              {error && (
                <div className='bg-red-500/10 p-3 border border-red-500/30 rounded'>
                  <p className='text-red-600 dark:text-red-400 text-sm'>
                    {error}
                  </p>
                </div>
              )}

              {submitted && (
                <p className='pt-2 text-muted-foreground text-xs text-center'>
                  Você pode enviar outro formulário em 5 minutos
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
