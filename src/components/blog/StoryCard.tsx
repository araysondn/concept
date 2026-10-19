import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import { BlogPost, formatBlogDate } from '../../data/blog';

/** Category label in CIC red, then read time. */
export function StoryMeta({ post, className = '' }: {post: BlogPost;className?: string;}) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] ${className}`}>
      <span className="font-semibold uppercase tracking-wide text-cic-red">{post.category}</span>
      <span className="flex items-center gap-1 text-cic-muted">
        <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
        {post.readMinutes} min read
      </span>
    </p>);

}

/** Absa story card: image, category + read time, title, date, arrow. The whole card is the link. */
export function StoryCard({ post }: {post: BlogPost;}) {
  return (
    <li>
      <Link
        to={`/blog/${post.slug}`}
        className="group flex h-full flex-col bg-white shadow-card transition-shadow duration-150 hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cic-red">

        <span className="block aspect-[16/10] overflow-hidden bg-cic-mist">
          <img
            src={post.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />

        </span>
        <span className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <StoryMeta post={post} />
          <span className="mt-2 text-[17px] font-semibold leading-snug">{post.title}</span>
          <span className="mt-auto flex items-center justify-between pt-4 text-[12px] text-cic-muted">
            {formatBlogDate(post.date)}
            <span className="flex h-8 w-8 items-center justify-center bg-cic-orange text-white transition-colors duration-150 group-hover:bg-[#8A1B23]">
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </span>
          </span>
        </span>
      </Link>
    </li>);

}
