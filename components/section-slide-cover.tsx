"use client";

import { motion, useSpring, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type SectionSlideCoverProps = {
  children: ReactNode;
  zIndexClassName?: string;
  overlapClassName?: string;
  variant?: "default" | "footerSafe";
  panelClassName?: string;
  settleEarly?: boolean;
};

export function SectionSlideCover({
  children,
  zIndexClassName = "z-10",
  overlapClassName = "-mt-[38vh]",
  variant = "default",
  panelClassName = "",
  settleEarly = false,
}: SectionSlideCoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isFooterSafe = variant === "footerSafe";
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isFooterSafe
      ? ["start 98%", "start 16%"]
      : ["start 100%", "start -16%"],
  });

  const pullStartDelay = isFooterSafe ? 0.08 : 0.14;
  const delayedProgress = useTransform(
    scrollYProgress,
    [0, pullStartDelay, 1],
    [0, 0, 1],
  );

  const panelPullProgress = useSpring(delayedProgress, {
    stiffness: 140,
    damping: 36,
    mass: 0.62,
  });
  const effectivePullProgress = useTransform(
    panelPullProgress,
    [0, settleEarly ? 0.62 : isFooterSafe ? 0.74 : 0.9],
    [0, 1],
  );
  const panelPullY = useTransform(
    effectivePullProgress,
    [0, 0.84, 1],
    isFooterSafe ? [180, 44, 0] : [280, 62, 0],
  );
  const panelPullShadow = useTransform(
    effectivePullProgress,
    [0, 1],
    isFooterSafe
      ? [
          "0 0 0 0 oklch(0.11 0.01 250 / 0)",
          "0 0 0 0 oklch(0.11 0.01 250 / 0)",
        ]
      : [
          "0 -24px 44px -40px oklch(0.11 0.01 250 / 0.2)",
          "0 -6px 14px -14px oklch(0.11 0.01 250 / 0)",
        ],
  );

  return (
    <div
      ref={ref}
      className={`relative ${overlapClassName} ${zIndexClassName}`}
    >
      <motion.div
        style={{
          y: panelPullY,
          boxShadow: panelPullShadow,
        }}
        className={`relative overflow-x-clip bg-background before:pointer-events-none before:absolute before:inset-x-0 before:-top-2 before:z-[1] before:h-3 before:bg-background before:content-[''] ${panelClassName}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
