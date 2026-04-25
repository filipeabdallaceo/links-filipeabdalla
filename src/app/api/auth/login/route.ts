import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sessionToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const from = String(form.get("from") ?? "/dashboard");

  if (!password || password !== process.env.DASHBOARD_PASSWORD) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard/login";
    url.searchParams.set("error", "1");
    if (from && from !== "/dashboard") url.searchParams.set("from", from);
    return NextResponse.redirect(url, { status: 302 });
  }

  const token = await sessionToken(password);
  const safeFrom = from.startsWith("/dashboard") ? from : "/dashboard";
  const res = NextResponse.redirect(new URL(safeFrom, req.url), { status: 302 });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  });
  return res;
}
