import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const local_token = await request.cookies.has("next-auth.session-token");
  const secure_token = await request.cookies.has(
    "_Secure-next-auth.session-token"
  );
  const token = secure_token || local_token;
  const pathName = request.nextUrl.pathname;

  if (pathName === "/" && token) {
    const boardPage = new URL("/board", request.url);
    return NextResponse.redirect(boardPage);
  }

  if (pathName === "/" && !token) {
    const signIn = new URL("/signin", request.url);
    return NextResponse.redirect(signIn);
  }

  if (pathName === "/board" && !token) {
    const signIn = new URL("/signin", request.url);
    return NextResponse.redirect(signIn);
  }

  if (pathName === "/signin" && token) {
    const boardPage = new URL("/board", request.url);
    return NextResponse.redirect(boardPage);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/board"],
};
