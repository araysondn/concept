import React from 'react';
import { SiteHeader } from '../SiteHeader';
import { SiteFooter } from '../SiteFooter';
import { container } from './shared';

type Props = {
  /** Rendered full-bleed between header and the padded main column (e.g. PageHero, SubNav). */
  top?: React.ReactNode;
  children: React.ReactNode;
  /** Wrap children in the Absa 1440px padded container (default true). */
  contained?: boolean;
};

/** Marketing page shell: SiteHeader + optional full-bleed top area + main column + SiteFooter. */
export function ContentLayout({ top, children, contained = true }: Props) {
  return (
    <div className="min-h-screen w-full bg-white text-cic-ink">
      <SiteHeader />
      {top}
      <main className={contained ? `${container} pb-14` : 'pb-14'}>{children}</main>
      <SiteFooter />
    </div>);

}
