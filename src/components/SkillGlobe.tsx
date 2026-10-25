"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { allSkills } from "@/data/skills";
import { metaFor } from "@/components/skillIcons";
import { useTheme } from "@/context/ThemeContext";

function fibonacciSphere(n: number, radius: number) {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return pts;
}

function lumOf(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}

function mix(a: string, b: string, t: number) {
  const na = parseInt(a.slice(1), 16);
  const nb = parseInt(b.slice(1), 16);
  const r = Math.round(((na >> 16) & 255) * (1 - t) + ((nb >> 16) & 255) * t);
  const g = Math.round(((na >> 8) & 255) * (1 - t) + ((nb >> 8) & 255) * t);
  const bl = Math.round((na & 255) * (1 - t) + (nb & 255) * t);
  return `#${((1 << 24) | (r << 16) | (g << 8) | bl).toString(16).slice(1)}`;
}

function boxColor(hex: string, isDark: boolean) {
  const l = lumOf(hex);
  if (isDark && l < 0.22) return mix(hex, "#e8ecf8", 0.45);
  if (!isDark && l > 0.82) return mix(hex, "#181b28", 0.4);
  return hex;
}

function layoutLabel(ctx: CanvasRenderingContext2D, label: string, maxW: number, maxLines: number) {
  for (let size = 28; size >= 18; size -= 2) {
    ctx.font = `600 ${size}px Inter, sans-serif`;
    const words = label.split(" ");
    const lines = [];
    let cur = "";
    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w;
      if (!cur || ctx.measureText(test).width <= maxW) {
        cur = test;
      } else {
        lines.push(cur);
        cur = w;
      }
    }
    if (cur) lines.push(cur);
    if (lines.length <= maxLines && lines.every((l) => ctx.measureText(l).width <= maxW)) {
      return { lines, size };
    }
  }
  return { lines: [label], size: 18 };
}

function makeTileTexture(label: string, color: string, isDark: boolean) {
  const dpr = 2;
  const W = 256;
  const H = 120;
  const c = document.createElement("canvas");
  c.width = W * dpr;
  c.height = H * dpr;
  const ctx = c.getContext("2d");
  if (!ctx) {
    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    tex.anisotropy = 4;
    return { tex, aspect: W / H };
  }
  ctx.scale(dpr, dpr);
  ctx.fillStyle = isDark ? "rgba(17,20,32,0.95)" : "rgba(255,255,255,0.98)";
  const box = boxColor(color, isDark);
  ctx.strokeStyle = box;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(4, 4, W - 8, H - 8, 14);
  ctx.fill();
  ctx.stroke();

  const BX = 14;
  const BY = H / 2 - 26;
  const BS = 52;
  ctx.fillStyle = box;
  ctx.beginPath();
  ctx.roundRect(BX, BY, BS, BS, 12);
  ctx.fill();

  const fg = lumOf(box) > 0.6 ? "#10131c" : "#ffffff";
  ctx.fillStyle = fg;
  const meta = metaFor(label);
  ctx.font = "700 22px JetBrains Mono, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(meta.letter, BX + BS / 2, BY + BS / 2 + 1);

  const TX = 80;
  const maxW = W - TX - 12;
  ctx.fillStyle = isDark ? "#e8ecf8" : "#181b28";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const { lines, size } = layoutLabel(ctx, label, maxW, 2);
  ctx.font = `600 ${size}px Inter, sans-serif`;
  const lh = size + 4;
  const startY = H / 2 + 1 - ((lines.length - 1) * lh) / 2;
  lines.forEach((ln, i) => ctx.fillText(ln, TX, startY + i * lh));

  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearFilter;
  tex.anisotropy = 4;
  return { tex, aspect: W / H };
}

function Tile({ position, label, color, isDark }: { position: [number, number, number]; label: string; color: string; isDark: boolean }) {
  const { tex, aspect } = useMemo(() => makeTileTexture(label, color, isDark), [label, color, isDark]);
  const scale = 1.08;
  return (
    <sprite position={position} scale={[scale * aspect, scale, 1]}>
      <spriteMaterial map={tex} transparent depthWrite={false} />
    </sprite>
  );
}

function Globe({ isDark }: { isDark: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const radius = 4.2;
  const positions = useMemo(() => fibonacciSphere(allSkills.length, radius), []);
  const drag = useRef({ active: false, lastX: 0, lastY: 0 });
  const velocity = useRef({ x: 0, y: 0.0022 });
  const resumeAt = useRef(0);

  useEffect(() => {
    const el = gl.domElement;
    const down = (e: PointerEvent) => {
      drag.current.active = true;
      const p = e;
      drag.current.lastX = p.clientX;
      drag.current.lastY = p.clientY;
    };
    const move = (e: PointerEvent) => {
      if (!drag.current.active || !group.current) return;
      const p = e;
      const dx = p.clientX - drag.current.lastX;
      const dy = p.clientY - drag.current.lastY;
      drag.current.lastX = p.clientX;
      drag.current.lastY = p.clientY;
      group.current.rotation.y += dx * 0.006;
      group.current.rotation.x += dy * 0.006;
      velocity.current = { x: dy * 0.0006, y: dx * 0.0012 };
    };
    const up = () => {
      if (!drag.current.active) return;
      drag.current.active = false;
      resumeAt.current = performance.now() + 4000;
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl]);

  useFrame(() => {
    if (!group.current || drag.current.active) return;
    const now = performance.now();
    if (now >= resumeAt.current) {
      velocity.current.x *= 0.95;
      velocity.current.y += (0.0022 - velocity.current.y) * 0.02;
    }
    group.current.rotation.y += velocity.current.y;
    group.current.rotation.x += velocity.current.x;
  });

  return (
    <group ref={group}>
      {positions.map((pos, i) => (
        <Tile
          key={allSkills[i].label + i}
          position={pos as [number, number, number]}
          label={allSkills[i].label}
          color={metaFor(allSkills[i].label).color}
          isDark={isDark}
        />
      ))}
    </group>
  );
}

function detectWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export default function SkillGlobe() {
  const { isDark } = useTheme();
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setWebgl(detectWebGL()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!webgl) {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {allSkills.map((s) => (
          <span
            key={s.label}
            className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-1 font-mono text-xs"
            style={{ color: metaFor(s.label).color }}
          >
            {s.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="h-[340px] w-full cursor-grab touch-none active:cursor-grabbing sm:h-[460px]">
      <Canvas camera={{ position: [0, 0, 11], fov: 48 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Globe isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
}
