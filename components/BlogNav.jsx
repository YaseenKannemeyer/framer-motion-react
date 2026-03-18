// ── BlogNav.jsx ───────────────────────────────────────────────
// Fixed sidebar navigation with scroll-spy.
// Desktop items have a smooth hover effect:
//   - background slides in from left (clip-path reveal)
//   - label shifts slightly right
//   - dot scales up and turns purple
//   - active state is always "locked" at full purple

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

const NAV_ITEMS = [
  { id: "hero", label: "Introduction", group: "start" },
  { id: "install", label: "Install", group: "setup" },
  { id: "import", label: "Import", group: "setup" },
  { id: "props", label: "Core Props", group: "concepts" },
  { id: "easing", label: "Easing", group: "concepts" },
  { id: "spring", label: "Tween vs Spring", group: "concepts" },
  { id: "text-anim", label: "Text Animation", group: "examples" },
  { id: "button", label: "Button", group: "examples" },
  { id: "stagger", label: "Stagger List", group: "examples" },
  { id: "drag", label: "Drag", group: "examples" },
  { id: "presence", label: "AnimatePresence", group: "advanced" },
  { id: "step-switcher", label: "Step Switcher", group: "advanced" },
  { id: "layout", label: "Layout", group: "advanced" },
  { id: "badge", label: "Keyframes", group: "advanced" },
];

const GROUPS = {
  start: "Start",
  setup: "Setup",
  concepts: "Concepts",
  examples: "Examples",
  advanced: "Advanced",
};

function scrollTo(id) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── NavItem — desktop button with hover animation ─────────────
function NavItem({ item, isActive }) {
  const [hovered, setHovered] = useState(false);

  // Determine visual state: active > hover > idle
  const showHighlight = isActive || hovered;
  const labelColor = isActive ? C.purple : hovered ? C.purpleDeep : C.textMuted;
  const dotColor = isActive ? C.purple : hovered ? C.purpleDim : C.purpleBorder;
  const bgColor = isActive
    ? C.purpleLight
    : hovered
      ? C.surfaceTint
      : "transparent";

  return (
    <button
      onClick={() => scrollTo(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "4px 10px 4px 12px",
        borderRadius: "6px",
        width: "100%",
        textAlign: "left",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Sliding background fill — animates in from left on hover/active */}
      <motion.div
        animate={{
          x: showHighlight ? "0%" : "-100%",
          opacity: showHighlight ? 1 : 0,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          inset: 0,
          background: bgColor,
          borderRadius: "6px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Active indicator bar — left edge */}
      <motion.div
        animate={{
          opacity: isActive ? 1 : hovered ? 0.4 : 0,
          scaleY: isActive ? 1 : hovered ? 0.6 : 0.2,
          background: isActive ? C.purple : C.purpleDim,
        }}
        transition={{ duration: 0.18 }}
        style={{
          position: "absolute",
          left: 0,
          top: "15%",
          bottom: "15%",
          width: "2.5px",
          borderRadius: "999px",
          transformOrigin: "center",
          zIndex: 1,
        }}
      />

      {/* Dot */}
      <motion.div
        animate={{
          background: dotColor,
          scale: isActive ? 1.15 : hovered ? 1 : 0.65,
        }}
        transition={{ duration: 0.18 }}
        style={{
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Label — nudges right on hover */}
      <motion.span
        animate={{
          color: labelColor,
          x: hovered && !isActive ? 2 : 0,
        }}
        transition={{ duration: 0.18 }}
        style={{
          fontSize: "11px",
          fontFamily: MONO,
          letterSpacing: "0.01em",
          lineHeight: 1,
          whiteSpace: "nowrap",
          fontWeight: isActive ? 600 : hovered ? 500 : 400,
          position: "relative",
          zIndex: 1,
        }}
      >
        {item.label}
      </motion.span>
    </button>
  );
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
        width: "156px",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
      }}
    >
      {/* Logo mark */}
      <div style={{ marginBottom: "1.5rem" }}>
        <span
          style={{
            fontSize: "9px",
            color: C.purpleDim,
            fontFamily: MONO,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Framer Motion
        </span>
        <div
          style={{
            height: "1.5px",
            background: `linear-gradient(to right, ${C.purpleMid}, transparent)`,
            marginTop: "6px",
            borderRadius: "999px",
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
                  color: C.purpleBorder,
                  fontFamily: MONO,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginTop: "1rem",
                  marginBottom: "0.35rem",
                  paddingLeft: "12px",
                }}
              >
                {GROUPS[item.group]}
              </div>
            )}

            <NavItem item={item} isActive={isActive} />
          </div>
        );
      })}
    </nav>
  );
}

// ── Mobile bottom pill + sheet ────────────────────────────────
function MobileNav({ active }) {
  const [open, setOpen] = useState(false);
  const activeItem = NAV_ITEMS.find((i) => i.id === active);

  return (
    <>
      {/* Floating pill */}
      <motion.div
        onClick={() => setOpen((o) => !o)}
        whileHover={{
          scale: 1.02,
          boxShadow: `0 6px 24px rgba(91,33,182,0.18)`,
        }}
        whileTap={{ scale: 0.97 }}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: C.surface,
          border: `1px solid ${C.purpleMid}`,
          borderRadius: "999px",
          padding: "8px 18px",
          cursor: "pointer",
          boxShadow: C.shadowHover,
          userSelect: "none",
        }}
      >
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: "8px", color: C.purpleDim }}
        >
          ▲
        </motion.div>
        <span style={{ fontSize: "11px", color: C.textMid, fontFamily: MONO }}>
          {activeItem?.label ?? "Navigate"}
        </span>
        <div
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: C.purple,
          }}
        />
      </motion.div>

      {/* Backdrop + sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(91,33,182,0.08)",
                backdropFilter: "blur(2px)",
                zIndex: 90,
              }}
            />

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
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderTop: `2px solid ${C.purpleMid}`,
                borderRadius: "20px 20px 0 0",
                padding: "1.25rem 1.5rem 3rem",
                maxHeight: "70vh",
                overflowY: "auto",
                boxShadow: `0 -8px 40px rgba(91,33,182,0.1)`,
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "3px",
                  borderRadius: "999px",
                  background: C.purpleMid,
                  margin: "0 auto 1.5rem",
                }}
              />

              <div
                style={{
                  fontSize: "9px",
                  color: C.purpleDim,
                  fontFamily: MONO,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                  fontWeight: 600,
                }}
              >
                Jump to section
              </div>

              {Object.keys(GROUPS).map((group) => {
                const items = NAV_ITEMS.filter((i) => i.group === group);
                return (
                  <div key={group} style={{ marginBottom: "1.25rem" }}>
                    <div
                      style={{
                        fontSize: "8px",
                        color: C.purpleBorder,
                        fontFamily: MONO,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {GROUPS[group]}
                    </div>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                    >
                      {items.map((item) => {
                        const isActive = active === item.id;
                        return (
                          <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.03, borderColor: C.purple }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              scrollTo(item.id);
                              setOpen(false);
                            }}
                            style={{
                              background: isActive
                                ? C.purpleLight
                                : C.surfaceTint,
                              border: `1px solid ${isActive ? C.purple : C.border}`,
                              color: isActive ? C.purple : C.textMid,
                              padding: "6px 12px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontFamily: MONO,
                              cursor: "pointer",
                              fontWeight: isActive ? 600 : 400,
                              transition: "background 0.15s, color 0.15s",
                            }}
                          >
                            {item.label}
                          </motion.button>
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

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const observers = [];
    const visibilityMap = {};

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visibilityMap[id] = entry.intersectionRatio;
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
