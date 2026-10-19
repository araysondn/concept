import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { PageLink } from '../../data/productPage';

/** Router link for `to`, anchor for `href`, otherwise a placeholder `#` anchor. Text defaults to the link label. */
export function ActionLink({
  link,
  fallback,
  className,
  children




}: {link?: PageLink;fallback?: string;className?: string;children?: ReactNode;}) {
  const text = children ?? link?.label ?? fallback;
  if (link?.to) {
    return (
      <Link to={link.to} className={className}>
        {text}
      </Link>);

  }
  const external = Boolean(link?.href && /^https?:/.test(link.href));
  return (
    <a href={link?.href ?? '#'} className={className} {...external ? { target: '_blank', rel: 'noreferrer' } : {}}>
      {text}
    </a>);

}
