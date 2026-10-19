import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleIcon } from 'lucide-react';
import { PortfolioHeader } from '../components/portfolio/PortfolioHeader';
import { OfferBanners } from '../components/portfolio/OfferBanners';
import { AllocationDonut } from '../components/portfolio/AllocationDonut';
import { AccountRow } from '../components/portfolio/AccountRow';
import { ActiveTrades } from '../components/portfolio/ActiveTrades';
import { MobileTabBar } from '../components/portfolio/MobileTabBar';
import { NeedHelp } from '../components/NeedHelp';
import { LegalFooter } from '../components/LegalFooter';
import { investor, portfolioAccounts } from '../data/portfolio';

export function Portfolio() {
  const [selectedId, setSelectedId] = useState(portfolioAccounts[0].id);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#F9F9F9] pb-14 text-cic-ink md:pb-0">
      <PortfolioHeader />
      <main className="mx-auto max-w-[1100px] px-5 pt-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h1 className="text-[34px] leading-tight">
            <span className="font-semibold">Welcome back,</span> {investor.name}
          </h1>
          <p className="text-[13px]">Unit prices are updated every business day (EAT)</p>
        </div>

        <OfferBanners />

        <div className="mt-10 flex items-end justify-between">
          <div>
            <p className="text-[13px]">Total portfolio value</p>
            <p className="mt-1 text-[22px] font-semibold">{investor.totalValue}</p>
          </div>
          <div className="text-right">
            <p className="text-[13px]">Account actions</p>
            <a href="#" className="mt-1 block text-[16px] font-semibold hover:text-cic-red">
              {investor.actionsRequired} actions required
            </a>
          </div>
        </div>

        <section aria-label="Funds" className="mt-8 grid items-center gap-8 lg:grid-cols-[300px_1fr]">
          <AllocationDonut accounts={portfolioAccounts} selectedId={selectedId} onSelect={setSelectedId} />
          <div>
            <ul className="space-y-3">
              {portfolioAccounts.map((a) =>
              <AccountRow
                key={a.id}
                account={a}
                selected={a.id === selectedId}
                expanded={a.id === expandedId}
                onSelect={() => setSelectedId(a.id)}
                onToggle={() => setExpandedId(expandedId === a.id ? null : a.id)} />

              )}
            </ul>
            <Link
              to="/investments"
              className="mt-5 inline-flex items-center gap-2 bg-cic-orange px-5 py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]">
              
              <PlusCircleIcon className="h-4 w-4" aria-hidden="true" />
              Invest in another fund
            </Link>
          </div>
        </section>

        <ActiveTrades />
        <div className="mt-12">
          <NeedHelp />
        </div>
      </main>
      <LegalFooter extended />
      <MobileTabBar />
    </div>);

}