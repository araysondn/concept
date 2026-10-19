import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { LinkTarget, SmartLink } from './shared';

export type IconLink = {label: string;icon: LucideIcon;body?: string;link?: LinkTarget;};

/** Absa "Let us help you with" grid: plain 24px ink icon, semibold label, underlined "Tell me more". */
export function IconLinkGrid({ items, columns = 6 }: {items: IconLink[];columns?: 3 | 4 | 6;}) {
  const cols = columns === 6 ? 'lg:grid-cols-6' : columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';
  return (
    <ul className={`grid grid-cols-2 gap-y-8 sm:grid-cols-3 ${cols}`}>
      {items.map(({ label, icon: Icon, body, link }) =>
      <li key={label} className="flex flex-col pr-4">
          <Icon className="h-6 w-6 text-cic-ink" strokeWidth={1.5} aria-hidden="true" />
          <p className="mt-3 text-[14px] font-semibold">{label}</p>
          {body && <p className="mt-2 text-[12px] leading-relaxed text-cic-muted">{body}</p>}
          <SmartLink
          target={link ?? { label: 'Tell me more' }}
          className="mt-auto pt-6 text-[13px] font-semibold text-cic-burgundy underline hover:text-cic-red">

            {link?.label ?? 'Tell me more'}
          </SmartLink>
        </li>
      )}
    </ul>);

}
