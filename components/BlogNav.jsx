// ── BlogNav.jsx ───────────────────────────────────────────────
// Fixed sidebar navigation with scroll-spy.
//
// How it works:
//   1. Each section in Hero.jsx gets an id="" matching NAV_ITEMS
//   2. IntersectionObserver watches all sections simultaneously
//   3. Whichever section is most visible sets the active state
//   4. Clicking a nav item smoothly scrolls to that section
//
// USAGE IN Hero.jsx:
//   Wrap your page in a layout that includes <BlogNav />, or
//   render it directly in your layout.jsx alongside the content.
//   Each section component must receive an `id` prop — see the
//   updated Hero.jsx pattern at the bottom of this file.

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MONO = "'Overpass Mono', 'Courier New', monospace";

// ── Nav items — id must match the section id in Hero.jsx ─────
const NAV_ITEMS = [
  { id: "hero", label: "Introduction", group: "start" },
  { id: "install", label: "Install", group: "setup" },
  { id: "import", label: "Import", group: "setup" },
  { id: "props", label: "Core Props", group: "concepts" },
  { id: "easing", label: "Easing", group: "concepts" },
  { id: "spring", label: "Tween vs Spring", group: "concepts" },
  { id: "text-anim", label: "Text Animation", group: "examples" },
  { id: "button", label: "Animated Button", group: "examples" },
  { id: "stagger", label: "Stagger List", group: "examples" },
  { id: "drag", label: "Drag", group: "examples" },
  { id: "presence", label: "AnimatePresence", group: "advanced" },
  { id: "step-switcher", label: "Step Switcher", group: "advanced" },
  { id: "layout", label: "Layout", group: "advanced" },
  { id: "badge", label: "Keyframes", group: "advanced" },
];

const GROUPS = {
  start: { label: "Start", color: "#333" },
  setup: { label: "Setup", color: "#333" },
  concepts: { label: "Concepts", color: "#333" },
  examples: { label: "Examples", color: "#333" },
  advanced: { label: "Advanced", color: "#333" },
};

// ── Scroll to section ─────────────────────────────────────────
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Desktop sidebar ───────────────────────────────────────────
function DesktopNav({ active }) {
  let lastGroup = null;

  return (
    <nav
      style={{
        position: "fixed",
        top: "50%",
        left: "max(1rem, calc(50vw - 480px - 180px))",
        transform: "translateY(-50%)",
        width: "160px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        zIndex: 50,
        // Hide on small screens
        "@media (maxWidth: 900px)": { display: "none" },
      }}
    >
      {/* Logo / title */}
      <div style={{ marginBottom: "1.5rem" }}>
        <span
          style={{
            fontSize: "9px",
            color: "#2a2a2a",
            fontFamily: MONO,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Framer Motion
        </span>
        <div
          style={{
            height: "0.5px",
            background: "linear-gradient(to right, #1e1e1e, transparent)",
            marginTop: "6px",
          }}
        />
      </div>

      {NAV_ITEMS.map((item) => {
        const showGroup = item.group !== lastGroup;
        lastGroup = item.group;
        const isActive = active === item.id;

        return (
          <div key={item.id}>
            {/* Group label */}
            {showGroup && (
              <div
                style={{
                  fontSize: "8px",
                  color: "#222",
                  fontFamily: MONO,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginTop: "1rem",
                  marginBottom: "0.4rem",
                  paddingLeft: "12px",
                }}
              >
                {GROUPS[item.group].label}
              </div>
            )}

            {/* Nav item */}
            <button
              onClick={() => scrollTo(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "5px 12px",
                borderRadius: "4px",
                width: "100%",
                textAlign: "left",
                position: "relative",
                transition: "background 0.15s",
              }}
            >
              {/* Active indicator bar */}
              <motion.div
                animate={{
                  opacity: isActive ? 1 : 0,
                  scaleY: isActive ? 1 : 0.4,
                }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: "20%",
                  bottom: "20%",
                  width: "2px",
                  background: "#4a9eff",
                  borderRadius: "2px",
                  transformOrigin: "center",
                }}
              />

              {/* Dot */}
              <motion.div
                animate={{
                  background: isActive ? "#4a9eff" : "#222",
                  scale: isActive ? 1 : 0.7,
                }}
                transition={{ duration: 0.2 }}
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              />

              {/* Label */}
              <motion.span
                animate={{ color: isActive ? "#b0a898" : "#333" }}
                transition={{ duration: 0.2 }}
                style={{
                  fontSize: "11px",
                  fontFamily: MONO,
                  letterSpacing: "0.01em",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </motion.span>
            </button>
          </div>
        );
      })}
    </nav>
  );
}

// ── Mobile bottom bar ─────────────────────────────────────────
function MobileNav({ active }) {
  const [open, setOpen] = useState(false);
  const activeItem = NAV_ITEMS.find((i) => i.id === active);

  return (
    <>
      {/* Fixed pill at bottom */}
      <motion.div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "#0f0f0f",
          border: "0.5px solid #1e1e1e",
          borderRadius: "999px",
          padding: "8px 16px",
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          userSelect: "none",
        }}
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: "8px", color: "#444" }}
        >
          ▲
        </motion.div>
        <span style={{ fontSize: "11px", color: "#555", fontFamily: MONO }}>
          {activeItem?.label ?? "Navigate"}
        </span>
        <div
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "#4a9eff",
          }}
        />
      </motion.div>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                zIndex: 90,
              }}
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 95,
                background: "#0a0a0a",
                border: "0.5px solid #1e1e1e",
                borderRadius: "16px 16px 0 0",
                padding: "1.5rem 1.5rem 3rem",
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
              {/* Handle */}
              <div
                style={{
                  width: "32px",
                  height: "3px",
                  borderRadius: "2px",
                  background: "#222",
                  margin: "0 auto 1.5rem",
                }}
              />

              <div
                style={{
                  fontSize: "9px",
                  color: "#333",
                  fontFamily: MONO,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Jump to section
              </div>

              {/* Group sections */}
              {Object.keys(GROUPS).map((group) => {
                const items = NAV_ITEMS.filter((i) => i.group === group);
                return (
                  <div key={group} style={{ marginBottom: "1.25rem" }}>
                    <div
                      style={{
                        fontSize: "8px",
                        color: "#222",
                        fontFamily: MONO,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {GROUPS[group].label}
                    </div>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                    >
                      {items.map((item) => {
                        const isActive = active === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              scrollTo(item.id);
                              setOpen(false);
                            }}
                            style={{
                              background: isActive ? "#0d1f30" : "#111",
                              border: isActive
                                ? "1px solid #4a9eff"
                                : "0.5px solid #1e1e1e",
                              color: isActive ? "#4a9eff" : "#555",
                              padding: "6px 12px",
                              borderRadius: "5px",
                              fontSize: "11px",
                              fontFamily: MONO,
                              cursor: "pointer",
                              transition: "all 0.15s",
                            }}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function BlogNav() {
  const [active, setActive] = useState("hero");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const observers = [];
    const visibilityMap = {};

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          visibilityMap[id] = entry.intersectionRatio;
          // Set active to whichever section has the highest visibility
          const best = Object.entries(visibilityMap).sort(
            (a, b) => b[1] - a[1],
          )[0];
          if (best) setActive(best[0]);
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return isMobile ? (
    <MobileNav active={active} />
  ) : (
    <DesktopNav active={active} />
  );
}
