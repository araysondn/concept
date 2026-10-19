import React, { useId } from 'react';
import { ShieldCheckIcon } from 'lucide-react';
import { ActionLink } from './ActionLink';
import type { ApplyData, BannerData, ProductCardData, PromoCardData } from '../../data/productPage';

/** Absa "Get cover that works for you": product cards, promo cards (2-up grid) and an optional wide banner. */
export function ApplySection({ title, intro, products, promos = [], banner }: ApplyData) {
  const uid = useId();
  return (
    <section aria-labelledby={`${uid}-title`} className="pt-12">
      <h2 id={`${uid}-title`} className="text-[32px] font-semibold text-cic-ink">
        {title}
      </h2>
      {intro && <p className="mt-2 max-w-3xl text-[14px]">{intro}</p>}

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {products.map((p) =>
        <ProductCard key={p.title} {...p} />
        )}
        {promos.map((p) =>
        <PromoCard key={p.title} {...p} />
        )}
      </div>

      {banner && <Banner {...banner} />}
    </section>);

}

function ProductCard({ title, body, image, icon: Icon = ShieldCheckIcon, more, quote }: ProductCardData) {
  return (
    <article className="flex flex-col bg-white p-6 shadow-card">
      <h3 className="text-[19px] font-semibold">{title}</h3>
      <div className="mt-4 flex flex-1 gap-6">
        {image ?
        <img src={image} alt="" className="h-28 w-24 shrink-0 object-contain" /> :

        <span className="flex h-28 w-24 shrink-0 items-center justify-center" aria-hidden="true">
            <Icon className="h-16 w-16 text-cic-red" strokeWidth={1.25} />
          </span>
        }
        <div className="flex flex-1 flex-col">
          <p className="text-[13px] leading-relaxed">{body}</p>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <ActionLink
              link={more}
              fallback="Tell me more"
              className="border border-cic-orange px-4 py-1.5 text-[13px] text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]" />

            <ActionLink
              link={quote}
              fallback="Get a quote"
              className="bg-cic-orange px-5 py-1.5 text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]" />

          </div>
        </div>
      </div>
    </article>);

}

function PromoCard({ title, body, bg, image, imageClass = '', link }: PromoCardData) {
  return (
    <article className={`relative flex min-h-[220px] overflow-hidden text-white shadow-card ${bg}`}>
      {image && <img src={image} alt="" className={imageClass} />}
      <div className="relative flex max-w-[62%] flex-col p-6">
        <h3 className="text-[19px] font-semibold">{title}</h3>
        <p className="mt-3 text-[12.5px] leading-relaxed">{body}</p>
        <ActionLink
          link={link}
          fallback="Tell me more"
          className="mt-auto inline-block self-start border border-white px-4 py-1.5 text-[13px] transition-colors duration-150 hover:bg-white/15" />

      </div>
    </article>);

}

function Banner({ title, body, image, link, bg = 'bg-cic-orange' }: BannerData) {
  return (
    <article className={`relative mt-5 flex min-h-[190px] overflow-hidden text-white shadow-card md:min-h-[190px] ${bg}`}>
      {image &&
      <img src={image} alt="" className="absolute bottom-0 right-0 hidden h-full w-[55%] object-cover object-right md:block" />
      }
      <div className={`relative flex flex-col p-6 md:p-8 ${image ? 'md:pr-[55%]' : ''}`}>
        <h3 className="text-[28px] font-semibold">{title}</h3>
        <p className="mt-3 text-[13px]">{body}</p>
        <ActionLink
          link={link}
          fallback="Tell me more"
          className="mt-auto inline-block self-start border border-white px-4 py-1.5 text-[13px] transition-colors duration-150 hover:bg-white/15 max-md:mt-8" />

      </div>
    </article>);

}
