import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckIcon, ChevronDownIcon, Loader2Icon } from 'lucide-react';
import { PasswordInput } from '../../components/PasswordInput';
import { isEmail, isStrongPassword, passwordRules } from '../../utils/password';
import { ImpactAuthLayout, authButton, authInput, authLabel } from '../ImpactAuthLayout';
import { facilityTypes, loadPending, savePending } from '../store';

type Errors = Record<string, string>;

/** Impact sign-up: the logon card with sign-up fields. The code check is its own page. */
export function ImpactSignup() {
  const navigate = useNavigate();
  const pending = loadPending();
  const [f, setF] = useState({
    facility: pending?.facility ?? '',
    type: pending?.type ?? '',
    name: pending?.name ?? '',
    email: pending?.email ?? '',
    mobile: pending?.mobile ?? '',
    password: ''
  });
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = f.mobile.replace(/\D/g, '');
    const next: Errors = {};
    if (!f.facility.trim()) next.facility = 'Please enter your facility name.';
    if (!f.type) next.type = 'Please select your facility type.';
    if (!f.name.trim()) next.name = 'Please enter your full name.';
    if (!isEmail(f.email)) next.email = 'Please enter a valid email address.';
    if (!/^(?:254|0)?[17]\d{8}$/.test(digits)) next.mobile = 'Please enter a valid Kenyan mobile number.';
    if (!isStrongPassword(f.password)) next.password = 'Your password does not meet the rules below.';
    if (!accepted) next.accepted = 'Please accept the terms to continue.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    savePending({ facility: f.facility.trim(), type: f.type, name: f.name.trim(), email: f.email.trim(), mobile: f.mobile.trim() });
    window.setTimeout(() => navigate('/impact/signup/verify'), 700);
  };

  const err = (k: string) => errors[k] && <p id={`${k}-error`} className="mt-1 text-[12px] text-cic-red">{errors[k]}</p>;

  return (
    <ImpactAuthLayout>
      <form onSubmit={submit} noValidate className="relative w-full max-w-[380px] bg-white p-10 shadow-card">
        <h1 className="text-[20px] font-semibold">Create your provider account</h1>
        <p className="mt-1 text-[13px] text-cic-muted">You'll complete your facility profile after signing up.</p>

        <label htmlFor="facility" className={authLabel.replace('mt-4', 'mt-6')}>Facility name</label>
        <input id="facility" value={f.facility} onChange={(e) => set('facility')(e.target.value)} placeholder="e.g. Upendo Medical Centre" aria-invalid={Boolean(errors.facility)} className={authInput(errors.facility)} />
        {err('facility')}

        <label htmlFor="type" className={authLabel}>Facility type</label>
        <div className="relative">
          <select id="type" value={f.type} onChange={(e) => set('type')(e.target.value)} aria-invalid={Boolean(errors.type)} className={`${authInput(errors.type)} appearance-none pr-9`}>
            <option value="">Select</option>
            {facilityTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 mt-0.5 h-4 w-4 -translate-y-1/2 text-cic-red" aria-hidden="true" />
        </div>
        {err('type')}

        <label htmlFor="name" className={authLabel}>Your full name</label>
        <input id="name" value={f.name} onChange={(e) => set('name')(e.target.value)} autoComplete="name" placeholder="e.g. Mary Atieno" aria-invalid={Boolean(errors.name)} className={authInput(errors.name)} />
        {err('name')}

        <label htmlFor="email" className={authLabel}>Work email (your username)</label>
        <input id="email" type="email" value={f.email} onChange={(e) => set('email')(e.target.value)} autoComplete="email" placeholder="e.g. admin@upendo.co.ke" aria-invalid={Boolean(errors.email)} className={authInput(errors.email)} />
        {err('email')}

        <label htmlFor="mobile" className={authLabel}>Mobile number</label>
        <input id="mobile" type="tel" value={f.mobile} onChange={(e) => set('mobile')(e.target.value)} autoComplete="tel" placeholder="e.g. 0712 345 678" aria-invalid={Boolean(errors.mobile)} className={authInput(errors.mobile)} />
        {err('mobile')}

        <label htmlFor="password" className={authLabel}>Password</label>
        <PasswordInput id="password" value={f.password} onChange={set('password')} placeholder="Create a password" invalid={Boolean(errors.password)} describedBy="pw-rules" />
        {err('password')}
        <ul id="pw-rules" className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
          {passwordRules.map((r) => {
            const ok = r.test(f.password);
            return (
              <li key={r.label} className={`flex items-start gap-1 ${ok ? 'text-cic-green' : 'text-cic-muted'}`}>
                <CheckIcon className={`mt-px h-3 w-3 shrink-0 ${ok ? '' : 'opacity-30'}`} aria-hidden="true" />
                {r.label.replace(/^Be |^Contain /, '').replace(/^./, (c) => c.toUpperCase())}
                <span className="sr-only">{ok ? '(met)' : '(not met)'}</span>
              </li>);

          })}
        </ul>

        <label className="mt-5 flex items-start gap-2 text-[13px]">
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#86191F]" />
          <span>I accept the <a href="#" className="text-cic-orange hover:underline">terms of use</a> and <a href="#" className="text-cic-orange hover:underline">privacy notice</a>.</span>
        </label>
        {err('accepted')}

        <button type="submit" disabled={loading} className={authButton}>
          {loading && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {loading ? 'Sending your code…' : "Let's continue"}
        </button>

        <p className="mt-6 text-center text-[13px]">
          Already registered?{' '}
          <Link to="/impact/login" className="text-cic-orange hover:underline">Log in</Link>
        </p>
      </form>
    </ImpactAuthLayout>);

}
