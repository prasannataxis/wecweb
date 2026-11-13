"use client";
import { createContext, useContext, useEffect, useState } from "react";
import BrandEmblem from "../components/BrandEmblem";
import { endSession, readSession, startSession, verifyCredentials } from "./auth";

type AdminSession = { username: string; logout: () => void };
const AdminSessionContext = createContext<AdminSession | null>(null);

export function useAdminSession() {
  return useContext(AdminSessionContext);
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;

const fieldClass =
  "w-full bg-luxury-black/60 border border-luxury-border text-luxury-text text-base font-sans px-4 py-3 outline-none transition-all focus:border-gold/60";
const labelClass = "text-xs tracking-[0.2em] uppercase text-gold font-sans font-semibold";

function LoginForm({ onSuccess }: { onSuccess: (username: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [failures, setFailures] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (lockedUntil <= Date.now()) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [lockedUntil]);

  const secondsLeft = Math.max(0, Math.ceil((lockedUntil - now) / 1000));
  const locked = secondsLeft > 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (locked || busy) return;
    setBusy(true);
    setError(null);
    const ok = await verifyCredentials(username, password);
    setBusy(false);
    if (ok) {
      startSession(username.trim());
      onSuccess(username.trim());
      return;
    }
    const next = failures + 1;
    setFailures(next);
    setPassword("");
    if (next >= MAX_ATTEMPTS) {
      setFailures(0);
      setLockedUntil(Date.now() + LOCKOUT_SECONDS * 1000);
      setNow(Date.now());
      setError(`Too many attempts. Try again in ${LOCKOUT_SECONDS} seconds.`);
    } else {
      setError(`Incorrect username or password (${MAX_ATTEMPTS - next} attempt${MAX_ATTEMPTS - next === 1 ? "" : "s"} left).`);
    }
  };

  return (
    <div className="bg-luxury-dark min-h-screen flex items-center justify-center px-4 pt-28 pb-16">
      <form onSubmit={submit} className="border-run luxury-card w-full max-w-md p-8 sm:p-10 flex flex-col gap-5" noValidate>
        <div className="flex flex-col items-center text-center gap-3 mb-2">
          <BrandEmblem className="h-16" />
          <p className="text-xs tracking-[0.4em] uppercase text-gold font-sans font-medium">Admin</p>
          <h1 className="font-serif text-3xl text-luxury-text font-bold">Sign In</h1>
          <p className="text-sm text-luxury-muted font-sans">Site settings are restricted to administrators.</p>
        </div>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
            required
            disabled={locked}
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Password</span>
          <span className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={locked}
              className={`${fieldClass} pr-20`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs tracking-[0.12em] uppercase text-gold font-sans font-semibold"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </span>
        </label>

        {error && (
          <p role="alert" className="text-sm font-sans text-red-400 border border-red-400/40 bg-red-500/10 px-3 py-2">
            {locked ? `Too many attempts. Try again in ${secondsLeft}s.` : error}
          </p>
        )}

        <button
          type="submit"
          disabled={locked || busy || !username || !password}
          className="shine-btn neon-pulse mt-1 py-4 bg-gold-gradient text-on-accent text-sm tracking-[0.25em] uppercase font-sans font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? "Checking…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setUsername(readSession()?.username ?? null);
    setChecked(true);
  }, []);

  const logout = () => {
    endSession();
    setUsername(null);
    window.scrollTo({ top: 0 });
  };

  if (!checked) return <div className="bg-luxury-dark min-h-screen" />;
  if (!username) return <LoginForm onSuccess={setUsername} />;

  return <AdminSessionContext.Provider value={{ username, logout }}>{children}</AdminSessionContext.Provider>;
}
