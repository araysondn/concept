import React from 'react';
import { InvestmentProduct, formatMinimum } from '../../data/investments';

type Props = {product: InvestmentProduct;compared: boolean;compareDisabled: boolean;onToggleCompare: () => void;};

export function FundCard({ product, compared, compareDisabled, onToggleCompare }: Props) {
  return (
    <article className="flex flex-col bg-white p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[19px]">{product.name}</h3>
        <label className={`flex shrink-0 items-center gap-2 text-[12px] font-semibold ${compareDisabled ? 'opacity-50' : 'cursor-pointer'}`}>
          <input type="checkbox" checked={compared} disabled={compareDisabled} onChange={onToggleCompare} className="h-4 w-4 accent-cic-burgundy" />
          Compare
        </label>
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-4">
        {[
        ['Min investment', formatMinimum(product, product.minInvestment)],
        ['Risk level', product.risk],
        ['Earnings', product.earnings]].
        map(([k, v]) =>
        <div key={k}>
            <dt className="text-[11px] text-cic-muted">{k}</dt>
            <dd className="text-[18px] font-semibold">{v}</dd>
          </div>
        )}
      </dl>
      <p className="mt-4 text-[13px] leading-relaxed">{product.body}</p>
      <div className="mt-auto flex gap-3 pt-5">
        <a href="#" className="border border-cic-orange px-5 py-1.5 text-[13px] text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]">
          Tell me more
        </a>
        <a href="#" className="bg-cic-orange px-8 py-1.5 text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]">
          Invest now
        </a>
      </div>
    </article>);

}
