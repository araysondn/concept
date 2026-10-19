import React from 'react';
import { ChevronDownIcon } from 'lucide-react';

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  options?: string[];
};

export function FormField({ id, label, value, onChange, error, placeholder, type = 'text', options }: Props) {
  const base = `mt-1 w-full border bg-white px-3 py-2 text-[14px] outline-none focus:border-cic-burgundy ${
  error ? 'border-cic-red' : 'border-cic-line'}`;

  return (
    <div>
      <label htmlFor={id} className="block text-[12px] font-semibold">{label}</label>
      {options ?
      <div className="relative">
          <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={`${base} appearance-none pr-9`} aria-invalid={Boolean(error)}>
            <option value="">Select</option>
            {options.map((o) =>
          <option key={o} value={o}>{o}</option>
          )}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cic-red" aria-hidden="true" />
        </div> :

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={`${base} placeholder:italic placeholder:text-[#9a9a9a]`} />

      }
      {error && <p className="mt-1 text-[12px] text-cic-red">{error}</p>}
    </div>);

}