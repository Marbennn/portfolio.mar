"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const OFFSCREEN_POSITION = -1000;

export function CursorEffect() {
  const shouldReduceMotion = useReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);
  const x = useSpring(OFFSCREEN_POSITION, {
    stiffness: 300,
    damping: 30,
    mass: 0.2,
  });
  const y = useSpring(OFFSCREEN_POSITION, {
    stiffness: 300,
    damping: 30,
    mass: 0.2,
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsEnabled(false);
      x.set(OFFSCREEN_POSITION);
      y.set(OFFSCREEN_POSITION);
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updateEnabled = () => setIsEnabled(mediaQuery.matches);

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const handleLeave = () => {
      x.set(OFFSCREEN_POSITION);
      y.set(OFFSCREEN_POSITION);
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    if (mediaQuery.matches) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y, shouldReduceMotion]);

  if (!isEnabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl md:block"
      style={{ x, y }}
    />
  );
}
