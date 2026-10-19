import React from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { HelpSection } from '../components/HelpSection';
import { HomeHero } from '../components/home/HomeHero';
import { TrendingBar } from '../components/home/TrendingBar';
import { ProductFinder } from '../components/home/ProductFinder';
import { UpgradeNotice } from '../components/home/UpgradeNotice';
import { ActionTiles } from '../components/home/ActionTiles';
import { ClaimsMadeEasy } from '../components/home/ClaimsMadeEasy';
import { HomePromos } from '../components/home/HomePromos';
import { homeHelpItems } from '../data/home';

export function Home() {
  return (
    <div className="min-h-screen w-full bg-white text-cic-ink">
      <SiteHeader />
      <HomeHero />
      <TrendingBar />
      <ProductFinder />
      <main className="mx-auto max-w-[1440px] px-5 lg:px-[100px]">
        <UpgradeNotice />
        <HelpSection title="Let us help you with" items={homeHelpItems} />
        <ActionTiles />
      </main>
      <div className="pt-14">
        <ClaimsMadeEasy />
      </div>
      <div className="mx-auto max-w-[1440px] px-5 lg:px-[100px]">
        <HomePromos />
      </div>
      <SiteFooter />
    </div>);

}
