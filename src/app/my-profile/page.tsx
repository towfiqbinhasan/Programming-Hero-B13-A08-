"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function MyProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  // Admin & UI states
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form states (For real user)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminLoggedIn") === "true";
    setAdminLoggedIn(isAdmin);
    setAdminChecked(true);
  }, []);

  const isLoggedIn = adminLoggedIn || !!session?.user;

  // Loading State
  if (isPending || !adminChecked) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "3px solid rgba(196,136,106,0.2)",
            borderTopColor: "var(--color-clay)",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p style={{ color: "var(--color-stone)", fontFamily: "var(--font-dm)" }}>
          Loading profile…
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Unauthenticated State
  if (!isLoggedIn) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px 24px",
          fontFamily: "var(--font-dm)",
        }}
      >
        <div style={{ fontSize: "3.5rem", marginBottom: "20px" }}>🔒</div>
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "2rem",
            marginBottom: "12px",
            color: "var(--color-dark)",
          }}
        >
          Private Page
        </h2>
        <p style={{ color: "var(--color-stone)", marginBottom: "28px" }}>
          Please login to view your profile.
        </p>
        <Link href="/login" className="btn-primary" style={{ textDecoration: "none" }}>
          Go to Login
        </Link>
      </div>
    );
  }

  // CASE 1: Admin User View (Static)
  if (adminLoggedIn) {
    const adminUser = {
      name: "Admin",
      email: "admin@dbltiles.com",
      id: "admin-0000-0001",
      image: `https://ui-avatars.com/api/?name=Admin&background=c4886a&color=fff&size=120&bold=true`,
    };

    return (
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "60px 24px 80px",
          fontFamily: "var(--font-dm)",
        }}
      >
        <div style={{ marginBottom: "40px" }}>
          <span className="tag" style={{ marginBottom: "12px", display: "inline-block" }}>
            Account
          </span>
          <h1 className="section-title" style={{ fontFamily: "var(--font-playfair)" }}>
            My Profile
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "32px",
            alignItems: "start",
          }}
          className="profile-grid"
        >
          {/* Left: Admin Avatar */}
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "32px 24px",
              border: "1px solid var(--color-border)",
              textAlign: "center",
              boxShadow: "0 4px 24px rgba(26,31,46,0.06)",
            }}
          >
            <div style={{ position: "relative", display: "inline-block", marginBottom: "20px" }}>
              <img
                src={adminUser.image}
                alt="avatar"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid var(--color-cream)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "4px",
                  right: "4px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "#7a8c6e",
                  border: "2px solid #fff",
                }}
              />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.35rem",
                fontWeight: "600",
                color: "var(--color-dark)",
                marginBottom: "6px",
              }}
            >
              {adminUser.name}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--color-stone)", marginBottom: "20px" }}>
              {adminUser.email}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#c4886a",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: "0.8rem", color: "var(--color-stone)" }}>
                Administrator
              </span>
            </div>
          </div>

          {/* Right: Admin Info Details */}
          <div>
            <div
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "32px",
                border: "1px solid var(--color-border)",
                boxShadow: "0 4px 24px rgba(26,31,46,0.06)",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  marginBottom: "24px",
                  color: "var(--color-dark)",
                }}
              >
                Profile Details
              </h3>
              {[
                { label: "Full Name", value: adminUser.name },
                { label: "Email Address", value: adminUser.email },
                { label: "Account ID", value: adminUser.id },
                { label: "Role", value: "System Administrator" },
              ].map((d) => (
                <div
                  key={d.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(140,123,107,0.08)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      color: "var(--color-stone)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {d.label}
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "var(--color-dark)", maxWidth: "240px", textAlign: "right" }}>
                    {d.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Admin Quick Links */}
            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "20px 24px",
                border: "1px solid var(--color-border)",
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Link href="/all-tiles" className="btn-ghost" style={{ textDecoration: "none" }}>
                🖼 Browse Gallery
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("adminLoggedIn");
                  toast.success("Logged out");
                  router.push("/");
                }}
                className="btn-ghost"
                style={{ color: "#c0392b", borderColor: "rgba(192,57,43,0.2)" }}
              >
                🚪 Sign Out
              </button>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 700px) { .profile-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    );
  }

  // CASE 2: Real User View (Auth Client Connected)
  const user = session!.user;

  const startEdit = () => {
    setName(user.name || "");
    setEmail(user.email || "");
    setImage((user as any).image || "");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setEditing(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Validate password fields if user wants to change password
      if (newPassword || confirmPassword) {
        if (!currentPassword) {
          toast.error("Please enter your current password to change it.");
          setSaving(false);
          return;
        }
        if (newPassword !== confirmPassword) {
          toast.error("New passwords do not match.");
          setSaving(false);
          return;
        }
        if (newPassword.length < 6) {
          toast.error("New password must be at least 6 characters.");
          setSaving(false);
          return;
        }
      }

      // 1. Update name and image
      await authClient.updateUser({ name, image } as any);

      // 2. Update email if changed
      if (email !== user.email) {
        await authClient.changeEmail({
          newEmail: email,
          callbackURL: "/my-profile",
        });
        toast.success("A verification email has been sent to your new address.");
      }

      // 3. Update password if provided
      if (newPassword && currentPassword) {
        await authClient.changePassword({
          currentPassword,
          newPassword,
          revokeOtherSessions: false,
        });
        toast.success("Password updated successfully!");
      }

      toast.success("Profile updated successfully!");
      setEditing(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const msg = err?.message || "Failed to update profile.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "60px 24px 80px",
        fontFamily: "var(--font-dm)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <span className="tag" style={{ marginBottom: "12px", display: "inline-block" }}>
          Account
        </span>
        <h1 className="section-title" style={{ fontFamily: "var(--font-playfair)" }}>
          My Profile
        </h1>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "32px",
          alignItems: "start",
        }}
        className="profile-grid"
      >
        {/* Left: Avatar Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "32px 24px",
            border: "1px solid var(--color-border)",
            textAlign: "center",
            boxShadow: "0 4px 24px rgba(26,31,46,0.06)",
          }}
        >
          <div style={{ position: "relative", display: "inline-block", marginBottom: "20px" }}>
            <img
              src={
                (user as any).image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name || "User"
                )}&background=c4886a&color=fff&size=120&bold=true`
              }
              alt="avatar"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid var(--color-cream)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "4px",
                right: "4px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#7a8c6e",
                border: "2px solid #fff",
              }}
            />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.35rem",
              fontWeight: "600",
              color: "var(--color-dark)",
              marginBottom: "6px",
            }}
          >
            {user.name}
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--color-stone)", marginBottom: "20px" }}>
            {user.email}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#7a8c6e",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: "0.8rem", color: "var(--color-stone)" }}>
              Active Member
            </span>
          </div>
          {!editing && (
            <button
              onClick={startEdit}
              className="btn-outline"
              style={{ width: "100%", fontSize: "0.875rem" }}
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>

        {/* Right: Info / Form */}
        <div>
          {!editing ? (
            <div
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "32px",
                border: "1px solid var(--color-border)",
                boxShadow: "0 4px 24px rgba(26,31,46,0.06)",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  marginBottom: "24px",
                  color: "var(--color-dark)",
                }}
              >
                Profile Details
              </h3>
              {[
                { label: "Full Name", value: user.name },
                { label: "Email Address", value: user.email },
                {
                  label: "Account ID",
                  value: user.id?.slice(0, 16) + "…",
                },
                {
                  label: "Photo URL",
                  value: (user as any).image
                    ? ((user as any).image as string).slice(0, 40) + "…"
                    : "Not set",
                },
              ].map((d) => (
                <div
                  key={d.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(140,123,107,0.08)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      color: "var(--color-stone)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {d.label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--color-dark)",
                      maxWidth: "240px",
                      textAlign: "right",
                      wordBreak: "break-all",
                    }}
                  >
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "32px",
                border: "1px solid var(--color-border)",
                boxShadow: "0 4px 24px rgba(26,31,46,0.06)",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  marginBottom: "24px",
                  color: "var(--color-dark)",
                }}
              >
                Update Information
              </h3>
              <form
                onSubmit={handleUpdate}
                style={{ display: "flex", flexDirection: "column", gap: "18px" }}
              >
                {/* Full Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.825rem",
                      fontWeight: "600",
                      color: "var(--color-dark)",
                      marginBottom: "6px",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.825rem",
                      fontWeight: "600",
                      color: "var(--color-dark)",
                      marginBottom: "6px",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="form-input"
                  />
                  {email !== user.email && (
                    <p style={{ fontSize: "0.78rem", color: "var(--color-stone)", marginTop: "5px" }}>
                      ⚠️ A verification link will be sent to the new email address.
                    </p>
                  )}
                </div>

                {/* Photo URL */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.825rem",
                      fontWeight: "600",
                      color: "var(--color-dark)",
                      marginBottom: "6px",
                    }}
                  >
                    Photo URL
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://your-photo-url.com/avatar.jpg"
                    className="form-input"
                  />
                  {image && (
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={image}
                        alt="preview"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid var(--color-cream)",
                        }}
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                      <span style={{ fontSize: "0.8rem", color: "var(--color-stone)" }}>
                        Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* Password Fields Section */}
                <div
                  style={{
                    borderTop: "1px solid rgba(140,123,107,0.12)",
                    padding: "18px",
                    marginTop: "4px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.825rem",
                      fontWeight: "600",
                      color: "var(--color-dark)",
                      marginBottom: "16px",
                    }}
                  >
                    🔐 Change Password{" "}
                    <span style={{ fontWeight: "400", color: "var(--color-stone)" }}>
                      (leave blank to keep current)
                    </span>
                  </p>

                  {/* Current Password */}
                  <div style={{ marginBottom: "14px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.825rem",
                        fontWeight: "600",
                        color: "var(--color-dark)",
                        marginBottom: "6px",
                      }}
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="form-input"
                    />
                  </div>

                  {/* New Password */}
                  <div style={{ marginBottom: "14px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.825rem",
                        fontWeight: "600",
                        color: "var(--color-dark)",
                        marginBottom: "6px",
                      }}
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="form-input"
                    />
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.825rem",
                        fontWeight: "600",
                        color: "var(--color-dark)",
                        marginBottom: "6px",
                      }}
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ flex: 1, opacity: saving ? 0.7 : 1 }}
                    disabled={saving}
                  >
                    {saving ? "Saving…" : "Update"}
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setEditing(false)}
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Quick Links */}
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "20px 24px",
              border: "1px solid var(--color-border)",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link
              href="/all-tiles"
              className="btn-ghost"
              style={{ textDecoration: "none" }}
            >
              🖼 Browse Gallery
            </Link>
            <button
              onClick={async () => {
                await authClient.signOut();
                toast.success("Logged out");
                router.push("/");
              }}
              className="btn-ghost"
              style={{ color: "#c0392b", borderColor: "rgba(192,57,43,0.2)" }}
            >
              🚪 Sign Out
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}