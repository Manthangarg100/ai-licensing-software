"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/login";
  const isDashboard = pathname.startsWith("/dashboard");
  const isHome = pathname === "/";

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Sanrakshak<span className="text-emerald-400">AI</span>
        </Link>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          {/* HOME (only on login page) */}
          {isLoginPage && (
            <Link
              href="/"
              className="text-sm text-foreground/70 hover:text-foreground transition"
            >
              Home
            </Link>
          )}

          {/* LOGIN (only on homepage) */}
          {isHome && (
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-black text-sm font-medium transition"
            >
              Login
            </Link>
          )}

          {/* LOGOUT (only on dashboard) */}
          {isDashboard && (
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-full border border-white/15 text-sm text-foreground hover:bg-white/10 transition"
            >
              Logout
            </button>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
