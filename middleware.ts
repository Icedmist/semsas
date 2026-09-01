import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const isAdminHost = host.startsWith("admin.") || host.startsWith("admin.admin.");

  // Canonical admin host is admin.admin.<domain> in production.
  // Local development accepts localhost and admin.localhost values as well.
  if (pathname.startsWith("/admin")) {
    if (isLocal) {
      if (host.startsWith("admin.") || host.startsWith("admin.admin.")) {
        return NextResponse.next();
      }

      const redirectHost = host.includes("localhost") ? "admin.admin.localhost" : "admin.admin.127.0.0.1";
      return NextResponse.redirect(new URL(pathname, `http://${redirectHost}`), 307);
    }

    if (!isAdminHost) {
      return NextResponse.redirect(`https://admin.admin.${host}${pathname}`, 307);
    }

    return NextResponse.next();
  }

  if (isLocal) {
    if (host.startsWith("admin.") && !pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", request.url), 307);
    }

    return NextResponse.next();
  }

  // If trying to access the admin route through the main domain or a single-admin host,
  // redirect to the canonical admin.admin.<domain> route.
  if ((host.startsWith("admin.") && !host.startsWith("admin.admin.")) || !host.includes(".")) {
    const baseHost = host.replace(/^admin\./, "");
    return NextResponse.redirect(`https://admin.admin.${baseHost}/admin`, 307);
  }

  if (host.startsWith("admin.admin.") && !pathname.startsWith("/admin")) {
    return NextResponse.redirect(`https://${host}/admin`, 307);
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
