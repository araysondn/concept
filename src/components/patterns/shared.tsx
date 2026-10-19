import React from 'react';
import { Link } from 'react-router-dom';

/** A link target: internal route (`to`) or external/placeholder URL (`href`). */
export type LinkTarget = {label: string;to?: string;href?: string;};

export const container = 'mx-auto max-w-[1440px] px-5 lg:px-[100px]';

export const btnPrimary =
'inline-block bg-cic-orange px-6 py-2.5 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]';
export const btnOutline =
'inline-block border border-cic-orange px-4 py-1.5 text-[13px] text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]';
export const btnOutlineInverse =
'inline-block border border-white px-4 py-1.5 text-[13px] text-white transition-colors duration-150 hover:bg-white/15';
export const textLink = 'text-[13px] font-semibold text-cic-burgundy underline hover:text-cic-red';

/** Renders a router Link for internal routes, otherwise an anchor (external links open in a new tab). */
export function SmartLink({
  target,
  className,
  children



}: {target: LinkTarget;className?: string;children?: React.ReactNode;}) {
  const content = children ?? target.label;
  if (target.to) {
    return (
      <Link to={target.to} className={className}>
        {content}
      </Link>);

  }
  const external = Boolean(target.href && /^https?:/.test(target.href));
  return (
    <a
      href={target.href ?? '#'}
      className={className}
      {...external ? { target: '_blank', rel: 'noreferrer' } : {}}>

      {content}
    </a>);

}
