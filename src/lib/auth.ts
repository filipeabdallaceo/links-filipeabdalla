export const SESSION_COOKIE = "dashboard_session";

const SALT = "filipe-abdalla-static-salt-v1";

export async function sessionToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`${password}::${SALT}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function expectedToken(): Promise<string | null> {
  const pw = process.env.DASHBOARD_PASSWORD;
  if (!pw) return null;
  return sessionToken(pw);
}
