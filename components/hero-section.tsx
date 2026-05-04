"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const roles = ["AI Specialist", "Frontend Developer", "Backend Developer"];

function TypewriterText() {
  const shouldReduceMotion = useReducedMotion();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <span className="text-foreground font-medium">{roles[0]}</span>;
  }

  return (
    <span className="text-foreground font-medium">
      {displayText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 200],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    shouldReduceMotion ? [1, 1] : [1, 0],
  );
  const gridY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -180],
  );
  const orbNearY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -230],
  );
  const orbFarY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -130],
  );
  const orbNearScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.35],
  );
  const orbFarScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.2],
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{ position: "relative" }}
      className="min-h-screen flex items-center justify-center overflow-x-hidden"
    >
      {/* Animated Background Grid */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30"
      />

      {/* Floating Orbs */}
      <motion.div
        style={{ y: orbNearY, scale: orbNearScale }}
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/20 blur-[100px]"
        animate={shouldReduceMotion ? undefined : { x: [0, 50, 0] }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />
      <motion.div
        style={{ y: orbFarY, scale: orbFarScale }}
        className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full bg-primary/14 blur-[130px]"
        animate={shouldReduceMotion ? undefined : { x: [0, -40, 0] }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`${shouldReduceMotion ? "" : "animate-ping "}absolute inline-flex h-full w-full rounded-full bg-primary opacity-75`}
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-sm text-primary">
            Available for opportunities
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
            <span className="text-foreground">Hi, I&apos;m </span>
            <span className="text-primary relative">
              Marvin
              <motion.span
                className="absolute -right-8 -top-4"
                animate={shouldReduceMotion ? undefined : { rotate: [0, 15, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 2, repeat: Infinity }
                }
              >
                <Sparkles className="w-6 h-6 text-primary/60" />
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle with Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light mb-4 max-w-2xl mx-auto h-8"
        >
          <TypewriterText />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
        >
          I specialize in building web applications and AI-powered systems,
          combining clean code with practical solutions to create impactful
          digital products.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium overflow-hidden"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-foreground"
              initial={shouldReduceMotion ? undefined : { x: "-100%" }}
              whileHover={shouldReduceMotion ? undefined : { x: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.3 }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity z-20">
              View My Work
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Animated Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 max-w-md mx-auto"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center text-xs text-muted-foreground mt-4 tracking-widest uppercase"
          >
            Turning ideas into reality
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - fades out as you scroll */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 1.5, repeat: Infinity }
          }
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
}
