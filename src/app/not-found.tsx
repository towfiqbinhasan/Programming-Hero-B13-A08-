import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 24px",
        fontFamily: "var(--font-dm)",
        background: "var(--color-warm-white)",
      }}
    >
      {/* Decorative tile pattern */}
      <div
        style={{
          width: "120px",
          height: "120px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "4px",
          marginBottom: "32px",
          opacity: 0.5,
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{
              background:
                i % 2 === 0 ? "var(--color-clay)" : "var(--color-border)",
              borderRadius: "4px",
            }}
          />
        ))}
      </div>

      <h1
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(5rem, 15vw, 9rem)",
          fontWeight: "700",
          color: "var(--color-clay)",
          lineHeight: "1",
          marginBottom: "8px",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "1.8rem",
          color: "var(--color-dark)",
          marginBottom: "12px",
          fontWeight: "400",
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          color: "var(--color-stone)",
          fontSize: "1rem",
          maxWidth: "380px",
          lineHeight: "1.7",
          marginBottom: "32px",
        }}
      >
        Looks like this tile has been moved or doesn&apos;t exist. Let&apos;s
        get you back to the gallery.
      </p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>
          ← Back to Home
        </Link>
        <Link href="/all-tiles" className="btn-outline" style={{ textDecoration: "none" }}>
          Browse Gallery
        </Link>
      </div>
    </div>
  );
}
