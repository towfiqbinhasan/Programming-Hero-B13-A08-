"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // যদি আগে থেকেই লগইন করা থাকে (এডমিন বা ইউজার) সরাসরি tiles পেজে যাবে
  useEffect(() => {
    if (isPending) return; 

    const isAdmin = localStorage.getItem("adminLoggedIn") === "true";

    if (isAdmin || session?.user) {
      router.push("/all-tiles");
    }
  }, [session, isPending, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ─── ADMIN BYPASS ────────────────────────────────────────
    if (email.trim() === "admin" && password === "admin") {
      localStorage.setItem("adminLoggedIn", "true");
      
      try {
        await authClient.signOut(); 
      } catch (signOutErr) {
        console.log("No active session or network failed, safely continuing...");
      }

      setTimeout(() => {
        setLoading(false);
        toast.success("Welcome back, Admin!");
        router.push("/all-tiles");
      }, 800);
      return;
    }
    // ────────────────────────────────────────────────────────

    try {
      const { data, error: err } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      setLoading(false);

      if (err) {
        setError(err.message || "Invalid email or password.");
        toast.error(err.message || "Invalid credentials.");
      } else {
        localStorage.removeItem("adminLoggedIn");
        toast.success("Welcome back!");
        router.push("/all-tiles");
      }
    } catch (catchErr) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
      toast.error("Login failed.");
    }
  };

  const handleGoogle = async () => {
    localStorage.removeItem("adminLoggedIn");
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/all-tiles" });
    } catch (googleErr) {
      toast.error("Google sign in failed.");
    }
  };

  if (isPending) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid rgba(196,136,106,0.2)", borderTopColor: "var(--color-clay)", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div
      suppressHydrationWarning
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-warm-white)",
        fontFamily: "var(--font-dm)",
        padding: "40px 24px",
        position: "relative",
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(196,136,106,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,136,106,0.05) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "440px",
          background: "#fff",
          borderRadius: "24px",
          boxShadow: "0 32px 80px rgba(26,31,46,0.12)",
          overflow: "hidden",
        }}
        className="animate__animated animate__fadeInUp"
      >
        <div style={{ height: "5px", background: "linear-gradient(90deg, var(--color-clay), var(--color-gold))" }} />

        <div style={{ padding: "40px" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "40px", height: "40px", background: "var(--color-clay)", borderRadius: "10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", padding: "7px" }}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)", borderRadius: "2px" }} />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: "700", color: "var(--color-dark)" }}>DBL Tiles</span>
            </Link>
            <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: "400", color: "var(--color-dark)", marginTop: "24px", marginBottom: "8px" }}>
              Welcome Back
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--color-stone)" }}>Sign in to your account to continue</p>
          </div>

          {/* Error Display */}
          {error && (
            <div style={{ background: "rgba(220,80,60,0.08)", border: "1px solid rgba(220,80,60,0.25)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", fontSize: "0.875rem", color: "#c0392b", display: "flex", gap: "8px", alignItems: "center" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: "600", color: "var(--color-dark)", marginBottom: "6px" }}>
                Email Address
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com or 'admin'"
                className="form-input"
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: "600", color: "var(--color-dark)", marginBottom: "6px" }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", padding: "13px", fontSize: "1rem", marginTop: "4px", opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
            <span style={{ fontSize: "0.78rem", color: "var(--color-stone)", letterSpacing: "0.04em" }}>OR CONTINUE WITH</span>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogle}
            style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1.5px solid var(--color-border)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500", color: "var(--color-dark)", fontFamily: "var(--font-dm)", transition: "all 0.2s" }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--color-clay)"; e.currentTarget.style.background = "rgba(196,136,106,0.04)"; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.background = "#fff"; }}
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.2l-6.6 5.1C9.6 39.5 16.3 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
            Continue with Google
          </button>

          {/* Register Link */}
          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "0.875rem", color: "var(--color-stone)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "var(--color-clay)", fontWeight: "600", textDecoration: "none" }}>Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}