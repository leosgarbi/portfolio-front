type RateLimitEntry = {
  count: number;
  resetTime: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hora
const MAX_REQUESTS = 3; // 3 emails por hora por IP

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Se não existe ou expirou, criar novo
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return true; // Permitir
  }

  // Se ainda está na janela
  if (entry.count < MAX_REQUESTS) {
    entry.count++;
    return true; // Permitir
  }

  return false; // Bloquear
}

export function getRateLimitInfo(ip: string) {
  const entry = rateLimitMap.get(ip);
  if (!entry) return null;

  const now = Date.now();
  if (now > entry.resetTime) {
    return null;
  }

  return {
    remaining: Math.max(0, MAX_REQUESTS - entry.count),
    resetTime: entry.resetTime,
  };
}
