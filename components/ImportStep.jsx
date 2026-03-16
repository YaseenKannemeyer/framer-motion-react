// ── ImportStep.jsx ────────────────────────────────────────────
// Step 2: shows how to import motion and explains what it is.
//
// delay: 0.65 — arrives one beat after InstallStep so they
// don't overlap in the cascade.

import { motion } from "framer-motion";
import { s } from "./styles";

export default function ImportStep() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.65 }}
    >
      <div style={{ ...s.sectionLabel, marginTop: "1.5rem" }}>
        Step 2 — Import
      </div>

      <div style={s.stepCard}>
        <div style={s.stepHeader}>
          <div style={s.stepNum}>2</div>
          <div style={s.stepTitle}>Importing Motion</div>
        </div>

        <pre style={s.pre}>{'import { motion } from "framer-motion";'}</pre>

        <ul style={s.bullet}>
          <li>
            <code style={s.inlineCode}>motion</code> is a special component
            factory from Framer Motion.
          </li>
          <li>
            Wrap any HTML element with{" "}
            <code style={s.inlineCode}>motion</code> to animate it —{" "}
            <code style={s.inlineCode}>&lt;motion.div&gt;</code>,{" "}
            <code style={s.inlineCode}>&lt;motion.h1&gt;</code>,{" "}
            <code style={s.inlineCode}>&lt;motion.span&gt;</code>, etc.
          </li>
          <li>
            It behaves exactly like the original element, but now accepts
            animation props.
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
