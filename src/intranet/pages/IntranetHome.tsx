import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon, CircleHelpIcon, FileTextIcon, FolderIcon, HeartIcon, ListChecksIcon,
  MapPinIcon, MessageSquareIcon, MoreHorizontalIcon, PartyPopperIcon, ShieldIcon, ThumbsUpIcon, UsersIcon, XIcon } from
'lucide-react';
import { IntranetLayout, container } from '../IntranetLayout';
import { embeds, heroSlides, homeEvents, newJoiners, quickLinks } from '../data';
import { EmbedFrame } from '../EmbedFrame';
import { toast, useRole } from '../role';

const SLIDE_MS = 6000;
const JOINERS_PER_PAGE = 3;
const linkIcons = [FileTextIcon, CalendarDaysIcon, ShieldIcon, CircleHelpIcon, FolderIcon, UsersIcon];
const initials = (n: string) => n.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

const card = 'rounded-lg bg-white p-5 shadow-card';

function CardHead({ title, right }: {title: string;right?: React.ReactNode;}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="text-[19px] font-semibold">{title}</h2>
      {right && <div className="ml-auto flex items-center gap-4 text-[13px]">{right}</div>}
    </div>);

}

const viewAll = (to: string, label = 'View all') =>
<Link to={to} className="font-semibold text-cic-red hover:underline">{label}</Link>;


function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % heroSlides.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [i, paused]);
  const go = (d: number) => setI((n) => (n + d + heroSlides.length) % heroSlides.length);
  const s = heroSlides[i];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured news"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative h-[300px] overflow-hidden rounded-lg bg-[#2a1a17] shadow-card md:h-[380px]">

      {heroSlides.map((x, n) =>
      <img key={x.image} src={x.image} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${n === i ? 'opacity-100' : 'opacity-0'}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 text-white md:flex-row md:items-end md:p-8" aria-live="polite">
        <div className="max-w-2xl">
          <span className="bg-white px-2 py-0.5 text-[11px] font-semibold text-cic-red">{s.tag}</span>
          <h1 className="mt-3 text-[26px] font-semibold leading-tight md:text-[30px]">{s.title}</h1>
          <p className="mt-2 text-[15px] text-white/90">{s.body}</p>
        </div>
        <div className="flex items-center gap-3 md:ml-auto">
          <button onClick={() => go(-1)} aria-label="Previous slide" className="flex h-8 w-8 items-center justify-center bg-white text-cic-ink hover:bg-white/90">
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {heroSlides.map((x, n) =>
            <button key={x.title} onClick={() => setI(n)} aria-label={`Slide ${n + 1}: ${x.title}`} aria-current={n === i} className={`h-1.5 rounded-full transition-all ${n === i ? 'w-5 bg-white' : 'w-1.5 bg-white/60'}`} />
            )}
          </div>
          <button onClick={() => go(1)} aria-label="Next slide" className="flex h-8 w-8 items-center justify-center bg-white text-cic-ink hover:bg-white/90">
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>);

}

function MyTasks() {
  const role = useRole();
  const [n0, n1] = role.stats;
  return (
    <section className={card} aria-label="My tasks">
      <CardHead title="My tasks" right={<><span className="text-cic-muted">As {role.name}</span>{viewAll('/intranet', `View all ${n0[0] + n1[0]} tasks`)}</>} />
      <ul className="grid grid-cols-3 gap-3">
        {role.stats.map(([v, l]) =>
        <li key={l} className="border border-cic-line px-4 py-3">
            <p className="text-[28px] font-semibold leading-none text-cic-red">{v}</p>
            <p className="mt-2 text-[12px]">{l}</p>
          </li>
        )}
      </ul>
      <div className="mt-3 flex items-center gap-3 border border-cic-line px-4 py-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FBECEC] text-cic-red">
          <ListChecksIcon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-semibold">{role.next[0]}</span>
          <span className="block text-[12px] text-cic-muted">{role.next[1]}</span>
        </span>
        <button onClick={() => toast(`${role.next[2]}: opens in the app`)} className="bg-cic-orange px-4 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#8A1B23]">
          {role.next[2]}
        </button>
      </div>
    </section>);

}

/** Conversations come from Viva Engage, embedded in an iframe. */
function Conversations() {
  const e = embeds.conversations;
  return (
    <section className={card} aria-label="Conversations">
      <CardHead title="Conversations" right={<a href={e.openUrl} target="_blank" rel="noreferrer" className="font-semibold text-cic-red hover:underline">Open in Viva Engage</a>} />
      <EmbedFrame src={e.src} title={e.title} openUrl={e.openUrl} height={e.height} />
    </section>);

}

function QuickLinks() {
  return (
    <section className={card} aria-label="Quick links">
      <CardHead title="Quick links" right={viewAll('/intranet')} />
      <ul className="grid grid-cols-3 gap-y-5">
        {quickLinks.map((l, i) => {
          const Icon = linkIcons[i];
          return (
            <li key={l}>
              <a href="#" onClick={(e) => {e.preventDefault();toast(`${l} opens in the app`);}} className="group flex flex-col items-center gap-2 text-center text-[13px]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cic-red text-white transition-transform group-hover:scale-105">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="group-hover:text-cic-red">{l}</span>
              </a>
            </li>);

        })}
      </ul>
    </section>);

}

function Events() {
  return (
    <section className={card} aria-label="Events">
      <CardHead title="Events" right={viewAll('/intranet/events')} />
      <ul className="divide-y divide-cic-line">
        {homeEvents.map((e) =>
        <li key={e.title} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            <span className="flex h-12 w-11 shrink-0 flex-col items-center justify-center border border-cic-line">
              <span className="text-[10px] text-cic-red">{e.month}</span>
              <span className="text-[17px] font-semibold leading-none">{e.day}</span>
            </span>
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold">{e.title}</span>
              <span className="mt-1 flex items-center gap-1.5 text-[12px] text-cic-muted"><CalendarDaysIcon className="h-3.5 w-3.5" aria-hidden="true" /> {e.time}</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[12px] text-cic-muted"><MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" /> {e.where}</span>
            </span>
          </li>
        )}
      </ul>
    </section>);

}

function NewJoiners() {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(newJoiners.length / JOINERS_PER_PAGE);
  return (
    <section className={card} aria-label="New joiners">
      <CardHead title="New joiners" />
      <p className="flex items-center gap-2 text-[12px]">
        <span className="bg-[#FBECEC] px-1.5 py-px font-semibold text-cic-red">This month</span>
        <span className="text-cic-muted">{newJoiners.length} new colleagues</span>
      </p>
      <ul className="mt-3 space-y-3" aria-live="polite">
        {newJoiners.slice(page * JOINERS_PER_PAGE, page * JOINERS_PER_PAGE + JOINERS_PER_PAGE).map((p) =>
        <li key={p.name} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cic-red text-[12px] font-bold text-white">{initials(p.name)}</span>
            <span className="leading-tight">
              <span className="block text-[14px] font-semibold">{p.name}</span>
              <span className="block text-[12px] text-cic-muted">{p.team}</span>
              <span className="block text-[12px] text-cic-red">{p.joined}</span>
            </span>
          </li>
        )}
      </ul>
      <div className="mt-4 flex items-center gap-2 text-[12px]">
        <button onClick={() => setPage(page - 1)} disabled={page === 0} aria-label="Previous joiners" className="flex h-7 w-7 items-center justify-center hover:text-cic-red disabled:opacity-35"><ChevronLeftIcon className="h-4 w-4" /></button>
        <span>{page + 1} of {pages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === pages - 1} aria-label="More joiners" className="flex h-7 w-7 items-center justify-center hover:text-cic-red disabled:opacity-35"><ChevronRightIcon className="h-4 w-4" /></button>
        <button onClick={() => toast('Welcome message posted to All Company')} className="ml-auto text-[13px] font-semibold text-cic-red hover:underline">Welcome them →</button>
      </div>
    </section>);

}

function EngagementHub() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <aside aria-label="Engagement Hub" className="fixed bottom-6 right-6 z-30 flex w-[300px] items-center gap-3 rounded-lg bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)] animate-[fadeIn_300ms_ease-out]">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FBECEC] text-cic-red">
        <PartyPopperIcon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="flex-1">
        <span className="block text-[14px] font-semibold">Engagement Hub</span>
        <button onClick={() => toast('Engagement Hub opens in Viva Engage')} className="text-[13px] font-semibold text-cic-red hover:underline">Give kudos, share feedback →</button>
      </span>
      <button onClick={() => setOpen(false)} aria-label="Dismiss Engagement Hub" className="p-1 text-cic-muted hover:text-cic-red">
        <XIcon className="h-4 w-4" />
      </button>
    </aside>);

}

/** Intranet home dashboard, laid out as in cic-intranet-prototype.html. */
export function IntranetHome() {
  return (
    <IntranetLayout tone="mist">
      <div>
        <div className={`${container} pt-6`}>
          <Hero />
          <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.75fr_1fr]">
            <div className="space-y-5">
              <MyTasks />
              <Conversations />
            </div>
            <div className="space-y-5">
              <QuickLinks />
              <Events />
              <NewJoiners />
            </div>
          </div>
        </div>
      </div>
      <EngagementHub />
    </IntranetLayout>);

}
