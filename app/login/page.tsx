"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [fullName, setFullName] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ SET AUTH STATE with token
      localStorage.setItem("auth", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ REDIRECT TO DASHBOARD
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, full_name: fullName }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Registration failed");
        return;
      }

      // Auto-login after registration
      setShowRegister(false);
      setPassword("");
      setFullName("");
      setError("");
      alert("Registration successful! Please login with your credentials.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during registration"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-2xl border border-border bg-black/40 backdrop-blur-xl p-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          {showRegister ? "Create Account" : "Welcome back"}
        </h1>

        <p className="mt-2 text-sm text-foreground/70">
          {showRegister
            ? "Sign up to get started"
            : "Login to continue to your dashboard"}
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form
          onSubmit={showRegister ? handleRegister : handleLogin}
          className="mt-6 space-y-4"
        >
          {showRegister && (
            <input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg bg-black/50 border border-border px-4 py-3 text-sm outline-none focus:border-emerald-500"
              required
            />
          )}

          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-black/50 border border-border px-4 py-3 text-sm outline-none focus:border-emerald-500"
            required
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-black/50 border border-border px-4 py-3 text-sm outline-none focus:border-emerald-500"
            required
            minLength={6}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-emerald-600 py-3 text-black text-sm font-medium hover:bg-emerald-500 transition disabled:bg-emerald-600/50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : showRegister ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-foreground/70">
            {showRegister ? "Already have an account?" : "Don't have an account?"}
            {" "}
            <button
              type="button"
              onClick={() => {
                setShowRegister(!showRegister);
                setError("");
                setPassword("");
                setFullName("");
              }}
              className="text-emerald-400 hover:text-emerald-300 transition font-medium"
            >
              {showRegister ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        {!showRegister && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-foreground/50 mb-3">Demo Credentials:</p>
            <div className="space-y-2 text-xs text-foreground/60">
              <p>📧 Email: <span className="text-emerald-400">demo@example.com</span></p>
              <p>🔐 Password: <span className="text-emerald-400">demo123</span></p>
              <p className="text-foreground/40 mt-3">Or sign up with new credentials</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
