"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Brain, Code2, Database, Palette } from "lucide-react";
import Image from "next/image";
import { FaJava } from "react-icons/fa";
import type { IconType } from "react-icons";
import {
  SiAlibabacloud,
  SiBitbucket,
  SiCss,
  SiDjango,
  SiDiscord,
  SiEthereum,
  SiEslint,
  SiExpress,
  SiFirebase,
  SiFigma,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGooglegemini,
  SiHuggingface,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiKotlin,
  SiLangchain,
  SiLaravel,
  SiMistralai,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiOllama,
  SiOpenapiinitiative,
  SiPhp,
  SiPostgresql,
  SiPrettier,
  SiPycharm,
  SiPython,
  SiPytorch,
  SiReact,
  SiRedis,
  SiSass,
  SiSharp,
  SiStyledcomponents,
  SiTailwindcss,
  SiTensorflow,
  SiTrello,
  SiTypescript,
  SiUnity,
  SiVite,
  SiVscodium,
  SiVuedotjs,
  SiWebpack,
} from "react-icons/si";

const highlights = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Building intelligent systems with machine learning, computer vision, and deep learning frameworks.",
  },
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Creating responsive, accessible, and pixel-perfect user interfaces with modern frameworks.",
  },
  {
    icon: Database,
    title: "Backend Architecture",
    description:
      "Designing robust APIs and database systems for high-performance applications.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Crafting intuitive, accessible, and visually stunning user interfaces.",
  },
];

type TechStackItem = {
  name: string;
  icon?: IconType;
  imageSrc?: string;
  iconClassName: string;
};

type TechCategory = {
  id: string;
  title: string;
  skills: TechStackItem[];
};

const techCategories: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      {
        name: "JavaScript",
        icon: SiJavascript,
        iconClassName: "text-[#F7DF1E]",
      },
      { name: "HTML", icon: SiHtml5, iconClassName: "text-[#E34F26]" },
      { name: "CSS", icon: SiCss, iconClassName: "text-[#1572B6]" },
      {
        name: "TypeScript",
        icon: SiTypescript,
        iconClassName: "text-[#3178C6]",
      },
      { name: "React", icon: SiReact, iconClassName: "text-[#61DAFB]" },
      { name: "Next.js", icon: SiNextdotjs, iconClassName: "text-foreground" },
      { name: "Flutter", icon: SiFlutter, iconClassName: "text-[#02569B]" },
      { name: "Vue.js", icon: SiVuedotjs, iconClassName: "text-[#42B883]" },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        iconClassName: "text-[#06B6D4]",
      },
      { name: "SCSS", icon: SiSass, iconClassName: "text-[#CC6699]" },
      {
        name: "Styled Components",
        icon: SiStyledcomponents,
        iconClassName: "text-[#DB7093]",
      },
      { name: "Vite", icon: SiVite, iconClassName: "text-[#646CFF]" },
      { name: "Webpack", icon: SiWebpack, iconClassName: "text-[#8DD6F9]" },
      { name: "Java Swing", icon: FaJava, iconClassName: "text-[#EA2D2E]" },
      { name: "ESLint", icon: SiEslint, iconClassName: "text-[#4B32C3]" },
      { name: "Prettier", icon: SiPrettier, iconClassName: "text-[#F7B93E]" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, iconClassName: "text-[#339933]" },
      { name: "Python", icon: SiPython, iconClassName: "text-[#3776AB]" },
      { name: "Java", icon: FaJava, iconClassName: "text-[#EA2D2E]" },
      { name: "Kotlin", icon: SiKotlin, iconClassName: "text-[#7F52FF]" },
      { name: "C#", icon: SiSharp, iconClassName: "text-[#99CC00]" },
      { name: "PHP", icon: SiPhp, iconClassName: "text-[#777BB4]" },
      { name: "Express.js", icon: SiExpress, iconClassName: "text-foreground" },
      { name: "NestJS", icon: SiNestjs, iconClassName: "text-[#E0234E]" },
      { name: "Django", icon: SiDjango, iconClassName: "text-[#092E20]" },
      { name: "Laravel", icon: SiLaravel, iconClassName: "text-[#FF2D20]" },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        iconClassName: "text-[#4169E1]",
      },
      { name: "MySQL", icon: SiMysql, iconClassName: "text-[#4479A1]" },
      { name: "MongoDB", icon: SiMongodb, iconClassName: "text-[#47A248]" },
      { name: "Redis", icon: SiRedis, iconClassName: "text-[#DC382D]" },
      {
        name: "REST",
        icon: SiOpenapiinitiative,
        iconClassName: "text-[#6BA539]",
      },
    ],
  },
  {
    id: "ai",
    title: "AI & ML",
    skills: [
      {
        name: "TensorFlow",
        icon: SiTensorflow,
        iconClassName: "text-[#FF6F00]",
      },
      { name: "PyTorch", icon: SiPytorch, iconClassName: "text-[#EE4C2C]" },
      { name: "LangChain", icon: SiLangchain, iconClassName: "text-[#1C3C3C]" },
      { name: "Mistral", icon: SiMistralai, iconClassName: "text-[#FF7000]" },
      {
        name: "Hugging Face",
        icon: SiHuggingface,
        iconClassName: "text-[#FFD21E]",
      },
      { name: "Qwen", icon: SiAlibabacloud, iconClassName: "text-[#FF6A00]" },
      { name: "Gemma", icon: SiGooglegemini, iconClassName: "text-[#4285F4]" },
      { name: "Ollama", icon: SiOllama, iconClassName: "text-foreground" },
      { name: "DeepSeek", imageSrc: "/deepseek.svg", iconClassName: "" },
    ],
  },
  {
    id: "devtools",
    title: "Dev Tools",
    skills: [
      { name: "Unity", icon: SiUnity, iconClassName: "text-foreground" },
      { name: "Firebase", icon: SiFirebase, iconClassName: "text-[#FFCA28]" },
      { name: "Git", icon: SiGit, iconClassName: "text-[#F05032]" },
      { name: "GitHub", icon: SiGithub, iconClassName: "text-foreground" },
      { name: "GitLab", icon: SiGitlab, iconClassName: "text-[#FC6D26]" },
      { name: "Bitbucket", icon: SiBitbucket, iconClassName: "text-[#0052CC]" },
      { name: "VS Code", icon: SiVscodium, iconClassName: "text-[#007ACC]" },
      {
        name: "JetBrains IntelliJ",
        icon: SiIntellijidea,
        iconClassName: "text-[#FE315D]",
      },
      { name: "PyCharm", icon: SiPycharm, iconClassName: "text-[#21D789]" },
      { name: "Discord", icon: SiDiscord, iconClassName: "text-[#5865F2]" },
      { name: "Ganache", icon: SiEthereum, iconClassName: "text-[#627EEA]" },
      { name: "Trello", icon: SiTrello, iconClassName: "text-[#0079BF]" },
      { name: "Notion", icon: SiNotion, iconClassName: "text-foreground" },
      { name: "Figma", icon: SiFigma, iconClassName: "text-[#F24E1E]" },
    ],
  },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("frontend");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const accentY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [130, -130],
  );
  const accentYReverse = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-95, 95],
  );
  const accentX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-20, 20],
  );
  const aboutParallaxY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      shouldReduceMotion ? [0, 0] : [84, 0],
    ),
    {
      stiffness: 120,
      damping: 24,
      mass: 0.45,
    },
  );
  const aboutParallaxOpacity = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.25, 0.5],
      shouldReduceMotion ? [1, 1, 1] : [0.5, 0.75, 1],
    ),
    {
      stiffness: 120,
      damping: 24,
      mass: 0.45,
    },
  );
  const currentSkills =
    techCategories.find((category) => category.id === activeCategory)?.skills ||
    [];

  return (
    <section
      id="about"
      ref={ref}
      style={{ position: "relative" }}
      className="pt-32 pb-[28vh] overflow-x-clip"
    >
      {/* Background Accent */}
      <motion.div
        style={{ y: accentY, x: accentX }}
        className="pointer-events-none absolute -top-12 -right-28 w-80 h-80 rounded-full bg-primary/20 blur-[110px]"
      />
      <motion.div
        style={{ y: accentYReverse }}
        className="pointer-events-none absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-primary/14 blur-[100px]"
      />

      <motion.div
        style={{ y: aboutParallaxY, opacity: aboutParallaxOpacity }}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-mono tracking-wider uppercase mb-4 block">
                About Me
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-balance">
                Building practical{" "}
                <span className="text-primary">AI + web solutions</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6 text-muted-foreground leading-relaxed"
            >
              <p>
                I build accessible, high-performance digital products at the
                intersection of{" "}
                <span className="text-foreground font-medium">
                  AI technology
                </span>{" "}
                and{" "}
                <span className="text-foreground font-medium">
                  web development
                </span>
                , with a strong focus on usability, speed, and clean execution.
              </p>
              <p>
                I design modern frontends, build reliable backend APIs, and
                develop practical ML workflows, from model integration to
                deployment-ready pipelines for real-world use cases.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              {[
                { value: "3+", label: "Years Coding" },
                { value: "10+", label: "Projects Built" },
                { value: "96%", label: "AI Model Accuracy" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-3xl font-bold text-primary block"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Highlights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 relative z-30"
        >
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl font-bold">Tech Stack</h3>
                <div className="flex-1 h-px bg-border" />
              </div>

              <p className="text-sm text-muted-foreground mb-8">
                Tools and technologies I use to ship reliable, high-quality
                products.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {techCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>

              <div className="min-h-[330px] relative z-30 pointer-events-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
                  >
                    {currentSkills.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.35, delay: index * 0.03 }}
                        whileHover={
                          shouldReduceMotion ? undefined : { y: -6, scale: 1.03 }
                        }
                        className="group rounded-2xl border border-border/80 bg-card/80 p-4 min-h-[124px] flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-primary/45 hover:bg-gradient-to-br hover:from-card hover:to-primary/5 hover:shadow-[0_26px_50px_-24px_oklch(0.75_0.15_180)]"
                      >
                        <div className="w-12 h-12 rounded-xl border border-border/70 bg-background/60 flex items-center justify-center mb-3 transition-all duration-300 group-hover:border-primary/45 group-hover:bg-primary/10 group-hover:shadow-[0_0_0_6px_oklch(0.75_0.15_180_/_0.08)]">
                          {tech.icon ? (
                            <tech.icon
                              className={`w-7 h-7 ${tech.iconClassName} transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5`}
                            />
                          ) : tech.imageSrc ? (
                            <Image
                              src={tech.imageSrc}
                              alt={`${tech.name} icon`}
                              width={28}
                              height={28}
                              className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
                            />
                          ) : (
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                              {tech.name.slice(0, 3)}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] sm:text-xs uppercase tracking-[0.08em] font-semibold text-foreground/90 leading-tight transition-colors duration-300 group-hover:text-primary">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
