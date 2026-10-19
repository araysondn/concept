import React, { useState } from 'react';
import { ArrowRightIcon, CheckCircle2Icon, ChevronDownIcon, DownloadIcon, HandCoinsIcon, LandmarkIcon, LeafIcon, UsersIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb, ContentLayout, container } from '../../components/patterns';
import { UnderlineTabs } from '../../components/about/UnderlineTabs';
import {
  globalCompact,
  guidingPrinciples,
  latestReport,
  nairobiDeclaration,
  pillars,
  policyStatement,
  sdgs,
  sustainabilityDocuments,
  womensEmpowerment } from
'../../data/sustainability';

const HERO_IMAGE = '/a84679f1-42c0-4e9b-ab49-645ec6530114.jpg';
const INTRO_IMAGE = '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg';
const STRATEGY_IMAGE = '/19f98733-386d-4c89-bb7e-c68bd62f3cc7.jpg';
const GOVERNANCE_IMAGE = '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg';
const REPORTING_IMAGE = '/04fbb304-f647-46e9-b229-2e5497528707.jpg';

const principle = (title: string) => guidingPrinciples.find((g) => g.title === title);

/** Each pillar with the guiding-principle commitments that sit under it (all wording from the CIC sustainability page). */
const pillarDetails: {icon: LucideIcon;points: string[];sdgs?: string;}[] = [
{ icon: LeafIcon, points: principle('Environmental')?.points ?? [], sdgs: principle('Environmental')?.sdgs },
{ icon: UsersIcon, points: principle('Social')?.points ?? [], sdgs: principle('Social')?.sdgs },
{ icon: HandCoinsIcon, points: principle('Economic')?.points ?? [], sdgs: principle('Economic')?.sdgs },
{ icon: LandmarkIcon, points: ['Ethical leadership', 'Transparency', 'Stakeholder engagement'] }];


// Official UN SDG colours.
const sdgColours: Record<string, string> = {
  '1': '#E5243B',
  '3': '#4C9F38',
  '8': '#A21942',
  '9': '#FD6925',
  '12': '#BF8B2E',
  '13': '#3F7E44'
};

const sdgTiles = sdgs.map((s) => {
  const [, num, name] = s.match(/^SDG (\d+): (.+)$/) ?? [];
  return { num, name: name ? name.charAt(0).toUpperCase() + name.slice(1) : s };
});

const frameworks: {title: string;intro: string;body: React.ReactNode;}[] = [
{
  title: 'UN Global Compact',
  intro: 'Ten principles on human rights, labour, environment and anti-corruption.',
  body:
  <div className="grid gap-5 md:grid-cols-2">
        {globalCompact.map((g) =>
    <div key={g.area}>
            <p className="font-semibold">{g.area}</p>
            <ul className="mt-2 space-y-1.5">
              {g.principles.map((p) =>
        <li key={p}>{p}</li>
        )}
            </ul>
          </div>
    )}
      </div>

},
{
  title: 'UN Women’s Empowerment Principles',
  intro: 'Seven principles for gender equality in the workplace, marketplace and community.',
  body:
  <ol className="list-decimal space-y-1.5 pl-5">
        {womensEmpowerment.map((w) =>
    <li key={w}>{w}</li>
    )}
      </ol>

},
{
  title: 'The Nairobi Declaration on Sustainable Insurance',
  intro: 'Five commitments for African insurers.',
  body:
  <ul className="space-y-2">
        {nairobiDeclaration.map((n) =>
    <li key={n.title}>
            <span className="font-semibold">{n.title}:</span> {n.body}
          </li>
    )}
      </ul>

}];


export function Sustainability() {
  const [pillar, setPillar] = useState(0);
  const [openFramework, setOpenFramework] = useState<number | null>(0);
  const p = pillars[pillar];
  const detail = pillarDetails[pillar];
  const PillarIcon = detail.icon;

  return (
    <ContentLayout
      contained={false}
      top={
      <section className="relative w-full overflow-hidden bg-[#2a1a17]">
          <img src={HERO_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 35%' }} />
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
          <div className={`${container} relative flex min-h-[300px] flex-col justify-center py-12 text-white lg:min-h-[340px]`}>
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About us', to: '/about' }, { label: 'Sustainability' }]} inverse />
            <h1 className="mt-4 max-w-2xl text-[40px] font-semibold leading-tight lg:text-[52px]">
              Environmental, Social and Governance (ESG)
            </h1>
          </div>
        </section>
      }>

      <div className={container}>
        {/* Our commitment */}
        <section aria-labelledby="commitment" className="relative py-16">
          <img
            src={INTRO_IMAGE}
            alt=""
            className="w-full object-cover shadow-card lg:ml-auto lg:h-[440px] lg:w-[62%]"
            style={{ objectPosition: 'center 40%' }} />

          <div className="relative -mt-12 bg-white p-8 shadow-card lg:absolute lg:left-0 lg:top-1/2 lg:mt-0 lg:w-[46%] lg:-translate-y-1/2 lg:p-10">
            <h2 id="commitment" className="text-[32px] font-semibold leading-tight">Our commitment</h2>
            <div className="mt-4 space-y-3 text-[14px] leading-relaxed">
              {policyStatement.map((para) =>
              <p key={para.slice(0, 24)}>{para}</p>
              )}
            </div>
          </div>
        </section>

        {/* ESG strategy */}
        <section aria-labelledby="strategy" className="grid gap-10 border-t border-cic-line py-16 lg:grid-cols-[0.8fr_1fr]">
          <img src={STRATEGY_IMAGE} alt="" className="h-full max-h-[520px] w-full object-cover shadow-card" style={{ objectPosition: 'center 30%' }} />
          <div>
            <h2 id="strategy" className="text-[32px] font-semibold">Our ESG strategy</h2>
            <p className="mt-2 text-[15px]">Four pillars shape the way we do business.</p>
            <div className="mt-6">
              <UnderlineTabs tabs={pillars.map((x) => x.title)} active={pillar} onChange={setPillar} label="Sustainability pillars" />
            </div>
            <div role="tabpanel" aria-label={p.title} className="pt-6">
              <h3 className="flex items-center gap-3 text-[22px] font-semibold">
                <PillarIcon className="h-6 w-6 text-cic-red" strokeWidth={1.5} aria-hidden="true" />
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed">{p.body}</p>
              <div className="mt-5 bg-[#FBECEC] p-6">
                {detail.sdgs && <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-cic-red">Linked to {detail.sdgs}</p>}
                <ul className="space-y-3">
                  {detail.points.map((pt) =>
                  <li key={pt} className="flex items-start gap-3 text-[14px]">
                      <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-cic-red" aria-hidden="true" />
                      {pt}
                    </li>
                  )}
                </ul>
              </div>
              <a
                href={sustainabilityDocuments.find((d) => d.category === 'Policy')?.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-cic-red hover:underline">

                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /> Read our sustainability policy
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* SDGs */}
      <section aria-labelledby="sdgs" className="bg-cic-mist py-16">
        <div className={container}>
          <h2 id="sdgs" className="text-[32px] font-semibold">Focused on the Sustainable Development Goals</h2>
          <p className="mt-2 max-w-3xl text-[15px]">
            Our work supports six of the UN Sustainable Development Goals, across our economic, environmental and social commitments.
          </p>
          <ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {sdgTiles.map((s) =>
            <li key={s.num} className="flex items-start gap-4">
                <span
                className="flex h-[72px] w-[72px] shrink-0 flex-col justify-between p-2 text-white"
                style={{ backgroundColor: sdgColours[s.num] ?? '#AC232D' }}
                aria-hidden="true">

                  <span className="text-[26px] font-bold leading-none">{s.num}</span>
                  <span className="text-[8px] font-semibold uppercase leading-tight">SDG</span>
                </span>
                <span>
                  <span className="block text-[12px] font-semibold text-cic-muted">SDG {s.num}</span>
                  <span className="block text-[17px] font-semibold leading-snug">{s.name}</span>
                </span>
              </li>
            )}
          </ul>

          {/* Frameworks */}
          <h3 className="mt-16 text-[24px] font-semibold">The commitments we've signed up to</h3>
          <ul className="mt-5 space-y-3">
            {frameworks.map((f, i) => {
              const open = openFramework === i;
              return (
                <li key={f.title} className="bg-white shadow-card">
                  <button
                    onClick={() => setOpenFramework(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">

                    <span>
                      <span className="block text-[17px] font-semibold">{f.title}</span>
                      <span className="mt-1 block text-[13px] text-cic-muted">{f.intro}</span>
                    </span>
                    <ChevronDownIcon className={`h-5 w-5 shrink-0 text-cic-red transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  {open && <div className="border-t border-cic-line px-6 py-5 text-[14px] leading-relaxed">{f.body}</div>}
                </li>);

            })}
          </ul>

          {/* Governance + reporting */}
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {[
            {
              image: GOVERNANCE_IMAGE,
              position: 'center 20%',
              title: 'ESG governance',
              body: 'We are committed to ethical leadership, transparency and stakeholder engagement. Meet the board and executive team who hold us to it.',
              link: <Link to="/about/leadership/board-of-directors" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-cic-red hover:underline">
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /> Our leadership
                  </Link>
            },
            {
              image: REPORTING_IMAGE,
              position: 'center 30%',
              title: 'ESG reporting',
              body: 'Read our latest sustainability report to see our progress across the group.',
              link: <a href={latestReport.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-cic-red hover:underline">
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /> {latestReport.title}
                  </a>
            }].
            map((b) =>
            <div key={b.title} className="relative">
                <img src={b.image} alt="" className="aspect-[16/10] w-[85%] object-cover shadow-card" style={{ objectPosition: b.position }} />
                <div className="relative -mt-24 ml-auto w-[80%] bg-white p-6 shadow-card">
                  <h3 className="text-[22px] font-semibold">{b.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed">{b.body}</p>
                  <div className="mt-4">{b.link}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section aria-labelledby="downloads" className={`${container} py-16`}>
        <h2 id="downloads" className="text-[32px] font-semibold">Downloads</h2>
        <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {sustainabilityDocuments.map((d) =>
          <li key={d.title} className="border-b border-cic-line">
              <a href={d.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-5">
                <span>
                  <span className="block text-[15px] font-semibold group-hover:text-cic-red">{d.title}</span>
                  <span className="mt-0.5 block text-[12px] text-cic-muted">{[d.category, d.date, 'PDF'].filter(Boolean).join(' · ')}</span>
                </span>
                <DownloadIcon className="h-5 w-5 shrink-0 text-cic-red" aria-hidden="true" />
              </a>
            </li>
          )}
        </ul>
      </section>
    </ContentLayout>);

}
