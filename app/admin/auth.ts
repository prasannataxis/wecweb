// Temporary client-side admin login. The site is a static export, so this only keeps
// casual visitors out — it is NOT real security. Replace `verifyCredentials` with a
// call to the Phase 2 backend (e.g. Supabase Auth) and keep the rest as-is.

export const DEFAULT_ADMIN_USERNAME = "admin";
// SHA-256 of the default password "admin"
const DEFAULT_ADMIN_PASSWORD_SHA256 = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

const SESSION_KEY = "wl-admin-session";
const SESSION_HOURS = 8;

async function sha256Hex(text: string) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyCredentials(username: string, password: string) {
  const hash = await sha256Hex(password);
  return username.trim().toLowerCase() === DEFAULT_ADMIN_USERNAME && hash === DEFAULT_ADMIN_PASSWORD_SHA256;
}

export function startSession(username: string) {
  const expires = Date.now() + SESSION_HOURS * 3600 * 1000;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username, expires }));
}

export function readSession(): { username: string } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as { username: string; expires: number };
    if (Date.now() > s.expires) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return { username: s.username };
  } catch {
    return null;
  }
}

export function endSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
