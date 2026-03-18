// ── styles.js ─────────────────────────────────────────────────
// Pure white + deep royal purple professional theme.
//
// Colour system:
//   bg          #ffffff   pure white page background
//   surface     #ffffff   card backgrounds
//   surfaceTint #f3f0fb   very light purple tint (table headers, tracks)
//   purple      #5b21b6   deep royal purple — primary accent
//   purpleDeep  #3b0764   darkest purple — hover states, headings
//   purpleLight #ede9fe   light purple tint — badges, note bg, code bg
//   purpleMid   #ddd6fe   medium tint — borders, dividers
//   purpleDim   #7c3aed   mid purple — icons, labels, secondary text
//   purpleBorder#c4b5fd   border purple
//   text        #1a1523   near-black with purple undertone
//   textMid     #4c4069   dark purple-grey body text
//   textMuted   #8b7aa8   muted purple-grey
//   codeBg      #f3f0fb   light purple tint for code blocks
//   codeText    #3b0764   deep purple text on light bg
//   codeBorder  #ddd6fe   subtle purple border on code
//
// Import:
//   import { s, C, Divider } from "@/components/styles";

import { motion } from "framer-motion";

// ── Design tokens (exported so HeroHeader, BlogNav etc can use them)
export const C = {
  bg:           "#ffffff",
  surface:      "#ffffff",
  surfaceTint:  "#f3f0fb",
  purple:       "#5b21b6",
  purpleDeep:   "#3b0764",
  purpleLight:  "#ede9fe",
  purpleMid:    "#ddd6fe",
  purpleDim:    "#7c3aed",
  purpleBorder: "#c4b5fd",
  purpleHover:  "#4c1d95",
  text:         "#1a1523",
  textMid:      "#4c4069",
  textMuted:    "#8b7aa8",
  textFaint:    "#c4b5fd",
  codeBg:       "#f3f0fb",
  codeText:     "#3b0764",
  codeBorder:   "#ddd6fe",
  codeComment:  "#7c3aed",
  border:       "#e8e1f5",
  borderMid:    "#ddd6fe",
  shadow:       "0 1px 4px rgba(91,33,182,0.07), 0 4px 16px rgba(91,33,182,0.05)",
  shadowHover:  "0 4px 16px rgba(91,33,182,0.14), 0 8px 32px rgba(91,33,182,0.08)",
};

const MONO = "'Overpass Mono', 'Courier New', monospace";

// ── Animated Divider ──────────────────────────────────────────
// Draws itself in from the left on mount.
//
// <Divider />            → subtle purple-grey line
// <Divider accent />     → deep purple gradient — use after HeroHeader
// <Divider width="40%" />→ shorter sub-section line
// <Divider delay={0.3} />→ staggered entrance
export function Divider({ width = "100%", delay = 0, accent = false }) {
  return (
    <div style={{ margin: "2.5rem 0", overflow: "hidden" }}>
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
        style={{
          height: "1.5px",
          background: accent
            ? `linear-gradient(to right, ${C.purple}, ${C.purpleLight})`
            : `linear-gradient(to right, ${C.purpleMid}, ${C.bg})`,
          borderRadius: "999px",
        }}
      />
    </div>
  );
}

// ── Shared styles ─────────────────────────────────────────────
export const s = {

  // ── Page section wrapper
  section: {
    minHeight: "100vh",
    background: C.bg,
    color: C.text,
    fontFamily: "Georgia, 'Times New Roman', serif",
    padding: "4rem 2rem",
    maxWidth: "860px",
    margin: "0 auto",
  },

  // ── Badge / pill label
  // Purple text on light purple pill — professional and restrained
  badge: {
    display: "inline-block",
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: C.purple,
    background: C.purpleLight,
    border: `1px solid ${C.purpleBorder}`,
    borderRadius: "999px",
    padding: "4px 14px",
    marginBottom: "1.5rem",
    fontFamily: MONO,
    fontWeight: 500,
  },

  // ── Page heading
  h1: {
    fontSize: "clamp(2rem, 6vw, 4rem)",
    fontWeight: 400,
    color: C.text,
    lineHeight: 1.15,
    marginBottom: "1rem",
  },

  // ── Subtitle paragraph
  subtitle: {
    fontSize: "1.05rem",
    color: C.textMid,
    lineHeight: 1.8,
    maxWidth: "560px",
    marginBottom: "3.5rem",
  },

  // ── Static divider (table row borders only)
  // For section separators use <Divider /> component instead.
  divider: {
    height: "1px",
    background: C.border,
    margin: "2.5rem 0",
  },

  // ── Section label (small uppercase label above a section)
  sectionLabel: {
    fontSize: "9px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: C.purpleDim,
    marginBottom: "1rem",
    fontFamily: MONO,
    fontWeight: 600,
  },

  // ── Content card — white with subtle purple border + shadow
  stepCard: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: "12px",
    padding: "1.25rem 1.5rem",
    marginBottom: "0.75rem",
    boxShadow: C.shadow,
  },

  // ── Step header row (number circle + title)
  stepHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "0.75rem",
  },

  // ── Numbered circle — purple tint background
  stepNum: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: C.purpleLight,
    color: C.purple,
    fontSize: "11px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontFamily: MONO,
    border: `1px solid ${C.purpleBorder}`,
  },

  // ── Step card title
  stepTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: C.text,
    fontFamily: MONO,
  },

  // ── Body text inside cards
  stepBody: {
    fontSize: "13px",
    color: C.textMid,
    lineHeight: 1.75,
    marginBottom: "0.75rem",
  },

  // ── Code block — light purple tint, dark purple text
  // This is intentionally the opposite of typical dark code blocks.
  // Deep purple on light creates excellent contrast and feels
  // cohesive with the purple theme without being heavy.
  pre: {
    background: C.codeBg,
    border: `1px solid ${C.codeBorder}`,
    borderRadius: "10px",
    padding: "1rem 1.25rem",
    fontSize: "12px",
    color: C.codeText,
    fontFamily: MONO,
    overflowX: "auto",
    lineHeight: 1.75,
    margin: "0.5rem 0",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
  },

  // ── Inline code chip — tinted purple pill
  inlineCode: {
    background: C.purpleLight,
    border: `1px solid ${C.purpleMid}`,
    borderRadius: "5px",
    padding: "1px 7px",
    fontSize: "12px",
    fontFamily: MONO,
    color: C.purple,
    fontWeight: 500,
  },

  // ── Bullet list
  bullet: {
    fontSize: "13px",
    color: C.textMid,
    lineHeight: 1.9,
    paddingLeft: "1.25rem",
    marginTop: "0.5rem",
  },

  // ── Reference table
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "12px",
    fontFamily: MONO,
    marginTop: "0.5rem",
  },

  // ── Table header cell
  th: {
    textAlign: "left",
    padding: "8px 12px",
    fontSize: "9px",
    color: C.purpleDim,
    borderBottom: `1px solid ${C.border}`,
    fontFamily: MONO,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    background: C.surfaceTint,
  },

  // ── Table body cell
  td: {
    padding: "10px 12px",
    borderBottom: `1px solid ${C.border}`,
    verticalAlign: "top",
    lineHeight: 1.5,
    color: C.textMid,
  },

  // ── Callout note block — light purple left border accent
  note: {
    background: C.purpleLight,
    borderLeft: `3px solid ${C.purple}`,
    borderRadius: "0 10px 10px 0",
    padding: "0.875rem 1.1rem",
    fontSize: "12px",
    color: C.textMid,
    fontFamily: MONO,
    lineHeight: 1.8,
    marginTop: "0.875rem",
  },

  // ── Easing card grid
  easeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    marginTop: "0.75rem",
  },

  // ── Easing demo track
  demoTrack: {
    marginTop: "1rem",
    background: C.surfaceTint,
    border: `1px solid ${C.border}`,
    borderRadius: "10px",
    padding: "1.25rem",
    position: "relative",
    height: "64px",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },

  // ── Replay button
  replayBtn: {
    marginTop: "0.5rem",
    float: "right",
    background: "transparent",
    border: `1px solid ${C.purpleMid}`,
    color: C.purpleDim,
    padding: "5px 14px",
    fontSize: "11px",
    fontFamily: MONO,
    borderRadius: "6px",
    cursor: "pointer",
    letterSpacing: "0.05em",
    transition: "all 0.15s",
  },
};
