import React, { ReactNode } from 'react';
import { InfoIcon } from 'lucide-react';

/** Money input with a currency prefix; keeps digits and a decimal point only. */
export function MoneyField({
  id,
  label,
  value,
  onChange,
  prefix = 'KES',
  invalid,
  error







}: {id: string;label: ReactNode;value: string;onChange: (v: string) => void;prefix?: string;invalid?: boolean;error?: ReactNode;}) {
  const bad = invalid || Boolean(error);
  return (
    <>
      <label htmlFor={id} className="mt-3 block text-[13px] text-cic-ink">
        {label}
      </label>
      <div
        className={`mt-1 flex items-center border px-3 py-2 text-[14px] focus-within:border-cic-burgundy ${
        bad ? 'border-cic-red' : 'border-cic-line'}`
        }>

        <span className="mr-2">{prefix}</span>
        <input
          id={id}
          inputMode="decimal"
          value={value}
          aria-invalid={bad || undefined}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ''))}
          placeholder="0.00"
          className="w-full bg-transparent text-right italic outline-none placeholder:text-[#9a9a9a]" />

      </div>
      {error &&
      <p className="mt-1 text-[12px] text-cic-red" role="alert">
          {error}
        </p>
      }
    </>);

}

/** Labelled cic-range slider with a red fill up to the current value and min/max captions. */
export function RangeField({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  info = true,
  minLabel,
  maxLabel











}: {id: string;label: ReactNode;value: number;min: number;max: number;step?: number;onChange: (v: number) => void;info?: boolean;minLabel?: ReactNode;maxLabel?: ReactNode;}) {
  const fill = max === min ? 0 : (value - min) / (max - min) * 100;
  return (
    <>
      <div className="mt-3 flex items-center gap-1.5 text-[13px]">
        <label htmlFor={id}>{label}</label>
        {info && <InfoIcon className="h-4 w-4 text-[#0a6ed1]" aria-label="More info" />}
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="cic-range mt-3 w-full"
        style={{ background: `linear-gradient(to right, #AC232D ${fill}%, #DCDCDC ${fill}%)` }} />

      <div className="mt-1 flex justify-between text-[12px]">
        <span>{minLabel ?? min}</span>
        <span>{maxLabel ?? max}</span>
      </div>
    </>);

}

/** Toggle buttons (2–4 options) in Absa's square style. */
export function SegmentedChoice<T extends string>({
  legend,
  options,
  value,
  onChange





}: {legend: ReactNode;options: readonly {value: T;label: ReactNode;}[];value: T;onChange: (v: T) => void;}) {
  const cols = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }[options.length] ?? 'grid-cols-2';
  return (
    <fieldset className="mt-3">
      <legend className="text-[13px] text-cic-ink">{legend}</legend>
      <div className={`mt-1 grid gap-2 ${cols}`}>
        {options.map((o) =>
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`border py-2 text-[13px] font-semibold transition-colors duration-150 ${
          value === o.value ? 'border-cic-red bg-cic-red text-white' : 'border-cic-line text-cic-ink hover:border-cic-red'}`
          }>

            {o.label}
          </button>
        )}
      </div>
    </fieldset>);

}

export type ResultRowData = {label: ReactNode;value: ReactNode;info?: boolean;};

/** Label/value rows (assumptions or breakdown) above the result box. */
export function ResultRows({ rows }: {rows: ResultRowData[];}) {
  return (
    <dl className="mt-2 space-y-1 text-[13px]">
      {rows.map((r, i) =>
      <div key={i} className="flex justify-between">
          <dt className="flex items-center gap-1.5">
            {r.label} {r.info !== false && <InfoIcon className="h-4 w-4 text-[#0a6ed1]" aria-hidden="true" />}
          </dt>
          <dd>{r.value}</dd>
        </div>
      )}
    </dl>);

}
