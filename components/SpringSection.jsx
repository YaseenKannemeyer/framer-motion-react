// ── SpringSection.jsx ─────────────────────────────────────────
// Explains the transition prop keys: duration, delay, ease,
// and the physics-based spring type.
//
// Springs differ from tweens in a key way:
//   - Tween: you control duration + easing curve
//   - Spring: you control stiffness + damping; duration is automatic
//
// Springs are better for interactive elements (hover, drag, tap)
// because they handle mid-animation interruptions naturally.

import { motion } from "framer-motion";
import { s } from "./styles";

export default function SpringSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.1 }}
    >
      <div style={s.sectionLabel}>Duration, delay & spring</div>

      <div style={s.stepCard}>
        <p style={{ ...s.stepBody, marginBottom: "0.75rem" }}>
          The <code style={s.inlineCode}>transition</code> prop accepts
          several useful keys:
        </p>

        <ul style={s.bullet}>
          <li>
            <code style={s.inlineCode}>duration</code> — how long the animation
            takes in seconds (e.g. <code style={s.inlineCode}>0.8</code>)
          </li>
          <li>
            <code style={s.inlineCode}>delay</code> — wait before starting,
            great for staggering multiple elements
          </li>
          <li>
            <code style={s.inlineCode}>ease</code> — the easing curve (string
            or custom cubic bezier array)
          </li>
          <li>
            <code style={s.inlineCode}>{'type: "spring"'}</code> — physics-based
            bounce instead of a tween
          </li>
          <li>
            <code style={s.inlineCode}>stiffness</code> /{" "}
            <code style={s.inlineCode}>damping</code> — tune the spring feel
          </li>
        </ul>

        <pre style={{ ...s.pre, marginTop: "0.75rem" }}>{`transition={{
  type: "spring",
  stiffness: 120,
  damping: 14,
  delay: 0.2
}}`}</pre>
      </div>
    </motion.div>
  );
}
