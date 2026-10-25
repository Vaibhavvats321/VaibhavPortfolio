"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export function Heart() {
  const { isDark } = useTheme();
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={isDark ? "inline-block text-rose-400" : "inline-block text-rose-500"}
      aria-label="love"
      animate={{ scale: [1, 1.25, 1, 1.25, 1] }}
      transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut", times: [0, 0.12, 0.24, 0.36, 0.5] }}
    >
      <path d="M12 21s-6.7-4.3-9.3-8.2C.9 10.1 1.6 6.6 4.4 5.3 6.4 4.4 8.6 5 10 6.6c.5.6 1 1.2 2 2.4.9-1.1 1.4-1.7 2-2.4 1.4-1.6 3.6-2.2 5.6-1.3 2.8 1.3 3.5 4.8 1.7 7.5C18.7 16.7 12 21 12 21z" />
    </motion.svg>
  );
}
