import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { amountOptions, horizonOptions, accessOptions } from '../../data/investments';

type Props = {
  amount: string;
  setAmount: (v: string) => void;
  horizon: string;
  setHorizon: (v: string) => void;
  access: string;
  setAccess: (v: string) => void;
  moreOpen: boolean;
  onToggleMore: () => void;
  advancedCount: number;
  count: number;
};

export function HelpMeChoose(p: Props) {
  return (
    <div className="flex flex-col border border-cic-line bg-white lg:flex-row lg:items-stretch">
      <div
        className="flex items-center bg-cic-rose px-6 py-4 text-[14px] font-semibold text-white lg:w-[150px] lg:pr-8"
        style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)' }}>

        Help me choose
      </div>
      <Select id="hmc-amount" label="I plan to invest" value={p.amount} onChange={p.setAmount} options={amountOptions.map((o) => o.label)} />
      <Select id="hmc-horizon" label="for up to" value={p.horizon} onChange={p.setHorizon} options={horizonOptions.map((o) => o.label)} />
      <Select id="hmc-access" label="and want my money" value={p.access} onChange={p.setAccess} options={accessOptions.map((o) => o.label)} />
      <button
        onClick={p.onToggleMore}
        aria-expanded={p.moreOpen}
        aria-controls="investment-filters"
        className="flex items-center justify-between gap-3 border-t border-cic-line px-4 py-3 text-[13px] font-semibold lg:border-l lg:border-t-0">

        More options{p.advancedCount > 0 ? ` (${p.advancedCount})` : ''}
        <ChevronDownIcon className={`h-4 w-4 text-cic-orange transition-transform duration-200 ${p.moreOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <p className="flex items-center justify-center border-t border-cic-line px-4 py-3 text-[13px] text-cic-muted lg:border-l lg:border-t-0" aria-live="polite">
        Showing {p.count} {p.count === 1 ? 'product' : 'products'}
      </p>
    </div>);

}

function Select({ id, label, value, onChange, options }: {id: string;label: string;value: string;onChange: (v: string) => void;options: string[];}) {
  return (
    <div className="relative flex-1 border-t border-cic-line px-4 py-2 lg:border-l lg:border-t-0">
      <label htmlFor={id} className="block text-[12px] text-cic-muted">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-transparent pr-6 text-[13px] font-semibold outline-none">

        {options.map((o) =>
        <option key={o} value={o}>{o}</option>
        )}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute bottom-3 right-4 h-4 w-4 text-cic-orange" aria-hidden="true" />
    </div>);

}
