import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, FileTextIcon, PhoneIcon, SearchCheckIcon } from 'lucide-react';
import { Accordion, ContactForm } from '../patterns';
import type { Faq, FaqTopic } from '../../data/quoteProducts';

export type NavSection = {id: string;label: string;};

/** Sticky in-page nav under the hero; highlights the section in view and jumps smoothly. */
export function SectionNav({ sections, cta }: {sections: NavSection[];cta?: {label: string;href: string;};}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const jump = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
    setActive(id);
  };

  return (
    <nav aria-label="On this page" className="sticky top-0 z-20 border-b border-cic-line bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center px-5 lg:px-[100px]">
        <ul className="flex flex-1 gap-8 overflow-x-auto text-[15px] [scrollbar-width:none]">
          {sections.map((s) =>
          <li key={s.id} className="shrink-0">
              <a
              href={`#${s.id}`}
              onClick={(e) => jump(e, s.id)}
              aria-current={active === s.id ? 'true' : undefined}
              className={`relative block py-4 transition-colors duration-150 ${
              active === s.id ? 'font-semibold text-cic-red' : 'text-cic-ink hover:text-cic-red'}`
              }>

                {s.label}
                {active === s.id && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-cic-red" aria-hidden="true" />}
              </a>
            </li>
          )}
        </ul>
        {cta &&
        <a
          href={cta.href}
          onClick={(e) => jump(e, cta.href.slice(1))}
          className="ml-6 hidden shrink-0 bg-cic-orange px-5 py-2 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23] md:inline-block">

            {cta.label}
          </a>
        }
      </div>
    </nav>);

}

const topics: ('All' | FaqTopic)[] = ['All', 'Cover', 'Claims', 'Payments'];

/** FAQs with Absa square filter chips (All / Cover / Claims / Payments). */
export function FaqSection({ faqs, image }: {faqs: Faq[];image: string;}) {
  const [topic, setTopic] = useState<'All' | FaqTopic>('All');
  const shown = faqs.filter((f) => topic === 'All' || f.topic === topic);
  const available = topics.filter((t) => t === 'All' || faqs.some((f) => f.topic === t));
  return (
    <section id="faqs" aria-labelledby="faqs-title" className="scroll-mt-16 pt-14">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 id="faqs-title" className="text-[32px] font-semibold">Frequently asked questions</h2>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter questions">
            {available.map((t) =>
            <button
              key={t}
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={`border px-4 py-1.5 text-[13px] font-semibold transition-colors duration-150 ${
              topic === t ? 'border-cic-red bg-cic-red text-white' : 'border-cic-line text-cic-ink hover:border-cic-red'}`
              }>

                {t}
              </button>
            )}
          </div>
          <div className="mt-6">
            <Accordion key={topic} items={shown.map((f) => ({ title: f.q, body: <p>{f.a}</p> }))} defaultOpen={0} />
          </div>
        </div>
        <img src={image} alt="" className="hidden h-full max-h-[460px] w-full object-cover lg:block" />
      </div>
    </section>);

}

const claimSteps = [
{ icon: PhoneIcon, title: 'Tell us what happened', body: 'Call 0703 099 120 or 020 282 3000, or start your claim online.' },
{ icon: FileTextIcon, title: 'Send your documents', body: 'Complete the claim form and attach the documents we ask for.' },
{ icon: SearchCheckIcon, title: 'We take it from there', body: 'A claims officer will contact you and guide you through every step.' }];


/** "Claims made easy" — 3 steps on a card over an image, linking to /claims. */
export function ClaimsMadeEasy({ image }: {image: string;}) {
  return (
    <section aria-labelledby="claims-easy-title" className="pt-14">
      <div className="grid bg-white shadow-card md:grid-cols-[minmax(320px,420px)_1fr]">
        <div className="p-8">
          <h2 id="claims-easy-title" className="text-[26px] font-semibold">Claims made easy</h2>
          <p className="mt-1 text-[14px] text-cic-muted">We keep things simple when the going gets tough.</p>
          <ol className="mt-6 space-y-5">
            {claimSteps.map((s, i) =>
            <li key={s.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FBECEC] text-cic-red">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[14px] font-semibold">Step {i + 1}: {s.title}</span>
                  <span className="mt-0.5 block text-[13px] text-cic-muted">{s.body}</span>
                </span>
              </li>
            )}
          </ol>
          <Link
            to="/claims"
            className="mt-7 inline-flex items-center gap-2 bg-cic-orange px-6 py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]">

            Read our claims guide <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <img src={image} alt="" className="hidden h-full max-h-[420px] w-full object-cover md:block" />
      </div>
    </section>);

}

/** Enquiry card used for products without an online quote. */
export function EnquirySection({ name }: {name: string;}) {
  return (
    <section id="quote" aria-labelledby="enquire-title" className="scroll-mt-20 bg-[#FBECEC] py-14">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-[100px]">
        <h2 id="enquire-title" className="text-[32px] font-semibold">Talk to us about {name}</h2>
        <p className="mt-2 max-w-2xl text-[15px]">Leave your details and a CIC adviser will call you back with a quote that fits your needs.</p>
        <div className="mt-8 max-w-3xl">
          <ContactForm
            fields={[
            { id: 'enq-name', label: 'Full name', required: true },
            { id: 'enq-phone', label: 'Mobile number', type: 'tel', placeholder: 'e.g. 0712 345 678', required: true },
            { id: 'enq-email', label: 'Email address', type: 'email', required: true },
            { id: 'enq-message', label: 'Anything we should know?', type: 'textarea', wide: true }]
            }
            submitLabel="Request a call back"
            successTitle="Thank you — we’ll be in touch"
            successBody={`A CIC adviser will call you about ${name}. Design concept: no data is sent.`} />

        </div>
      </div>
    </section>);

}
