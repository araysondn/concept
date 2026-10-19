import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUpIcon } from 'lucide-react';
import { trendingProducts } from '../../data/homeFinder';

/** Burgundy band under the hero panels: quick links to trending products. */
export function TrendingBar() {
  return (
    <nav aria-label="Trending products" className="w-full bg-cic-wine text-white">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-4 gap-y-3 px-5 py-4 lg:px-[100px]">
        <span className="flex items-center gap-2 text-[14px] font-semibold">
          <TrendingUpIcon className="h-4 w-4 text-cic-amber" aria-hidden="true" />
          Trending
        </span>
        <ul className="flex flex-wrap gap-2">
          {trendingProducts.map((t) =>
          <li key={t.id}>
              <Link
              to={`/product/${t.id}`}
              className="inline-block border border-white/70 px-3 py-1.5 text-[13px] font-semibold transition-colors duration-150 hover:bg-white hover:text-cic-red">

                {t.label}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>);

}
