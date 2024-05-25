import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (!session && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }
  if (session && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/service", request.url));
  }

  if (request.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/service", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
