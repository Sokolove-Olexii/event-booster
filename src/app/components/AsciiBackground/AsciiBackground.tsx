"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./AsciiBackground.module.scss";
import {
  CITIES,
  GENRES,
  EVENT_WORDS,
  MUSIC_SYMBOLS,
} from "@/data/asciiData/asciiData";

interface Column {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  items: string[];
  fontSize: number;
  layer: number;
}

export default function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const columnsRef = useRef<Column[]>([]);
  const timeRef = useRef(0);

  const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const generateColumnContent = useCallback((): string[] => {
    const items: string[] = [];
    const count = 15 + Math.floor(Math.random() * 20);
    for (let i = 0; i < count; i++) {
      const roll = Math.random();
      if (roll < 0.3) items.push(pick(MUSIC_SYMBOLS));
      else if (roll < 0.55) items.push(pick(CITIES));
      else if (roll < 0.75) items.push(pick(GENRES));
      else items.push(pick(EVENT_WORDS));
    }
    return items;
  }, []);

  const initColumns = useCallback(
    (w: number, h: number) => {
      const cols: Column[] = [];
      const layers = [
        {
          count: 12,
          opRange: [0.04, 0.08],
          sizeRange: [10, 12],
          speedRange: [0.15, 0.3],
        },
        {
          count: 10,
          opRange: [0.08, 0.15],
          sizeRange: [12, 14],
          speedRange: [0.3, 0.55],
        },
        {
          count: 6,
          opRange: [0.14, 0.25],
          sizeRange: [14, 17],
          speedRange: [0.5, 0.9],
        },
      ];

      layers.forEach((layer, li) => {
        for (let i = 0; i < layer.count; i++) {
          cols.push({
            x: Math.random() * w,
            y: Math.random() * -h * 2,
            speed:
              layer.speedRange[0] +
              Math.random() * (layer.speedRange[1] - layer.speedRange[0]),
            opacity:
              layer.opRange[0] +
              Math.random() * (layer.opRange[1] - layer.opRange[0]),
            items: generateColumnContent(),
            fontSize:
              layer.sizeRange[0] +
              Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]),
            layer: li,
          });
        }
      });

      columnsRef.current = cols;
    },
    [generateColumnContent],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const symbolCanvases = new Map<
      string,
      HTMLCanvasElement | OffscreenCanvas
    >();
    const PRE_RENDER_SIZE = 32;

    MUSIC_SYMBOLS.forEach((symbol) => {
      const pad = 16;
      const size = PRE_RENDER_SIZE + pad * 2;

      let c: HTMLCanvasElement | OffscreenCanvas;
      if (typeof OffscreenCanvas !== "undefined") {
        c = new OffscreenCanvas(size, size);
      } else {
        c = document.createElement("canvas");
        c.width = size;
        c.height = size;
      }

      const ctx2 = c.getContext("2d") as
        | CanvasRenderingContext2D
        | OffscreenCanvasRenderingContext2D
        | null;
      if (ctx2) {
        ctx2.font = `${PRE_RENDER_SIZE}px "Courier New", monospace`;
        ctx2.textAlign = "center";
        ctx2.textBaseline = "middle";
        ctx2.fillStyle = "#ffffff";
        ctx2.shadowColor = "rgba(255,255,255,0.85)";
        ctx2.shadowBlur = 10;
        ctx2.fillText(symbol, size / 2, size / 2);
      }
      symbolCanvases.set(symbol, c);
    });

    let W: number, H: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initColumns(W, H);
    };

    const drawColumn = (col: Column) => {
      ctx.save();
      ctx.font = `${col.fontSize}px "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let yOff = 0;
      for (const item of col.items) {
        const iy = col.y + yOff;
        if (iy > -30 && iy < H + 30) {
          const isSymbol = MUSIC_SYMBOLS.includes(item);
          const alpha = isSymbol ? col.opacity * 1.6 : col.opacity;

          if (isSymbol) {
            const c = symbolCanvases.get(item);
            if (c) {
              const scale = col.fontSize / PRE_RENDER_SIZE;
              const dw = c.width * scale;
              const dh = c.height * scale;
              ctx.globalAlpha = Math.min(alpha, 0.35);
              ctx.drawImage(
                c as CanvasImageSource,
                col.x - dw / 2,
                iy - dh / 2,
                dw,
                dh,
              );
              ctx.globalAlpha = 1.0;
            }
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(alpha, 0.35)})`;
            ctx.fillText(item, col.x, iy);
          }
        }
        yOff += col.fontSize * 2.2;
      }
      ctx.restore();
    };

    const draw = () => {
      timeRef.current += 0.016;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      const vgrad = ctx.createRadialGradient(
        W / 2,
        H / 2,
        H * 0.2,
        W / 2,
        H / 2,
        H * 0.9,
      );
      vgrad.addColorStop(0, "rgba(255,255,255,0.015)");
      vgrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = vgrad;
      ctx.fillRect(0, 0, W, H);

      for (let layer = 0; layer < 3; layer++) {
        for (const col of columnsRef.current) {
          if (col.layer === layer) drawColumn(col);
        }
      }

      for (const col of columnsRef.current) {
        col.y += col.speed;
        const totalH = col.items.length * col.fontSize * 2.2;
        if (col.y > H + 30) {
          col.y = -totalH - Math.random() * H * 0.5;
          col.x = Math.random() * W;
          col.items = generateColumnContent();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    animRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initColumns, generateColumnContent]);

  return <canvas ref={canvasRef} className={styles.asciiCanvas} />;
}
