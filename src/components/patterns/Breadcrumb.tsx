import React from 'react';
import { LinkTarget, SmartLink } from './shared';

/** Absa breadcrumb: small red links separated by slashes; the last item is the current page. */
export function Breadcrumb({ items, inverse = false }: {items: LinkTarget[];inverse?: boolean;}) {
  return (
    <nav aria-label="Breadcrumb" className="pt-5 text-[11px]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <React.Fragment key={`${item.label}-${i}`}>
              <li>
                {last ?
                <span aria-current="page" className={inverse ? 'text-white' : ''}>
                    {item.label}
                  </span> :

                <SmartLink target={item} className={`hover:underline ${inverse ? 'text-white' : 'text-cic-red'}`} />
                }
              </li>
              {!last &&
              <li aria-hidden="true" className={inverse ? 'text-white' : ''}>
                  /
                </li>
              }
            </React.Fragment>);

        })}
      </ol>
    </nav>);

}
