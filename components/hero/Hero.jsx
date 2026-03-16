// ── Hero.jsx ──────────────────────────────────────────────────
// Main entry component. Composes all sections in order.
// "use client" here covers all child components — no need to
// add it to any of the imports below.
//
// Section order:
//   HeroHeader           → animated title, stats, badge
//   InstallStep          → npm / yarn install
//   ImportStep           → import { motion }
//   PropsTable           → core props reference table
//   EaseDemo             → interactive easing visualiser
//   SpringSection        → duration, delay & spring
//   TextAnimationDemo    → live "Hello, world!" example
//   AnimatedButtonDemo   → whileHover & whileTap + spring sliders
//   StaggerListDemo      → variants & staggerChildren
//   DraggableCardDemo    → drag, dragConstraints, dragElastic
//   AnimatePresenceDemo  → exit animations, AnimatePresence
//   StepSwitcherDemo     → view transitions, mode="wait"
//   CollapsibleListDemo  → layout animation, FLIP technique
//   LiveBadgeDemo        → keyframes, repeat, repeatType

"use client";

import React from "react";
import { s, Divider } from "@/components/styles";

import HeroHeader from "@/components/hero/HeroHeader";
import InstallStep from "@/components/InstallStep";
import ImportStep from "@/components/ImportStep";
import PropsTable from "@/components/PropsTable";
import EaseDemo from "@/components/EaseDemo";
import SpringSection from "@/components/SpringSection";
import TextAnimationDemo from "@/components/TextAnimationDemo";
import AnimatedButtonDemo from "@/components/AnimatedButtonDemo";
import StaggerListDemo from "@/components/StaggerListDemo";
import DraggableCardDemo from "@/components/DraggableCardDemo";
import AnimatePresenceDemo from "@/components/AnimatePresenceDemo";
import StepSwitcherDemo from "@/components/StepSwitcherDemo";
import CollapsibleListDemo from "@/components/CollapsibleListDemo";
import LiveBadgeDemo from "@/components/LiveBadgeDemo";

export default function Hero() {
  return (
    <section style={s.section}>
      <HeroHeader />

      {/* accent=true → blue gradient, matches HeroHeader's rule lines */}
      <Divider accent />

      <InstallStep />
      <ImportStep />

      <Divider accent />

      <PropsTable />

      <Divider accent />

      <EaseDemo />

      <Divider accent />

      <SpringSection />

      <Divider accent />

      <TextAnimationDemo />

      <Divider accent />

      <AnimatedButtonDemo />

      <Divider accent />

      <StaggerListDemo />

      <Divider accent />

      <DraggableCardDemo />

      <Divider accent />

      <AnimatePresenceDemo />

      <Divider accent />

      <StepSwitcherDemo />

      <Divider accent />

      <CollapsibleListDemo />

      <Divider accent />

      <LiveBadgeDemo />
    </section>
  );
}
