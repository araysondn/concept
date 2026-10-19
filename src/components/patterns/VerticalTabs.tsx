import React, { useId, useState } from 'react';

export type TabItem = {label: string;body: React.ReactNode;};

/** Absa vertical tabs (KnowSection pattern): burgundy selected tab with arrow notch, content panel on the right. */
export function VerticalTabs({ tabs, initial = 0 }: {tabs: TabItem[];initial?: number;}) {
  const [active, setActive] = useState(initial);
  const uid = useId();
  const tab = tabs[active] ?? tabs[0];
  if (!tab) return null;
  return (
    <div className="flex flex-col gap-6 bg-white p-4 shadow-card md:flex-row md:gap-8 md:p-5">
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
              className={`relative px-3 py-3 text-[13px] font-semibold transition-colors duration-150 ${
              selected ? 'bg-cic-burgundy text-white' : 'bg-cic-mist text-cic-ink hover:bg-[#ececec]'}`
              }>

              {t.label}
              {selected &&
              <span
                className="absolute -right-2.5 top-1/2 hidden h-0 w-0 -translate-y-1/2 border-y-[8px] border-l-[10px] border-y-transparent border-l-cic-burgundy md:block"
                aria-hidden="true" />

              }
            </button>);

        })}
      </div>
      <div
        role="tabpanel"
        id={`${uid}-panel-${active}`}
        aria-labelledby={`${uid}-tab-${active}`}
        className="min-w-0 flex-1 space-y-3 text-[14px] leading-relaxed text-cic-ink [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">

        {tab.body}
      </div>
    </div>);

}
