"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  FileText,
  Activity,
  AlertTriangle,
  UserCheck,
  Gavel,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const navItems = [
  { key: "overview", href: "/dashboard", icon: LayoutGrid },
  { key: "licenses", href: "/dashboard/licenses", icon: FileText },
  { key: "monitoring", href: "/dashboard/monitoring", icon: Activity },
  { key: "alerts", href: "/dashboard/alerts", icon: AlertTriangle },
  { key: "humanReview", href: "/dashboard/review", icon: UserCheck },
  { key: "enforcement", href: "/dashboard/enforcement", icon: Gavel },
  { key: "settings", href: "/dashboard/settings", icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <aside className="w-64 min-h-screen border-r border-white/10 bg-black/50 backdrop-blur-xl flex flex-col">
      
      {/* LOGO */}
      <div className="px-6 py-6 text-lg font-semibold tracking-tight">
        Sanrakshak<span className="text-emerald-400">AI</span>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ key, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={key}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition
                ${
                  active
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                }`}
            >
              <Icon className="h-4 w-4" />
              {t(key)}
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="px-3 pb-6">
        <button
          onClick={() => router.push("/")}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm
                     text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut className="h-4 w-4" />
          {t("logout")}
        </button>
      </div>
    </aside>
  );
}
