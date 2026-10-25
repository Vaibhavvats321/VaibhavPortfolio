"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type StoryPhase = "frontend" | "api" | "build" | "git" | "deploy" | "celebrate";

export type HeroSceneProps = {
  isDark: boolean;
};

/* ── Story timeline ────────────────────────────────────────── */

const PHASES: readonly { key: StoryPhase; duration: number }[] = [
  { key: "frontend", duration: 5.2 },
  { key: "api", duration: 5.2 },
  { key: "build", duration: 4.2 },
  { key: "git", duration: 4.6 },
  { key: "deploy", duration: 4.2 },
  { key: "celebrate", duration: 4.6 },
];

const TOTAL = PHASES.reduce((sum, phase) => sum + phase.duration, 0);

const MONO = "'JetBrains Mono', 'Consolas', ui-monospace, monospace";
const SANS = "'Inter', ui-sans-serif, system-ui, sans-serif";

const STAGE_META: Record<StoryPhase, { file: string; pill: string; accent: string }> = {
  frontend: { file: "src/app/page.tsx", pill: "FRONTEND", accent: "#7dd3fc" },
  api: { file: "app/api/chat/route.ts", pill: "API", accent: "#c4a5ff" },
  build: { file: "terminal — build", pill: "BUILD", accent: "#3ad0c0" },
  git: { file: "terminal — git", pill: "GIT PUSH", accent: "#ffb454" },
  deploy: { file: "terminal — deploy", pill: "DEPLOY", accent: "#3ad0c0" },
  celebrate: { file: "vaibhav.dev — live", pill: "HOORAY", accent: "#ffd166" },
};

type Tone = "text" | "dim" | "accent" | "success" | "warn" | "purple";
type CodeLine = { text: string; tone?: Tone };

const TONES: Record<Tone, string> = {
  text: "#d7def0",
  dim: "#6f7d9c",
  accent: "#7dd3fc",
  success: "#3ad0c0",
  warn: "#ffb454",
  purple: "#c4a5ff",
};

const FRONTEND_LINES: readonly CodeLine[] = [
  { text: "const hero = {", tone: "accent" },
  { text: '  title: "Software Engineer.",' },
  { text: '  focus: "AI Engineer",' },
  { text: '  cta: "Explore work",' },
  { text: "};" },
  { text: "" },
  { text: "export function Hero() {", tone: "accent" },
  { text: "  return <Page {...hero} />;" },
  { text: "}" },
];

const API_LINES: readonly CodeLine[] = [
  { text: "// app/api/chat/route.ts", tone: "dim" },
  { text: "export async function POST(req) {", tone: "accent" },
  { text: "  const body = await req.json();" },
  { text: "  const stream = await ai.stream({", tone: "purple" },
  { text: '    model: "gpt-5",' },
  { text: "    prompt: body.prompt," },
  { text: "  });" },
  { text: "  return new Response(stream, {" },
  { text: '    headers: { "x-status": "ok" },' },
  { text: "  });" },
  { text: "}" },
];

const GIT_LINES: readonly CodeLine[] = [
  { text: "$ git add .", tone: "dim" },
  { text: '$ git commit -m "feat: ship portfolio"' },
  { text: "[main 9f3c2a1] 12 files changed", tone: "warn" },
  { text: "$ git push origin main", tone: "dim" },
  { text: "Writing objects: 100% (18/18), 4.2 KiB" },
  { text: "To github.com:vaibhav/portfolio.git", tone: "dim" },
  { text: "   a11c3d0..9f3c2a1  main -> main" },
  { text: "✓ pushed to origin/main", tone: "success" },
];

const BUILD_LINES: readonly CodeLine[] = [
  { text: "$ pnpm build", tone: "dim" },
  { text: "▲ Next.js 16.4.2", tone: "accent" },
  { text: "✓ Compiled successfully", tone: "success" },
  { text: "✓ Linting and checking validity of types", tone: "success" },
  { text: "✓ Collecting page data", tone: "success" },
  { text: "✓ Generating static pages (6/6)", tone: "success" },
  { text: "✓ Build completed", tone: "success" },
];

const DEPLOY_LINES: readonly CodeLine[] = [
  { text: "$ pnpm deploy", tone: "dim" },
  { text: "+ Uploading build... 100%", tone: "accent" },
  { text: "✓ Deployed to production", tone: "success" },
  { text: "→ https://vaibhav.dev", tone: "accent" },
];

/* ── Canvas texture helpers ────────────────────────────────── */

function makeScreenCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 560;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return {
    canvas,
    ctx: canvas.getContext("2d"),
    tex,
  };
}

type ScreenState = ReturnType<typeof makeScreenCanvas>;

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function revealLines(
  lines: readonly CodeLine[],
  progress: number,
): { visible: CodeLine[]; typing: boolean } {
  const total = lines.reduce((sum, line) => sum + Math.max(line.text.length, 1), 0);
  let budget = Math.floor(progress * total * 1.2);
  const visible: CodeLine[] = [];

  for (const line of lines) {
    if (budget <= 0) break;
    const length = Math.max(line.text.length, 1);
    if (budget >= length) {
      visible.push(line);
      budget -= length;
    } else {
      visible.push({ text: line.text.slice(0, budget), tone: line.tone });
      budget = 0;
    }
  }

  return { visible, typing: progress < 1 };
}

function drawDots(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const colors = ["#ff5f56", "#ffbd2e", "#27c93f"];
  colors.forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + index * 20, y, 6, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPanel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  accent: string,
) {
  ctx.fillStyle = "#0b1220";
  roundedRect(ctx, x, y, w, h, 16);
  ctx.fill();
  ctx.strokeStyle = "#1d2a44";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.arc(x + 24, y + 24, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawCodePanel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  title: string,
  lines: readonly CodeLine[],
  progress: number,
  accent: string,
  time: number,
) {
  drawPanel(ctx, x, y, w, h, accent);

  ctx.font = `600 18px ${MONO}`;
  ctx.fillStyle = "#a9b8d8";
  ctx.fillText(title, x + 40, y + 30);

  ctx.strokeStyle = "#16223a";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y + 50);
  ctx.lineTo(x + w, y + 50);
  ctx.stroke();

  const { visible, typing } = revealLines(lines, progress);
  const lineHeight = 35;
  const codeX = x + 46;
  const top = y + 82;

  visible.forEach((line, index) => {
    const lineY = top + index * lineHeight;
    ctx.font = `15px ${MONO}`;
    ctx.fillStyle = "#2f3d5c";
    ctx.fillText(String(index + 1).padStart(2, " "), x + 14, lineY);

    const text = line.text;
    let color = TONES[line.tone ?? "text"];
    if (text.trim().startsWith("//")) color = TONES.dim;
    if (text.includes("ai.stream")) color = TONES.purple;
    if (text.includes("<Page") || text.includes("Response")) color = "#f2f6ff";
    if (text.includes("title") || text.includes("focus") || text.includes("cta")) {
      color = "#a9c6f0";
    }

    ctx.fillStyle = color;
    ctx.font = `25px ${MONO}`;
    const isLast = index === visible.length - 1;
    const cursor = isLast && typing && Math.floor(time * 3.4) % 2 === 0 ? "▍" : "";
    ctx.fillText(text + cursor, codeX, lineY);
  });
}

function drawPreview(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  progress: number,
  accent: string,
) {
  drawPanel(ctx, x, y, w, h, accent);

  ctx.font = `600 15px ${MONO}`;
  ctx.fillStyle = "#a9b8d8";
  ctx.fillText("localhost:3000", x + 40, y + 30);

  ctx.strokeStyle = "#16223a";
  ctx.beginPath();
  ctx.moveTo(x, y + 50);
  ctx.lineTo(x + w, y + 50);
  ctx.stroke();

  const reveal = Math.max(0, Math.min(1, (progress - 0.22) / 0.4));
  ctx.globalAlpha = reveal;
  ctx.textAlign = "center";

  ctx.fillStyle = TONES.dim;
  ctx.font = `600 12px ${MONO}`;
  ctx.fillText("LIVE PREVIEW", x + w / 2, y + 84);

  ctx.fillStyle = "#f4f7ff";
  ctx.font = `700 34px ${SANS}`;
  ctx.fillText("Vaibhav Vats", x + w / 2, y + 132);

  ctx.fillStyle = TONES.accent;
  ctx.font = `600 17px ${SANS}`;
  ctx.fillText("Software Engineer", x + w / 2, y + 164);

  ctx.fillStyle = TONES.purple;
  ctx.fillText("AI Engineer", x + w / 2, y + 188);

  const cardY = y + 218;
  ctx.fillStyle = "#0e1830";
  roundedRect(ctx, x + 18, cardY, w - 36, 68, 12);
  ctx.fill();
  ctx.strokeStyle = "#1d2a44";
  ctx.stroke();

  ctx.fillStyle = "#1a2a48";
  roundedRect(ctx, x + 32, cardY + 18, w - 100, 9, 4.5);
  ctx.fill();
  roundedRect(ctx, x + 32, cardY + 38, w - 128, 8, 4);
  ctx.fill();

  ctx.fillStyle = "#0e1830";
  roundedRect(ctx, x + 18, cardY + 82, w - 36, 68, 12);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#1a2a48";
  roundedRect(ctx, x + 32, cardY + 100, w - 100, 9, 4.5);
  ctx.fill();
  roundedRect(ctx, x + 32, cardY + 120, w - 128, 8, 4);
  ctx.fill();

  ctx.fillStyle = accent;
  roundedRect(ctx, x + 18, cardY + 168, w - 36, 46, 23);
  ctx.fill();
  ctx.fillStyle = "#04111f";
  ctx.font = `700 16px ${SANS}`;
  ctx.fillText("Explore work", x + w / 2, cardY + 197);

  ctx.globalAlpha = 1;
  ctx.textAlign = "left";
}

function drawApiPanel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  progress: number,
  time: number,
  accent: string,
) {
  drawPanel(ctx, x, y, w, h, accent);

  ctx.font = `600 15px ${MONO}`;
  ctx.fillStyle = "#a9b8d8";
  ctx.fillText("API · live request", x + 40, y + 30);

  ctx.strokeStyle = "#16223a";
  ctx.beginPath();
  ctx.moveTo(x, y + 50);
  ctx.lineTo(x + w, y + 50);
  ctx.stroke();

  const requestReveal = Math.max(0, Math.min(1, progress / 0.3));
  const responseReveal = Math.max(0, Math.min(1, (progress - 0.3) / 0.35));

  ctx.globalAlpha = requestReveal;
  ctx.fillStyle = "#102a25";
  roundedRect(ctx, x + 18, y + 70, w - 36, 88, 12);
  ctx.fill();
  ctx.strokeStyle = "#1c4a40";
  ctx.stroke();

  ctx.fillStyle = TONES.success;
  ctx.font = `700 15px ${MONO}`;
  ctx.fillText("POST", x + 32, y + 98);
  ctx.fillStyle = "#d7def0";
  ctx.font = `600 17px ${MONO}`;
  ctx.fillText("/api/chat", x + 88, y + 98);

  ctx.fillStyle = TONES.dim;
  ctx.font = `13px ${MONO}`;
  ctx.fillText('{ "prompt": "build my portfolio" }', x + 32, y + 132);

  ctx.globalAlpha = responseReveal;
  ctx.fillStyle = "#0e1830";
  roundedRect(ctx, x + 18, y + 172, w - 36, 148, 12);
  ctx.fill();
  ctx.strokeStyle = "#1d2a44";
  ctx.stroke();

  ctx.fillStyle = TONES.success;
  ctx.font = `700 15px ${MONO}`;
  ctx.fillText("200 OK", x + 32, y + 200);

  const json = [
    "{",
    '  "ok": true,',
    '  "model": "gpt-5",',
    '  "tokens": 128,',
    '  "latency": "84ms"',
    "}",
  ];
  const typed = Math.floor(responseReveal * json.join("").length);
  let budget = typed;
  ctx.font = `14px ${MONO}`;
  json.forEach((line, index) => {
    if (budget <= 0) return;
    const visible = line.slice(0, budget);
    budget -= line.length;
    ctx.fillStyle = index === 0 || index === json.length - 1 ? TONES.dim : "#b8c9ea";
    ctx.fillText(visible, x + 32, y + 230 + index * 20);
  });

  ctx.globalAlpha = 1;
  ctx.fillStyle = "#0e1830";
  roundedRect(ctx, x + 18, y + 334, w - 36, h - 356, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = TONES.dim;
  ctx.font = `600 12px ${MONO}`;
  ctx.fillText("AI MODEL", x + 32, y + 360);

  const nodes = [
    { x: x + 52, y: y + 396 },
    { x: x + 104, y: y + 386 },
    { x: x + 156, y: y + 398 },
    { x: x + 208, y: y + 386 },
  ];
  ctx.strokeStyle = "#24406a";
  ctx.lineWidth = 2;
  nodes.forEach((node, index) => {
    if (index === 0) return;
    ctx.beginPath();
    ctx.moveTo(nodes[index - 1].x, nodes[index - 1].y);
    ctx.lineTo(node.x, node.y);
    ctx.stroke();
  });
  nodes.forEach((node, index) => {
    const pulse = 0.55 + 0.45 * Math.sin(time * 3 + index);
    ctx.fillStyle = index === nodes.length - 1 ? accent : TONES.accent;
    ctx.globalAlpha = 0.45 + pulse * 0.55;
    ctx.beginPath();
    ctx.arc(node.x, node.y, index === nodes.length - 1 ? 7 : 5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  if (progress < 1) {
    ctx.fillStyle = TONES.success;
    ctx.font = `600 13px ${MONO}`;
    const dots = ".".repeat((Math.floor(time * 3) % 3) + 1);
    ctx.fillText(`streaming${dots}`, x + 224, y + 362);
  }
}

function drawTerminal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  lines: readonly CodeLine[],
  progress: number,
  time: number,
  accent: string,
) {
  drawPanel(ctx, x, y, w, h, accent);

  ctx.font = `600 16px ${MONO}`;
  ctx.fillStyle = "#a9b8d8";
  ctx.fillText("build log", x + 40, y + 31);

  ctx.strokeStyle = "#16223a";
  ctx.beginPath();
  ctx.moveTo(x, y + 52);
  ctx.lineTo(x + w, y + 52);
  ctx.stroke();

  const { visible, typing } = revealLines(lines, progress);
  ctx.font = `27px ${MONO}`;
  visible.forEach((line, index) => {
    const lineY = y + 96 + index * 40;
    let color = TONES[line.tone ?? "text"];
    if (line.text.startsWith("$")) color = "#7f8aa8";
    if (line.text.includes("✓")) color = TONES.success;
    if (line.text.includes("→") || line.text.startsWith("▲")) color = TONES.accent;
    if (line.text.includes("LIVE")) color = TONES.success;
    ctx.fillStyle = color;
    const isLast = index === visible.length - 1;
    const cursor = isLast && typing && Math.floor(time * 3.4) % 2 === 0 ? "▍" : "";
    ctx.fillText(line.text + cursor, x + 34, lineY);
  });

  if (progress > 0.8 && !typing) {
    const pulse = 0.6 + 0.4 * Math.sin(time * 4);
    ctx.globalAlpha = pulse;
    ctx.fillStyle = TONES.success;
    roundedRect(ctx, x + w - 148, y + 66, 116, 38, 19);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#04211d";
    ctx.font = `700 17px ${MONO}`;
    ctx.fillText("LIVE", x + w - 112, y + 92);
  }
}

const CONFETTI_DOTS = Array.from({ length: 46 }, (_, index) => {
  const a = ((index * 37) % 100) / 100;
  const b = ((index * 61) % 100) / 100;
  const c = ((index * 23) % 100) / 100;
  return {
    x: a,
    y: b,
    size: 5 + c * 7,
    color: ["#ffd166", "#ff6b6b", "#3ad0c0", "#c4a5ff", "#7dd3fc"][index % 5],
    spin: c * Math.PI,
    drift: 16 + a * 36,
  };
});

function drawCelebration(
  ctx: CanvasRenderingContext2D,
  time: number,
  w: number,
  h: number,
) {
  const glow = ctx.createRadialGradient(w / 2, 260, 30, w / 2, 260, 470);
  glow.addColorStop(0, "rgba(255,209,102,0.22)");
  glow.addColorStop(0.55, "rgba(58,208,192,0.08)");
  glow.addColorStop(1, "rgba(5,8,16,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 58, w, h - 58);

  CONFETTI_DOTS.forEach((dot) => {
    const x = dot.x * w + Math.sin(time * 2 + dot.y * 9) * dot.drift;
    const y = 70 + dot.y * (h - 160) + Math.cos(time * 2.4 + dot.x * 8) * 14;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(dot.spin + time * 1.6);
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = dot.color;
    ctx.fillRect(-dot.size / 2, -dot.size / 2, dot.size, dot.size * 1.8);
    ctx.restore();
  });
  ctx.globalAlpha = 1;

  ctx.textAlign = "center";

  ctx.fillStyle = "#3ad0c0";
  ctx.beginPath();
  ctx.arc(w / 2, 190, 38, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#04211d";
  ctx.font = `900 46px ${SANS}`;
  ctx.fillText("✓", w / 2, 206);

  ctx.fillStyle = "#ffd166";
  ctx.font = `900 86px ${SANS}`;
  ctx.fillText("HOORAY", w / 2, 322);

  ctx.fillStyle = "#f4f7ff";
  ctx.font = `600 28px ${SANS}`;
  ctx.fillText("Portfolio deployed live", w / 2, 374);

  ctx.fillStyle = TONES.accent;
  ctx.font = `600 22px ${MONO}`;
  ctx.fillText("https://vaibhav.dev", w / 2, 412);

  ctx.fillStyle = "#7f8aa8";
  ctx.font = `17px ${MONO}`;
  ctx.fillText("frontend \u2192 api \u2192 build \u2192 git push \u2192 deploy \u2192 hooray", w / 2, 468);

  ctx.textAlign = "left";
}

function drawScreen(
  screen: ScreenState,
  phase: StoryPhase,
  progress: number,
  time: number,
) {
  const { ctx, tex, canvas } = screen;
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const meta = STAGE_META[phase];

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#0a1020");
  bg.addColorStop(1, "#05080f");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Window chrome
  ctx.fillStyle = "#0e1526";
  ctx.fillRect(0, 0, w, 62);
  drawDots(ctx, 24, 31);

  ctx.font = `600 22px ${MONO}`;
  ctx.fillStyle = "#c3d0e8";
  ctx.fillText(meta.file, 112, 39);

  ctx.font = `700 17px ${MONO}`;
  const pillW = ctx.measureText(meta.pill).width + 36;
  ctx.fillStyle = meta.accent;
  ctx.globalAlpha = 0.14;
  roundedRect(ctx, w - 24 - pillW, 17, pillW, 30, 15);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = meta.accent;
  ctx.fillText(meta.pill, w - 24 - pillW + 18, 37);

  ctx.strokeStyle = "#1b2740";
  ctx.beginPath();
  ctx.moveTo(0, 62);
  ctx.lineTo(w, 62);
  ctx.stroke();

  const bodyTop = 82;
  const bodyH = 454;
  const panelW = 540;
  const sideX = 580;
  const sideW = 296;

  if (phase === "frontend") {
    drawCodePanel(
      ctx,
      24,
      bodyTop,
      panelW,
      bodyH,
      "page.tsx",
      FRONTEND_LINES,
      progress,
      meta.accent,
      time,
    );
    drawPreview(ctx, sideX, bodyTop, sideW, bodyH, progress, meta.accent);
  } else if (phase === "api") {
    drawCodePanel(
      ctx,
      24,
      bodyTop,
      420,
      bodyH,
      STAGE_META.api.file,
      API_LINES,
      progress,
      meta.accent,
      time,
    );
    drawApiPanel(ctx, sideX, bodyTop, sideW, bodyH, progress, time, meta.accent);
  } else if (phase === "build") {
    drawTerminal(ctx, 24, bodyTop, 852, bodyH, BUILD_LINES, progress, time, meta.accent);
  } else if (phase === "git") {
    drawTerminal(ctx, 24, bodyTop, 852, bodyH, GIT_LINES, progress, time, meta.accent);
  } else if (phase === "deploy") {
    drawTerminal(ctx, 24, bodyTop, 852, bodyH, DEPLOY_LINES, progress, time, meta.accent);
  } else {
    drawCelebration(ctx, time, w, h);
  }

  tex.needsUpdate = true;
}

/* ── Camera controller ─────────────────────────────────────── */

function CameraController() {
  const pointer = useRef({ x: 0, y: 0 });
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame((state) => {
    const camera = state.camera;
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const viewportWidth = window.innerWidth;
    const baseZ = viewportWidth < 640 ? 7.2 : 6.4;
    const baseX = 0.3;
    const lookX = 0.3;
    const lookY = 1.05;

    if (reduce.current) {
      camera.position.set(baseX, 1.2, baseZ);
      camera.lookAt(lookX, lookY, 0);
      return;
    }

    const targetX = baseX + pointer.current.x * 0.09;
    const targetY = 1.2 - pointer.current.y * 0.06;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (baseZ - camera.position.z) * 0.04;
    camera.lookAt(lookX, lookY, 0);
  });

  return null;
}

/* ── Party popper particles ────────────────────────────────── */

const PARTICLE_COUNT = 84;

const PARTICLE_SEEDS = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
  const left = index % 2 === 0;
  const a = ((index * 37) % 100) / 100;
  const b = ((index * 61) % 100) / 100;
  const c = ((index * 23) % 100) / 100;
  return {
    left,
    vx: (left ? 1 : -1) * (0.35 + a * 1.0),
    vy: 1.1 + b * 1.2,
    vz: (c - 0.5) * 1.2,
    spin: 3 + a * 9,
    size: 0.035 + b * 0.045,
    color: index % 5,
  };
});

const BURST_ORIGIN_LEFT = new THREE.Vector3(-1.38, 0.58, 1.0);
const BURST_ORIGIN_RIGHT = new THREE.Vector3(1.42, 0.58, 1.0);

/* ── Developer rig ─────────────────────────────────────────── */

function DeveloperRig({
  isDark,
  onPhaseChange,
}: {
  isDark: boolean;
  onPhaseChange: (phase: StoryPhase) => void;
}) {
  const screen = useMemo(() => makeScreenCanvas(), []);
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const keys = useRef<THREE.Mesh[]>([]);
  const particles = useRef<THREE.Mesh[]>([]);
  const burstAge = useRef(0);
  const lastPhase = useRef<StoryPhase>("frontend");
  const clock = useRef(0);
  const reduce = useRef(false);

  const palette = useMemo(
    () => ({
      skin: isDark ? 0xd9a87c : 0xd7a47a,
      hair: isDark ? 0x1c1f2b : 0x24202a,
      hoodie: isDark ? 0x2c344b : 0x51618a,
      hoodieDark: isDark ? 0x1d2334 : 0x3a4767,
      trousers: isDark ? 0x1a2132 : 0x2c3550,
      shoe: isDark ? 0xe8ecf8 : 0x1b2030,
      desk: isDark ? 0x2a3147 : 0x3a435e,
      metal: isDark ? 0x4b5674 : 0x5c6a89,
      stool: isDark ? 0x232a3c : 0x38415a,
      screenGlow: isDark ? 0x6eb4ff : 0x4f46e5,
    }),
    [isDark],
  );

  const materials = useMemo(() => {
    const standard = (
      color: number,
      extra: Partial<THREE.MeshStandardMaterialParameters> = {},
    ) => new THREE.MeshStandardMaterial({ color, roughness: 0.65, metalness: 0.08, ...extra });

    const confettiColors = [0xffd166, 0xff6b6b, 0x3ad0c0, 0xc4a5ff, 0x7dd3fc];
    const confetti = confettiColors.map((color) => {
      const material = new THREE.MeshBasicMaterial({ color });
      material.toneMapped = false;
      return material;
    });

    return {
      skin: standard(palette.skin, { roughness: 0.88 }),
      hair: standard(palette.hair, { roughness: 0.92 }),
      hoodie: standard(palette.hoodie, { roughness: 0.78 }),
      hoodieDark: standard(palette.hoodieDark, { roughness: 0.8 }),
      trousers: standard(palette.trousers, { roughness: 0.85 }),
      shoe: standard(palette.shoe, { roughness: 0.72, metalness: 0.15 }),
      desk: standard(palette.desk, { roughness: 0.52, metalness: 0.12 }),
      metal: standard(palette.metal, { roughness: 0.38, metalness: 0.52 }),
      stool: standard(palette.stool, { roughness: 0.62 }),
      glow: new THREE.MeshBasicMaterial({ color: palette.screenGlow }),
      eye: new THREE.MeshBasicMaterial({ color: 0x16202f }),
      confetti,
    };
  }, [palette]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => {
      reduce.current = media.matches;
      if (media.matches) {
        clock.current = 0;
        burstAge.current = 0;
      }
    };

    updateReducedMotion();
    media.addEventListener("change", updateReducedMotion);
    return () => media.removeEventListener("change", updateReducedMotion);
  }, []);

  useEffect(() => {
    drawScreen(screen, "frontend", 1, 0);
  }, [screen]);

  useEffect(() => {
    return () => {
      Object.values(materials).forEach((material) => {
        if (Array.isArray(material)) {
          material.forEach((item) => item.dispose());
        } else {
          material.dispose();
        }
      });
      screen.tex.dispose();
    };
  }, [materials, screen]);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    if (!reduce.current) clock.current = (clock.current + d) % TOTAL;
    const t = clock.current;

    let elapsed = 0;
    let phase: StoryPhase = "frontend";
    let phaseProgress = 0;
    for (const item of PHASES) {
      if (t < elapsed + item.duration) {
        phase = item.key;
        phaseProgress = (t - elapsed) / item.duration;
        break;
      }
      elapsed += item.duration;
    }

    const reduced = reduce.current;
    const progress = reduced ? 1 : phaseProgress;
    const animT = reduced ? 0 : t;

    if (phase !== lastPhase.current) {
      lastPhase.current = phase;
      onPhaseChange(phase);
      if (phase === "celebrate") burstAge.current = 0;
    }
    if (phase === "celebrate" && !reduced) {
      burstAge.current += d;
    }

    if (root.current) {
      root.current.position.x = 0.3;
      if (phase === "celebrate" && !reduced) {
        root.current.position.y =
          Math.abs(Math.sin(phaseProgress * Math.PI * 4)) * (1 - phaseProgress) * 0.14;
      } else {
        root.current.position.y = 0;
      }
    }

    if (body.current) {
      if (phase === "celebrate") {
        body.current.rotation.x = -0.1;
        body.current.rotation.z = Math.sin(animT * 6) * 0.04;
      } else if (phase === "git") {
        body.current.rotation.x = 0.14;
        body.current.rotation.z = 0;
      } else if (phase === "deploy") {
        body.current.rotation.x = -0.06 + Math.sin(animT * 1.4) * 0.01;
        body.current.rotation.z = Math.sin(animT * 0.9) * 0.012;
      } else {
        body.current.rotation.x = 0.08 + Math.sin(animT * 1.2) * 0.008;
        body.current.rotation.z = 0;
      }
    }

    if (leftArm.current && rightArm.current) {
      if (phase === "celebrate") {
        leftArm.current.rotation.x = -2.3 + Math.sin(animT * 9) * 0.08;
        rightArm.current.rotation.x = -2.3 + Math.cos(animT * 9) * 0.08;
        leftArm.current.rotation.z = 0.34;
        rightArm.current.rotation.z = -0.34;
      } else if (phase === "git") {
        leftArm.current.rotation.x = -0.92;
        rightArm.current.rotation.x = -1.5 + Math.sin(animT * 5.5) * 0.32;
        leftArm.current.rotation.z = 0.16;
        rightArm.current.rotation.z = -0.1;
      } else if (phase === "deploy") {
        leftArm.current.rotation.x = -0.34 + Math.sin(animT * 1.3) * 0.02;
        rightArm.current.rotation.x = -0.34 + Math.cos(animT * 1.3) * 0.02;
        leftArm.current.rotation.z = 0.24;
        rightArm.current.rotation.z = -0.24;
      } else {
        const typing = Math.sin(animT * 18) * 0.055;
        leftArm.current.rotation.x = -0.9 + typing;
        rightArm.current.rotation.x = -0.9 - typing;
        leftArm.current.rotation.z = 0.15;
        rightArm.current.rotation.z = -0.15;
      }
    }

    if (head.current) {
      if (phase === "celebrate") {
        head.current.rotation.x = -0.22;
        head.current.rotation.y = Math.sin(animT * 4) * 0.12;
      } else if (phase === "deploy") {
        head.current.rotation.x = -0.02;
        head.current.rotation.y = 0.28;
      } else if (phase === "git") {
        head.current.rotation.x = 0.07;
        head.current.rotation.y = 0.18;
      } else {
        head.current.rotation.x = 0.05;
        head.current.rotation.y = 0.24 + Math.sin(animT * 0.8) * 0.02;
      }
    }

    keys.current.forEach((key, index) => {
      if (!key) return;
      const base = 0.15;
      const typingPhase = phase === "frontend" || phase === "api" || phase === "build" || phase === "git";
      if (typingPhase && !reduced) {
        const active = Math.sin(animT * 20 + index * 0.9) > 0.55;
        key.position.y += ((active ? base - 0.03 : base) - key.position.y) * 0.32;
      } else {
        key.position.y += (base - key.position.y) * 0.08;
      }
    });

    drawScreen(screen, phase, progress, animT);

    const age = burstAge.current;

    particles.current.forEach((mesh, index) => {
      if (!mesh) return;
      const seed = PARTICLE_SEEDS[index];
      const origin = seed.left ? BURST_ORIGIN_LEFT : BURST_ORIGIN_RIGHT;
      const life = 2.6;
      const visible = phase === "celebrate" && !reduced && age < life;
      mesh.visible = visible;
      if (!visible) return;

      const flightTime = Math.min(age, life);
      mesh.position.set(
        origin.x + seed.vx * flightTime,
        origin.y + seed.vy * flightTime - 0.45 * flightTime * flightTime,
        origin.z + seed.vz * flightTime,
      );
      mesh.rotation.set(
        seed.spin * flightTime,
        seed.spin * 0.6 * flightTime,
        seed.spin * 0.35 * flightTime,
      );
    });
  });

  const keyLayout = useMemo(() => {
    const out: { x: number; z: number; k: number }[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        out.push({ x: (col - 3.5) * 0.09 - 0.35, z: (row - 1) * 0.09, k: row * 10 + col });
      }
    }
    return out;
  }, []);

  const setKeyRef = (index: number) => (mesh: THREE.Mesh | null) => {
    if (mesh) keys.current[index] = mesh;
  };

  const setParticleRef = (index: number) => (mesh: THREE.Mesh | null) => {
    if (mesh) particles.current[index] = mesh;
  };

  return (
    <group ref={root}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={1.1} />

      {/* Desk */}
      <mesh position={[0, 0.05, 0.55]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.14, 1.3]} />
        <meshStandardMaterial color={palette.desk} />
      </mesh>

      {/* Monitor base */}
      <mesh position={[0.35, 0.12, 1.0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.1, 0.15]} />
        <meshStandardMaterial color={palette.metal} />
      </mesh>

      {/* Monitor stand */}
      <mesh position={[0.35, 0.35, 1.0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.045, 0.06, 0.48, 16]} />
        <meshStandardMaterial color={palette.metal} />
      </mesh>

      {/* Computer screen with live canvas texture */}
      <mesh position={[0.35, 1.18, 1.0]} castShadow receiveShadow>
        <planeGeometry args={[1.9, 1.2]} />
        <meshStandardMaterial map={screen.tex} />
      </mesh>

      {/* Developer character */}
      <group ref={body} position={[-1.05, 0.55, 0.7]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.62, 0.36]} />
          <meshStandardMaterial color={palette.hoodie} />
        </mesh>

        <group ref={head} position={[0, 0.68, 0]}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.21, 14, 14]} />
            <meshStandardMaterial color={palette.skin} />
          </mesh>
          <mesh position={[0, 0.07, -0.015]}>
            <sphereGeometry args={[0.22, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2.4]} />
            <meshStandardMaterial color={palette.hair} />
          </mesh>
          <mesh position={[-0.065, 0.015, 0.205]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial color={0x16202f} />
          </mesh>
          <mesh position={[0.065, 0.015, 0.205]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial color={0x16202f} />
          </mesh>
          <mesh position={[0, -0.23, -0.01]}>
            <boxGeometry args={[0.2, 0.16, 0.18]} />
            <meshStandardMaterial color={palette.hoodie} />
          </mesh>
        </group>

        <group ref={leftArm} position={[-0.42, 0.28, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.52, 0.15]} />
            <meshStandardMaterial color={palette.hoodie} />
          </mesh>
        </group>

        <group ref={rightArm} position={[0.42, 0.28, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.52, 0.15]} />
            <meshStandardMaterial color={palette.hoodie} />
          </mesh>
        </group>
      </group>

      <group position={[-1.05, 0.55, 0.7]}>
        <mesh position={[0, -0.38, -0.12]} castShadow receiveShadow>
          <boxGeometry args={[0.48, 0.3, 0.36]} />
          <meshStandardMaterial color={palette.trousers} />
        </mesh>
        <mesh position={[-0.13, -0.68, -0.08]} castShadow receiveShadow>
          <boxGeometry args={[0.18, 0.52, 0.22]} />
          <meshStandardMaterial color={palette.trousers} />
        </mesh>
        <mesh position={[0.13, -0.68, -0.08]} castShadow receiveShadow>
          <boxGeometry args={[0.18, 0.52, 0.22]} />
          <meshStandardMaterial color={palette.trousers} />
        </mesh>
        <mesh position={[-0.13, -0.94, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.12, 0.34]} />
          <meshStandardMaterial color={palette.shoe} />
        </mesh>
        <mesh position={[0.13, -0.94, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.12, 0.34]} />
          <meshStandardMaterial color={palette.shoe} />
        </mesh>
      </group>

      <group position={[-1.05, 0, 0.42]}>
        <mesh position={[0, 0.02, -0.5]} castShadow receiveShadow>
          <boxGeometry args={[0.64, 0.1, 0.52]} />
          <meshStandardMaterial color={palette.stool} />
        </mesh>
        <mesh position={[0, 0.3, -0.76]} castShadow receiveShadow>
          <boxGeometry args={[0.58, 0.52, 0.1]} />
          <meshStandardMaterial color={palette.stool} />
        </mesh>
        <mesh position={[0, -0.22, -0.5]} castShadow receiveShadow>
          <cylinderGeometry args={[0.045, 0.06, 0.42, 12]} />
          <meshStandardMaterial color={palette.metal} />
        </mesh>
      </group>

      {/* Keyboard keys */}
      {keyLayout.map(({ x, z, k: keyId }) => (
        <mesh
          key={keyId}
          ref={setKeyRef(keyId)}
          position={[x, 0.15, z]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.068, 0.016, 0.068]} />
          <meshStandardMaterial color={0x16202f} />
        </mesh>
      ))}

      {/* Flying confetti particles; launch objects remain intentionally absent. */}
      {PARTICLE_SEEDS.map((seed, index) => (
        <mesh
          key={index}
          ref={setParticleRef(index)}
          position={seed.left ? [-1.38, 0.58, 1.0] : [1.42, 0.58, 1.0]}
          visible={false}
          geometry={new THREE.IcosahedronGeometry(seed.size, 2)}
          material={materials.confetti[seed.color]}
        />
      ))}
    </group>
  );
}

export function HeroScene({ isDark }: { isDark: boolean }) {
  const [phase, setPhase] = useState<StoryPhase>("frontend");

  return (
    <div
      role="img"
      aria-label={`Engineer workflow: ${STAGE_META[phase].pill}`}
      className="h-full w-full"
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0.3, 1.2, 6.4], fov: 34, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.autoClear = true;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        style={{ background: "transparent" }}
      >
        <CameraController />
        <DeveloperRig isDark={isDark} onPhaseChange={setPhase} />
      </Canvas>
    </div>
  );
}
