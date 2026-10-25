"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useTheme } from "@/context/ThemeContext";

const HeroScene = dynamic(
  () => import("@/components/hero/HeroScene").then((module) => module.HeroScene),
  {
    ssr: false,
    loading: () => <HeroFallback />,
  },
);

function HeroFallback() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgb(var(--primary)/0.16),transparent_46%),radial-gradient(circle_at_40%_75%,rgb(var(--secondary)/0.12),transparent_42%)]" />
  );
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export function HeroSceneLoader({ className }: { className?: string }) {
  const { isDark } = useTheme();
  const [webglOk, setWebglOk] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWebglOk(supportsWebGL()), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${className ?? ""} relative w-full overflow-hidden h-[360px] md:h-[400px] lg:h-[min(560px,72vh)]`}
    >
      <div className="absolute inset-0">
        {webglOk ? <HeroScene isDark={isDark} /> : <HeroFallback />}
      </div>
    </div>
  );
}
