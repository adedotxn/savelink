import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = await request.cookies.has("next-auth.session-token");
  const pathName = request.nextUrl.pathname;

  if (token) {
    const linksPage = new URL("/board", request.url);
    return NextResponse.redirect(linksPage);
  }

  if (!token) {
    const signInPage = new URL("/signin", request.url);
    return NextResponse.redirect(signInPage);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/board", "/v1/:path*"],
};
