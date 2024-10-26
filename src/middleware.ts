import { NextRequest, NextResponse } from "next/server";
import { NextMiddleware } from "next/server";
import { Token } from "@/interfaces/interfaces";

const protectedRoutes = ["/cabinet", "/admin"];

export const middleware: NextMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get(Token.refreshToken);

  const isAuthPage = pathname.includes("login") || pathname.includes("register");
  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL("/cabinet", request.url));
  }

  if (protectedRoutes.includes(pathname) && !refreshToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/cabinet/:path*", "/login/:path*", "/register/:path*", "/admin/:path*"],
};
