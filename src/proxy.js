import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SECRET);

export async function proxy(req) {
  const { pathname } = req.nextUrl;
  console.log("PN", pathname);

  // Allow auth APIs
  if (
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/signup") ||
    pathname.startsWith("/api/logout")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  // Home page logic
  if (pathname === "/") {
    if (!token) return NextResponse.next();

    try {
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/journal", req.url));
    } catch {
      return NextResponse.next();
    }
  }

  // Protect journal pages
  if (pathname.startsWith("/api/journal")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      console.log("WEIRD")
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      console.log("INVALID TOKEN");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/api/journal/:path*", "/api/:path*"],
};