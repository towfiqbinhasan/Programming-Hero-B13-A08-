"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    setAdminLoggedIn(localStorage.getItem("adminLoggedIn") === "true");
  }, []);

  const handleLogout = async () => {
    if (adminLoggedIn) {
      localStorage.removeItem("adminLoggedIn");
      setAdminLoggedIn(false);
      toast.success("Logged out successfully");
      router.push("/");
      return;
    }
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  // যে user লগইন করা আছে সেটা — admin বা real user
  const isLoggedIn = adminLoggedIn || !!session?.user;
  const displayName = adminLoggedIn ? "Admin" : (session?.user?.name?.split(" ")[0] || "User");
  const displayImage = adminLoggedIn
    ? `https://ui-avatars.com/api/?name=Admin&background=c4886a&color=fff&bold=true`
    : (session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || "U")}&background=C4886A&color=fff&bold=true`);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-tiles", label: "All Tiles" },
    { href: "/my-profile", label: "My Profile" },
  ];

  return (
    <nav
      style={{
        background: "rgba(247,243,238,0.97)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #e8ded4",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "var(--color-clay)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3px",
                padding: "6px",
                borderRadius: "6px",
              }}
            >
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: i % 2 === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
                    borderRadius: "1px",
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "20px",
                fontWeight: "700",
                color: "var(--color-dark)",
                letterSpacing: "-0.02em",
              }}
            >
              DBL Tiles
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden-mobile" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: "none",
                fontFamily: "var(--font-dm)",
                fontSize: "14px",
                fontWeight: "500",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: pathname === link.href ? "var(--color-clay)" : "var(--color-stone)",
                borderBottom: pathname === link.href ? "2px solid var(--color-clay)" : "2px solid transparent",
                paddingBottom: "2px",
                transition: "all 0.2s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {isLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <Link href="/my-profile" style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <img
                    src={displayImage}
                    alt={displayName}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid var(--color-clay)",
                    }}
                  />
                  <span
                    className="hidden-mobile"
                    style={{
                      fontFamily: "var(--font-dm)",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "var(--color-dark)",
                    }}
                  >
                    {displayName}
                  </span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="btn-outline"
                style={{ fontSize: "12px", padding: "8px 18px" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary">
              Login
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              flexDirection: "column",
              gap: "5px",
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "24px",
                  height: "2px",
                  background: "var(--color-dark)",
                  transition: "all 0.3s ease",
                  transform:
                    i === 0 && menuOpen
                      ? "rotate(45deg) translate(5px, 5px)"
                      : i === 2 && menuOpen
                      ? "rotate(-45deg) translate(5px, -5px)"
                      : "none",
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--color-cream)",
            borderTop: "1px solid var(--color-border)",
            padding: "16px 24px 20px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "13px 0",
                textDecoration: "none",
                fontFamily: "var(--font-dm)",
                fontSize: "15px",
                fontWeight: "500",
                color: pathname === link.href ? "var(--color-clay)" : "var(--color-stone)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {link.label}
            </Link>
          ))}
          {!isLoggedIn && (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", marginTop: "16px", textAlign: "center" }}
            >
              <span className="btn-primary" style={{ display: "block", textAlign: "center" }}>Login</span>
            </Link>
          )}
          {isLoggedIn && (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              style={{ display: "block", width: "100%", marginTop: "16px", padding: "12px", background: "rgba(220,80,60,0.08)", border: "1px solid rgba(220,80,60,0.2)", borderRadius: "8px", color: "#c0392b", fontFamily: "var(--font-dm)", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
            >
              🚪 Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
