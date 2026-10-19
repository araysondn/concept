import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, PhoneIcon, SmartphoneIcon } from 'lucide-react';
import { OnlineLayout, onlineContainer, useSegment } from '../OnlineLayout';
import { businessSlides, heroSlides, onlineProducts, personalSlides, productChips, productTabs } from '../data';
import type { OnlineProduct, Segment } from '../data';

const PAGE = 6;

function Dots({ count, active, onPick, label, light = false }: {count: number;active: number;onPick: (i: number) => void;label: string;light?: boolean;}) {
  return (
    <div className="flex gap-2" role="group" aria-label={label}>
      {Array.from({ length: count }, (_, i) =>
      <button
        key={i}
        onClick={() => onPick(i)}
        aria-label={`Slide ${i + 1}`}
        aria-current={i === active}
        className={`h-1.5 transition-all duration-300 ${i === active ? `w-8 ${light ? 'bg-white' : 'bg-cic-red'}` : `w-3 ${light ? 'bg-white/50' : 'bg-cic-line'}`}`} />

      )}
    </div>);

}

const SLIDE_MS = 6000;

/** Hero card (inset, as on CIC Online) driven by the All products / Insure / Invest / Pension tabs below it.
 *  The red indicator slides between tabs and fills while each slide is showing. */
function Hero() {
  const [params] = useSearchParams();
  const fromUrl = Math.max(0, productTabs.findIndex((t) => t === params.get('tab')));
  const [i, setI] = useState(fromUrl);
  const [paused, setPaused] = useState(false);

  useEffect(() => setI(fromUrl), [fromUrl]);
  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % heroSlides.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [i, paused]);

  const s = heroSlides[i];
  const go = (d: number) => setI((n) => (n + d + heroSlides.length) % heroSlides.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="CIC Online highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`${onlineContainer} pt-6`}>

      <div className="relative overflow-hidden rounded-2xl bg-[#2a1a17] shadow-card">
        {heroSlides.map((h, n) =>
        <img
          key={h.image}
          src={h.image}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${n === i ? 'opacity-100' : 'opacity-0'}`}
          style={h.position ? { objectPosition: h.position } : undefined} />

        )}
        <div className="absolute inset-0 bg-gradient-to-r from-cic-wine/95 via-cic-burgundy/60 to-transparent" aria-hidden="true" />
        <div className="relative flex min-h-[400px] flex-col justify-center px-8 py-12 text-white lg:px-14">
          <div key={i} className="max-w-lg animate-[fadeIn_.5s_ease]" aria-live="polite">
            <h1 className="text-[38px] font-semibold leading-tight lg:text-[48px]">{s.title}</h1>
            <p className="mt-4 text-[17px] text-white/90">{s.body}</p>
            <a href={s.to} className="mt-7 inline-block bg-white px-7 py-2.5 text-[15px] font-semibold text-cic-red transition-colors hover:bg-[#FBECEC]">
              {s.cta}
            </a>
          </div>
        </div>
        <div className="absolute bottom-5 right-5 flex gap-2">
          <button onClick={() => go(-1)} aria-label="Previous slide" className="flex h-9 w-9 items-center justify-center border border-white/70 text-white hover:bg-white/15">
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button onClick={() => go(1)} aria-label="Next slide" className="flex h-9 w-9 items-center justify-center border border-white/70 text-white hover:bg-white/15">
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Slide tabs with a sliding, filling indicator */}
      <div role="tablist" aria-label="Choose a highlight" className="relative grid grid-cols-4 border-b border-cic-line">
        {productTabs.map((t, n) =>
        <button
          key={t}
          role="tab"
          aria-selected={n === i}
          onClick={() => setI(n)}
          className={`px-2 py-4 text-[15px] transition-colors duration-300 ${n === i ? 'font-semibold text-cic-red' : 'text-cic-muted hover:text-cic-red'}`}>

            {t}
          </button>
        )}
        <span
          className="absolute bottom-[-1px] h-[3px] w-1/4 bg-cic-red/20 transition-[left] duration-500 ease-out"
          style={{ left: `${i * 25}%` }}
          aria-hidden="true">

          <span
            key={`${i}-${paused}`}
            className="block h-full bg-cic-red"
            style={paused ? { width: '100%' } : { animation: `cicFill ${SLIDE_MS}ms linear forwards` }} />

        </span>
      </div>
    </section>);

}

function ProductCard({ p }: {p: OnlineProduct;}) {
  return (
    <li className={`group relative flex min-h-[200px] overflow-hidden bg-white shadow-card ${p.comingSoon ? 'opacity-70' : ''}`}>
      {p.comingSoon &&
      <span className="absolute right-0 top-0 z-10 bg-cic-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">Coming soon</span>
      }
      <div className="relative z-10 flex w-[60%] flex-col p-5">
        <h3 className="text-[17px] font-semibold leading-snug">{p.name}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-cic-muted">{p.body}</p>
        {p.badge && <span className="mt-3 self-start bg-cic-burgundy px-2.5 py-1 text-[12px] font-semibold text-white">{p.badge}</span>}
        <span className="mt-auto pt-4">
          {p.comingSoon ?
          <span className="text-[14px] text-cic-muted">Get a quote ›</span> :
          <Link to={p.quote ?? '/online/register'} className="text-[14px] font-semibold text-cic-red underline hover:text-cic-wine">
              Get a quote ›
            </Link>
          }
        </span>
      </div>
      {p.image &&
      <span className="absolute bottom-0 right-0 flex h-full w-[48%] items-end justify-end bg-gradient-to-l from-[#FBECEC] to-transparent" aria-hidden="true">
          <img src={p.image} alt="" className="max-h-[92%] w-full object-contain object-bottom transition-transform duration-300 group-hover:scale-105" />
        </span>
      }
    </li>);

}

function Products() {
  const [chip, setChip] = useState('All');
  const [all, setAll] = useState(false);

  const list = onlineProducts.filter((p) => chip === 'All' || p.chip === chip);
  const shown = all ? list : list.slice(0, PAGE);

  return (
    <section id="products" aria-labelledby="products-title" className={`${onlineContainer} scroll-mt-4 py-12`}>
      <h2 id="products-title" className="text-[32px] font-semibold">What kind of protection does your life need?</h2>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter products">
        {productChips.map((c) =>
        <button
          key={c}
          onClick={() => {
            setChip(c);
            setAll(false);
          }}
          aria-pressed={chip === c}
          className={`border px-4 py-1.5 text-[13px] font-semibold transition-colors ${chip === c ? 'border-cic-red bg-cic-red text-white' : 'border-cic-line bg-white hover:border-cic-red hover:text-cic-red'}`}>

            {c}
          </button>
        )}
      </div>
      <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => <ProductCard key={p.id} p={p} />)}
      </ul>
      {list.length > PAGE &&
      <div className="mt-8 text-center">
          <button onClick={() => setAll((a) => !a)} className="border border-cic-orange px-6 py-2.5 text-[14px] text-cic-orange transition-colors hover:bg-[#FBECEC]">
            {all ? 'Show fewer products' : `View all ${list.length} products`}
          </button>
        </div>
      }
    </section>);

}

function PhoneMock() {
  return (
    <div className="relative mx-auto flex h-[420px] w-full max-w-[460px] items-center justify-center">
      <img src="/online/phone.svg" alt="The CIC app home screen" className="relative h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)]" />
    </div>);

}

/** One slider per audience: clients (personal) and agents (business), as on CIC Online. */
function Segments({ segment }: {segment: Segment;}) {
  const slides = segment === 'business' ? businessSlides : personalSlides;
  const [i, setI] = useState(0);
  const s = slides[i];

  return (
    <section id={segment === 'business' ? 'agents' : 'clients'} aria-labelledby={`${segment}-title`} className={`scroll-mt-4 py-14 ${segment === 'business' ? 'bg-white' : 'bg-cic-mist'}`}>
      <div className={`${onlineContainer} grid items-center gap-10 lg:grid-cols-2`}>
        <div className={segment === 'business' ? 'lg:order-2' : ''}>
          <PhoneMock />
        </div>
        <div>
          <p className="inline-block bg-cic-burgundy px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-white">{segment === 'business' ? 'For agents' : 'For clients'}</p>
          <div key={`${segment}-${i}`} className="animate-[fadeIn_.4s_ease]" aria-live="polite">
            <h2 id={`${segment}-title`} className="mt-2 text-[34px] font-semibold leading-tight">{s.title}</h2>
            <p className="mt-3 max-w-lg text-[16px] leading-relaxed">{s.body}</p>
            <ul className="mt-5 flex max-w-lg flex-wrap gap-2">
              {s.chips.map((c) =>
              <li key={c} className="border border-cic-line bg-white px-3 py-1.5 text-[13px]">{c}</li>
              )}
            </ul>
            {s.to.startsWith('#') ?
            <a href={s.to} className="mt-7 inline-block bg-cic-orange px-7 py-2.5 text-[15px] font-semibold text-white hover:bg-[#8A1B23]">{s.cta}</a> :
            <Link to={s.to} className="mt-7 inline-block bg-cic-orange px-7 py-2.5 text-[15px] font-semibold text-white hover:bg-[#8A1B23]">{s.cta}</Link>
            }
          </div>
          <div className="mt-10 flex items-center gap-4">
            <button onClick={() => setI((n) => (n - 1 + slides.length) % slides.length)} aria-label="Previous" className="flex h-9 w-9 items-center justify-center border border-cic-line bg-white hover:border-cic-red">
              <ChevronLeftIcon className="h-5 w-5 text-cic-red" aria-hidden="true" />
            </button>
            <Dots count={slides.length} active={i} onPick={setI} label="Choose a slide" />
            <button onClick={() => setI((n) => (n + 1) % slides.length)} aria-label="Next" className="flex h-9 w-9 items-center justify-center border border-cic-line bg-white hover:border-cic-red">
              <ChevronRightIcon className="h-5 w-5 text-cic-red" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>);

}

function AppBand() {
  return (
    <section aria-labelledby="app-title" className="relative overflow-hidden bg-cic-burgundy text-white">
      <div className={`${onlineContainer} grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]`}>
        <div className="py-14">
          <span className="block h-1.5 w-20 bg-cic-amber" aria-hidden="true" />
          <h2 id="app-title" className="mt-4 text-[34px] font-semibold leading-tight">Insurance in the palm of your hand</h2>
          <p className="mt-3 max-w-xl text-[16px] text-white/90">
            Conveniently manage your CIC accounts anytime, anywhere using <span className="font-semibold text-cic-amber">USSD</span>,{' '}
            <span className="font-semibold text-cic-amber">CIC Online Portal</span>, <span className="font-semibold text-cic-amber">CIC Mobile App</span> or join us on{' '}
            <a href="https://wa.me/254703099000" target="_blank" rel="noreferrer" className="font-semibold text-cic-amber underline">CIC WhatsApp</a>.
          </p>
          <ul className="mt-6 space-y-3 text-[15px]">
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-cic-amber" aria-hidden="true" /> Dial <span className="font-semibold">*304#</span> to access USSD services
            </li>
            <li className="flex items-start gap-3">
              <SmartphoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-cic-amber" aria-hidden="true" />
              Easily insure, invest and manage pensions on the go. You can claim the same risk again in a matter of seconds
            </li>
          </ul>
          <p className="mt-8 text-[15px] font-semibold">Switch to digital services with the CIC App</p>
          <a href="https://play.google.com/store/search?q=CIC%20Kenya&c=apps" target="_blank" rel="noreferrer" className="mt-3 inline-block" aria-label="Download our app on Google Play">
            <img src="/online/playstore.svg" alt="" className="h-12 w-auto" />
          </a>
        </div>
        <div className="relative hidden h-full min-h-[360px] lg:block" aria-hidden="true">
          <span className="absolute bottom-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full border-[14px] border-cic-amber/90" />
          <img src="/products/family-hero.png" alt="" className="absolute bottom-0 left-1/2 h-[380px] w-auto -translate-x-1/2 object-contain" />
        </div>
      </div>
    </section>);

}

export function OnlineHome() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <OnlineLayout>
      <Hero />
      <Products />
      {useSegment() === 'business' ?
      <><Segments segment="business" /><Segments segment="personal" /></> :
      <><Segments segment="personal" /><Segments segment="business" /></>
      }
      <AppBand />
    </OnlineLayout>);

}
