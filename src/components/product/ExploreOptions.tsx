import React, { useId } from 'react';
import { ActionLink } from './ActionLink';
import type { ExploreData, OptionData, PageLink } from '../../data/productPage';

function SeeMore({ link }: {link?: PageLink;}) {
  return (
    <ActionLink
      link={link}
      fallback="See more"
      className="mt-auto pt-8 text-[12px] font-semibold text-cic-burgundy underline hover:text-cic-red" />);


}

function OptionCard({ title, body, link }: OptionData) {
  return (
    <article className="flex flex-col border-l-4 border-cic-red bg-white p-4 shadow-card">
      <h3 className="text-[17px] font-semibold">{title}</h3>
      <p className="mt-2 text-[12px]">{body}</p>
      <SeeMore link={link} />
    </article>);

}

/** Absa "Explore your options": feature card with image, red-edged option cards and a wide card. */
export function ExploreOptions({ title, feature, options, wide }: ExploreData) {
  const uid = useId();
  return (
    <section aria-labelledby={`${uid}-title`} className="pt-10">
      <h2 id={`${uid}-title`} className="text-[32px] font-semibold text-cic-ink">
        {title}
      </h2>
      <div className={`mt-5 grid gap-3 ${feature ? 'md:grid-cols-[1fr_2.6fr]' : ''}`}>
        {feature &&
        <article className="flex flex-col bg-white shadow-card">
            {feature.image && <img src={feature.image} alt={feature.imageAlt ?? ''} className="h-[90px] w-full object-cover" />}
            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-[17px] font-semibold">{feature.title}</h3>
              <p className="mt-2 text-[12px]">{feature.body}</p>
              <SeeMore link={feature.link} />
            </div>
          </article>
        }
        <div className="grid gap-3">
          {options.length > 0 &&
          <div className="grid gap-3 sm:grid-cols-2">
              {options.map((o) =>
            <OptionCard key={o.title} {...o} />
            )}
            </div>
          }
          {wide &&
          <article className="relative flex min-h-[130px] flex-col overflow-hidden border-l-4 border-cic-red bg-white p-4 shadow-card">
              {wide.image &&
            <img src={wide.image} alt="" className="absolute bottom-0 right-0 hidden h-full w-auto object-contain sm:block" />
            }
              <h3 className="relative text-[17px] font-semibold">{wide.title}</h3>
              <p className="relative mt-2 text-[12px]">{wide.body}</p>
              <div className="relative mt-auto flex">
                <SeeMore link={wide.link} />
              </div>
            </article>
          }
        </div>
      </div>
    </section>);

}
