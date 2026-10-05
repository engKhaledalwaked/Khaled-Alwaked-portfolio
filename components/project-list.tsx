"use client";

import { useState } from "react";
import Image from "next/image";

export type ProjectCard = {
  title: string;
  summary: string;
  category: string;
  span?: "large" | "medium" | "small";
  accent?: string;
  details: string[];
  youtubeUrl?: string;
  site?: { url: string; image: string };
  status?: "ready" | "inProgress" | "redesign" | "newSite" | "rebuild";
};

export type ProjectListLabels = {
  shipped: string;
  inProgress: string;
  watchDemo: string;
  highlights: string;
  redesign?: string;
  newSite?: string;
  rebuild?: string;
  visitSite?: string;
};

function statusLabel(status: ProjectCard["status"], labels: ProjectListLabels) {
  if (status === "inProgress") return labels.inProgress;
  if (status === "redesign") return labels.redesign ?? labels.shipped;
  if (status === "newSite") return labels.newSite ?? labels.shipped;
  if (status === "rebuild") return labels.rebuild ?? labels.shipped;
  return labels.shipped;
}

function getYoutubeId(url: string) {
  return url.match(/\/embed\/([^?]+)/)?.[1] ?? null;
}

function withAutoplay(url: string) {
  return `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;
}

function VideoPreview({ title, youtubeUrl, label }: { title: string; youtubeUrl: string; label: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const videoId = getYoutubeId(youtubeUrl);

  return (
    <div className="hairline relative aspect-video w-full overflow-hidden rounded-xl border bg-surface">
      {isPlaying ? (
        <iframe
          src={withAutoplay(youtubeUrl)}
          title={`${title} demo`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          disabled={!videoId}
          aria-label={`${label}: ${title}`}
          className="group relative block h-full w-full"
        >
          {videoId && !thumbnailFailed ? (
            <Image
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 44rem, 100vw"
              quality={70}
              className="object-cover opacity-80 grayscale-[35%] transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              onError={() => setThumbnailFailed(true)}
            />
          ) : null}
          <span className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <span className="absolute bottom-4 start-4 inline-flex items-center gap-2.5 rounded-full bg-foreground py-1.5 pe-4 ps-1.5 text-[13px] font-medium text-background transition group-hover:bg-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background text-foreground" aria-hidden="true">
              <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor" className="ms-0.5">
                <path d="M0 0.8v8.4c0 .6.7 1 1.2.7l7.1-4.2c.5-.3.5-1.1 0-1.4L1.2.1C.7-.2 0 .2 0 .8Z" />
              </svg>
            </span>
            {label}
          </span>
        </button>
      )}
    </div>
  );
}

function SitePreview({ title, site, label }: { title: string; site: { url: string; image: string }; label: string }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${title}`}
      className="hairline group relative block aspect-video w-full overflow-hidden rounded-xl border bg-surface"
    >
      <Image
        src={site.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 44rem, 100vw"
        quality={75}
        className="object-cover object-top opacity-80 grayscale-[35%] transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      <span className="absolute bottom-4 start-4 inline-flex items-center gap-2.5 rounded-full bg-foreground py-1.5 pe-4 ps-1.5 text-[13px] font-medium text-background transition group-hover:bg-white">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background text-foreground" aria-hidden="true">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.4" className="rtl:-scale-x-100">
            <path d="M2 7 7 2M3 2h4v4" />
          </svg>
        </span>
        {label}
      </span>
    </a>
  );
}

export function ProjectList({ items, labels, startAt = 1 }: { items: ProjectCard[]; labels: ProjectListLabels; startAt?: number }) {
  return (
    <ol start={startAt} className="mt-12 sm:mt-16">
      {items.map((item, index) => {
        const inProgress = item.status === "inProgress";

        return (
          <li key={item.title} className="hairline grid gap-8 border-t py-12 sm:py-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <p className="font-mono text-xs text-subtle">{String(startAt + index).padStart(2, "0")}</p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight text-foreground rtl:tracking-normal sm:text-3xl">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.category}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-xs text-muted">
                  <span className={`h-1.5 w-1.5 rounded-full ${inProgress ? "bg-accent" : "bg-muted/60"}`} aria-hidden="true" />
                  {statusLabel(item.status, labels)}
                </p>
              </div>
            </div>

            <div className="space-y-8 lg:col-span-8">
              {item.youtubeUrl ? <VideoPreview title={item.title} youtubeUrl={item.youtubeUrl} label={labels.watchDemo} /> : null}
              {item.site ? <SitePreview title={item.title} site={item.site} label={labels.visitSite ?? item.site.url} /> : null}

              <p className="max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg sm:leading-relaxed">{item.summary}</p>

              <div className="max-w-2xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle rtl:font-sans rtl:text-xs rtl:tracking-normal">{labels.highlights}</p>
                <ul className="mt-4 space-y-3">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-4 text-sm leading-7 text-muted sm:text-[15px]">
                      <span className="mt-[0.9rem] h-px w-3 shrink-0 bg-subtle" aria-hidden="true" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
