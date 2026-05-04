"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Briefcase, Download, GraduationCap, Users } from "lucide-react";

const experiences = [
  {
    period: "2025 - Present",
    title: "AI Specialist & Data Specialist",
    company: "TahananSafe AI Ledger",
    description:
      "Built an AI-driven incident classification system to analyze reports and categorize violence cases. Improved model consistency by implementing validation mechanisms that reduced misclassification cases. Integrated AI with backend systems enabling real-time analysis and automated workflows.",
    technologies: ["React", "Python", "MongoDB"],
    type: "work",
  },
  {
    period: "2025",
    title: "AI Specialist & Backend Developer",
    company: "Calm-Mind Analytics",
    description:
      "Designed and implemented scalable backend systems using Python, enabling efficient API development and data processing for AI-driven applications. Built and integrated AI models with data pipelines supporting real-time analysis for multi-user workflows.",
    technologies: ["React", "Python", "Ollama", "MongoDB", "REST API"],
    type: "work",
  },
  {
    period: "2025",
    title: "Backend Developer",
    company: "Likha AI",
    description:
      "Led backend development using Node.js (NestJS) for real-time image classification of indigenous textile patterns. Built AI-powered image processing pipelines with Python and TensorFlow, achieving up to 96% model accuracy. Designed scalable APIs and database architecture, reducing latency by 65%.",
    technologies: [
      "TypeScript",
      "NestJS",
      "Python",
      "TensorFlow",
      "PostgreSQL",
      "Redis",
    ],
    type: "work",
  },
  {
    period: "2024 - 2025",
    title: "Frontend & Backend Developer",
    company: "J-Mab E-commerce",
    description:
      "Developed a full-stack e-commerce application for automotive products with user authentication, product management, and shopping cart functionality. Built responsive UI and integrated payment systems.",
    technologies: ["HTML", "CSS", "JavaScript", "Kotlin", "PHP", "MySQL"],
    type: "work",
  },
];

const leadership = {
  period: "2025 - 2026",
  title: "President",
  organization: "Data Science Society",
  description:
    "Led a student organization focused on data science and AI initiatives. Organized events and collaborative projects for members. Managed team coordination and activity planning to foster learning and growth.",
};

const education = {
  period: "2022 - Present",
  degree: "Bachelor of Science in Information Technology",
  institution: "PHINMA University of Pangasinan",
  description:
    "Focusing on software development, AI/ML, and web technologies. Active participant in hackathons and tech competitions.",
};

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [140, -140],
  );
  const glowYReverse = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-105, 105],
  );
  const glowX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [36, -36],
  );

  return (
    <section
      id="experience"
      ref={ref}
      style={{ position: "relative" }}
      className="pt-32 pb-[16vh] overflow-x-clip"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <motion.div
        style={{ y: glowY, x: glowX }}
        className="pointer-events-none absolute top-12 -right-24 w-[22rem] h-[22rem] rounded-full bg-primary/20 blur-[125px]"
      />
      <motion.div
        style={{ y: glowYReverse }}
        className="pointer-events-none absolute bottom-10 -left-28 w-80 h-80 rounded-full bg-primary/14 blur-[120px]"
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary text-sm font-mono tracking-wider uppercase mb-4 block">
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            My journey so far
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title + exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative grid md:grid-cols-2 gap-8 mb-12 ${
                index % 2 === 0 ? "" : "md:direction-rtl"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 -translate-x-1/2 mt-6 z-10 border-4 border-background" />

              {/* Content */}
              <div
                className={`pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}
              >
                <div className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2 justify-start md:justify-end">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground font-mono">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-1">
                    {exp.title}
                  </h3>
                  <span className="text-primary text-sm font-medium block mb-3">
                    {exp.company}
                  </span>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div
                    className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}
                  >
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leadership & Education Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-8 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono block">
                  {leadership.period}
                </span>
                <h3 className="text-lg font-semibold">Leadership</h3>
              </div>
            </div>
            <h4 className="text-primary font-medium mb-2">
              {leadership.title} - {leadership.organization}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {leadership.description}
            </p>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="p-8 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-mono block">
                  {education.period}
                </span>
                <h3 className="text-lg font-semibold">Education</h3>
              </div>
            </div>
            <h4 className="text-primary font-medium mb-2">
              {education.degree}
            </h4>
            <span className="text-sm text-foreground block mb-2">
              {education.institution}
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {education.description}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="/Marvin-Recepcion-Resume.pdf"
            download
            className="group inline-flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_18px_45px_-24px_oklch(0.75_0.15_180)]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary transition-colors group-hover:bg-primary-foreground/15 group-hover:text-primary-foreground">
              <Download className="h-4 w-4" />
            </span>
            <span>Download Resume</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
