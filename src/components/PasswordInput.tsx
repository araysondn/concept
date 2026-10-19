import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type Props = {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
};

export function PasswordInput({ id, value, onChange, placeholder, invalid, describedBy }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`mt-1 flex items-center border bg-white focus-within:border-cic-burgundy ${
      invalid ? 'border-cic-red' : 'border-cic-line'}`
      }>
      
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className="w-full bg-transparent px-3 py-2 text-[14px] outline-none placeholder:italic placeholder:text-[#9a9a9a]" />
      
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="px-3 text-cic-ink hover:text-cic-red">
        
        {show ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
      </button>
    </div>);

}