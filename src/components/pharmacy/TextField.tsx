import React from 'react';

/** Plain text input in the calculator kit's field style. */
export function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete
}: {id: string;label: string;value: string;onChange: (v: string) => void;type?: 'text' | 'tel';placeholder?: string;autoComplete?: string;}) {
  return (
    <>
      <label htmlFor={id} className="mt-3 block text-[13px] text-cic-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-1 w-full border border-cic-line px-3 py-2 text-[14px] outline-none placeholder:italic placeholder:text-[#9a9a9a] focus:border-cic-burgundy" />

    </>);

}
