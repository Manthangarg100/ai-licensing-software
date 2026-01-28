"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // ✅ SET AUTH STATE
    localStorage.setItem("auth", "true");

    // ✅ REDIRECT TO DASHBOARD
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-2xl border border-border bg-black/40 backdrop-blur-xl p-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-foreground/70">
          Login to continue to your dashboard
        </p>

        <div className="mt-6 space-y-4">
          <input
            placeholder="Email"
            className="w-full rounded-lg bg-black/50 border border-border px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />

          <input
            placeholder="Password"
            type="password"
            className="w-full rounded-lg bg-black/50 border border-border px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-lg bg-emerald-600 py-3 text-black text-sm font-medium hover:bg-emerald-500 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
