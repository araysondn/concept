import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { LinkTarget, SmartLink } from './shared';

export type ContentCardData = {
  title: string;
  body?: React.ReactNode;
  image?: string;
  icon?: LucideIcon;
  /** Small label above the title (e.g. category or date). */
  eyebrow?: string;
  points?: string[];
  link?: LinkTarget;
  /** Secondary solid CTA (e.g. "Get a quote"). */
  cta?: LinkTarget;
};

/** Absa article/product card: square, shadow-card, optional image or icon slot, underlined link or outline/solid buttons. */
export function ContentCard({ title, body, image, icon: Icon, eyebrow, points, link, cta }: ContentCardData) {
  return (
    <article className="flex min-h-[260px] flex-col bg-white shadow-card">
      {image ?
      <img src={image} alt="" className="h-[140px] w-full object-cover" /> :
      Icon ?
      <div className="flex h-[95px] items-center bg-cic-mist px-4" aria-hidden="true">
          <Icon className="h-10 w-10 text-cic-red" strokeWidth={1.25} />
        </div> :
      null}
      <div className="flex flex-1 flex-col p-4">
        {eyebrow && <p className="text-[11px] font-semibold uppercase tracking-wide text-cic-muted">{eyebrow}</p>}
        <h3 className="mt-2 text-[17px] font-semibold">{title}</h3>
        {body && <div className="mt-3 text-[12px] leading-relaxed">{body}</div>}
        {points && points.length > 0 &&
        <ul className="mt-3 list-disc space-y-1 pl-5 text-[12px]">
            {points.map((p) =>
          <li key={p}>{p}</li>
          )}
          </ul>
        }
        {(link || cta) &&
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
            {link && !cta &&
          <SmartLink target={link} className="text-[12px] font-semibold text-cic-burgundy underline hover:text-cic-red" />
          }
            {link && cta &&
          <SmartLink
            target={link}
            className="border border-cic-orange px-4 py-1.5 text-[13px] text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]" />

          }
            {cta &&
          <SmartLink
            target={cta}
            className="bg-cic-orange px-5 py-1.5 text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]" />

          }
          </div>
        }
      </div>
    </article>);

}

/** Responsive grid of ContentCards (Absa 3px gap article grid). */
export function CardGrid({ items, columns = 4 }: {items: ContentCardData[];columns?: 2 | 3 | 4;}) {
  const cols = columns === 4 ? 'lg:grid-cols-4' : columns === 3 ? 'lg:grid-cols-3' : '';
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${cols}`}>
      {items.map((item) =>
      <ContentCard key={item.title} {...item} />
      )}
    </div>);

}
