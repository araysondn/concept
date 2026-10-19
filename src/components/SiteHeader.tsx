import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchIcon, LogInIcon, MenuIcon } from 'lucide-react';
import { CicLogo } from './CicLogo';
import { NavAnchor } from './NavAnchor';
import { MobileMenu } from './header/MobileMenu';
import { CountrySwitcher } from './header/CountrySwitcher';
import { topNav, segmentNav, segmentFor, utilityNav } from '../data/navigation';

export function SiteHeader() {
  const { pathname } = useLocation();
  const segment = segmentFor(pathname);
  const items = segmentNav[segment];

  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="relative z-30 w-full bg-white">
      <div className="flex h-[72px] items-center px-5 lg:px-10">
        <CicLogo />
        <span className="mx-6 hidden h-10 w-px bg-cic-line md:block" aria-hidden="true" />
        <nav aria-label="Segments" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[15px]">
            {topNav.map((item) =>
            <li key={item.label}>
                <NavAnchor
                item={item}
                className={`whitespace-nowrap transition-colors duration-150 hover:text-cic-red ${
                item.segment === segment ? 'font-semibold text-cic-burgundy' : 'text-cic-ink'}`
                } />

              </li>
            )}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-6 text-[15px] text-cic-ink lg:gap-8">
          <CountrySwitcher />
          {utilityNav.map((item) =>
          <NavAnchor
            key={item.label}
            item={item}
            className={`hidden whitespace-nowrap transition-colors duration-150 hover:text-cic-red lg:inline ${
            item.to && pathname.startsWith(item.to) ? 'font-semibold text-cic-burgundy' : ''}`
            } />

          )}
          <button className="flex items-center gap-2 transition-colors duration-150 hover:text-cic-red" aria-label="Search">
            <SearchIcon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
          </button>
          <Link to="/online" className="hidden items-center gap-2 transition-colors duration-150 hover:text-cic-red md:flex">
            <LogInIcon className="h-4 w-4" aria-hidden="true" />
            Self-service portal
          </Link>
          <button
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-haspopup="dialog"
            className="flex items-center gap-1.5 font-semibold text-cic-burgundy md:hidden">

            <MenuIcon className="h-6 w-6" aria-hidden="true" />
            Menu
          </button>
        </div>
      </div>

      <div className="hidden h-14 items-stretch bg-cic-burgundy text-white md:flex">
        <nav aria-label={segment === 'about' ? 'About CIC Group' : 'Products'} className="flex-1 overflow-x-auto px-5 lg:px-10">
          <ul className="flex h-full items-center gap-8 text-[15px] font-semibold">
            {items.map((item) => {
              const active = item.to && (item.to === pathname || item.to !== '/' && item.to !== '/about' && pathname.startsWith(item.to));
              return (
                <li key={item.label} className="relative flex h-full items-center">
                  <NavAnchor item={item} className="whitespace-nowrap transition-opacity duration-150 hover:opacity-80" />
                  {active && <span className="absolute inset-x-0 bottom-2 h-0.5 bg-white" aria-hidden="true" />}
                </li>);

            })}
          </ul>
        </nav>
        <Link
          to={segment === 'about' ? '/contact-us' : '/products'}
          className="flex items-center whitespace-nowrap bg-cic-wine px-8 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-black/30">

          {segment === 'about' ? 'Contact us' : 'Get a quote'}
        </Link>
      </div>

      <MobileMenu open={mobileOpen} onClose={closeMobile} segment={segment} />
    </header>);

}
