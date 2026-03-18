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
import { C } from "@/components/styles";

// ── Typography tokens ────────────────────────────────────────
const MONO = "'Overpass Mono', 'Courier New', monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

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
              color: color || C.text,
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
            stroke={C.purple}
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
          color: C.purple,
          fontFamily: MONO,
          letterSpacing: "-0.03em",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: "10px",
          color: C.textMuted,
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
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            border: `1px solid ${C.purpleBorder}`,
            borderRadius: "6px",
            padding: "5px 12px",
            background: C.purpleLight,
          }}
        >
          {/* Pulsing dot */}
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: C.purple,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "10px",
              color: C.purple,
              fontFamily: MONO,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            React Animation Blog
          </span>
        </motion.div>

        {/* Issue label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "10px",
            color: C.textMuted,
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
            height: "1.5px",
            background: `linear-gradient(to right, ${C.purple}, ${C.purpleLight})`,
            borderRadius: "999px",
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
          color: C.text,
        }}
      >
        {/* Line 1 */}
        <span style={{ display: "block" }}>
          <WordReveal text="Animate your UI" delay={0.45} />
        </span>

        {/* Line 2 — accent word stands out */}
        <span style={{ display: "block" }}>
          <WordReveal text="with" delay={0.6} color={C.textMid} />
          <WordReveal
            text="Framer Motion"
            delay={0.65}
            color={C.purple}
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
          style={{
            height: "1px",
            background: C.purpleMid,
            borderRadius: "999px",
          }}
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
          color: C.textMid,
          lineHeight: 1.8,
          maxWidth: "520px",
          margin: "0 0 2.5rem",
          letterSpacing: "0.01em",
        }}
      >
        A beginner's guide to installing, importing, and using motion components
        to bring your React app to life, with live interactive examples
        throughout.
      </motion.p>

      {/* ── Stats row ────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          paddingTop: "2rem",
          borderTop: `1px solid ${C.border}`,
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
          color: C.textFaint,
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
