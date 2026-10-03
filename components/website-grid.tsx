import Image from "next/image";

export type WebsiteCard = {
  name: string;
  url: string;
  image: string;
  location: string;
  kind: "redesign" | "newSite";
  summary: string;
  details: string[];
};

export type WebsiteGridLabels = {
  redesign: string;
  newSite: string;
  visit: string;
};

function hostOf(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function WebsiteGrid({ items, labels }: { items: WebsiteCard[]; labels: WebsiteGridLabels }) {
  return (
    <ul className="mt-12 grid gap-x-8 gap-y-16 sm:mt-16 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.url} className="flex flex-col">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${labels.visit}: ${item.name}`}
            className="hairline group block overflow-hidden rounded-xl border bg-surface"
          >
            <div className="hairline flex h-7 items-center gap-1.5 border-b px-3" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-foreground/15" />
              <span className="h-2 w-2 rounded-full bg-foreground/15" />
              <span className="h-2 w-2 rounded-full bg-foreground/15" />
              <span className="mx-auto truncate font-mono text-[10px] text-subtle" dir="ltr">
                {hostOf(item.url)}
              </span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 768px) 34rem, 100vw"
                quality={75}
                className="object-cover object-top opacity-90 transition duration-500 group-hover:scale-[1.015] group-hover:opacity-100"
              />
            </div>
          </a>

          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-xl font-medium tracking-tight text-foreground rtl:tracking-normal sm:text-2xl">{item.name}</h3>
            <p className="inline-flex items-center gap-2 text-xs text-muted">
              <span className={`h-1.5 w-1.5 rounded-full ${item.kind === "redesign" ? "bg-accent" : "bg-muted/60"}`} aria-hidden="true" />
              {item.kind === "redesign" ? labels.redesign : labels.newSite}
            </p>
          </div>
          <p className="mt-1 text-sm text-subtle">{item.location}</p>

          <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">{item.summary}</p>

          <ul className="mt-4 space-y-2">
            {item.details.map((detail) => (
              <li key={detail} className="flex gap-3 text-sm leading-6 text-muted">
                <span className="mt-[0.75rem] h-px w-3 shrink-0 bg-subtle" aria-hidden="true" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 text-sm text-foreground underline decoration-subtle/60 underline-offset-[6px] transition-colors hover:decoration-foreground"
          >
            {labels.visit}
            <span aria-hidden="true" className="rtl:-scale-x-100">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
