import React from 'react';
import { Link } from 'react-router-dom';
import {
  CarIcon,
  TrophyIcon,
  FileCheckIcon,
  UserRoundIcon,
  MonitorSmartphoneIcon,
  MessagesSquareIcon,
  BookOpenIcon,
  ShieldIcon,
  SmartphoneIcon,
  ArrowLeftRightIcon,
  RadioIcon,
  HeadsetIcon,
  CalendarClockIcon,
  ClipboardCheckIcon,
  WrenchIcon,
  TrendingUpIcon,
  StethoscopeIcon,
  GraduationCapIcon,
  SunsetIcon } from
'lucide-react';

const iconMap = {
  car: CarIcon,
  trophy: TrophyIcon,
  file: FileCheckIcon,
  user: UserRoundIcon,
  monitor: MonitorSmartphoneIcon,
  chat: MessagesSquareIcon,
  guide: BookOpenIcon,
  shield: ShieldIcon,
  phone: SmartphoneIcon,
  switch: ArrowLeftRightIcon,
  status: RadioIcon,
  talk: HeadsetIcon,
  calendar: CalendarClockIcon,
  claim: ClipboardCheckIcon,
  garage: WrenchIcon,
  growth: TrendingUpIcon,
  medical: StethoscopeIcon,
  education: GraduationCapIcon,
  retire: SunsetIcon
};

export type HelpItem = {label: string;icon: keyof typeof iconMap;to?: string;};

type Props = {title: string;items: readonly HelpItem[];};

const linkClass = 'mt-auto pt-6 text-[13px] font-semibold text-cic-burgundy underline hover:text-cic-red';

export function HelpSection({ title, items }: Props) {
  return (
    <section aria-label={title} className="pt-14">
      <h2 className="text-[32px] font-semibold text-cic-ink">{title}</h2>
      <ul className="mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <li key={item.label} className="flex flex-col pr-4">
              <Icon className="h-6 w-6 text-cic-ink" strokeWidth={1.5} aria-hidden="true" />
              <p className="mt-3 text-[14px] font-semibold">{item.label}</p>
              {item.to ?
              <Link to={item.to} className={linkClass}>
                  Tell me more
                </Link> :

              <a href="#" className={linkClass}>
                  Tell me more
                </a>
              }
            </li>);

        })}
      </ul>
    </section>);

}
