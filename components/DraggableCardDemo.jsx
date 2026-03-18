// ── DraggableCardDemo.jsx ─────────────────────────────────────
// Interactive demo showing Framer Motion's drag system.
//
// WHAT THIS DEMONSTRATES:
//
//  drag            → enables dragging on any motion element.
//                   Can be true (both axes), "x" (horizontal only),
//                   or "y" (vertical only).
//
//  dragConstraints → limits how far the element can be dragged.
//                   Pass an object with left/right/top/bottom in px,
//                   OR pass a ref to a parent element to use its
//                   bounding box as the constraint boundary.
//
//  dragElastic     → how much the element "stretches" past its
//                   constraints before snapping back.
//                   0 = hard wall, no overshoot
//                   1 = fully elastic, no resistance at boundary
//                   0.2 = slight overshoot (the default feel)
//
//  dragSnapToOrigin→ snaps the element back to its starting
//                   position when released. Useful for UI where
//                   the card should always return home.
//
//  whileDrag       → applies styles while the element is being
//                   actively dragged (e.g. scale up, rotate).
//                   Auto-reverses when drag ends.
//
//  onDragEnd       → callback fired when drag is released.
//                   Receives the final velocity — useful for
//                   triggering actions based on throw speed.

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { s, C } from "@/components/styles";

// ── Live DraggableCard ───────────────────────────────────────
// The actual component readers can copy. All drag behaviour
// is controlled by props so the sliders can tune it live.
function DraggableCard({ elastic, snapToOrigin, dragAxis }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag={dragAxis}
      dragConstraints={{ left: -130, right: 130, top: -50, bottom: 50 }}
      dragElastic={elastic}
      dragSnapToOrigin={snapToOrigin}
      whileDrag={{ scale: 1.08, rotate: 2, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{
        width: "140px",
        padding: "20px",
        borderRadius: "12px",
        background: C.surface,
        color: C.text,
        fontSize: "14px",
        fontWeight: 600,
        textAlign: "center",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        fontFamily: "monospace",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
      }}
    >
      {isDragging ? "Dragging…" : "Drag me!"}
    </motion.div>
  );
}

// ── SliderRow ────────────────────────────────────────────────
function SliderRow({ label, value, min, max, step, onChange, hint }) {
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
        step={step}
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

// ── ToggleRow ────────────────────────────────────────────────
function ToggleRow({ label, value, onChange, hint }) {
  return (
    <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: "12px", color: C.textMid, fontFamily: "monospace", marginBottom: "2px" }}>
          {label}
        </div>
        <div style={{ fontSize: "10px", color: C.textMuted, fontFamily: "monospace" }}>
          {hint}
        </div>
      </div>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: "40px",
          height: "22px",
          borderRadius: "999px",
          background: value ? C.purple : C.border,
          border: `1px solid ${C.border}`,
          position: "relative",
          cursor: "pointer",
          transition: "background 0.2s",
          flexShrink: 0,
          marginLeft: "1rem",
        }}
      >
        <div style={{
          position: "absolute",
          top: "3px",
          left: value ? "20px" : "3px",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: C.surface,
          transition: "left 0.2s",
        }} />
      </div>
    </div>
  );
}

// ── SelectRow ────────────────────────────────────────────────
function SelectRow({ label, value, options, onChange, hint }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
        <span style={{ fontSize: "12px", color: C.textMid, fontFamily: "monospace" }}>{label}</span>
        <div style={{ display: "flex", gap: "6px" }}>
          {options.map((opt) => (
            <button
              key={String(opt.value)}
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

// ── Main export ──────────────────────────────────────────────
export default function DraggableCardDemo() {
  const [elastic,      setElastic]      = useState(0.2);
  const [snapToOrigin, setSnapToOrigin] = useState(false);
  const [dragAxis,     setDragAxis]     = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
    >
      <div style={s.sectionLabel}>Drag — drag, dragConstraints & dragElastic</div>

      <div style={s.stepCard}>

        {/* Source code */}
        <pre style={{ ...s.pre, marginBottom: "1.5rem" }}>{`import { motion } from "framer-motion";

function DraggableCard() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -130, right: 130, top: -40, bottom: 40 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.08, rotate: 2 }}
    >
      Drag me!
    </motion.div>
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
          <SliderRow
            label="dragElastic"
            value={elastic}
            min={0}
            max={1}
            step={0.05}
            onChange={setElastic}
            hint="0 = hard wall   →   1 = fully elastic, no resistance"
          />
          <SelectRow
            label="drag axis"
            value={dragAxis}
            options={[
              { label: "both", value: true },
              { label: '"x"',  value: "x"  },
              { label: '"y"',  value: "y"  },
            ]}
            onChange={setDragAxis}
            hint='true = both axes   "x" = horizontal only   "y" = vertical only'
          />
          <ToggleRow
            label="dragSnapToOrigin"
            value={snapToOrigin}
            onChange={setSnapToOrigin}
            hint="snaps card back to starting position on release"
          />
        </div>

        {/* Live preview */}
        <div
          style={{
            background: C.surfaceTint,
            border: `1px solid ${C.border}`,
            borderRadius: "8px",
            padding: "3rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "0.75rem",
            // overflow hidden would clip the drag — intentionally omitted
            position: "relative",
          }}
        >
          {/* Faint boundary indicator */}
          <div style={{
            position: "absolute",
            width: "264px",
            height: "104px",
            border: "0.5px dashed #1e1e1e",
            borderRadius: "8px",
            pointerEvents: "none",
          }} />
          <DraggableCard
            elastic={elastic}
            snapToOrigin={snapToOrigin}
            dragAxis={dragAxis}
          />
        </div>

        {/* Prop breakdown table */}
        <div style={{ ...s.stepCard, marginBottom: 0, padding: "0.5rem 0" }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Prop</th>
                <th style={s.th}>What it does</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["drag",              'Enables dragging. true = both axes, "x" = horizontal, "y" = vertical.'],
                ["dragConstraints",   "Limits drag range in px from the resting position. left/right/top/bottom."],
                ["dragElastic",       "Overshoot amount past constraints. 0 = hard stop, 1 = fully elastic."],
                ["dragSnapToOrigin",  "Snaps the element back to its original position when released."],
                ["whileDrag",         "Animation applied while actively dragging. Auto-reverses on release."],
                ["onDragEnd",         "Callback fired on release. Receives event + info including final velocity."],
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
          <strong style={{ color: C.purple }}>Things to try: </strong>
          Set <code>dragElastic</code> to <code>0</code> for a hard boundary
          that stops dead, then <code>1</code> for a fully elastic feel with
          no resistance. Toggle <code>dragSnapToOrigin</code> on to make the
          card always return home — great for UI where dragging is a gesture
          (like a dismiss action) rather than a repositioning tool. Switch the
          axis to <code>"x"</code> to lock it to a horizontal slider pattern.
        </div>
      </div>
    </motion.div>
  );
}
