# 🔒 Segurança do Formulário de Contato - Guia Implementado

## ✅ O que foi implementado

### 1. **Rate Limiting (Essencial)**
**Arquivo:** `lib/rate-limit.ts`
- **Limite:** 3 emails por hora por IP
- **Funciona:** Mesmo se usuário recarregar página ou limpar cookies
- **Resposta:** Status 429 (Too Many Requests)
- **Em produção:** Usar Redis em vez de memória para persistência entre deploys

```
Se ultrapassar: "Muitas requisições. Tente novamente em 1 hora."
```

---

### 2. **Honeypot Field (Anti-Bot)**
**Arquivo:** `components/sections/contact.tsx`
- **O que é:** Campo invisível `name="website"` que apenas bots preenchem
- **Como funciona:** Bots tentam preencher campos com nomes genéricos
- **Resultado:** Se preenchido, email é rejeitado silenciosamente (retorna sucesso fake)
- **Usuários não veem:** Está escondido com `display: none`

---

### 3. **Validação Robusta de Dados**
**Arquivo:** `lib/validate.ts`

#### Validações implementadas:
✓ **Email:** Padrão RFC5322 básico + max 254 caracteres
✓ **Nome:** 2-100 caracteres, apenas letras/acentos/espaços/hífen
✓ **Mensagem:** 10-5000 caracteres
✓ **Conteúdo suspeito:** Detecta keywords (viagra, casino, crypto, URLs http://)
✓ **Sanitização HTML:** Escapa `<`, `>`, `&`, quotes para prevenir XSS

#### Rejeitará:
```
❌ "viagra casino"
❌ "click here http://malicious.com"
❌ "Email para bob@"
❌ Mensagens muito curtas ou longas
```

---

### 4. **Proteção no Backend**
**Arquivo:** `app/api/contact/route.ts`

1. **Validação de Content-Type** → Rejeita requisições não-JSON
2. **Extração de IP** → Para rate limiting (headers: `x-forwarded-for`)
3. **Sanitização antes de enviar** → Escapa HTML para segurança
4. **Email em lowercase** → Evita duplicatas por variação de case

---

### 5. **Bloqueio no Frontend**
**Arquivo:** `components/sections/contact.tsx`

- Botão desabilitado após envio por **5 minutos**
- Persiste mesmo se recarregar página via state React
- Campos desabilitados durante envio
- Mensagem clara: "Você pode enviar outro formulário em 5 minutos"

---

## 🎯 Próximos passos (Opcional - Mais Robusto)

### A. **Rate Limiting com Redis (RECOMENDADO para produção)**
```typescript
// Substitua lib/rate-limit.ts com Redis
import redis from '@upstash/redis';

export async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `contact:${ip}`;
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, 3600); // 1 hora
  }

  return current <= 3;
}
```

### B. **Cloudflare Turnstile (CAPTCHA não-intrusivo)**
```typescript
// No formulário:
<input type="hidden" name="cf-turnstile-response" id="cf-turnstile-response" />

// No backend:
const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  body: JSON.stringify({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: body['cf-turnstile-response'],
  }),
});
```

### C. **Banco de Dados para Rastreamento**
```typescript
// Rastrear emails já enviados para evitar duplicatas
const sentEmails = await db.contactSubmissions.findUnique({
  where: { email: sanitizedEmail }
});

if (sentEmails?.createdAt > Date.now() - 24*60*60*1000) {
  return Response.json({ error: 'Já enviou um email recentemente' }, { status: 429 });
}
```

### D. **Headers de Segurança HTTP**
No `next.config.mjs`:
```typescript
async headers() {
  return [
    {
      source: '/api/contact',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        }
      ]
    }
  ]
}
```

---

## 📊 Resumo da Segurança Implementada

| Proteção | Nivel | Implementação |
|----------|-------|--------------|
| Rate Limiting | ⭐⭐⭐⭐⭐ | ✅ Completo |
| Honeypot | ⭐⭐⭐⭐ | ✅ Completo |
| Validação | ⭐⭐⭐⭐ | ✅ Completo |
| Sanitização | ⭐⭐⭐⭐ | ✅ Completo |
| Bloqueio Frontend | ⭐⭐⭐ | ✅ Completo |
| CAPTCHA | ⭐⭐⭐⭐⭐ | ⏳ Opcional |
| Redis Rate Limit | ⭐⭐⭐⭐⭐ | ⏳ Produção |
| DB Tracking | ⭐⭐⭐ | ⏳ Opcional |

---

## 🔍 Como testar

### Teste 1: Rate Limiting
```bash
# Enviar 4 emails rapidamente - o 4º deve falhar
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message"}'
# 4ª requisição: Status 429
```

### Teste 2: Honeypot
```javascript
const payload = {
  name: "Spammer",
  email: "spam@spam.com",
  message: "Buy viagra now",
  honeypot: "filled-by-bot" // Será rejeitado
};
// Response: {"success": true} (fake para confundir bot)
```

### Teste 3: Validação
```javascript
const payload = {
  name: "A", // muito curto
  email: "invalid-email", // formato errado
  message: "short" // muito curto
};
// Response: 400 Bad Request com lista de erros
```

---

## 💡 Dicas para Produção

1. **Migrar para Redis:** Rate limiting em memória não persiste entre deploys
2. **Adicionar Turnstile:** Melhor que reCAPTCHA, gratuito até 1M requisições
3. **Logging:** Rastrear tentativas suspeitas em banco de dados
4. **Email verification:** Enviar link de confirmação antes de processar
5. **CORS restrito:** Aceitar requisições apenas do seu domínio

---

## 📞 Exemplo de erro retornado

```json
{
  "error": "Dados inválidos: Email inválido, Mensagem deve ter entre 10 e 5000 caracteres"
}
```

```json
{
  "error": "Muitas requisições. Tente novamente em 1 hora."
}
```

```json
{
  "error": "Conteúdo suspeito detectado"
}
```

---

**Status:** ✅ Formulário seguro contra spam, força bruta e bots
