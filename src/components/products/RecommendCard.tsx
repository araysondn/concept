import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import type { CatalogueProduct } from '../../data/products';
import { productImage } from '../../data/productImages';
import { ProductArt } from './ProductArt';

/** Listing card (FWD health-life pattern, Absa styling): name + badge, summary, ticks, quote and learn-more actions. */
export function RecommendCard({ product, badge }: {product: CatalogueProduct;badge?: string;}) {
  const href = `/product/${product.id}`;
  return (
    <article className="group flex h-full flex-col bg-white shadow-card">
      <Link to={href} tabIndex={-1} aria-hidden="true">
        <ProductArt image={productImage(product.id, product.category)} className="h-[180px]" />
      </Link>
      <div className="border-b border-cic-line px-5 pb-5 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[18px] font-semibold leading-snug">{product.name}</h3>
          {badge &&
          <span className="shrink-0 border border-cic-red px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cic-red">
              {badge}
            </span>
          }
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-cic-muted">{product.description}</p>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <p className="text-[12px] text-cic-muted">{product.company}</p>
        <ul className="mt-3 space-y-1.5 text-[13px]">
          {product.highlights.slice(0, 3).map((h) =>
          <li key={h} className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-cic-red" aria-hidden="true" />
              {h}
            </li>
          )}
        </ul>
        <div className="mt-auto flex items-center gap-4 pt-5">
          <Link
            to={href}
            className="flex-1 bg-cic-orange px-4 py-2.5 text-center text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]">

            Get a quote
          </Link>
          <Link to={href} className="flex items-center gap-1 text-[14px] font-semibold text-cic-ink hover:text-cic-red">
            <ArrowRightIcon className="h-4 w-4 text-cic-red" aria-hidden="true" />
            Learn more
          </Link>
        </div>
      </div>
    </article>);

}
