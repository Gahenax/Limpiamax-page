/**
 * Simple in-memory rate limiter.
 * Uses a sliding window per IP address.
 */

interface RateEntry {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateEntry>();

/**
 * Returns true if the request is allowed, false if rate-limited.
 * @param key     Unique key (e.g. IP address)
 * @param limit   Max requests per window
 * @param windowMs  Window duration in ms (default 60 000 = 1 min)
 */
export function rateLimit(key: string, limit: number, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.windowStart > windowMs) {
    store.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}

/**
 * Extracts a best-effort IP from Next.js request headers.
 */
export function getClientIp(request: Request): string {
  const forwarded = (request.headers as Headers).get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return 'unknown';
}
