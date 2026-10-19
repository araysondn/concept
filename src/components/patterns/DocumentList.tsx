import React from 'react';
import { DownloadIcon, FileTextIcon } from 'lucide-react';

export type DocumentItem = {
  title: string;
  date?: string;
  category?: string;
  /** e.g. "PDF · 1.2 MB" */
  meta?: string;
  href?: string;
  /** Status pill text for tenders (e.g. "Open", "Closed"). */
  status?: string;
};

/** Absa document list: white shadow-card rows with file icon, title, date/category meta and a download link. */
export function DocumentList({ items, empty }: {items: DocumentItem[];empty?: React.ReactNode;}) {
  if (items.length === 0) {
    return <div className="bg-cic-mist px-6 py-10 text-center text-[14px]">{empty ?? 'No documents available.'}</div>;
  }
  return (
    <ul className="divide-y divide-cic-line bg-white shadow-card">
      {items.map((d) => {
        const external = Boolean(d.href && /^https?:/.test(d.href));
        return (
          <li key={`${d.title}-${d.date ?? ''}-${d.href ?? ''}`}className="flex items-center gap-4 px-5 py-4">
            <FileTextIcon className="h-6 w-6 shrink-0 text-cic-red" strokeWidth={1.5} aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold">{d.title}</p>
              <p className="mt-0.5 text-[12px] text-cic-muted">
                {[d.category, d.date, d.meta].filter(Boolean).join(' · ')}
              </p>
            </div>
            {d.status &&
            <span
              className={`hidden shrink-0 px-2 py-0.5 text-[11px] font-semibold sm:inline ${
              /open|active/i.test(d.status) ? 'bg-[#E6F4E8] text-cic-green' : 'bg-cic-mist text-cic-muted'}`
              }>

                {d.status}
              </span>
            }
            {d.href && d.href !== '#' ?
            <a
              href={d.href}
              {...external ? { target: '_blank', rel: 'noreferrer' } : {}}
              className="flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-cic-orange hover:underline"
              aria-label={`Download ${d.title}`}>

                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Download</span>
              </a> :

            <span className="shrink-0 text-[12px] text-cic-muted">Not available</span>
            }
          </li>);

      })}
    </ul>);

}
