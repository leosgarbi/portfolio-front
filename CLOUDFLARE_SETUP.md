# 🔐 Integração Cloudflare Turnstile

## ✅ O que foi implementado

Integração completa do **Cloudflare Turnstile** (seu CAPTCHA no painel Cloudflare) no formulário. Não intrusivo, gratuito até 1M requisições.

---

## 📋 Passo a Passo de Configuração

### **1. No Cloudflare Dashboard (5 minutos)**

1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
2. Selecione seu domínio
3. Vá em **Ferramentas > Turnstile**
4. Clique em **Criar Site**
5. Preencha:
   ```
   Nome do site: seu-portfolio
   Domínios: leosgarbi.com.br
             localhost:3000 (para desenvolvimento)
   Modo: Gerenciado (recomendado - widget não-intrusivo)
   ```
6. **Copie os valores gerados:**
   - Site Key (pública)
   - Secret Key (privada/segura)

---

### **2. No seu projeto (2 minutos)**

Crie ou atualize o arquivo `.env.local`:

```env
# Chaves públicas (seguro compartilhar no frontend)
NEXT_PUBLIC_CLOUDFLARE_SITE_KEY=seu_site_key_aqui

# Chaves privadas (NUNCA compartilhar, apenas no servidor)
CLOUDFLARE_SECRET_KEY=seu_secret_key_aqui

# Outras variáveis existentes
CONTACT_EMAIL=seu_email@gmail.com
RESEND_API_KEY=sua_chave_resend
```

---

### **3. Pronto! O formulário agora tem:**

✅ **Turnstile obrigatório** antes de enviar
✅ **Validação no backend** do token Turnstile
✅ **Rate limiting por IP** (3 emails/hora)
✅ **Honeypot field** para detectar bots
✅ **Validação de dados** (nome, email, mensagem)
✅ **Bloqueio de 5 minutos** após envio
✅ **Sanitização HTML** contra XSS

---

## 🔍 Como testaria localmente?

```bash
# 1. Parar servidor
Ctrl + C

# 2. Adicionar variáveis ao .env.local
NEXT_PUBLIC_CLOUDFLARE_SITE_KEY=sua_site_key
CLOUDFLARE_SECRET_KEY=sua_secret_key

# 3. Reiniciar servidor
npm run dev

# 4. Acessar http://localhost:3000
# O widget Turnstile aparece automaticamente no formulário
```

---

## 📊 O que cada camada faz

| Camada | O que protege | Onde |
|--------|---------------|------|
| **Turnstile** | Prova que é humano (verifica com Cloudflare) | Frontend + Backend |
| **Honeypot** | Detecta bots automáticos | Frontend |
| **Rate Limiting** | Impede spam/força bruta por IP | Backend |
| **Validação** | Rejeita dados malformados | Backend |
| **Sanitização** | Previne XSS/HTML injection | Backend |

---

## 🎨 Customizando o widget

No arquivo `components/sections/contact.tsx`, na função que renderiza o Turnstile:

```typescript
window.turnstile.render('#cf-turnstile', {
  sitekey: process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY,
  theme: 'dark',        // ou 'light'
  size: 'normal',       // ou 'compact'
  language: 'pt-BR',    // Português
});
```

---

## 🚨 Erros comuns

### ❌ "Token de segurança ausente"
- Widget Turnstile não carregou
- Verifique: variável `NEXT_PUBLIC_CLOUDFLARE_SITE_KEY` está no `.env.local`?
- Verifique: Script do Turnstile está carregando (inspecionar Network no DevTools)

### ❌ "Falha na verificação de segurança"
- Site Key ou Secret Key está errada
- Verifique no dashboard Cloudflare se os domínios estão corretos
- Certifique-se que está usando a **Secret Key no servidor** (`.env.local`)

### ❌ Widget não aparece
- JavaScript pode estar desabilitado
- Bloquear de conteúdo externo?
- Verificar console do navegador por erros

---

## 📈 Monitorar no Cloudflare

1. Vá em **Ferramentas > Turnstile**
2. Clique no seu site
3. Veja estatísticas:
   - Total de desafios
   - Taxa de sucesso
   - IPs bloqueados
   - Atividades suspeitas

---

## 🔄 Alternativa: Remover Turnstile depois

Se quiser voltar para apenas honeypot + rate limiting:

1. Remova o `<div id='cf-turnstile' />` do formulário
2. Remova o `useEffect` que carrega o script
3. Remova a verificação `verifyTurnstileToken()` da API
4. Remova as variáveis de ambiente

Mas **recomendo manter** - é segurança extra sem incômodo ao usuário!

---

## ✨ Vantagens dessa implementação

- ✅ Gratuito até 1M requisições/mês
- ✅ Gerenciado no Cloudflare (onde você já está)
- ✅ Não intrusivo (modo gerenciado é invisível para humanos)
- ✅ Funciona offline (caching local)
- ✅ Melhor que reCAPTCHA (menos rastreamento)
- ✅ Combina bem com rate limiting

---

**Status:** ✅ Formulário ultra-seguro contra spam, bots e força bruta!
