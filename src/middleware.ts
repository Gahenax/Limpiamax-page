import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

const authMiddleware = withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // El frontend es público, la seguridad está en el nodo PHP
    },
  }
);

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  // @ts-expect-error - NextAuth types mismatch expected NextRequest
  return authMiddleware(req, event);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"
  ],
};

