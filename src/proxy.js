import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Next.js 16 requires 'proxy' instead of 'middleware'
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // 1. Define protected routes
  // Dashboard and receipts API are protected
  const protectedRoutes = ["/dashboard", "/api/receipts"];

  // Check if current path is protected
  const isPathProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isPathProtected) {
    // 2. Check session token (securely from cookies)
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // 3. If no token, redirect to login
    if (!token) {
      const loginUrl = new URL("/", request.url); // Login is at root '/'
      // Add callbackUrl to redirect back after login
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Configuration: Matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth routes)
     * - api/extract (Public AI API - optional, or keep it protected if needed? User didn't specify, but often public. Let's protect it?)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - view (Public receipt view page)
     * - logo (Public assets)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|view|logo|.*\\.png$).*)",
  ],
};
