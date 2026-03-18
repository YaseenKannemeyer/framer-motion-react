// ── EaseDemo.jsx ──────────────────────────────────────────────
// Interactive easing visualizer.
//
// Click any ease card to see a ball animate across the track
// using that exact curve. Uses raw requestAnimationFrame +
// a cubic bezier solver — no Framer Motion needed here because
// we want to show the underlying math directly.
//
// The solver lives in utils.js and matches the same curves
// that Framer Motion uses internally for its ease strings.

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { s, C } from "@/components/styles";
import { easingMap, solveCubic } from "@/components/utils";

// The six easing options shown in the grid
const EASINGS = [
  { key: "easeIn",     desc: "Starts slow, ends fast. Good for exits." },
  { key: "easeOut",    desc: "Starts fast, decelerates. Natural entrances." },
  { key: "easeInOut",  desc: "Slow → fast → slow. Smooth and polished." },
  { key: "linear",     desc: "Constant speed. Feels mechanical." },
  { key: "backOut",    desc: "Overshoots then snaps back. Playful." },
  { key: "anticipate", desc: "Pullback before moving. Dramatic." },
];

export default function EaseDemo() {
  const [activeEase, setActiveEase] = useState("easeIn");
  const ballRef  = useRef(null);
  const trackRef = useRef(null);
  const rafRef   = useRef(null);

  // Animates the ball across the track using the selected easing curve.
  // cancelAnimationFrame ensures any in-progress animation is stopped first.
  const play = (easeKey) => {
    if (!ballRef.current || !trackRef.current) return;
    cancelAnimationFrame(rafRef.current);

    const ball      = ballRef.current;
    const maxTravel = trackRef.current.offsetWidth - 32 - 32; // track width minus ball & padding
    const [p1x, p1y, p2x, p2y] = easingMap[easeKey];
    const ease      = solveCubic(p1x, p1y, p2x, p2y);
    const duration  = 900;
    let start       = null;

    ball.style.left = "16px"; // reset to start

    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      ball.style.left = 16 + ease(progress) * maxTravel + "px";
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const handleSelect = (key) => {
    setActiveEase(key);
    play(key);
  };

  // Auto-play on mount so the demo isn't static when the page loads
  useEffect(() => {
    const t = setTimeout(() => play(activeEase), 400);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.95 }}
    >
      <div style={s.sectionLabel}>Easing — click to preview</div>

      {/* Ease selection cards */}
      <div style={s.easeGrid}>
        {EASINGS.map((e) => (
          <div
            key={e.key}
            onClick={() => handleSelect(e.key)}
            style={{
              background:   activeEase === e.key ? C.purpleLight : C.surfaceTint,
              border:       activeEase === e.key ? `1px solid ${C.purple}` : `1px solid ${C.border}`,
              borderRadius: "8px",
              padding:      "0.75rem 1rem",
              cursor:       "pointer",
              transition:   "border-color 0.15s",
            }}
          >
            <div style={{ fontSize: "12px", fontWeight: 600, color: activeEase === e.key ? C.purple : C.purpleDim, fontFamily: "monospace", marginBottom: "4px" }}>
              {e.key}
            </div>
            <div style={{ fontSize: "11px", color: C.textMuted, fontFamily: "monospace", lineHeight: 1.4 }}>
              {e.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Live animation track */}
      <div ref={trackRef} style={s.demoTrack}>
        <div
          ref={ballRef}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: C.purple,
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        <span style={{ position: "absolute", right: "16px", fontSize: "10px", color: C.textMuted, fontFamily: "monospace" }}>
          click an ease above, then replay
        </span>
      </div>

      <div style={{ overflow: "hidden" }}>
        <button style={s.replayBtn} onClick={() => play(activeEase)}>
          ↺ Replay
        </button>
      </div>
    </motion.div>
  );
}
