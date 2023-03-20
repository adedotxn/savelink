export { default } from "next-auth/middleware";

export const config = { matcher: ["/board", "/v1/:path*"] };
