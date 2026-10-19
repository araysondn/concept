import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CalendarDaysIcon, ChevronDownIcon, MessageSquareIcon, NewspaperIcon, PenLineIcon, SearchIcon, XIcon } from 'lucide-react';
import { FilterChips, IntranetLayout, container } from '../IntranetLayout';
import { ArticleImage, LikeButton, daysUntil, day, month, relativeLabel } from '../shared';
import { articles, nextEvents, newsTopics, upcomingEvents } from '../data';
import type { Article } from '../data';

// Media-centre structure, in the intranet's one-colour style (red, white, greys).

const filters = ['All Updates', ...newsTopics] as const;
type Filter = typeof filters[number];
const sorts = ['Newest first', 'Most liked', 'Most discussed'] as const;
type Sort = typeof sorts[number];
const PAGE = 6;

function TopicTag({ a, inverse = false }: {a: Article;inverse?: boolean;}) {
  return (
    <span className={`inline-block px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${inverse ? 'bg-white text-cic-red' : 'bg-cic-red text-white'}`}>
      {a.topic}
    </span>);

}

function Meta({ a }: {a: Article;}) {
  return (
    <div className="flex items-center gap-4 border-t border-cic-line pt-3 text-[12px] text-cic-muted">
      <span className="min-w-0 flex-1 truncate">{a.author} · {a.date}</span>
      <LikeButton count={a.likes} />
      <span className="inline-flex items-center gap-1.5"><MessageSquareIcon className="h-4 w-4" aria-hidden="true" /> {a.comments}</span>
    </div>);

}

/** Story card: photo with topic tag, date, title, summary, likes and comments. */
export function NewsCard({ a }: {a: Article;}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-card transition-shadow duration-150 hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
      <Link to={`/intranet/news/${a.id}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/10] overflow-hidden">
        <ArticleImage a={a} className="h-full w-full transition-transform duration-300 group-hover:scale-105" />
        <span className="absolute left-3 top-3"><TopicTag a={a} /></span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-[17px] font-semibold leading-snug">
          <Link to={`/intranet/news/${a.id}`} title={a.title} className="group-hover:text-cic-red">{a.title}</Link>
        </h3>
        <div className="mt-auto pt-4"><Meta a={a} /></div>
      </div>
    </article>);

}

export function IntranetNews() {
  const [filter, setFilter] = useState<Filter>('All Updates');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('Newest first');
  const [shown, setShown] = useState(PAGE);

  const [lead, ...others] = articles;
  const side = others.slice(0, 2);
  const q = query.trim().toLowerCase();

  const list = useMemo(() => {
    const out = articles.
    filter((a) => filter === 'All Updates' || a.topic === filter).
    filter((a) => !q || `${a.title} ${a.summary} ${a.author} ${a.topic}`.toLowerCase().includes(q));
    if (sort === 'Most liked') return [...out].sort((x, y) => y.likes - x.likes);
    if (sort === 'Most discussed') return [...out].sort((x, y) => y.comments - x.comments);
    return out;
  }, [filter, q, sort]);

  const counts = Object.fromEntries(filters.map((f) => [f, f === 'All Updates' ? articles.length : articles.filter((a) => a.topic === f).length])) as Record<Filter, number>;
  const comingUp = [...nextEvents, ...upcomingEvents].filter((e, i, all) => daysUntil(e.date) >= 0 && all.findIndex((x) => x.id === e.id) === i).slice(0, 4);

  const pick = (f: Filter) => {setFilter(f);setShown(PAGE);};
  const clear = () => {setFilter('All Updates');setQuery('');setShown(PAGE);};

  return (
    <IntranetLayout>
      {/* Red band: title, then the latest story and two more beside it. */}
      <section className="rounded-b-[50%_64px] bg-gradient-to-b from-[#5C1015] via-cic-wine to-cic-red pb-20 text-white">
        <div className={`${container} pt-10`}>
          <nav aria-label="Breadcrumb" className="text-[12px]">
            <ol className="flex items-center gap-2">
              <li><Link to="/intranet" className="text-white/85 hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">News</li>
            </ol>
          </nav>
          <p className="mt-6 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-white/85">
            <NewspaperIcon className="h-4 w-4" aria-hidden="true" /> Newsroom
          </p>
          <h1 className="mt-2 text-[40px] font-semibold leading-tight">Company News</h1>
          <p className="mt-2 max-w-2xl text-[15px] text-white/90">News and updates curated for every subsidiary across the group.</p>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <Link to={`/intranet/news/${lead.id}`} className="group relative block min-h-[400px] overflow-hidden rounded-lg shadow-card">
              <ArticleImage a={lead} className="absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" aria-hidden="true" />
              <span className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <span className="text-[12px] font-bold uppercase tracking-wide text-white/85">Latest · {lead.topic}</span>
                <span className="mt-2 block text-[26px] font-semibold leading-tight lg:text-[30px]">{lead.title}</span>
                <span className="mt-2 block text-[15px] text-white/90">{lead.summary}</span>
                <span className="mt-4 flex items-center gap-4 text-[13px]">
                  <span className="text-white/80">{lead.author} · {lead.date}</span>
                  <span className="flex items-center gap-1.5 font-semibold group-hover:underline">
                    Read the story <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </span>
            </Link>
            <ul className="grid gap-5">
              {side.map((a) =>
              <li key={a.id}>
                  <Link to={`/intranet/news/${a.id}`} className="group grid h-full grid-cols-[40%_1fr] overflow-hidden rounded-lg bg-white text-cic-ink shadow-card">
                    <ArticleImage a={a} className="h-full min-h-[180px] w-full" />
                    <span className="flex flex-col p-5">
                      <span className="text-[11px] font-bold uppercase tracking-wide text-cic-red">{a.topic}</span>
                      <span className="mt-2 text-[16px] font-semibold leading-snug group-hover:text-cic-red">{a.title}</span>
                      <span className="mt-auto pt-3 text-[12px] text-cic-muted">{a.date}</span>
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      <div className={container}>
        <section aria-labelledby="all-title" className="pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="all-title" className="text-[32px] font-semibold">All updates</h2>
              <p className="mt-1 text-[15px]">Search, filter by topic or sort the stories.</p>
            </div>
            <form role="search" onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-sm items-center border border-cic-line bg-white px-3 focus-within:border-cic-burgundy">
              <SearchIcon className="h-4 w-4 shrink-0 text-cic-muted" aria-hidden="true" />
              <label htmlFor="news-search" className="sr-only">Search news</label>
              <input
                id="news-search"
                type="search"
                value={query}
                onChange={(e) => {setQuery(e.target.value);setShown(PAGE);}}
                placeholder="Search news"
                className="w-full bg-transparent px-2 py-2.5 text-[14px] outline-none placeholder:italic placeholder:text-[#9a9a9a]" />

              {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="p-1 text-cic-muted hover:text-cic-red"><XIcon className="h-4 w-4" /></button>}
            </form>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <FilterChips label="Topic" options={filters} value={filter} onChange={pick} counts={counts} />
            <label className="flex items-center gap-2 text-[13px]">
              <span className="font-semibold">Sort</span>
              <span className="relative">
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="appearance-none border border-cic-line bg-white py-1.5 pl-3 pr-8 text-[13px] outline-none focus:border-cic-burgundy">
                  {sorts.map((s) => <option key={s}>{s}</option>)}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-cic-red" aria-hidden="true" />
              </span>
            </label>
          </div>
          <p className="mt-4 text-[13px] text-cic-muted" aria-live="polite">
            Showing {Math.min(shown, list.length)} of {list.length} {list.length === 1 ? 'story' : 'stories'}{q && <> matching “{query.trim()}”</>}
          </p>

          {list.length === 0 ?
          <div className="mt-5 rounded-lg bg-cic-mist px-6 py-10 text-center">
              <p className="text-[18px] font-semibold">No stories match</p>
              <p className="mt-1 text-[14px] text-cic-muted">Try another word or topic.</p>
              <button onClick={clear} className="mt-4 border border-cic-orange px-5 py-1.5 text-[13px] text-cic-orange hover:bg-[#FBECEC]">Clear search and filters</button>
            </div> :

          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.slice(0, shown).map((a) => <li key={a.id}><NewsCard a={a} /></li>)}
            </ul>
          }
          {shown < list.length &&
          <div className="mt-8 text-center">
              <button onClick={() => setShown((n) => n + PAGE)} className="border border-cic-orange px-6 py-2.5 text-[14px] font-semibold text-cic-orange hover:bg-[#FBECEC]">
                Load more
              </button>
            </div>
          }
        </section>
      </div>

      {comingUp.length > 0 &&
      <section aria-labelledby="coming-title" className="mt-16 bg-cic-mist py-14">
          <div className={container}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id="coming-title" className="text-[32px] font-semibold">Coming up</h2>
                <p className="mt-1 text-[15px]">The next events across the group.</p>
              </div>
              <Link to="/intranet/events" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-cic-red hover:underline">
                <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" /> All events
              </Link>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {comingUp.map((e) =>
            <li key={e.id}>
                  <Link to="/intranet/events" className="flex h-full gap-4 rounded-lg bg-white p-4 shadow-card transition-shadow hover:shadow-md">
                    <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded bg-cic-burgundy text-white">
                      <span className="text-[24px] font-bold leading-none">{day(e.date)}</span>
                      <span className="text-[11px] font-semibold uppercase">{month(e.date)}</span>
                    </span>
                    <span>
                      <span className="block text-[14px] font-semibold leading-snug">{e.title}</span>
                      <span className="mt-1 block text-[12px] text-cic-red">{relativeLabel(e.date)}</span>
                    </span>
                  </Link>
                </li>
            )}
            </ul>
          </div>
        </section>
      }

      <section aria-labelledby="share-title" className={`${comingUp.length ? '' : 'mt-16'} bg-gradient-to-r from-[#5C1015] to-cic-wine py-14 text-white`}>
        <div className={`${container} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
          <div>
            <h2 id="share-title" className="text-[32px] font-semibold">Got a story to share?</h2>
            <p className="mt-2 max-w-xl text-[15px] text-white/90">A team win, a launch or a colleague who went the extra mile? Send it to Brand & Comms and we'll help you tell it.</p>
          </div>
          <a href="#" className="inline-flex items-center gap-2 self-start bg-white px-6 py-2.5 text-[14px] font-semibold text-cic-red transition-colors hover:bg-white/90 md:self-auto">
            <PenLineIcon className="h-4 w-4" aria-hidden="true" /> Submit a story
          </a>
        </div>
      </section>
    </IntranetLayout>);

}
