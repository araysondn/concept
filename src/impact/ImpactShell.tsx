import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart3Icon, BellIcon, ChevronDownIcon, ChevronUpIcon, ClipboardCheckIcon, FileTextIcon, HelpCircleIcon,
  HomeIcon, LogOutIcon, PlusCircleIcon, SearchIcon, UsersIcon, WalletIcon } from
'lucide-react';
import { mainMenu, provider, workMenu } from './data';
import type { MenuItem } from './data';

const icons: Record<string, typeof HomeIcon> = {
  home: HomeIcon,
  search: SearchIcon,
  plus: PlusCircleIcon,
  claims: FileTextIcon,
  preauth: ClipboardCheckIcon,
  payments: WalletIcon,
  members: UsersIcon,
  reports: BarChart3Icon
};

type Account = {name: string;sub: string;initials: string;};

const sampleAccount: Account = { name: provider.name, sub: `${provider.number} · ${provider.town}`, initials: provider.initials };

function Header({ title, account }: {title: string;account: Account;}) {
  const navigate = useNavigate();
  return (
    <header className="flex h-[60px] items-stretch bg-cic-red text-white">
      <div className="flex items-center pl-5">
        <Link to="/impact/dashboard" className="flex items-center gap-3" aria-label="Impact home">
          <img src="/cic-logo.png" alt="" className="h-8 w-auto brightness-0 invert" />
          <span className="text-[20px] font-bold tracking-tight">Impact</span>
        </Link>
        <span className="mx-5 h-8 w-px bg-white/70" aria-hidden="true" />
        <h1 className="text-[16px] font-semibold">{title}</h1>
      </div>
      <div className="ml-auto flex items-center gap-6 pr-5">
        <button aria-label="Notifications, 3 new" className="relative transition-opacity hover:opacity-80">
          <BellIcon className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-cic-amber" />
        </button>
        <button aria-label="Help" className="transition-opacity hover:opacity-80">
          <HelpCircleIcon className="h-5 w-5" />
        </button>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[12px] font-bold text-cic-red" title={account.name}>
          {account.initials}
        </span>
      </div>
      <button
        onClick={() => navigate('/impact/login')}
        aria-label="Log out"
        className="flex w-[60px] items-center justify-center bg-[#444] transition-colors hover:bg-[#333]">

        <LogOutIcon className="h-5 w-5" />
      </button>
    </header>);

}

function Row({ item, open, active, onToggle }: {item: MenuItem;open?: boolean;active?: boolean;onToggle?: () => void;}) {
  const Icon = icons[item.icon];
  const cls = `relative flex h-[34px] w-full items-center pl-4 pr-4 text-[14px] text-cic-ink transition-colors hover:bg-black/5 ${active ? 'bg-[#EDEDED]' : ''}`;
  const body =
  <>
      {item.color && <span className="absolute bottom-0 left-0 top-0 w-[4px]" style={{ backgroundColor: item.color }} />}
      <Icon className="h-[18px] w-[18px] stroke-[1.5] text-cic-red" aria-hidden="true" />
      <span className={`ml-4 ${open || active ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
      {item.submenu && (open ?
    <ChevronUpIcon className="ml-auto h-4 w-4 stroke-[3] text-cic-red" aria-hidden="true" /> :
    <ChevronDownIcon className="ml-auto h-4 w-4 stroke-[3] text-cic-red" aria-hidden="true" />)}
    </>;

  if (item.submenu) return <button onClick={onToggle} aria-expanded={open} className={cls}>{body}</button>;
  return item.to ? <Link to={item.to} className={cls}>{body}</Link> : <a href="#" className={cls}>{body}</a>;
}

function Sidebar({ active, account }: {active: string;account: Account;}) {
  const [open, setOpen] = useState<string | null>('Claims');
  return (
    <nav aria-label="Impact menu" className="hidden w-[240px] shrink-0 border-r border-cic-line bg-white py-3 md:block">
      <p className="mb-1 px-4 text-[11px] text-cic-muted">Menu</p>
      {mainMenu.map((m) => <Row key={m.label} item={m} active={m.label === active} />)}
      <div className="mx-4 my-2 border-t border-cic-line" />
      <p className="mb-1 px-4 text-[11px] text-cic-muted">Workspace</p>
      {workMenu.map((m) =>
      <React.Fragment key={m.label}>
          <Row item={m} open={open === m.label} onToggle={() => setOpen(open === m.label ? null : m.label)} />
          {open === m.label &&
        <ul className="mb-1">
              {m.submenu!.map((s) =>
          <li key={s.label}>
                  {s.to ?
            <Link to={s.to} className="block h-[32px] pl-[52px] text-[13px] leading-[32px] text-cic-ink transition-colors hover:bg-black/5">{s.label}</Link> :
            <a href="#" className="block h-[32px] pl-[52px] text-[13px] leading-[32px] text-cic-ink transition-colors hover:bg-black/5">{s.label}</a>}
                </li>
          )}
            </ul>
        }
        </React.Fragment>
      )}
      <div className="mx-4 my-2 border-t border-cic-line" />
      <div className="px-4 py-2 text-[12px] leading-relaxed text-cic-muted">
        <p className="font-semibold text-cic-ink">{account.name}</p>
        <p>{account.sub}</p>
      </div>
    </nav>);

}

/** Impact signed-in shell: red title bar, coloured section menu, pale canvas. */
export function ImpactShell({ title, active, account = sampleAccount, children }: {title: string;active: string;account?: Account;children: React.ReactNode;}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F3F6F8] text-cic-ink">
      <Header title={title} account={account} />
      <div className="flex flex-1">
        <Sidebar active={active} account={account} />
        <main className="flex-1 px-5 py-6 lg:px-8">{children}</main>
      </div>
    </div>);

}

/** White card with the soft single-pixel shadow used across Impact. */
export const card = 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12)]';
