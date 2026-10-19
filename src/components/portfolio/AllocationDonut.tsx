import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { PortfolioAccount } from '../../data/portfolio';

type Props = {accounts: PortfolioAccount[];selectedId: string;onSelect: (id: string) => void;};

const R = 110;
const STROKE = 58;
const C = 2 * Math.PI * R;

export function AllocationDonut({ accounts, selectedId, onSelect }: Props) {
  const selected = accounts.find((a) => a.id === selectedId) ?? accounts[0];
  const total = accounts.reduce((s, a) => s + a.share, 0);
  let offset = 0;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[290px]">
      <svg viewBox="0 0 290 290" className="h-full w-full -rotate-90" role="img" aria-label="Portfolio allocation by account">
        {accounts.map((a) => {
          const len = a.share / total * C;
          const seg =
          <circle
            key={a.id}
            cx={145}
            cy={145}
            r={R}
            fill="none"
            stroke={a.color}
            strokeWidth={a.id === selected.id ? STROKE + 6 : STROKE}
            strokeDasharray={`${len - 3} ${C - len + 3}`}
            strokeDashoffset={-offset}
            className="cursor-pointer transition-[stroke-width] duration-150"
            onClick={() => onSelect(a.id)}>
            
              <title>{`${a.name}: ${a.share}%`}</title>
            </circle>;

          offset += len;
          return seg;
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-[15px] font-semibold">{selected.name}</p>
        <p className="mt-1 text-[13px] text-cic-muted">{selected.number}</p>
        <p className={`mt-2 flex items-center gap-1 text-[15px] font-semibold ${selected.gain >= 0 ? 'text-cic-green' : 'text-cic-red'}`}>
          {selected.gain >= 0 ? '+' : ''}
          {selected.gain.toFixed(2)}%
          {selected.gain >= 0 ? <ArrowUpIcon className="h-4 w-4" aria-hidden="true" /> : <ArrowDownIcon className="h-4 w-4" aria-hidden="true" />}
        </p>
      </div>
    </div>);

}