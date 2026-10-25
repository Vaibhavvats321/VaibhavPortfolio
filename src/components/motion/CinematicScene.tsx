"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type CinematicSceneProps = {
  className?: string;
};

function makeStars(count: number, radius: number, size: number, color: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color,
    size,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
    depthWrite: false,
  });
  return new THREE.Points(geometry, material);
}

export function CinematicScene({ className }: CinematicSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    if (!renderer) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030612, 0.035);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.2, 7.5);

    const ambient = new THREE.AmbientLight(0x93c5fd, 0.35);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(6, 4, 5);
    scene.add(key);

    const rim = new THREE.PointLight(0x7dd3fc, 2.4, 30);
    rim.position.set(-4, 1.5, 2);
    scene.add(rim);

    const back = new THREE.PointLight(0x818cf8, 1.1, 28);
    back.position.set(0, -2, -6);
    scene.add(back);

    const root = new THREE.Group();
    scene.add(root);

    const starLayers = [
      makeStars(1400, 26, 0.035, 0xffffff),
      makeStars(900, 20, 0.05, 0x7dd3fc),
      makeStars(500, 14, 0.07, 0xc4b5fd),
    ];
    starLayers.forEach((layer, index) => {
      layer.position.z = -index * 4;
      root.add(layer);
    });

    const planetGeometry = new THREE.SphereGeometry(1.9, 64, 64);
    const planetMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.35,
      roughness: 0.55,
      metalness: 0.2,
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(2.4, -0.3, -1.2);
    root.add(planet);

    const atmosphereGeometry = new THREE.SphereGeometry(2.25, 48, 48);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.position.copy(planet.position);
    root.add(atmosphere);

    const ringGeometry = new THREE.TorusGeometry(3.1, 0.018, 12, 128);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.45,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.copy(planet.position);
    ring.rotation.set(1.15, 0.35, 0.2);
    root.add(ring);

    const pointer = { x: 0, y: 0 };
    const scroll = { value: 0 };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scroll.value = window.scrollY / max;
    };

    const onResize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        renderer.setAnimationLoop(null);
      } else if (!reducedMotion) {
        renderer.setAnimationLoop(frame);
      }
    };

    const clock = new THREE.Clock();

    const frame = () => {
      const elapsed = clock.getElapsedTime();
      const targetX = pointer.x * 0.4;
      const targetY = pointer.y * 0.25;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (0.2 - targetY - camera.position.y) * 0.04;
      camera.position.z = 7.5 - scroll.value * 2.2;
      camera.lookAt(0, 0, -scroll.value * 1.4);

      root.rotation.y = elapsed * 0.03 + pointer.x * 0.08;
      planet.rotation.y = elapsed * 0.12;
      atmosphere.scale.setScalar(1 + Math.sin(elapsed * 1.2) * 0.02);
      ring.rotation.z = elapsed * 0.18;
      rim.position.x = -4 + Math.sin(elapsed * 0.5) * 0.6;

      renderer.render(scene, camera);
    };

    onResize();
    onScroll();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (reducedMotion) {
      camera.position.z = 7.5;
      renderer.render(scene, camera);
    } else {
      renderer.setAnimationLoop(frame);
    }

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      planetGeometry.dispose();
      planetMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      starLayers.forEach((layer) => {
        layer.geometry.dispose();
        (layer.material as THREE.Material).dispose();
      });
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
