"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Sparkles,
  X,
} from "lucide-react";

type ScreenshotPlatform = "Web" | "Mobile" | "Desktop";

type ProjectScreenshot = {
  src: string;
  title: string;
  platform: ScreenshotPlatform;
  caption: string;
};

type Project = {
  title: string;
  description: string;
  overview: string;
  highlights: string[];
  technologies: string[];
  year: string;
  featured: boolean;
  category: "AI" | "Web" | "Game" | "Desktop";
  role: string;
  previewSrc?: string;
  previewMode?: "cover" | "contain";
  screenshots: ProjectScreenshot[];
};

const projects: Project[] = [
  {
    title: "TahananSafe AI",
    description:
      "A privacy-focused incident reporting and risk-analysis system designed to help barangays and local governments address domestic violence using AI-powered classification.",
    overview:
      "TahananSafe is a multi-platform incident management system with mobile intake workflows and web dashboards for barangay and municipal response teams. It combines structured reporting, risk analytics, and real-time status tracking to improve response speed and visibility.",
    highlights: [
      "Built a complete mobile + web reporting flow for community responders.",
      "Applied AI-assisted risk classification to prioritize high-risk incidents.",
      "Designed dashboards for daily status, case visibility, and response tracking.",
    ],
    technologies: ["React", "Python", "MongoDB"],
    year: "2025 - Present",
    featured: true,
    category: "AI",
    role: "AI Specialist & Data Specialist",
    previewSrc: "/projects/tahanansafe/THSafe_Preview.png",
    previewMode: "cover",
    screenshots: [
      {
        src: "/projects/tahanansafe/mobile-create-account.png",
        title: "Mobile Account Registration",
        platform: "Mobile",
        caption:
          "Step-based onboarding flow for account creation and secure access.",
      },
      {
        src: "/projects/tahanansafe/mobile-home.png",
        title: "Mobile Home Dashboard",
        platform: "Mobile",
        caption:
          "Incident summary cards, recent logs, and hotline quick actions.",
      },
      {
        src: "/projects/tahanansafe/web-login.png",
        title: "Web Login Experience",
        platform: "Web",
        caption:
          "Secure portal login designed for responders and municipal admin users.",
      },
      {
        src: "/projects/tahanansafe/web-kagawad-dashboard.png",
        title: "Barangay Dashboard",
        platform: "Web",
        caption:
          "Daily reporting dashboard with risk distribution and response tracking.",
      },
    ],
  },
  {
    title: "Shattered Memories",
    description:
      "An RPG where a hero awakens with no memory. Players explore, fight, and recover memory shards revealing a complex past with moral dilemmas and multiple endings.",
    overview:
      "Narrative-driven RPG project focused on branching decisions, game progression systems, and story-state persistence.",
    highlights: [
      "Designed branching story flow driven by memory-shard progression.",
      "Developed immersive horror environments for mood-driven exploration.",
      "Managed gameplay systems and project direction as project manager.",
    ],
    technologies: ["Unity", "C#", "Ganache"],
    year: "2025 - 2026",
    featured: true,
    category: "Game",
    role: "Project Manager",
    previewSrc: "/projects/shattered-memories/main-menu.jpg",
    screenshots: [
      {
        src: "/projects/shattered-memories/main-menu.jpg",
        title: "Main Menu",
        platform: "Web",
        caption: "Atmospheric game title screen and menu interface.",
      },
      {
        src: "/projects/shattered-memories/scene-interior.jpeg",
        title: "Interior Scene",
        platform: "Web",
        caption: "Exploration inside the mansion hall with ambient lighting.",
      },
      {
        src: "/projects/shattered-memories/scene-forest.jpeg",
        title: "Forest Path",
        platform: "Web",
        caption: "Outdoor environment showcasing mood and world detail.",
      },
      {
        src: "/projects/shattered-memories/scene-mansion.jpeg",
        title: "Mansion Exterior",
        platform: "Web",
        caption: "Key location reveal for narrative-driven exploration.",
      },
    ],
  },
  {
    title: "Calm Mind Analytics",
    description:
      "Web platform that helps identify rising stress in students and offers research-informed recommendations to support better mental health.",
    overview:
      "Analytics platform built to surface risk indicators early and provide practical recommendations for student support teams.",
    highlights: [
      "Focused on early stress-signal detection for student support decisions.",
      "Implemented recommendation flow powered by AI-backed analytics.",
      "Created a clear dashboard experience for monitoring support actions.",
    ],
    technologies: ["React", "Python", "Ollama", "MongoDB"],
    year: "2025",
    featured: true,
    category: "AI",
    role: "AI & Backend Development",
    screenshots: [
      {
        src: "/placeholder.jpg",
        title: "Platform Overview",
        platform: "Web",
        caption: "Dashboard and recommendation workflow preview.",
      },
    ],
  },
  {
    title: "Likha AI",
    description:
      "Scans Philippine tribal textile patterns and identifies their type, preserving cultural heritage through technology. Achieved 96% model accuracy.",
    overview:
      "Image-classification platform for cultural textile pattern recognition, designed for preservation, cataloging, and educational use.",
    highlights: [
      "Preserved cultural heritage through AI textile pattern recognition.",
      "Reached 96% model accuracy on tribal textile classification tasks.",
      "Built cross-platform workflow support for web and mobile usage.",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Django",
      "Flutter",
      "Ollama / Deepseek",
    ],
    year: "2025",
    featured: true,
    category: "AI",
    role: "Backend Development",
    screenshots: [
      {
        src: "/placeholder.jpg",
        title: "Model Output View",
        platform: "Web",
        caption: "Pattern scan and prediction result interface.",
      },
    ],
  },
  {
    title: "Animal Species Classifier",
    description:
      "An AI-powered classifier that scans animals to identify their species and determine whether they are extinct or still existing.",
    overview:
      "Classification app with model-assisted predictions and explainable result summaries for species identification.",
    highlights: [
      "Classifies species and predicts whether they are extinct or existing.",
      "Added explainable summaries to make prediction outputs more useful.",
      "Streamlined upload-to-result flow for faster model interaction.",
    ],
    technologies: ["TypeScript", "Python", "Ollama"],
    year: "2025",
    featured: false,
    category: "AI",
    role: "Frontend Development",
    screenshots: [
      {
        src: "/placeholder.jpg",
        title: "Prediction Flow",
        platform: "Web",
        caption: "Upload, infer, and review species status results.",
      },
    ],
  },
  {
    title: "J-Mab",
    description:
      "An e-commerce app for automotive products, letting users browse, buy, and manage tires, batteries, oils, and more with a seamless shopping experience.",
    overview:
      "Full-stack e-commerce platform with product catalog, ordering flow, and backend inventory/transaction handling.",
    highlights: [
      "Delivered a full automotive storefront with multi-category browsing.",
      "Implemented cart, purchase flow, and order management experiences.",
      "Handled backend inventory and transaction logic for reliability.",
    ],
    technologies: ["HTML", "CSS", "JS", "Kotlin", "PHP", "MySQL"],
    year: "2024 - 2025",
    featured: true,
    category: "Web",
    role: "Frontend & Backend Development",
    screenshots: [
      {
        src: "/placeholder.jpg",
        title: "Storefront",
        platform: "Web",
        caption: "Product browsing and cart interaction interface.",
      },
    ],
  },
  {
    title: "Zomville",
    description:
      "An action-packed zombie game where players use strategy and quick thinking to survive waves of attacks.",
    overview:
      "Survival-action game focused on combat pacing, progression mechanics, and increasing wave difficulty.",
    highlights: [
      "Built wave-based survival loop with increasing zombie pressure.",
      "Balanced combat pacing and progression for longer engagement.",
      "Led fullstack coordination while managing the game project scope.",
    ],
    technologies: ["Unity", "C#", "PHP", "MySQL"],
    year: "2024",
    featured: false,
    category: "Game",
    role: "Fullstack & Project Manager",
    screenshots: [
      {
        src: "/placeholder.jpg",
        title: "Gameplay Snapshot",
        platform: "Desktop",
        caption: "Core gameplay loop and battle UI preview.",
      },
    ],
  },
  {
    title: "Spendwise",
    description:
      "An expense tracker that helps users monitor spending and provides personalized budgeting suggestions with intuitive visualizations.",
    overview:
      "Personal finance desktop application with transaction tracking and budget insight visualizations.",
    highlights: [
      "Created desktop expense tracking with clean transaction workflows.",
      "Added budget guidance features from spending behavior trends.",
      "Visualized category-level insights to improve money decisions.",
    ],
    technologies: ["Java", "Java Swing", "MySQL"],
    year: "2023 - 2024",
    featured: false,
    category: "Desktop",
    role: "Frontend Development",
    screenshots: [
      {
        src: "/placeholder.jpg",
        title: "Budget Dashboard",
        platform: "Web",
        caption: "Expense trends and categorized spend overview.",
      },
    ],
  },
  {
    title: "Upang Registrar System",
    description:
      "A web-based registrar system for PHINMA UPang, enabling students and admins to manage registrations and track orders securely.",
    overview:
      "Registrar workflow platform for managing enrollment records, order tracking, and role-based access.",
    highlights: [
      "Built role-based registrar workflows for students and admins.",
      "Implemented secure request and order tracking across records.",
      "Improved enrollment data visibility through centralized access.",
    ],
    technologies: ["HTML", "CSS", "JS", "Firebase"],
    year: "2023 - 2024",
    featured: false,
    category: "Web",
    role: "Frontend Development",
    screenshots: [
      {
        src: "/placeholder.jpg",
        title: "Registrar Portal",
        platform: "Web",
        caption: "Record management and order tracking interface.",
      },
    ],
  },
];

const categories = ["All", "AI", "Web", "Game", "Desktop"] as const;
type Category = (typeof categories)[number];
type ScreenshotFilter = "All" | ScreenshotPlatform;
const PROJECT_DIALOG_TITLE_ID = "project-dialog-title";
const PROJECT_DIALOG_DESCRIPTION_ID = "project-dialog-description";
const FOCUSABLE_ELEMENT_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENT_SELECTOR),
  ).filter(
    (element) =>
      element.getAttribute("aria-hidden") !== "true" &&
      !element.hasAttribute("hidden") &&
      element.getClientRects().length > 0,
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const closeDialogButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [150, -150],
  );
  const glowYReverse = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-115, 115],
  );
  const glowX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-34, 34],
  );
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<
    string | null
  >(null);
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [shotDirection, setShotDirection] = useState<1 | -1>(1);
  const [activeShotFilter, setActiveShotFilter] =
    useState<ScreenshotFilter>("All");
  const [portalReady, setPortalReady] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const selectedProjectIndex = projects.findIndex(
    (project) => project.title === selectedProjectTitle,
  );
  const selectedProject =
    selectedProjectIndex >= 0 ? projects[selectedProjectIndex] : null;

  const visibleShots = useMemo(() => {
    if (!selectedProject) {
      return [];
    }

    if (activeShotFilter === "All") {
      return selectedProject.screenshots;
    }

    return selectedProject.screenshots.filter(
      (shot) => shot.platform === activeShotFilter,
    );
  }, [activeShotFilter, selectedProject]);
  const activeShot = visibleShots[activeShotIndex] ?? null;
  const resolvedActiveShotSrc = activeShot
    ? failedImages[activeShot.src]
      ? "/placeholder.jpg"
      : activeShot.src
    : null;

  const availableScreenshotFilters = useMemo<ScreenshotFilter[]>(() => {
    if (!selectedProject) {
      return ["All"];
    }

    const filterOrder: ScreenshotPlatform[] = ["Mobile", "Web", "Desktop"];
    const platforms = new Set(
      selectedProject.screenshots.map((shot) => shot.platform),
    );

    return [
      "All",
      ...filterOrder.filter((platform) => platforms.has(platform)),
    ];
  }, [selectedProject]);

  useEffect(() => {
    if (activeShotIndex >= visibleShots.length) {
      setActiveShotIndex(0);
    }
  }, [activeShotIndex, visibleShots.length]);

  useEffect(() => {
    if (!availableScreenshotFilters.includes(activeShotFilter)) {
      setActiveShotFilter("All");
      setShotDirection(1);
      setActiveShotIndex(0);
    }
  }, [activeShotFilter, availableScreenshotFilters]);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrameId = window.requestAnimationFrame(() => {
      closeDialogButtonRef.current?.focus();
    });

    const handleModalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedProjectTitle(null);
        return;
      }

      if (event.key !== "Tab") return;

      const modalContainer = modalPanelRef.current;
      if (!modalContainer) return;

      const focusableElements = getFocusableElements(modalContainer);
      if (focusableElements.length === 0) {
        event.preventDefault();
        modalContainer.focus();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener("keydown", handleModalKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrameId);
      document.removeEventListener("keydown", handleModalKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) return;

    const triggerElement = lastFocusedElementRef.current;
    if (!triggerElement) return;

    window.requestAnimationFrame(() => {
      triggerElement.focus();
    });
  }, [selectedProject]);

  const openProject = (title: string, trigger?: HTMLElement | null) => {
    if (trigger) {
      lastFocusedElementRef.current = trigger;
    } else if (document.activeElement instanceof HTMLElement) {
      lastFocusedElementRef.current = document.activeElement;
    }

    setSelectedProjectTitle(title);
    setActiveShotFilter("All");
    setShotDirection(1);
    setActiveShotIndex(0);
  };

  const closeProject = () => {
    setSelectedProjectTitle(null);
  };

  const showNextShot = () => {
    if (visibleShots.length === 0) return;
    setShotDirection(1);
    setActiveShotIndex((prev) => (prev + 1) % visibleShots.length);
  };

  const showPreviousShot = () => {
    if (visibleShots.length === 0) return;
    setShotDirection(-1);
    setActiveShotIndex((prev) =>
      prev === 0 ? visibleShots.length - 1 : prev - 1,
    );
  };

  const showNextProject = () => {
    if (selectedProjectIndex < 0) return;

    const nextIndex = (selectedProjectIndex + 1) % projects.length;
    setSelectedProjectTitle(projects[nextIndex].title);
    setActiveShotFilter("All");
    setShotDirection(1);
    setActiveShotIndex(0);
  };

  const markImageAsFailed = (src: string) => {
    if (src === "/placeholder.jpg") return;
    setFailedImages((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
  };

  const screenshotMotionVariants = shouldReduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (direction: 1 | -1) => ({
          x: direction > 0 ? 48 : -48,
          opacity: 0,
          scale: 0.98,
        }),
        center: {
          x: 0,
          opacity: 1,
          scale: 1,
        },
        exit: (direction: 1 | -1) => ({
          x: direction > 0 ? -48 : 48,
          opacity: 0,
          scale: 0.98,
        }),
      };

  return (
    <section
      id="projects"
      ref={ref}
      style={{ position: "relative" }}
      className="pt-32 pb-[18vh] overflow-x-clip"
    >
      <motion.div
        style={{ y: glowY, x: glowX }}
        className="pointer-events-none absolute top-14 -left-28 w-[22rem] h-[22rem] rounded-full bg-primary/20 blur-[120px]"
      />
      <motion.div
        style={{ y: glowYReverse }}
        className="pointer-events-none absolute bottom-6 -right-28 w-80 h-80 rounded-full bg-primary/14 blur-[115px]"
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-primary text-sm font-mono tracking-wider uppercase mb-4 block">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Selected work
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-6">
            Click any project to view organized screenshots, project overview,
            and move to the next project.
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const previewSrc =
              project.previewSrc ??
              project.screenshots[0]?.src ??
              "/placeholder.jpg";
            const resolvedPreviewSrc = failedImages[previewSrc]
              ? "/placeholder.jpg"
              : previewSrc;

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={(event) =>
                  openProject(project.title, event.currentTarget)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openProject(project.title, event.currentTarget);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open ${project.title} project details`}
                aria-haspopup="dialog"
                aria-controls="project-details-dialog"
                className="group relative bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-secondary via-secondary/80 to-primary/10">
                  <Image
                    src={resolvedPreviewSrc}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 1280px) 360px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 94vw"
                    quality={75}
                    priority={index < 2}
                    className={`absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                      project.previewMode === "contain"
                        ? "object-contain object-center p-2"
                        : "object-cover object-center"
                    }`}
                    onError={() => {
                      markImageAsFailed(previewSrc);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  {project.featured && (
                    <div className="absolute top-3 left-3 z-20">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground rounded-full">
                        <Sparkles className="w-2.5 h-2.5" />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-background/80 backdrop-blur-sm text-muted-foreground rounded-full border border-border/50">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-muted-foreground font-mono block mb-0.5">
                        {project.year}
                      </span>
                      <h3 className="text-base font-semibold group-hover:text-primary transition-colors truncate">
                        {project.title}
                      </h3>
                      <span className="text-[11px] text-primary/80 font-medium">
                        {project.role}
                      </span>
                    </div>
                    <div className="flex gap-1 ml-2 flex-shrink-0">
                      <span className="p-1.5 text-muted-foreground">
                        <Github size={14} />
                      </span>
                      <span className="p-1.5 text-muted-foreground">
                        <ExternalLink size={14} />
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] bg-secondary text-secondary-foreground rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 text-[10px] bg-secondary text-muted-foreground rounded-md">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <span
                    aria-hidden
                    className="block w-full py-2 text-xs font-medium rounded-lg border border-border/80 text-foreground hover:bg-secondary transition-colors"
                  >
                    Open Project Details
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {portalReady &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
                onClick={() => closeProject()}
              >
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 24, scale: 0.98 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 16, scale: 0.98 }
                  }
                  transition={
                    shouldReduceMotion ? { duration: 0.1 } : { duration: 0.2 }
                  }
                  className="w-full max-w-6xl max-h-[90vh] bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
                  id="project-details-dialog"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={PROJECT_DIALOG_TITLE_ID}
                  aria-describedby={PROJECT_DIALOG_DESCRIPTION_ID}
                  tabIndex={-1}
                  ref={modalPanelRef}
                  onClick={(event) => event.stopPropagation()}
                >
              <div className="flex items-start justify-between p-6 border-b border-border">
                <div>
                  <span className="text-xs uppercase tracking-[0.12em] text-primary font-mono block mb-1">
                    {selectedProject.category} Project
                  </span>
                  <h3 id={PROJECT_DIALOG_TITLE_ID} className="text-2xl font-bold">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedProject.year} - {selectedProject.role}
                  </p>
                </div>
                <button
                  onClick={closeProject}
                  ref={closeDialogButtonRef}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label="Close project details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 p-6 max-h-[76vh] overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap gap-2">
                      {availableScreenshotFilters.map((filter) => (
                        <button
                          key={filter}
                          onClick={() => {
                            setActiveShotFilter(filter);
                            setShotDirection(1);
                            setActiveShotIndex(0);
                          }}
                          className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                            activeShotFilter === filter
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {visibleShots.length} screenshot
                      {visibleShots.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  {visibleShots.length > 0 && activeShot ? (
                    <div className="space-y-4">
                      <div className="relative border border-border rounded-xl overflow-hidden bg-secondary/40 h-[420px]">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={`${resolvedActiveShotSrc}-${activeShotIndex}`}
                            custom={shotDirection}
                            variants={screenshotMotionVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={resolvedActiveShotSrc ?? "/placeholder.jpg"}
                              alt={activeShot.title}
                              fill
                              sizes="(min-width: 1280px) 860px, (min-width: 1024px) 62vw, 94vw"
                              quality={80}
                              className="object-contain object-center"
                              onError={() => {
                                markImageAsFailed(activeShot.src);
                              }}
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <div className="min-h-[96px] rounded-xl border border-border bg-secondary/30 p-4">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={`${activeShot.title}-${activeShotIndex}`}
                            initial={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: 8 }
                            }
                            animate={
                              shouldReduceMotion
                                ? { opacity: 1 }
                                : { opacity: 1, y: 0 }
                            }
                            exit={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: -8 }
                            }
                            transition={{ duration: 0.2 }}
                          >
                            <span className="inline-flex px-2 py-1 rounded-full text-[10px] uppercase tracking-wider bg-primary text-primary-foreground mb-2">
                              {activeShot.platform}
                            </span>
                            <p className="text-sm font-medium text-foreground">
                              {activeShot.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {activeShot.caption}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={showPreviousShot}
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </button>

                        <div className="flex items-center gap-1.5">
                          {visibleShots.map((shot, index) => (
                            <button
                              key={`${shot.src}-${index}`}
                              onClick={() => {
                                if (index !== activeShotIndex) {
                                  setShotDirection(
                                    index > activeShotIndex ? 1 : -1,
                                  );
                                  setActiveShotIndex(index);
                                }
                              }}
                              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                index === activeShotIndex
                                  ? "bg-primary"
                                  : "bg-border"
                              }`}
                              aria-label={`Go to screenshot ${index + 1}`}
                            />
                          ))}
                        </div>

                        <button
                          onClick={showNextShot}
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[320px] rounded-xl border border-border bg-secondary/30 flex items-center justify-center text-muted-foreground text-sm">
                      No screenshots found for this filter.
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Overview</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span id={PROJECT_DIALOG_DESCRIPTION_ID}>
                      {selectedProject.overview}
                      </span>
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-secondary/25 p-4">
                    <h5 className="text-sm font-semibold mb-3">
                      What Makes It Unique
                    </h5>
                    <div className="space-y-2.5">
                      {selectedProject.highlights.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                        >
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold mb-2">
                      Core Technologies
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border border-border bg-secondary/40">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                        Category
                      </p>
                      <p className="text-sm font-medium">
                        {selectedProject.category}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-secondary/40">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                        Timeline
                      </p>
                      <p className="text-sm font-medium">
                        {selectedProject.year}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={showNextProject}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                  >
                    Next Project
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
