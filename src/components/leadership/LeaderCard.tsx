import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import type { Person } from '../patterns';

export function initials(name: string) {
  return name.
  replace(/^(Dr|Mr|Mrs|Ms|Prof)\.?\s+/i, '').
  split(/\s+/).
  filter(Boolean).
  slice(0, 2).
  map((w) => w[0]).
  join('').
  toUpperCase();
}

/** Square portrait, or initials on cic-mist when there is no photo. */
export function Portrait({ person, className = '' }: {person: Person;className?: string;}) {
  return person.photo ?
  <img src={person.photo} alt="" loading="lazy" className={`aspect-square w-full bg-cic-mist object-cover object-top ${className}`} /> :

  <span
    className={`flex aspect-square w-full items-center justify-center bg-cic-mist text-[40px] font-semibold text-cic-red ${className}`}
    aria-hidden="true">

      {initials(person.name)}
    </span>;

}

/** Britam-style leader card in Absa styling: square photo, name, title; opens the profile. */
export function LeaderCard({ person, onOpen }: {person: Person;onOpen: () => void;}) {
  return (
    <li>
      <button
        onClick={onOpen}
        className="group flex h-full w-full flex-col bg-white text-left shadow-card transition-shadow duration-150 hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cic-red">

        <span className="block overflow-hidden">
          <Portrait person={person} className="transition-transform duration-300 group-hover:scale-[1.03]" />
        </span>
        <span className="flex flex-1 flex-col border-t-4 border-cic-red px-4 pb-4 pt-3">
          <span className="text-[16px] font-semibold leading-snug">{person.name}</span>
          <span className="mt-1 text-[13px] leading-snug text-cic-muted">{person.title}</span>
          <span className="mt-auto flex items-center gap-1 pt-3 text-[13px] font-semibold text-cic-orange group-hover:underline">
            View profile <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </span>
      </button>
    </li>);

}
