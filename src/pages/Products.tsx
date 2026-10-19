import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AccessibilityIcon,
  CarIcon,
  HeartPulseIcon,
  HomeIcon,
  PiggyBankIcon,
  ShieldCheckIcon,
  SunsetIcon,
  TrendingUpIcon } from
'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SentenceFilter, SentenceFilterState } from '../components/products/SentenceFilter';
import { RecommendCard } from '../components/products/RecommendCard';
import { catalogue, categories, CatalogueProduct, ProductCategory } from '../data/products';
import { categoryArt, productArt } from '../data/productImages';
import { ProductArt } from '../components/products/ProductArt';

const categoryInfo: Record<ProductCategory, {intro: string;icon: LucideIcon;}> = {
  Motor: { intro: 'Cover for your car, your business vehicles and the people on the road with you.', icon: CarIcon },
  Medical: { intro: 'Health cover for you, your family, your staff and your members, with care when you need it.', icon: HeartPulseIcon },
  'Life & savings': { intro: 'Protect the people who depend on you and save for the things that matter.', icon: PiggyBankIcon },
  Investments: { intro: 'Grow your money with unit trusts managed by CIC Asset Management.', icon: TrendingUpIcon },
  Pensions: { intro: 'Plan for the years after work, for yourself or for your whole team.', icon: SunsetIcon },
  'Property & business': { intro: 'Protect your home, your property and the business you have built.', icon: HomeIcon },
  'Personal accident': { intro: 'Cash support if an accident keeps you from earning or living your usual life.', icon: AccessibilityIcon }
};

// Products we lead with when several match.
const popular = new Set(['easy-bima', 'money-market-fund', 'jipange-plus', 'home-insurance', 'academia', 'sme-medipack']);

function recommend(f: SentenceFilterState): CatalogueProduct[] {
  const seniors = f.segment === 'Individual' && f.age === 'over60';
  const score = (p: CatalogueProduct) =>
  (seniors && /senior/i.test(p.name) ? 10 : 0) + (popular.has(p.id) ? 3 : 0) + (seniors && /academia|education/i.test(p.name) ? -5 : 0);
  return catalogue.
  filter((p) => p.segments.includes(f.segment) && (!f.category || p.category === f.category)).
  map((p, i) => ({ p, s: score(p), i })).
  sort((a, b) => b.s - a.s || a.i - b.i).
  map((x) => x.p);
}

function badgeFor(p: CatalogueProduct, i: number, f: SentenceFilterState) {
  if (f.age === 'over60' && /senior/i.test(p.name)) return 'For 60+';
  if (i === 0) return 'Recommended';
  if (popular.has(p.id)) return 'Popular';
  return undefined;
}

export function Products() {
  const [filter, setFilter] = useState<SentenceFilterState>({ segment: 'Individual', age: 'under60', category: '' });
  const [tab, setTab] = useState<ProductCategory>(categories[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const matches = useMemo(() => recommend(filter), [filter]);
  const shown = matches.slice(0, 3);
  const inTab = useMemo(() => catalogue.filter((p) => p.category === tab), [tab]);
  const TabIcon = categoryInfo[tab].icon;

  return (
    <div className="min-h-screen w-full bg-white text-cic-ink">
      <SiteHeader />
      <main className="mx-auto max-w-[1440px] px-5 lg:px-[100px]">
        <nav aria-label="Breadcrumb" className="pt-5 text-[11px]">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="text-cic-red hover:underline">Individual</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/motor-insurance" className="text-cic-red hover:underline">Insurance</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">All products</li>
          </ol>
        </nav>

        <section className="flex flex-col items-center gap-6 py-8 md:flex-row md:justify-between">
          <div className="max-w-xl">
            <h1 className="text-[40px] font-semibold leading-tight lg:text-[48px]">Find the right cover - 125+ products!</h1>
            <p className="mt-4 text-[14px] leading-relaxed">
              From motor and medical insurance to savings, investments and pensions, we have solutions for individuals,
              businesses, corporates and cooperatives.*
            </p>
            <a
              href="#"
              className="mt-6 inline-block bg-cic-orange px-5 py-2 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]">

              Terms and Conditions
            </a>
          </div>
          <div className="relative flex h-[300px] w-full max-w-[380px] items-end justify-center md:mr-6" aria-hidden="true">
            <span className="absolute bottom-0 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cic-red to-cic-amber" />
            <img src={productArt.phone.src} alt="" className="relative h-full w-auto object-contain" />
          </div>
        </section>
      </main>

      <section aria-labelledby="recommended-title" className="bg-cic-mist pb-14">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-[100px]">
          <div className="-translate-y-6">
            <SentenceFilter value={filter} onChange={setFilter} />
          </div>
          <h2 id="recommended-title" className="text-center text-[14px] text-cic-muted" aria-live="polite">
            {matches.length === 0 ?
            'No products match yet' :
            `${matches.length} ${matches.length === 1 ? 'product' : 'products'} recommended${matches.length > 3 ? ', showing the top 3' : ''}`}
          </h2>

          {shown.length === 0 ?
          <div className="mx-auto mt-6 max-w-xl bg-white px-6 py-10 text-center shadow-card">
              <p className="text-[18px] font-semibold">We don't have that combination yet</p>
              <p className="mt-2 text-[14px] text-cic-muted">Try another type of cover, or talk to us and we'll find the right fit.</p>
              <Link
              to="/contact-us"
              className="mt-5 inline-block border border-cic-orange px-5 py-1.5 text-[13px] text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]">

                Talk to us
              </Link>
            </div> :

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {shown.map((p, i) =>
            <RecommendCard key={p.id} product={p} badge={badgeFor(p, i, filter)} />
            )}
            </div>
          }
        </div>
      </section>

      <section aria-labelledby="explore-title" className="pt-14">
        <h2 id="explore-title" className="px-5 text-center text-[32px] font-semibold">Explore all products</h2>
        <div className="mt-6 border-y border-cic-line bg-cic-mist">
          <div role="tablist" aria-label="Product categories" className="mx-auto flex max-w-[1440px] overflow-x-auto px-5 lg:justify-center lg:px-[100px]">
            {categories.map((c) => {
              const active = c === tab;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(c)}
                  className={`relative shrink-0 whitespace-nowrap px-5 py-4 text-[15px] transition-colors duration-150 ${
                  active ? 'font-semibold text-cic-red' : 'text-cic-ink hover:text-cic-red'}`
                  }>

                  {c}
                  {active && <span className="absolute inset-x-5 bottom-0 h-[3px] bg-cic-red" aria-hidden="true" />}
                </button>);

            })}
          </div>
        </div>

        <div role="tabpanel" aria-label={tab} className="mx-auto max-w-[1440px] px-5 pb-10 pt-10 lg:px-[100px]">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_280px]">
            <div>
              <h3 className="text-[28px] font-semibold">{tab}</h3>
              <p className="mt-2 max-w-xl text-[14px] text-cic-muted">{categoryInfo[tab].intro}</p>
            </div>
            <div className="relative hidden md:block">
              <ProductArt image={categoryArt[tab]} className="h-[160px]" />
              <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center bg-white text-cic-red shadow-card" aria-hidden="true">
                <TabIcon className="h-5 w-5" strokeWidth={1.5} />
              </span>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inTab.map((p) =>
            <RecommendCard key={p.id} product={p} badge={popular.has(p.id) ? 'Popular' : undefined} />
            )}
          </div>
          <p className="mt-8 text-[11px] text-cic-muted">
            *Product descriptions are summaries only. Cover, benefits, exclusions and premiums are set out in each
            product's policy document and terms and conditions.
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>);

}
