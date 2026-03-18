// ── app/layout.jsx ───────────────────────────────────────────
// Root layout. BlogNav is rendered here so it stays mounted
// across the entire page — it's fixed-position so it doesn't
// affect document flow or content width.
//
// BlogNav handles its own responsive behaviour:
//   ≥ 900px → fixed left sidebar
//   < 900px → bottom pill + slide-up sheet

import BlogNav from "@/components/BlogNav";
import "./globals.css";

export const metadata = {
  title: "Framer Motion — React Animation Blog",
  description: "A beginner's guide to animating React UIs with Framer Motion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ colorScheme: "light", background: "#ffffff" }}>
      <body style={{ background: "#ffffff", margin: 0, minHeight: "100vh" }}>
        {/* Fixed nav — overlays content, no layout impact */}
        <BlogNav />

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}
