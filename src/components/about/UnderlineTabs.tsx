import React from 'react';

/** Absa underline tabs (as on the Investments "Explore / Compare" switch), wrapping on narrow screens. */
export function UnderlineTabs({
  tabs,
  active,
  onChange,
  label





}: {tabs: string[];active: number;onChange: (i: number) => void;label: string;}) {
  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-x-8 gap-y-3 border-b border-cic-line">
      {tabs.map((t, i) =>
      <button
        key={t}
        role="tab"
        aria-selected={active === i}
        onClick={() => onChange(i)}
        className={`-mb-px border-b-[3px] pb-2 text-[16px] transition-colors duration-150 ${
        active === i ? 'border-cic-red font-semibold text-cic-red' : 'border-transparent hover:text-cic-red'}`
        }>

          {t}
        </button>
      )}
    </div>);

}
