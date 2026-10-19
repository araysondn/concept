import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDaysIcon, CalendarPlusIcon, CheckIcon, ChevronDownIcon, ClockIcon, ExternalLinkIcon, MapPinIcon, MonitorIcon,
  ShuffleIcon, UsersIcon, VideoIcon } from
'lucide-react';
import { FilterChips, IntranetLayout, container, ghostBtn } from '../IntranetLayout';
import { addToCalendar, daysUntil, day, googleCalendarUrl, longDate, month, relativeLabel, year } from '../shared';
import { eventTypes, featuredEvent, nextEvents, upcomingEvents } from '../data';
import type { IntranetEvent } from '../data';

// One brand colour throughout (after design.absa.africa/past-events): red, white and greys only.

const filters = ['All Events', 'This Month', ...eventTypes] as const;
type Filter = typeof filters[number];

const modeIcon = { Physical: MapPinIcon, Virtual: MonitorIcon, Hybrid: ShuffleIcon };

function matches(e: IntranetEvent, f: Filter) {
  if (f === 'All Events') return true;
  if (f === 'This Month') {
    const now = new Date();
    const d = new Date(`${e.date}T00:00:00`);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }
  return e.type === f;
}

function Mode({ e }: {e: IntranetEvent;}) {
  const Icon = modeIcon[e.mode];
  return <span className="inline-flex items-center gap-1.5"><Icon className="h-4 w-4" aria-hidden="true" /> {e.mode}</span>;
}

/** "In 10 days" / "Ended": solid red when within a week, outlined otherwise, grey once past. */
function When({ iso }: {iso: string;}) {
  const n = daysUntil(iso);
  const cls = n < 0 ? 'border-cic-line text-cic-muted' : n <= 7 ? 'border-cic-red bg-cic-red text-white' : 'border-cic-red text-cic-red';
  return <span className={`inline-block border px-2 py-0.5 text-[11px] font-semibold ${cls}`}>{relativeLabel(iso)}</span>;
}

/** "Add to calendar" with a choice of Outlook/Apple (.ics) or Google. */
function CalendarMenu({ e, light = false, compact = false }: {e: IntranetEvent;light?: boolean;compact?: boolean;}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (ev: MouseEvent | KeyboardEvent) => {
      if (ev instanceof KeyboardEvent ? ev.key === 'Escape' : !ref.current?.contains(ev.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {document.removeEventListener('mousedown', close);document.removeEventListener('keydown', close);};
  }, [open]);

  const btn = compact ?
  'flex h-[32px] w-[32px] items-center justify-center border border-cic-line text-cic-red transition-colors hover:border-cic-red' :
  light ?
  'inline-flex items-center gap-1.5 border border-white px-4 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/15' :
  ghostBtn;
  const item = 'flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] text-cic-ink hover:bg-cic-mist';
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu" aria-label="Add to calendar" title="Add to calendar" className={btn}>
        <CalendarPlusIcon className="h-4 w-4" aria-hidden="true" />
        {!compact &&
        <>
            {' '}Add to calendar
            <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          </>
        }
      </button>
      {open &&
      <div role="menu" className={`absolute ${compact ? 'left-0' : 'right-0'} top-full z-20 mt-1 w-[210px] bg-white py-1.5 shadow-card`}>
          <button role="menuitem" onClick={() => {addToCalendar(e);setOpen(false);}} className={item}>
            <CalendarDaysIcon className="h-4 w-4 text-cic-red" aria-hidden="true" /> Outlook or Apple (.ics)
          </button>
          <a role="menuitem" href={googleCalendarUrl(e)} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className={item}>
            <ExternalLinkIcon className="h-4 w-4 text-cic-red" aria-hidden="true" /> Google Calendar
          </a>
        </div>
      }
    </div>);

}

function GoingButton({ going, onToggle, light = false }: {going: boolean;onToggle: () => void;light?: boolean;}) {
  const cls = light ?
  going ? 'border-white bg-transparent text-white' : 'border-white bg-white text-cic-red hover:bg-white/90' :
  going ? 'border-cic-red bg-white text-cic-red' : 'border-cic-orange bg-cic-orange text-white hover:bg-[#8A1B23]';
  return (
    <button onClick={onToggle} aria-pressed={going} className={`inline-flex items-center gap-1.5 border px-4 py-1.5 text-[13px] font-semibold transition-colors ${cls}`}>
      {going && <CheckIcon className="h-4 w-4" aria-hidden="true" />}
      {going ? "You're going" : "I'm going"}
    </button>);

}

function EventCard({ e, going, onToggle }: {e: IntranetEvent;going: boolean;onToggle: () => void;}) {
  return (
    <article className="flex overflow-hidden rounded-lg bg-white shadow-card">
      <div className="flex w-[96px] shrink-0 flex-col items-center justify-center bg-cic-burgundy py-5 text-white">
        <span className="text-[32px] font-bold leading-none">{day(e.date)}</span>
        <span className="mt-1 text-[13px] font-semibold uppercase">{month(e.date)}</span>
        <span className="text-[12px] text-white/80">{year(e.date)}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-semibold leading-snug">{e.title}</h3>
        <p className="mt-1 text-[13px] text-cic-muted">{e.where} · {e.time}</p>
        <div className="mt-auto flex items-center gap-3 pt-4">
          <GoingButton going={going} onToggle={onToggle} />
          <CalendarMenu compact e={e} />
          <span className="ml-auto"><When iso={e.date} /></span>
        </div>
      </div>
    </article>);

}

export function IntranetEvents() {
  const [filter, setFilter] = useState<Filter>('All Events');
  const [going, setGoing] = useState<string[]>([]);
  const toggle = (id: string) => setGoing((g) => g.includes(id) ? g.filter((x) => x !== id) : [...g, id]);

  const showFeatured = matches(featuredEvent, filter);
  const next = nextEvents.filter((e) => matches(e, filter));
  const upcoming = upcomingEvents.filter((e) => matches(e, filter));
  const all = [...nextEvents, ...upcomingEvents];
  const counts = Object.fromEntries(filters.map((f) => [f, all.filter((e) => matches(e, f)).length])) as Record<Filter, number>;
  const toGo = daysUntil(featuredEvent.date);

  return (
    <IntranetLayout>
      {/* One red band carries the title, filters and the featured row, ending in a soft curve. */}
      <section className="rounded-b-[50%_64px] bg-gradient-to-b from-[#5C1015] via-cic-wine to-cic-red pb-20 text-white">
        <div className={`${container} pt-10`}>
          <nav aria-label="Breadcrumb" className="text-[12px]">
            <ol className="flex items-center gap-2">
              <li><Link to="/intranet" className="text-white/85 hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Events</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-[40px] font-semibold leading-tight">Events Calendar</h1>
          <p className="mt-2 max-w-2xl text-[15px] text-white/90">Browse upcoming events across all subsidiaries.</p>

          <div className="mt-8">
            <FilterChips dark label="Show" options={filters} value={filter} onChange={setFilter} counts={counts} />
          </div>
          {going.length > 0 &&
          <p className="mt-4 flex items-center gap-2 text-[13px] text-white" role="status">
              <CheckIcon className="h-4 w-4" aria-hidden="true" /> You're going to {going.length} {going.length === 1 ? 'event' : 'events'}. Add them to your calendar so you don't miss them.
            </p>
          }

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            {showFeatured ?
            <article className="relative flex min-h-[360px] overflow-hidden rounded-lg bg-[#2a1a17] shadow-card">
                <img src="/intranet/hero-home.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden="true" />
                {toGo >= 0 &&
              <div className="absolute right-5 top-5 rounded bg-white px-4 py-2 text-center text-cic-ink">
                    <span className="block text-[28px] font-bold leading-none text-cic-red">{toGo}</span>
                    <span className="block text-[11px] font-semibold uppercase">{toGo === 1 ? 'day to go' : 'days to go'}</span>
                  </div>
              }
                <div className="relative mt-auto p-6 md:p-8">
                  <p className="text-[12px] font-bold uppercase tracking-wide text-white/85">Featured · {featuredEvent.type}</p>
                  <h2 className="mt-2 text-[32px] font-semibold leading-tight">{featuredEvent.title}</h2>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[14px]">
                    <li className="flex items-center gap-1.5"><CalendarDaysIcon className="h-4 w-4" aria-hidden="true" /> {longDate(featuredEvent.date)}</li>
                    <li className="flex items-center gap-1.5"><MapPinIcon className="h-4 w-4" aria-hidden="true" /> {featuredEvent.where}</li>
                    <li className="flex items-center gap-1.5"><ClockIcon className="h-4 w-4" aria-hidden="true" /> {featuredEvent.time}</li>
                    <li><Mode e={featuredEvent} /></li>
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <GoingButton light going={going.includes(featuredEvent.id)} onToggle={() => toggle(featuredEvent.id)} />
                    <CalendarMenu light e={featuredEvent} />
                  </div>
                </div>
              </article> :

            <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-white/30 p-6 text-center text-[14px] text-white/85">
                The featured event isn't in this filter.
              </div>
            }

            <section aria-labelledby="next-title" className="rounded-lg bg-white text-cic-ink shadow-card">
              <h2 id="next-title" className="border-b border-cic-line px-5 py-4 text-[19px] font-semibold">Next upcoming events</h2>
              {next.length ?
              <ul className="divide-y divide-cic-line px-5">
                  {next.map((e) => {
                  const past = daysUntil(e.date) < 0;
                  return (
                    <li key={e.id} className={`flex items-center gap-4 py-3.5 ${past ? 'opacity-55' : ''}`}>
                        <span className="w-10 shrink-0 text-center">
                          <span className={`block text-[20px] font-bold leading-none ${past ? 'text-cic-muted' : 'text-cic-red'}`}>{day(e.date)}</span>
                          <span className="block text-[11px] uppercase text-cic-muted">{month(e.date)}</span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14px] font-semibold">{e.title}</span>
                          <span className="mt-0.5 flex gap-3 text-[12px] text-cic-muted">{e.time} <Mode e={e} /></span>
                        </span>
                        <span className="flex flex-col items-end gap-1">
                          <When iso={e.date} />
                          {going.includes(e.id) && <span className="text-[11px] font-semibold text-cic-red">Going</span>}
                        </span>
                      </li>);

                })}
                </ul> :
              <p className="px-5 py-6 text-[14px] text-cic-muted">Nothing coming up in this filter.</p>}
            </section>
          </div>
        </div>
      </section>

      <div className={container}>
        <section aria-labelledby="upcoming-title" className="pt-12">
          <h2 id="upcoming-title" className="text-[32px] font-semibold">Upcoming Events</h2>
          {upcoming.length ?
          <div className="mt-5 grid gap-5 md:grid-cols-2">
              {upcoming.map((e) => <EventCard key={e.id} e={e} going={going.includes(e.id)} onToggle={() => toggle(e.id)} />)}
            </div> :

          <div className="mt-5 rounded-lg bg-cic-mist px-6 py-10 text-center">
              <p className="text-[18px] font-semibold">No events match this filter</p>
              <button onClick={() => setFilter('All Events')} className={`${ghostBtn} mt-4`}>Show all events</button>
            </div>
          }
        </section>
      </div>
    </IntranetLayout>);

}
