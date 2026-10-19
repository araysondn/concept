import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2Icon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, CircleHelpIcon, MailIcon, MapPinIcon, MessageCircleIcon, PhoneIcon, SearchIcon, XIcon } from
'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { OnlineLayout, onlineContainer } from '../OnlineLayout';
import { Field, SelectField, btnGhost, btnSolid, fieldCls } from '../AuthSplit';
import { branches, channels, contactTopics, faqBusinesses, faqs } from '../data';
import { openChat } from '../../components/ChatWidget';

type Panel = 'contact' | 'branches' | 'faqs';

const cards: {icon: LucideIcon;title: string;description: string;cta: string;panel?: Panel;call?: boolean;}[] = [
{ icon: MailIcon, title: 'Contact us', description: 'Send a message. We’ll reply by email or phone.', cta: 'Send a message', panel: 'contact' },
{ icon: PhoneIcon, title: 'Call us', description: '0703 099 120 · (020) 282 3000', cta: 'Call now', call: true },
{ icon: MapPinIcon, title: 'Find a branch', description: '26 branches across Kenya', cta: 'Find a branch', panel: 'branches' },
{ icon: CircleHelpIcon, title: 'FAQs', description: 'Insurance, investments, life and pension', cta: 'Browse FAQs', panel: 'faqs' }];


const channelIcons: LucideIcon[] = [PhoneIcon, MessageCircleIcon, MailIcon, MapPinIcon];

function ContactPanel() {
  const [v, setV] = useState({ topic: '', firstName: '', lastName: '', email: '', phone: '', nationalId: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof v) => (val: string) => setV((s) => ({ ...s, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!v.topic) err.topic = 'Choose a topic';
    if (!v.firstName.trim()) err.firstName = 'Enter your first name';
    if (!v.lastName.trim()) err.lastName = 'Enter your last name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) err.email = 'Enter a valid email address';
    if (v.phone.replace(/\D/g, '').length < 9) err.phone = 'Enter a valid phone number';
    if (!v.message.trim()) err.message = 'Tell us how we can help';
    setErrors(err);
    if (!Object.keys(err).length) setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-white p-10 text-center shadow-card" role="status">
        <CheckCircle2Icon className="mx-auto h-12 w-12 text-cic-green" aria-hidden="true" />
        <p className="mt-3 text-[22px] font-semibold">Message sent</p>
        <p className="mt-1 text-[15px]">Thanks for getting in touch. Our team will get back to you by email or phone.</p>
        <p className="mt-4 text-[11px] text-cic-muted">Design concept: nothing was sent.</p>
      </div>);

  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={submit} noValidate className="bg-white p-6 shadow-card md:p-8">
        <h3 className="text-[22px] font-semibold">Send us a message</h3>
        <p className="mt-1 text-[14px] text-cic-muted">Fields marked * are required.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field id="topic" label="What is your message about?" required error={errors.topic}>
              <SelectField id="topic" value={v.topic} onChange={set('topic')} options={contactTopics} error={errors.topic} />
            </Field>
          </div>
          <Field id="firstName" label="First name" required error={errors.firstName}>
            <input id="firstName" value={v.firstName} onChange={(e) => set('firstName')(e.target.value)} className={fieldCls(errors.firstName)} />
          </Field>
          <Field id="lastName" label="Last name" required error={errors.lastName}>
            <input id="lastName" value={v.lastName} onChange={(e) => set('lastName')(e.target.value)} className={fieldCls(errors.lastName)} />
          </Field>
          <Field id="email" label="Email address" required error={errors.email}>
            <input id="email" type="email" value={v.email} onChange={(e) => set('email')(e.target.value)} placeholder="you@example.com" className={fieldCls(errors.email)} />
          </Field>
          <Field id="phone" label="Phone number" required error={errors.phone}>
            <input id="phone" type="tel" value={v.phone} onChange={(e) => set('phone')(e.target.value)} placeholder="+254 712 345 678" className={fieldCls(errors.phone)} />
          </Field>
          <div className="sm:col-span-2">
            <Field id="nationalId" label="National ID number" optional hint="Helps us find your policy faster.">
              <input id="nationalId" value={v.nationalId} onChange={(e) => set('nationalId')(e.target.value)} className={fieldCls()} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field id="message" label="Message" required error={errors.message}>
              <textarea id="message" rows={5} value={v.message} onChange={(e) => set('message')(e.target.value)} className={fieldCls(errors.message)} />
            </Field>
          </div>
        </div>
        <button type="submit" className={`${btnSolid} mt-6`}>Send message</button>
      </form>
      <aside>
        <h3 className="text-[18px] font-semibold">Other ways to reach us</h3>
        <ul className="mt-4 divide-y divide-cic-line border-y border-cic-line">
          {channels.map((c, i) => {
            const Icon = channelIcons[i];
            return (
              <li key={c.label}>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex items-start gap-3 py-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-cic-red" aria-hidden="true" />
                  <span>
                    <span className="block text-[13px] text-cic-muted">{c.label}</span>
                    <span className="block text-[15px] font-semibold group-hover:text-cic-red">{c.value}</span>
                    <span className="block text-[12px] text-cic-muted">{c.hint}</span>
                  </span>
                </a>
              </li>);

          })}
        </ul>
      </aside>
    </div>);

}

function BranchesPanel() {
  return (
    <div className="bg-white p-6 shadow-card md:p-8">
      <h3 className="text-[22px] font-semibold">Find a branch</h3>
      <p className="mt-1 text-[14px] text-cic-muted">We have 26 branches across Kenya. Call us and we'll direct you to your nearest one.</p>
      <ul className="mt-6 divide-y divide-cic-line border-y border-cic-line">
        {branches.map((b) =>
        <li key={b.name} className="flex flex-wrap items-start justify-between gap-4 py-4">
            <span className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-cic-red" aria-hidden="true" />
              <span>
                <span className="block text-[15px] font-semibold">{b.name}</span>
                <span className="block text-[13px] text-cic-muted">{b.address}</span>
                {b.phone && <span className="block text-[13px]">{b.phone}</span>}
              </span>
            </span>
            <a href="https://maps.google.com/?q=CIC+Plaza+Mara+Road+Upper+Hill+Nairobi" target="_blank" rel="noreferrer" className="text-[14px] text-cic-orange underline">
              Get directions
            </a>
          </li>
        )}
      </ul>
      <a href="tel:0703099120" className={`${btnGhost} mt-6`}>
        <PhoneIcon className="h-4 w-4" aria-hidden="true" /> Call 0703 099 120 for your nearest branch
      </a>
    </div>);

}

function FaqsPanel() {
  const [q, setQ] = useState('');
  const [biz, setBiz] = useState('All businesses');
  const [open, setOpen] = useState<string | null>(null);
  const term = q.trim().toLowerCase();
  const list = faqs.filter((f) => (biz === 'All businesses' || f.business === biz) && (!term || `${f.question} ${f.answer}`.toLowerCase().includes(term)));

  return (
    <div className="bg-white p-6 shadow-card md:p-8">
      <h3 className="text-[22px] font-semibold">Frequently asked questions</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_260px]">
        <label className="relative block">
          <span className="sr-only">Search FAQs</span>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cic-muted" aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for your answer" className="w-full border border-cic-line px-3 py-2.5 pl-9 pr-9 text-[14px] outline-none placeholder:italic focus:border-cic-burgundy" />
          {q &&
          <button onClick={() => setQ('')} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-cic-muted hover:text-cic-red">
              <XIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          }
        </label>
        <div>
          <label htmlFor="faq-biz" className="sr-only">Filter FAQs by business</label>
          <div className="relative">
            <select id="faq-biz" value={biz} onChange={(e) => setBiz(e.target.value)} className="w-full appearance-none border border-cic-line bg-white px-3 py-2.5 pr-9 text-[14px] outline-none focus:border-cic-burgundy">
              {faqBusinesses.map((b) => <option key={b}>{b}</option>)}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cic-red" aria-hidden="true" />
          </div>
        </div>
      </div>
      {list.length === 0 ?
      <p className="mt-6 border border-cic-line p-6 text-center text-[14px] text-cic-muted">No questions match your search.</p> :

      <ul className="mt-6 divide-y divide-cic-line border-y border-cic-line">
          {list.map((f) => {
          const isOpen = open === f.question;
          return (
            <li key={f.question}>
                <button onClick={() => setOpen(isOpen ? null : f.question)} aria-expanded={isOpen} className="flex w-full items-center gap-4 py-4 text-left">
                  <span className="flex-1">
                    <span className="block text-[15px] font-semibold">{f.question}</span>
                    {biz === 'All businesses' && <span className="block text-[11px] text-cic-muted">{f.business}</span>}
                  </span>
                  <ChevronDownIcon className={`h-5 w-5 shrink-0 text-cic-red transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {isOpen && <p className="pb-4 text-[14px] leading-relaxed">{f.answer}</p>}
              </li>);

        })}
        </ul>
      }
      <p className="mt-5 text-center text-[13px]">
        Didn't find your answer? <Link to="/online/contact" className="font-semibold text-cic-orange underline">Contact us</Link>
      </p>
    </div>);

}

function CallDialog({ onClose }: {onClose: () => void;}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="call-title" className="relative w-[440px] max-w-full bg-white p-8 text-center shadow-[0_16px_48px_rgba(0,0,0,0.18)]">
        <span className="mx-auto flex h-14 w-14 items-center justify-center bg-[#FBECEC] text-cic-red">
          <PhoneIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 id="call-title" className="mt-4 text-[20px] font-semibold">Call us</h2>
        <p className="mt-1 text-[14px] text-cic-muted">Our call centre team can help with policies, claims and investments.</p>
        <div className="mt-6 space-y-3">
          <a href="tel:0703099120" className={`${btnSolid} w-full`}>Call 0703 099 120</a>
          <a href="tel:0202823000" className={`${btnGhost} w-full`}>Call (020) 282 3000</a>
          <button onClick={onClose} className="w-full py-2.5 text-[14px] text-cic-orange underline">Cancel</button>
        </div>
      </div>
    </div>);

}

export function OnlineServices({ initial }: {initial?: Panel;}) {
  const [panel, setPanel] = useState<Panel | null>(initial ?? null);
  const [call, setCall] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const userOpened = useRef(false);
  useEffect(() => setPanel(initial ?? null), [initial]);
  // Scroll to a panel only when the visitor opens one, not when the page loads with one open.
  useEffect(() => {
    if (panel && userOpened.current) panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [panel]);

  const faqMode = panel === 'faqs';

  return (
    <OnlineLayout>
      <section className="relative w-full overflow-hidden bg-gradient-to-r from-cic-wine via-cic-burgundy to-cic-amber">
        <img src="/products/customer-services.png" alt="" className="absolute bottom-0 right-[6%] hidden h-[95%] w-auto object-contain lg:block" />
        <span className="absolute -right-24 top-1/2 hidden h-[440px] w-[440px] -translate-y-1/2 rounded-full bg-white/10 lg:block" aria-hidden="true" />
        <div className={`${onlineContainer} relative flex min-h-[320px] flex-col justify-center py-12 text-white`}>
          <nav aria-label="Breadcrumb" className="text-[13px]">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/online" className="text-white/75 hover:text-white">Home</Link></li>
              <ChevronRightIcon className="h-3.5 w-3.5 text-white/75" aria-hidden="true" />
              <li aria-current="page" className="font-semibold">{faqMode ? 'FAQs' : 'Customer services'}</li>
            </ol>
          </nav>
          <h1 className="mt-5 text-[40px] font-semibold leading-tight lg:text-[52px]">{faqMode ? 'Frequently asked questions' : 'Customer services'}</h1>
          {faqMode ?
          <Link to="/online/contact" className="mt-6 self-start bg-white px-6 py-2.5 text-[15px] font-semibold text-cic-red hover:bg-[#FBECEC]">Contact us</Link> :
          <button onClick={openChat} className="mt-6 self-start bg-white px-6 py-2.5 text-[15px] font-semibold text-cic-red hover:bg-[#FBECEC]">Chat with us</button>
          }
        </div>
      </section>

      <section className="bg-cic-mist">
        <div className={`${onlineContainer} pb-16 pt-10`}>
          <h2 className="text-[28px] font-semibold">How can we help you?</h2>
          <p className="mt-1 text-[16px]">Reach our team, find a branch or get answers.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => {
              const active = !!c.panel && panel === c.panel;
              return (
                <button
                  key={c.title}
                  onClick={() => {
                    userOpened.current = true;
                    if (c.call) setCall(true);else if (c.panel) setPanel(active ? null : c.panel);
                  }}
                  aria-expanded={c.panel ? active : undefined}
                  className={`flex min-h-[140px] items-start gap-4 border-t-4 bg-white p-5 text-left shadow-card transition-colors ${active ? 'border-cic-red bg-[#FBECEC]' : 'border-transparent hover:border-cic-red'}`}>

                  <c.icon className="mt-0.5 h-6 w-6 shrink-0 text-cic-red" strokeWidth={1.5} aria-hidden="true" />
                  <span className="flex flex-1 flex-col gap-1">
                    <span className="text-[17px] font-semibold">{c.title}</span>
                    <span className="text-[13px]">{c.description}</span>
                    <span className="mt-auto flex items-center gap-1 pt-3 text-[14px] text-cic-orange underline">
                      {active ? 'Hide' : c.cta}
                      {active ? <ChevronUpIcon className="h-4 w-4" aria-hidden="true" /> : <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />}
                    </span>
                  </span>
                </button>);

            })}
          </div>
          {panel &&
          <div ref={panelRef} className="mt-8 scroll-mt-4">
              {panel === 'contact' && <ContactPanel />}
              {panel === 'branches' && <BranchesPanel />}
              {panel === 'faqs' && <FaqsPanel />}
            </div>
          }
        </div>
      </section>
      {call && <CallDialog onClose={() => setCall(false)} />}
    </OnlineLayout>);

}
