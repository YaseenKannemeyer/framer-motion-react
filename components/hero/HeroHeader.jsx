// ── HeroHeader.jsx ────────────────────────────────────────────
// The top of the page: badge, h1, and subtitle.
//
// Animation pattern used here: staggered cascade.
// Three elements enter in sequence using incrementing delays:
//   badge    → delay: 0      (first to appear)
//   h1       → delay: 0.15   (arrives as badge lands)
//   subtitle → delay: 0.35   (guides the eye downward last)
//
// This makes the layout feel intentional and guided rather
// than everything popping in at the same time.

import { motion } from "framer-motion";
import { s } from "@/components/styles";

export default function HeroHeader() {
  return (
    <>
      {/* Badge — slides down from above, fades in */}
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
        style={s.badge}
      >
        React Animation Blog
      </motion.span>

      {/*
        y: -40 → starts 40px ABOVE its natural position, slides DOWN.
        easeOut → fast start, decelerates — feels like it "lands".
        duration 0.8 = 800ms total.
      */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        style={s.h1}
      >
        Animate your UI with{" "}
        <span style={{ color: "#378ADD", fontStyle: "italic" }}>
          Framer Motion
        </span>
      </motion.h1>

      {/*
        y: 20 → starts 20px BELOW and slides UP into place.
        easeInOut → symmetric curve, slow-fast-slow. Polished feel.
      */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.35 }}
        style={s.subtitle}
      >
        A beginner's guide to installing, importing, and using motion components
        to bring your React app to life.
      </motion.p>
    </>
  );
}
