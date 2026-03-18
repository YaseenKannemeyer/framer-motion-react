// ── InstallStep.jsx ───────────────────────────────────────────
// Step 1: shows the npm / yarn install commands.
//
// Wrapped in a motion.div so it fades + slides in after the
// hero header has settled (delay: 0.5).

import { motion } from "framer-motion";
import { s, C } from "@/components/styles";

export default function InstallStep() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
    >
      <div style={s.sectionLabel}>Step 1 — Install</div>

      <div style={s.stepCard}>
        <div style={s.stepHeader}>
          <div style={s.stepNum}>1</div>
          <div style={s.stepTitle}>Install Framer Motion</div>
        </div>

        <p style={s.stepBody}>
          Make sure you have a React project set up — via{" "}
          <code style={s.inlineCode}>create-react-app</code>, Vite, or
          Next.js. Then in your terminal:
        </p>

        <pre style={s.pre}>npm install framer-motion</pre>

        <p style={s.stepBody}>Or if you use Yarn:</p>

        <pre style={s.pre}>yarn add framer-motion</pre>
      </div>
    </motion.div>
  );
}
