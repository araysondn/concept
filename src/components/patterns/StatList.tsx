import React from 'react';

export type Stat = {label: string;value: string;note?: string;};

/** Absa label/value stats (DealCard pattern): small label, large semibold value, divided by rules. */
export function StatList({ stats, columns = 4, inverse = false }: {stats: Stat[];columns?: 2 | 3 | 4;inverse?: boolean;}) {
  const cols = columns === 4 ? 'lg:grid-cols-4' : columns === 3 ? 'lg:grid-cols-3' : '';
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-6 ${cols} ${inverse ? 'text-white' : 'text-cic-ink'}`}>
      {stats.map((s) =>
      <div key={s.label} className={`border-t pt-3 ${inverse ? 'border-white/40' : 'border-cic-line'}`}>
          <dt className={`text-[13px] ${inverse ? 'text-white/85' : 'text-cic-muted'}`}>{s.label}</dt>
          <dd className="mt-1 text-[24px] font-semibold leading-tight">{s.value}</dd>
          {s.note && <dd className={`mt-1 text-[11px] ${inverse ? 'text-white/75' : 'text-cic-muted'}`}>{s.note}</dd>}
        </div>
      )}
    </dl>);

}
