// ── TextAnimationDemo.jsx ─────────────────────────────────────
// Live interactive example of a basic text entrance animation.
//
// Shows the exact Intro component code, then renders it live
// in a dark preview box so readers can see what it produces.
//
// KEY PROP TRICK ─────────────────────────────────────────────
// Framer Motion entrance animations only fire once — on mount.
// To replay them, we use a `key` prop on the motion element.
//
// How it works:
//   1. replayKey starts at 0
//   2. User clicks ↺ Replay → setReplayKey(k => k + 1)
//   3. React sees a new key, UNMOUNTS the old element, MOUNTS a new one
//   4. The new element mounts fresh → initial → animate fires again
//
// This is the standard pattern for replaying entrance animations
// in React. Without it, the animation runs once and stays frozen.

import { useState } from "react";
import { motion } from "framer-motion";
import { s } from "./styles";

export default function TextAnimationDemo() {
  // Incrementing this forces React to remount the motion element,
  // which re-triggers the initial → animate transition.
  const [replayKey, setReplayKey] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.25 }}
    >
      <div style={s.sectionLabel}>Basic text animation example</div>

      <div style={s.stepCard}>
        {/* The source code the reader is seeing run live below */}
        <pre
          style={{ ...s.pre, marginBottom: "1.5rem" }}
        >{`import { motion } from "framer-motion";

export default function Intro() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h1>Hello, world!</h1>
      </motion.div>
    </>
  );
}`}</pre>

        {/* Live preview area — this IS the code above, running for real */}
        <div
          style={{
            background: "#0d0d0d",
            border: "0.5px solid #1e1e1e",
            borderRadius: "8px",
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            minHeight: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "0.75rem",
            overflow: "hidden",
          }}
        >
          {/*
            key={replayKey} is the replay mechanism.
            Each increment destroys + recreates this element,
            re-triggering the entrance animation from scratch.
          */}
          <motion.div
            key={replayKey}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h1
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: "#f5f0e8",
                margin: 0,
                fontFamily: "'Georgia', serif",
              }}
            >
              Hello, world!
            </h1>
          </motion.div>
        </div>

        {/* Replay button — increments key to remount the motion element */}
        <div style={{ overflow: "hidden" }}>
          <button
            style={s.replayBtn}
            onClick={() => setReplayKey((k) => k + 1)}
          >
            ↺ Replay
          </button>
        </div>

        {/* Annotation explaining what each prop does */}
        <div style={{ ...s.note, marginTop: "1rem" }}>
          <strong style={{ color: "#378ADD" }}>What's happening: </strong>
          The <code>h1</code> starts at <code>opacity: 0</code> (invisible) and{" "}
          <code>y: -40</code> (40px above). Framer Motion animates it to{" "}
          <code>opacity: 1</code> and <code>y: 0</code> over 800ms using the{" "}
          <code>easeInOut</code> curve — slow start, fast middle, slow finish.
          The replay button works by changing the <code>key</code> prop, which
          forces React to remount the element and re-trigger the entrance
          animation.
        </div>
      </div>
    </motion.div>
  );
}
