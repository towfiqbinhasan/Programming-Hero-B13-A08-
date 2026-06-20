import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "DBL Tiles Gallery — Designed for Life",
  description:
    "Discover premium ceramic, porcelain, and artisan tiles for every space. Quality craftsmanship since 1997.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
    <html lang="en" suppressHydrationWarning>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.9rem",
              borderRadius: "10px",
            },
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}