"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  FileText,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutGrid },
  { name: "Licenses", href: "/dashboard/licenses", icon: FileText },
  { name: "Monitoring", href: "/dashboard/monitoring", icon: Activity },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col">
      {/* LOGO */}
      <div className="px-6 py-6 text-lg font-semibold tracking-tight">
        Sanrakshak<span className="text-emerald-400">AI</span>
      </div>

      {/* NAV */}
      <nav className="flex-1 mt-2 flex flex-col gap-1 px-3">
        {navItems.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition
                ${
                  active
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                }
              `}
            >
              <Icon className="h-4 w-4" />
              {name}
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => router.push("/")}
          className="w-full flex items-center gap-3 rounded-xl px-4 py-3
                     text-sm text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
