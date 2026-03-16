// ── StepSwitcherDemo.jsx ──────────────────────────────────────
// Interactive demo showing AnimatePresence used to transition
// between two views — the foundation of page transitions,
// tab switching, wizards, and multi-step flows.
//
// WHAT THIS DEMONSTRATES:
//
//  AnimatePresence mode="wait" → the current view plays its exit
//                   animation to COMPLETION before the next view
//                   starts entering. This is what makes transitions
//                   feel like a clean handoff rather than a collision.
//
//  key on each child → AnimatePresence identifies which child is
//                   entering and which is leaving by their key.
//                   When step changes from 1 → 2:
//                     key="step1" exits (plays exit animation)
//                     key="step2" enters (plays initial → animate)
//                   This is the core pattern for ALL view transitions.
//
//  Directional exit → by changing the exit y value based on which
//                   direction the user is navigating (forward/back),
//                   you get a spatial transition — content slides in
//                   from the right and out to the left, reinforcing
//                   a sense of progression through a flow.
//
//  initial vs exit mirroring → for clean transitions, initial and
//                   exit should be mirror images. If a view enters
//                   from y:10 (below), it should exit to y:-10 (above).
//                   This creates a consistent direction of movement.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { s } from "./styles";

// ── Step content ─────────────────────────────────────────────
const STEPS = [
  {
    key:   "step1",
    label: "Step 1",
    title: "Install the package",
    body:  "Run npm install framer-motion in your project root.",
    color: "#378ADD",
  },
  {
    key:   "step2",
    label: "Step 2",
    title: "Import motion",
    body:  'Add import { motion } from "framer-motion" at the top of your file.',
    color: "#4ade80",
  },
  {
    key:   "step3",
    label: "Step 3",
    title: "Wrap and animate",
    body:  "Replace any HTML element with its motion.* equivalent and add initial, animate, and transition props.",
    color: "#f472b6",
  },
];

// ── Live StepSwitcher ────────────────────────────────────────
// The actual component. mode, duration, and direction are props
// so the controls can tune them live without remounting.
function StepSwitcher({ mode, duration, useDirection }) {
  const [step,    setStep]    = useState(0);
  const [prevStep, setPrevStep] = useState(0);

  const goTo = (next) => {
    setPrevStep(step);
    setStep(next);
  };

  const goNext = () => goTo(Math.min(step + 1, STEPS.length - 1));
  const goPrev = () => goTo(Math.max(step - 1, 0));

  // Directional animation: forward slides up, back slides down.
  // Without direction awareness all transitions look the same
  // regardless of which way the user is moving.
  const isForward  = step >= prevStep;
  const enterY     = useDirection ? (isForward ? 20 : -20) : 10;
  const exitY      = useDirection ? (isForward ? -20 : 20) : -10;

  const current = STEPS[step];

  return (
    <div>
      {/* Step indicators */}
      <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "1.25rem" }}>
        {STEPS.map((st, i) => (
          <button
            key={st.key}
            onClick={() => goTo(i)}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: i === step ? `1px solid ${st.color}` : "0.5px solid #222",
              background: i === step ? `${st.color}22` : "transparent",
              color: i === step ? st.color : "#444",
              fontSize: "11px",
              fontFamily: "monospace",
              cursor: "pointer",
              fontWeight: i === step ? 600 : 400,
              transition: "all 0.2s",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Transition area */}
      <div
        style={{
          position: "relative",
          height: "130px",
          overflow: "hidden",
          marginBottom: "1.25rem",
        }}
      >
        {/*
          AnimatePresence mode="wait":
          Step 1 fully exits BEFORE Step 2 starts entering.
          Change mode to "sync" in the controls above to see
          both animations overlapping — often feels messy.
        */}
        <AnimatePresence mode={mode}>
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: enterY }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: exitY }}
            transition={{ duration }}
            style={{
              position: "absolute",
              inset: 0,
              background: "#111",
              border: `0.5px solid ${current.color}33`,
              borderRadius: "10px",
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: current.color, fontFamily: "monospace" }}>
              {current.label}
            </div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "#f5f0e8", fontFamily: "monospace" }}>
              {current.title}
            </div>
            <div style={{ fontSize: "12px", color: "#555", fontFamily: "monospace", lineHeight: 1.6 }}>
              {current.body}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next buttons */}
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        <motion.button
          whileHover={{ scale: step > 0 ? 1.03 : 1 }}
          whileTap={{ scale: step > 0 ? 0.97 : 1 }}
          onClick={goPrev}
          disabled={step === 0}
          style={{
            background: "transparent",
            border: "0.5px solid #222",
            color: step === 0 ? "#2a2a2a" : "#555",
            padding: "7px 20px",
            borderRadius: "6px",
            fontSize: "12px",
            fontFamily: "monospace",
            cursor: step === 0 ? "not-allowed" : "pointer",
          }}
        >
          ← Prev
        </motion.button>
        <motion.button
          whileHover={{ scale: step < STEPS.length - 1 ? 1.03 : 1 }}
          whileTap={{ scale: step < STEPS.length - 1 ? 0.97 : 1 }}
          onClick={goNext}
          disabled={step === STEPS.length - 1}
          style={{
            background: "transparent",
            border: "0.5px solid #222",
            color: step === STEPS.length - 1 ? "#2a2a2a" : "#555",
            padding: "7px 20px",
            borderRadius: "6px",
            fontSize: "12px",
            fontFamily: "monospace",
            cursor: step === STEPS.length - 1 ? "not-allowed" : "pointer",
          }}
        >
          Next →
        </motion.button>
      </div>
    </div>
  );
}

// ── SelectRow ────────────────────────────────────────────────
function SelectRow({ label, value, options, onChange, hint }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <span style={{ fontSize: "12px", color: "#555", fontFamily: "monospace" }}>{label}</span>
        <div style={{ display: "flex", gap: "6px" }}>
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

// ── ToggleRow ────────────────────────────────────────────────
function ToggleRow({ label, value, onChange, hint }) {
  return (
    <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: "12px", color: "#555", fontFamily: "monospace", marginBottom: "2px" }}>{label}</div>
        <div style={{ fontSize: "10px", color: "#333", fontFamily: "monospace" }}>{hint}</div>
      </div>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: "40px", height: "22px", borderRadius: "999px",
          background: value ? "#378ADD" : "#1e1e1e",
          border: "0.5px solid #333", position: "relative",
          cursor: "pointer", transition: "background 0.2s",
          flexShrink: 0, marginLeft: "1rem",
        }}
      >
        <div style={{
          position: "absolute", top: "3px",
          left: value ? "20px" : "3px",
          width: "14px", height: "14px",
          borderRadius: "50%", background: "#f5f0e8",
          transition: "left 0.2s",
        }} />
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────
export default function StepSwitcherDemo() {
  const [mode,         setMode]         = useState("wait");
  const [duration,     setDuration]     = useState(0.3);
  const [useDirection, setUseDirection] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
    >
      <div style={s.sectionLabel}>AnimatePresence — view transitions & step switcher</div>

      <div style={s.stepCard}>

        {/* Source code */}
        <pre style={{ ...s.pre, marginBottom: "1.5rem" }}>{`import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function StepSwitcher() {
  const [step, setStep] = useState(1);

  return (
    <div>
      <button onClick={() => setStep((s) => (s === 1 ? 2 : 1))}>
        Toggle Step
      </button>

      {/*
        mode="wait" — step1 fully exits before step2 enters.
        Each child needs a unique key so AnimatePresence knows
        which one is leaving and which one is arriving.
      */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            Step 1
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            Step 2
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
            label="AnimatePresence mode"
            value={mode}
            options={[
              { label: '"wait"', value: "wait" },
              { label: '"sync"', value: "sync" },
            ]}
            onChange={setMode}
            hint='wait = clean handoff   sync = both animate at the same time (try it — feels messier)'
          />
          <SliderRow
            label="transition duration"
            value={duration}
            min={0.1}
            max={0.8}
            step={0.05}
            onChange={setDuration}
            hint="slow it down to see the exit and enter phases clearly"
          />
          <ToggleRow
            label="directional animation"
            value={useDirection}
            onChange={setUseDirection}
            hint="Next slides up, Prev slides down — spatially reinforces the flow"
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
          <StepSwitcher
            mode={mode}
            duration={duration}
            useDirection={useDirection}
          />
        </div>

        {/* Prop / concept breakdown */}
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
                ["key per view",        "Unique key on each child tells AnimatePresence which is entering and which is leaving."],
                ['mode="wait"',         "The current view exits fully before the next one enters — a clean sequential handoff."],
                ['mode="sync"',         "Both animations run at the same time — enter and exit overlap. Often feels busier."],
                ["Mirrored y values",   "exit: y:-10 mirrors initial: y:10 — content slides out the same direction it came from."],
                ["Directional exit",    "Flip exit direction based on forward/back navigation to reinforce spatial movement."],
                ["position: absolute", "Both views occupy the same space during the transition, so they overlap cleanly."],
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
          <strong style={{ color: "#378ADD" }}>The pattern in the wild: </strong>
          This is exactly how page transitions, tab panels, carousels, and
          onboarding wizards work in production apps. The container has{" "}
          <code>position: relative</code> and a fixed height — both views use{" "}
          <code>position: absolute</code> so they stack on top of each other
          during the transition rather than pushing layout around. Toggle{" "}
          <code>directional animation</code> on and click Prev to see the
          slides reverse direction — a small detail that makes navigation
          feel spatially grounded.
        </div>
      </div>
    </motion.div>
  );
}
