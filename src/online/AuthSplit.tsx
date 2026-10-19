import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { authSlides } from './data';

/** Left-hand photo slideshow used on CIC Online sign-in and registration. */
export function AuthSlideshow() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((n) => (n + 1) % authSlides.length), 5000);
    return () => window.clearInterval(t);
  }, []);
  const s = authSlides[i];

  return (
    <div className="relative hidden h-full min-h-[640px] overflow-hidden bg-[#2a1a17] lg:block">
      {authSlides.map((a, n) =>
      <img key={a.image} src={a.image} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${n === i ? 'opacity-100' : 'opacity-0'}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 p-10 text-white" aria-live="polite">
        <span className="block h-1.5 w-16 bg-cic-amber" aria-hidden="true" />
        <h2 className="mt-4 text-[30px] font-semibold leading-tight">{s.title}</h2>
        <p className="mt-2 max-w-sm text-[15px] text-white/90">{s.body}</p>
        <div className="mt-5 flex gap-2">
          {authSlides.map((a, n) =>
          <button
            key={a.title}
            onClick={() => setI(n)}
            aria-label={`Go to slide ${n + 1}`}
            className={`h-1.5 transition-all duration-300 ${n === i ? 'w-8 bg-cic-amber' : 'w-3 bg-white/50 hover:bg-white/70'}`} />

          )}
        </div>
      </div>
    </div>);

}

export function AuthSplit({ children }: {children: React.ReactNode;}) {
  return (
    <div className="grid min-h-[calc(100vh*var(--vh-fix,1)-104px)] lg:grid-cols-2">
      <AuthSlideshow />
      <div className="flex justify-center px-5 py-12 lg:px-14">{children}</div>
    </div>);

}

// Absa form controls: small bold label, square bordered field, italic placeholder, red error under the field.
export const fieldCls = (err?: string) =>
`mt-1 w-full border bg-white px-3 py-2.5 text-[14px] outline-none placeholder:italic placeholder:text-[#9a9a9a] focus:border-cic-burgundy disabled:bg-cic-mist ${err ? 'border-cic-red' : 'border-cic-line'}`;

export function Field({ id, label, required, optional, error, hint, children }: {id: string;label: string;required?: boolean;optional?: boolean;error?: string;hint?: string;children: React.ReactNode;}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[12px] font-semibold">
        {label}
        {required && <span className="text-cic-red"> *</span>}
        {optional && <span className="font-normal text-cic-muted"> (optional)</span>}
      </label>
      {children}
      {error ? <p className="mt-1 text-[12px] text-cic-red">{error}</p> : hint && <p className="mt-1 text-[12px] text-cic-muted">{hint}</p>}
    </div>);

}

export function SelectField({ id, value, onChange, options, placeholder = 'Select', error }: {id: string;value: string;onChange: (v: string) => void;options: string[];placeholder?: string;error?: string;}) {
  return (
    <div className="relative">
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} className={`${fieldCls(error)} appearance-none pr-9`}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 mt-0.5 h-4 w-4 -translate-y-1/2 text-cic-red" aria-hidden="true" />
    </div>);

}

export const btnSolid = 'inline-flex items-center justify-center gap-2 bg-cic-orange px-8 py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23] disabled:cursor-not-allowed disabled:opacity-50';
export const btnGhost = 'inline-flex items-center justify-center gap-2 border border-cic-orange px-6 py-2.5 text-[14px] text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]';
