import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  /** Show in the collapsed mobile card summary (first column is always the title). */
  summary?: boolean;
};

type Props<T> = {
  rows: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  caption?: string;
  empty?: React.ReactNode;
};

/** Absa data table (ActiveTrades pattern): white shadow-card table on desktop, expandable cards on phones. */
export function DataTable<T>({ rows, columns, rowKey, caption, empty }: Props<T>) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  if (rows.length === 0) {
    return <div className="bg-cic-mist px-6 py-10 text-center text-[14px]">{empty ?? 'Nothing to show right now.'}</div>;
  }
  const [first, ...rest] = columns;
  return (
    <>
      <div className="hidden bg-white shadow-card md:block">
        <table className="w-full text-left text-[13px]">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="border-b border-cic-line">
              {columns.map((c) =>
              <th key={c.key} scope="col" className="px-5 py-4 font-semibold">
                  {c.header}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) =>
            <tr key={rowKey(r)} className="border-b border-cic-line align-top last:border-0">
                {columns.map((c) =>
              <td key={c.key} className="px-5 py-4">
                    {c.render(r)}
                  </td>
              )}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ul className="space-y-3 md:hidden">
        {rows.map((r) => {
          const k = rowKey(r);
          const open = openKey === k;
          return (
            <li key={k} className="bg-white p-4 shadow-card">
              <button
                onClick={() => setOpenKey(open ? null : k)}
                aria-expanded={open}
                className="flex w-full items-start justify-between gap-3 text-left">

                <span className="min-w-0 text-[14px] font-semibold">{first.render(r)}</span>
                <span className="flex shrink-0 items-center gap-1 text-[12px] text-cic-red">
                  {open ? 'Less' : 'More'}
                  <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                </span>
              </button>
              {rest.
              filter((c) => c.summary).
              map((c) =>
              <div key={c.key} className="mt-1 text-[13px]">
                    {c.render(r)}
                  </div>
              )}
              {open &&
              <dl className="mt-3 space-y-2 border-t border-cic-line pt-3 text-[13px]">
                  {rest.
                filter((c) => !c.summary).
                map((c) =>
                <div key={c.key}>
                        <dt className="font-semibold">{c.header}</dt>
                        <dd>{c.render(r)}</dd>
                      </div>
                )}
                </dl>
              }
            </li>);

        })}
      </ul>
    </>);

}
