import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon, HeartIcon, LinkIcon, MailIcon, MessageCircleIcon, MessageSquareIcon, Share2Icon } from 'lucide-react';
import { IntranetLayout, container } from '../IntranetLayout';
import { ArticleImage } from '../shared';
import { articleBody, articles, me } from '../data';
import { NewsCard } from './IntranetNews';

type Comment = {text: string;when: string;};

function ShareMenu({ title }: {title: string;}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {if (!ref.current?.contains(e.target as Node)) setOpen(false);};
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);
  const url = window.location.href;
  const copy = () => {
    navigator.clipboard?.writeText(url).then(() => setCopied(true), () => setCopied(false));
    window.setTimeout(() => setCopied(false), 2000);
  };
  const item = 'flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] hover:bg-cic-mist';
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex items-center gap-1.5 font-semibold hover:text-cic-red">
        <Share2Icon className="h-4 w-4" aria-hidden="true" /> Share
      </button>
      {open &&
      <div className="absolute right-0 top-full z-20 mt-2 w-[200px] bg-white py-2 shadow-card">
          <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`} className={item}><MailIcon className="h-4 w-4 text-cic-red" aria-hidden="true" /> Email</a>
          <a href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noreferrer" className={item}><MessageCircleIcon className="h-4 w-4 text-cic-red" aria-hidden="true" /> WhatsApp</a>
          <button onClick={copy} className={item}>
            {copied ? <CheckIcon className="h-4 w-4 text-cic-green" aria-hidden="true" /> : <LinkIcon className="h-4 w-4 text-cic-red" aria-hidden="true" />}
            {copied ? 'Link copied' : 'Copy link'}
          </button>
        </div>
      }
    </div>);

}

// Keyed by id so likes and comments reset when moving between stories.
export function IntranetArticle() {
  const { id } = useParams();
  return <ArticleView key={id} id={id} />;
}

function ArticleView({ id }: {id?: string;}) {
  const a = articles.find((x) => x.id === id);
  const [liked, setLiked] = useState(false);
  const [draft, setDraft] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');

  if (!a) return <Navigate to="/intranet/news" replace />;

  const likes = a.likes + (liked ? 1 : 0);
  const total = a.comments + comments.length;
  const related = articles.filter((x) => x.id !== a.id && x.topic === a.topic).concat(articles.filter((x) => x.id !== a.id && x.topic !== a.topic)).slice(0, 3);

  const post = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) {
      setError('Write a comment before posting.');
      return;
    }
    setError('');
    setComments((c) => [...c, { text: draft.trim(), when: 'Just now' }]);
    setDraft('');
  };

  return (
    <IntranetLayout>
      <div className="border-b border-cic-line">
        <div className={`${container} py-4`}>
          <nav aria-label="Breadcrumb" className="text-[12px]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/intranet" className="text-cic-red hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/intranet/news" className="text-cic-red hover:underline">News</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{a.topic}</li>
            </ol>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-[800px] px-5 pt-8">
        <Link to="/intranet/news" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-cic-burgundy hover:text-cic-red">
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> Back to News
        </Link>
        <p className="mt-6 text-[12px] font-bold uppercase tracking-wide text-cic-red">{a.topic}</p>
        <h1 className="mt-2 text-[36px] font-semibold leading-tight lg:text-[40px]">{a.title}</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-cic-muted">{a.summary}</p>
        <p className="mt-4 text-[13px] text-cic-muted">{a.author} · {a.longDate} · 2 min read</p>

        <div className="mt-5 flex items-center gap-6 border-y border-cic-line py-3 text-[14px]">
          <button onClick={() => setLiked((l) => !l)} aria-pressed={liked} className={`flex items-center gap-1.5 font-semibold hover:text-cic-red ${liked ? 'text-cic-red' : ''}`}>
            <HeartIcon className={`h-4 w-4 ${liked ? 'fill-cic-red' : ''}`} aria-hidden="true" /> {likes} {likes === 1 ? 'Like' : 'Likes'}
          </button>
          <a href="#comments" className="flex items-center gap-1.5 font-semibold hover:text-cic-red">
            <MessageSquareIcon className="h-4 w-4" aria-hidden="true" /> {total} {total === 1 ? 'Comment' : 'Comments'}
          </a>
          <div className="ml-auto"><ShareMenu title={a.title} /></div>
        </div>

        <ArticleImage a={a} className="mt-8 h-[260px] w-full sm:h-[400px]" />

        <div className="mt-8 space-y-5 text-[16px] leading-[1.75]">
          <p>{articleBody.intro}</p>
          <h2 className="pt-3 text-[22px] font-semibold">{articleBody.heading}</h2>
          <p>{articleBody.rest}</p>
        </div>

        <p className="mt-10 flex items-center gap-2 border-t border-cic-line pt-5 text-[14px] font-semibold">
          <HeartIcon className="h-4 w-4 text-cic-red" aria-hidden="true" /> {likes} {likes === 1 ? 'person' : 'people'} liked this
        </p>

        <section id="comments" aria-labelledby="comments-title" className="mt-8">
          <h2 id="comments-title" className="text-[22px] font-semibold">Comments ({total})</h2>
          {comments.length > 0 &&
          <ul className="mt-5 space-y-4" aria-live="polite">
              {comments.map((c, i) =>
            <li key={i} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cic-red text-[12px] font-bold text-white">{me.initials}</span>
                  <div className="flex-1 bg-cic-mist px-4 py-3">
                    <p className="text-[13px] font-semibold">{me.name} <span className="font-normal text-cic-muted">· {c.when}</span></p>
                    <p className="mt-1 text-[14px]">{c.text}</p>
                  </div>
                </li>
            )}
            </ul>
          }
          <form onSubmit={post} noValidate className="mt-5 flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cic-red text-[12px] font-bold text-white">{me.initials}</span>
            <div className="flex-1">
              <label htmlFor="comment" className="block text-[12px] font-semibold">Your comment</label>
              <textarea
                id="comment"
                rows={3}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write a comment…"
                aria-invalid={Boolean(error)}
                className={`mt-1 w-full border px-3 py-2 text-[14px] outline-none placeholder:italic placeholder:text-[#9a9a9a] focus:border-cic-burgundy ${error ? 'border-cic-red' : 'border-cic-line'}`} />

              {error && <p className="mt-1 text-[12px] text-cic-red">{error}</p>}
              <div className="mt-3 flex justify-end">
                <button type="submit" className="bg-cic-orange px-6 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#8A1B23]">Post comment</button>
              </div>
            </div>
          </form>
        </section>
      </article>

      <section aria-labelledby="related-title" className={`${container} pt-14`}>
        <h2 id="related-title" className="text-[32px] font-semibold">More updates</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => <NewsCard key={r.id} a={r} />)}
        </div>
      </section>
    </IntranetLayout>);

}
