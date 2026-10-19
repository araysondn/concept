import React from 'react';
import { PieChartIcon, PlusCircleIcon, FileTextIcon, ClipboardCheckIcon, ShieldCheckIcon } from 'lucide-react';

const tabs = [
{ label: 'Portfolio', Icon: PieChartIcon },
{ label: 'Top up', Icon: PlusCircleIcon },
{ label: 'Statements', Icon: FileTextIcon },
{ label: 'Claims', Icon: ClipboardCheckIcon },
{ label: 'Policies', Icon: ShieldCheckIcon }];


export function MobileTabBar() {
  return (
    <nav aria-label="Self-service" className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 bg-cic-wine text-white md:hidden">
      {tabs.map(({ label, Icon }, i) =>
      <a
        key={label}
        href="#"
        aria-current={i === 0 ? 'page' : undefined}
        className={`flex flex-col items-center gap-1 px-1 py-2 text-center text-[10px] leading-tight ${i === 0 ? 'bg-cic-red' : ''}`}>

          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
        </a>
      )}
    </nav>);

}
