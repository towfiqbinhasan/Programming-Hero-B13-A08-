"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hydration Error ফিক্স করার জন্য মাউন্টেড স্টেট
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isPending && session?.user) {
      router.push("/my-profile");
    }
  }, [session, isPending, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Better-Auth সাইন-আপ রিকোয়েস্ট
      const { data, error: err } = await authClient.signUp.email({
        email: form.email.trim(),
        password: form.password,
        name: form.name,
      } as any);

      if (err) {
        setLoading(false);
        setError(err.message || "Registration failed. Please check backend setup.");
        toast.error(err.message || "Registration failed.");
        return;
      }

      // ─── সাকসেস লজিক: ইমেইল ও পাসওয়ার্ড লোকাল স্টোরেজে ব্যাকআপ রাখা ───
      localStorage.setItem("lastRegisteredEmail", form.email.trim());
      localStorage.setItem("lastRegisteredPassword", form.password);
      localStorage.removeItem("adminLoggedIn"); // এডমিন মোড রিসেট করা

      toast.success(`Account created! Welcome, ${form.name}!`);
      
      // সেশন রিলোড করার জন্য ১ সেকেন্ড টাইমআউট দিয়ে রিডাইরেক্ট
      setTimeout(() => {
        setLoading(false);
        router.push("/all-tiles");
      }, 1000);

    } catch (catchErr: any) {
      setLoading(false);
      setError("Database or API Server network connection failed.");
      toast.error("Network or Database error.");
    }
  };

  const handleGoogle = async () => {
    localStorage.removeItem("adminLoggedIn");
    await authClient.signIn.social({ provider: "google", callbackURL: "/all-tiles" });
  };

  if (isPending || !mounted) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid rgba(196,136,106,0.2)", borderTopColor: "var(--color-clay)", animation: "spin 0.8s linear infinite" }} />
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
        <div style={{ height: "5px", background: "linear-gradient(90deg, var(--color-gold), var(--color-clay))" }} />

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
              Create Account
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--color-stone)" }}>Join thousands of tile enthusiasts</p>
          </div>

          {/* Error Display */}
          {error && (
            <div style={{ background: "rgba(220,80,60,0.08)", border: "1px solid rgba(220,80,60,0.25)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", fontSize: "0.875rem", color: "#c0392b" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: "600", color: "var(--color-dark)", marginBottom: "6px" }}>Full Name</label>
              <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your Name" className="form-input" />
            </div>
            
            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: "600", color: "var(--color-dark)", marginBottom: "6px" }}>Email Address</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className="form-input" />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: "600", color: "var(--color-dark)", marginBottom: "6px" }}>Password</label>
              <input type="password" name="password" required value={form.password} onChange={handleChange} placeholder="Min 8 characters" className="form-input" minLength={8} />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", padding: "13px", fontSize: "1rem", marginTop: "6px", opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              {loading ? "Creating account…" : "Register"}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
            <span style={{ fontSize: "0.78rem", color: "var(--color-stone)", letterSpacing: "0.04em" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
          </div>

          {/* Google Register */}
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

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "0.875rem", color: "var(--color-stone)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--color-clay)", fontWeight: "600", textDecoration: "none" }}>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}