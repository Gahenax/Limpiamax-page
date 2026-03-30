import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const host = req.headers.get("host") || "";
    
    // SEO Absorption: Redirect from Barcelona domain to the Unified Web domain
    if (host.includes("limpiamaxbarcelona.com")) {
      const url = req.nextUrl.clone();
      url.host = "limpiamaxweb.com";
      url.port = "";
      url.protocol = "https:";
      return NextResponse.redirect(url, { status: 301 });
    }

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

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"
  ],
};
