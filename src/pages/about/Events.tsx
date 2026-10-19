import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BellRingIcon, CalendarPlusIcon, CheckCircle2Icon, FileTextIcon, LeafIcon, LineChartIcon, PresentationIcon, UsersIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Breadcrumb, ContentLayout, btnPrimary, container } from '../../components/patterns';
import { CalendarEvent, eventCalendar2026, formatDate } from '../../data/media';
import { latestReport } from '../../data/sustainability';

const HERO_IMAGE = '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg';
const AGM_IMAGE = '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg';
const uploads = 'https://www.cicinsurancegroup.com/wp-content/uploads';

type Kind = 'Results' | 'Investor briefing' | 'AGM' | 'Sustainability';
const kinds: Record<Kind, {icon: LucideIcon;colour: string;ink?: boolean;}> = {
  Results: { icon: LineChartIcon, colour: 'bg-cic-orange' },
  'Investor briefing': { icon: PresentationIcon, colour: 'bg-cic-amber', ink: true },
  AGM: { icon: UsersIcon, colour: 'bg-[#1d1d1d]' },
  Sustainability: { icon: LeafIcon, colour: 'bg-[#3F7E44]' }
};

type EventDetail = {kind: Kind;title: string;body: string;image: string;docs: {label: string;href?: string;to?: string;}[];};

/** Extra detail for each calendar entry. Documents are the real files from the investor relations library. */
const details: Record<string, EventDetail> = {
  'Release of the audited financial results for the year ended 31st December 2025': {
    kind: 'Results',
    title: 'Full-year 2025 results',
    body: 'We published our audited financial results for the year ended 31 December 2025.',
    image: '/04fbb304-f647-46e9-b229-2e5497528707.jpg',
    docs: [
    { label: 'Full year 2025 financial results', href: `${uploads}/2026/03/CIC-Group-Full-Year-2025-for-Print.pdf` },
    { label: 'Annual report and financial statements 2025', href: `${uploads}/2026/05/CIC-GROUP-ANNUAL-REPORT-LATEST-2025-7_compressed.pdf` }]

  },
  'Group Investor Briefing': {
    kind: 'Investor briefing',
    title: 'Group investor briefing',
    body: 'Our leadership took investors and analysts through the full-year performance and the outlook for the group.',
    image: '/d694dffc-d1e8-4a02-b91b-a3916205270c.jpg',
    docs: [{ label: 'Past investor briefing presentations', to: '/about/investor-relations#library' }]
  },
  '47th Annual General Meeting': {
    kind: 'AGM',
    title: '47th Annual General Meeting',
    body: 'Shareholders met to receive the annual report, vote on the resolutions and put their questions to the board.',
    image: AGM_IMAGE,
    docs: [
    { label: 'AGM notice', href: `${uploads}/2026/05/AGM-Notice.pdf` },
    { label: 'AGM polling results', href: `${uploads}/2026/05/AGM-POLLING-RESULTS.pdf` },
    { label: 'Questions and responses', href: `${uploads}/2026/05/CIC-INSURANCE-GROUP-PLC-AGM-Questions-and-Responses-May-2026.pdf` }]

  },
  "Publication of Group's Sustainability Report": {
    kind: 'Sustainability',
    title: 'Sustainability report',
    body: 'Our yearly report on progress against our environmental, social and governance commitments.',
    image: '/a84679f1-42c0-4e9b-ab49-645ec6530114.jpg',
    docs: [{ label: latestReport.title, href: latestReport.href }, { label: 'Our sustainability approach', to: '/about/sustainability' }]
  },
  'Release of the 2026 Half-Year Financial Results': {
    kind: 'Results',
    title: 'Half-year 2026 results',
    body: 'Profit after tax rose 70%, to about KSh 1.09 billion, for the six months to 30 June 2026.',
    image: '/cc1fa332-e7e8-46c7-847e-2ead4c6b6142.jpg',
    docs: [
    { label: 'Half year 2026 results', href: `${uploads}/2026/08/CIC-Group-Full-Page-Half-Year-2026-Results.pdf` },
    { label: 'Read the press release', to: '/about/media-centre' }]

  }
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const isPast = (e: CalendarEvent) => new Date(`${e.date}T23:59:59`) < new Date();

/** Download a single-event .ics file so people can add it to their calendar. */
function addToCalendar(e: CalendarEvent, title: string) {
  const day = e.date.replace(/-/g, '');
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CIC Group//Events//EN', 'BEGIN:VEVENT', `UID:${day}-${title.replace(/\W+/g, '')}@cic`, `DTSTART;VALUE=DATE:${day}`, `SUMMARY:CIC Group: ${title}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: `cic-${day}.ics` });
  a.click();
  URL.revokeObjectURL(url);
}

function DocLink({ d }: {d: EventDetail['docs'][number];}) {
  const cls = 'inline-flex items-center gap-1.5 text-[13px] font-semibold text-cic-red hover:underline';
  return d.to ?
  <Link to={d.to} className={cls}><ArrowRightIcon className="h-4 w-4" aria-hidden="true" /> {d.label}</Link> :
  <a href={d.href} target="_blank" rel="noreferrer" className={cls}><FileTextIcon className="h-4 w-4" aria-hidden="true" /> {d.label} <span className="font-normal text-cic-muted">PDF</span></a>;
}

export function Events() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [kind, setKind] = useState<Kind | 'All'>('All');
  const [status, setStatus] = useState<'All' | 'Upcoming' | 'Past'>('All');
  const events = eventCalendar2026.map((e, i) => ({ e, i, d: details[e.name], date: new Date(`${e.date}T00:00:00`), past: isPast(e) }));
  const agm = events.find((x) => x.d?.kind === 'AGM');
  const shown = events.filter((x) => (kind === 'All' || x.d?.kind === kind) && (status === 'All' || (status === 'Past' ? x.past : !x.past)));
  const countFor = (k: Kind | 'All') => events.filter((x) => k === 'All' || x.d?.kind === k).length;

  const chip = (active: boolean) =>
  `flex items-center gap-2 border px-4 py-1.5 text-[13px] font-semibold transition-colors duration-150 ${
  active ? 'border-cic-orange bg-cic-orange text-white' : 'border-cic-line bg-white hover:border-cic-red hover:text-cic-red'}`;

  return (
    <ContentLayout
      contained={false}
      top={
      <section className="relative w-full overflow-hidden bg-[#2a1a17]">
          <img src={HERO_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 25%' }} />
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
          <div className={`${container} relative flex min-h-[300px] flex-col justify-center py-12 text-white lg:min-h-[340px]`}>
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About us', to: '/about' }, { label: 'Events' }]} inverse />
            <h1 className="mt-4 max-w-2xl text-[40px] font-semibold leading-tight lg:text-[52px]">Events</h1>
          </div>
        </section>
      }>

      {/* Event cards */}
      <section aria-labelledby="all-events" className={`${container} pt-14`}>
        <h2 id="all-events" className="text-[32px] font-semibold">Event calendar 2026</h2>
        <p className="mt-1 text-[15px]">Key dates for shareholders and stakeholders: results announcements, investor briefings and our Annual General Meeting.</p>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-cic-line pb-5">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by event type">
            {(['All', ...Object.keys(kinds)] as (Kind | 'All')[]).map((k) => {
              const K = k === 'All' ? null : kinds[k];
              return (
                <button key={k} onClick={() => setKind(k)} aria-pressed={kind === k} className={chip(kind === k)}>
                  {K && <span className={`h-2.5 w-2.5 rounded-full ${K.colour} ${kind === k ? 'ring-1 ring-white' : ''}`} aria-hidden="true" />}
                  {k === 'All' ? 'All events' : k}
                  <span className={`text-[11px] ${kind === k ? 'text-white/80' : 'text-cic-muted'}`}>{countFor(k)}</span>
                </button>);

            })}
          </div>
          <div className="flex border border-cic-line bg-white text-[13px] font-semibold" role="group" aria-label="Filter by date">
            {(['All', 'Upcoming', 'Past'] as const).map((s) =>
            <button
              key={s}
              onClick={() => setStatus(s)}
              aria-pressed={status === s}
              className={`px-4 py-1.5 transition-colors ${status === s ? 'bg-cic-burgundy text-white' : 'hover:text-cic-red'}`}>

                {s === 'All' ? 'Any date' : s}
              </button>
            )}
          </div>
        </div>
        <p className="mt-4 text-[13px] text-cic-muted" aria-live="polite">
          Showing {shown.length} of {events.length} events
        </p>

        {shown.length === 0 &&
        <div className="mt-4 bg-cic-mist p-8 text-center">
            <p className="text-[16px] font-semibold">
              {status === 'Upcoming' ? 'No upcoming events right now.' : 'No events match these filters.'}
            </p>
            <p className="mt-1 text-[14px] text-cic-muted">
              {status === 'Upcoming' ? "All of this year's events have taken place. The 2027 calendar will be published here." : 'Try another type or date.'}
            </p>
            <button onClick={() => { setKind('All'); setStatus('All'); }} className="mt-4 text-[14px] font-semibold text-cic-red hover:underline">
              Show all events
            </button>
          </div>
        }
        <ol className="mt-4 space-y-5">
          {shown.map(({ e, i, d, date, past }) => {
            const K = kinds[d?.kind ?? 'Results'];
            return (
              <li key={e.name} id={`event-${i}`} className="grid scroll-mt-6 overflow-hidden bg-white shadow-card md:grid-cols-[150px_220px_1fr]">
                <div className={`${K.colour} ${K.ink ? 'text-cic-ink' : 'text-white'} flex items-center gap-4 p-5 md:flex-col md:justify-center md:gap-0`}>
                  <span className="text-[44px] font-bold leading-none">{date.getDate()}</span>
                  <span className="text-[15px] font-semibold uppercase tracking-wide">{MONTHS[date.getMonth()]} {date.getFullYear()}</span>
                  <span className="ml-auto text-[12px] opacity-80 md:ml-0 md:mt-2">{date.toLocaleDateString('en-GB', { weekday: 'long' })}</span>
                </div>
                <img src={d?.image ?? HERO_IMAGE} alt="" className="hidden h-full min-h-[180px] w-full object-cover md:block" />
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wide text-cic-red">
                      <K.icon className="h-4 w-4" aria-hidden="true" /> {d?.kind ?? 'Event'}
                    </span>
                    {past ?
                    <span className="flex items-center gap-1 bg-cic-mist px-2 py-0.5 text-[11px] font-semibold text-cic-muted">
                        <CheckCircle2Icon className="h-3 w-3" aria-hidden="true" /> Took place
                      </span> :
                    <span className="bg-cic-amber px-2 py-0.5 text-[11px] font-semibold text-cic-ink">Coming up</span>
                    }
                  </div>
                  <h3 className="mt-2 text-[22px] font-semibold leading-snug">{d?.title ?? e.name}</h3>
                  {d && <p className="mt-1 text-[14px] text-cic-muted">{d.body}</p>}
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {d?.docs.map((doc) => <DocLink key={doc.label} d={doc} />)}
                    {!past &&
                    <button onClick={() => addToCalendar(e, d?.title ?? e.name)} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-cic-red hover:underline">
                        <CalendarPlusIcon className="h-4 w-4" aria-hidden="true" /> Add to calendar
                      </button>
                    }
                  </div>
                </div>
              </li>);

          })}
        </ol>
      </section>

      {/* AGM spotlight */}
      {agm &&
      <section aria-labelledby="agm" className={`${container} pt-16`}>
          <div className="grid overflow-hidden bg-cic-burgundy text-white shadow-card lg:grid-cols-2">
            <img src={AGM_IMAGE} alt="" className="h-full min-h-[260px] w-full object-cover" />
            <div className="relative p-8 lg:p-12">
              <span className="absolute left-0 top-0 h-1.5 w-24 bg-cic-amber" aria-hidden="true" />
              <p className="text-[13px] font-semibold uppercase tracking-wide text-white/80">Shareholders</p>
              <h2 id="agm" className="mt-2 text-[30px] font-semibold leading-tight">Your voice at our AGM</h2>
              <p className="mt-3 text-[15px] text-white/90">
                Our {agm.d.title} took place on {formatDate(agm.e.date)}. Read the notice, the voting results and the board's answers to
                shareholder questions.
              </p>
              <Link to="/about/investor-relations#library" className="mt-6 inline-block bg-white px-6 py-2.5 text-[15px] font-semibold text-cic-red hover:bg-[#FBECEC]">
                Shareholder information
              </Link>
            </div>
          </div>
        </section>
      }

      {/* Alerts */}
      <section aria-labelledby="alerts" className="mt-16 bg-cic-mist py-14">
        <div className={`${container} grid items-center gap-8 lg:grid-cols-[1fr_1fr]`}>
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-cic-orange text-white">
              <BellRingIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 id="alerts" className="text-[28px] font-semibold">Never miss a date</h2>
              <p className="mt-1 text-[15px]">Get an email when we publish results, AGM notices and next year's calendar.</p>
            </div>
          </div>
          {subscribed ?
          <p className="flex items-center gap-2 bg-white p-5 text-[15px] font-semibold shadow-card" role="status">
              <CheckCircle2Icon className="h-5 w-5 text-cic-red" aria-hidden="true" /> You're on the list. (Design concept: nothing was sent.)
            </p> :

          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              if (/\S+@\S+\.\S+/.test(email)) setSubscribed(true);
            }}
            className="flex flex-col gap-3 sm:flex-row">

              <input
              type="email"
              required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="Your email address"
              aria-label="Your email address"
              className="flex-1 border border-cic-line bg-white px-4 py-3 text-[15px] outline-none focus:border-cic-burgundy" />

              <button type="submit" className={btnPrimary}>Sign me up</button>
            </form>
          }
        </div>
      </section>
    </ContentLayout>);

}
