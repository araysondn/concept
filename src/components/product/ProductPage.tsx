import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SiteHeader } from '../SiteHeader';
import { SiteFooter } from '../SiteFooter';
import { HelpSection } from '../HelpSection';
import { ActionLink } from './ActionLink';
import { ProductHero } from './ProductHero';
import { KnowTabs } from './KnowTabs';
import { ApplySection } from './ApplySection';
import { ExploreOptions } from './ExploreOptions';
import { Articles } from './Articles';
import type { ProductPageData } from '../../data/productPage';

/**
 * Absa product page (benchmarked on Motor insurance): hero with a floating calculator, breadcrumb,
 * help grid, vertical "need to know" tabs, apply cards, optional extra slot, explore options and articles.
 */
export function ProductPage({ data, calculator, extra }: {data: ProductPageData;calculator?: ReactNode;extra?: ReactNode;}) {
  const crumbs = data.breadcrumb;
  const { hash } = useLocation();

  // In-page links (#get-started, #need-to-know[-tab], or an anchor in the extra slot) scroll to their section.
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1).startsWith('need-to-know') ? 'need-to-know' : hash.slice(1);
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    return () => window.clearTimeout(t);
  }, [hash]);
  return (
    <div className="min-h-screen w-full bg-white text-cic-ink">
      <SiteHeader />
      <ProductHero hero={data.hero} aside={calculator} />
      <main className="mx-auto max-w-[1440px] px-5 lg:px-[100px]">
        <nav aria-label="Breadcrumb" className="pt-5 text-[11px]">
          <ol className="flex items-center gap-2">
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1;
              return (
                <React.Fragment key={`${c.label}-${i}`}>
                  {i > 0 && <li aria-hidden="true">/</li>}
                  {last ?
                  <li aria-current="page">{c.label}</li> :

                  <li>
                      <ActionLink link={c} className="text-cic-red hover:underline" />
                    </li>
                  }
                </React.Fragment>);

            })}
          </ol>
        </nav>
        {data.help && <HelpSection title={data.help.title} items={data.help.items} />}
        {data.know && <KnowTabs {...data.know} />}
        {data.apply && <ApplySection {...data.apply} />}
        {extra}
        {data.explore && <ExploreOptions {...data.explore} />}
        {data.articles && <Articles {...data.articles} />}
      </main>
      <SiteFooter />
    </div>);

}
