import React from 'react';
import { CheckIcon } from 'lucide-react';
import { registerSteps } from '../../data/register';

type Props = {current: number;onSelect: (i: number) => void;};

export function RegisterStepper({ current, onSelect }: Props) {
  return (
    <nav aria-label="Registration progress">
      <ol className="flex gap-6 overflow-x-auto md:flex-col md:gap-0">
        {registerSteps.map((s, i) => {
          const isCurrent = i === current;
          const isDone = i < current;
          return (
            <li key={s.label} className="relative flex shrink-0 gap-3 md:pb-6">
              {i < registerSteps.length - 1 &&
              <span className="absolute left-[11px] top-7 hidden h-[calc(100%-28px)] w-px bg-cic-line md:block" aria-hidden="true" />
              }
              <button
                onClick={() => onSelect(i)}
                disabled={!isDone}
                aria-current={isCurrent ? 'step' : undefined}
                className="flex items-start gap-3 text-left disabled:cursor-default">
                
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] ${
                  isCurrent ?
                  'bg-cic-red text-white' :
                  isDone ?
                  'bg-cic-burgundy text-white' :
                  'border border-cic-muted text-cic-muted'}`
                  }>
                  
                  {isDone ? <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                </span>
                <span>
                  <span className={`block text-[15px] ${isCurrent ? 'font-semibold text-cic-red' : 'text-cic-ink'}`}>{s.label}</span>
                  {isCurrent && <span className="mt-1 block text-[13px] text-cic-red">{s.sub}</span>}
                </span>
              </button>
            </li>);

        })}
      </ol>
    </nav>);

}