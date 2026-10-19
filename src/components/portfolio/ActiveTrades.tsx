import React, { useState } from 'react';
import { ArrowUpCircleIcon, ArrowDownCircleIcon, ChevronDownIcon } from 'lucide-react';
import { activeTrades, Trade } from '../../data/portfolio';

export function ActiveTrades() {
  const [statusById, setStatusById] = useState<Record<string, string>>({});
  const [openId, setOpenId] = useState<string | null>(activeTrades[0].id);

  const statusOf = (t: Trade) => statusById[t.id] ?? t.status;
  const isDone = (t: Trade) => Boolean(statusById[t.id]);
  const act = (t: Trade) =>
  setStatusById((s) => ({ ...s, [t.id]: t.action === 'cancel' ? 'Cancelled' : 'Withdrawal requested' }));

  const buttons = (t: Trade, full = false) =>
  <div className={`flex gap-3 ${full ? 'w-full' : ''}`}>
      <button
      disabled={isDone(t)}
      className={`border border-cic-orange px-4 py-1 text-[12px] text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC] disabled:cursor-not-allowed disabled:opacity-40 ${full ? 'flex-1 py-2' : ''}`}>
      
        Top up
      </button>
      <button
      onClick={() => act(t)}
      disabled={isDone(t)}
      className={`border border-cic-orange px-5 py-1 text-[12px] text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC] disabled:cursor-not-allowed disabled:opacity-40 ${full ? 'flex-1 py-2' : ''}`}>
      
        {t.action === 'cancel' ? 'Cancel' : 'Withdraw'}
      </button>
    </div>;


  const gain = (t: Trade) =>
  <span className={`inline-flex items-center gap-1.5 ${t.up ? 'text-cic-green' : 'text-cic-red'}`}>
      {t.gain}
      {t.up ? <ArrowUpCircleIcon className="h-4 w-4" aria-hidden="true" /> : <ArrowDownCircleIcon className="h-4 w-4" aria-hidden="true" />}
    </span>;


  return (
    <section aria-labelledby="trades-title" className="pt-14">
      <h2 id="trades-title" className="text-[24px] font-semibold">Recent transactions</h2>

      <div className="mt-5 hidden bg-white shadow-card md:block">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-cic-line">
              {['Fund', 'Amount invested', 'Current value', 'Growth', 'Status', 'Instructions'].map((h) =>
              <th key={h} scope="col" className="px-5 py-4 font-semibold">
                  {h}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {activeTrades.map((t) =>
            <tr key={t.id} className="border-b border-cic-line last:border-0">
                <td className="px-5 py-4">
                  <p>{t.name}</p>
                  <p className="text-cic-muted">{t.code}</p>
                </td>
                <td className="px-5 py-4">
                  <p>{t.purchaseTotal} <span className="ml-1">total</span></p>
                  <p className="text-cic-muted">{t.purchasePerShare} <span className="ml-1">per unit</span></p>
                </td>
                <td className="px-5 py-4">
                  <p>{t.currentTotal} <span className="ml-1">total</span></p>
                  <p className="text-cic-muted">{t.currentPerShare} <span className="ml-1">per unit</span></p>
                </td>
                <td className="px-5 py-4">{gain(t)}</td>
                <td className="px-5 py-4">
                  <p className={isDone(t) ? 'font-semibold text-cic-red' : ''}>{statusOf(t)}</p>
                  <p className="text-cic-muted">{t.account}</p>
                </td>
                <td className="px-5 py-4">{buttons(t)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ul className="mt-5 space-y-3 md:hidden">
        {activeTrades.map((t) => {
          const open = openId === t.id;
          return (
            <li key={t.id} className="bg-white p-4 shadow-card">
              <button
                onClick={() => setOpenId(open ? null : t.id)}
                aria-expanded={open}
                className="flex w-full items-start justify-between text-left">
                
                <span>
                  <span className="block text-[14px] font-semibold">
                    {t.name} <span className="font-normal text-cic-muted">{t.code}</span>
                  </span>
                  <span className="mt-1 block text-[13px]">{statusOf(t)} · {t.account}</span>
                </span>
                <span className="flex items-center gap-1 text-[12px] text-cic-red">
                  {open ? 'Less' : 'More'}
                  <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                </span>
              </button>
              <p className="mt-2 text-[13px]">{gain(t)}</p>
              {open &&
              <div className="mt-3 space-y-3 border-t border-cic-line pt-3 text-[13px]">
                  <p><span className="font-semibold">Invested:</span> {t.purchaseTotal} ({t.purchasePerShare} per unit)</p>
                  <p><span className="font-semibold">Current:</span> {t.currentTotal} ({t.currentPerShare} per unit)</p>
                  {buttons(t, true)}
                </div>
              }
            </li>);

        })}
      </ul>

      <p className="mt-4 text-[12px]">
        <span className="font-semibold">Note:</span> Unit prices are updated daily. Values shown are indicative until the transaction is confirmed
        on your statement.
      </p>
    </section>);

}