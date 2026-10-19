import React from 'react';
import {
  AwardIcon,
  BinocularsIcon,
  BookOpenIcon,
  BriefcaseIcon,
  Building2Icon,
  HandshakeIcon,
  LandmarkIcon,
  LeafIcon,
  LineChartIcon,
  MapPinIcon,
  NewspaperIcon,
  ScaleIcon,
  TargetIcon,
  UsersIcon,
  ZapIcon,
  TrendingUpIcon } from
'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ContentLayout, PageHero, Section, IconLinkGrid, SmartLink } from '../../components/patterns';
import type { IconLink } from '../../components/patterns';
import { aboutHeroImage, aboutIntro, coreValues, mission, quickFacts, subsidiaries, vision } from '../../data/about';
import { contact } from '../../data/navigation';

const COLLAGE_MAIN = '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg';
const COLLAGE_SMALL = '/953d4772-30ed-48cf-9516-b192cb47b7e0.jpg';
const PURPOSE_ART = '/04fbb304-f647-46e9-b229-2e5497528707.jpg';
const FOOTPRINT_IMAGE = '/cc1fa332-e7e8-46c7-847e-2ead4c6b6142.jpg';

const valueIcons = [ScaleIcon, ZapIcon, TrendingUpIcon, HandshakeIcon];

const exploreLinks: IconLink[] = [
{ label: 'Leadership', icon: UsersIcon, body: 'Meet the board and the team who lead CIC Group.', link: { label: 'Meet our leaders', to: '/about/leadership' } },
{ label: 'Our history', icon: BookOpenIcon, body: 'From an agency within KNFC in 1968 to a listed group.', link: { label: 'See our story', to: '/about/history' } },
{ label: 'Investor relations', icon: LineChartIcon, body: 'Annual reports, results, AGM notices and governance policies.', link: { label: 'View reports', to: '/about/investor-relations' } },
{ label: 'Sustainability', icon: LeafIcon, body: 'Our pillars, principles and sustainability reports.', link: { label: 'Tell me more', to: '/about/sustainability' } },
{ label: 'Media centre', icon: NewspaperIcon, body: 'Press releases and news from across the group.', link: { label: 'Read the news', to: '/about/media-centre' } },
{ label: 'Careers', icon: BriefcaseIcon, body: 'Grow your career with a team that keeps its word.', link: { label: 'See vacancies', to: '/about/careers' } }];


/** Headline figures for the red band, and the market-share figures drawn as bars. */
const headline = quickFacts.filter((f) => !/market share/i.test(f.label));
const shares = quickFacts.
filter((f) => /market share/i.test(f.label)).
map((f) => ({
  label: f.label.replace(/ ?Market Share/i, '').replace('Asset Management Unit trust', 'Unit trusts (asset management)').replace('General Business', 'General insurance'),
  value: parseFloat(String(f.value)),
  display: f.value
}));

/** Milestones taken from the About and investor pages. */
const milestones: {year: string;title: string;icon: LucideIcon;}[] = [
{ year: '1968', title: 'Started as a department of the Kenya National Federation of Cooperatives', icon: HandshakeIcon },
{ year: '2012', title: 'Listed on the Nairobi Securities Exchange, the only cooperative insurer on the NSE', icon: LandmarkIcon },
{ year: '2015', title: 'AKI Group Life Company of the Year, every year since', icon: AwardIcon },
{ year: '2020', title: 'Best Motor Insurer at the Cheki Awards', icon: AwardIcon },
{ year: '2021', title: 'Decade of Excellence Insurance Kenya Award', icon: AwardIcon }];


export function About() {
  return (
    <ContentLayout
      top={
      <PageHero
        image={aboutHeroImage}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About us' }]}
        title="Who we are"
        intro="For more than five decades, we've been helping people achieve financial security. Get to know the group behind the promise: we keep our word."
        ctas={[
        { label: 'Meet our leaders', to: '/about/leadership' },
        { label: 'Investor relations', to: '/about/investor-relations' }]
        } />

      }>

      {/* Intro with photo collage */}
      <section aria-labelledby="about-cic" className="grid items-center gap-12 pt-14 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative pb-16 pr-10 sm:pr-20">
          <img src={COLLAGE_MAIN} alt="Friends sharing a phone on a matatu" className="aspect-[4/3] w-full object-cover shadow-card" />
          <img
            src={COLLAGE_SMALL}
            alt=""
            className="absolute bottom-0 right-0 aspect-square w-[42%] border-[6px] border-white object-cover shadow-card"
            style={{ objectPosition: 'center 20%' }} />

          <div className="absolute -left-2 top-6 bg-cic-orange px-5 py-4 text-white shadow-card sm:-left-4">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/85">Since</p>
            <p className="text-[36px] font-bold leading-none">1968</p>
          </div>
          <span className="absolute bottom-6 left-0 h-3 w-24 bg-cic-amber" aria-hidden="true" />
        </div>
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-cic-red">We keep our word</p>
          <h2 id="about-cic" className="mt-2 text-[32px] font-semibold leading-tight">About CIC Group</h2>
          <div className="mt-4 space-y-3 text-[15px] leading-relaxed">
            {aboutIntro.slice(0, 3).map((p) =>
            <p key={p.slice(0, 24)}>{p}</p>
            )}
          </div>
        </div>
      </section>

      {/* Vision and mission with illustration */}
      <section aria-label="Vision and mission" className="mt-16 grid overflow-hidden shadow-card lg:grid-cols-[0.9fr_1fr]">
        <img src={PURPOSE_ART} alt="" className="h-full min-h-[260px] w-full object-cover" />
        <div className="grid">
          {[
          { title: 'Our vision', body: vision, icon: BinocularsIcon, bg: 'bg-cic-orange' },
          { title: 'Our mission', body: mission, icon: TargetIcon, bg: 'bg-cic-wine' }].
          map((b) =>
          <div key={b.title} className={`${b.bg} relative overflow-hidden p-8 text-white lg:p-10`}>
              <b.icon className="absolute -right-6 -top-6 h-36 w-36 text-white/10" strokeWidth={1} aria-hidden="true" />
              <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-white/85">
                <b.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" /> {b.title}
              </p>
              <p className="relative mt-3 text-[24px] font-semibold leading-snug">{b.body}</p>
            </div>
          )}
        </div>
      </section>

      <Section title="Our core values" intro="Four values guide how we work with you, every day." id="core-values" className="pt-16">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((v, i) => {
            const Icon = valueIcons[i];
            return (
              <li key={v.label} className="relative overflow-hidden border-t-4 border-cic-orange bg-white p-6 shadow-card">
                <span className="absolute -right-1 -top-4 text-[88px] font-bold leading-none text-cic-red/10" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FBECEC]">
                  <Icon className="h-6 w-6 text-cic-red" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p className="mt-4 text-[18px] font-semibold">{v.label}</p>
                <p className="mt-1 text-[14px] text-cic-muted">{v.body}</p>
              </li>);

          })}
        </ul>
      </Section>

      {/* Quick facts: figures + market-share bars */}
      <section aria-labelledby="quick-facts" className="mt-16 grid overflow-hidden shadow-card lg:grid-cols-[1.1fr_1fr]">
        <div className="relative bg-cic-burgundy p-8 text-white lg:p-10">
          <span className="absolute left-0 top-0 h-1.5 w-28 bg-cic-amber" aria-hidden="true" />
          <h2 id="quick-facts" className="text-[28px] font-semibold">CIC quick facts</h2>
          <p className="mt-1 text-[14px] text-white/80">A snapshot of the group today.</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
            {headline.map((f) =>
            <div key={f.label} className="border-l-2 border-cic-amber pl-4">
                <dd className="text-[40px] font-bold leading-none">{f.value}</dd>
                <dt className="mt-2 text-[13px] text-white/85">{f.label}</dt>
              </div>
            )}
          </dl>
        </div>
        <div className="bg-white p-8 lg:p-10">
          <h3 className="text-[20px] font-semibold">Market share</h3>
          <p className="mt-1 text-[13px] text-cic-muted">Share of the Kenyan market, by business line.</p>
          <ul className="mt-8 space-y-7">
            {shares.map((s) =>
            <li key={s.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[14px] font-semibold">{s.label}</span>
                  <span className="text-[22px] font-bold text-cic-red">{s.display}</span>
                </div>
                <div className="mt-2 h-3 w-full bg-cic-mist" role="img" aria-label={`${s.label}: ${s.display}`}>
                  <div className="h-full bg-cic-orange" style={{ width: `${Math.min(100, s.value * 2)}%` }} />
                </div>
              </li>
            )}
          </ul>
          <p className="mt-6 text-[11px] text-cic-muted">Figures as published on cicinsurancegroup.com. Bars drawn on a 0–50% scale.</p>
        </div>
      </section>

      {/* Milestones */}
      <Section title="Five decades of keeping our word" intro="A few moments that shaped the group." id="milestones" className="pt-16">
        <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
          <span className="absolute left-5 top-0 h-full w-0.5 bg-cic-line md:left-0 md:top-5 md:h-0.5 md:w-full" aria-hidden="true" />
          {milestones.map((m) =>
          <li key={m.year} className="relative pl-16 md:pl-0">
              <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-cic-orange text-white ring-4 ring-white md:relative">
                <m.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="text-[28px] font-bold text-cic-red md:mt-4">{m.year}</p>
              <p className="mt-1 text-[14px] leading-snug">{m.title}</p>
            </li>
          )}
        </ol>
        <SmartLink target={{ label: 'See our full history', to: '/about/history' }} className="mt-8 inline-block text-[14px] font-semibold text-cic-red hover:underline" />
      </Section>

      <Section title="Get to know us" intro="Everything you need to know about CIC Group, in one place." id="explore-about" className="pt-16">
        <IconLinkGrid items={exploreLinks} columns={6} />
      </Section>

      {/* Regional footprint */}
      <section aria-labelledby="find-us" className="mt-16 grid overflow-hidden bg-cic-mist lg:grid-cols-[1fr_1.2fr]">
        <img src={FOOTPRINT_IMAGE} alt="" className="h-full min-h-[280px] w-full object-cover" style={{ objectPosition: 'center 30%' }} />
        <div className="p-8 lg:p-10">
          <h2 id="find-us" className="text-[28px] font-semibold">Where you'll find us</h2>
          <p className="mt-2 text-[15px]">Our head office is in Nairobi, with subsidiaries serving customers across the region.</p>
          <div className="mt-6 flex items-start gap-4 bg-white p-5 shadow-card">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-cic-orange text-white">
              <Building2Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="text-[14px]">
              <p className="font-semibold">Group head office</p>
              <p className="mt-1">{contact.headOffice}</p>
              <p className="mt-1 text-cic-muted">{contact.phone} · {contact.landline}</p>
              <SmartLink target={{ label: 'Contact us', to: '/contact-us' }} className="mt-2 inline-block font-semibold text-cic-red hover:underline" />
            </div>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {subsidiaries.map((s) =>
            <li key={s.country}>
                <SmartLink target={{ label: s.country, href: s.href }} className="group flex items-center gap-3 bg-white p-4 shadow-card">
                  <MapPinIcon className="h-5 w-5 shrink-0 text-cic-red" aria-hidden="true" />
                  <span>
                    <span className="block text-[15px] font-semibold group-hover:text-cic-red">CIC {s.country}</span>
                    <span className="block text-[12px] text-cic-muted">{s.country === 'Kenya' ? 'Home market' : 'Regional subsidiary'}</span>
                  </span>
                </SmartLink>
              </li>
            )}
          </ul>
        </div>
      </section>
    </ContentLayout>);

}
