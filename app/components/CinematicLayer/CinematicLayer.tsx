"use client";

import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import styles from "./CinematicLayer.module.css";

const PARTICLE_COUNT = 180;

export default function CinematicLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    particles: THREE.Points;
    animationId: number;
    mouse: { x: number; y: number };
  } | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sceneRef.current) return;
    sceneRef.current.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    sceneRef.current.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 50;

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const warmOrange = new THREE.Color(0xff6b35);
    const coolBlue = new THREE.Color(0x4a9eff);
    const warmWhite = new THREE.Color(0xfff5eb);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 120;
      positions[i3 + 1] = (Math.random() - 0.5) * 80;
      positions[i3 + 2] = (Math.random() - 0.5) * 60;

      sizes[i] = Math.random() * 3 + 1;
      speeds[i] = Math.random() * 0.3 + 0.1;
      phases[i] = Math.random() * Math.PI * 2;

      const colorChoice = Math.random();
      let color: THREE.Color;
      if (colorChoice < 0.5) {
        color = warmOrange.clone().lerp(warmWhite, Math.random() * 0.4);
      } else if (colorChoice < 0.75) {
        color = warmOrange.clone().lerp(coolBlue, Math.random() * 0.3);
      } else {
        color = warmWhite.clone();
      }
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const vertexShader = `
      attribute float aSize;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float dist = length(mvPosition.xyz);
        vAlpha = smoothstep(80.0, 20.0, dist) * 0.6;
        gl_PointSize = aSize * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;

        float alpha = smoothstep(0.5, 0.0, dist);
        alpha = pow(alpha, 1.5) * vAlpha;

        vec3 glow = vColor * 1.5;
        vec3 finalColor = mix(vColor, glow, alpha);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    sceneRef.current = {
      renderer,
      scene,
      camera,
      particles,
      animationId: 0,
      mouse: { x: 0, y: 0 },
    };

    const clock = new THREE.Clock();

    const animate = () => {
      sceneRef.current!.animationId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        array[i3 + 1] += Math.sin(elapsed * speeds[i] + phases[i]) * 0.008;
        array[i3] += Math.cos(elapsed * speeds[i] * 0.5 + phases[i]) * 0.004;
        array[i3 + 2] += Math.sin(elapsed * speeds[i] * 0.3 + phases[i] * 2) * 0.003;
      }
      posAttr.needsUpdate = true;

      const targetX = sceneRef.current!.mouse.x * 3;
      const targetY = sceneRef.current!.mouse.y * 2;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (targetY - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(sceneRef.current!.animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sceneRef.current = null;
    };
  }, [handleMouseMove]);

  return <div ref={containerRef} className={styles.container} />;
}
