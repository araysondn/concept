import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { investmentProducts, formatMinimum } from '../../data/investments';

type Props = {ids: string[];onChange: (ids: string[]) => void;};

export function CompareView({ ids, onChange }: Props) {
  const setAt = (i: number, id: string) => {
    const next = [...ids];
    next[i] = id;
    onChange(next);
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {ids.map((id, i) => {
        const p = investmentProducts.find((x) => x.id === id) ?? investmentProducts[0];
        return (
          <div key={i} className="flex flex-col">
            <div className="relative">
              <label htmlFor={`cmp-${i}`} className="sr-only">Product {i + 1}</label>
              <select
                id={`cmp-${i}`}
                value={p.id}
                onChange={(e) => setAt(i, e.target.value)}
                className="w-full appearance-none border border-cic-line bg-white px-3 py-2 pr-8 text-[13px] outline-none focus:border-cic-burgundy">

                {investmentProducts.map((o) =>
                <option key={o.id} value={o.id} disabled={o.id !== p.id && ids.includes(o.id)}>
                    {o.name}
                  </option>
                )}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden="true" />
            </div>
            <article className="mt-4 flex flex-1 flex-col bg-white p-6 shadow-card">
              <dl className="space-y-4">
                {[
                ['Min investment', formatMinimum(p, p.minInvestment)],
                ['Min top-up', formatMinimum(p, p.minTopUp)],
                ['Earnings', p.earnings],
                ['Risk level', p.risk],
                ['Access to your money', p.access]].
                map(([k, v]) =>
                <div key={k}>
                    <dt className="text-[11px] text-cic-muted">{k}</dt>
                    <dd className="text-[18px] font-semibold">{v}</dd>
                  </div>
                )}
              </dl>
              <p className="mt-6 border-t border-cic-line pt-6 text-[13px] leading-relaxed">{p.body}</p>
              <div className="mt-auto space-y-3 pt-6">
                <a href="#" className="block bg-cic-orange py-2 text-center text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]">
                  Invest now
                </a>
                <a href="#" className="block border border-cic-orange py-2 text-center text-[13px] font-semibold text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]">
                  Tell me more
                </a>
              </div>
            </article>
          </div>);

      })}
    </div>);

}
