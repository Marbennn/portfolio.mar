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
  overlapClassName = "-mt-[50vh]",
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
      : ["start 100%", "start -24%"],
  });

  const pullStartDelay = isFooterSafe ? 0.1 : 0.18;
  const delayedProgress = useTransform(
    scrollYProgress,
    [0, pullStartDelay, 1],
    [0, 0, 1],
  );

  const panelPullProgress = useSpring(delayedProgress, {
    stiffness: 170,
    damping: 32,
    mass: 0.56,
  });
  const effectivePullProgress = useTransform(
    panelPullProgress,
    [0, settleEarly ? 0.68 : isFooterSafe ? 0.72 : 0.82],
    [0, 1],
  );
  const panelPullY = useTransform(
    effectivePullProgress,
    [0, 0.78, 1],
    isFooterSafe ? [220, 52, 0] : [420, 96, 0],
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
          "0 -42px 74px -56px oklch(0.11 0.01 250 / 0.34)",
          "0 -10px 20px -18px oklch(0.11 0.01 250 / 0)",
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
