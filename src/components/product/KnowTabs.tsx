import React, { useEffect, useId, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { KnowTabData } from '../../data/productPage';

/** Absa "What you need to know" section: vertical tabs with an arrow notch on the active tab. */
export function KnowTabs({ title, intro, tabs }: {title: string;intro?: string;tabs: KnowTabData[];}) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const { hash } = useLocation();

  // #need-to-know-<tab label slug> opens that tab.
  useEffect(() => {
    if (!hash.startsWith('#need-to-know-')) return;
    const i = tabs.findIndex((t) => knowTabSlug(t.label) === hash.slice('#need-to-know-'.length));
    if (i >= 0) setActive(i);
  }, [hash, tabs]);
  const tab = tabs[active];
  return (
    <section id="need-to-know" aria-labelledby={`${uid}-title`} className="scroll-mt-6 pt-14">
      <h2 id={`${uid}-title`} className="text-[32px] font-semibold text-cic-ink">
        {title}
      </h2>
      {intro && <p className="mt-2 max-w-3xl text-[14px]">{intro}</p>}
      <div className="mt-6 flex flex-col gap-6 bg-white p-4 shadow-card md:flex-row md:gap-8 md:p-5">
        <div role="tablist" aria-orientation="vertical" className="flex shrink-0 flex-col gap-3 md:w-[240px]">
          {tabs.map((t, i) => {
            const selected = i === active;
            return (
              <button
                key={t.label}
                role="tab"
                aria-selected={selected}
                aria-controls={`${uid}-panel-${i}`}
                id={`${uid}-tab-${i}`}
                onClick={() => setActive(i)}
                className={`relative py-3 text-[13px] font-semibold transition-colors duration-150 ${
                selected ? 'bg-cic-burgundy text-white' : 'bg-cic-mist text-cic-ink hover:bg-[#ececec]'}`
                }>

                {t.label}
                {selected &&
                <span
                  className="absolute -right-2.5 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[8px] border-l-[10px] border-y-transparent border-l-cic-burgundy"
                  aria-hidden="true" />

                }
              </button>);

          })}
        </div>
        <div
          role="tabpanel"
          id={`${uid}-panel-${active}`}
          aria-labelledby={`${uid}-tab-${active}`}
          className="text-[14px] leading-relaxed text-cic-ink">

          {typeof tab.body === 'string' ? <p>{tab.body}</p> : tab.body}
          {tab.points &&
          <ul className="mt-2 list-disc space-y-1 pl-5">
              {tab.points.map((p) =>
            <li key={p}>{p}</li>
            )}
            </ul>
          }
        </div>
      </div>
    </section>);

}

export const knowTabSlug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
