"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, Linkedin, Github } from "lucide-react"

export function Contact() {
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-5xl md:text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          CONTATO
        </h2>

        <Card className="glass-effect p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 mb-8">
            <div className="space-y-6">
              <a href="mailto:seu@email.com" className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors group-hover:animate-glow">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-foreground group-hover:text-primary transition-colors">
                    Email
                  </h3>
                  <p className="text-muted-foreground">seu@email.com</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/seu-perfil"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors group-hover:animate-glow">
                  <Linkedin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-foreground group-hover:text-secondary transition-colors">
                    LinkedIn
                  </h3>
                  <p className="text-muted-foreground">linkedin.com/in/seu-perfil</p>
                </div>
              </a>

              <a
                href="https://github.com/seu-usuario"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors group-hover:animate-glow">
                  <Github className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-foreground group-hover:text-accent transition-colors">
                    GitHub
                  </h3>
                  <p className="text-muted-foreground">github.com/seu-usuario</p>
                </div>
              </a>
            </div>

            <form className="space-y-4">
              <Input
                placeholder="Seu nome"
                className="glass-effect border-primary/30 focus:border-primary bg-card/50"
              />
              <Input
                type="email"
                placeholder="Seu email"
                className="glass-effect border-primary/30 focus:border-primary bg-card/50"
              />
              <Textarea
                placeholder="Sua mensagem"
                rows={4}
                className="glass-effect border-primary/30 focus:border-primary bg-card/50 resize-none"
              />
              <Button
                type="submit"
                className="w-full group bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-primary-foreground"
                size="lg"
              >
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </Card>

        <p className="text-center text-muted-foreground mt-12">
          © 2026 Front-End Developer. Feito com paixão e muito café
        </p>
      </div>
    </section>
  )
}
