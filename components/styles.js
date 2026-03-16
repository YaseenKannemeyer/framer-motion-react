// ── styles.js ─────────────────────────────────────────────────
// All shared inline styles used across the blog components.
// Import this wherever you need consistent styling:
//   import { s } from "@/components/styles";
//   import { Divider } from "@/components/styles";
//
// The `divider` key in `s` is kept for static use (e.g. borders
// inside table rows). For the section-level animated dividers
// that separate content blocks, use the <Divider /> component.

import { motion } from "framer-motion";

// ── Animated Divider component ────────────────────────────────
// Drop-in replacement for <div style={s.divider} />.
// Renders a line that draws itself in from the left each time
// it enters the page. Use this between every major section.
//
// Usage:
//   import { Divider } from "@/components/styles";
//   <Divider />                    ← full width, default delay
//   <Divider width="40%" />        ← shorter line
//   <Divider delay={0.2} />        ← custom delay
//   <Divider accent />             ← blue → dark gradient
//
// How it works:
//   The outer div clips overflow so the line is invisible at 0%.
//   The motion.div animates width from 0% → target using a sharp
//   expo-out curve [0.22, 1, 0.36, 1] — the same curve used in
//   HeroHeader. This keeps all line animations feeling consistent.

export function Divider({ width = "100%", delay = 0, accent = false }) {
  return (
    <div style={{ margin: "2.5rem 0", overflow: "hidden" }}>
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
        style={{
          height: "0.5px",
          background: accent
            ? "linear-gradient(to right, #4a9eff, #1c1c1c)"
            : "linear-gradient(to right, #2a2a2a, #111)",
        }}
      />
    </div>
  );
}

// ── Shared styles object ──────────────────────────────────────
export const s = {
  section: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#f5f0e8",
    fontFamily: "'Georgia', serif",
    padding: "4rem 2rem",
    maxWidth: "860px",
    margin: "0 auto",
  },
  badge: {
    display: "inline-block",
    fontSize: "11px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#378ADD",
    border: "0.5px solid #378ADD44",
    borderRadius: "999px",
    padding: "5px 16px",
    marginBottom: "1.5rem",
  },
  h1: {
    fontSize: "clamp(2rem, 6vw, 4rem)",
    fontWeight: 400,
    color: "#f5f0e8",
    lineHeight: 1.15,
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.05rem",
    color: "#666",
    lineHeight: 1.8,
    maxWidth: "560px",
    marginBottom: "3.5rem",
  },
  // Static divider — used for table row borders and internal card
  // borders only. For section separators use <Divider /> instead.
  divider: {
    height: "0.5px",
    background: "#1e1e1e",
    margin: "2.5rem 0",
  },
  sectionLabel: {
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#444",
    marginBottom: "1rem",
    fontFamily: "monospace",
  },
  stepCard: {
    background: "#111",
    border: "0.5px solid #1e1e1e",
    borderRadius: "10px",
    padding: "1.25rem 1.5rem",
    marginBottom: "0.75rem",
  },
  stepHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "0.75rem",
  },
  stepNum: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#0d2a44",
    color: "#378ADD",
    fontSize: "11px",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontFamily: "monospace",
  },
  stepTitle: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#f5f0e8",
    fontFamily: "monospace",
  },
  stepBody: {
    fontSize: "13px",
    color: "#666",
    lineHeight: 1.7,
    marginBottom: "0.75rem",
  },
  pre: {
    background: "#0d0d0d",
    border: "0.5px solid #1e1e1e",
    borderRadius: "6px",
    padding: "0.75rem 1rem",
    fontSize: "12px",
    color: "#a8d8ff",
    fontFamily: "monospace",
    overflowX: "auto",
    lineHeight: 1.6,
    margin: "0.5rem 0",
  },
  inlineCode: {
    background: "#1a1a1a",
    border: "0.5px solid #2a2a2a",
    borderRadius: "4px",
    padding: "1px 6px",
    fontSize: "12px",
    fontFamily: "monospace",
    color: "#a8d8ff",
  },
  bullet: {
    fontSize: "13px",
    color: "#666",
    lineHeight: 1.8,
    paddingLeft: "1.25rem",
    marginTop: "0.5rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "12px",
    fontFamily: "monospace",
    marginTop: "0.5rem",
  },
  th: {
    textAlign: "left",
    padding: "7px 12px",
    fontSize: "10px",
    color: "#444",
    borderBottom: "0.5px solid #1e1e1e",
    fontFamily: "monospace",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  td: {
    padding: "9px 12px",
    borderBottom: "0.5px solid #1a1a1a",
    verticalAlign: "top",
    lineHeight: 1.5,
  },
  note: {
    background: "#0d1f30",
    borderLeft: "2px solid #378ADD",
    borderRadius: "0 6px 6px 0",
    padding: "0.75rem 1rem",
    fontSize: "12px",
    color: "#555",
    fontFamily: "monospace",
    lineHeight: 1.7,
    marginTop: "0.75rem",
  },
  easeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    marginTop: "0.75rem",
  },
  demoTrack: {
    marginTop: "1rem",
    background: "#0d0d0d",
    border: "0.5px solid #1e1e1e",
    borderRadius: "8px",
    padding: "1.25rem",
    position: "relative",
    height: "64px",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  replayBtn: {
    marginTop: "0.5rem",
    float: "right",
    background: "transparent",
    border: "0.5px solid #222",
    color: "#444",
    padding: "5px 14px",
    fontSize: "11px",
    fontFamily: "monospace",
    borderRadius: "4px",
    cursor: "pointer",
    letterSpacing: "0.05em",
  },
};
