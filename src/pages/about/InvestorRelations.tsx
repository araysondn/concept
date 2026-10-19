import React, { useMemo, useState } from 'react';
import { ArrowRightIcon, ChevronDownIcon, ChevronRightIcon, DownloadIcon, ExternalLinkIcon, FileTextIcon, MailIcon, NewspaperIcon, PhoneIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb, ContentLayout, SmartLink, StatList, btnPrimary, container } from '../../components/patterns';
import { UnderlineTabs } from '../../components/about/UnderlineTabs';
import { irTabs, nseMarketData } from '../../data/investorRelations';
import { pressReleases, formatDate } from '../../data/media';
import { quickFacts } from '../../data/about';
import { contact } from '../../data/navigation';

const ALL_YEARS = 'All years';
const HERO_IMAGE = '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg';
const RESULTS_IMAGE = '/04fbb304-f647-46e9-b229-2e5497528707.jpg';
const ESG_IMAGE = '/a84679f1-42c0-4e9b-ab49-645ec6530114.jpg';

/** Latest results block: the H1 2026 release and the documents that go with it (real URLs from the IR library). */
const latestResults = {
  title: '2026 half-year results',
  intro: [
  'CIC Insurance Group PLC published its results for the half year to 30 June 2026 in August 2026.',
  'Profit after tax rose 70%, to about KSh 1.09 billion.'],

  documents: [
  { label: 'Half year 2026 results', href: 'https://www.cicinsurancegroup.com/wp-content/uploads/2026/08/CIC-Group-Full-Page-Half-Year-2026-Results.pdf' },
  { label: 'Annual report and financial statements 2025', href: 'https://www.cicinsurancegroup.com/wp-content/uploads/2026/05/CIC-GROUP-ANNUAL-REPORT-LATEST-2025-7_compressed.pdf' },
  { label: 'Full year 2025 financial results', href: 'https://www.cicinsurancegroup.com/wp-content/uploads/2026/03/CIC-Group-Full-Year-2025-for-Print.pdf' },
  { label: 'AGM polling results 2026', href: 'https://www.cicinsurancegroup.com/wp-content/uploads/2026/05/AGM-POLLING-RESULTS.pdf' }]

};

const tabIndex = (label: string) => Math.max(0, irTabs.findIndex((t) => t.label === label));

/** Newest year in a tab (2026 today); the library opens on it rather than "All years". */
const latestYear = (i: number) =>
irTabs[i].documents.map((d) => d.year).sort((a, b) => b.localeCompare(a))[0] ?? ALL_YEARS;

export function InvestorRelations() {
  const [active, setActive] = useState(0);
  const [year, setYear] = useState(() => latestYear(0));
  const tab = irTabs[active];

  const years = useMemo(
    () => [ALL_YEARS, ...Array.from(new Set(tab.documents.map((d) => d.year))).sort((a, b) => b.localeCompare(a))],
    [tab]
  );
  const docs = tab.documents.filter((d) => year === ALL_YEARS || d.year === year);

  const changeTab = (i: number) => {
    setActive(i);
    setYear(latestYear(i));
  };

  const openLibrary = (label: string) => {
    changeTab(tabIndex(label));
    document.getElementById('library')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const investorLinks: {label: string;onClick?: () => void;target?: {label: string;to?: string;href?: string;};}[] = [
  { label: 'Results & reports', onClick: () => openLibrary('Group Financial Reports') },
  { label: 'Annual reports', onClick: () => openLibrary('Group Annual Report') },
  { label: 'Shareholder information & AGM', onClick: () => openLibrary('Shareholder Information & AGM') },
  { label: 'Governance policies', onClick: () => openLibrary('Governance Policies') },
  { label: 'Investor briefings', onClick: () => openLibrary('Investor Briefing') },
  { label: 'Share price', target: nseMarketData },
  { label: 'Contact investor relations', onClick: () => document.getElementById('enquiries')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }];


  const news = pressReleases.filter((p) => p.date).slice(0, 3);
  const facts = quickFacts.filter((f) => ['Happy Clients', 'Gross Written Premium', 'Assets', 'Employees & Agents'].includes(f.label));

  return (
    <ContentLayout
      contained={false}
      top={
      <section className="relative w-full">
          <img src={HERO_IMAGE} alt="" className="h-[300px] w-full object-cover lg:h-[380px]" style={{ objectPosition: 'center 22%' }} />
          <div className={`${container} relative`}>
            <div className="-mt-20 inline-block bg-cic-burgundy px-8 py-7 text-white shadow-card lg:-mt-24 lg:min-w-[460px] lg:px-10 lg:py-9">
              <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About us', to: '/about' }, { label: 'Investor relations' }]} inverse />
              <h1 className="mt-3 text-[36px] font-semibold leading-tight lg:text-[44px]">Investor relations</h1>
            </div>
          </div>
        </section>
      }>

      <div className={container}>
        {/* Latest results */}
        <section aria-labelledby="latest-results" className="grid items-center gap-10 py-16 lg:grid-cols-2">
          <img src={RESULTS_IMAGE} alt="" className="aspect-[16/10] w-full object-cover shadow-card" style={{ objectPosition: 'center 30%' }} />
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-wide text-cic-red">Latest results</p>
            <h2 id="latest-results" className="mt-2 text-[32px] font-semibold leading-tight">{latestResults.title}</h2>
            <div className="mt-3 space-y-2 text-[15px] leading-relaxed">
              {latestResults.intro.map((p) =>
              <p key={p}>{p}</p>
              )}
            </div>
            <ul className="mt-6 space-y-3">
              {latestResults.documents.map((d) =>
              <li key={d.label}>
                  <a href={d.href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-[15px] font-semibold">
                    <FileTextIcon className="h-5 w-5 shrink-0 text-cic-red" strokeWidth={1.5} aria-hidden="true" />
                    <span className="group-hover:text-cic-red group-hover:underline">{d.label}</span>
                    <span className="text-[11px] font-normal text-cic-muted">PDF</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </section>

        {/* Why invest */}
        <section aria-labelledby="why-invest" className="border-t border-cic-line pt-16">
          <div className="grid gap-8 bg-[#FBECEC] p-8 shadow-card lg:grid-cols-[1.1fr_1fr] lg:p-12">
            <div>
              <h2 id="why-invest" className="text-[32px] font-semibold leading-tight">Why invest in CIC Group</h2>
              <div className="mt-4 space-y-3 text-[15px] leading-relaxed">
                <p>
                  For more than five decades we've helped people achieve financial security, growing from a department of the
                  Kenya National Federation of Cooperatives in 1968 into a group serving Kenya, Uganda, Malawi and South Sudan.
                </p>
                <p>
                  CIC Insurance Group listed its shares by introduction at the Nairobi Securities Exchange on 19 July 2012. We're
                  the only cooperative insurance entity listed on the NSE.
                </p>
              </div>
              <SmartLink target={nseMarketData} className={`${btnPrimary} mt-6 inline-flex items-center gap-2`}>
                {nseMarketData.label}
                <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
              </SmartLink>
            </div>
            <div className="self-center bg-white p-6">
              <StatList stats={facts} columns={2} />
              <p className="mt-3 text-[11px] text-cic-muted">Figures as published on cicinsurancegroup.com.</p>
            </div>
          </div>
        </section>

        {/* Investor links */}
        <section aria-labelledby="investor-links" className="pt-16">
          <h2 id="investor-links" className="text-[24px] font-semibold">Investor links</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {investorLinks.map((l) => {
              const cls =
              'flex h-full min-h-[76px] w-full items-center justify-between gap-3 border border-cic-red bg-white px-5 py-4 text-left text-[14px] font-semibold transition-colors duration-150 hover:bg-[#FBECEC]';
              const body =
              <>
                  <span>{l.label}</span>
                  {l.target?.href ?
                <ExternalLinkIcon className="h-4 w-4 shrink-0 text-cic-red" aria-hidden="true" /> :
                <ArrowRightIcon className="h-4 w-4 shrink-0 text-cic-red" aria-hidden="true" />
                }
                </>;

              return (
                <li key={l.label}>
                  {l.target ?
                  <SmartLink target={l.target} className={cls}>
                      {body}
                    </SmartLink> :

                  <button onClick={l.onClick} className={cls}>
                      {body}
                    </button>
                  }
                </li>);

            })}
          </ul>
        </section>
      </div>

      {/* Latest news */}
      <section aria-labelledby="latest-news" className="mt-16 bg-cic-mist py-14">
        <div className={container}>
          <h2 id="latest-news" className="text-[32px] font-semibold">Latest news</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {news.map((n) =>
            <li key={n.href}>
                <a href={n.href} target="_blank" rel="noreferrer" className="group flex h-full min-h-[190px] flex-col bg-white p-6 shadow-card">
                  <span className="flex items-center gap-1.5 text-[12px] font-semibold text-cic-red">
                    <NewspaperIcon className="h-3.5 w-3.5" aria-hidden="true" /> {n.pdf ? 'Press release (PDF)' : 'Press release'}
                  </span>
                  <span className="mt-2 text-[18px] font-semibold leading-snug group-hover:text-cic-red">{n.title}</span>
                  <span className="mt-auto pt-4 text-[13px] text-cic-muted">{n.date ? formatDate(n.date) : ''}</span>
                </a>
              </li>
            )}
          </ul>
          <Link to="/about/media-centre" className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-cic-red hover:underline">
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /> See all news
          </Link>
        </div>
      </section>

      <div className={container}>
        {/* ESG teaser */}
        <section aria-labelledby="esg-teaser" className="grid items-center gap-10 py-16 lg:grid-cols-2">
          <img src={ESG_IMAGE} alt="" className="aspect-[16/10] w-full object-cover shadow-card" style={{ objectPosition: 'center 40%' }} />
          <div>
            <h2 id="esg-teaser" className="text-[32px] font-semibold leading-tight">Sustainability</h2>
            <p className="mt-3 text-[15px] leading-relaxed">
              We commit to be an impact and growth catalyst for sustainable insurance and investment in Africa, by building
              sustainability into how we run our business and make decisions.
            </p>
            <Link to="/about/sustainability" className={`${btnPrimary} mt-6 inline-flex items-center gap-2`}>
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /> Explore
            </Link>
          </div>
        </section>

        {/* Document library */}
        <section id="library" aria-labelledby="library-title" className="scroll-mt-6 border-t border-cic-line pt-16">
          <h2 id="library-title" className="text-[32px] font-semibold">Results, reports and documents</h2>
          <p className="mt-2 text-[15px]">Choose a category, then filter by year.</p>
          <div className="mt-6">
            <UnderlineTabs tabs={irTabs.map((t) => t.label)} active={active} onChange={changeTab} label="Document categories" />
          </div>
          <div role="tabpanel" aria-label={tab.label} className="pt-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] text-cic-muted" aria-live="polite">
                Showing {docs.length} of {tab.documents.length} documents
              </p>
              <label className="flex items-center gap-2 text-[13px]">
                <span className="font-semibold">Year</span>
                <span className="relative">
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="appearance-none border border-cic-line bg-white py-1.5 pl-3 pr-8 text-[13px] outline-none focus:border-cic-burgundy">

                    {years.map((y) =>
                    <option key={y}>{y}</option>
                    )}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-cic-orange" aria-hidden="true" />
                </span>
              </label>
            </div>
            {docs.length === 0 ?
            <p className="border-t border-cic-line py-5 text-[14px] text-cic-muted">No documents for this year.</p> :

            <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                {docs.map((d) => {
                const meta = [d.category, d.year, d.href ? 'PDF' : 'Not available'].filter(Boolean).join(' · ');
                const body =
                <>
                      <span>
                        <span className="block text-[15px] font-semibold group-hover:text-cic-red">{d.title}</span>
                        <span className="mt-0.5 block text-[12px] text-cic-muted">{meta}</span>
                      </span>
                      <DownloadIcon className={`h-5 w-5 shrink-0 ${d.href ? 'text-cic-red' : 'text-cic-line'}`} aria-hidden="true" />
                    </>;

                return (
                  <li key={`${d.title}-${d.href ?? ''}`} className="border-b border-cic-line">
                      {d.href ?
                    <a href={d.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-5">
                          {body}
                        </a> :

                    <div className="flex items-center justify-between gap-4 py-5 text-cic-muted">{body}</div>
                    }
                    </li>);

              })}
              </ul>
            }
          </div>
        </section>
      </div>

      {/* Investor enquiries */}
      <section id="enquiries" aria-labelledby="enquiries-title" className="mt-16 scroll-mt-6 bg-cic-burgundy py-14 text-white">
        <div className={container}>
          <h2 id="enquiries-title" className="text-[32px] font-semibold">Investor enquiries</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3 md:divide-x md:divide-white/30">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-cic-red">
                <MailIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="text-[14px]">
                <p className="font-semibold">Investor relations</p>
                <p className="mt-1 text-white/85">Group Company Secretary, {contact.headOffice}</p>
                <p className="mt-1">{contact.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 md:pl-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-cic-red">
                <PhoneIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="text-[14px]">
                <p className="font-semibold">Call us</p>
                <p className="mt-1">{contact.phone}</p>
                <p className="mt-1">{contact.landline}</p>
              </div>
            </div>
            <Link to="/about/media-centre" className="group flex items-start gap-4 md:pl-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-cic-red">
                <NewspaperIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[14px]">
                <span className="block font-semibold">Media enquiries</span>
                <span className="mt-1 flex items-center gap-1 text-white/85 group-hover:text-white group-hover:underline">
                  Visit our media centre <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </ContentLayout>);

}
