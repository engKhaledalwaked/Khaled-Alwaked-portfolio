"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

export type ProjectCard = {
  title: string;
  summary: string;
  category: string;
  span: "large" | "medium" | "small";
  accent: string;
  details: string[];
  youtubeUrl?: string;
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
  disableMotion?: boolean;
};

const spanClasses: Record<ProjectCard["span"], string> = {
  large: "md:col-span-3 md:row-span-1 md:justify-self-center md:w-[92%] md:max-w-[56rem]",
  medium: "md:col-span-1 md:row-span-1",
  small: "md:col-span-1 md:row-span-1",
};

function getYoutubeId(url: string) {
  return url.match(/\/embed\/([^?]+)/)?.[1] ?? null;
}

function getYoutubeThumbnailUrl(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function withAutoplay(url: string) {
  return `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;
}

function ProjectVideoPreview({ accent, title, youtubeUrl }: { accent: string; title: string; youtubeUrl: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const videoId = getYoutubeId(youtubeUrl);
  const thumbnailUrl = videoId ? getYoutubeThumbnailUrl(videoId) : null;
  const hasVideo = videoId !== null;

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/35 shadow-[0_0_18px_rgba(0,0,0,0.22)]">
      <div className="aspect-video w-full">
        {isLoaded ? (
          <iframe
            src={withAutoplay(youtubeUrl)}
            title={`${title} video demo`}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            aria-label={`Play ${title} demo video`}
            className="group/video relative h-full w-full overflow-hidden bg-black text-left"
            disabled={!hasVideo}
          >
            {thumbnailUrl && !thumbnailFailed ? (
              <Image
                src={thumbnailUrl}
                alt={`${title} video thumbnail`}
                fill
                sizes="(min-width: 1024px) 28rem, (min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-500 group-hover/video:scale-105"
                quality={70}
                loading="lazy"
                onError={() => setThumbnailFailed(true)}
              />
            ) : (
              <span
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 18% 18%, ${accent}42, transparent 34%), radial-gradient(circle at 80% 60%, ${accent}24, transparent 34%), linear-gradient(135deg, rgba(0,0,0,0.86), rgba(255,255,255,0.04) 48%, rgba(0,0,0,0.82))`,
                }}
              />
            )}
            <span className="absolute inset-0 bg-black/36" />
            <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.14),transparent)] opacity-35" />
            <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
              <span className="min-w-0 text-sm font-semibold text-white sm:text-base">{title}</span>
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/12 backdrop-blur-md transition group-hover/video:scale-105"
                style={{ boxShadow: `0 0 22px ${accent}55` }}
                aria-hidden="true"
              >
                <span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export function BentoGrid({ items, labels, disableMotion = false }: BentoGridProps) {
  const shouldDisableMotion = disableMotion;

  return (
    <div
      className={clsx(
        "grid gap-3 sm:gap-5 md:auto-rows-auto md:grid-cols-3",
        !shouldDisableMotion && "motion-safe:[&>article]:transition-transform motion-safe:[&>article]:duration-300",
      )}
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
          <article
            key={item.title}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
              event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
            }}
            className={clsx(
              "group relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-3.5 sm:rounded-[2rem] sm:p-6 md:p-7 shadow-card backdrop-blur-2xl",
              !shouldDisableMotion && "motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01]",
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
                      "text-xl font-semibold tracking-normal text-white sm:text-2xl md:text-[1.75rem]",
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

              {item.youtubeUrl ? (
                <ProjectVideoPreview accent={item.accent} title={item.title} youtubeUrl={item.youtubeUrl} />
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
