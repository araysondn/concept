import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BellIcon, CheckCircle2Icon, CheckIcon, ChevronDownIcon, CircleIcon, GripIcon, HelpCircleIcon, LayoutGridIcon, LogOutIcon,
  MenuIcon, SearchIcon, Share2Icon, UserIcon, XIcon } from
'lucide-react';
import { CicLogo } from '../components/CicLogo';
import { BrandStripe } from '../components/BrandStripe';
import { footerLinks, me, nav, roles } from './data';
import { setRole, toast, useRole, useToasts } from './role';

export const container = 'mx-auto max-w-[1440px] px-5 lg:px-[100px]';

/** Close a popover on outside click or Escape. */
function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  useEffect(() => {
    if (!open) return;
    const on = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', on);
    document.addEventListener('keydown', on);
    return () => {document.removeEventListener('mousedown', on);document.removeEventListener('keydown', on);};
  }, [open, close]);
  return ref;
}

function AccountMenu() {
  const role = useRole();
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const pick = (id: typeof roles[number]['id']) => {
    setOpen(false);
    if (id === role.id) return;
    setRole(id);
    toast(`You're now viewing as ${roles.find((r) => r.id === id)!.name}`, 'Tasks and approvals update to match this role');
  };

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu" aria-label={`Account and role: ${me.name}, ${role.name}`} className="flex h-12 items-center gap-2.5 px-3 transition-colors hover:bg-black/10">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[12px] font-bold text-cic-red">{me.initials}</span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-[13px] font-semibold">{me.name}</span>
          <span className="block text-[11px] text-white/85">{role.name}</span>
        </span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open &&
      <div role="menu" className="absolute right-0 top-full z-50 w-[320px] bg-white text-cic-ink shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
          <div className="flex items-center gap-3 border-b border-cic-line p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cic-red text-[14px] font-bold text-white">{me.initials}</span>
            <span className="min-w-0 leading-tight">
              <span className="block text-[15px] font-semibold">{me.fullName}</span>
              <span className="block truncate text-[12px] text-cic-muted">{me.email}</span>
              <span className="block text-[12px] text-cic-muted">{me.where}</span>
            </span>
          </div>
          <div role="group" aria-label="Switch role" className="max-h-[300px] overflow-y-auto border-b border-cic-line py-2">
            <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-wide text-cic-muted">Switch role</p>
            {roles.map((r) =>
          <button key={r.id} role="menuitemradio" aria-checked={r.id === role.id} onClick={() => pick(r.id)} className="flex w-full items-start gap-3 px-4 py-2 text-left hover:bg-cic-mist">
                {r.id === role.id ?
            <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-cic-red" aria-hidden="true" /> :
            <CircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-cic-line" aria-hidden="true" />}
                <span>
                  <span className={`block text-[13px] ${r.id === role.id ? 'font-semibold text-cic-red' : 'font-semibold'}`}>{r.name}</span>
                  <span className="block text-[12px] text-cic-muted">{r.desc}</span>
                </span>
              </button>
          )}
          </div>
          <div className="py-1">
            <button role="menuitem" onClick={() => {setOpen(false);toast('Profile opens in Delve');}} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] hover:bg-cic-mist">
              <UserIcon className="h-4 w-4 text-cic-red" aria-hidden="true" /> View profile
            </button>
            <button role="menuitem" onClick={() => {setOpen(false);toast('Sign out is disabled in this prototype');}} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] hover:bg-cic-mist">
              <LogOutIcon className="h-4 w-4 text-cic-red" aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>
      }
    </div>);

}

/** Microsoft 365 suite bar: app launcher, site name, search, alerts, help and the account menu. */
function SuiteBar() {
  return (
    <div className="flex h-12 items-stretch bg-cic-red text-white">
      <button aria-label="App launcher" onClick={() => toast('App launcher opens Microsoft 365 apps')} className="flex w-12 items-center justify-center bg-black/15 transition-colors hover:bg-black/25">
        <GripIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <Link to="/intranet" className="flex items-center px-4 text-[15px] font-semibold hover:underline">CIC Intranet</Link>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="mx-auto hidden w-full max-w-[560px] items-center self-center bg-white px-3 text-cic-ink md:flex">
        <SearchIcon className="h-4 w-4 text-cic-muted" aria-hidden="true" />
        <label htmlFor="intranet-search" className="sr-only">Search the intranet</label>
        <input id="intranet-search" placeholder="Search the intranet…" className="w-full bg-transparent px-2 py-1.5 text-[14px] outline-none placeholder:text-cic-muted" />
      </form>
      <div className="ml-auto flex items-stretch md:ml-0">
        <button aria-label="Notifications" onClick={() => toast('No new notifications')} className="relative flex w-12 items-center justify-center transition-colors hover:bg-black/10">
          <BellIcon className="h-[18px] w-[18px]" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-white" />
        </button>
        <button aria-label="Help" onClick={() => toast('Help opens the IT helpdesk')} className="hidden w-12 items-center justify-center transition-colors hover:bg-black/10 sm:flex">
          <HelpCircleIcon className="h-[18px] w-[18px]" />
        </button>
        <AccountMenu />
      </div>
    </div>);

}

function NavDropdown({ item, active }: {item: typeof nav[number];active: boolean;}) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  return (
    <li ref={ref} className="relative flex items-stretch">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="true" className={`flex items-center gap-1 border-b-[3px] px-1 text-[14px] transition-colors ${active ? 'border-cic-red font-semibold' : 'border-transparent hover:text-cic-red'}`}>
        {item.label}
        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open &&
      <ul className="absolute left-0 top-full z-40 mt-px min-w-[240px] bg-white py-2 text-[14px] shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
          {item.children!.map((c) =>
        <li key={c.label}>
              <a href="#" onClick={() => setOpen(false)} className="block border-l-4 border-transparent px-4 py-2.5 transition-colors hover:border-cic-red hover:bg-cic-mist">{c.label}</a>
            </li>
        )}
          <li className="mt-1 border-t border-cic-line pt-1">
            <a href="#" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 font-semibold text-cic-red hover:bg-cic-mist">
              <LayoutGridIcon className="h-4 w-4" aria-hidden="true" /> {item.allLabel}
            </a>
          </li>
        </ul>
      }
    </li>);

}

/** SharePoint hub header: site logo and title, follow and share, then the hub tabs. */
function SiteHeader() {
  const { pathname } = useLocation();
  const [following, setFollowing] = useState(true);
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [pathname]);
  const isActive = (to?: string) => Boolean(to && (to === '/intranet' ? pathname === to : pathname.startsWith(to)));

  const share = () => {
    const url = window.location.href;
    (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).
    then(() => toast('Link copied', 'Paste it into Teams or email'), () => toast('Copy this link', url));
  };

  return (
    <div className="border-b border-cic-line bg-white">
      <div className={`${container} flex items-center gap-4 pt-5`}>
        <CicLogo className="h-12" to="/intranet" />
        <div className="leading-tight">
          <p className="text-[22px] font-semibold">CIC Group</p>
          <p className="text-[13px] text-cic-muted">Staff intranet</p>
        </div>
        <div className="ml-auto flex items-center gap-5 text-[14px]">
          <button
            onClick={() => {setFollowing((f) => !f);toast(following ? 'You unfollowed CIC Intranet' : 'You’re following CIC Intranet');}}
            aria-pressed={following}
            className="hidden items-center gap-1.5 transition-colors hover:text-cic-red sm:flex">

            {following ? <CheckCircle2Icon className="h-4 w-4 text-cic-red" aria-hidden="true" /> : <CircleIcon className="h-4 w-4" aria-hidden="true" />}
            {following ? 'Following' : 'Follow'}
          </button>
          <button onClick={share} className="hidden items-center gap-1.5 transition-colors hover:text-cic-red sm:flex">
            <Share2Icon className="h-4 w-4" aria-hidden="true" /> Share
          </button>
          <button onClick={() => setMenu((m) => !m)} aria-expanded={menu} className="flex items-center gap-1.5 font-semibold text-cic-burgundy md:hidden">
            {menu ? <XIcon className="h-6 w-6" aria-hidden="true" /> : <MenuIcon className="h-6 w-6" aria-hidden="true" />} Menu
          </button>
        </div>
      </div>

      <nav aria-label="Hub navigation" className={`${container} mt-3 hidden md:block`}>
        <ul className="flex h-11 items-stretch gap-6">
          {nav.map((item) =>
          item.children ?
          <NavDropdown key={item.label} item={item} active={false} /> :

          <li key={item.label} className="flex items-stretch">
                <Link
              to={item.to!}
              aria-current={isActive(item.to) ? 'page' : undefined}
              className={`flex items-center border-b-[3px] px-1 text-[14px] transition-colors ${isActive(item.to) ? 'border-cic-red font-semibold' : 'border-transparent hover:text-cic-red'}`}>

                  {item.label}
                </Link>
              </li>

          )}
        </ul>
      </nav>

      {menu &&
      <div className={`${container} pb-5 md:hidden`}>
          <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-4 flex items-center border border-cic-line px-3">
            <SearchIcon className="h-4 w-4 text-cic-muted" aria-hidden="true" />
            <input aria-label="Search the intranet" placeholder="Search the intranet…" className="w-full px-2 py-2 text-[14px] outline-none" />
          </form>
          <ul className="mt-4 divide-y divide-cic-line border-y border-cic-line text-[15px]">
            {nav.map((item) =>
          <li key={item.label}>
                {item.to ?
            <Link to={item.to} className={`block py-3 font-semibold ${isActive(item.to) ? 'text-cic-red' : ''}`}>{item.label}</Link> :

            <details>
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-semibold">
                      {item.label} <ChevronDownIcon className="h-4 w-4 text-cic-red" aria-hidden="true" />
                    </summary>
                    <ul className="pb-2 pl-4 text-[14px]">
                      {item.children!.map((c) => <li key={c.label}><a href="#" className="block py-2">{c.label}</a></li>)}
                      <li><a href="#" className="block py-2 font-semibold text-cic-red">{item.allLabel}</a></li>
                    </ul>
                  </details>
            }
              </li>
          )}
          </ul>
        </div>
      }
    </div>);

}

function Footer() {
  return (
    <footer className="w-full border-t border-cic-line bg-white">
      <div className={`${container} flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between`}>
        <div>
          <div className="flex items-center gap-3">
            <img src="/cic-logo.png" alt="" className="h-7 w-auto" />
            <span className="text-[14px] font-semibold">CIC Group Intranet</span>
          </div>
          <p className="mt-2 text-[12px] text-cic-muted">© 2026 CIC Insurance Group PLC · Nairobi, Kenya · All rights reserved</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
          {footerLinks.map((l) => <li key={l}><a href="#" className="hover:text-cic-red hover:underline">{l}</a></li>)}
        </ul>
      </div>
      <BrandStripe />
    </footer>);

}

function Toasts() {
  const items = useToasts();
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 flex-col gap-2" aria-live="polite">
      {items.map((t) =>
      <div key={t.id} role="status" className="flex items-start gap-3 bg-cic-ink px-4 py-3 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] animate-[fadeIn_200ms_ease-out]">
          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            <span className="block text-[14px] font-semibold">{t.title}</span>
            {t.sub && <span className="block text-[12px] text-white/75">{t.sub}</span>}
          </span>
        </div>
      )}
    </div>);

}

export function IntranetLayout({ children, tone = 'white' }: {children: React.ReactNode;tone?: 'white' | 'mist';}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-cic-ink">
      <header className="relative z-30">
        <SuiteBar />
        <SiteHeader />
      </header>
      <main className={`flex-1 pb-16 ${tone === 'mist' ? 'bg-cic-mist' : ''}`}>{children}</main>
      <Footer />
      <Toasts />
    </div>);

}

/** Absa title band used at the top of News, Events and Resource Centre. */
export function PageBanner({ crumb, title, body }: {crumb: string;title: string;body: string;}) {
  return (
    <section className="bg-gradient-to-r from-[#5C1015] via-cic-wine to-cic-wine text-white">
      <div className={`${container} py-10`}>
        <nav aria-label="Breadcrumb" className="text-[12px]">
          <ol className="flex items-center gap-2">
            <li><Link to="/intranet" className="text-white/85 hover:underline">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{crumb}</li>
          </ol>
        </nav>
        <h1 className="mt-4 text-[40px] font-semibold leading-tight">{title}</h1>
        <p className="mt-2 max-w-2xl text-[15px] text-white/90">{body}</p>
      </div>
    </section>);

}

/** Absa quick-search style filter buttons. */
export function FilterChips<T extends string>({ label, options, value, onChange, counts, dark = false }: {label: string;options: readonly T[];value: T;onChange: (v: T) => void;counts?: Partial<Record<T, number>>;dark?: boolean;}) {
  const chip = (on: boolean) => dark ?
  on ? 'border-white bg-white text-cic-red' : 'border-white/60 text-white hover:border-white hover:bg-white/10' :
  on ? 'border-cic-burgundy bg-cic-burgundy text-white' : 'border-cic-line bg-white hover:border-cic-burgundy';
  const count = (on: boolean) => dark ? on ? 'text-cic-red/70' : 'text-white/70' : on ? 'text-white/80' : 'text-cic-muted';
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-3">
      <span className={`mr-2 text-[14px] font-semibold ${dark ? 'text-white' : ''}`}>{label}</span>
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            aria-pressed={on}
            onClick={() => onChange(o)}
            className={`border px-4 py-1.5 text-[13px] transition-colors duration-150 ${chip(on)}`}>

            {o}
            {counts?.[o] !== undefined && <span className={count(on)}> ({counts[o]})</span>}
          </button>);

      })}
    </div>);

}

export const ghostBtn = 'inline-flex items-center gap-1.5 border border-cic-orange px-4 py-1.5 text-[13px] text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]';
export const solidBtn = 'inline-flex items-center gap-1.5 bg-cic-orange px-5 py-2 text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]';
