import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, expectedToken } from "@/lib/auth";

/**
 * Subdomain → internal path mapping.
 * Each landing lives at its own path inside the same Next.js app, but is served
 * via a dedicated subdomain so the URL the user sees stays clean.
 */
const HOST_TO_PATH: Record<string, string> = {
  "mentoria.filipeabdalla.com": "/mentoria-express",
  "aula.filipeabdalla.com": "/aula-bonus",
  "proximas-turmas.filipeabdalla.com": "/proximas-turmas",
};

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;
  // strip any trailing :port from host header
  const host = (req.headers.get("host") ?? "").split(":")[0];

  // 1) Subdomain landing routing - only rewrites the root path so deep links
  //    (and asset/api paths) still work normally on the same domain.
  const targetPath = HOST_TO_PATH[host];
  if (targetPath && (pathname === "/" || pathname === "")) {
    url.pathname = targetPath;
    return NextResponse.rewrite(url);
  }

  // 2) Dashboard auth - protect /dashboard, allow /dashboard/login + /api/auth.
  if (pathname.startsWith("/dashboard")) {
    if (pathname === "/dashboard/login") {
      return NextResponse.next();
    }

    const cookie = req.cookies.get(SESSION_COOKIE)?.value;
    const expected = await expectedToken();

    if (!cookie || !expected || cookie !== expected) {
      url.pathname = "/dashboard/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run on every path except:
     *  - Next internals (_next/static, _next/image, _next/data)
     *  - Public images served from /img
     *  - favicon
     *  - /api routes (they handle their own logic)
     */
    "/((?!_next/static|_next/image|_next/data|img|favicon\\.ico|api).*)",
  ],
};
