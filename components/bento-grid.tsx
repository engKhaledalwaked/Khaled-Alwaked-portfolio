"use client";

import { Variants, motion } from "framer-motion";
import clsx from "clsx";

export type ProjectCard = {
  title: string;
  summary: string;
  category: string;
  span: "large" | "medium" | "small";
  accent: string;
  details: string[];
  status?: "ready" | "inProgress";
};

export type BentoGridLabels = {
  featuredLarge: string;
  featuredDefault: string;
  featuredInProgress: string;
  scopeLarge: string;
  scopeMedium: string;
  scopeSmall: string;
  clientValue: string;
  footerReady: string;
  footerInProgress: string;
};

type BentoGridProps = {
  items: ProjectCard[];
  labels: BentoGridLabels;
};

const spanClasses: Record<ProjectCard["span"], string> = {
  large: "md:col-span-3 md:row-span-1 md:justify-self-center md:w-[92%] md:max-w-[56rem]",
  medium: "md:col-span-1 md:row-span-1",
  small: "md:col-span-1 md:row-span-1",
};

const gridRevealVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardRevealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function BentoGrid({ items, labels }: BentoGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={gridRevealVariants}
      className="grid gap-3 sm:gap-5 md:auto-rows-auto md:grid-cols-3"
    >
      {items.map((item, index) => {
        const isSmall = item.span === "small";
        const isLarge = item.span === "large";
        const visibleDetails = item.details;
        const featuredTag =
          item.status === "inProgress" ? labels.featuredInProgress : item.span === "large" ? labels.featuredLarge : labels.featuredDefault;
        const scopeTag =
          item.span === "large" ? labels.scopeLarge : item.span === "medium" ? labels.scopeMedium : labels.scopeSmall;
        const footerNote = item.status === "inProgress" ? labels.footerInProgress : labels.footerReady;

        return (
          <motion.article
            key={item.title}
            variants={cardRevealVariants}
            whileHover={{ scale: 1.02, y: -6 }}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
              event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
            }}
            className={clsx(
              "group relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-3.5 sm:rounded-[2rem] sm:p-6 md:p-7 shadow-card backdrop-blur-2xl",
              isLarge && "self-start",
              spanClasses[item.span],
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle 180px at var(--x, 50%) var(--y, 50%), ${item.accent}25 0%, transparent 60%)`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-[1px] rounded-[calc(2rem-1px)] border border-white/5"
              style={{ boxShadow: `0 0 0 1px ${item.accent}30, inset 0 0 32px ${item.accent}10` }}
            />

            <div className={clsx("relative flex flex-col gap-6", isLarge ? "h-auto" : "h-full", isSmall && "gap-4")}>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="inline-flex w-fit rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60 sm:px-3 sm:text-xs sm:tracking-[0.32em]"
                    style={{ boxShadow: `0 0 0 1px ${item.accent}20` }}
                  >
                    {item.category}
                  </span>
                  <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-white/10 bg-black/25 px-2 text-[11px] font-medium text-white/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/58 sm:text-[11px] sm:tracking-[0.2em]">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.accent }} />
                    {featuredTag}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/50 sm:text-[11px] sm:tracking-[0.2em]">
                    {scopeTag}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3
                    className={clsx(
                      "text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-[1.75rem]",
                      isSmall && "text-lg sm:text-xl md:text-2xl",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={clsx(
                      "max-w-xl text-xs leading-5 text-white/68 sm:text-sm sm:leading-6 md:text-base",
                      isSmall && "text-xs leading-5 md:text-sm",
                    )}
                  >
                    {item.summary}
                  </p>
                </div>
              </div>

              <div
                className={clsx(
                  "space-y-2 pb-1 sm:space-y-3 sm:pb-2",
                  isLarge ? "mt-4" : "mt-auto",
                  isSmall && "space-y-2 pb-1",
                )}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/42 sm:text-[11px] sm:tracking-[0.24em]">
                  {labels.clientValue}
                </p>
                {visibleDetails.map((detail, detailIndex) => (
                  <div
                    key={detail}
                    className={clsx(
                      "flex items-start gap-3 text-xs leading-5 text-white/75 sm:text-sm sm:leading-6",
                      isSmall && "text-xs leading-5",
                      detailIndex >= 3 && "hidden sm:flex",
                    )}
                  >
                    <span
                      className="mt-2 h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.accent, boxShadow: `0 0 12px ${item.accent}` }}
                    />
                    <span>{detail}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-2 pt-2">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/45 sm:text-xs sm:tracking-[0.2em]">
                    {footerNote}
                  </span>
                  <span
                    className="hidden h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_14px] sm:inline-flex"
                    style={{ backgroundColor: item.accent, boxShadow: `0 0 14px ${item.accent}` }}
                  />
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
