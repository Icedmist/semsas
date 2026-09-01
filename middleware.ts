import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Check if this is a request to the admin dashboard
  // Admin should only be accessible via admin.domain or admin subdomain
  if (pathname.startsWith("/admin")) {
    // For development/localhost, allow both paths
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
      return NextResponse.next();
    }

    // For production, only allow admin subdomain
    if (!host.startsWith("admin.")) {
      // Redirect to admin subdomain or show 404
      return NextResponse.redirect(`https://admin.${host}${pathname}`, 307);
    }
  }

  // If trying to access admin via admin subdomain at main routes, redirect properly
  if (host.startsWith("admin.") && !pathname.startsWith("/admin")) {
    return NextResponse.redirect(`https://admin.${host}/admin`, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
