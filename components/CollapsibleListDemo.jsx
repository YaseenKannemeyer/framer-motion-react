// ── CollapsibleListDemo.jsx ───────────────────────────────────
// Interactive demo showing Framer Motion's layout animation —
// one of its most powerful and unique features.
//
// WHAT THIS DEMONSTRATES:
//
//  layout          → tells Framer Motion to automatically animate
//                   ANY change in size or position of this element.
//                   When content is added/removed (like expanding
//                   a card), instead of jumping to the new size
//                   instantly, it smoothly animates the transition.
//                   No initial/animate needed — layout handles it.
//
//  layout="position" → only animates position changes, not size.
//  layout="size"     → only animates size changes, not position.
//  layout={true}     → animates both (the default when you write layout).
//
//  layoutId        → gives an element a shared identity across
//                   different render states. Framer Motion morphs
//                   one into the other — this is how shared element
//                   transitions work (e.g. a card expanding into a modal).
//
//  AnimatePresence → works hand-in-hand with layout. When content
//                   inside a layout element appears or disappears,
//                   wrapping it in AnimatePresence lets it animate
//                   in/out while the parent smoothly resizes.
//
//  layout transition → the speed/easing of the layout animation is
//                   controlled via transition={{ layout: { ... } }}
//                   separately from other animation transitions.
//
// WHY layout IS SPECIAL:
//   Normally, when an element changes size (e.g. content is added),
//   the browser reflows layout instantly. Framer Motion uses the
//   FLIP technique (First, Last, Invert, Play) under the hood:
//   it measures the element before and after the change, then
//   plays a smooth transform between the two states — zero JS
//   animation of height/width needed.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { s, C } from "@/components/styles";

// ── Accordion items ──────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    title: "What is layout animation?",
    body: "Layout animation automatically animates any change in an element's size or position. Framer Motion uses the FLIP technique — it measures the DOM before and after the change and plays a smooth transform between the two states.",
  },
  {
    id: 2,
    title: "When should I use it?",
    body: "Use layout on any element that changes size or position dynamically — accordions, expanding cards, reordering lists, adding/removing items, or switching between compact and expanded views.",
  },
  {
    id: 3,
    title: "Does it work with AnimatePresence?",
    body: "Yes — and they work best together. Wrap dynamic children in AnimatePresence so they can animate in and out, while the parent layout prop handles the smooth resize as content appears and disappears.",
  },
];

// ── Live CollapsibleList ─────────────────────────────────────
// The actual component. layoutType and springConfig are props
// so the controls can tune the animation live.
function CollapsibleList({ layoutType, stiffness, damping }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {ITEMS.map((item) => {
        const isOpen = expanded === item.id;

        return (
          /*
            layout prop on the outer card — when the card height
            changes (content appears/disappears inside), Framer Motion
            smoothly animates that size change instead of jumping.

            layoutType controls WHAT gets animated:
              true       → both size and position
              "position" → only position changes
              "size"     → only size changes
          */
          <motion.div
            key={item.id}
            layout={layoutType}
            onClick={() => setExpanded((prev) => (prev === item.id ? null : item.id))}
            transition={{
              layout: { type: "spring", stiffness, damping },
            }}
            style={{
              background: isOpen ? C.purpleLight : C.surface,
              border: isOpen ? "0.5px solid #378ADD44" : "0.5px solid #1e1e1e",
              borderRadius: "10px",
              padding: "1rem 1.25rem",
              cursor: "pointer",
              overflow: "hidden",
              transition: "background 0.2s, border-color 0.2s",
            }}
          >
            {/* Header row — always visible */}
            <motion.div
              layout="position"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{
                fontSize: "13px",
                fontWeight: 500,
                color: isOpen ? C.purple : C.textMuted,
                fontFamily: "monospace",
                transition: "color 0.2s",
              }}>
                {item.title}
              </span>

              {/* Animated chevron — rotates when open */}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness, damping }}
                style={{
                  fontSize: "10px",
                  color: isOpen ? C.purple : "#444",
                  flexShrink: 0,
                  display: "inline-block",
                }}
              >
                ▼
              </motion.span>
            </motion.div>

            {/*
              AnimatePresence lets the body animate OUT when collapsed.
              Without it, the text would disappear instantly while the
              card still smoothly resizes — the layout prop handles
              the card resize, AnimatePresence handles the content exit.
            */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    marginTop: "0.75rem",
                    paddingTop: "0.75rem",
                    borderTop: "0.5px solid #1e1e1e",
                  }}
                >
                  <p style={{
                    fontSize: "12px",
                    color: C.textMid,
                    lineHeight: 1.7,
                    fontFamily: "monospace",
                    margin: 0,
                  }}>
                    {item.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
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
export default function CollapsibleListDemo() {
  const [layoutType, setLayoutType] = useState(true);
  const [stiffness,  setStiffness]  = useState(300);
  const [damping,    setDamping]    = useState(30);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
    >
      <div style={s.sectionLabel}>layout — automatic size & position animation</div>

      <div style={s.stepCard}>

        {/* Source code */}
        <pre style={{ ...s.pre, marginBottom: "1.5rem" }}>{`import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CollapsibleList() {
  const [expanded, setExpanded] = useState(null);
  const items = [1, 2, 3];

  return (
    <div>
      {items.map((id) => (
        /*
          layout — when this card's height changes (content appears
          or disappears inside), Framer Motion smoothly animates
          the resize. No height animation code needed.
        */
        <motion.div
          key={id}
          layout
          onClick={() => setExpanded((prev) => (prev === id ? null : id))}
        >
          <h3>Item {id}</h3>

          {/*
            AnimatePresence handles the content fade-out.
            layout on the parent handles the card resize.
            Together they produce a smooth accordion effect.
          */}
          <AnimatePresence>
            {expanded === id && (
              <motion.p
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Expanded content here.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
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
            label="layout type"
            value={layoutType}
            options={[
              { label: "true",         value: true        },
              { label: '"position"',   value: "position"  },
              { label: '"size"',       value: "size"      },
            ]}
            onChange={setLayoutType}
            hint='true = animate size + position   "position" = position only   "size" = size only'
          />
          <SliderRow
            label="spring stiffness"
            value={stiffness}
            min={50}
            max={600}
            step={10}
            onChange={setStiffness}
            hint="50 = slow and loose   →   600 = very snappy resize"
          />
          <SliderRow
            label="spring damping"
            value={damping}
            min={5}
            max={60}
            step={1}
            onChange={setDamping}
            hint="5 = bouncy   →   60 = no bounce, settles immediately"
          />
        </div>

        {/* Live preview */}
        <div
          style={{
            background: C.surfaceTint,
            border: `1px solid ${C.border}`,
            borderRadius: "8px",
            padding: "1.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <CollapsibleList
            layoutType={layoutType}
            stiffness={stiffness}
            damping={damping}
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
                ["layout",            "Automatically animates any size or position change on this element using FLIP."],
                ['layout="position"', "Only animates position changes — ignores size. Good for repositioning items."],
                ['layout="size"',     "Only animates size changes — ignores position. Good for expanding in-place."],
                ["layoutId",          "Shared identity across renders. Framer Motion morphs one element into another — used for shared element transitions."],
                ["transition.layout", "Controls the speed/easing of layout animations separately from other transitions."],
                ["FLIP technique",    "Measures DOM before and after change, plays a transform between the two states. No height tweening needed."],
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
          <strong style={{ color: C.purple }}>Why layout is special: </strong>
          Before <code>layout</code>, animating an element's height meant
          manually tracking pixel values, using <code>max-height</code> hacks,
          or reaching for a library. Framer Motion's FLIP technique sidesteps
          all of that — it snapshots the element before and after the DOM
          change, then plays a smooth <code>transform</code> between the two.
          Try setting <code>damping</code> to <code>5</code> for a bouncy
          accordion, or <code>stiffness</code> to <code>600</code> for an
          instant-feeling but still-smooth snap. Switch layout type to{" "}
          <code>"position"</code> to see cards reflow without resizing.
        </div>
      </div>
    </motion.div>
  );
}
