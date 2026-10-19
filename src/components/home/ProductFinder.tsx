import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRightIcon, BriefcaseIcon, CarIcon, HeartPulseIcon, HomeIcon, PiggyBankIcon, ShieldCheckIcon, UmbrellaIcon } from
'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { catalogue, CatalogueProduct, ProductCategory } from '../../data/products';
import { finderTabs } from '../../data/homeFinder';
import { productImage } from '../../data/productImages';
import { ProductArt } from '../products/ProductArt';

const categoryIcon: Record<ProductCategory, LucideIcon> = {
  Motor: CarIcon,
  Medical: HeartPulseIcon,
  'Life & savings': ShieldCheckIcon,
  Investments: PiggyBankIcon,
  Pensions: UmbrellaIcon,
  'Property & business': HomeIcon,
  'Personal accident': BriefcaseIcon
};

const ease = [0.23, 1, 0.32, 1] as const;
const firstSentence = (s: string) => s.split(/(?<=\.)\s/)[0];

/** "I'm looking for insurance on" segmented bar that filters featured product cards. */
export function ProductFinder() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const tab = finderTabs[active];

  const products = tab.featured.
  map((id) => catalogue.find((p) => p.id === id)).
  filter((p): p is CatalogueProduct => Boolean(p));
  const total = catalogue.filter((p) => tab.categories.includes(p.category)).length;

  const select = (i: number) => {
    setActive(i);
    refs.current[i]?.focus();
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = finderTabs.length - 1;
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
  };

  return (
    <section aria-labelledby="finder-title" className="bg-cic-mist">
      <div className="mx-auto max-w-[1440px] px-5 py-14 lg:px-[100px]">
        <h2 id="finder-title" className="mx-auto max-w-2xl text-center text-[32px] font-semibold leading-tight">
          We keep our word for every stage of life
        </h2>
        <p id="finder-label" className="mt-4 text-center text-[14px]">I'm looking for insurance on:</p>

        <div
          role="tablist"
          aria-labelledby="finder-label"
          onKeyDown={onKeyDown}
          className="mx-auto mt-3 flex max-w-[1000px] overflow-x-auto bg-white shadow-card [scrollbar-width:none]">

          {finderTabs.map((t, i) => {
            const selected = i === active;
            return (
              <button
                key={t.id}
                ref={(el) => refs.current[i] = el}
                role="tab"
                id={`finder-tab-${t.id}`}
                aria-selected={selected}
                aria-controls="finder-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`min-w-[130px] flex-1 whitespace-nowrap border-r border-cic-line px-4 py-3 text-[14px] font-semibold transition-colors duration-150 last:border-r-0 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cic-amber ${
                selected ? 'bg-cic-red text-white' : 'text-cic-red hover:bg-[#FBECEC]'}`
                }>

                {t.label}
              </button>);

          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab.id}
            id="finder-panel"
            role="tabpanel"
            aria-labelledby={`finder-tab-${tab.id}`}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2, ease }}>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => {
                const Icon = categoryIcon[p.category];
                return (
                  <li key={p.id}>
                    <Link
                      to={`/product/${p.id}`}
                      className="group flex h-full flex-col bg-white shadow-card transition-shadow duration-150 hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)]">

                      <ProductArt image={productImage(p.id, p.category)} />
                      <span className="flex flex-1 flex-col border-t-4 border-cic-red p-5">
                        <span className="flex items-center gap-1.5 text-[12px] text-cic-muted">
                          <Icon className="h-3.5 w-3.5 text-cic-red" aria-hidden="true" /> {p.company}
                        </span>
                        <span className="mt-1 text-[18px] font-semibold leading-snug">{p.name}</span>
                        <span className="mt-2 text-[13px] leading-relaxed">{firstSentence(p.description)}</span>
                        <span className="mt-auto flex justify-end pt-4">
                          <span className="flex h-8 w-8 items-center justify-center bg-cic-orange text-white transition-colors duration-150 group-hover:bg-[#8A1B23]">
                            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only">View {p.name}</span>
                          </span>
                        </span>
                      </span>
                    </Link>
                  </li>);

              })}
            </ul>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-block bg-cic-orange px-6 py-2.5 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]">

            View all {total} {tab.label.toLowerCase()} products
          </Link>
        </div>
      </div>
    </section>);

}
