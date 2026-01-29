/**
 * Validação e sanitização de dados do formulário
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUSPICIOUS_PATTERNS = [
  /viagra/i,
  /casino/i,
  /bitcoin/i,
  /crypto/i,
  /lottery/i,
  /click here/i,
  /http:\/\//i, // http não criptografado
];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return EMAIL_REGEX.test(email);
}

export function validateName(name: string): boolean {
  if (!name || name.length < 2 || name.length > 100) return false;
  // Rejeitar apenas números ou caracteres especiais suspeitos
  return /^[a-zA-ZáéíóúãõâêôÁÉÍÓÚÃÕÂÊÔ\s\-'.]+$/.test(name);
}

export function validateMessage(message: string): boolean {
  if (!message || message.length < 10 || message.length > 5000) return false;
  return true;
}

export function checkSuspiciousContent(content: string): boolean {
  // Retorna true se encontrou conteúdo suspeito
  return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(content));
}

export function validateContactForm(
  name: string,
  email: string,
  message: string,
): ValidationResult {
  const errors: string[] = [];

  // Validar nome
  if (!validateName(name)) {
    errors.push('Nome inválido');
  }

  // Validar email
  if (!validateEmail(email)) {
    errors.push('Email inválido');
  }

  // Validar mensagem
  if (!validateMessage(message)) {
    errors.push('Mensagem deve ter entre 10 e 5000 caracteres');
  }

  // Verificar conteúdo suspeito na mensagem
  if (checkSuspiciousContent(message) || checkSuspiciousContent(name)) {
    errors.push('Conteúdo suspeito detectado');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function sanitizeString(str: string): string {
  // Remove caracteres perigosos para HTML
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}
