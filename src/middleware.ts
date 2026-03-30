import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

const authMiddleware = withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        const protectedPaths = [
          "/admin", 
          "/dashboard", 
          "/api/stripe/create-account", 
          "/api/stripe/account-session"
        ];
        
        if (protectedPaths.some(p => path.startsWith(p))) {
          return !!token;
        }
        
        return true;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const host = req.headers.get("host") || "";
  
  // SEO Absorption: Redirect BEFORE NextAuth crashes due to UntrustedHost
  if (host.includes("limpiamaxbarcelona.com")) {
    const url = req.nextUrl.clone();
    url.host = "limpiamaxweb.com";
    url.port = "";
    url.protocol = "https:";
    return NextResponse.redirect(url, { status: 301 });
  }

  // @ts-expect-error - NextAuth types mismatch expected NextRequest with underlying request shape
  return authMiddleware(req, event);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"
  ],
};
