"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

// ২০টি রিয়েল-লাইক টাইলস ডেটা সম্বলিত লোকাল JSON অ্যারে
const tilesData = [
  { id: "1", title: "Classic Carrara Marble", category: "marble", description: "Elegant white marble tile with deep grey veining. Perfect for luxurious bathrooms.", price: 45, currency: "USD", image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600", tags: ["white", "luxury", "interior"], inStock: true, material: "Natural Stone", dimensions: "60x60 cm", creator: "Italian Quarry Co.", style: "Modern Classic" },
  { id: "2", title: "Terracotta Rustic Brick", category: "terracotta", description: "Warm, earth-toned terracotta tile that brings a rustic Mediterranean charm.", price: 28, currency: "USD", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600", tags: ["earthy", "rustic", "outdoor"], inStock: false, material: "Clay", dimensions: "30x30 cm", creator: "EarthCraft Studios", style: "Mediterranean" },
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

export default function AllTilesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const router = useRouter();
  
  // ক্লায়েন্ট সেশন ডেটা চেক করার জন্য hook
  const { data: session, isPending } = authClient.useSession();
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);

  // Hydration Error ফিক্স করার জন্য মাউন্টেড স্টেট
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // পেজ ব্রাউজারে মাউন্ট হওয়ার পর ট্রু হবে
    setMounted(true);
    
    const isAdmin = localStorage.getItem("adminLoggedIn") === "true";
    setAdminLoggedIn(isAdmin);
    setAdminChecked(true);
  }, []);

  // ক্যাটাগরি এবং ফিল্টারিং লজিক
  const categories = ["all", ...Array.from(new Set(tilesData.map((t) => t.category)))];

  const filtered = tilesData.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.tags?.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    return matchSearch && matchCat;
  });

  // টাইল কার্ডে ক্লিক করার হ্যান্ডলার ফাংশন
  const handleTileClick = (tileId: string) => {
    if (!adminChecked) return;

    // ইউজার সেশন অথবা এডমিন সেশন কোনো একটি থাকলেই ডিটেইল পেজে ঢুকতে দেবে
    if (session?.user || adminLoggedIn) {
      router.push(`/tile/${tileId}`);
    } else {
      toast.error("Please login to view full tile details.");
      router.push("/login");
    }
  };

  // সার্ভার সাইড এবং ক্লায়েন্ট সাইড রেন্ডার সেম রাখার জন্য চেকিং
  if (!mounted) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid rgba(196,136,106,0.2)", borderTopColor: "var(--color-clay)", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-warm-white)", fontFamily: "var(--font-dm)" }}>
      {/* Page Header */}
      <div
        style={{
          background: "var(--color-dark)",
          padding: "60px 24px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1200)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <span
            className="tag"
            style={{ marginBottom: "14px", display: "inline-block", background: "rgba(196,136,106,0.2)", color: "var(--color-clay)" }}
          >
            The Collection
          </span>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "600",
              color: "#fff",
              marginBottom: "14px",
            }}
          >
            All Tiles
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "400px", margin: "0 auto", lineHeight: "1.7" }}>
            Browse our complete gallery. Click any tile to see full details.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Search Bar */}
        <div style={{ maxWidth: "540px", margin: "0 auto 32px", position: "relative" }}>
          <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "1.1rem", pointerEvents: "none" }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search tiles by name or tag…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: "46px", fontSize: "1rem", borderRadius: "12px", height: "54px", boxShadow: "0 2px 16px rgba(26,31,46,0.08)" }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--color-stone)", fontSize: "1.1rem" }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "32px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "7px 18px",
                borderRadius: "100px",
                border: "1.5px solid",
                borderColor: activeCategory === cat ? "var(--color-clay)" : "var(--color-border)",
                background: activeCategory === cat ? "var(--color-clay)" : "#fff",
                color: activeCategory === cat ? "#fff" : "var(--color-stone)",
                fontFamily: "var(--font-dm)",
                fontSize: "0.82rem",
                fontWeight: "600",
                textTransform: "capitalize",
                cursor: "pointer",
                transition: "all 0.2s",
                letterSpacing: "0.04em",
              }}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>

        {/* Result Count */}
        <p style={{ color: "var(--color-stone)", fontSize: "0.875rem", marginBottom: "24px" }}>
          {filtered.length} tile{filtered.length !== 1 ? "s" : ""} found {search ? ` for "${search}"` : ""}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", color: "var(--color-stone)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.6rem", marginBottom: "8px", color: "var(--color-dark)" }}>
              No tiles found
            </h3>
            <p>Try a different search term or category.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "28px" }}>
            {filtered.map((tile: any, i: number) => (
              <div
                key={tile.id}
                className="tile-card fade-up"
                onClick={() => handleTileClick(tile.id)}
                style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--color-border)", boxShadow: "0 2px 12px rgba(26,31,46,0.06)", animationDelay: `${(i % 4) * 0.08}s`, cursor: "pointer" }}
              >
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  <img
                    src={tile.image}
                    alt={tile.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  />
                  <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(247,243,238,0.95)", padding: "4px 10px", borderRadius: "100px", fontSize: "0.72rem", fontWeight: "600", color: "var(--color-clay)", textTransform: "capitalize" }}>
                    {tile.category}
                  </div>
                  {!tile.inStock && (
                    <div style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(100,100,100,0.85)", padding: "4px 10px", borderRadius: "100px", fontSize: "0.72rem", fontWeight: "600", color: "#fff" }}>
                      Out of Stock
                    </div>
                  )}
                </div>
                <div style={{ padding: "20px" }}>
                  <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.15rem", fontWeight: "600", color: "var(--color-dark)", marginBottom: "8px" }}>
                    {tile.title}
                  </h3>
                  <p style={{ fontSize: "0.83rem", color: "var(--color-stone)", lineHeight: "1.6", marginBottom: "12px" }}>
                    {tile.description.slice(0, 75)}…
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {tile.tags?.slice(0, 3).map((tag: string) => (
                      <span key={tag} style={{ fontSize: "0.7rem", padding: "2px 9px", background: "rgba(196,136,106,0.08)", color: "var(--color-clay)", borderRadius: "100px", fontWeight: "600", letterSpacing: "0.04em" }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.15rem", fontWeight: "600", color: "var(--color-clay)" }}>
                      ${tile.price}
                    </span>
                    <span className="btn-primary" style={{ padding: "9px 18px", fontSize: "0.85rem" }}>
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}