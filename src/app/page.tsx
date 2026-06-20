"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const MARQUEE_TEXT =
  "New Arrivals: Ceramic Blue Wave | Weekly Feature: Modern Geometric Patterns | Join the Community | Premium Glazed Porcelain | Handcrafted Terracotta | Luxury Marble Effect | ";

export default function HomePage() {
  const [featuredTiles, setFeaturedTiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    setAdminLoggedIn(localStorage.getItem("adminLoggedIn") === "true");
  }, []);

  const isLoggedIn = adminLoggedIn || !!session?.user;

  const handleViewDetails = (id: string) => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push(`/tile/${id}`);
    }
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiles`)
      .then((r) => r.json())
      .then((data) => {
        setFeaturedTiles(data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ fontFamily: "var(--font-dm)" }}>
      {/* ===== HERO ===== */}
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "var(--color-dark)",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1600)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.25,
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(26,31,46,0.95) 0%, rgba(26,31,46,0.7) 60%, rgba(196,136,106,0.15) 100%)",
          }}
        />

        {/* Decorative tiles grid */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "42%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "4px",
            opacity: 0.55,
          }}
        >
          {[
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
            "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400",
          ].map((src, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <img
                src={src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "80px 24px",
            width: "100%",
          }}
        >
          <div style={{ maxWidth: "580px" }}>
            <span
              className="tag animate__animated animate__fadeInDown"
              style={{
                marginBottom: "24px",
                display: "inline-block",
                background: "rgba(196,136,106,0.2)",
                color: "var(--color-clay)",
                borderColor: "rgba(196,136,106,0.3)",
              }}
            >
              Premium Tile Gallery
            </span>

            <h1
              className="animate__animated animate__fadeInUp"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                fontWeight: "700",
                color: "#fff",
                lineHeight: "1.1",
                marginBottom: "24px",
              }}
            >
              Discover Your{" "}
              <span style={{ color: "var(--color-clay)", fontStyle: "italic" }}>
                Perfect
              </span>{" "}
              Aesthetic
            </h1>

            <p
              className="animate__animated animate__fadeInUp"
              style={{
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.72)",
                lineHeight: "1.75",
                marginBottom: "40px",
                animationDelay: "0.1s",
              }}
            >
              Explore our exclusive collection of ceramic, porcelain, and artisan
              tiles designed to bring lasting beauty and strength to every space.
            </p>

            <div
              className="animate__animated animate__fadeInUp"
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                animationDelay: "0.2s",
              }}
            >
              <Link href="/all-tiles" className="btn-primary" style={{ fontSize: "1rem", padding: "14px 32px" }}>
                Browse Now →
              </Link>
              <a
                href="#featured"
                className="btn-outline"
                style={{
                  fontSize: "1rem",
                  padding: "14px 32px",
                  color: "rgba(255,255,255,0.8)",
                  borderColor: "rgba(255,255,255,0.3)",
                }}
              >
                View Collection
              </a>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: "40px",
                marginTop: "56px",
                flexWrap: "wrap",
              }}
            >
              {[
                { num: "500+", label: "Tile Designs" },
                { num: "25+", label: "Years Experience" },
                { num: "10K+", label: "Happy Clients" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "var(--color-clay)",
                    }}
                  >
                    {stat.num}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...Array(2)].map((_, idx) => (
            <span key={idx} style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {MARQUEE_TEXT.split("|").map((item, i) => (
                <span key={i}>
                  {item.trim()}
                  {i < MARQUEE_TEXT.split("|").length - 1 && (
                    <span style={{ color: "var(--color-clay)", margin: "0 20px" }}>◆</span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ===== FEATURED TILES ===== */}
      <section
        id="featured"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span className="tag" style={{ marginBottom: "14px", display: "inline-block" }}>
            Our Selection
          </span>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>
            Featured Tiles
          </h2>
          <p style={{ color: "var(--color-stone)", maxWidth: "440px", margin: "0 auto", lineHeight: "1.7" }}>
            Handpicked from our finest collection — tiles that define spaces and
            tell stories.
          </p>
        </div>

        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "28px",
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#fff",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="skeleton" style={{ height: "220px" }} />
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div className="skeleton" style={{ height: "20px", width: "70%" }} />
                  <div className="skeleton" style={{ height: "14px", width: "90%" }} />
                  <div className="skeleton" style={{ height: "36px", marginTop: "8px" }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "28px",
            }}
          >
            {featuredTiles.map((tile, i) => (
              <div
                key={tile.id}
                className="tile-card fade-up"
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 2px 12px rgba(26,31,46,0.06)",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  <img
                    src={tile.image}
                    alt={tile.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(247,243,238,0.95)",
                      padding: "4px 10px",
                      borderRadius: "100px",
                      fontSize: "0.72rem",
                      fontWeight: "600",
                      color: "var(--color-clay)",
                      textTransform: "capitalize",
                    }}
                  >
                    {tile.category}
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      color: "var(--color-dark)",
                      marginBottom: "8px",
                    }}
                  >
                    {tile.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.83rem",
                      color: "var(--color-stone)",
                      lineHeight: "1.6",
                      marginBottom: "16px",
                    }}
                  >
                    {tile.description.slice(0, 70)}…
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "1.15rem",
                        fontWeight: "600",
                        color: "var(--color-clay)",
                      }}
                    >
                      ${tile.price}
                    </span>
                    <button
                      onClick={() => handleViewDetails(tile.id)}
                      className="btn-primary"
                      style={{ padding: "9px 18px", fontSize: "0.85rem", border: "none", cursor: "pointer" }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link href="/all-tiles" className="btn-outline" style={{ fontSize: "0.95rem" }}>
            View All Tiles →
          </Link>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section
        style={{
          background: "var(--color-dark)",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
          <span className="tag" style={{ marginBottom: "14px", display: "inline-block", background: "rgba(196,136,106,0.15)", color: "var(--color-clay)" }}>
            Why DBL
          </span>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: "600",
              color: "#fff",
              marginBottom: "56px",
            }}
          >
            Crafted for Excellence
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "32px",
            }}
          >
            {[
              { icon: "🏆", title: "Premium Quality", desc: "Each tile meets rigorous quality standards for lasting beauty." },
              { icon: "🎨", title: "Diverse Designs", desc: "500+ designs from rustic terracotta to luxury marble effects." },
              { icon: "🚚", title: "Fast Delivery", desc: "Prompt nationwide delivery with careful packaging." },
              { icon: "💬", title: "Expert Support", desc: "Our tile experts help you find the perfect match." },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                  padding: "32px 24px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.3s",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{item.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    color: "#fff",
                    marginBottom: "10px",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: "1.7" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        style={{
          background: "var(--color-clay)",
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: "600",
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          Ready to Transform Your Space?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", marginBottom: "32px" }}>
          Browse our complete gallery and find the perfect tile for your project.
        </p>
        <Link
          href="/all-tiles"
          style={{
            display: "inline-block",
            padding: "15px 40px",
            background: "#fff",
            color: "var(--color-clay)",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "700",
            fontSize: "1rem",
            transition: "transform 0.2s",
          }}
        >
          Explore All Tiles →
        </Link>
      </section>
    </div>
  );
}
