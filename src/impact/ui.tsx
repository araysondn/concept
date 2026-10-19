import React from 'react';
import { ChevronDownIcon } from 'lucide-react';

/** Numbered step card with segmented progress, as on the Santander sale flow. */
export function StepHeader({ step, total, title }: {step: number;total: number;title: string;}) {
  return (
    <div className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)]">
      <div className="flex h-[50px] items-center px-4">
        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-cic-amber text-[12px] font-bold">{step}</span>
        <h2 className="ml-3 text-[14px] font-bold uppercase tracking-wide">{title}</h2>
        <span className="ml-auto text-[12px]">STEP {step}/{total}</span>
      </div>
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }} aria-hidden="true">
        {Array.from({ length: total }, (_, n) =>
        <span key={n} className={`h-[3px] ${n < step ? 'bg-cic-amber' : 'bg-[#D7D7D7]'}`} />
        )}
      </div>
    </div>);

}

/** Boxed field with the label inside and a coloured bottom rule. */
export function BoxField({ label, error, optional, children, className = '' }: {label: string;error?: string;optional?: boolean;children: React.ReactNode;className?: string;}) {
  return (
    <div className={className}>
      <label className={`block border border-b-[3px] border-b-cic-red bg-[#F8FAFB] px-3 pb-1.5 pt-1 focus-within:border-b-cic-wine ${error ? 'border-cic-red' : 'border-[#C9D6DC]'}`}>
        <span className="block text-[11px] text-cic-muted">
          {label}
          {optional && ' (optional)'}
        </span>
        {children}
      </label>
      {error && <p className="mt-1 text-[12px] text-cic-red">{error}</p>}
    </div>);

}

export const boxInput = 'w-full bg-transparent text-[15px] outline-none placeholder:italic placeholder:text-[#9a9a9a]';

export function BoxSelect({ value, onChange, options, placeholder = 'Select' }: {value: string;onChange: (v: string) => void;options: string[];placeholder?: string;}) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`${boxInput} appearance-none pr-6`}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-0 top-1 h-4 w-4 stroke-[3] text-cic-red" aria-hidden="true" />
    </div>);

}

export const pillSolid = 'inline-flex h-[40px] items-center justify-center gap-2 rounded-full bg-cic-red px-10 text-[13px] font-bold uppercase text-white transition-colors hover:bg-[#8A1B23] disabled:cursor-not-allowed disabled:bg-[#CCCCCC]';
export const pillGhost = 'inline-flex h-[40px] items-center justify-center gap-2 rounded-full border border-cic-muted bg-white px-8 text-[13px] font-bold uppercase text-cic-red transition-colors hover:border-cic-red';
