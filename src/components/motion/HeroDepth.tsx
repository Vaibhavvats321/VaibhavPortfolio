"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { ReactNode } from "react";

type HeroDepthProps = {
  children: ReactNode;
};

export function HeroDepth({ children }: HeroDepthProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 88], { clamp: true });
  const opacity = useTransform(scrollY, [0, 760], [1, 0.55], { clamp: true });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={shouldReduceMotion ? undefined : { y, opacity }}
    >
      {children}
    </motion.div>
  );
}
