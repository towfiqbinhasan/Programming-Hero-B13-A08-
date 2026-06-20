import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-dark)",
        color: "#b8a898",
        paddingTop: "64px",
        paddingBottom: "32px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            paddingBottom: "48px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "var(--color-clay)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "3px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      background:
                        i % 2 === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                DBL Tiles Gallery
              </span>
            </div>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#8a7a6a" }}>
              Discover premium ceramic, porcelain, and artisan tiles for every
              space. Quality craftsmanship since 1997.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-clay)",
                marginBottom: "20px",
              }}
            >
              Quick Links
            </h4>
            {[
              { href: "/", label: "Home" },
              { href: "/all-tiles", label: "All Tiles" },
              { href: "/my-profile", label: "My Profile" },
              { href: "/login", label: "Login" },
              { href: "/register", label: "Register" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "#8a7a6a",
                  textDecoration: "none",
                  marginBottom: "10px",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-clay)",
                marginBottom: "20px",
              }}
            >
              Contact Us
            </h4>
            {[
              { icon: "📍", text: "2nd Floor, House 10, Road 04,\nGulshan 1, Dhaka 1212, Bangladesh" },
              { icon: "📧", text: "info@dblceramics.com" },
              { icon: "📞", text: "09638113300" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "14px", marginTop: "2px" }}>{item.icon}</span>
                <span style={{ fontSize: "14px", color: "#8a7a6a", whiteSpace: "pre-line" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Social */}
          <div>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-clay)",
                marginBottom: "20px",
              }}
            >
              Follow Us
            </h4>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {["Facebook", "Instagram", "YouTube", "LinkedIn", "Pinterest"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    padding: "7px 12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "12px",
                    color: "#8a7a6a",
                    textDecoration: "none",
                    borderRadius: "4px",
                    transition: "all 0.2s",
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#5a4a3a" }}>
            © {new Date().getFullYear()} DBL Tiles Gallery. All rights reserved.
          </p>
          <p style={{ fontSize: "13px", color: "#5a4a3a" }}>
            Built with ♥ using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
