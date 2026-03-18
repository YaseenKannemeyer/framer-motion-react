// ── LiveBadgeDemo.jsx ─────────────────────────────────────────
// Interactive demo showing keyframe animations and repeat
// options in Framer Motion — the foundation of looping,
// pulsing, and attention-grabbing UI effects.
//
// WHAT THIS DEMONSTRATES:
//
//  Keyframe arrays  → instead of animating from A to B, you can
//                   pass an ARRAY of values to animate through
//                   multiple states in sequence:
//                   scale: [1, 1.15, 1]
//                   This goes: normal → enlarged → normal
//                   Each value in the array is a keyframe stop.
//
//  repeat          → how many times the animation loops.
//                   Infinity = loops forever.
//                   A number like 3 = plays 3 times then stops.
//
//  repeatType      → controls the loop behaviour:
//   "loop"    → restarts from the beginning each time (default)
//   "reverse" → plays forwards then backwards, back and forth
//   "mirror"  → like reverse but easing is also mirrored
//
//  repeatDelay     → pause (in seconds) between each repeat cycle.
//                   Great for "breathe" effects — animate, rest,
//                   animate again. Without it, loops are continuous.
//
//  times           → optional array that maps keyframes to points
//                   in the animation (0 = start, 1 = end).
//                   times: [0, 0.5, 1] is the default for 3 keyframes.
//                   Shift values to speed up or slow down individual
//                   segments: times: [0, 0.2, 1] rushes to the peak
//                   then slowly returns.
//
//  boxShadow array → Framer Motion can animate CSS properties that
//                   React can't natively tween, including box-shadow.
//                   The values must share the same shadow structure
//                   (same number of layers, same rgba format).

import { useState } from "react";
import { motion } from "framer-motion";
import { s, C } from "@/components/styles";

// ── Badge colours ────────────────────────────────────────────
const BADGE_COLORS = {
  purple: {
    label:      "purple",
    bg:         "#7c3aed",
    glowStart:  "rgba(124, 58, 237, 0.3)",
    glowPeak:   "rgba(124, 58, 237, 0.8)",
    glowEnd:    "rgba(124, 58, 237, 0.3)",
    text:       "#fff",
  },
  red: {
    label:      "red",
    bg:         "#dc2626",
    glowStart:  "rgba(220, 38, 38, 0.3)",
    glowPeak:   "rgba(220, 38, 38, 0.8)",
    glowEnd:    "rgba(220, 38, 38, 0.3)",
    text:       "#fff",
  },
  blue: {
    label:      "blue",
    bg:         "#2563eb",
    glowStart:  "rgba(37, 99, 235, 0.3)",
    glowPeak:   "rgba(37, 99, 235, 0.8)",
    glowEnd:    "rgba(37, 99, 235, 0.3)",
    text:       "#fff",
  },
  green: {
    label:      "green",
    bg:         "#16a34a",
    glowStart:  "rgba(22, 163, 74, 0.3)",
    glowPeak:   "rgba(22, 163, 74, 0.8)",
    glowEnd:    "rgba(22, 163, 74, 0.3)",
    text:       "#fff",
  },
};

// ── Live LiveBadge ───────────────────────────────────────────
// The actual component. All animation values are props so the
// controls can tune them in real time.
function LiveBadge({ color, duration, repeatDelay, repeatType, scaleAmount }) {
  const c = BADGE_COLORS[color];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <motion.span
        animate={{
          // Keyframe array: normal → peak → back to normal
          scale: [1, scaleAmount, 1],
          boxShadow: [
            `0 0 0px ${c.glowStart}`,
            `0 0 12px ${c.glowPeak}`,
            `0 0 0px ${c.glowEnd}`,
          ],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType,
          repeatDelay,
          ease: "easeInOut",
        }}
        style={{
          background: c.bg,
          color: c.text,
          padding: "4px 12px",
          borderRadius: "999px",
          fontWeight: 700,
          fontSize: "11px",
          fontFamily: "monospace",
          letterSpacing: "0.1em",
          display: "inline-block",
          cursor: "default",
          userSelect: "none",
        }}
      >
        ● LIVE
      </motion.span>
    </div>
  );
}

// ── SelectRow ────────────────────────────────────────────────
function SelectRow({ label, value, options, onChange, hint }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <span style={{ fontSize: "12px", color: C.textMid, fontFamily: "monospace" }}>{label}</span>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              style={{
                background: value === opt.value ? "#378ADD22" : "transparent",
                border: value === opt.value ? "1px solid #378ADD" : "0.5px solid #333",
                color: value === opt.value ? C.purple : "#555",
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
      <div style={{ fontSize: "10px", color: C.textMuted, fontFamily: "monospace" }}>{hint}</div>
    </div>
  );
}

// ── SliderRow ────────────────────────────────────────────────
function SliderRow({ label, value, min, max, step, onChange, hint }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
        <span style={{ fontSize: "12px", color: C.textMid, fontFamily: "monospace" }}>{label}</span>
        <span style={{ fontSize: "13px", fontWeight: 500, color: C.purple, fontFamily: "monospace" }}>{value}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: C.purple }}
      />
      <div style={{ fontSize: "10px", color: C.textMuted, fontFamily: "monospace", marginTop: "4px" }}>{hint}</div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────
export default function LiveBadgeDemo() {
  const [color,       setColor]       = useState("purple");
  const [duration,    setDuration]    = useState(1.2);
  const [repeatDelay, setRepeatDelay] = useState(3);
  const [repeatType,  setRepeatType]  = useState("reverse");
  const [scaleAmount, setScaleAmount] = useState(1.15);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
    >
      <div style={s.sectionLabel}>Keyframes & repeat — looping animations</div>

      <div style={s.stepCard}>

        {/* Source code */}
        <pre style={{ ...s.pre, marginBottom: "1.5rem" }}>{`import { motion } from "framer-motion";

function LiveBadge() {
  return (
    <motion.span
      animate={{
        // Array values = keyframe sequence: start → peak → back
        scale: [1, 1.15, 1],
        boxShadow: [
          "0 0 0px rgba(124, 58, 237, 0.3)",
          "0 0 12px rgba(124, 58, 237, 0.8)",
          "0 0 0px rgba(124, 58, 237, 0.3)",
        ],
      }}
      transition={{
        duration: 1.2,       // one full pulse cycle
        repeat: Infinity,    // loop forever
        repeatType: "reverse", // play forwards then backwards
        repeatDelay: 3,      // rest 3s between each pulse
        ease: "easeInOut",
      }}
    >
      ● LIVE
    </motion.span>
  );
}`}</pre>

        {/* Live controls */}
        <div
          style={{
            background: C.surfaceTint,
            border: `1px solid ${C.border}`,
            borderRadius: "8px",
            padding: "1.25rem 1.5rem",
            marginBottom: "1rem",
          }}
        >
          <SelectRow
            label="colour"
            value={color}
            options={[
              { label: "purple", value: "purple" },
              { label: "red",    value: "red"    },
              { label: "blue",   value: "blue"   },
              { label: "green",  value: "green"  },
            ]}
            onChange={setColor}
            hint="glow colour is derived from the badge background"
          />
          <SelectRow
            label="repeatType"
            value={repeatType}
            options={[
              { label: '"reverse"', value: "reverse" },
              { label: '"loop"',    value: "loop"    },
              { label: '"mirror"',  value: "mirror"  },
            ]}
            onChange={setRepeatType}
            hint='reverse = fwd then back   loop = restart from beginning   mirror = reverse with mirrored easing'
          />
          <SliderRow
            label="scale peak"
            value={scaleAmount}
            min={1.05}
            max={1.5}
            step={0.05}
            onChange={setScaleAmount}
            hint="how large the badge grows at the peak of the pulse"
          />
          <SliderRow
            label="duration"
            value={duration}
            min={0.3}
            max={3}
            step={0.1}
            onChange={setDuration}
            hint="0.3s = fast flicker   →   3s = slow deep breath"
          />
          <SliderRow
            label="repeatDelay"
            value={repeatDelay}
            min={0}
            max={5}
            step={0.5}
            onChange={setRepeatDelay}
            hint="0s = continuous pulse   →   5s = long rest between pulses"
          />
        </div>

        {/* Live preview */}
        <div
          style={{
            background: C.surfaceTint,
            border: `1px solid ${C.border}`,
            borderRadius: "8px",
            padding: "3rem 1.5rem",
            marginBottom: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LiveBadge
            color={color}
            duration={duration}
            repeatDelay={repeatDelay}
            repeatType={repeatType}
            scaleAmount={scaleAmount}
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
                ["Keyframe array",      "Pass an array of values to animate through multiple states: [1, 1.15, 1]."],
                ["repeat: Infinity",    "Loops the animation forever. Pass a number to loop a fixed number of times."],
                ['repeatType: "loop"',  "Restarts from the first keyframe each time. Can feel abrupt on non-symmetrical animations."],
                ['repeatType: "reverse"',"Plays forwards then backwards, back and forth. Produces a smooth breathing effect."],
                ['repeatType: "mirror"',"Like reverse but the easing curve is also mirrored on the way back."],
                ["repeatDelay",         "Pause in seconds between each cycle. Creates a rest between pulses."],
                ["boxShadow keyframes", "Framer Motion can animate box-shadow arrays. All values must share the same shadow structure."],
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
          <strong style={{ color: C.purple }}>Keyframes vs A→B: </strong>
          Regular Framer Motion animations go from <code>initial</code> to{" "}
          <code>animate</code> — one value to another. Keyframe arrays let you
          chain multiple stops in a single animation:{" "}
          <code>scale: [1, 1.15, 1]</code> is a full pulse in one property.
          Try setting <code>repeatDelay</code> to <code>0</code> for a
          continuous throb, then <code>3</code> for a subtle periodic reminder.
          Switch <code>repeatType</code> to <code>"loop"</code> to see why
          <code>"reverse"</code> feels smoother — loop restarts abruptly,
          reverse eases back naturally. The <code>boxShadow</code> glow is
          animated the same way — just make sure all array values use identical
          shadow syntax or Framer Motion can't interpolate between them.
        </div>
      </div>
    </motion.div>
  );
}
