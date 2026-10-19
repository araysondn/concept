import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { categories, ProductCategory, Segment } from '../../data/products';

export type AgeBand = 'under60' | 'over60';
export type SentenceFilterState = {segment: Segment;age: AgeBand;category: ProductCategory | '';};

const segmentLabels: Record<Segment, string> = {
  Individual: 'an individual',
  Business: 'a business',
  Corporate: 'a corporate',
  Cooperative: 'a cooperative'
};

function InlineSelect<T extends string>({
  label,
  value,
  onChange,
  options




}: {label: string;value: T;onChange: (v: T) => void;options: {value: T;label: string;}[];}) {
  return (
    <span className="relative inline-flex items-center">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="cursor-pointer appearance-none border-b-2 border-cic-red bg-transparent py-0.5 pl-0.5 pr-6 font-semibold text-cic-red outline-none focus-visible:bg-[#FBECEC]">

        {options.map((o) =>
        <option key={o.value} value={o.value}>
            {o.label}
          </option>
        )}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-0.5 h-4 w-4 text-cic-red" aria-hidden="true" />
    </span>);

}

/** "I am … aged … looking for cover on …" sentence filter (FWD listing pattern, Absa styling). */
export function SentenceFilter({ value, onChange }: {value: SentenceFilterState;onChange: (v: SentenceFilterState) => void;}) {
  return (
    <form
      role="search"
      aria-label="Find products for you"
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-wrap items-center gap-x-3 gap-y-3 bg-white px-6 py-5 text-[16px] shadow-card">

      <span>I am</span>
      <InlineSelect
        label="I am"
        value={value.segment}
        onChange={(segment) => onChange({ ...value, segment })}
        options={(Object.keys(segmentLabels) as Segment[]).map((s) => ({ value: s, label: segmentLabels[s] }))} />

      {value.segment === 'Individual' &&
      <>
          <span>aged</span>
          <InlineSelect<AgeBand>
          label="Age group"
          value={value.age}
          onChange={(age) => onChange({ ...value, age })}
          options={[
          { value: 'under60', label: 'under 60' },
          { value: 'over60', label: '60 or over' }]
          } />

        </>
      }
      <span>looking for cover on</span>
      <InlineSelect<ProductCategory | ''>
        label="Insurance type"
        value={value.category}
        onChange={(category) => onChange({ ...value, category })}
        options={[{ value: '', label: 'any type of cover' }, ...categories.map((c) => ({ value: c, label: c.toLowerCase() }))]} />

    </form>);

}
