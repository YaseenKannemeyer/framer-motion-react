// ── TextAnimationDemo.jsx ─────────────────────────────────────
// Live interactive demo of text entrance animations.
//
// KEY PROP TRICK ─────────────────────────────────────────────
// Framer Motion entrance animations fire once — on mount.
// To replay: increment a `key` prop on the motion element.
// React sees a new key → unmounts old → mounts new → animation
// fires from scratch. This is the standard replay pattern.
//
// This demo goes further than a basic example by letting readers
// tune the exact values they'll copy into their own project.

import { useState } from "react";
import { motion } from "framer-motion";
import { s } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

// ── Direction presets ────────────────────────────────────────
const DIRECTIONS = [
  {
    label: "↓ from above",
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
  },
  {
    label: "↑ from below",
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  {
    label: "→ from left",
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  {
    label: "← from right",
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
  {
    label: "⊕ scale up",
    initial: { opacity: 0, scale: 0.7 },
    animate: { opacity: 1, scale: 1 },
  },
];

// ── Ease options ─────────────────────────────────────────────
const EASES = [
  { label: "easeOut", value: "easeOut" },
  { label: "easeInOut", value: "easeInOut" },
  { label: "easeIn", value: "easeIn" },
  { label: "backOut", value: "backOut" },
];

// ── SelectRow ────────────────────────────────────────────────
function SelectRow({
  label,
  value,
  options,
  onChange,
  getVal = (o) => o.value,
}) {
  return (
    <div style={{ marginBottom: "0.875rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            color: "#444",
            fontFamily: MONO,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <div
          style={{
            display: "flex",
            gap: "5px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => onChange(getVal(opt))}
              style={{
                background: value === getVal(opt) ? "#0d1f30" : "transparent",
                border:
                  value === getVal(opt)
                    ? "1px solid #4a9eff"
                    : "0.5px solid #222",
                color: value === getVal(opt) ? "#4a9eff" : "#444",
                padding: "3px 9px",
                borderRadius: "4px",
                fontSize: "10px",
                fontFamily: MONO,
                cursor: "pointer",
                transition: "all 0.12s",
                letterSpacing: "0.03em",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SliderRow ────────────────────────────────────────────────
function SliderRow({ label, value, min, max, step, onChange, display }) {
  return (
    <div style={{ marginBottom: "0.875rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "5px",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            color: "#444",
            fontFamily: MONO,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 500,
            color: "#4a9eff",
            fontFamily: MONO,
          }}
        >
          {display ?? value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#4a9eff" }}
      />
    </div>
  );
}

// ── Live preview ─────────────────────────────────────────────
function Preview({ replayKey, direction, ease, duration }) {
  return (
    <div
      style={{
        background: "#080808",
        border: "0.5px solid #1a1a1a",
        borderRadius: "8px",
        minHeight: "130px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        marginBottom: "0.75rem",
      }}
    >
      {/* Corner label */}
      <span
        style={{
          position: "absolute",
          top: "10px",
          left: "14px",
          fontSize: "9px",
          color: "#222",
          fontFamily: MONO,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        live preview
      </span>

      <motion.div
        key={replayKey}
        initial={direction.initial}
        animate={direction.animate}
        transition={{ duration, ease }}
      >
        <h2
          style={{
            fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#f0ebe0",
            margin: 0,
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.02em",
          }}
        >
          Hello, world!
        </h2>
      </motion.div>
    </div>
  );
}

// ── Code preview — updates live to show the exact values ─────
function CodePreview({ direction, ease, duration }) {
  const dirIndex = DIRECTIONS.findIndex((d) => d.label === direction.label);
  const d = DIRECTIONS[dirIndex];

  // Serialize initial/animate cleanly
  const fmt = (obj) =>
    "{ " +
    Object.entries(obj)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ") +
    " }";

  return (
    <pre
      style={{ ...s.pre, margin: "0 0 0.75rem", fontSize: "11px" }}
    >{`<motion.div
  initial={${fmt(d.initial)}}
  animate={${fmt(d.animate)}}
  transition={{ duration: ${duration}, ease: "${ease}" }}
>
  <h1>Hello, world!</h1>
</motion.div>`}</pre>
  );
}

// ── Main export ──────────────────────────────────────────────
export default function TextAnimationDemo() {
  const [replayKey, setReplayKey] = useState(0);
  const [dirIndex, setDirIndex] = useState(0);
  const [ease, setEase] = useState("easeInOut");
  const [duration, setDuration] = useState(0.8);

  const direction = DIRECTIONS[dirIndex];

  const replay = () => setReplayKey((k) => k + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.25 }}
    >
      <div style={s.sectionLabel}>Text entrance animation</div>

      <div style={s.stepCard}>
        {/* ── Live controls ─────────────────────────────── */}
        <div
          style={{
            background: "#080808",
            border: "0.5px solid #1a1a1a",
            borderRadius: "8px",
            padding: "1rem 1.25rem",
            marginBottom: "0.75rem",
          }}
        >
          <SelectRow
            label="direction"
            value={dirIndex}
            options={DIRECTIONS.map((d, i) => ({ label: d.label, value: i }))}
            onChange={(i) => {
              setDirIndex(i);
              replay();
            }}
            getVal={(o) => o.value}
          />
          <SelectRow
            label="ease"
            value={ease}
            options={EASES}
            onChange={(v) => {
              setEase(v);
              replay();
            }}
          />
          <SliderRow
            label="duration"
            value={duration}
            min={0.2}
            max={2}
            step={0.05}
            onChange={(v) => {
              setDuration(v);
              replay();
            }}
            display={`${duration}s`}
          />
        </div>

        {/* ── Live code — updates as controls change ────── */}
        <CodePreview direction={direction} ease={ease} duration={duration} />

        {/* ── Live preview ──────────────────────────────── */}
        <Preview
          replayKey={replayKey}
          direction={direction}
          ease={ease}
          duration={duration}
        />

        {/* ── Replay + key explanation ──────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{ fontSize: "10px", color: "#2a2a2a", fontFamily: MONO }}
          >
            key={`{${replayKey}}`} — increments on each replay
          </span>
          <button style={s.replayBtn} onClick={replay}>
            ↺ Replay
          </button>
        </div>

        {/* ── Key prop explanation ──────────────────────── */}
        <div style={{ ...s.note }}>
          <strong style={{ color: "#4a9eff" }}>The key prop trick: </strong>
          Framer Motion entrance animations fire once — on mount. To replay
          them, increment a <code>key</code> prop on the <code>motion</code>{" "}
          element. React sees a new key, unmounts the old element, mounts a
          fresh one, and the <code>initial → animate</code> transition fires
          again from scratch. Without this, the animation runs once and stays
          frozen. Watch the counter above — it increments every time you hit
          Replay or change a control.
        </div>
      </div>
    </motion.div>
  );
}
