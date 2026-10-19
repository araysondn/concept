import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CalendarDaysIcon, DownloadIcon, ExternalLinkIcon, MailIcon, MessageSquareIcon, NewspaperIcon, PhoneIcon } from 'lucide-react';
import { Breadcrumb, ContentLayout, btnPrimary, btnOutlineInverse, container } from '../../components/patterns';
import { StoryCard } from '../../components/blog/StoryCard';
import { blogPosts } from '../../data/blog';
import { eventCalendar2026, formatDate, mediaTopics, pressReleases } from '../../data/media';
import type { MediaTopic, PressRelease } from '../../data/media';
import { hqChannels, socials } from '../../data/contactPage';

const HERO_IMAGE = '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg';
const ALL = 'All news';
const PAGE = 6;

function TopicTag({ topic, inverse = false }: {topic: MediaTopic;inverse?: boolean;}) {
  return (
    <span className={`inline-block px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${inverse ? 'bg-white text-cic-red' : 'bg-cic-orange text-white'}`}>
      {topic}
    </span>);

}

function ReleaseCard({ r }: {r: PressRelease;}) {
  return (
    <li>
      <a
        href={r.href}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full flex-col bg-white shadow-card transition-shadow duration-150 hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)]">

        <span className="relative block aspect-[16/10] overflow-hidden bg-cic-mist">
          <img src={r.image} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <span className="absolute left-3 top-3">
            <TopicTag topic={r.topic} />
          </span>
        </span>
        <span className="flex flex-1 flex-col p-5">
          <span className="text-[12px] text-cic-muted">{r.date ? formatDate(r.date) : 'Press release'}</span>
          <span className="mt-1.5 text-[17px] font-semibold leading-snug group-hover:text-cic-red">{r.title}</span>
          {r.summary && <span className="mt-2 text-[13px] text-cic-muted">{r.summary}</span>}
          <span className="mt-auto flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-cic-red">
            {r.pdf ?
            <><DownloadIcon className="h-4 w-4" aria-hidden="true" /> Download the release</> :
            <><ArrowRightIcon className="h-4 w-4" aria-hidden="true" /> Read the release</>
            }
          </span>
        </span>
      </a>
    </li>);

}

export function MediaCentre() {
  const [topic, setTopic] = useState<MediaTopic | typeof ALL>(ALL);
  const [shown, setShown] = useState(PAGE);
  const [lead, ...rest] = pressReleases;
  const sideStories = rest.slice(0, 2);
  const filtered = pressReleases.filter((r) => topic === ALL || r.topic === topic);
  const stories = blogPosts.slice(0, 3);

  const pickTopic = (t: MediaTopic | typeof ALL) => {
    setTopic(t);
    setShown(PAGE);
  };

  return (
    <ContentLayout
      contained={false}
      top={
      <section className="relative w-full overflow-hidden bg-[#1d1d1d]">
          <img src={HERO_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" style={{ objectPosition: 'center 35%' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" aria-hidden="true" />
          <div className={`${container} relative flex min-h-[340px] flex-col justify-center py-12 text-white lg:min-h-[400px]`}>
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About CIC', to: '/about' }, { label: 'Media centre' }]} inverse />
            <p className="mt-6 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-cic-amber">
              <NewspaperIcon className="h-4 w-4" aria-hidden="true" /> Newsroom
            </p>
            <h1 className="mt-2 max-w-2xl text-[40px] font-semibold leading-tight lg:text-[52px]">Media centre</h1>
            <p className="mt-3 max-w-xl text-[16px] text-white/90">
              The latest news from CIC Group: results, launches, partnerships and the stories behind them.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#all-news" className={btnPrimary}>Browse all news</a>
              <a href="#media-enquiries" className={`${btnOutlineInverse} py-2.5 text-[15px] font-semibold`}>Media enquiries</a>
            </div>
          </div>
        </section>
      }>

      <div className={container}>
        {/* Featured + two side stories */}
        <section aria-labelledby="latest-news" className="pt-14">
          <h2 id="latest-news" className="text-[32px] font-semibold">Latest news</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <a href={lead.href} target="_blank" rel="noreferrer" className="group relative block min-h-[420px] overflow-hidden shadow-card">
              <img src={lead.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" aria-hidden="true" />
              <span className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8">
                <TopicTag topic={lead.topic} inverse />
                <span className="mt-3 block text-[26px] font-semibold leading-tight lg:text-[30px]">{lead.title}</span>
                {lead.summary && <span className="mt-2 block text-[15px] text-white/90">{lead.summary}</span>}
                <span className="mt-4 flex items-center gap-4 text-[13px]">
                  {lead.date && <span className="text-white/80">{formatDate(lead.date)}</span>}
                  <span className="flex items-center gap-1.5 font-semibold group-hover:underline">
                    Read the release <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </span>
            </a>
            <ul className="grid gap-5">
              {sideStories.map((r) =>
              <li key={r.href}>
                  <a href={r.href} target="_blank" rel="noreferrer" className="group grid h-full grid-cols-[40%_1fr] bg-white shadow-card">
                    <img src={r.image} alt="" className="h-full min-h-[180px] w-full object-cover" />
                    <span className="flex flex-col p-5">
                      <TopicTag topic={r.topic} />
                      <span className="mt-2 text-[16px] font-semibold leading-snug group-hover:text-cic-red">{r.title}</span>
                      <span className="mt-auto pt-3 text-[12px] text-cic-muted">{r.date ? formatDate(r.date) : ''}</span>
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </section>

        {/* All news with topic filter */}
        <section id="all-news" aria-labelledby="all-news-title" className="scroll-mt-6 pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="all-news-title" className="text-[32px] font-semibold">Press releases</h2>
              <p className="mt-1 text-[15px]">Everything we've shared with the media, newest first.</p>
            </div>
            <p className="text-[13px] text-cic-muted" aria-live="polite">{filtered.length} releases</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
            {[ALL, ...mediaTopics].map((t) =>
            <button
              key={t}
              onClick={() => pickTopic(t as MediaTopic | typeof ALL)}
              aria-pressed={topic === t}
              className={`border px-4 py-1.5 text-[13px] font-semibold transition-colors duration-150 ${
              topic === t ? 'border-cic-orange bg-cic-orange text-white' : 'border-cic-line bg-white hover:border-cic-red hover:text-cic-red'}`
              }>

                {t}
              </button>
            )}
          </div>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, shown).map((r) =>
            <ReleaseCard key={r.href} r={r} />
            )}
          </ul>
          {shown < filtered.length &&
          <div className="mt-8 text-center">
              <button onClick={() => setShown((n) => n + PAGE)} className="border border-cic-orange px-6 py-2.5 text-[14px] font-semibold text-cic-orange hover:bg-[#FBECEC]">
                Load more
              </button>
            </div>
          }
          <p className="mt-4 text-[11px] text-cic-muted">Each release opens on cicinsurancegroup.com. Topics are grouped for this site.</p>
        </section>
      </div>

      {/* Financial calendar */}
      <section aria-labelledby="calendar" className="mt-16 bg-cic-mist py-14">
        <div className={container}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="calendar" className="text-[32px] font-semibold">2026 financial calendar</h2>
              <p className="mt-1 text-[15px]">Key dates for investors and the media.</p>
            </div>
            <Link to="/about/events" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-cic-red hover:underline">
              <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" /> All events
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {eventCalendar2026.map((e) => {
              const d = new Date(`${e.date}T00:00:00`);
              const past = e.date < new Date().toISOString().slice(0, 10);
              return (
                <li key={e.name} className="flex gap-4 bg-white p-4 shadow-card lg:flex-col">
                  <span className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center text-white ${past ? 'bg-cic-wine' : 'bg-cic-orange'}`}>
                    <span className="text-[24px] font-bold leading-none">{d.getDate()}</span>
                    <span className="text-[11px] font-semibold uppercase">{d.toLocaleDateString('en-GB', { month: 'short' })}</span>
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold leading-snug">{e.name}</span>
                    <span className="mt-1 block text-[12px] text-cic-muted">{past ? 'Done' : 'Coming up'}</span>
                  </span>
                </li>);

            })}
          </ul>
        </div>
      </section>

      {/* From the blog */}
      <section aria-labelledby="from-blog" className={`${container} py-16`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="from-blog" className="text-[32px] font-semibold">From our blog</h2>
            <p className="mt-1 text-[15px]">Tips and stories to help you plan, protect and grow.</p>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-cic-red hover:underline">
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /> Visit the blog
          </Link>
        </div>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((p) =>
          <StoryCard key={p.slug} post={p} />
          )}
        </ul>
      </section>

      {/* Media enquiries */}
      <section id="media-enquiries" aria-labelledby="enquiries-title" className="scroll-mt-6 bg-cic-burgundy py-14 text-white">
        <div className={`${container} grid gap-10 lg:grid-cols-[1fr_1.4fr]`}>
          <div>
            <span className="block h-1.5 w-20 bg-cic-amber" aria-hidden="true" />
            <h2 id="enquiries-title" className="mt-4 text-[32px] font-semibold">Media enquiries</h2>
            <p className="mt-2 text-[15px] text-white/90">Working on a story? Get in touch and we'll point you to the right person.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) =>
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border border-white/60 px-3 py-1.5 text-[13px] font-semibold hover:bg-white/15">

                  {s.label} <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {[
            { icon: PhoneIcon, title: 'Call us', lines: [hqChannels.phoneIntl, hqChannels.landline] },
            { icon: MailIcon, title: 'Email us', lines: [hqChannels.email] },
            { icon: MessageSquareIcon, title: 'SMS', lines: [hqChannels.sms] }].
            map((c) =>
            <li key={c.title} className="bg-white p-5 text-cic-ink">
                <span className="flex h-11 w-11 items-center justify-center bg-cic-orange text-white">
                  <c.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 font-semibold">{c.title}</p>
                {c.lines.map((l) =>
              <p key={l} className="mt-1 text-[14px]">{l}</p>
              )}
              </li>
            )}
          </ul>
        </div>
      </section>
    </ContentLayout>);

}
