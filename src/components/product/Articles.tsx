import React, { useId } from 'react';
import { ActionLink } from './ActionLink';
import type { ArticlesData } from '../../data/productPage';

/** Absa article cards (4-up): image strip, title, teaser and a "See more" link. */
export function Articles({ title, articles }: ArticlesData) {
  const uid = useId();
  return (
    <section aria-labelledby={`${uid}-title`} className="pb-4 pt-10">
      <h2 id={`${uid}-title`} className="text-[32px] font-semibold text-cic-ink">
        {title}
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((a) =>
        <article key={a.title} className="flex min-h-[290px] flex-col bg-white shadow-card">
            {a.image ?
          <img src={a.image} alt="" className="h-[95px] w-full object-cover" /> :

          <span className="block h-[95px] w-full bg-cic-mist" aria-hidden="true" />
          }
            <div className="flex flex-1 flex-col p-4">
              <h3 className="mt-2 text-[17px] font-semibold">{a.title}</h3>
              <p className="mt-3 text-[12px]">{a.body}</p>
              <ActionLink
              link={a.link}
              fallback="See more"
              className="mt-auto pt-8 text-[12px] font-semibold text-cic-burgundy underline hover:text-cic-red" />

            </div>
          </article>
        )}
      </div>
    </section>);

}
