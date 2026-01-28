"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage } from "@/components/LanguageProvider";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔥 Re-check auth on route change
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsLoggedIn(auth === "true");
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsLoggedIn(false);
    router.push("/");
  };

  const linkClass = (path: string) =>
    `text-sm transition ${
      pathname === path
        ? "text-emerald-400"
        : "text-foreground/70 hover:text-foreground"
    }`;

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="font-semibold tracking-tight">
          Sanrakshak<span className="text-emerald-400">AI</span>
        </Link>

        {/* NAV LINKS */}
        <nav className="flex items-center gap-6">
          <Link href="/" className={linkClass("/")}>
            {t("home")}
          </Link>

          <Link href="/about" className={linkClass("/about")}>
            {t("about")}
          </Link>

          <Link href="/how-it-works" className={linkClass("/how-it-works")}>
            {t("howItWorks")}
          </Link>

          {isLoggedIn && (
            <Link href="/dashboard" className={linkClass("/dashboard")}>
              {t("dashboard")}
            </Link>
          )}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {!isLoggedIn ? (
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-1.5 rounded-full border border-white/20 text-sm hover:border-emerald-500 transition"
            >
              {t("login")}
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-full border border-red-400/30 text-sm text-red-400 hover:bg-red-500/10 transition"
            >
              {t("logout")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
