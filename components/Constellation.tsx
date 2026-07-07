"use client";
import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Constellation() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cnv = ref.current;
    if (!cnv) return;
    const ctx = cnv.getContext("2d");
    if (!ctx) return;
    let W = 0, H = 0, pts: Point[] = [], raf = 0;
    const COLOR = "199,41,94";
    function sz() {
      W = cnv!.width = window.innerWidth;
      H = cnv!.height = window.innerHeight;
      const n = Math.min(80, Math.floor((W * H) / 18000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      }));
    }
    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 128) {
            ctx!.globalAlpha = (1 - d / 128) * 0.5;
            ctx!.strokeStyle = `rgb(${COLOR})`; ctx!.lineWidth = 0.6;
            ctx!.beginPath(); ctx!.moveTo(pts[i].x, pts[i].y); ctx!.lineTo(pts[j].x, pts[j].y); ctx!.stroke();
          }
        }
      }
      ctx!.globalAlpha = 0.7; ctx!.fillStyle = `rgb(${COLOR})`;
      for (const p of pts) { ctx!.beginPath(); ctx!.arc(p.x, p.y, 1.5, 0, 7); ctx!.fill(); }
      raf = requestAnimationFrame(draw);
    }
    sz(); draw();
    window.addEventListener("resize", sz);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", sz); };
  }, []);
  return <canvas id="constellation" ref={ref} />;
}
