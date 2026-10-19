import React from 'react';
import { XIcon } from 'lucide-react';
import { riskLevels, productTypes, currencies, featureOptions } from '../../data/investments';
import { AdvancedFilters } from '../../hooks/useFundFilters';

type Props = {value: AdvancedFilters;onChange: (v: AdvancedFilters) => void;onClear: () => void;};

export function FilterPanel({ value, onChange, onClear }: Props) {
  const radioGroup = (name: keyof Omit<AdvancedFilters, 'features'>, title: string, options: string[]) =>
  <fieldset>
      <legend className="text-[13px] font-semibold">{title}</legend>
      <ul className="mt-3 space-y-2.5">
        {options.map((o) =>
      <li key={o}>
            <label className="flex cursor-pointer items-center gap-2.5 text-[13px]">
              <input
            type="radio"
            name={name}
            checked={value[name] === o}
            onChange={() => onChange({ ...value, [name]: o })}
            onClick={() => value[name] === o && onChange({ ...value, [name]: '' })}
            className="h-3.5 w-3.5 accent-cic-red" />

              {o}
            </label>
          </li>
      )}
      </ul>
    </fieldset>;


  return (
    <div id="investment-filters" className="border border-t-0 border-cic-line bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[18px]">Filter by</h3>
        <button onClick={onClear} className="flex items-center gap-1 text-[15px] text-cic-orange hover:underline">
          Clear all <XIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_2fr]">
        {radioGroup('risk', 'Risk level', riskLevels)}
        {radioGroup('type', 'Product type', productTypes)}
        {radioGroup('currency', 'Currency', currencies)}
        <fieldset>
          <legend className="text-[13px] font-semibold">Features and benefits</legend>
          <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {featureOptions.map((f) =>
            <li key={f}>
                <label className="flex cursor-pointer items-center gap-2.5 text-[13px]">
                  <input
                  type="checkbox"
                  checked={value.features.includes(f)}
                  onChange={() =>
                  onChange({
                    ...value,
                    features: value.features.includes(f) ? value.features.filter((x) => x !== f) : [...value.features, f]
                  })
                  }
                  className="h-4 w-4 accent-cic-ink" />

                  {f}
                </label>
              </li>
            )}
          </ul>
        </fieldset>
      </div>
    </div>);

}
