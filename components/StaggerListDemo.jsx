// ── StaggerListDemo.jsx ───────────────────────────────────────
// Interactive demo showing Framer Motion's variants system
// and staggerChildren — one of the most powerful patterns
// for animating lists, menus, grids, and any repeated elements.
//
// WHAT THIS DEMONSTRATES:
//
//  variants        → named animation states defined OUTSIDE JSX.
//                   Keeps your JSX clean — instead of writing
//                   initial={{ opacity: 0, y: 20 }} on every child,
//                   you define it once as an object and reference
//                   it by name: initial="hidden" animate="visible"
//
//  staggerChildren → when a parent animates, its children don't
//                   all fire at once. Each child waits this many
//                   seconds before starting its own animation.
//                   e.g. staggerChildren: 0.15 = each item waits
//                   150ms after the previous one.
//
//  delayChildren   → adds an initial pause before the FIRST child
//                   starts animating. Useful for letting a parent
//                   element settle before its children cascade in.
//
//  variant inheritance → child motion elements automatically
//                   inherit the parent's "hidden"/"visible" state.
//                   You don't need to pass initial/animate to each
//                   child — the parent propagates it down.

import { useState } from "react";
import { motion } from "framer-motion";
import { s } from "./styles";

// ── Variant definitions ──────────────────────────────────────
// Defined outside the component so they're not recreated on
// every render. These are plain objects — no hooks, no JSX.

// Parent container: controls stagger timing for all children
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,  // each child starts 150ms after the last
      delayChildren: 0.2,     // wait 200ms before the first child starts
    },
  },
};

// Each list item: slides up and fades in
// No transition defined here — it inherits timing from the parent
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ── Live FeaturesList ────────────────────────────────────────
// The actual component readers can copy into their own projects.
// stagger and delay are props so they can be tuned from outside.
function FeaturesList({ features, stagger, delay }) {
  // key trick: changing this remounts the list, replaying the animation
  const [replayKey, setReplayKey] = useState(0);

  // Rebuild the container variant with current slider values
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <div>
      <motion.ul
        key={replayKey}
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {features.map((feature) => (
          // Each child just needs variants={item} — no initial/animate needed.
          // The parent propagates "hidden" and "visible" down automatically.
          <motion.li
            key={feature}
            variants={item}
            style={{
              background: "#111",
              border: "0.5px solid #1e1e1e",
              borderRadius: "6px",
              padding: "10px 16px",
              fontSize: "13px",
              color: "#f5f0e8",
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ color: "#378ADD", fontSize: "10px" }}>▸</span>
            {feature}
          </motion.li>
        ))}
      </motion.ul>

      <div style={{ overflow: "hidden", marginTop: "0.75rem" }}>
        <button
          style={s.replayBtn}
          onClick={() => setReplayKey((k) => k + 1)}
        >
          ↺ Replay
        </button>
      </div>
    </div>
  );
}

// ── SliderRow ────────────────────────────────────────────────
function SliderRow({ label, value, min, max, step, onChange, hint }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
        <span style={{ fontSize: "12px", color: "#555", fontFamily: "monospace" }}>
          {label}
        </span>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#378ADD", fontFamily: "monospace" }}>
          {value}s
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#378ADD" }}
      />
      <div style={{ fontSize: "10px", color: "#333", fontFamily: "monospace", marginTop: "4px" }}>
        {hint}
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────
export default function StaggerListDemo() {
  const [stagger, setStagger] = useState(0.15);
  const [delay,   setDelay]   = useState(0.2);

  const features = ["Fast", "Reliable", "Easy to use", "Customizable", "Secure"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
    >
      <div style={s.sectionLabel}>Variants & staggerChildren</div>

      <div style={s.stepCard}>

        {/* Source code */}
        <pre style={{ ...s.pre, marginBottom: "1.5rem" }}>{`import { motion } from "framer-motion";

// Define variants outside the component —
// keeps JSX clean and avoids recreating objects on every render.
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,  // each child waits 150ms
      delayChildren: 0.2,     // first child waits 200ms
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function FeaturesList() {
  const features = ["Fast", "Reliable", "Easy to use", "Customizable", "Secure"];

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {features.map((feature) => (
        // No initial/animate needed on children —
        // the parent propagates its state down automatically.
        <motion.li key={feature} variants={item}>
          {feature}
        </motion.li>
      ))}
    </motion.ul>
  );
}`}</pre>

        {/* Live sliders */}
        <div
          style={{
            background: "#0d0d0d",
            border: "0.5px solid #1e1e1e",
            borderRadius: "8px",
            padding: "1.25rem 1.5rem",
            marginBottom: "1rem",
          }}
        >
          <SliderRow
            label="staggerChildren"
            value={stagger}
            min={0.05}
            max={0.6}
            step={0.05}
            onChange={setStagger}
            hint="0.05s = fast sweep   →   0.6s = very slow cascade"
          />
          <SliderRow
            label="delayChildren"
            value={delay}
            min={0}
            max={1}
            step={0.1}
            onChange={setDelay}
            hint="0s = start immediately   →   1s = long initial pause"
          />
        </div>

        {/* Live preview */}
        <div
          style={{
            background: "#0d0d0d",
            border: "0.5px solid #1e1e1e",
            borderRadius: "8px",
            padding: "1.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <FeaturesList
            features={features}
            stagger={stagger}
            delay={delay}
          />
        </div>

        {/* Prop breakdown table */}
        <div style={{ ...s.stepCard, marginBottom: 0, padding: "0.5rem 0" }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Concept</th>
                <th style={s.th}>What it does</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["variants",         "Named animation states defined as plain objects outside JSX. Keeps markup clean."],
                ["initial=\"hidden\"", "Sets the starting state by referencing the variant name — no inline object needed."],
                ["animate=\"visible\"","The target state to animate toward, again by name."],
                ["staggerChildren",  "Delay between each child's animation start. Creates a cascade effect."],
                ["delayChildren",    "Extra wait before the very first child begins animating."],
                ["inheritance",      "Child motion elements inherit the parent's state — no need to repeat initial/animate on each one."],
              ].map(([prop, desc], i, arr) => (
                <tr key={prop}>
                  <td style={{ ...s.td, color: "#378ADD", borderBottom: i === arr.length - 1 ? "none" : s.td.borderBottom, whiteSpace: "nowrap" }}>
                    <code>{prop}</code>
                  </td>
                  <td style={{ ...s.td, color: "#555", borderBottom: i === arr.length - 1 ? "none" : s.td.borderBottom }}>
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Annotation note */}
        <div style={{ ...s.note, marginTop: "1rem" }}>
          <strong style={{ color: "#378ADD" }}>Why variants? </strong>
          Without variants, animating a list of 10 items means writing{" "}
          <code>initial</code>, <code>animate</code>, and{" "}
          <code>transition</code> on every single <code>motion.li</code>.
          Variants let you define those states once and reference them by name.
          The parent then coordinates timing for all children automatically
          via <code>staggerChildren</code> — no manual delay calculations needed.
          Try dragging <code>staggerChildren</code> to 0.4s to see each item
          land individually, or 0.05s for a near-simultaneous sweep.
        </div>
      </div>
    </motion.div>
  );
}
