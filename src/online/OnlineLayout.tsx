import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { LogInIcon, MenuIcon, SearchIcon, UserPlusIcon, XIcon } from 'lucide-react';
import { CicLogo } from '../components/CicLogo';
import { CountrySwitcher } from '../components/header/CountrySwitcher';
import { fundTicker, legalLinks } from './data';
import type { Segment } from './data';
import { socials } from '../data/contactPage';

export const onlineContainer = 'mx-auto max-w-[1440px] px-5 lg:px-[100px]';

/** Which audience the portal is showing: ?for=business switches to the agent view. */
export function useSegment(): Segment {
  const [params] = useSearchParams();
  return params.get('for') === 'business' ? 'business' : 'personal';
}

function Ticker() {
  const items = [...fundTicker, ...fundTicker];
  return (
    <div className="overflow-hidden border-b border-cic-line bg-cic-mist text-[12px]" aria-label="CIC unit trust prices">
      <div className="flex w-max animate-[cicTicker_45s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((f, i) =>
        <span key={i} className="flex items-center gap-2 whitespace-nowrap border-r border-cic-line px-5 py-1.5" aria-hidden={i >= fundTicker.length}>
            <span className="font-semibold">{f.name}</span>
            <span className="text-cic-muted">{f.kind}</span>
            <span className="font-semibold text-cic-red">{f.value}</span>
            <span className="text-cic-green">▲ {f.change}</span>
          </span>
        )}
      </div>
    </div>);

}

function OnlineHeader() {
  const segment = useSegment();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const bar =
  segment === 'business' ?
  [
  { label: 'Become an agent', to: '/online/register?for=business' },
  { label: 'Agent log in', to: '/online/login?as=agent&for=business' },
  { label: 'Sell insurance', to: '/online?for=business#agents' },
  { label: 'Sell investments', to: '/online?for=business#agents' },
  { label: 'FAQs', to: '/online/faqs?for=business' }] :

  [
  { label: 'All products', to: '/online#products' },
  { label: 'Insure', to: '/online?tab=Insure#products' },
  { label: 'Invest', to: '/online?tab=Invest#products' },
  { label: 'Pension', to: '/online?tab=Pension#products' },
  { label: 'Customer services', to: '/online/services' },
  { label: 'FAQs', to: '/online/faqs' }];


  const utility = [
  { label: 'FAQs', to: '/online/faqs' },
  { label: 'Contact', to: '/online/contact' }];


  return (
    <header className="relative z-30 w-full border-b border-cic-line bg-white">
      <div className="flex h-[72px] items-center px-5 lg:px-10">
        <CicLogo className="h-10" to="/online" />
        <span className="mx-5 hidden h-10 w-px bg-cic-line md:block" aria-hidden="true" />
        <div className="hidden md:block">
          <CountrySwitcher />
        </div>
        <nav aria-label="Segments" className="ml-8 hidden md:block">
          <ul className="flex items-center gap-8 text-[15px]">
            {(['personal', 'business'] as Segment[]).map((s) =>
            <li key={s}>
                <Link
                to={s === 'business' ? '/online?for=business' : '/online'}
                className={`capitalize transition-colors duration-150 hover:text-cic-red ${segment === s ? 'font-semibold text-cic-burgundy' : 'text-cic-ink'}`}>

                  {s}
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-6 text-[15px]">
          {utility.map((u) =>
          <Link key={u.label} to={u.to} className="hidden transition-colors hover:text-cic-red lg:inline">{u.label}</Link>
          )}
          <button className="hidden items-center gap-2 transition-colors hover:text-cic-red sm:flex" aria-label="Search">
            <SearchIcon className="h-4 w-4" aria-hidden="true" /> <span className="hidden xl:inline">Search</span>
          </button>
          <Link to="/online#products" className="hidden whitespace-nowrap bg-cic-orange px-5 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#8A1B23] md:inline-block">
            Get a quote
          </Link>
          <Link to={`/online/register${segment === 'business' ? '?for=business' : ''}`} className="hidden items-center gap-2 transition-colors hover:text-cic-red md:flex">
            <UserPlusIcon className="h-4 w-4" aria-hidden="true" /> Register
          </Link>
          <Link to={`/online/login${segment === 'business' ? '?as=agent&for=business' : ''}`} className="hidden items-center gap-2 transition-colors hover:text-cic-red md:flex">
            <LogInIcon className="h-4 w-4" aria-hidden="true" /> Log in
          </Link>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex items-center gap-1.5 font-semibold text-cic-burgundy md:hidden">
            {open ? <XIcon className="h-6 w-6" aria-hidden="true" /> : <MenuIcon className="h-6 w-6" aria-hidden="true" />} Menu
          </button>
        </div>
      </div>


      {open &&
      <div className="border-t border-cic-line bg-white px-5 pb-6 md:hidden">
          <div className="grid grid-cols-2 gap-2 py-4">
            {(['personal', 'business'] as Segment[]).map((s) =>
          <Link
            key={s}
            to={s === 'business' ? '/online?for=business' : '/online'}
            className={`border px-3 py-2 text-center text-[14px] font-semibold capitalize ${segment === s ? 'border-cic-burgundy bg-cic-burgundy text-white' : 'border-cic-line'}`}>

                {s}
              </Link>
          )}
          </div>
          <ul className="divide-y divide-cic-line border-y border-cic-line text-[15px]">
            {[...bar, ...utility].map((b) =>
          <li key={b.label + b.to}><Link to={b.to} className="block py-3 font-semibold">{b.label}</Link></li>
          )}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link to="/online/register" className="border border-cic-orange py-2.5 text-center text-[14px] text-cic-orange">Register</Link>
            <Link to="/online/login" className="bg-cic-orange py-2.5 text-center text-[14px] font-semibold text-white">Log in</Link>
          </div>
        </div>
      }
    </header>);

}

function OnlineFooter() {
  return (
    <footer className="border-t-4 border-cic-burgundy bg-white">
      <div className={`${onlineContainer} flex flex-col gap-5 py-6 text-[13px] lg:flex-row lg:items-center lg:justify-between`}>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legalLinks.map((l) =>
          <li key={l}><a href="#" className="hover:text-cic-red hover:underline">{l.replace(/\.$/, '')}</a></li>
          )}
        </ul>
        <ul className="flex flex-wrap gap-2">
          {socials.map((s) =>
          <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="block border border-cic-line px-3 py-1 text-[12px] font-semibold hover:border-cic-red hover:text-cic-red">
                {s.label}
              </a>
            </li>
          )}
        </ul>
        <p className="text-cic-muted">© CIC Insurance Group, Kenya (CIC Kenya).</p>
      </div>
      <div className="flex h-1.5" aria-hidden="true">
        <span className="flex-[3] bg-cic-burgundy" />
        <span className="flex-1 bg-cic-amber" />
        <span className="flex-[3] bg-cic-red" />
      </div>
    </footer>);

}

/** CIC Online shell: fund ticker, Absa-style two-tier header, page, slim legal footer. */
export function OnlineLayout({ children, footer = true }: {children: React.ReactNode;footer?: boolean;}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-cic-ink">
      <Ticker />
      <OnlineHeader />
      <main className="flex-1">{children}</main>
      {footer && <OnlineFooter />}
    </div>);

}
