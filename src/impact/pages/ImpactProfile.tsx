import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2Icon, FileTextIcon, InfoIcon, Loader2Icon, PencilIcon, UploadIcon, XIcon } from 'lucide-react';
import { ImpactShell, card } from '../ImpactShell';
import { BoxField, BoxSelect, StepHeader, boxInput, pillGhost, pillSolid } from '../ui';
import {
  banks, contactRoles, counties, facilityTypes, loadOnboarding, profileSections, requiredDocs, saveOnboarding, services } from
'../store';
import type { Onboarding } from '../store';

type Errors = Record<string, string>;

const MAX_MB = 5;

function validate(id: string, d: Record<string, string>, declared: boolean, done: string[]): Errors {
  const e: Errors = {};
  const need = (k: string, msg: string) => {if (!d[k]?.trim()) e[k] = msg;};
  if (id === 'facility') {
    need('facilityName', 'Enter the facility name.');
    need('facilityType', 'Select the facility type.');
    if (!/^[AP]\d{9}[A-Z]$/i.test(d.kraPin?.trim() ?? '')) e.kraPin = 'KRA PIN is a letter, 9 digits and a letter, e.g. P051234567X.';
    need('county', 'Select the county.');
    need('town', 'Enter the town.');
    need('address', 'Enter the physical address.');
  }
  if (id === 'licences') {
    need('regNo', 'Enter the facility registration number.');
    need('licenceExpiry', 'Enter the licence expiry date.');
    if (d.licenceExpiry && new Date(d.licenceExpiry) < new Date()) e.licenceExpiry = 'This licence has expired. Renew it before applying.';
    if (!d.services) e.services = 'Choose at least one service you offer.';
  }
  if (id === 'bank') {
    need('bank', 'Select your bank.');
    need('branch', 'Enter the branch.');
    need('accountName', 'Enter the account name.');
    if (!/^\d{6,16}$/.test(d.accountNo ?? '')) e.accountNo = 'Account numbers are 6 to 16 digits.';else
    if (d.accountNo !== d.accountNo2) e.accountNo2 = 'Account numbers do not match.';
  }
  if (id === 'contacts') {
    need('contactName', 'Enter the main contact name.');
    need('contactRole', 'Select their role.');
    need('contactPhone', 'Enter their phone number.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.contactEmail ?? '')) e.contactEmail = 'Enter a valid email address.';
    if (d.claimsEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.claimsEmail)) e.claimsEmail = 'Enter a valid email address.';
  }
  if (id === 'documents') {
    requiredDocs.forEach((doc) => {if (!doc.optional && !d[doc.id]) e[doc.id] = 'Upload this document.';});
  }
  if (id === 'review') {
    const missing = profileSections.filter((s) => s.id !== 'review' && !done.includes(s.id));
    if (missing.length) e.declared = `Complete these sections first: ${missing.map((s) => s.title).join(', ')}.`;
    else if (!declared) e.declared = 'Confirm the declaration to submit.';
  }
  return e;
}

/** Complete profile: one section per step, saved as you go, then sent for approval. */
export function ImpactProfile() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initial = loadOnboarding();
  const startAt = Math.max(0, profileSections.findIndex((s) => s.id === params.get('step')));
  const firstOpen = profileSections.findIndex((s) => !initial?.done.includes(s.id));
  const [step, setStep] = useState(params.get('step') ? startAt : Math.max(0, firstOpen));
  const [ob, setOb] = useState<Onboarding | null>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [declared, setDeclared] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!ob) return <Navigate to="/impact/signup" replace />;
  if (ob.status === 'review') return <Navigate to="/impact/dashboard" replace />;

  const d = ob.data;
  const section = profileSections[step];
  const set = (k: string) => (v: string) => setOb({ ...ob, data: { ...d, [k]: v } });
  const persist = (next: Onboarding) => {setOb(next);saveOnboarding(next);};

  const next = () => {
    const e = validate(section.id, d, declared, ob.done);
    setErrors(e);
    if (Object.keys(e).length) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const done = Array.from(new Set([...ob.done, section.id]));
    if (section.id === 'review') {
      setBusy(true);
      window.setTimeout(() => {
        persist({ ...ob, done, status: 'review', facility: d.facilityName || ob.facility });
        navigate('/impact/dashboard');
      }, 900);
      return;
    }
    persist({ ...ob, done, status: 'draft', facility: d.facilityName || ob.facility });
    setStep(step + 1);
    window.scrollTo({ top: 0 });
  };

  const saveExit = () => {
    persist({ ...ob, status: ob.status === 'none' ? 'draft' : ob.status });
    navigate('/impact/dashboard');
  };

  const toggleService = (s: string) => {
    const list = d.services ? d.services.split(', ') : [];
    set('services')((list.includes(s) ? list.filter((x) => x !== s) : [...list, s]).join(', '));
  };

  const upload = (id: string, file?: File) => {
    if (!file) return;
    const okType = /pdf|jpe?g|png/i.test(file.type);
    const okSize = file.size <= MAX_MB * 1024 * 1024;
    if (!okType || !okSize) {
      setErrors({ ...errors, [id]: !okType ? 'Upload a PDF, JPG or PNG file.' : `Files must be ${MAX_MB} MB or smaller.` });
      return;
    }
    setErrors({ ...errors, [id]: '' });
    set(id)(file.name);
  };

  const review: [string, string, string][] = [
  ['facility', 'Facility', [d.facilityName, d.facilityType].filter(Boolean).join(' · ')],
  ['facility', 'Location', [d.address, d.town, d.county].filter(Boolean).join(', ')],
  ['facility', 'KRA PIN', d.kraPin],
  ['licences', 'Registration no.', d.regNo],
  ['licences', 'Licence expires', d.licenceExpiry ? new Date(d.licenceExpiry).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''],
  ['licences', 'Services', d.services],
  ['bank', 'Paid to', [d.bank, d.branch].filter(Boolean).join(', ')],
  ['bank', 'Account', d.accountNo ? `${d.accountName} · ••• ${d.accountNo.slice(-4)}` : ''],
  ['contacts', 'Main contact', [d.contactName, d.contactRole].filter(Boolean).join(', ')],
  ['contacts', 'Reach them on', [d.contactPhone, d.contactEmail].filter(Boolean).join(' · ')],
  ['documents', 'Documents', requiredDocs.filter((doc) => d[doc.id]).length + ' of ' + requiredDocs.length + ' uploaded']];


  return (
    <ImpactShell title="Complete your profile" active="Home" account={{ name: d.facilityName || ob.facility, sub: 'Profile incomplete', initials: (d.facilityName || ob.facility).split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') }}>
      <div className="mx-auto max-w-[680px] space-y-4">
        <Link to="/impact/dashboard" className="text-[13px] font-semibold text-cic-red hover:underline">‹ Back to dashboard</Link>
        <StepHeader step={step + 1} total={profileSections.length} title={section.title} />

        <section className={card}>
          <div className="border-b border-cic-line px-4 py-3">
            <p className="text-[14px]"><strong>{d.facilityName || ob.facility}</strong> | {section.short}</p>
            <p className="mt-0.5 text-[13px] font-semibold text-cic-burgundy">{ob.done.filter((x) => x !== 'review').length} of {profileSections.length - 1} sections complete · saved as you go</p>
          </div>

          <div className="grid gap-4 px-4 py-5 sm:grid-cols-2">
            {section.id === 'facility' &&
            <>
                <BoxField label="Facility name" error={errors.facilityName} className="sm:col-span-2">
                  <input value={d.facilityName ?? ''} onChange={(e) => set('facilityName')(e.target.value)} className={boxInput} />
                </BoxField>
                <BoxField label="Facility type" error={errors.facilityType}>
                  <BoxSelect value={d.facilityType ?? ''} onChange={set('facilityType')} options={facilityTypes} />
                </BoxField>
                <BoxField label="KRA PIN" error={errors.kraPin}>
                  <input value={d.kraPin ?? ''} onChange={(e) => set('kraPin')(e.target.value.toUpperCase())} placeholder="e.g. P051234567X" maxLength={11} className={boxInput} />
                </BoxField>
                <BoxField label="County" error={errors.county}>
                  <BoxSelect value={d.county ?? ''} onChange={set('county')} options={counties} />
                </BoxField>
                <BoxField label="Town" error={errors.town}>
                  <input value={d.town ?? ''} onChange={(e) => set('town')(e.target.value)} placeholder="e.g. Kisumu" className={boxInput} />
                </BoxField>
                <BoxField label="Physical address" error={errors.address} className="sm:col-span-2">
                  <input value={d.address ?? ''} onChange={(e) => set('address')(e.target.value)} placeholder="Building, street or landmark" className={boxInput} />
                </BoxField>
              </>
            }

            {section.id === 'licences' &&
            <>
                <BoxField label="Facility registration number" error={errors.regNo}>
                  <input value={d.regNo ?? ''} onChange={(e) => set('regNo')(e.target.value)} placeholder="As shown on your licence" className={boxInput} />
                </BoxField>
                <BoxField label="Licence expiry date" error={errors.licenceExpiry}>
                  <input type="date" value={d.licenceExpiry ?? ''} onChange={(e) => set('licenceExpiry')(e.target.value)} className={boxInput} />
                </BoxField>
                <fieldset className="sm:col-span-2">
                  <legend className="text-[14px] font-semibold">Services you offer</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {services.map((s) => {
                    const on = (d.services ?? '').split(', ').includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleService(s)}
                        className={`border px-4 py-1.5 text-[13px] transition-colors ${on ? 'border-cic-burgundy bg-cic-burgundy text-white' : 'border-cic-line bg-white hover:border-cic-burgundy'}`}>

                          {s}
                        </button>);

                  })}
                  </div>
                  {errors.services && <p className="mt-2 text-[12px] text-cic-red">{errors.services}</p>}
                </fieldset>
              </>
            }

            {section.id === 'bank' &&
            <>
                <BoxField label="Bank" error={errors.bank}>
                  <BoxSelect value={d.bank ?? ''} onChange={set('bank')} options={banks} />
                </BoxField>
                <BoxField label="Branch" error={errors.branch}>
                  <input value={d.branch ?? ''} onChange={(e) => set('branch')(e.target.value)} placeholder="e.g. Kisumu Oginga Odinga St" className={boxInput} />
                </BoxField>
                <BoxField label="Account name" error={errors.accountName} className="sm:col-span-2">
                  <input value={d.accountName ?? ''} onChange={(e) => set('accountName')(e.target.value)} placeholder="Must match your facility or owner's name" className={boxInput} />
                </BoxField>
                <BoxField label="Account number" error={errors.accountNo}>
                  <input inputMode="numeric" value={d.accountNo ?? ''} onChange={(e) => set('accountNo')(e.target.value.replace(/\D/g, ''))} className={boxInput} />
                </BoxField>
                <BoxField label="Confirm account number" error={errors.accountNo2}>
                  <input inputMode="numeric" value={d.accountNo2 ?? ''} onChange={(e) => set('accountNo2')(e.target.value.replace(/\D/g, ''))} onPaste={(e) => e.preventDefault()} className={boxInput} />
                </BoxField>
                <p className="flex gap-2 bg-[#FFF8E1] px-3 py-2.5 text-[13px] sm:col-span-2">
                  <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#B8860B]" aria-hidden="true" />
                  We'll check these details against your bank letter before the first payment.
                </p>
              </>
            }

            {section.id === 'contacts' &&
            <>
                <BoxField label="Main contact name" error={errors.contactName}>
                  <input value={d.contactName ?? ''} onChange={(e) => set('contactName')(e.target.value)} className={boxInput} />
                </BoxField>
                <BoxField label="Role" error={errors.contactRole}>
                  <BoxSelect value={d.contactRole ?? ''} onChange={set('contactRole')} options={contactRoles} />
                </BoxField>
                <BoxField label="Phone" error={errors.contactPhone}>
                  <input type="tel" value={d.contactPhone ?? ''} onChange={(e) => set('contactPhone')(e.target.value)} className={boxInput} />
                </BoxField>
                <BoxField label="Email" error={errors.contactEmail}>
                  <input type="email" value={d.contactEmail ?? ''} onChange={(e) => set('contactEmail')(e.target.value)} className={boxInput} />
                </BoxField>
                <BoxField label="Claims queries go to" optional error={errors.claimsEmail} className="sm:col-span-2">
                  <input type="email" value={d.claimsEmail ?? ''} onChange={(e) => set('claimsEmail')(e.target.value)} placeholder="e.g. claims@upendo.co.ke" className={boxInput} />
                </BoxField>
              </>
            }

            {section.id === 'documents' &&
            <ul className="space-y-3 sm:col-span-2">
                {requiredDocs.map((doc) =>
              <li key={doc.id}>
                    <div className={`flex items-center gap-3 border px-3 py-3 ${errors[doc.id] ? 'border-cic-red' : 'border-cic-line'}`}>
                      <FileTextIcon className="h-5 w-5 shrink-0 text-cic-red" aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-semibold">{doc.label}{doc.optional && <span className="font-normal text-cic-muted"> (optional)</span>}</p>
                        <p className="truncate text-[12px] text-cic-muted">{d[doc.id] ? <span className="text-cic-green">✓ {d[doc.id]}</span> : `PDF, JPG or PNG, up to ${MAX_MB} MB`}</p>
                      </div>
                      {d[doc.id] ?
                  <button type="button" onClick={() => set(doc.id)('')} aria-label={`Remove ${doc.label}`} className="p-1 text-cic-muted hover:text-cic-red">
                          <XIcon className="h-4 w-4" />
                        </button> :

                  <label className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-semibold text-cic-red hover:underline">
                          <UploadIcon className="h-4 w-4" aria-hidden="true" /> Upload
                          <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" onChange={(e) => upload(doc.id, e.target.files?.[0])} />
                        </label>
                  }
                    </div>
                    {errors[doc.id] && <p className="mt-1 text-[12px] text-cic-red">{errors[doc.id]}</p>}
                  </li>
              )}
              </ul>
            }

            {section.id === 'review' &&
            <div className="sm:col-span-2">
                <dl className="divide-y divide-cic-line border-y border-cic-line text-[14px]">
                  {review.map(([sid, k, v]) =>
                <div key={k} className="grid grid-cols-[130px_1fr_auto] items-start gap-3 py-2.5">
                      <dt className="text-cic-muted">{k}</dt>
                      <dd className="font-semibold">{v || <span className="font-normal text-cic-red">Missing</span>}</dd>
                      <button onClick={() => {setErrors({});setStep(profileSections.findIndex((s) => s.id === sid));}} className="flex items-center gap-1 text-[12px] font-semibold text-cic-red hover:underline">
                        <PencilIcon className="h-3.5 w-3.5" aria-hidden="true" /> Edit
                      </button>
                    </div>
                )}
                </dl>
                <label className="mt-5 flex items-start gap-3 text-[14px]">
                  <input type="checkbox" checked={declared} onChange={(e) => setDeclared(e.target.checked)} className="mt-0.5 h-5 w-5 accent-[#86191F]" />
                  I confirm these details are correct and that I'm authorised to apply on behalf of this facility.
                </label>
                {errors.declared && <p className="mt-1 text-[12px] text-cic-red" role="alert">{errors.declared}</p>}
              </div>
            }
          </div>

          <button onClick={saveExit} className="flex w-full items-center justify-center gap-2 border-t border-cic-line py-3 text-[13px] font-semibold text-cic-red transition-colors hover:bg-black/[0.02]">
            <CheckCircle2Icon className="h-4 w-4" aria-hidden="true" /> Save and finish later
          </button>
        </section>

        <div className="flex justify-center gap-3 pb-8 pt-2">
          {step > 0 && <button onClick={() => {setErrors({});setStep(step - 1);}} className={pillGhost}>Back</button>}
          <button onClick={next} disabled={busy} className={pillSolid}>
            {busy && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {section.id === 'review' ? busy ? 'Submitting…' : 'Submit for approval' : 'Continue'}
          </button>
        </div>
      </div>
    </ImpactShell>);

}
