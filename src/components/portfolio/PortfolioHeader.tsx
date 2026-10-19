import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircleIcon, BellIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { CicLogo } from '../CicLogo';
import { portfolioNav } from '../../data/portfolio';

export function PortfolioHeader() {
  return (
    <header className="w-full border-b border-cic-line bg-white">
      <div className="flex h-[60px] items-center px-4 lg:px-6">
        <CicLogo className="h-10" to="/online" />
        <nav aria-label="Self-service" className="ml-8 hidden h-full md:block">
          <ul className="flex h-full items-stretch gap-6 text-[14px]">
            {portfolioNav.map((item, i) =>
            <li key={item} className="relative flex items-center">
                <a
                href="#"
                aria-current={i === 0 ? 'page' : undefined}
                className={i === 0 ? 'font-semibold text-cic-red' : 'text-cic-muted transition-colors duration-150 hover:text-cic-ink'}>
                
                  {item}
                </a>
                {i === 0 && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-cic-red" aria-hidden="true" />}
              </li>
            )}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-6 text-[14px]">
          <button className="hidden items-center gap-1.5 hover:text-cic-red sm:flex">
            <HelpCircleIcon className="h-4 w-4" aria-hidden="true" /> Help
          </button>
          <button className="relative hidden items-center gap-1.5 hover:text-cic-red sm:flex">
            <BellIcon className="h-4 w-4" aria-hidden="true" /> Notifications
            <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-cic-red" aria-label="New notifications" />
          </button>
          <button className="hidden items-center gap-1.5 hover:text-cic-red sm:flex">
            <UserIcon className="h-4 w-4" aria-hidden="true" /> Profile
          </button>
          <span className="hidden h-8 w-px bg-cic-line sm:block" aria-hidden="true" />
          <Link to="/login" className="flex items-center gap-1.5 hover:text-cic-red">
            <LogOutIcon className="h-4 w-4" aria-hidden="true" /> Log out
          </Link>
        </div>
      </div>
    </header>);

}