import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from '../data/navigation';

/** Renders a router Link for internal items, an external anchor for href, otherwise a placeholder anchor. */
export function NavAnchor({ item, className }: {item: NavItem;className?: string;}) {
  if (item.to) {
    return (
      <Link to={item.to} className={className}>
        {item.label}
      </Link>);

  }
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={className}>
        {item.label}
      </a>);

  }
  return (
    <a href="#" className={className}>
      {item.label}
    </a>);

}
