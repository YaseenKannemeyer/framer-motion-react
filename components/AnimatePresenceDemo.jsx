// ── AnimatePresenceDemo.jsx ───────────────────────────────────
// Interactive demo showing AnimatePresence — Framer Motion's
// tool for animating elements as they are REMOVED from the DOM.
//
// WHAT THIS DEMONSTRATES:
//
//  AnimatePresence → a wrapper component that watches its children.
//                   When a child is removed (conditional render goes
//                   false), AnimatePresence lets it play its `exit`
//                   animation BEFORE React actually unmounts it.
//                   Without this wrapper, exit animations are
//                   impossible — React removes the element instantly.
//
//  exit            → the animation state to reach before unmounting.
//                   Works exactly like `initial` and `animate`, but
//                   only plays when the element is being removed.
//
//  mode            → controls how AnimatePresence handles multiple
//                   children entering/leaving at the same time:
//
//   "sync"  (default) → enter and exit happen simultaneously.
//   "wait"            → waits for exit to finish before entering.
//   "popLayout"       → exiting element is removed from layout flow
//                       immediately, so other elements reflow at once.
//
//  key             → AnimatePresence tracks children by their `key`.
//                   Changing a key = old element exits, new one enters.
//                   This is also how you animate between pages/views.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { s } from "./styles";

// ── Alert types ──────────────────────────────────────────────
const ALERT_TYPES = {
  error: {
    label: "Error",
    bg:     "#1a0a0a",
    border: "#3a1a1a",
    color:  "#f87171",
    dot:    "#ef4444",
    text:   "Something went wrong. Please try again.",
  },
  success: {
    label: "Success",
    bg:     "#0a1a0f",
    border: "#1a3a22",
    color:  "#4ade80",
    dot:    "#22c55e",
    text:   "Changes saved successfully.",
  },
  info: {
    label: "Info",
    bg:     "#0a1220",
    border: "#1a2a44",
    color:  "#60a5fa",
    dot:    "#3b82f6",
    text:   "Your session will expire in 5 minutes.",
  },
};

// ── Live DismissableAlert ────────────────────────────────────
// The component readers can copy. type, mode, duration and
// direction are props so the controls can tune them live.
function DismissableAlert({ alertType, mode, duration, exitDir }) {
  const [open, setOpen] = useState(false);
  const t = ALERT_TYPES[alertType];

  // Build exit/initial based on direction toggle
  const yVal = exitDir === "up" ? -20 : 20;

  return (
    <div>
      {/* Toggle button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setOpen((o) => !o)}
          style={{
            background: "transparent",
            border: open ? "1px solid #378ADD" : "0.5px solid #333",
            color: open ? "#378ADD" : "#666",
            padding: "8px 24px",
            borderRadius: "6px",
            fontSize: "12px",
            fontFamily: "monospace",
            cursor: "pointer",
            transition: "border-color 0.15s, color 0.15s",
          }}
        >
          {open ? "Hide alert" : "Show alert"}
        </motion.button>
      </div>

      {/*
        AnimatePresence MUST wrap the conditionally rendered element.
        Without it, the exit animation never plays — React would
        remove the element from the DOM before it can animate out.
      */}
      <AnimatePresence mode={mode}>
        {open && (
          <motion.div
            key="alert"
            initial={{ opacity: 0, y: yVal }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: yVal }}
            transition={{ duration }}
            style={{
              background: t.bg,
              border: `0.5px solid ${t.border}`,
              borderRadius: "8px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "13px",
              color: t.color,
              fontFamily: "monospace",
            }}
          >
            {/* Coloured dot */}
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: t.dot,
              flexShrink: 0,
            }} />
            {t.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── SliderRow ────────────────────────────────────────────────
function SliderRow({ label, value, min, max, step, onChange, hint }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
        <span style={{ fontSize: "12px", color: "#555", fontFamily: "monospace" }}>{label}</span>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#378ADD", fontFamily: "monospace" }}>{value}s</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#378ADD" }}
      />
      <div style={{ fontSize: "10px", color: "#333", fontFamily: "monospace", marginTop: "4px" }}>{hint}</div>
    </div>
  );
}

// ── SelectRow ────────────────────────────────────────────────
function SelectRow({ label, value, options, onChange, hint }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <span style={{ fontSize: "12px", color: "#555", fontFamily: "monospace" }}>{label}</span>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              style={{
                background: value === opt.value ? "#378ADD22" : "transparent",
                border: value === opt.value ? "1px solid #378ADD" : "0.5px solid #333",
                color: value === opt.value ? "#378ADD" : "#555",
                padding: "3px 10px",
                borderRadius: "4px",
                fontSize: "11px",
                fontFamily: "monospace",
                cursor: "pointer",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ fontSize: "10px", color: "#333", fontFamily: "monospace" }}>{hint}</div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────
export default function AnimatePresenceDemo() {
  const [alertType, setAlertType] = useState("error");
  const [mode,      setMode]      = useState("sync");
  const [duration,  setDuration]  = useState(0.25);
  const [exitDir,   setExitDir]   = useState("up");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
    >
      <div style={s.sectionLabel}>AnimatePresence — animating exit</div>

      <div style={s.stepCard}>

        {/* Source code */}
        <pre style={{ ...s.pre, marginBottom: "1.5rem" }}>{`import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DismissableAlert() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen((o) => !o)}>
        Toggle alert
      </button>

      {/*
        AnimatePresence must wrap the conditional element.
        Without it, React removes it instantly — no exit animation.
      */}
      <AnimatePresence mode="sync">
        {open && (
          <motion.div
            key="alert"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            This is an animated alert.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`}</pre>

        {/* Live controls */}
        <div
          style={{
            background: "#0d0d0d",
            border: "0.5px solid #1e1e1e",
            borderRadius: "8px",
            padding: "1.25rem 1.5rem",
            marginBottom: "1rem",
          }}
        >
          <SelectRow
            label="alert type"
            value={alertType}
            options={[
              { label: "error",   value: "error"   },
              { label: "success", value: "success" },
              { label: "info",    value: "info"    },
            ]}
            onChange={setAlertType}
            hint="switches the alert colour — show/hide to see it re-enter"
          />
          <SelectRow
            label="AnimatePresence mode"
            value={mode}
            options={[
              { label: '"sync"',      value: "sync"      },
              { label: '"wait"',      value: "wait"      },
              { label: '"popLayout"', value: "popLayout" },
            ]}
            onChange={setMode}
            hint='sync = simultaneous   wait = exit finishes before enter   popLayout = instant reflow'
          />
          <SelectRow
            label="exit direction"
            value={exitDir}
            options={[
              { label: "up",   value: "up"   },
              { label: "down", value: "down" },
            ]}
            onChange={setExitDir}
            hint="direction the alert slides when entering and exiting"
          />
          <SliderRow
            label="transition duration"
            value={duration}
            min={0.1}
            max={1}
            step={0.05}
            onChange={setDuration}
            hint="0.1s = very snappy   →   1s = slow and deliberate"
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
            minHeight: "100px",
          }}
        >
          <DismissableAlert
            alertType={alertType}
            mode={mode}
            duration={duration}
            exitDir={exitDir}
          />
        </div>

        {/* Prop breakdown table */}
        <div style={{ ...s.stepCard, marginBottom: 0, padding: "0.5rem 0" }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Prop / concept</th>
                <th style={s.th}>What it does</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["<AnimatePresence>",  "Wrapper that intercepts unmounts and plays exit animations before removal."],
                ["exit",              "The animation state to reach before the element is removed from the DOM."],
                ['mode="sync"',       "Enter and exit animations play at the same time (default)."],
                ['mode="wait"',       "Waits for the exit to fully complete before the enter begins."],
                ['mode="popLayout"',  "Exiting element is removed from layout flow immediately so others reflow."],
                ["key",               "AnimatePresence tracks children by key. Changing key = exit old, enter new."],
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
          <strong style={{ color: "#378ADD" }}>The key insight: </strong>
          React removes elements from the DOM synchronously — there is no
          "about to unmount" phase for animations to hook into. This is exactly
          what <code>AnimatePresence</code> solves. It intercepts the unmount,
          plays the <code>exit</code> animation to completion, then lets React
          remove the element. Try switching <code>mode</code> to{" "}
          <code>"wait"</code> — the alert fully disappears before reappearing,
          which is useful for page transitions. The <code>key</code> prop on
          the child is required so AnimatePresence knows which element to track.
        </div>
      </div>
    </motion.div>
  );
}
