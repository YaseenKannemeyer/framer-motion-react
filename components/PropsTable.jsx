// ── PropsTable.jsx ────────────────────────────────────────────
// Renders the Core Motion Props reference table + the note
// explaining the double curly brace syntax in JSX.
//
// The PROPS array is defined outside the component so it
// doesn't get recreated on every render.

import { motion } from "framer-motion";
import { s, C } from "@/components/styles";

// Each entry: [propName, description, exampleValue]
const PROPS = [
  ["initial",    "Starting state before animation plays",   "{ opacity: 0, y: -40 }"],
  ["animate",    "Target state to animate toward",           "{ opacity: 1, y: 0 }"],
  ["transition", "Controls how the animation plays",         "{ duration: 0.8 }"],
  ["exit",       "State when element is removed from DOM",   "{ opacity: 0 }"],
  ["whileHover", "Animates on mouse hover",                  "{ scale: 1.05 }"],
  ["whileTap",   "Animates when clicked or tapped",          "{ scale: 0.97 }"],
];

export default function PropsTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
    >
      <div style={s.sectionLabel}>Core Motion Props</div>

      <div style={{ ...s.stepCard, padding: "0.5rem 0" }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Prop</th>
              <th style={s.th}>What it does</th>
              <th style={s.th}>Example</th>
            </tr>
          </thead>
          <tbody>
            {PROPS.map(([prop, desc, ex], i) => (
              <tr key={prop}>
                <td style={{
                  ...s.td,
                  color: C.purple,
                  borderBottom: i === PROPS.length - 1 ? "none" : s.td.borderBottom,
                }}>
                  <code>{prop}</code>
                </td>
                <td style={{
                  ...s.td,
                  color: C.textMid,
                  borderBottom: i === PROPS.length - 1 ? "none" : s.td.borderBottom,
                }}>
                  {desc}
                </td>
                <td style={{
                  ...s.td,
                  color: C.textMid,
                  borderBottom: i === PROPS.length - 1 ? "none" : s.td.borderBottom,
                }}>
                  <code style={{ fontFamily: "monospace", fontSize: "11px" }}>{ex}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*
        Beginners often get confused by {{ }} in JSX.
        Outer {} = JSX expression.
        Inner {} = plain JavaScript object literal.
        This is why motion props look like: initial={{ opacity: 0 }}
      */}
      <div style={s.note}>
        <strong style={{ color: C.purple }}>Reading the example: </strong>
        <code>{"initial={{ opacity: 0, y: -40 }}"}</code> means the element
        starts invisible and 40px above its natural position.{" "}
        <code>{"animate={{ opacity: 1, y: 0 }}"}</code> moves it back down
        and fades it in. The double curly braces are JSX (outer) + JS object
        (inner).
      </div>
    </motion.div>
  );
}
