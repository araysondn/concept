import React from 'react';
import { Link } from 'react-router-dom';
import { homeHeroPanels } from '../../data/home';

export function HomeHero() {
  return (
    <section aria-label="Featured solutions" className="grid w-full md:h-[400px] md:grid-cols-[2fr_1fr_1fr]">
      {homeHeroPanels.map((p, i) =>
      <article key={p.title} className="relative flex h-[300px] items-end overflow-hidden md:h-full">
          <img src={p.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
          <div className="relative p-8 text-white">
            {i === 0 ?
          <h1 className="text-[40px] font-semibold leading-tight">{p.title}</h1> :

          <h2 className="text-[22px] font-semibold leading-tight">{p.title}</h2>
          }
            {p.body && <p className="mt-3 text-[14px]">{p.body}</p>}
            <Link to={p.to} className="mt-6 inline-block text-[14px] font-semibold underline hover:opacity-80">
              Tell me more
            </Link>
          </div>
        </article>
      )}
    </section>);

}
