import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpCircleIcon, ArrowDownCircleIcon, PlusCircleIcon, FileTextIcon, BanknoteIcon, ChevronDownIcon } from 'lucide-react';
import { PortfolioAccount } from '../../data/portfolio';

type Props = {
  account: PortfolioAccount;
  selected: boolean;
  expanded: boolean;
  onSelect: () => void;
  onToggle: () => void;
};

const actionMeta = {
  topup: { label: 'Top up', Icon: PlusCircleIcon },
  statements: { label: 'Statements', Icon: FileTextIcon },
  withdraw: { label: 'Withdraw', Icon: BanknoteIcon }
};

export function AccountRow({ account, selected, expanded, onSelect, onToggle }: Props) {
  const up = account.gain >= 0;
  return (
    <li
      className={`border-l-4 border-cic-red bg-white shadow-card ${selected ? 'outline outline-1 outline-cic-burgundy' : ''}`}
      onMouseEnter={onSelect}>
      
      <div className="flex items-stretch">
        <button onClick={onSelect} className="grid flex-1 grid-cols-2 gap-3 px-5 py-4 text-left sm:grid-cols-3">
          <div>
            <p className="text-[14px] font-semibold">{account.name}</p>
            <p className="text-[12px] text-cic-muted">{account.number}</p>
          </div>
          <div>
            <p className="text-[14px] font-semibold">{account.value}</p>
            <p className="text-[12px] text-cic-muted">Fund value</p>
          </div>
          <div className="hidden sm:block">
            <p className={`flex items-center gap-1.5 text-[14px] font-semibold ${up ? 'text-cic-green' : 'text-cic-red'}`}>
              {up ? '+' : ''}
              {account.gain.toFixed(2)}%
              {up ? <ArrowUpCircleIcon className="h-4 w-4" aria-hidden="true" /> : <ArrowDownCircleIcon className="h-4 w-4" aria-hidden="true" />}
            </p>
            <p className="text-[12px] text-cic-muted">Growth (12 months)</p>
          </div>
        </button>
        <div className="hidden items-center gap-6 px-4 lg:flex">
          {account.actions.map((a) => {
            const { label, Icon } = actionMeta[a];
            return (
              <a key={a} href="#" className="flex flex-col items-center gap-1 text-[13px] hover:text-cic-red">
                <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                {label}
              </a>);

          })}
        </div>
        <button
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Less' : 'More'} details for ${account.name}`}
          className="flex w-16 flex-col items-center justify-center gap-1 border-l border-cic-line text-[11px] hover:bg-cic-mist">
          
          {expanded ? 'Less' : 'More'}
          <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {expanded &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden">
          
            <dl className="grid grid-cols-2 gap-4 border-t border-cic-line px-5 py-4 text-[13px] sm:grid-cols-3">
              <div>
                <dt className="text-cic-muted">Interest earned this month</dt>
                <dd className="font-semibold">{account.cash}</dd>
              </div>
              <div>
                <dt className="text-cic-muted">Opened</dt>
                <dd className="font-semibold">{account.opened}</dd>
              </div>
              <div>
                <dt className="text-cic-muted">Last transaction</dt>
                <dd className="font-semibold">{account.lastTrade}</dd>
              </div>
              <div className="col-span-full flex gap-5 lg:hidden">
                {account.actions.map((a) =>
              <a key={a} href="#" className="font-semibold text-cic-red underline">
                    {actionMeta[a].label}
                  </a>
              )}
              </div>
            </dl>
          </motion.div>
        }
      </AnimatePresence>
    </li>);

}