// ── BlogFooter.jsx ────────────────────────────────────────────
// Full footer — bio, social links, copyright.
// Fully themed with shared C tokens from styles.js.

import { motion } from "framer-motion";
import { C } from "@/components/styles";

const MONO  = "'Overpass Mono', 'Courier New', monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2, boxShadow: C.shadowHover }}
      transition={{ duration: 0.15 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        color: C.purpleDim,
        textDecoration: "none",
        fontSize: "12px",
        fontFamily: MONO,
        letterSpacing: "0.03em",
        padding: "8px 16px",
        borderRadius: "8px",
        border: `1px solid ${C.purpleMid}`,
        background: C.purpleLight,
        transition: "border-color 0.15s",
        boxShadow: C.shadow,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.purple;
        e.currentTarget.style.color = C.purple;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.purpleMid;
        e.currentTarget.style.color = C.purpleDim;
      }}
    >
      {icon}
      {label}
    </motion.a>
  );
}

export default function BlogFooter() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "0 2rem 4rem",
      }}
    >
      {/* Top animated rule */}
      <div style={{ overflow: "hidden", marginBottom: "3rem" }}>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{
            height: "1.5px",
            background: `linear-gradient(to right, ${C.purple}, ${C.purpleLight})`,
            borderRadius: "999px",
          }}
        />
      </div>

      {/* Main grid: bio left, links right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "start",
          marginBottom: "3rem",
        }}
      >
        {/* ── Bio ─────────────────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "0.35rem" }}>
              <h3 style={{
                fontSize: "19px",
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 400,
                color: C.text,
                margin: 0,
                letterSpacing: "-0.01em",
              }}>
                Mogamat Yaseen Kannemeyer
              </h3>
              {/* Pulsing dot */}
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: C.purple,
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
            </div>

            <div style={{
              fontSize: "10px",
              fontFamily: MONO,
              color: C.purpleDim,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
              fontWeight: 600,
            }}>
              Frontend Developer · South Africa
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p style={{
              fontSize: "13px",
              fontFamily: MONO,
              color: C.textMid,
              lineHeight: 1.85,
              margin: "0 0 0.75rem",
              maxWidth: "420px",
            }}>
              Studying for a Diploma in Applications Development, with a
              self-taught foundation in React, TypeScript, and Tailwind.
              Focused on building modern, responsive web interfaces and
              exploring what the frontend ecosystem has to offer.
            </p>
            <p style={{
              fontSize: "12px",
              fontFamily: MONO,
              color: C.textMuted,
              lineHeight: 1.8,
              margin: 0,
              maxWidth: "380px",
            }}>
              Backend and IT experience in the mix — but frontend is where
              the passion lives.
            </p>
          </motion.div>
        </div>

        {/* ── Links ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "flex-end",
          }}
        >
          <div style={{
            fontSize: "8px",
            color: C.purpleBorder,
            fontFamily: MONO,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}>
            Find me
          </div>

          <SocialLink
            href="https://github.com/YaseenKannemeyer"
            icon={<GithubIcon />}
            label="GitHub"
          />
          <SocialLink
            href="https://www.linkedin.com/in/yaseen-kannemeyer/"
            icon={<LinkedInIcon />}
            label="LinkedIn"
          />
        </motion.div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "1.5rem",
          borderTop: `1px solid ${C.border}`,
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <span style={{
          fontSize: "10px",
          color: C.textMuted,
          fontFamily: MONO,
          letterSpacing: "0.05em",
        }}>
          © {year} Mogamat Yaseen Kannemeyer. All rights reserved.
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "10px", color: C.textMuted, fontFamily: MONO }}>
            Built with
          </span>
          {["Next.js", "Framer Motion", "Tailwind"].map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: "9px",
                fontFamily: MONO,
                color: C.purple,
                background: C.purpleLight,
                border: `1px solid ${C.purpleMid}`,
                borderRadius: "4px",
                padding: "2px 7px",
                letterSpacing: "0.04em",
                fontWeight: 500,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.footer>
  );
}
