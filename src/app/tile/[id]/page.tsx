"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";


const tilesData = [
  { id: "1", title: "Classic Carrara Marble", category: "marble", description: "Elegant white marble tile with deep grey veining. Perfect for luxurious bathrooms and modern living rooms.", price: 45, currency: "USD", image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600", tags: ["white", "luxury", "interior"], inStock: true, material: "Natural Stone", dimensions: "60x60 cm", creator: "Italian Quarry Co.", style: "Modern Classic" },
  { id: "2", title: "Terracotta Rustic Brick", category: "terracotta", description: "Warm, earth-toned terracotta tile that brings a rustic Mediterranean charm to outdoor patios and kitchens.", price: 28, currency: "USD", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600", tags: ["earthy", "rustic", "outdoor"], inStock: false, material: "Clay", dimensions: "30x30 cm", creator: "EarthCraft Studios", style: "Mediterranean" },
  { id: "3", title: "Emerald Glazed Ceramic", category: "ceramic", description: "Rich emerald green subway tiles with a high-gloss finish for statement walls.", price: 34, currency: "USD", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600", tags: ["green", "glossy", "backsplash"], inStock: true, material: "Ceramic", dimensions: "10x30 cm", creator: "Artisan Tiles", style: "Contemporary" },
  { id: "4", title: "Basalt Dark Hexagon", category: "porcelain", description: "Matte finish charcoal dark hexagon porcelain tiles for modern minimalist floors.", price: 39, currency: "USD", image: "https://images.unsplash.com/photo-1523413551529-c6ca41410b59?w=600", tags: ["dark", "matte", "hexagon"], inStock: true, material: "Porcelain", dimensions: "20x20 cm", creator: "Nova Ceramics", style: "Minimalist" },
  { id: "5", title: "Travertine Cream Stone", category: "travertine", description: "Natural pitted travertine surface with beige tones for pool decks and patios.", price: 52, currency: "USD", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600", tags: ["beige", "natural", "pool"], inStock: true, material: "Travertine", dimensions: "40x60 cm", creator: "Anatolia Stone", style: "Rustic Antique" },
  { id: "6", title: "Calacatta Gold Luxury", category: "marble", description: "Prestige white marble variation showcasing striking bold gold and grey veins.", price: 85, currency: "USD", image: "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?w=600", tags: ["gold", "luxury", "marble"], inStock: true, material: "Natural Stone", dimensions: "80x80 cm", creator: "Tuscan Marble S.p.A.", style: "Royal Premium" },
  { id: "7", title: "Azulejo Blue Patterned", category: "ceramic", description: "Traditional Spanish and Portuguese style patterned tile for historic accents.", price: 42, currency: "USD", image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=600", tags: ["blue", "pattern", "vintage"], inStock: true, material: "Ceramic", dimensions: "20x20 cm", creator: "Iberia Heritage", style: "Vintage Spanish" },
  { id: "8", title: "Slate Charcoal Riven", category: "slate", description: "Natural cleft surface dark slate tiles providing maximum slip-resistance.", price: 31, currency: "USD", image: "https://images.unsplash.com/photo-1560185127-6a2806647f81?w=600", tags: ["grey", "textured", "floor"], inStock: false, material: "Natural Slate", dimensions: "30x60 cm", creator: "Peak Slate Ltd.", style: "Industrial" },
  { id: "9", title: "Sandstone Desert Beige", category: "sandstone", description: "Fine-grained sedimentary rock tiles offering soft warmth and elegant textures.", price: 29, currency: "USD", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600", tags: ["beige", "warm", "outdoor"], inStock: true, material: "Sandstone", dimensions: "45x45 cm", creator: "Sahara Quarry", style: "Natural Earthy" },
  { id: "10", title: "Zellige Pearl White", category: "ceramic", description: "Handcrafted Moroccan terracotta tile featuring unique uneven surface shifts.", price: 65, currency: "USD", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600", tags: ["white", "handmade", "zellige"], inStock: true, material: "Clay", dimensions: "10x10 cm", creator: "Fez Craft Guild", style: "Moroccan Artisan" },
  { id: "11", title: "Terrazzo Confetti Grey", category: "terrazzo", description: "Eco-friendly cement base mixed with marble chips for vibrant interiors.", price: 48, currency: "USD", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600", tags: ["grey", "chips", "modern"], inStock: true, material: "Composite Cement", dimensions: "60x60 cm", creator: "Milano Terrazzo", style: "Mid-Century Modern" },
  { id: "12", title: "Nero Marquina Black", category: "marble", description: "Deep black natural marble showing fine, striking white crystalline veins.", price: 55, currency: "USD", image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600", tags: ["black", "marble", "dark"], inStock: true, material: "Natural Stone", dimensions: "60x60 cm", creator: "Basque Stone Hub", style: "Sleek Modern" },
  { id: "13", title: "Sandwave Matte Porcelain", category: "porcelain", description: "Light cream non-reflective porcelain with micro-textures for heavy traffic.", price: 26, currency: "USD", image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600", tags: ["cream", "matte", "durable"], inStock: true, material: "Porcelain", dimensions: "60x120 cm", creator: "Apex Surfaces", style: "Minimalist Commercial" },
  { id: "14", title: "Onyx Translucent Jade", category: "marble", description: "Ultra-premium green onyx that allows light transmission for backlit walls.", price: 120, currency: "USD", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600", tags: ["green", "luxury", "translucent"], inStock: true, material: "Onyx Stone", dimensions: "60x60 cm", creator: "Persia Gems", style: "Exotic Luxury" },
  { id: "15", title: "Cement Geometric Patch", category: "cement", description: "Encaustic tile featuring monochrome abstract sharp patterns for retro cafe floors.", price: 38, currency: "USD", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600", tags: ["monochrome", "pattern", "cement"], inStock: false, material: "Cement", dimensions: "20x20 cm", creator: "RetroBlock", style: "Art Deco Retro" },
  { id: "16", title: "Teak Wood-Look Plank", category: "porcelain", description: "High-definition printed timber grains on completely waterproof porcelain planks.", price: 33, currency: "USD", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600", tags: ["wood", "brown", "plank"], inStock: true, material: "Porcelain", dimensions: "20x120 cm", creator: "ForestTile Co.", style: "Scandinavian Wood" },
  { id: "17", title: "Concrete Industrial Raw", category: "porcelain", description: "Replicating brutalist raw concrete textures for contemporary urban lofts.", price: 27, currency: "USD", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600", tags: ["grey", "raw", "industrial"], inStock: true, material: "Porcelain", dimensions: "100x100 cm", creator: "Urban Form", style: "Brutalist Industrial" },
  { id: "18", title: "Quartzite Shimmer Silver", category: "travertine", description: "Metamorphic rock containing natural sparkling quartz crystals reflecting soft light.", price: 59, currency: "USD", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600", tags: ["silver", "sparkle", "stone"], inStock: true, material: "Quartzite", dimensions: "30x30 cm", creator: "Nordic Quartz", style: "Modern Organic" },
  { id: "19", title: "Majolica Ochre Floral", category: "ceramic", description: "Tin-glazed earthy yellow historical floral artwork tiles finished by hand painters.", price: 46, currency: "USD", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600", tags: ["yellow", "floral", "antique"], inStock: true, material: "Ceramic", dimensions: "15x15 cm", creator: "Sicily Arts", style: "Italian Renaissance" },
  { id: "20", title: "Limestone Venetian White", category: "travertine", description: "Calcareous stone with minimal subtle shell fossils scattered inside the matrix.", price: 44, currency: "USD", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600", tags: ["white", "fossil", "limestone"], inStock: true, material: "Limestone", dimensions: "60x90 cm", creator: "Venice Quarries", style: "Classic Traditional" }
];


export default function TileDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, isPending } = authClient.useSession();
  const [tile, setTile] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean | null>(null);

  // Load localStorage safe way
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminLoggedIn") === "true";
    setAdminLoggedIn(isAdmin);
  }, []);

  // Auth guard logic fixed
  useEffect(() => {
    // ১. লোকাল স্টোরেজ বা সেশন যেকোনো একটা লোড হওয়া বাকি থাকলে কিছুই করবে না (Wait করবে)
    if (adminLoggedIn === null || isPending) return; 

    // ২. এডমিন লগইন থাকলে সেশন চেক করার প্রয়োজন নেই, সরাসরি রিটার্ন করবে
    if (adminLoggedIn) return; 

    // ৩. সেশন লোড শেষ হওয়ার পর যদি ইউজার ডাটা না পাওয়া যায়, তবেই কেবল লগইন পেজে পাঠাবে
    if (!session?.user) {
      router.push("/login");
    }
  }, [session, isPending, adminLoggedIn, router]);

  // Load Tile Data
  useEffect(() => {
    if (params?.id) {
      const found = tilesData.find((t) => t.id === params.id);
      if (!found) {
        router.push("/all-tiles");
        return;
      }
      setTile(found);
      setRelated(tilesData.filter((t) => t.id !== found.id && t.category === found.category).slice(0, 3));
    }
  }, [params?.id, router]);

  // Loading Screen Condition
  const stillLoading = adminLoggedIn === null || isPending;
  
  if (stillLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", flexDirection: "column", gap: "16px" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: "3px solid rgba(196,136,106,0.2)", borderTopColor: "var(--color-clay)", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "var(--color-stone)", fontFamily: "var(--font-dm)" }}>Checking authentication…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // যদি কোনো কারণে টাইলস না পাওয়া যায় বা সেশন না থাকে (নিরাপত্তার জন্য ডাবল চেক)
  if (!tile || (!adminLoggedIn && !session?.user)) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid rgba(196,136,106,0.2)", borderTopColor: "var(--color-clay)", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--font-dm)", minHeight: "100vh", background: "var(--color-warm-white)" }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 24px 0" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.85rem", color: "var(--color-stone)" }}>
          <Link href="/" style={{ color: "var(--color-stone)", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href="/all-tiles" style={{ color: "var(--color-stone)", textDecoration: "none" }}>All Tiles</Link>
          <span>›</span>
          <span style={{ color: "var(--color-clay)" }}>{tile.title}</span>
        </div>
      </div>

      {/* Main Detail */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }} className="tile-detail-grid">
        {/* Left: Image + Specs */}
        <div className="fade-up">
          <div style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 24px 80px rgba(26,31,46,0.14)", aspectRatio: "1", position: "relative" }}>
            <img src={tile.image} alt={tile.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", top: "16px", left: "16px", background: tile.inStock ? "rgba(122,140,110,0.92)" : "rgba(100,100,100,0.88)", color: "#fff", padding: "7px 16px", borderRadius: "100px", fontSize: "0.78rem", fontWeight: "600", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {tile.inStock ? "✓ In Stock" : "✗ Sold Out"}
            </div>
          </div>
          <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { label: "Material", value: tile.material },
              { label: "Dimensions", value: tile.dimensions },
              { label: "Category", value: tile.category },
              { label: "Currency", value: tile.currency },
            ].map((s) => (
              <div key={s.label} style={{ background: "#fff", borderRadius: "12px", padding: "16px", border: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: "600", letterSpacing: "0.08em", color: "var(--color-stone)", textTransform: "uppercase", marginBottom: "6px" }}>{s.label}</div>
                <div style={{ fontWeight: "500", color: "var(--color-dark)", textTransform: "capitalize" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="fade-up fade-up-delay-1">
          <span style={{ display: "inline-block", padding: "5px 14px", background: "rgba(196,136,106,0.1)", color: "var(--color-clay)", borderRadius: "100px", fontSize: "0.78rem", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "16px" }}>
            {tile.category}
          </span>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "600", color: "var(--color-dark)", lineHeight: "1.1", marginBottom: "12px" }}>
            {tile.title}
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--color-stone)", marginBottom: "20px" }}>
            By <strong style={{ color: "var(--color-dark)" }}>{tile.creator}</strong>
            &nbsp;·&nbsp;
            <em style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", color: "var(--color-clay)" }}>{tile.style}</em>
          </p>
          <p style={{ fontSize: "1.05rem", color: "var(--color-stone)", lineHeight: "1.8", marginBottom: "28px" }}>{tile.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
            {tile.tags?.map((tag: string) => (
              <span key={tag} className="tag" style={{ fontSize: "0.82rem" }}>#{tag}</span>
            ))}
          </div>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid var(--color-border)", marginBottom: "28px", boxShadow: "0 4px 20px rgba(26,31,46,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-stone)", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px" }}>Price per sqm</div>
                <div style={{ fontFamily: "var(--font-playfair)", fontSize: "2.5rem", fontWeight: "600", color: "var(--color-clay)" }}>
                  ${tile.price}
                  <span style={{ fontSize: "1rem", color: "var(--color-stone)", fontFamily: "var(--font-dm)", fontWeight: "400" }}> {tile.currency}</span>
                </div>
              </div>
              <div style={{ width: "64px", height: "64px", borderRadius: "12px", overflow: "hidden", border: "2px solid rgba(196,136,106,0.2)" }}>
                <img src={tile.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
            <button
              disabled={!tile.inStock}
              style={{ width: "100%", fontSize: "1rem", padding: "14px", background: tile.inStock ? "var(--color-clay)" : "#c0b8b0", cursor: tile.inStock ? "pointer" : "not-allowed", border: "none", borderRadius: "10px", color: "#fff", fontWeight: "600", fontFamily: "var(--font-dm)", transition: "background 0.2s" }}
            >
              {tile.inStock ? "🛒 Request a Sample" : "Notify When Available"}
            </button>
          </div>
          <Link href="/all-tiles" className="btn-ghost" style={{ textDecoration: "none" }}>← Back to Gallery</Link>
        </div>
      </div>

      {/* Related Tiles */}
      {related.length > 0 && (
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "48px", marginBottom: "32px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: "600", color: "var(--color-dark)", marginBottom: "6px" }}>More {tile.category} tiles</h2>
            <p style={{ color: "var(--color-stone)", fontSize: "0.9rem" }}>You might also like these from our collection.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
            {related.map((rt: any) => (
              <Link key={rt.id} href={`/tile/${rt.id}`} style={{ textDecoration: "none" }}>
                <div className="tile-card" style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "0 2px 12px rgba(26,31,46,0.06)" }}>
                  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                    <img src={rt.image} alt={rt.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} />
                  </div>
                  <div style={{ padding: "18px" }}>
                    <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: "600", color: "var(--color-dark)", marginBottom: "6px" }}>{rt.title}</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: "600", color: "var(--color-clay)" }}>${rt.price}</span>
                      <span style={{ fontSize: "0.78rem", color: "var(--color-clay)", fontWeight: "600" }}>View →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .tile-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
