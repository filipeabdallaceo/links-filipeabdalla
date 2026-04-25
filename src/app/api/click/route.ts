import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getLinkById } from "@/lib/links";
import { detectDevice } from "@/lib/device";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const destOverride = searchParams.get("dest");

  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }

  const link = getLinkById(id);
  const destination =
    link?.href ?? (destOverride && /^https?:\/\//.test(destOverride) ? destOverride : null);

  if (!destination) {
    return NextResponse.json({ error: "unknown link" }, { status: 404 });
  }

  const ua = req.headers.get("user-agent");
  const country =
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ??
    null;
  const referrer = req.headers.get("referer");

  // Fire-and-forget - don't make the user wait on the DB before redirecting
  const sb = getSupabase();
  if (sb) {
    void sb
      .from("clicks")
      .insert({
        link_id: id,
        device: detectDevice(ua),
        country,
        referrer,
        user_agent: ua,
      })
      .then(({ error }) => {
        if (error) console.error("[click] insert failed", error.message);
      });
  }

  return NextResponse.redirect(destination, { status: 302 });
}
