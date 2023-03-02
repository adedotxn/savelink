import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = await request.cookies.has("next-auth.session-token");
  const pathName = request.nextUrl.pathname;

  if (pathName !== "/" && !token) {
    const signInPage = new URL("/signin", request.url);
    return NextResponse.redirect(signInPage);
  }

  if (pathName === "/" && !token) {
    const signInPage = new URL("/signin", request.url);
    return NextResponse.redirect(signInPage);
  }

  if (pathName === "/" && token) {
    const linksPage = new URL("/board", request.url);
    return NextResponse.redirect(linksPage);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/board"],
};
