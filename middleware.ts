import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");

  // Extract base domain (last 2 parts: e.g., gosemsas.org from admin.www.gosemsas.org)
  const hostWithoutPort = host.split(":")[0];
  const domainParts = hostWithoutPort.split(".");
  const baseDomain = domainParts.slice(-2).join(".");

  // Admin routes should be accessible from:
  // 1. localhost or 127.0.0.1 in development
  // 2. admin subdomain in production
  if (pathname.startsWith("/admin")) {
    // Allow from localhost/127.0.0.1 (development)
    if (isLocal) {
      return NextResponse.next();
    }

    // Allow from admin subdomain in production
    if (host.startsWith("admin.")) {
      return NextResponse.next();
    }

    // Redirect to admin.gosemsas.org (removes all subdomains)
    const adminDomain = `admin.${baseDomain}`;
    return NextResponse.redirect(`https://${adminDomain}${pathname}`, 307);
  }

  // Redirect admin subdomain to /admin route if not already there
  if (host.startsWith("admin.")) {
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", request.url), 307);
    }
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
