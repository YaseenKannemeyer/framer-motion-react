// ── Hero.jsx ──────────────────────────────────────────────────
// Main entry component. Each section is wrapped in a <section>
// tag with an `id` that matches the NAV_ITEMS in BlogNav.jsx.
// The IntersectionObserver in BlogNav reads these ids to
// determine which section is currently in view.
//
// LAYOUT PATTERN:
//   app/layout.jsx renders <BlogNav /> alongside <Hero />.
//   BlogNav is fixed-position so it overlays the content.
//   No layout changes needed here — ids are all that matter.

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
import BlogFooter from "@/components/BlogFooter";

// Thin wrapper that adds an id anchor to each section.
// The id is what BlogNav's IntersectionObserver targets.
function Section({ id, children }) {
  return (
    <div id={id} style={{ scrollMarginTop: "2rem" }}>
      {children}
    </div>
  );
}

export default function Hero() {
  return (
    <main style={s.section}>
      <Section id="hero">
        <HeroHeader />
      </Section>

      <Divider accent />

      <Section id="install">
        <InstallStep />
      </Section>

      <Section id="import">
        <ImportStep />
      </Section>

      <Divider accent />

      <Section id="props">
        <PropsTable />
      </Section>

      <Divider accent />

      <Section id="easing">
        <EaseDemo />
      </Section>

      <Divider accent />

      <Section id="spring">
        <SpringSection />
      </Section>

      <Divider accent />

      <Section id="text-anim">
        <TextAnimationDemo />
      </Section>

      <Divider accent />

      <Section id="button">
        <AnimatedButtonDemo />
      </Section>

      <Divider accent />

      <Section id="stagger">
        <StaggerListDemo />
      </Section>

      <Divider accent />

      <Section id="drag">
        <DraggableCardDemo />
      </Section>

      <Divider accent />

      <Section id="presence">
        <AnimatePresenceDemo />
      </Section>

      <Divider accent />

      <Section id="step-switcher">
        <StepSwitcherDemo />
      </Section>

      <Divider accent />

      <Section id="layout">
        <CollapsibleListDemo />
      </Section>

      <Divider accent />

      <Section id="badge">
        <LiveBadgeDemo />
      </Section>

      <BlogFooter />
    </main>
  );
}
