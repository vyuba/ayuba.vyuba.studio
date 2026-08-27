"use client";

import { useEffect } from "react";

export default function LenisScrollInit({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let lenisInstance: import("lenis").default | null = null;
    let rafId: number | null = null;
    let isDestroyed = false;

    import("lenis").then(({ default: Lenis }) => {
      if (isDestroyed) return;

      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });

      function raf(time: number) {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      isDestroyed = true;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      lenisInstance?.destroy();
    };
  }, []);

  return children;
}
