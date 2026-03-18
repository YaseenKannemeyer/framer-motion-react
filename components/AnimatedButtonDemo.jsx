// ── AnimatedButtonDemo.jsx ────────────────────────────────────
// Interactive demo showing whileHover, whileTap, and spring
// transitions on a button — with live sliders so readers can
// tune stiffness and damping and see the effect in real time.
//
// WHAT THIS DEMONSTRATES:
//
//  whileHover  → animates while the cursor is over the element.
//               Automatically reverses when cursor leaves.
//
//  whileTap    → animates while the element is being pressed.
//               Automatically reverses when released.
//
//  type: "spring" → physics-based animation. No fixed duration —
//               it runs until the physics settles naturally.
//
//  stiffness   → how snappy the spring is. Higher = faster snap.
//               Range: 50 (loose) → 500 (very snappy)
//
//  damping     → how much the spring resists bouncing.
//               Low damping = lots of bounce. High = no bounce.
//               Range: 5 (very bouncy) → 40 (no bounce)

import { useState } from "react";
import { motion } from "framer-motion";
import { s, C } from "@/components/styles";

// The live AnimatedButton — the actual component readers can
// copy into their own projects. stiffness and damping are props
// so they can be tuned from outside.
function AnimatedButton({ children, stiffness = 300, damping = 15 }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.9, y: 1 }}
      transition={{ type: "spring", stiffness, damping }}
      style={{
        border: "1px solid #333",
        background: "transparent",
        color: C.text,
        padding: "10px 28px",
        borderRadius: "6px",
        fontSize: "14px",
        fontFamily: "monospace",
        letterSpacing: "0.05em",
        cursor: "pointer",
      }}
    >
      {children}
    </motion.button>
  );
}

// Slider row used for stiffness and damping controls
function SliderRow({ label, value, min, max, onChange, hint }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
        <span style={{ fontSize: "12px", color: C.textMid, fontFamily: "monospace" }}>
          {label}
        </span>
        <span style={{ fontSize: "13px", fontWeight: 500, color: C.purple, fontFamily: "monospace" }}>
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: C.purple }}
      />
      <div style={{ fontSize: "10px", color: C.textMuted, fontFamily: "monospace", marginTop: "4px" }}>
        {hint}
      </div>
    </div>
  );
}

export default function AnimatedButtonDemo() {
  const [stiffness, setStiffness] = useState(300);
  const [damping,   setDamping]   = useState(15);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
    >
      <div style={s.sectionLabel}>Animated button — whileHover & whileTap</div>

      <div style={s.stepCard}>

        {/* Source code for the component */}
        <pre style={{ ...s.pre, marginBottom: "1.5rem" }}>{`import { motion } from "framer-motion";

function AnimatedButton({ children, stiffness = 300, damping = 15 }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.9, y: 1 }}
      transition={{ type: "spring", stiffness, damping }}
      className="border border-gray-300 px-4 py-2 rounded-md cursor-pointer"
    >
      {children}
    </motion.button>
  );
}`}</pre>

        {/* Live tuning sliders */}
        <div
          style={{
            background: C.surfaceTint,
            border: `1px solid ${C.border}`,
            borderRadius: "8px",
            padding: "1.25rem 1.5rem",
            marginBottom: "1rem",
          }}
        >
          <SliderRow
            label="stiffness"
            value={stiffness}
            min={50}
            max={500}
            onChange={setStiffness}
            hint="50 = loose and slow   →   500 = very snappy"
          />
          <SliderRow
            label="damping"
            value={damping}
            min={5}
            max={40}
            onChange={setDamping}
            hint="5 = lots of bounce   →   40 = no bounce at all"
          />
        </div>

        {/* Live preview — the actual AnimatedButton running with slider values */}
        <div
          style={{
            background: C.surfaceTint,
            border: `1px solid ${C.border}`,
            borderRadius: "8px",
            padding: "2.5rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "0.75rem",
          }}
        >
          <AnimatedButton stiffness={stiffness} damping={damping}>
            Hover or tap me
          </AnimatedButton>
        </div>

        {/* Prop breakdown table */}
        <div style={{ ...s.stepCard, marginBottom: 0, padding: "0.5rem 0" }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Prop / gesture</th>
                <th style={s.th}>What it does</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["whileHover",              "Runs while the cursor is over the element. Auto-reverses on mouse leave."],
                ["whileTap",               "Runs while the element is pressed. Auto-reverses on release."],
                ['type: "spring"',         "Physics-based animation. No fixed duration — settles naturally."],
                ["stiffness",              "How snappy the spring is. Higher = faster snap back."],
                ["damping",                "How much the spring resists oscillation. Lower = more bounce."],
                ["scale: 1.05",            "Grows to 105% of its size on hover."],
                ["y: -2 / y: 1",           "Lifts up 2px on hover, presses down 1px on tap."],
              ].map(([prop, desc], i, arr) => (
                <tr key={prop}>
                  <td style={{ ...s.td, color: C.purple, borderBottom: i === arr.length - 1 ? "none" : s.td.borderBottom, whiteSpace: "nowrap" }}>
                    <code>{prop}</code>
                  </td>
                  <td style={{ ...s.td, color: C.textMid, borderBottom: i === arr.length - 1 ? "none" : s.td.borderBottom }}>
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Annotation note */}
        <div style={{ ...s.note, marginTop: "1rem" }}>
          <strong style={{ color: C.purple }}>Why spring for buttons? </strong>
          Tweens (duration + ease) feel pre-recorded. Springs feel physical —
          they respond to interruptions naturally. If the user moves their cursor
          away mid-hover, a spring settles from wherever it currently is rather
          than snapping. This makes interactions feel alive rather than scripted.
          Try dragging the <code>damping</code> slider to 5 for maximum bounce,
          then 40 for a stiff, tight snap.
        </div>
      </div>
    </motion.div>
  );
}
