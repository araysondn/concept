import React, { useState } from 'react';
import { HeartIcon } from 'lucide-react';
import type { Article, IntranetEvent } from './data';

/** Article photo, or the prototype's patterned CIC placeholder when there is none. */
export function ArticleImage({ a, className = '' }: {a: Article;className?: string;}) {
  if (a.image) return <img src={a.image} alt="" className={`object-cover ${className}`} />;
  const dark = a.placeholder === 'dark';
  return (
    <div
      className={`flex items-center justify-center ${dark ? 'bg-[#333]' : 'bg-[#EFEFEF]'} ${className}`}
      style={{ backgroundImage: `radial-gradient(${dark ? 'rgba(255,255,255,0.12)' : 'rgba(172,35,45,0.15)'} 1px, transparent 1px)`, backgroundSize: '14px 14px' }}
      aria-hidden="true">

      <span className={`border-2 px-4 py-1.5 text-[15px] font-bold tracking-[0.2em] ${dark ? 'border-white/50 text-white/70' : 'border-cic-red/50 text-cic-red/80'}`}>CIC</span>
    </div>);

}

/** Heart toggle that adds one to the count while liked. */
export function LikeButton({ count, label = false, className = '' }: {count: number;label?: boolean;className?: string;}) {
  const [liked, setLiked] = useState(false);
  const n = count + (liked ? 1 : 0);
  return (
    <button
      onClick={(e) => {e.preventDefault();e.stopPropagation();setLiked((l) => !l);}}
      aria-pressed={liked}
      aria-label={liked ? 'Unlike' : 'Like'}
      className={`inline-flex items-center gap-1.5 transition-colors hover:text-cic-red ${liked ? 'text-cic-red' : ''} ${className}`}>

      <HeartIcon className={`h-4 w-4 ${liked ? 'fill-cic-red' : ''}`} aria-hidden="true" />
      {n}{label && (n === 1 ? ' Like' : ' Likes')}
    </button>);

}

export const day = (iso: string) => new Date(`${iso}T00:00:00`).getDate().toString().padStart(2, '0');
export const month = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { month: 'short' });
export const year = (iso: string) => iso.slice(0, 4);
export const longDate = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

/** Google Calendar "add event" link for an all-day event. */
export function googleCalendarUrl(e: IntranetEvent) {
  const start = e.date.replace(/-/g, '');
  const next = new Date(`${e.date}T00:00:00`);
  next.setDate(next.getDate() + 1);
  const end = `${next.getFullYear()}${String(next.getMonth() + 1).padStart(2, '0')}${String(next.getDate()).padStart(2, '0')}`;
  const p = new URLSearchParams({ action: 'TEMPLATE', text: e.title, dates: `${start}/${end}`, location: e.where, details: `${e.time} · ${e.mode}` });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

/** Whole days from today to the event (negative once it has passed). */
export function daysUntil(iso: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((new Date(`${iso}T00:00:00`).getTime() - today.getTime()) / 86400000);
}

export function relativeLabel(iso: string) {
  const n = daysUntil(iso);
  if (n < 0) return 'Ended';
  if (n === 0) return 'Today';
  if (n === 1) return 'Tomorrow';
  return `In ${n} days`;
}

/** Download a one-event .ics file. */
export function addToCalendar(e: IntranetEvent) {
  const d = e.date.replace(/-/g, '');
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CIC Group//Intranet//EN', 'BEGIN:VEVENT', `UID:${e.id}@intranet.cic`, `DTSTART;VALUE=DATE:${d}`, `SUMMARY:${e.title}`, `LOCATION:${e.where}`, `DESCRIPTION:${e.time} · ${e.mode}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const link = Object.assign(document.createElement('a'), { href: url, download: `${e.id}.ics` });
  link.click();
  URL.revokeObjectURL(url);
}
