"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.9,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
