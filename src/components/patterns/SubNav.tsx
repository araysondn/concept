import React from 'react';
import { useLocation } from 'react-router-dom';
import { LinkTarget, SmartLink } from './shared';

/** Absa secondary bar: burgundy strip with white semibold links and a white underline on the active item. */
export function SubNav({ items, label = 'Section', action }: {items: LinkTarget[];label?: string;action?: LinkTarget;}) {
  const { pathname } = useLocation();
  return (
    <div className="flex h-14 items-stretch bg-cic-burgundy text-white">
      <nav aria-label={label} className="flex-1 overflow-x-auto px-5 lg:px-10">
        <ul className="flex h-full items-center gap-8 text-[15px] font-semibold">
          {items.map((item) => {
            const active = item.to === pathname;
            return (
              <li key={item.label} className="relative flex h-full items-center">
                <SmartLink target={item} className="whitespace-nowrap transition-opacity duration-150 hover:opacity-80" />
                {active && <span className="absolute inset-x-0 bottom-2 h-0.5 bg-white" aria-hidden="true" />}
              </li>);

          })}
        </ul>
      </nav>
      {action &&
      <SmartLink
        target={action}
        className="flex items-center whitespace-nowrap bg-cic-wine px-8 text-[15px] font-semibold transition-colors duration-150 hover:bg-black/30" />

      }
    </div>);

}
