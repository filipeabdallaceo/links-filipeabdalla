import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (_client) return _client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn(
      "[supabase] env vars não configuradas — tracking desativado. Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.",
    );
    return null;
  }

  _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}

export type Click = {
  id: string;
  link_id: string;
  device: "mobile" | "tablet" | "desktop";
  country: string | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};
