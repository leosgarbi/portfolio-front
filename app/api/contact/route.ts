import { checkRateLimit } from '@/lib/rate-limit';
import { sanitizeString, validateContactForm } from '@/lib/validate';
import { Resend } from 'resend';

async function verifyTurnstileToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.CLOUDFLARE_SECRET_KEY,
          response: token,
        }),
      },
    );

    const data = (await response.json()) as {
      success?: boolean;
      error_codes?: string[];
    };
    return data.success === true;
  } catch (error) {
    console.error('Erro ao verificar Turnstile:', error);
    return false;
  }
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper para extrair IP do request
function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return ip;
}

export async function POST(req: Request) {
  try {
    // ===== SEGURANÇA 1: Rate Limiting por IP =====
    const clientIp = getClientIp(req);
    if (!checkRateLimit(clientIp)) {
      return Response.json(
        { error: 'Muitas requisições. Tente novamente em 1 hora.' },
        { status: 429 },
      );
    }

    // ===== SEGURANÇA 2: Validar Content-Type =====
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return Response.json({ error: 'Content-Type inválido' }, { status: 400 });
    }

    // ===== SEGURANÇA 3: Parsear e validar dados =====
    let body;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: 'JSON inválido' }, { status: 400 });
    }

    const { name, email, message, honeypot, turnstileToken } = body;

    // ===== SEGURANÇA 4: Verificar Turnstile =====
    if (!turnstileToken) {
      return Response.json(
        { error: 'Token de segurança ausente' },
        { status: 400 },
      );
    }

    const isTurnstileValid = await verifyTurnstileToken(turnstileToken);
    if (!isTurnstileValid) {
      return Response.json(
        { error: 'Falha na verificação de segurança. Tente novamente.' },
        { status: 400 },
      );
    }

    // ===== SEGURANÇA 5: Verificar honeypot =====
    if (honeypot) {
      // Bot preencheu o campo oculto - rejeitar silenciosamente
      return Response.json({ success: true });
    }

    // ===== SEGURANÇA 6: Validar e sanitizar dados =====
    const validation = validateContactForm(name, email, message);
    if (!validation.valid) {
      return Response.json(
        { error: 'Dados inválidos: ' + validation.errors.join(', ') },
        { status: 400 },
      );
    }

    const sanitizedName = sanitizeString(name);
    const sanitizedMessage = sanitizeString(message);
    const sanitizedEmail = email.toLowerCase().trim();

    await resend.emails.send({
      from: 'Contato <contato@leosgarbi.com.br>',
      to: [process.env.CONTACT_EMAIL!],
      subject: `Novo contato — ${sanitizedName}`,
      replyTo: sanitizedEmail,
      html: `
        <strong>Nome:</strong> ${sanitizedName}<br/>
        <strong>Email:</strong> ${sanitizedEmail}<br/>
        <strong>IP:</strong> ${clientIp}<br/><br/>
        <strong>Mensagem:</strong><br/>
        ${sanitizedMessage.replace(/\n/g, '<br/>')}
      `,
    });

    return Response.json(
      { success: true, message: 'Email enviado com sucesso!' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return Response.json(
      { error: 'Erro ao processar sua mensagem. Tente novamente.' },
      { status: 500 },
    );
  }
}
