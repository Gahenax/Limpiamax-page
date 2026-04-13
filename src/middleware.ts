import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  
  // SEO Absorption: Redirigir limpiamaxbarcelona.com -> limpiamaxweb.com
  // EXCEPCION: No redirigir rutas de API (Webhooks, etc.) porque servicios como Stripe no siguen redirects.
  if (host.includes("limpiamaxbarcelona.com") && !request.nextUrl.pathname.startsWith('/api/')) {
    const url = request.nextUrl.clone();

    url.host = "limpiamaxweb.com";
    url.port = "";
    url.protocol = "https:";
    return NextResponse.redirect(url, { status: 301 });
  }

  // Security Headers — Aplicar a todas las respuestas normales
  const response = NextResponse.next();

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://cdn.consentmanager.net https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://*.sentry.io",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.consentmanager.net",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https: http:",
    "connect-src 'self' https://api.stripe.com https://*.consentmanager.net https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://*.sentry.io https://wa.me https://www.googletagmanager.com",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.google.com https://cdn.consentmanager.net",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(self)");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"
  ],
};
