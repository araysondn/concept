import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon, CheckCircle2Icon, CheckIcon, FileCheck2Icon, HomeIcon, InfoIcon, KeyboardIcon, Loader2Icon, ScanLineIcon, ShieldCheckIcon } from
'lucide-react';
import { OnlineLayout } from '../OnlineLayout';
import { AuthSplit, Field, SelectField, btnGhost, btnSolid, fieldCls } from '../AuthSplit';
import { genders, occupations, securityQuestions, titles } from '../data';

const steps = ['Quick lookup', 'Consent', 'Identity', 'Contact & address', 'Account setup'];
type Lookup = 'idle' | 'checking' | 'new' | 'existing';
type Form = Record<string, string>;

const blank: Form = {
  idNumber: '', lookupPhone: '', title: '', firstName: '', middleName: '', lastName: '', gender: '', occupation: '', kraPin: '',
  phone: '', otp: '', email: '', address: '', town: '', postal: '', username: '', password: '', confirm: '',
  q1: '', a1: '', q2: '', a2: '', q3: '', a3: '', referral: ''
};

const passwordRules = [
{ test: (p: string) => p.length >= 8, label: 'Min 8 chars' },
{ test: (p: string) => /[A-Z]/.test(p), label: 'uppercase' },
{ test: (p: string) => /[a-z]/.test(p), label: 'lowercase' },
{ test: (p: string) => /\d/.test(p), label: 'number' },
{ test: (p: string) => /[^A-Za-z0-9]/.test(p), label: 'special character' }];


function Notice({ tone, title, children }: {tone: 'success' | 'info' | 'warning';title: string;children: React.ReactNode;}) {
  const styles = { success: 'border-cic-green bg-[#E6F4E8]', info: 'border-cic-burgundy bg-cic-mist', warning: 'border-cic-amber bg-[#FFF6DB]' }[tone];
  return (
    <div className={`border-l-4 p-4 ${styles}`} role="status">
      <p className="flex items-center gap-2 text-[14px] font-semibold">
        <InfoIcon className="h-4 w-4" aria-hidden="true" /> {title}
      </p>
      <p className="mt-1 text-[13px] text-cic-muted">{children}</p>
    </div>);

}

function Stepper({ current }: {current: number;}) {
  return (
    <nav aria-label="Registration progress">
      <ol className="flex items-start">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={s} className="relative flex flex-1 flex-col items-center text-center">
              {i > 0 &&
              <span className={`absolute right-1/2 top-3 h-px w-full ${i <= current ? 'bg-cic-burgundy' : 'bg-cic-line'}`} aria-hidden="true" />
              }
              <span
                aria-current={active ? 'step' : undefined}
                className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-[12px] ${
                active ? 'bg-cic-red text-white' : done ? 'bg-cic-burgundy text-white' : 'border border-cic-muted bg-white text-cic-muted'}`
                }>

                {done ? <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
              </span>
              <span className={`mt-2 hidden text-[12px] sm:block ${active ? 'font-semibold text-cic-red' : 'text-cic-muted'}`}>{s}</span>
            </li>);

        })}
      </ol>
    </nav>);

}

export function OnlineRegister() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>(blank);
  const [errors, setErrors] = useState<Form>({});
  const [lookup, setLookup] = useState<Lookup>('idle');
  const [consent, setConsent] = useState({ kyc: false, terms: false, marketing: false });
  const [idMode, setIdMode] = useState<'choose' | 'manual'>('choose');
  const [otpSent, setOtpSent] = useState<'' | 'SMS' | 'WhatsApp'>('');
  const [verified, setVerified] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const top = useRef<HTMLDivElement>(null);

  const set = (k: string) => (v: string) => setF((s) => ({ ...s, [k]: v }));
  const input = (k: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) =>
  <input id={k} value={f[k]} onChange={(e) => set(k)(e.target.value)} aria-invalid={Boolean(errors[k])} className={fieldCls(errors[k])} {...props} />;


  const go = (n: number) => {
    setErrors({});
    setStep(n);
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const fail = (e: Form) => {
    setErrors(e);
    return Object.keys(e).length > 0;
  };

  const checkLookup = () => {
    const e: Form = {};
    if (!/^[A-Za-z0-9]{6,10}$/.test(f.idNumber.replace(/\s/g, ''))) e.idNumber = 'Enter a valid ID or passport number';
    if (f.lookupPhone.replace(/\D/g, '').length < 9) e.lookupPhone = 'Enter a valid phone number';
    if (fail(e)) return;
    setLookup('checking');
    window.setTimeout(() => {
      setLookup(f.idNumber.replace(/\s/g, '') === '12345678' ? 'existing' : 'new');
      setF((s) => ({ ...s, phone: s.phone || s.lookupPhone }));
    }, 1100);
  };

  const submitIdentity = () => {
    const e: Form = {};
    if (!f.title) e.title = 'Select your title';
    if (!f.firstName.trim()) e.firstName = 'Enter your first name';
    if (!f.lastName.trim()) e.lastName = 'Enter your last name';
    if (!f.gender) e.gender = 'Select your gender';
    if (!f.occupation) e.occupation = 'Select your occupation';
    if (!/^[A-Z]\d{9}[A-Z]$/.test(f.kraPin.toUpperCase())) e.kraPin = 'Format: A123456789Z';
    if (!fail(e)) go(3);
  };

  const submitContact = () => {
    const e: Form = {};
    if (!verified) e.otp = 'Verify your phone number to continue';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email address';
    if (!f.address.trim()) e.address = 'Enter your address';
    if (!f.town.trim()) e.town = 'Enter your town or city';
    if (!fail(e)) go(4);
  };

  const submitAccount = () => {
    const e: Form = {};
    if (!/^[a-z0-9._]{4,}$/i.test(f.username)) e.username = 'Use at least 4 letters, numbers, dots or underscores';
    if (!passwordRules.every((r) => r.test(f.password))) e.password = 'Your password does not meet all the rules';
    if (f.confirm !== f.password || !f.confirm) e.confirm = 'Passwords do not match';
    [1, 2, 3].forEach((n) => {
      if (!f[`q${n}`]) e[`q${n}`] = 'Choose a question';
      if (!f[`a${n}`].trim()) e[`a${n}`] = 'Enter your answer';
    });
    if (new Set([f.q1, f.q2, f.q3].filter(Boolean)).size < [f.q1, f.q2, f.q3].filter(Boolean).length) e.q3 = 'Choose three different questions';
    if (fail(e)) return;
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setDone(true);
      top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1000);
  };

  const heading = (title: string, body: string) =>
  <>
      <p className="mt-8 text-[12px] font-semibold uppercase tracking-wide text-cic-red">Step {step + 1} of {steps.length}</p>
      <h1 className="mt-1 text-[26px] font-semibold leading-tight">{title}</h1>
      <p className="mt-2 text-[14px] text-cic-muted">{body}</p>
    </>;


  return (
    <OnlineLayout footer={false}>
      <AuthSplit>
        <div ref={top} className="w-full max-w-[580px] scroll-mt-4">
          {done ?
          <div className="py-10 text-center" aria-live="polite">
              <CheckCircle2Icon className="mx-auto h-14 w-14 text-cic-green" aria-hidden="true" />
              <h1 className="mt-4 text-[28px] font-semibold">Your account is ready</h1>
              <p className="mx-auto mt-2 max-w-md text-[14px] text-cic-muted">
                Your account is ready and your phone is verified. Please proceed to the login page and sign in with the credentials you just created.
              </p>
              <dl className="mx-auto mt-6 max-w-md divide-y divide-cic-line border-y border-cic-line text-left text-[14px]">
                {[
              ['Full name', [f.title, f.firstName, f.middleName, f.lastName].filter(Boolean).join(' ')],
              ['ID / passport', f.idNumber],
              ['Phone (verified)', f.phone],
              ['Email (verified)', f.email],
              ['Username', f.username]].
              map(([k, v]) =>
              <div key={k} className="grid grid-cols-[150px_1fr] gap-4 py-3">
                    <dt className="text-cic-muted">{k}</dt>
                    <dd className="font-semibold">{v}</dd>
                  </div>
              )}
              </dl>
              <Link to="/online/login" className={`${btnSolid} mt-8`}>Go to sign in</Link>
              <p className="mt-6 text-[11px] text-cic-muted">Design concept: no account was created and nothing was sent.</p>
            </div> :

          <>
              <Stepper current={step} />

              {step === 0 &&
            <div>
                  {heading("Let's check if you're already with us", "Enter your ID or passport number and phone number. If you already have an account, we'll point you to sign in.")}
                  <p className="mt-4 text-[13px]">
                    Already have an account? <Link to="/online/login" className="font-semibold text-cic-orange underline">Sign in</Link>
                  </p>
                  <div className="mt-6 space-y-5">
                    <Field id="idNumber" label="ID / passport number" required error={errors.idNumber}>
                      {input('idNumber', { placeholder: 'e.g. 31548822', disabled: lookup === 'checking', onChange: (e) => {set('idNumber')(e.target.value);setLookup('idle');} })}
                    </Field>
                    <Field id="lookupPhone" label="Phone number" required error={errors.lookupPhone}>
                      {input('lookupPhone', { type: 'tel', placeholder: 'e.g. +254 712 345 678', disabled: lookup === 'checking', onChange: (e) => {set('lookupPhone')(e.target.value);setLookup('idle');} })}
                    </Field>
                  </div>
                  {(lookup === 'idle' || lookup === 'checking') &&
              <div className="mt-6 flex justify-end">
                      <button onClick={checkLookup} disabled={lookup === 'checking'} className={btnSolid}>
                        {lookup === 'checking' ?
                  <><Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" /> Checking…</> :
                  <>Check &amp; continue <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></>
                  }
                      </button>
                    </div>
              }
                  {lookup === 'new' &&
              <div className="mt-6 space-y-5">
                      <Notice tone="success" title="You're new here">No existing account found — let's get you set up.</Notice>
                      <div className="flex justify-end">
                        <button onClick={() => go(1)} className={btnSolid}>Continue <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></button>
                      </div>
                    </div>
              }
                  {lookup === 'existing' &&
              <div className="mt-6 space-y-5">
                      <Notice tone="info" title="You already have an account">We found a profile linked to these details. Sign in to manage your account.</Notice>
                      <div className="flex items-center justify-between">
                        <button onClick={() => setLookup('idle')} className={btnGhost}>Try a different ID</button>
                        <Link to="/online/login" className={btnSolid}>Go to sign in</Link>
                      </div>
                    </div>
              }
                  <p className="mt-8 text-[11px] text-cic-muted">Design concept: try ID 12345678 to see the "already with us" path.</p>
                </div>
            }

              {step === 1 &&
            <div>
                  {heading("How we'll use your information", 'We collect your details to verify your identity and keep your account secure. We never sell your data.')}
                  <ul className="mt-6 divide-y divide-cic-line bg-white px-5 shadow-card">
                    {[
                { icon: ShieldCheckIcon, title: 'Identity verification (KYC)', desc: 'Confirm you are who you say you are.' },
                { icon: FileCheck2Icon, title: 'Fraud & AML checks', desc: 'Keep your account and funds protected.' },
                { icon: HomeIcon, title: 'Account servicing', desc: 'Manage your policies, claims and payments.' }].
                map((c) =>
                <li key={c.title} className="flex items-start gap-3 py-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#FBECEC] text-cic-red">
                          <c.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-[14px] font-semibold">{c.title}</span>
                          <span className="block text-[13px] text-cic-muted">{c.desc}</span>
                        </span>
                      </li>
                )}
                  </ul>
                  <div className="mt-6 space-y-4 text-[14px]">
                    {[
                { k: 'kyc' as const, label: <>I consent to identity verification and processing of my KYC information in accordance with our <a href="https://ke.cicinsurancegroup.com/data-privacy-statement/" target="_blank" rel="noreferrer" className="text-cic-orange underline">Data Privacy Policy</a>.</> },
                { k: 'terms' as const, label: <>I have read and agree to the <a href="https://ke.cicinsurancegroup.com/terms-and-conditions/" target="_blank" rel="noreferrer" className="text-cic-orange underline">Terms &amp; Conditions</a> and <a href="https://ke.cicinsurancegroup.com/data-privacy-statement/" target="_blank" rel="noreferrer" className="text-cic-orange underline">Privacy Policy</a>.</> },
                { k: 'marketing' as const, label: <>Send me product updates and offers (optional).</> }].
                map((c) =>
                <label key={c.k} className="flex items-start gap-3">
                        <input type="checkbox" checked={consent[c.k]} onChange={(e) => setConsent((s) => ({ ...s, [c.k]: e.target.checked }))} className="mt-0.5 h-5 w-5 shrink-0 accent-[#86191F]" />
                        <span>{c.label}</span>
                      </label>
                )}
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button onClick={() => go(0)} className={btnGhost}>Back</button>
                    <button onClick={() => go(2)} disabled={!(consent.kyc && consent.terms)} className={btnSolid}>
                      Continue <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
            }

              {step === 2 && idMode === 'choose' &&
            <div>
                  {heading('How would you like to add your details?', 'Enter your details manually to get started. ID scanning is available but being improved.')}
                  <div className="mt-6 space-y-3">
                    <button onClick={() => setIdMode('manual')} className="flex w-full items-start gap-4 border-2 border-cic-burgundy bg-white p-5 text-left hover:bg-[#FBECEC]">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FBECEC] text-cic-red"><KeyboardIcon className="h-5 w-5" aria-hidden="true" /></span>
                      <span className="flex-1">
                        <span className="flex items-center gap-2 text-[15px] font-semibold">
                          Enter details manually <span className="bg-cic-burgundy px-2 py-0.5 text-[10px] font-semibold uppercase text-white">Recommended</span>
                        </span>
                        <span className="mt-1 block text-[13px] text-cic-muted">Type your information yourself — quick and reliable.</span>
                      </span>
                    </button>
                    <button disabled className="flex w-full cursor-not-allowed items-start gap-4 border border-cic-line bg-white p-5 text-left opacity-70">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-cic-mist"><ScanLineIcon className="h-5 w-5" aria-hidden="true" /></span>
                      <span>
                        <span className="block text-[15px] font-semibold">Scan my ID or passport</span>
                        <span className="mt-1 block text-[13px] text-cic-muted">We read your details automatically — about 10 seconds. (Being improved)</span>
                      </span>
                    </button>
                  </div>
                  <div className="mt-8"><button onClick={() => go(1)} className={btnGhost}>Back</button></div>
                </div>
            }

              {step === 2 && idMode === 'manual' &&
            <div>
                  {heading('Tell us about you', 'Confirm your identity details. These should match your ID document.')}
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field id="title" label="Title" required error={errors.title}>
                      <SelectField id="title" value={f.title} onChange={set('title')} options={titles} error={errors.title} />
                    </Field>
                    <Field id="gender" label="Gender" required error={errors.gender}>
                      <SelectField id="gender" value={f.gender} onChange={set('gender')} options={genders} placeholder="Select gender…" error={errors.gender} />
                    </Field>
                    <Field id="firstName" label="First name" required error={errors.firstName}>{input('firstName', { autoComplete: 'given-name' })}</Field>
                    <Field id="middleName" label="Middle name" optional>{input('middleName', { autoComplete: 'additional-name' })}</Field>
                    <Field id="lastName" label="Last name" required error={errors.lastName}>{input('lastName', { autoComplete: 'family-name' })}</Field>
                    <Field id="idShown" label="ID / passport number" hint="From step 1">
                      <input id="idShown" value={f.idNumber} disabled className={fieldCls()} />
                    </Field>
                    <Field id="occupation" label="Occupation" required error={errors.occupation}>
                      <SelectField id="occupation" value={f.occupation} onChange={set('occupation')} options={occupations} placeholder="Select occupation…" error={errors.occupation} />
                    </Field>
                    <Field id="kraPin" label="KRA PIN" required error={errors.kraPin} hint="Format: A123456789Z">
                      {input('kraPin', { placeholder: 'A123456789Z', onChange: (e) => set('kraPin')(e.target.value.toUpperCase()) })}
                    </Field>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button onClick={() => setIdMode('choose')} className={btnGhost}>Back</button>
                    <button onClick={submitIdentity} className={btnSolid}>Continue <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></button>
                  </div>
                </div>
            }

              {step === 3 &&
            <div>
                  {heading('How can we reach you?', "We'll use these details to verify your account and keep you updated.")}
                  <div className="mt-6 space-y-5">
                    <Field id="phone" label="Phone number" required error={errors.otp}>
                      <div className="flex flex-wrap gap-2">
                        <input id="phone" type="tel" value={f.phone} onChange={(e) => {set('phone')(e.target.value);setVerified(false);setOtpSent('');}} placeholder="+254 712 345 678" className={`${fieldCls()} min-w-[200px] flex-1`} />
                        {verified ?
                    <span className="mt-1 flex items-center gap-1.5 px-3 text-[13px] font-semibold text-cic-green"><CheckCircle2Icon className="h-4 w-4" aria-hidden="true" /> Verified</span> :
                    (['SMS', 'WhatsApp'] as const).map((c) =>
                    <button key={c} type="button" onClick={() => setOtpSent(c)} className="mt-1 border border-cic-orange px-4 text-[13px] text-cic-orange hover:bg-[#FBECEC]">
                              {otpSent === c ? 'Resend' : `Verify by ${c}`}
                            </button>
                    )
                    }
                      </div>
                    </Field>
                    {otpSent && !verified &&
                <div className="bg-cic-mist p-4">
                        <Field id="otp" label={`Enter the 6-digit code sent by ${otpSent}`}>
                          <div className="flex gap-2">
                            <input id="otp" inputMode="numeric" maxLength={6} value={f.otp} onChange={(e) => set('otp')(e.target.value.replace(/\D/g, ''))} placeholder="123456" className={`${fieldCls()} max-w-[160px] tracking-[0.3em]`} />
                            <button type="button" onClick={() => f.otp.length === 6 && setVerified(true)} disabled={f.otp.length !== 6} className={`${btnSolid} mt-1`}>Verify</button>
                          </div>
                        </Field>
                        <p className="mt-2 text-[11px] text-cic-muted">Design concept: any 6 digits will verify.</p>
                      </div>
                }
                    <Field id="email" label="Email address" required error={errors.email}>{input('email', { type: 'email', placeholder: 'you@example.com', autoComplete: 'email' })}</Field>
                    <Field id="address" label="Address" required error={errors.address}>{input('address', { placeholder: 'Start typing your address…', autoComplete: 'street-address' })}</Field>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="town" label="Town / city" required error={errors.town}>{input('town', { placeholder: 'Nairobi', autoComplete: 'address-level2' })}</Field>
                      <Field id="postal" label="Postal code" optional>{input('postal', { placeholder: '00100', autoComplete: 'postal-code' })}</Field>
                    </div>
                    <div className="border border-cic-line p-4">
                      <p className="text-[12px] font-semibold uppercase tracking-wide text-cic-muted">Optional</p>
                      <p className="mt-1 text-[13px]">Add a quick liveness check to speed up verification. You can skip and do this later from your account.</p>
                      <div className="mt-3 flex gap-3">
                        <button type="button" className="text-[13px] text-cic-orange underline">Skip for now</button>
                        <button type="button" disabled className="text-[13px] text-cic-muted">Start liveness check</button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button onClick={() => go(2)} className={btnGhost}>Back</button>
                    <button onClick={submitContact} className={btnSolid}>Continue <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></button>
                  </div>
                </div>
            }

              {step === 4 &&
            <div>
                  {heading('Set up your sign-in credentials', 'Choose a username and password, then add three security questions.')}
                  <h2 className="mt-6 text-[16px] font-semibold">Sign-in</h2>
                  <div className="mt-3 space-y-5">
                    <Field id="username" label="Username" required error={errors.username}>{input('username', { placeholder: 'e.g. amara.okoye', autoComplete: 'username' })}</Field>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="password" label="Password" required error={errors.password}>{input('password', { type: 'password', placeholder: '••••••••', autoComplete: 'new-password' })}</Field>
                      <Field id="confirm" label="Confirm password" required error={errors.confirm}>{input('confirm', { type: 'password', placeholder: '••••••••', autoComplete: 'new-password' })}</Field>
                    </div>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
                      {passwordRules.map((r) =>
                  <li key={r.label} className={`flex items-center gap-1 ${r.test(f.password) ? 'text-cic-green' : 'text-cic-muted'}`}>
                          <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> {r.label}
                        </li>
                  )}
                    </ul>
                  </div>
                  <h2 className="mt-8 text-[16px] font-semibold">Security questions</h2>
                  <div className="mt-3 space-y-5">
                    {[1, 2, 3].map((n) =>
                <div key={n} className="grid gap-3 sm:grid-cols-2">
                        <Field id={`q${n}`} label={`Security question ${n}`} required error={errors[`q${n}`]}>
                          <SelectField id={`q${n}`} value={f[`q${n}`]} onChange={set(`q${n}`)} options={securityQuestions} placeholder="Choose a question…" error={errors[`q${n}`]} />
                        </Field>
                        <Field id={`a${n}`} label="Your answer" required error={errors[`a${n}`]}>{input(`a${n}`, { placeholder: `Answer to question ${n}` })}</Field>
                      </div>
                )}
                  </div>
                  <h2 className="mt-8 text-[16px] font-semibold">Referral (optional)</h2>
                  <div className="mt-3 max-w-xs">
                    <Field id="referral" label="Referral code" hint="If someone referred you, enter their code here.">{input('referral', { placeholder: 'e.g. REF123' })}</Field>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button onClick={() => go(3)} className={btnGhost}>Back</button>
                    <button onClick={submitAccount} disabled={busy} className={btnSolid}>
                      {busy && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
                      {busy ? 'Creating account…' : 'Create account'}
                    </button>
                  </div>
                </div>
            }
            </>
          }
        </div>
      </AuthSplit>
    </OnlineLayout>);

}
