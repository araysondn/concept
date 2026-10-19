import React, { useEffect, useRef, useState } from 'react';
import { CheckIcon, ChevronDownIcon, ExternalLinkIcon } from 'lucide-react';
import { Flag } from './Flags';
import type { CountryCode } from './Flags';

const countries: {code: CountryCode;name: string;href?: string;}[] = [
{ code: 'KE', name: 'Kenya' },
{ code: 'UG', name: 'Uganda', href: 'https://ug.cicinsurancegroup.com/' },
{ code: 'MW', name: 'Malawi', href: 'https://mw.cicinsurancegroup.com/' },
{ code: 'SS', name: 'South Sudan', href: 'https://ss.cicinsurancegroup.com/' }];


/** Absa-style country picker: this site is Kenya; the others open the subsidiary sites. */
export function CountrySwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Choose your country. Current: Kenya"
        className="flex items-center gap-2 transition-colors duration-150 hover:text-cic-red">

        <Flag code="KE" />
        <span className="hidden xl:inline">Kenya</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open &&
      <div className="absolute right-0 top-full z-40 mt-3 w-64 bg-white py-2 text-cic-ink shadow-[0_6px_24px_rgba(0,0,0,0.18)]">
          <p className="px-4 pb-2 pt-1 text-[12px] font-semibold uppercase tracking-wide text-cic-muted">Choose your country</p>
          <ul>
            {countries.map((c) =>
          <li key={c.code}>
                {c.href ?
            <a href={c.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2.5 text-[14px] hover:bg-[#FBECEC]">
                    <Flag code={c.code} />
                    <span className="flex-1">{c.name}</span>
                    <ExternalLinkIcon className="h-3.5 w-3.5 text-cic-muted" aria-hidden="true" />
                  </a> :

            <span className="flex items-center gap-3 bg-cic-mist px-4 py-2.5 text-[14px] font-semibold" aria-current="true">
                    <Flag code={c.code} />
                    <span className="flex-1">{c.name}</span>
                    <CheckIcon className="h-4 w-4 text-cic-red" aria-hidden="true" />
                  </span>
            }
              </li>
          )}
          </ul>
        </div>
      }
    </div>);

}
