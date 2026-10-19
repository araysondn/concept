import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2Icon, Loader2Icon, MailIcon } from 'lucide-react';
import { ContentLayout, PageHero, btnPrimary } from '../../components/patterns';
import { StoryCard, StoryMeta } from '../../components/blog/StoryCard';
import { BlogCategory, blogCategories, blogPosts, formatBlogDate } from '../../data/blog';

const PAGE_SIZE = 6;

export function Blog() {
  const [category, setCategory] = useState<BlogCategory | 'All'>('All');
  const [shown, setShown] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () => category === 'All' ? blogPosts : blogPosts.filter((p) => p.category === category),
    [category]
  );
  const [featured, ...rest] = filtered;
  const visible = rest.slice(0, shown);

  const choose = (c: BlogCategory | 'All') => {
    setCategory(c);
    setShown(PAGE_SIZE);
  };

  const tabs: (BlogCategory | 'All')[] = ['All', ...blogCategories.filter((c) => blogPosts.some((p) => p.category === c))];

  return (
    <ContentLayout
      top={
      <PageHero
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Blog' }]}
        title="Stories & insights"
        intro="Practical guides, answers to your questions and ideas to help you protect what matters and grow what you have." />

      }>

      <nav aria-label="Story categories" className="mt-10 border-b border-cic-line">
        <ul className="flex gap-6 overflow-x-auto text-[15px] [scrollbar-width:none]">
          {tabs.map((c) => {
            const active = c === category;
            return (
              <li key={c} className="shrink-0">
                <button
                  onClick={() => choose(c)}
                  aria-pressed={active}
                  className={`relative pb-3 transition-colors duration-150 ${active ? 'font-semibold text-cic-red' : 'text-cic-ink hover:text-cic-red'}`}>

                  {c}
                  {active && <span className="absolute inset-x-0 -bottom-px h-[3px] bg-cic-red" aria-hidden="true" />}
                </button>
              </li>);

          })}
        </ul>
      </nav>

      {featured &&
      <section aria-label="Featured story" className="pt-10">
          <Link
          to={`/blog/${featured.slug}`}
          className="group grid bg-white shadow-card transition-shadow duration-150 hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)] md:grid-cols-[1.2fr_1fr]">

            <span className="block aspect-[16/10] overflow-hidden bg-cic-mist md:aspect-auto md:min-h-[340px]">
              <img src={featured.image} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
            </span>
            <span className="flex flex-col justify-center border-t-4 border-cic-red px-6 py-8 md:border-l-4 md:border-t-0 md:px-10">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-cic-muted">Latest story</span>
              <StoryMeta post={featured} className="mt-3" />
              <span className="mt-3 text-[28px] font-semibold leading-tight">{featured.title}</span>
              <span className="mt-3 text-[15px] leading-relaxed text-cic-ink">{featured.excerpt}</span>
              <span className="mt-5 text-[12px] text-cic-muted">{formatBlogDate(featured.date)}</span>
              <span className={`${btnPrimary} mt-6 self-start`}>Read the story</span>
            </span>
          </Link>
        </section>
      }

      {visible.length > 0 &&
      <section aria-label="More stories" className="pt-10">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) =>
          <StoryCard key={p.slug} post={p} />
          )}
          </ul>
          {rest.length > shown &&
        <div className="mt-10 text-center">
              <button
            onClick={() => setShown((n) => n + PAGE_SIZE)}
            className="border border-cic-orange px-8 py-2.5 text-[15px] font-semibold text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]">

                Load more stories
              </button>
              <p className="mt-2 text-[12px] text-cic-muted">
                Showing {visible.length + 1} of {filtered.length}
              </p>
            </div>
        }
        </section>
      }

      <Newsletter />
    </ContentLayout>);

}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setState('sending');
    window.setTimeout(() => setState('done'), 700);
  };

  return (
    <section aria-labelledby="newsletter-title" className="my-14 grid items-center gap-6 bg-cic-burgundy px-6 py-10 text-white md:grid-cols-[1fr_420px] md:px-10">
      <div>
        <MailIcon className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
        <h2 id="newsletter-title" className="mt-3 text-[28px] font-semibold">Join our mailing list</h2>
        <p className="mt-2 max-w-xl text-[15px] text-white/90">
          Be the first to hear about new stories, product updates and offers from CIC.
        </p>
      </div>
      {state === 'done' ?
      <p className="flex items-center gap-2 bg-white px-5 py-4 text-[15px] font-semibold text-cic-ink" role="status">
          <CheckCircle2Icon className="h-5 w-5 text-cic-green" aria-hidden="true" /> You're on the list. Thank you!
        </p> :

      <form onSubmit={submit} noValidate>
          <label htmlFor="newsletter-email" className="text-[12px] font-semibold">
            Email address
          </label>
          <div className="mt-1 flex">
            <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. wanjiru@gmail.com"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'newsletter-error' : undefined}
            className="min-w-0 flex-1 bg-white px-3 py-2.5 text-[14px] text-cic-ink outline-none placeholder:italic placeholder:text-[#9a9a9a]" />

            <button
            type="submit"
            disabled={state === 'sending'}
            className="flex items-center gap-2 bg-cic-wine px-5 text-[14px] font-semibold transition-colors duration-150 hover:bg-black/40 disabled:opacity-80">

              {state === 'sending' && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
              Subscribe
            </button>
          </div>
          {error && <p id="newsletter-error" className="mt-1 text-[12px] text-white">{error}</p>}
          <p className="mt-2 text-[11px] text-white/75">Design concept: nothing is sent.</p>
        </form>
      }
    </section>);

}
