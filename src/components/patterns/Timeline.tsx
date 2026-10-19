import React from 'react';

export type TimelineEntry = {year: string;title: string;body?: React.ReactNode;};

/** Absa-styled vertical timeline: red semibold year column, square markers on a rule line. */
export function Timeline({ entries }: {entries: TimelineEntry[];}) {
  return (
    <ol className="relative border-l-2 border-cic-line pl-0">
      {entries.map((e) =>
      <li key={`${e.year}-${e.title}`} className="relative grid gap-1 pb-8 pl-8 last:pb-0 sm:grid-cols-[110px_1fr] sm:gap-6">
          <span className="absolute -left-[7px] top-1.5 h-3 w-3 bg-cic-red" aria-hidden="true" />
          <p className="text-[20px] font-semibold leading-tight text-cic-red">{e.year}</p>
          <div>
            <h3 className="text-[16px] font-semibold">{e.title}</h3>
            {e.body && <div className="mt-1 text-[13px] leading-relaxed">{e.body}</div>}
          </div>
        </li>
      )}
    </ol>);

}
