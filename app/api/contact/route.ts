import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Contato <contato@leosgarbi.com.br>',
      to: [process.env.CONTACT_EMAIL!],
      subject: `Novo contato — ${name}`,
      replyTo: email,
      html: `
    <strong>Nome:</strong> ${name}<br/>
    <strong>Email:</strong> ${email}<br/><br/>
    <strong>Mensagem:</strong><br/>
    ${message}
  `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Erro ao enviar email' }, { status: 500 });
  }
}
