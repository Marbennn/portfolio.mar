"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Facebook,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "maar.recepcion.up@phinmaed.com",
    href: "mailto:maar.recepcion.up@phinmaed.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 933 570 8011",
    href: "tel:+639335708011",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Alaminos City, Pangasinan, Philippines",
    href: null,
  },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Marbennn" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/marecepcion",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/marbenarecepcion",
  },
];

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const accentY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [125, -125],
  );
  const accentYReverse = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-90, 90],
  );
  const accentX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [24, -24],
  );
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("maar.recepcion.up@phinmaed.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{ position: "relative" }}
      className="pt-28 pb-8 overflow-x-clip"
    >
      {/* Background Accents */}
      <motion.div
        style={{ y: accentY, x: accentX }}
        className="absolute top-1/3 left-1/4 w-[26rem] h-[26rem] rounded-full bg-primary/16 blur-[150px]"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }
        }
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
        style={{ y: accentYReverse }}
        className="pointer-events-none absolute bottom-10 right-[-6rem] w-80 h-80 rounded-full bg-primary/14 blur-[125px]"
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-mono tracking-wider uppercase mb-4 block">
                Contact
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
                Let&apos;s build something{" "}
                <span className="text-primary">amazing</span> together
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                I&apos;m always interested in hearing about new projects and
                opportunities. Whether you have a question or just want to say
                hi, feel free to reach out!
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 mb-12"
            >
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="block text-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="block text-foreground">
                        {item.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-10 flex gap-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{social.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="p-8 rounded-2xl bg-card border border-border relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[80px]" />

              <div className="relative">
                <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
                <p className="text-muted-foreground text-sm mb-8">
                  Feel free to reach out via email or social media.
                </p>

                {/* Email CTA */}
                <div className="p-4 rounded-xl bg-secondary/50 border border-border mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="text-sm font-mono">
                        maar.recepcion.up@phinmaed.com
                      </span>
                    </div>
                    <motion.button
                      onClick={copyEmail}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                      aria-label="Copy email"
                    >
                      {copiedEmail ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Main CTA Button */}
                <motion.a
                  href="mailto:maar.recepcion.up@phinmaed.com"
                  className="group flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Send className="w-5 h-5" />
                  Send me an email
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>

                {/* Response Time */}
                <p className="text-center text-xs text-muted-foreground mt-4">
                  I typically respond within 24-48 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
