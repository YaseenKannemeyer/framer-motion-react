// ── SpringSection.jsx ─────────────────────────────────────────
// Explains duration, delay, ease, and spring transitions —
// with a live side-by-side comparison so readers can SEE
// the difference between a tween and a spring, not just read it.
//
// TWEEN vs SPRING:
//   Tween  → you set duration + ease. Predictable, scripted.
//            Interrupted mid-animation? It snaps or jumps.
//   Spring → you set stiffness + damping. Physics runs it.
//            Interrupted mid-animation? It smoothly redirects.
//            No duration needed — it settles when physics says so.

import { useState, useRef } from "react";
import { motion, animate } from "framer-motion";
import { s } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

// ── Transition keys reference data ───────────────────────────
const TWEEN_KEYS = [
  {
    key: "duration",
    desc: "How long the animation takes, in seconds.",
    ex: "0.8",
  },
  {
    key: "delay",
    desc: "Wait before starting. Stagger multiple elements.",
    ex: "0.3",
  },
  {
    key: "ease",
    desc: "The easing curve — string or cubic bezier array.",
    ex: '"easeOut"',
  },
];

const SPRING_KEYS = [
  {
    key: "type",
    desc: 'Set to "spring" to switch from tween to physics.',
    ex: '"spring"',
  },
  {
    key: "stiffness",
    desc: "How snappy the spring is. Higher = faster snap.",
    ex: "120",
  },
  {
    key: "damping",
    desc: "Resistance to bouncing. Lower = more oscillation.",
    ex: "14",
  },
  {
    key: "mass",
    desc: "Weight of the element. Higher = slower, heavier feel.",
    ex: "1",
  },
  {
    key: "delay",
    desc: "Works the same as in tweens — wait before starting.",
    ex: "0.2",
  },
];

// ── Visual spring vs tween comparison ────────────────────────
function ComparisonDemo() {
  const [running, setRunning] = useState(false);
  const tweenRef = useRef(null);
  const springRef = useRef(null);

  const run = () => {
    if (running) return;
    setRunning(true);

    // Reset both to start
    if (tweenRef.current) tweenRef.current.style.left = "16px";
    if (springRef.current) springRef.current.style.left = "16px";

    const trackEl = tweenRef.current?.parentElement;
    const travel = trackEl ? trackEl.offsetWidth - 32 - 32 : 260;

    // Tween — fixed duration easeInOut
    animate(
      tweenRef.current,
      { x: travel },
      {
        duration: 0.8,
        ease: "easeInOut",
        onComplete: () => setRunning(false),
      },
    );

    // Spring — physics-based
    animate(
      springRef.current,
      { x: travel },
      {
        type: "spring",
        stiffness: 120,
        damping: 14,
      },
    );
  };

  const reset = () => {
    animate(tweenRef.current, { x: 0 }, { duration: 0 });
    animate(springRef.current, { x: 0 }, { duration: 0 });
    setRunning(false);
  };

  return (
    <div
      style={{
        background: "#080808",
        border: "0.5px solid #1e1e1e",
        borderRadius: "10px",
        padding: "1.25rem 1.5rem",
        marginBottom: "1rem",
      }}
    >
      {/* Tween track */}
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "6px",
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
            Tween
          </span>
          <span style={{ fontSize: "10px", color: "#333", fontFamily: MONO }}>
            duration: 0.8s · ease: easeInOut
          </span>
        </div>
        <div
          style={{
            position: "relative",
            height: "44px",
            background: "#0d0d0d",
            border: "0.5px solid #1a1a1a",
            borderRadius: "6px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <motion.div
            ref={tweenRef}
            style={{
              position: "absolute",
              left: "16px",
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              background: "#666",
            }}
          />
        </div>
      </div>

      {/* Spring track */}
      <div style={{ marginBottom: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              color: "#4a9eff",
              fontFamily: MONO,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Spring
          </span>
          <span style={{ fontSize: "10px", color: "#333", fontFamily: MONO }}>
            stiffness: 120 · damping: 14
          </span>
        </div>
        <div
          style={{
            position: "relative",
            height: "44px",
            background: "#0d0d0d",
            border: "0.5px solid #1a1a1a",
            borderRadius: "6px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <motion.div
            ref={springRef}
            style={{
              position: "absolute",
              left: "16px",
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              background: "#4a9eff",
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={run}
          disabled={running}
          style={{
            background: running ? "transparent" : "#0d1f30",
            border: `0.5px solid ${running ? "#1e1e1e" : "#4a9eff"}`,
            color: running ? "#333" : "#4a9eff",
            padding: "7px 18px",
            borderRadius: "5px",
            fontSize: "11px",
            fontFamily: MONO,
            cursor: running ? "not-allowed" : "pointer",
            letterSpacing: "0.05em",
            transition: "all 0.15s",
          }}
        >
          ▶ Run
        </button>
        <button
          onClick={reset}
          style={{
            background: "transparent",
            border: "0.5px solid #222",
            color: "#444",
            padding: "7px 18px",
            borderRadius: "5px",
            fontSize: "11px",
            fontFamily: MONO,
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          ↺ Reset
        </button>
      </div>

      {/* Callout */}
      <div
        style={{
          marginTop: "1rem",
          fontSize: "11px",
          color: "#333",
          fontFamily: MONO,
          lineHeight: 1.6,
        }}
      >
        Notice: the spring overshoots slightly and settles naturally. The tween
        reaches the end at exactly 0.8s and stops.
      </div>
    </div>
  );
}

// ── Key table ────────────────────────────────────────────────
function KeyTable({ keys, accentColor = "#444" }) {
  return (
    <table style={{ ...s.table, marginBottom: 0 }}>
      <thead>
        <tr>
          <th style={s.th}>Key</th>
          <th style={s.th}>What it does</th>
          <th style={s.th}>Example</th>
        </tr>
      </thead>
      <tbody>
        {keys.map(({ key, desc, ex }, i) => (
          <tr key={key}>
            <td
              style={{
                ...s.td,
                color: accentColor,
                borderBottom:
                  i === keys.length - 1 ? "none" : s.td.borderBottom,
                whiteSpace: "nowrap",
              }}
            >
              <code>{key}</code>
            </td>
            <td
              style={{
                ...s.td,
                color: "#555",
                borderBottom:
                  i === keys.length - 1 ? "none" : s.td.borderBottom,
              }}
            >
              {desc}
            </td>
            <td
              style={{
                ...s.td,
                color: "#444",
                borderBottom:
                  i === keys.length - 1 ? "none" : s.td.borderBottom,
                whiteSpace: "nowrap",
              }}
            >
              <code style={{ fontFamily: MONO, fontSize: "11px" }}>{ex}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Main export ──────────────────────────────────────────────
export default function SpringSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.1 }}
    >
      <div style={s.sectionLabel}>Transition — tween vs spring</div>

      {/* ── Intro text ─────────────────────────────────────── */}
      <p style={{ ...s.stepBody, marginBottom: "1.5rem", color: "#555" }}>
        Every Framer Motion animation has a{" "}
        <code style={s.inlineCode}>transition</code> prop that controls how it
        plays. There are two fundamentally different modes — pick the right one
        and your UI feels alive. Pick the wrong one and it feels scripted.
      </p>

      {/* ── Side by side live demo ────────────────────────── */}
      <ComparisonDemo />

      {/* ── Tween keys ───────────────────────────────────── */}
      <div style={{ marginBottom: "0.75rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "0.75rem",
            paddingTop: "0.25rem",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "14px",
              background: "#444",
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              color: "#555",
              fontFamily: MONO,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Tween keys
          </span>
          <span
            style={{ fontSize: "10px", color: "#2a2a2a", fontFamily: MONO }}
          >
            type: "tween" (default)
          </span>
        </div>

        <div style={{ ...s.stepCard, marginBottom: "0.5rem" }}>
          <pre style={{ ...s.pre, margin: "0 0 1rem" }}>{`transition={{
  duration: 0.8,
  ease: "easeOut",
  delay: 0.2,
}}`}</pre>
          <div style={{ ...s.stepCard, padding: "0.5rem 0", marginBottom: 0 }}>
            <KeyTable keys={TWEEN_KEYS} accentColor="#555" />
          </div>
        </div>
      </div>

      {/* ── Spring keys ──────────────────────────────────── */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "14px",
              background: "#4a9eff",
              borderRadius: "2px",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              color: "#4a9eff",
              fontFamily: MONO,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Spring keys
          </span>
          <span
            style={{ fontSize: "10px", color: "#2a2a2a", fontFamily: MONO }}
          >
            type: "spring"
          </span>
        </div>

        <div style={{ ...s.stepCard, marginBottom: "0.5rem" }}>
          <pre style={{ ...s.pre, margin: "0 0 1rem" }}>{`transition={{
  type: "spring",
  stiffness: 120,
  damping: 14,
  mass: 1,
  delay: 0.2,
}}`}</pre>
          <div style={{ ...s.stepCard, padding: "0.5rem 0", marginBottom: 0 }}>
            <KeyTable keys={SPRING_KEYS} accentColor="#4a9eff" />
          </div>
        </div>
      </div>

      {/* ── When to use which ────────────────────────────── */}
      <div style={{ ...s.note, marginTop: "1rem" }}>
        <strong style={{ color: "#4a9eff" }}>When to use which: </strong>
        Use <code>tween</code> for entrance animations, page transitions, and
        anything decorative where you want exact timing control. Use{" "}
        <code>spring</code> for anything the user can interact with — hover,
        tap, drag, and focus states. Springs handle mid-animation interruptions
        naturally: if the user moves their cursor away before a hover animation
        finishes, a spring settles from wherever it currently is. A tween either
        completes or jumps — neither feels right.
      </div>
    </motion.div>
  );
}
