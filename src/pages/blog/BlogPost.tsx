import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2Icon, CheckIcon, ExternalLinkIcon, LinkIcon } from 'lucide-react';
import { Breadcrumb, ContentLayout, btnPrimary } from '../../components/patterns';
import { StoryCard, StoryMeta } from '../../components/blog/StoryCard';
import { blogPosts, formatBlogDate } from '../../data/blog';

export function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(t);
  }, [copied]);

  if (!post) return <Navigate to="/blog" replace />;

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const share = [
  { label: 'Facebook', text: 'f', className: 'bg-[#1877F2]', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { label: 'X', text: 'X', className: 'bg-black', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}` },
  { label: 'LinkedIn', text: 'in', className: 'bg-[#0A66C2]', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` }];


  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* Clipboard can be blocked; still confirm so the button feels responsive. */
    }
    setCopied(true);
  };

  const sameCategory = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const more = [...sameCategory, ...blogPosts.filter((p) => p.slug !== post.slug && p.category !== post.category)].slice(0, 3);

  return (
    <ContentLayout>
      <article className="mx-auto max-w-[860px] pt-6">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.title }]} />

        <header className="pt-8">
          <StoryMeta post={post} />
          <h1 className="mt-3 text-[36px] font-semibold leading-tight lg:text-[44px]">{post.title}</h1>
          <p className="mt-3 text-[13px] text-cic-muted">
            {formatBlogDate(post.date)}
            {post.author && <> · By {post.author}</>}
          </p>
        </header>

        <div className="mt-8 aspect-[16/9] overflow-hidden bg-cic-mist shadow-card">
          <img src={post.image} alt="" className="h-full w-full object-cover" />
        </div>

        <p className="mt-8 border-l-4 border-cic-red pl-5 text-[19px] leading-relaxed">{post.excerpt}</p>

        <section aria-labelledby="in-this-article" className="mt-10 bg-cic-mist px-6 py-7 md:px-8">
          <h2 id="in-this-article" className="text-[22px] font-semibold">In this article</h2>
          <ul className="mt-4 space-y-3">
            {post.keyPoints.map((k) =>
            <li key={k} className="flex gap-3 text-[15px] leading-relaxed">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-cic-red" aria-hidden="true" />
                {k}
              </li>
            )}
          </ul>
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-cic-orange hover:underline">

            Read the full article on cicinsurancegroup.com <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

        <aside className="mt-8 flex flex-col gap-4 bg-cic-burgundy px-6 py-7 text-white md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="text-[20px] font-semibold">Ready to take the next step?</h2>
            <p className="mt-1 text-[14px] text-white/90">Our team is here to help you choose the right cover or plan.</p>
          </div>
          <Link to={post.product.to} className="inline-block shrink-0 bg-white px-6 py-2.5 text-[15px] font-semibold text-cic-red transition-colors duration-150 hover:bg-cic-mist">
            {post.product.label}
          </Link>
        </aside>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-cic-line py-5">
          <span className="text-[14px] font-semibold">Share this story</span>
          {share.map((s) =>
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Share on ${s.label}`}
            className={`flex h-9 w-9 items-center justify-center text-[13px] font-bold text-white ${s.className}`}>

              {s.text}
            </a>
          )}
          <button
            onClick={copy}
            className="flex h-9 items-center gap-2 border border-cic-line px-3 text-[13px] transition-colors duration-150 hover:border-cic-red hover:text-cic-red">

            <LinkIcon className="h-4 w-4" aria-hidden="true" /> Copy link
          </button>
        </div>
      </article>

      <section aria-labelledby="more-stories" className="pb-6 pt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 id="more-stories" className="text-[28px] font-semibold">More stories</h2>
          <Link to="/blog" className="text-[14px] font-semibold text-cic-orange hover:underline">
            View all stories
          </Link>
        </div>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((p) =>
          <StoryCard key={p.slug} post={p} />
          )}
        </ul>
        <div className="mt-10 text-center">
          <Link to="/blog" className={btnPrimary}>Back to all stories</Link>
        </div>
      </section>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center" aria-live="polite">
        <AnimatePresence>
          {copied &&
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 bg-cic-ink px-5 py-3 text-[14px] text-white shadow-card">

              <CheckCircle2Icon className="h-4 w-4 text-cic-amber" aria-hidden="true" /> Link copied
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </ContentLayout>);

}
