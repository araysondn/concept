import React, { useState } from 'react';
import { ChevronDownIcon, UsersIcon, GraduationCapIcon, HandshakeIcon, HeartIcon, HeartPulseIcon, PiggyBankIcon, SunIcon } from 'lucide-react';
import { CardGrid, ContentLayout, DataTable, PageSections, PageHero, Section, Timeline } from '../../components/patterns';
import { applicationSteps, benefits, careersIntro, careersSite, Vacancy, vacancies, whatsInItForYou } from '../../data/careers';
import { formatDate } from '../../data/media';
import { jobSlug } from '../../data/jobs';
import { productArt } from '../../data/productImages';
import type { ProductImage } from '../../data/productImages';
import { ProductArt } from '../../components/products/ProductArt';
import { Link } from 'react-router-dom';

const HERO = '/19f98733-386d-4c89-bb7e-c68bd62f3cc7.jpg';
const valueIcons = [UsersIcon, GraduationCapIcon, HandshakeIcon, HeartIcon];
const benefitIcons = [HeartPulseIcon, PiggyBankIcon, SunIcon];
// Health (medical and life cover), future (retirement plan), rest (leave).
const benefitImages: ProductImage[] = [
productArt.medisure,
productArt.pension,
{ src: '/b94fbfcf-01cb-464f-83ac-76f9511ef27c.jpg', position: 'center 35%' }];

// Roles with a closing date first (soonest first), then older listings with no stated deadline.
const sorted = [...vacancies].sort((a, b) => {
  if (a.closes && b.closes) return a.closes.localeCompare(b.closes);
  if (a.closes) return -1;
  if (b.closes) return 1;
  return b.posted.localeCompare(a.posted);
});

type VacancyFilters = {location: string;type: string;status: string;};
const unique = (xs: string[]) => Array.from(new Set(xs)).sort();
const filterDefs: {key: keyof VacancyFilters;label: string;all: string;options: string[];}[] = [
{ key: 'location', label: 'Location', all: 'All locations', options: unique(vacancies.map((v) => v.location)) },
{ key: 'type', label: 'Job type', all: 'All job types', options: unique(vacancies.map((v) => v.type)) },
{ key: 'status', label: 'Closing date', all: 'Any closing date', options: ['Closing soon (next 14 days)', 'Has a closing date', 'No closing date stated'] }];


function matchesStatus(v: Vacancy, status: string) {
  if (!status) return true;
  if (status === 'No closing date stated') return !v.closes;
  if (!v.closes) return false;
  if (status === 'Closing soon (next 14 days)') {
    const days = (new Date(`${v.closes}T23:59:59`).getTime() - Date.now()) / 86400000;
    return days >= 0 && days <= 14;
  }
  return true;
}

export function Careers() {
  const [filters, setFilters] = useState<VacancyFilters>({ location: '', type: '', status: '' });
  const shownJobs = sorted.filter(
    (v) => (!filters.location || v.location === filters.location) && (!filters.type || v.type === filters.type) && matchesStatus(v, filters.status)
  );

  return (
    <ContentLayout
      top={
      <PageHero
        title="Realise your potential with CIC Group"
        image={HERO}
        intro={careersIntro}
        ctas={[{ label: 'See open roles', href: '#tab-vacancies' }, { label: 'Visit our careers site', href: careersSite }]}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About CIC', to: '/about' }, { label: 'Careers' }]} />

      }>

      <PageSections
        sections={[
        {
          id: 'why-cic',
          content:
          <>
      <Section title="What's in it for you" id="whats-in-it" className="pt-10">
        <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
          {whatsInItForYou.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <li key={v} className="flex flex-col pr-4">
                <Icon className="h-6 w-6 text-cic-ink" strokeWidth={1.5} aria-hidden="true" />
                <p className="mt-3 text-[14px] font-semibold">{v}</p>
              </li>);

          })}
        </ul>
      </Section>

      <Section title="Attractive benefits" id="benefits" intro="We take care of you, so you can do your best work.">
        <ul className="grid gap-5 md:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = benefitIcons[i];
            return (
              <li key={b.title} className="group flex flex-col bg-white shadow-card">
                <span className="relative block">
                  <ProductArt image={benefitImages[i]} className="h-[220px]" />
                  <span className="absolute -bottom-5 left-5 flex h-11 w-11 items-center justify-center bg-cic-orange text-white shadow-card" aria-hidden="true">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                </span>
                <span className="block border-t-4 border-cic-orange px-5 pb-6 pt-8">
                  <span className="block text-[19px] font-semibold">{b.title}</span>
                  <span className="mt-2 block text-[14px] leading-relaxed text-cic-muted">{b.body}</span>
                </span>
              </li>);

          })}
        </ul>

      </Section>
          </>

        },
        {
          id: 'how-to-apply',
          content:
      <Section title="Here's how to apply" id="process" intro="Six steps from application to your first day with us." className="pt-10">
        <div className="bg-white p-6 shadow-card md:p-10">
          <Timeline
            entries={applicationSteps.map((s, i) => ({ year: `Step ${i + 1}`, title: s.title, body: s.body }))} />

        </div>
      </Section>

        },
        {
          id: 'vacancies',
          content:
      <Section
        title="Discover our latest opportunities"
        id="vacancies"
        className="pt-10"
        intro="Choose a role to see the details and apply. Roles without a closing date are older listings that are still published.">

        <div className="mb-6 grid gap-4 bg-cic-mist p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          {filterDefs.map((f) =>
          <div key={f.key}>
              <label htmlFor={`vac-${f.key}`} className="block text-[12px] font-semibold">{f.label}</label>
              <div className="relative">
                <select
                id={`vac-${f.key}`}
                value={filters[f.key]}
                onChange={(e) => setFilters((s) => ({ ...s, [f.key]: e.target.value }))}
                className="mt-1 w-full appearance-none border border-cic-line bg-white px-3 py-2 pr-9 text-[14px] outline-none focus:border-cic-burgundy">

                  <option value="">{f.all}</option>
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 mt-0.5 h-4 w-4 -translate-y-1/2 text-cic-red" aria-hidden="true" />
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => setFilters({ location: '', type: '', status: '' })}
            disabled={!filters.location && !filters.type && !filters.status}
            className="h-[38px] px-2 text-left text-[14px] text-cic-orange underline disabled:text-cic-muted disabled:no-underline">

            Clear filters
          </button>
        </div>
        <p className="mb-3 text-[13px] text-cic-muted" aria-live="polite">
          Showing {shownJobs.length} of {sorted.length} vacancies
        </p>
        {shownJobs.length === 0 ?
        <div className="border border-cic-line p-8 text-center">
            <p className="text-[16px] font-semibold">No vacancies match these filters</p>
            <p className="mt-1 text-[14px] text-cic-muted">Try another location or job type, or check back soon.</p>
          </div> :

        <DataTable<Vacancy>
          caption="Open vacancies at CIC Group"
          rows={shownJobs}
          rowKey={(v) => v.href}
          columns={[
          {
            key: 'title',
            header: 'Role',
            render: (v) =>
            <Link to={`/about/careers/${jobSlug(v)}`} className="font-semibold text-cic-burgundy underline hover:text-cic-red">
                  {v.title}
                </Link>

          },
          { key: 'location', header: 'Location', render: (v) => v.location, summary: true },
          { key: 'type', header: 'Type', render: (v) => v.type },
          {
            key: 'closes',
            header: 'Closing date',
            render: (v) =>
            v.closes ?
            formatDate(v.closes) :

            <span className="italic text-cic-muted">Closing date not stated</span>,

            summary: true
          }]
          } />
        }

      </Section>

        }]
        } />
      <div className="pb-14" />
    </ContentLayout>);

}
