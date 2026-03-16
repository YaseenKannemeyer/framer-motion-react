// ── HeroHeader.jsx ────────────────────────────────────────────
// Hero header with a sharp editorial dark aesthetic.
//
// Design decisions:
//   - Overpass Mono + system serif pairing — technical but human
//   - Animated character-by-character word reveal on the h1
//   - Subtle SVG grid overlay adds depth without distracting
//   - Horizontal rule accent lines frame the content
//   - Stat row (3 quick facts) grounds the blog with credibility
//   - All colours are hardcoded dark theme tokens — no system overrides
//
// Animation breakdown:
//   badge    → clip-path reveal + fade, delay 0
//   rule     → width expands from 0, delay 0.3
//   h1 words → each word is a motion.span with staggered delay
//   subtitle → fade + slide up, delay 0.9
//   stats    → stagger across 3 items, delay 1.1+

import { motion } from "framer-motion";

// ── Typography tokens ────────────────────────────────────────
const MONO = "'Overpass Mono', 'Courier New', monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

// ── Colour tokens ────────────────────────────────────────────
const C = {
  bg: "#080808",
  surface: "#0f0f0f",
  border: "#1c1c1c",
  muted: "#2a2a2a",
  dim: "#444",
  subtle: "#666",
  mid: "#888",
  body: "#b0a898",
  cream: "#f0ebe0",
  accent: "#4a9eff",
  accentDim: "#1a3a5c",
};

// ── Animated word split ──────────────────────────────────────
// Splits a string into words and animates each individually.
// Each word is wrapped in overflow:hidden so the clip looks clean.
function WordReveal({ text, color, delay = 0, style = {} }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            marginRight: "0.28em",
          }}
        >
          <motion.span
            display="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1], // custom expo out — sharp deceleration
              delay: delay + i * 0.07,
            }}
            style={{
              display: "inline-block",
              color: color || C.cream,
              ...style,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

// ── Decorative SVG grid ──────────────────────────────────────
function GridOverlay() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.035,
      }}
    >
      <defs>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="#fff"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

// ── Stat item ────────────────────────────────────────────────
function Stat({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      style={{ display: "flex", flexDirection: "column", gap: "3px" }}
    >
      <span
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: C.accent,
          fontFamily: MONO,
          letterSpacing: "-0.03em",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: "10px",
          color: C.subtle,
          fontFamily: MONO,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ── HeroHeader ───────────────────────────────────────────────
export default function HeroHeader() {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "3rem",
        marginBottom: "1rem",
      }}
    >
      <GridOverlay />

      {/* ── Top meta row ─────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2.5rem",
        }}
      >
        {/* Issue label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "10px",
            color: C.muted,
            fontFamily: MONO,
            letterSpacing: "0.08em",
          }}
        >
          Vol. 01
        </motion.span>
      </div>

      {/* ── Horizontal rule — expands from left ──────────── */}
      <div style={{ marginBottom: "2rem", overflow: "hidden" }}>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{
            height: "0.5px",
            background: `linear-gradient(to right, ${C.accent}, ${C.border})`,
          }}
        />
      </div>

      {/* ── Main heading ─────────────────────────────────── */}
      <h1
        style={{
          fontSize: "clamp(2.2rem, 6.5vw, 5rem)",
          fontFamily: SERIF,
          fontWeight: 400,
          fontStyle: "italic",
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          margin: "0 0 0.5rem",
          color: C.cream,
        }}
      >
        {/* Line 1 */}
        <span style={{ display: "block" }}>
          <WordReveal text="Animate your UI" delay={0.45} />
        </span>

        {/* Line 2 — accent word stands out */}
        <span style={{ display: "block" }}>
          <WordReveal text="with" delay={0.6} color={C.body} />
          <WordReveal
            text="Framer Motion"
            delay={0.65}
            color={C.accent}
            style={{
              fontStyle: "normal",
              fontFamily: MONO,
              fontSize: "0.82em",
              letterSpacing: "-0.04em",
            }}
          />
        </span>
      </h1>

      {/* ── Small rule under heading ──────────────────────── */}
      <div style={{ margin: "1.75rem 0 1.5rem", overflow: "hidden" }}>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "40%" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.85 }}
          style={{ height: "0.5px", background: C.border }}
        />
      </div>

      {/* ── Subtitle ─────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
        style={{
          fontSize: "15px",
          fontFamily: MONO,
          color: C.body,
          lineHeight: 1.8,
          maxWidth: "520px",
          margin: "0 0 2.5rem",
          letterSpacing: "0.01em",
        }}
      >
        A beginner's guide to installing, importing, and using motion components
        to bring your React app to life — with live interactive examples
        throughout.
      </motion.p>

      {/* ── Stats row ────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          paddingTop: "2rem",
          borderTop: `0.5px solid ${C.border}`,
        }}
      >
        <Stat value="8" label="Concepts covered" delay={1.1} />
        <Stat value="100%" label="Interactive demos" delay={1.2} />
        <Stat value="Beginner" label="Difficulty" delay={1.3} />
      </div>

      {/* ── Bottom corner label ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          fontSize: "9px",
          color: C.muted,
          fontFamily: MONO,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        framer-motion v11
      </motion.div>
    </div>
  );
}
