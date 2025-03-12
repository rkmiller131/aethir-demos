import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "./app/lib/constants";

export async function middleware(request: NextRequest) {
  // can't just go to /play without a session
  if (request.nextUrl.pathname.startsWith("/play")) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

    // If no valid session cookie, redirect to home
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/landing")) {
    const authToken = request.cookies.get("auth")?.value;
    const isAuthenticated = !!authToken;

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Paths this middleware applies to
export const config = {
  matcher: ["/landing/:path*", "/play/:path*"],
};