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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"
  ],
};
