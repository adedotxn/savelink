import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const local_token = await request.cookies.has("next-auth.session-token");
  const secure_token = await request.cookies.has(
    "_Secure-next-auth.session-token"
  );
  const token = secure_token || local_token;
  const pathName = request.nextUrl.pathname;

  if (pathName === "/board" && !token) {
    const linksPage = new URL("/signin", request.url);
    return NextResponse.redirect(linksPage);
  }

  if (pathName === "/signin" && token) {
    const signInPage = new URL("/board", request.url);
    return NextResponse.redirect(signInPage);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/board"],
};
