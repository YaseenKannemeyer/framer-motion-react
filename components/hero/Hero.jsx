// ── Hero.jsx ──────────────────────────────────────────────────
// Main entry component. Composes all sections in order.
//
// Each section is its own file — edit them independently:
//
//   HeroHeader.jsx       → badge, h1, subtitle
//   InstallStep.jsx      → Step 1: npm / yarn install
//   ImportStep.jsx       → Step 2: import { motion }
//   PropsTable.jsx       → core props reference table
//   EaseDemo.jsx         → interactive easing visualizer
//   SpringSection.jsx    → duration, delay & spring docs
//   TextAnimationDemo.jsx→ live "Hello, world!" example
//
// Shared utilities:
//   styles.js            → all inline style objects
//   utils.js             → cubic bezier solver + easingMap
"use client";

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

import { s } from "@/components/styles";

export default function Hero() {
  return (
    <section style={s.section}>
      <HeroHeader />
      <div style={s.divider} />
      <InstallStep />
      <ImportStep />
      <div style={s.divider} />
      <PropsTable />
      <div style={s.divider} />
      <EaseDemo />
      <div style={s.divider} />
      <SpringSection />
      <div style={s.divider} />
      <TextAnimationDemo />
      <div style={s.divider} />
      <AnimatedButtonDemo />
      <div style={s.divider} />
      <StaggerListDemo />
      <div style={s.divider} />
      <DraggableCardDemo />
      <div style={s.divider} />
      <AnimatePresenceDemo />
      <div style={s.divider} />
      <StepSwitcherDemo />
    </section>
  );
}
