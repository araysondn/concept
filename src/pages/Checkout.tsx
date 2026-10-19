import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftIcon, ArrowRightIcon, CheckCircle2Icon, CopyIcon, CreditCardIcon, InfoIcon, Loader2Icon, PencilIcon,
  ShoppingBasketIcon, SmartphoneIcon } from
'lucide-react';
import { CicLogo } from '../components/CicLogo';
import { BrandStripe } from '../components/BrandStripe';
import { FormField } from '../components/register/FormField';
import { DocumentList } from '../components/patterns';
import { CheckoutStepper, RateUs, YesNo } from '../components/checkout/parts';
import { formatKes, formatShortKes } from '../utils/currency';
import {
  annualPremium, categoryIcon, defaultInputs, loadQuote, productById, relatedFor, richById, saveQuote } from
'../data/quoteProducts';
import type { Frequency, QuoteKind } from '../data/quoteProducts';

const firstStepLabel: Record<QuoteKind, string> = {
  motor: 'Your vehicle',
  home: 'Your home',
  medical: 'Medical history',
  education: 'Medical history',
  accident: 'A few questions',
  pension: 'A few questions',
  invest: 'A few questions'
};

const industries = [
'Agriculture', 'Construction', 'Education', 'Finance & insurance', 'Government & public service', 'Healthcare',
'Manufacturing', 'Retail & hospitality', 'Technology', 'Transport & logistics', 'Self-employed / business owner', 'Other'];

const incomeBands = ['Below KES 300,000', 'KES 300,000 – 999,999', 'KES 1,000,000 – 2,999,999', 'KES 3,000,000 and above'];
const employment = ['Employed', 'Self-employed', 'Retired', 'Student', 'Not working'];

type Personal = {name: string;idNumber: string;mobile: string;email: string;address: string;kraPin: string;};
type Vehicle = {reg: string;makeModel: string;year: string;};
type Errors = Record<string, string>;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** /checkout/:id — five-step lead and purchase flow (design concept: nothing is sent or charged). */
export function Checkout() {
  const { id } = useParams();
  const product = productById(id);
  const rich = id ? richById[id] : undefined;

  const saved = useMemo(() => id ? loadQuote(id) : null, [id]);
  const [phase, setPhase] = useState<'intro' | 'steps' | 'paying' | 'done'>('intro');
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [toast, setToast] = useState('');

  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [vehicle, setVehicle] = useState<Vehicle>({ reg: '', makeModel: '', year: '' });
  const [addOns, setAddOns] = useState<string[]>(saved?.addOns ?? []);
  const [personal, setPersonal] = useState<Personal>({ name: '', idNumber: '', mobile: '', email: '', address: '', kraPin: '' });
  const [work, setWork] = useState({ status: '', industry: '', income: '' });
  const [frequency, setFrequency] = useState<Frequency>(saved?.frequency ?? 'monthly');
  const [readNotes, setReadNotes] = useState(false);
  const [payMethod, setPayMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [reference] = useState(() => `CIC-${Math.random().toString(36).slice(2, 10).toUpperCase()}`);

  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (phase === 'steps' || phase === 'done') headingRef.current?.focus();
    window.scrollTo({ top: 0 });
  }, [phase, step]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 2500);
    return () => window.clearTimeout(t);
  }, [toast]);

  if (!product) return <Navigate to="/products" replace />;
  if (!rich) return <Navigate to={`/product/${product.id}`} replace />;
  if (rich.kind === 'invest') return <Navigate to="/register" replace />;

  const inputs = saved?.inputs ?? defaultInputs[rich.kind];
  const baseAnnual = annualPremium(rich.kind, inputs);
  const addOnMonthly = rich.addOns.filter((a) => addOns.includes(a.id)).reduce((s, a) => s + a.monthly, 0);
  const monthly = baseAnnual / 12 + addOnMonthly;
  const annual = monthly * 12;
  const Icon = categoryIcon[product.category];

  const steps = [firstStepLabel[rich.kind], 'Enhance your cover', 'Personal details', 'Work & finances', 'Final checks'];

  const validate = (s: number): Errors => {
    const e: Errors = {};
    if (s === 0) {
      if (rich.kind === 'motor') {
        if (!/^K[A-Z]{2}\s?\d{3}[A-Z]$/i.test(vehicle.reg.trim())) e.reg = 'Enter a Kenyan registration number, e.g. KDA 123A.';
        if (vehicle.makeModel.trim().length < 2) e.makeModel = 'Enter the make and model.';
        const y = Number(vehicle.year);
        if (!/^\d{4}$/.test(vehicle.year) || y < 1980 || y > 2026) e.year = 'Enter a year between 1980 and 2026.';
      }
      rich.questions.forEach((q) => {
        if (answers[q.id] === undefined) e[q.id] = 'Please choose Yes or No.';
      });
    }
    if (s === 2) {
      if (personal.name.trim().split(/\s+/).length < 2) e.name = 'Enter your full name as on your ID.';
      if (!/^\d{7,9}$/.test(personal.idNumber.replace(/\s/g, ''))) e.idNumber = 'Enter a valid national ID number (7–9 digits).';
      if (!/^0(7|1)\d{8}$/.test(personal.mobile.replace(/\s/g, ''))) e.mobile = 'Enter a 10-digit mobile number starting 07 or 01.';
      if (!isEmail(personal.email)) e.email = 'Enter a valid email address.';
      if (personal.address.trim().length < 5) e.address = 'Enter your residential address.';
      if (personal.kraPin && !/^[A-Z]\d{9}[A-Z]$/i.test(personal.kraPin.trim())) e.kraPin = 'KRA PIN looks like A123456789B.';
    }
    if (s === 3) {
      if (!work.status) e.status = 'Select your employment status.';
      if (!work.industry) e.industry = 'Select your industry.';
      if (!work.income) e.income = 'Select your annual income.';
    }
    if (s === 4 && !readNotes) e.readNotes = 'Please confirm you’ve read the important notes.';
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    setPhase('paying');
    window.setTimeout(() => setPhase('done'), 1200);
  };

  const back = () => {
    setErrors({});
    if (step === 0) setPhase('intro');else
    setStep(step - 1);
  };

  const goTo = (i: number) => {
    setErrors({});
    setStep(i);
  };

  const saveCurrent = () => {
    saveQuote({ id: rich.id, inputs, addOns, frequency });
    setToast('Quote saved');
  };

  const anyYes = rich.questions.some((q) => answers[q.id]);

  return (
    <div className="min-h-screen w-full bg-white text-cic-ink">
      {/* Slim checkout bar */}
      <header className="sticky top-0 z-30 border-b border-cic-line bg-white">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-4 px-5">
          <CicLogo className="h-9" tagline={false} />
          <span className="hidden h-8 w-px bg-cic-line sm:block" aria-hidden="true" />
          <div className="flex min-w-0 items-center gap-2">
            <ShoppingBasketIcon className="h-5 w-5 shrink-0 text-cic-red" aria-hidden="true" />
            <span className="hidden truncate text-[14px] sm:inline">{product.name}</span>
            <span className="text-[18px] font-semibold" aria-live="polite">{formatShortKes(monthly)}</span>
            <span className="text-[12px] text-cic-muted">/month</span>
          </div>
          {phase !== 'done' &&
          <button
            type="button"
            onClick={saveCurrent}
            className="ml-auto border border-cic-orange px-4 py-1.5 text-[14px] font-semibold text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]">

              Save quote
            </button>
          }
        </div>
        <BrandStripe className="h-1" />
      </header>

      <AnimatePresence>
        {toast &&
        <motion.div
          role="status"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="fixed left-1/2 top-20 z-40 flex -translate-x-1/2 items-center gap-2 bg-cic-ink px-5 py-3 text-[14px] text-white shadow-card">

            <CheckCircle2Icon className="h-4 w-4 text-cic-amber" aria-hidden="true" /> {toast}
          </motion.div>
        }
      </AnimatePresence>

      {phase === 'intro' &&
      <section className="relative flex min-h-[calc(100vh-68px)] items-center overflow-hidden bg-[#2a1a17]">
          <img
          src={rich.hero.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={rich.hero.imagePosition ? { objectPosition: rich.hero.imagePosition } : undefined} />

          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-[1240px] px-5 text-white">
            <p className="text-[14px] font-semibold uppercase tracking-wide text-cic-amber">{product.name}</p>
            <h1 className="mt-3 max-w-xl text-[44px] font-semibold leading-tight lg:text-[56px]">Alright, let’s get you covered</h1>
            <p className="mt-3 text-[18px]">in just 5 simple steps.</p>
            <button
            type="button"
            onClick={() => setPhase('steps')}
            className="mt-8 inline-flex items-center gap-2 bg-cic-orange px-7 py-3 text-[16px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]">

              Let’s start <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="mt-6 text-[13px] text-white/80">Design concept — no payment is taken and no data is sent.</p>
          </div>
        </section>
      }

      {(phase === 'steps' || phase === 'paying') &&
      <main className="mx-auto grid max-w-[1240px] gap-10 px-5 py-10 md:grid-cols-[220px_1fr]">
          <CheckoutStepper steps={steps} current={step} onSelect={goTo} />

          <section aria-live="polite">
            {step === 0 &&
          <div>
                <h1 ref={headingRef} tabIndex={-1} className="text-[28px] font-semibold outline-none">
                  {rich.kind === 'motor' ? 'Tell us about your vehicle' : rich.kind === 'home' ? 'Tell us about your home' : 'First, a few quick questions'}
                </h1>
                {rich.kind === 'motor' &&
            <div className="mt-6 grid max-w-xl gap-5 sm:grid-cols-2">
                    <FormField id="reg" label="Registration number" value={vehicle.reg} onChange={(v) => setVehicle({ ...vehicle, reg: v.toUpperCase() })} placeholder="e.g. KDA 123A" error={errors.reg} />
                    <FormField id="year" label="Year of manufacture" value={vehicle.year} onChange={(v) => setVehicle({ ...vehicle, year: v.replace(/\D/g, '').slice(0, 4) })} placeholder="e.g. 2019" error={errors.year} />
                    <div className="sm:col-span-2">
                      <FormField id="makeModel" label="Make and model" value={vehicle.makeModel} onChange={(v) => setVehicle({ ...vehicle, makeModel: v })} placeholder="e.g. Toyota Fielder" error={errors.makeModel} />
                    </div>
                  </div>
            }
                <div className="mt-4 max-w-2xl">
                  {rich.questions.map((q) =>
              <YesNo
                key={q.id}
                id={q.id}
                question={q.q}
                value={answers[q.id]}
                onChange={(v) => setAnswers({ ...answers, [q.id]: v })}
                error={errors[q.id]} />

              )}
                </div>
                {anyYes &&
            <p className="mt-5 flex max-w-2xl gap-2 bg-cic-mist px-4 py-3 text-[13px]">
                    <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#0a6ed1]" aria-hidden="true" />
                    Thanks for telling us. You can still continue — we may ask for a few more details before your cover starts.
                  </p>
            }
              </div>
          }

            {step === 1 &&
          <div>
                <h1 ref={headingRef} tabIndex={-1} className="text-[28px] font-semibold outline-none">Would you like to top up your cover?</h1>
                {rich.addOns.length === 0 ?
            <p className="mt-4 max-w-xl text-[15px]">{product.name} doesn’t need any add-ons. You’re all set — just continue.</p> :

            <ul className="mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
                    {rich.addOns.map((a) => {
                const on = addOns.includes(a.id);
                return (
                  <li key={a.id}>
                          <label
                      className={`flex h-full cursor-pointer gap-3 border-l-4 bg-white p-5 shadow-card transition-colors duration-150 ${
                      on ? 'border-cic-red' : 'border-transparent'}`
                      }>

                            <input
                        type="checkbox"
                        checked={on}
                        onChange={() => setAddOns(on ? addOns.filter((x) => x !== a.id) : [...addOns, a.id])}
                        className="mt-1 h-5 w-5 shrink-0 accent-cic-burgundy" />

                            <span>
                              <span className="block text-[16px] font-semibold">{a.title}</span>
                              <span className="mt-1 block text-[13px] text-cic-muted">{a.body}</span>
                              <span className="mt-2 block text-[13px]">+ {formatShortKes(a.monthly)}/month</span>
                            </span>
                          </label>
                        </li>);

              })}
                  </ul>
            }
                <p className="mt-4 text-[12px] text-cic-muted">Add-on prices are illustrative.</p>
              </div>
          }

            {step === 2 &&
          <div>
                <h1 ref={headingRef} tabIndex={-1} className="text-[28px] font-semibold outline-none">Almost there — your personal details</h1>
                <div className="mt-6 grid max-w-xl gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <FormField id="name" label="Full name (as on your ID)" value={personal.name} onChange={(v) => setPersonal({ ...personal, name: v })} placeholder="e.g. Wanjiru Kamau" error={errors.name} />
                  </div>
                  <FormField id="idNumber" label="National ID number" value={personal.idNumber} onChange={(v) => setPersonal({ ...personal, idNumber: v.replace(/\D/g, '').slice(0, 9) })} placeholder="e.g. 12345678" error={errors.idNumber} />
                  <FormField id="kraPin" label="KRA PIN (optional)" value={personal.kraPin} onChange={(v) => setPersonal({ ...personal, kraPin: v.toUpperCase() })} placeholder="e.g. A123456789B" error={errors.kraPin} />
                  <FormField id="mobile" label="Mobile number (M-PESA)" type="tel" value={personal.mobile} onChange={(v) => setPersonal({ ...personal, mobile: v })} placeholder="e.g. 0712 345 678" error={errors.mobile} />
                  <FormField id="email" label="Email address" type="email" value={personal.email} onChange={(v) => setPersonal({ ...personal, email: v })} placeholder="e.g. wanjiru@gmail.com" error={errors.email} />
                  <div className="sm:col-span-2">
                    <FormField id="address" label="Residential address" value={personal.address} onChange={(v) => setPersonal({ ...personal, address: v })} placeholder="e.g. Kileleshwa, Nairobi" error={errors.address} />
                  </div>
                </div>
              </div>
          }

            {step === 3 &&
          <div>
                <h1 ref={headingRef} tabIndex={-1} className="text-[28px] font-semibold outline-none">Just a little more — your work and finances</h1>
                <p className="mt-2 max-w-xl text-[14px] text-cic-muted">As a regulated insurer, we need to understand your circumstances before we cover you.</p>
                <div className="mt-6 grid max-w-md gap-5">
                  <FormField id="status" label="Employment status" options={employment} value={work.status} onChange={(v) => setWork({ ...work, status: v })} error={errors.status} />
                  <FormField id="industry" label="Industry" options={industries} value={work.industry} onChange={(v) => setWork({ ...work, industry: v })} error={errors.industry} />
                  <FormField id="income" label="Annual income" options={incomeBands} value={work.income} onChange={(v) => setWork({ ...work, income: v })} error={errors.income} />
                </div>
              </div>
          }

            {step === 4 &&
          <div>
                <h1 ref={headingRef} tabIndex={-1} className="text-[28px] font-semibold outline-none">Final checks</h1>

                <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-[18px] font-semibold">Your policy documents</h2>
                      <div className="mt-3">
                        <DocumentList items={rich.documents} />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-[18px] font-semibold">Your details</h2>
                      <dl className="mt-3 divide-y divide-cic-line border-y border-cic-line text-[14px]">
                        {[
                    ['Cover for', product.name, -1],
                    ...(rich.kind === 'motor' ? [['Vehicle', `${vehicle.reg} · ${vehicle.makeModel} (${vehicle.year})`, 0]] : []),
                    ['Add-ons', rich.addOns.filter((a) => addOns.includes(a.id)).map((a) => a.title).join(', ') || 'None', 1],
                    ['Name', personal.name, 2],
                    ['Mobile', personal.mobile, 2],
                    ['Email', personal.email, 2],
                    ['Income', work.income, 3]].
                    map(([k, v, s]) =>
                    <div key={String(k)} className="grid grid-cols-[110px_1fr_auto] items-center gap-3 py-3">
                            <dt className="text-cic-muted">{k}</dt>
                            <dd className="font-semibold">{v}</dd>
                            {Number(s) >= 0 ?
                      <button type="button" onClick={() => goTo(Number(s))} className="flex items-center gap-1 text-[13px] text-cic-orange hover:underline">
                                <PencilIcon className="h-3.5 w-3.5" aria-hidden="true" /> Edit
                              </button> :

                      <Link to={`/product/${product.id}#quote`} className="flex items-center gap-1 text-[13px] text-cic-orange hover:underline">
                                <PencilIcon className="h-3.5 w-3.5" aria-hidden="true" /> Update
                              </Link>
                      }
                          </div>
                    )}
                      </dl>
                    </div>

                    <div className="bg-cic-mist p-5 text-[13px] leading-relaxed">
                      <h2 className="text-[16px] font-semibold">Take some time to read these notes</h2>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        <li>Your premium is illustrative and will be confirmed by CIC before your cover starts.</li>
                        <li>Please make sure the information you’ve given is true and complete. Wrong information could affect a claim.</li>
                        <li>Read your policy documents to understand what is and isn’t covered.</li>
                      </ul>
                      <label className="mt-4 flex items-start gap-3 text-[14px]">
                        <input type="checkbox" checked={readNotes} onChange={(e) => setReadNotes(e.target.checked)} className="mt-0.5 h-5 w-5 accent-cic-burgundy" />
                        I’ve read the notes and confirm my details are correct.
                      </label>
                      {errors.readNotes && <p className="mt-2 text-[12px] text-cic-red" role="alert">{errors.readNotes}</p>}
                    </div>
                  </div>

                  <aside className="h-fit bg-white shadow-card">
                    <div className="p-5">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-cic-red" aria-hidden="true" />
                        <h2 className="text-[16px] font-semibold">Your quote</h2>
                      </div>
                      <fieldset className="mt-4">
                        <legend className="text-[13px]">Payment frequency</legend>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {(['monthly', 'annual'] as const).map((f) =>
                      <button
                        key={f}
                        type="button"
                        aria-pressed={frequency === f}
                        onClick={() => setFrequency(f)}
                        className={`border py-2 text-[13px] font-semibold ${frequency === f ? 'border-cic-red bg-cic-red text-white' : 'border-cic-line hover:border-cic-red'}`}>

                              {f === 'monthly' ? 'Monthly' : 'Annually'}
                            </button>
                      )}
                        </div>
                      </fieldset>
                      <dl className="mt-4 space-y-1 text-[13px]">
                        <div className="flex justify-between"><dt>Base cover</dt><dd>{formatKes(frequency === 'monthly' ? baseAnnual / 12 : baseAnnual)}</dd></div>
                        <div className="flex justify-between"><dt>Add-ons</dt><dd>{formatKes(frequency === 'monthly' ? addOnMonthly : addOnMonthly * 12)}</dd></div>
                      </dl>
                      <div className="mt-4 bg-cic-mist px-4 py-4">
                        <p className="text-[13px]">Your total {frequency === 'monthly' ? 'per month' : 'per year'}</p>
                        <p className="mt-1 text-[28px] font-semibold">{formatKes(frequency === 'monthly' ? monthly : annual)}</p>
                        <p className="mt-1 text-[11px] text-cic-muted">Illustrative premium — not a CIC quote.</p>
                      </div>

                      <fieldset className="mt-4">
                        <legend className="text-[13px]">Pay with</legend>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {([['mpesa', 'M-PESA', SmartphoneIcon], ['card', 'Card', CreditCardIcon]] as const).map(([v, label, PIcon]) =>
                      <button
                        key={v}
                        type="button"
                        aria-pressed={payMethod === v}
                        onClick={() => setPayMethod(v)}
                        className={`flex items-center justify-center gap-2 border py-2 text-[13px] font-semibold ${payMethod === v ? 'border-cic-red bg-cic-red text-white' : 'border-cic-line hover:border-cic-red'}`}>

                              <PIcon className="h-4 w-4" aria-hidden="true" /> {label}
                            </button>
                      )}
                        </div>
                        <p className="mt-2 text-[12px] text-cic-muted">
                          {payMethod === 'mpesa' ? `We’d send an M-PESA prompt to ${personal.mobile || 'your phone'}.` : 'You’d enter your card details on a secure page.'}
                        </p>
                      </fieldset>
                    </div>
                    <BrandStripe className="h-1.5" />
                  </aside>
                </div>
              </div>
          }

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
              type="button"
              onClick={back}
              className="flex items-center gap-1.5 border border-cic-orange px-6 py-2.5 text-[14px] text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]">

                <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> Back
              </button>
              {step === 1 && rich.addOns.length > 0 &&
            <button
              type="button"
              onClick={() => {
                setAddOns([]);
                setStep(2);
              }}
              className="px-4 py-2.5 text-[14px] font-semibold text-cic-orange hover:underline">

                  Continue without add-ons
                </button>
            }
              <button
              type="button"
              onClick={next}
              disabled={phase === 'paying'}
              className="flex items-center gap-2 bg-cic-orange px-8 py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23] disabled:opacity-80">

                {phase === 'paying' && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {step === 4 ? phase === 'paying' ? 'Processing payment…' : `Make payment · ${formatShortKes(frequency === 'monthly' ? monthly : annual)}` : 'Continue'}
              </button>
            </div>
            {Object.keys(errors).length > 0 &&
          <p className="mt-3 text-[13px] text-cic-red" role="alert">Please fix the highlighted fields to continue.</p>
          }
            <p className="mt-8 text-[12px] text-cic-muted">Design concept — no payment is taken and no data is sent.</p>
          </section>
        </main>
      }

      {phase === 'done' && <ThankYou productId={product.id} productName={product.name} reference={reference} total={frequency === 'monthly' ? `${formatKes(monthly)} a month` : `${formatKes(annual)} a year`} headingRef={headingRef} />}
    </div>);

}

function ThankYou({
  productId,
  productName,
  reference,
  total,
  headingRef





}: {productId: string;productName: string;reference: string;total: string;headingRef: React.RefObject<HTMLHeadingElement>;}) {
  const [copied, setCopied] = useState(false);
  const related = relatedFor(productId, richById[productId]?.related);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/product/${productId}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="mx-auto max-w-[1240px] px-5 py-12">
      <div className="mx-auto max-w-2xl bg-white p-10 text-center shadow-card">
        <CheckCircle2Icon className="mx-auto h-14 w-14 text-cic-green" aria-hidden="true" />
        <h1 ref={headingRef} tabIndex={-1} className="mt-4 text-[30px] font-semibold outline-none">Thank you for choosing CIC</h1>
        <p className="mt-2 text-[15px]">
          Your {productName} application is in. We’ll confirm your cover by email and SMS.
        </p>
        <div className="mx-auto mt-6 max-w-sm bg-cic-mist px-5 py-4">
          <p className="text-[13px] text-cic-muted">Your reference</p>
          <p className="mt-1 text-[24px] font-semibold tracking-wide">{reference}</p>
          <p className="mt-1 text-[13px]">{total} (illustrative)</p>
        </div>
        <p className="mt-4 text-[12px] text-cic-muted">Design concept — no payment was taken and no data was sent.</p>
      </div>

      <div className="mx-auto mt-8 grid max-w-2xl gap-5 sm:grid-cols-2">
        <div className="bg-white p-6 shadow-card">
          <h2 className="text-[17px] font-semibold">Tell a friend about us</h2>
          <p className="mt-1 text-[13px] text-cic-muted">Share {productName} with someone who’d find it useful.</p>
          <button
            type="button"
            onClick={share}
            className="mt-4 inline-flex items-center gap-2 border border-cic-orange px-5 py-2 text-[14px] font-semibold text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]">

            <CopyIcon className="h-4 w-4" aria-hidden="true" /> {copied ? 'Link copied' : 'Copy link'}
          </button>
        </div>
        <div className="bg-white p-6 shadow-card">
          <h2 className="text-[17px] font-semibold">Let others know how we did</h2>
          <p className="mb-3 mt-1 text-[13px] text-cic-muted">Leave your rating below.</p>
          <RateUs />
        </div>
      </div>

      {related.length > 0 &&
      <section aria-labelledby="xsell-title" className="mt-14">
          <h2 id="xsell-title" className="text-[26px] font-semibold">You may also like</h2>
          <ul className="mt-5 grid gap-5 md:grid-cols-3">
            {related.map((r) => {
            const RIcon = categoryIcon[r.category];
            return (
              <li key={r.id} className="flex flex-col bg-white p-6 shadow-card">
                  <RIcon className="h-7 w-7 text-cic-red" strokeWidth={1.5} aria-hidden="true" />
                  <p className="mt-3 text-[18px] font-semibold">{r.name}</p>
                  <p className="mt-2 flex-1 text-[14px] text-cic-muted">{r.description}</p>
                  <Link to={`/product/${r.id}`} className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-cic-orange hover:underline">
                    Tell me more <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>);

          })}
          </ul>
        </section>
      }

      <p className="mt-12 text-center">
        <Link to="/" className="text-[14px] font-semibold text-cic-orange hover:underline">Back to home</Link>
      </p>
    </main>);

}
