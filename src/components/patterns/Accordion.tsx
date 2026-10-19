import React from 'react';
import { ChevronDownIcon } from 'lucide-react';

export type AccordionItem = {title: string;body: React.ReactNode;};

/** Absa accordion (native details/summary): white shadow-card rows with red-left accent when open. */
export function Accordion({ items, defaultOpen = -1 }: {items: AccordionItem[];defaultOpen?: number;}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) =>
      <details
        key={item.title}
        open={i === defaultOpen}
        className="group border-l-4 border-transparent bg-white shadow-card open:border-cic-red">

          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
            {item.title}
            <ChevronDownIcon
            className="h-5 w-5 shrink-0 text-cic-red transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true" />

          </summary>
          <div className="space-y-3 border-t border-cic-line px-5 py-4 text-[14px] leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
            {item.body}
          </div>
        </details>
      )}
    </div>);

}
