import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

export type Person = {name: string;title: string;bio?: string;group?: string;photo?: string;};

function initials(name: string) {
  return name.
  replace(/^(Dr\.?|Mr\.?|Mrs\.?|Ms\.?|Prof\.?|Hon\.?|Amb\.?|CPA|Eng\.?)\s+/gi, '').
  split(/\s+/).
  filter(Boolean).
  slice(0, 2).
  map((w) => w[0]).
  join('').
  toUpperCase();
}

/** Absa person card: initials in a cic-mist square, name, title, expandable bio. */
export function PersonCard({ name, title, bio }: Person) {
  const [open, setOpen] = useState(false);
  return (
    <li className="flex flex-col bg-white shadow-card">
      <div className="flex items-start gap-4 p-4">
        <span
          className="flex h-16 w-16 shrink-0 items-center justify-center bg-cic-mist text-[20px] font-semibold text-cic-red"
          aria-hidden="true">

          {initials(name)}
        </span>
        <div className="min-w-0">
          <h3 className="text-[16px] font-semibold leading-snug">{name}</h3>
          <p className="mt-1 text-[12px] text-cic-muted">{title}</p>
        </div>
      </div>
      {bio &&
      <>
          {open && <p className="border-t border-cic-line px-4 py-3 text-[12px] leading-relaxed">{bio}</p>}
          <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-auto flex items-center justify-center gap-1 border-t border-cic-line py-2 text-[12px] text-cic-red hover:bg-cic-mist">

            {open ? 'Less' : 'Read bio'}
            <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        </>
      }
    </li>);

}

/** Grid of PersonCards; pass `group` on people to render grouped sub-headings in order of first appearance. */
export function PeopleGrid({ people }: {people: Person[];}) {
  const groups = people.reduce<string[]>((acc, p) => {
    const g = p.group ?? '';
    if (!acc.includes(g)) acc.push(g);
    return acc;
  }, []);
  return (
    <div className="space-y-10">
      {groups.map((g) =>
      <div key={g || 'all'}>
          {g && <h3 className="mb-4 text-[22px] font-semibold">{g}</h3>}
          <ul className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {people.
          filter((p) => (p.group ?? '') === g).
          map((p) =>
          <PersonCard key={`${p.name}-${p.title}`} {...p} />
          )}
          </ul>
        </div>
      )}
    </div>);

}
