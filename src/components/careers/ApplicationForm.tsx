import React, { useRef, useState } from 'react';
import { CheckCircle2Icon, CheckIcon, ChevronDownIcon, FileTextIcon, Loader2Icon, PlusIcon, Trash2Icon, UploadIcon, XIcon } from 'lucide-react';
import { countries, dataProtectionText, declarationText, noticePeriods, qualificationStatuses } from '../../data/jobs';

const MAX_MB = 20;

type Row = Record<string, string>;
type GroupKey = 'qualifications' | 'education' | 'experience';
type FieldDef = {name: string;label: string;type?: 'text' | 'select' | 'date' | 'year';optional?: boolean;};
type GroupDef = {key: GroupKey;title: string;item: string;fields: FieldDef[];single?: boolean;};

const groups: Record<GroupKey, GroupDef> = {
  qualifications: {
    key: 'qualifications',
    title: 'Professional qualifications',
    item: 'Qualification',
    fields: [
    { name: 'qualification', label: 'Qualification', type: 'text' },
    { name: 'institution', label: 'Institution' },
    { name: 'status', label: 'Status', type: 'select' },
    { name: 'year', label: 'Year', type: 'year' }]

  },
  education: {
    key: 'education',
    title: 'Education (highest level only)',
    item: 'Education',
    single: true,
    fields: [
    { name: 'certificate', label: 'Certificate' },
    { name: 'institution', label: 'Institution' },
    { name: 'status', label: 'Status', type: 'select' },
    { name: 'year', label: 'Year', type: 'year' }]

  },
  experience: {
    key: 'experience',
    title: 'Work experience',
    item: 'Role',
    fields: [
    { name: 'employer', label: 'Employer' },
    { name: 'position', label: 'Position' },
    { name: 'start', label: 'Start date', type: 'date' },
    { name: 'end', label: 'End date', type: 'date', optional: true }]

  }
};

const steps = [
{ label: 'Personal details', sub: 'Who you are and how to reach you' },
{ label: 'Qualifications', sub: 'Professional qualifications and education' },
{ label: 'Experience', sub: 'Your work history, latest first' },
{ label: 'CV and pay', sub: 'Upload your CV and tell us about your notice and pay' },
{ label: 'Review and submit', sub: 'Check your details and confirm' }];


const blankRow = (g: GroupDef): Row => Object.fromEntries(g.fields.map((f) => [f.name, '']));
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const inputCls = (err?: string) =>
`mt-1 w-full border bg-white px-3 py-2 text-[14px] outline-none placeholder:italic placeholder:text-[#9a9a9a] focus:border-cic-burgundy ${err ? 'border-cic-red' : 'border-cic-line'}`;

function Field({ id, label, error, optional, children }: {id: string;label: string;error?: string;optional?: boolean;children: React.ReactNode;}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[12px] font-semibold">
        {label}
        {optional && <span className="font-normal text-cic-muted"> (optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-[12px] text-cic-red">{error}</p>}
    </div>);

}

function Select({ id, value, onChange, options, error }: {id: string;value: string;onChange: (v: string) => void;options: string[];error?: string;}) {
  return (
    <div className="relative">
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} className={`${inputCls(error)} appearance-none pr-9`}>
        <option value="">Select</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 mt-0.5 h-4 w-4 -translate-y-1/2 text-cic-red" aria-hidden="true" />
    </div>);

}

/** Absa-style stepped application (Register pattern): stepper, one step at a time, Back / Continue, review. Simulated. */
export function ApplicationForm({ position }: {position: string;}) {
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Row>({ name: '', email: '', phone: '', gender: '', dob: '', country: 'Kenya', years: '', notice: '', pay: '' });
  const [rows, setRows] = useState<Record<GroupKey, Row[]>>({
    qualifications: [blankRow(groups.qualifications)],
    education: [blankRow(groups.education)],
    experience: [blankRow(groups.experience)]
  });
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState({ data: false, declaration: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [ref, setRef] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const top = useRef<HTMLDivElement>(null);

  const set = (k: string) => (val: string) => setV((s) => ({ ...s, [k]: val }));
  const setRow = (key: GroupKey, i: number, name: string, value: string) =>
  setRows((r) => ({ ...r, [key]: r[key].map((row, j) => j === i ? { ...row, [name]: value } : row) }));

  const pickFile = (f?: File | null) => {
    if (!f) return;
    if (f.type !== 'application/pdf' && !/\.pdf$/i.test(f.name)) return setErrors((e) => ({ ...e, file: 'Please upload a single PDF file.' }));
    if (f.size > MAX_MB * 1024 * 1024) return setErrors((e) => ({ ...e, file: `This file is over ${MAX_MB} MB. Please upload a smaller PDF.` }));
    setErrors(({ file: _drop, ...rest }) => rest);
    setFile(f);
  };

  const groupErrors = (g: GroupDef, e: Record<string, string>) =>
  rows[g.key].forEach((r, i) => g.fields.forEach((f) => !f.optional && !r[f.name] && (e[`${g.key}-${i}-${f.name}`] = `Enter the ${f.label.toLowerCase()}`)));

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!v.name.trim()) e.name = 'Enter your full names';
      if (!isEmail(v.email)) e.email = 'Enter a valid email address';
      if (v.phone.replace(/\D/g, '').length < 9) e.phone = 'Enter a valid mobile number';
      if (!v.dob) e.dob = 'Enter your date of birth';
      if (!v.country) e.country = 'Select your country';
    }
    if (s === 1) {
      groupErrors(groups.qualifications, e);
      groupErrors(groups.education, e);
    }
    if (s === 2) groupErrors(groups.experience, e);
    if (s === 3) {
      if (!v.years) e.years = 'Enter your relevant years of experience';
      if (!file) e.file = 'Upload your CV and certificates as one PDF';
    }
    if (s === 4) {
      if (!consent.data) e.data = 'Please agree to the data protection statement';
      if (!consent.declaration) e.declaration = 'Please confirm the declaration';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const scrollTop = () => top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const goTo = (i: number) => {
    setErrors({});
    setStep(i);
    scrollTop();
  };
  const next = () => {
    if (!validate(step)) return;
    if (step < steps.length - 1) return goTo(step + 1);
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setRef(`CIC-HR-${Math.floor(100000 + Math.random() * 900000)}`);
      scrollTop();
    }, 900);
  };

  const renderGroup = (g: GroupDef) =>
  <fieldset className="mt-8 first:mt-0">
      <legend className="text-[16px] font-semibold">{g.title}</legend>
      <div className="mt-4 divide-y divide-cic-line border-y border-cic-line">
        {rows[g.key].map((row, i) =>
      <div key={i} className="py-5">
            {!g.single &&
        <div className="mb-3 flex items-center justify-between">
                <p className="text-[13px] font-semibold text-cic-muted">{g.item} {i + 1}</p>
                {rows[g.key].length > 1 &&
          <button
            type="button"
            onClick={() => setRows((r) => ({ ...r, [g.key]: r[g.key].filter((_, j) => j !== i) }))}
            className="flex items-center gap-1 text-[13px] text-cic-red hover:underline">

                    <Trash2Icon className="h-3.5 w-3.5" aria-hidden="true" /> Remove
                  </button>
          }
              </div>
        }
            <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
              {g.fields.map((f) => {
            const id = `${g.key}-${i}-${f.name}`;
            return (
              <Field key={f.name} id={id} label={f.label} optional={f.optional} error={errors[id]}>
                    {f.type === 'select' ?
                <Select id={id} value={row[f.name]} onChange={(val) => setRow(g.key, i, f.name, val)} options={qualificationStatuses} error={errors[id]} /> :

                <input
                  id={id}
                  type={f.type === 'date' ? 'date' : f.type === 'year' ? 'number' : 'text'}
                  min={f.type === 'year' ? 1960 : undefined}
                  max={f.type === 'year' ? 2030 : undefined}
                  placeholder={f.type === 'year' ? 'e.g. 2018' : undefined}
                  value={row[f.name]}
                  onChange={(e) => setRow(g.key, i, f.name, e.target.value)}
                  aria-invalid={Boolean(errors[id])}
                  className={inputCls(errors[id])} />

                }
                  </Field>);

          })}
            </div>
          </div>
      )}
      </div>
      {!g.single &&
    <button
      type="button"
      onClick={() => setRows((r) => ({ ...r, [g.key]: [...r[g.key], blankRow(g)] }))}
      className="mt-4 flex items-center gap-1.5 text-[14px] text-cic-orange underline hover:text-cic-red">

          <PlusIcon className="h-4 w-4" aria-hidden="true" /> Add another {g.item.toLowerCase()}
        </button>
    }
    </fieldset>;


  if (ref) {
    return (
      <div ref={top} className="scroll-mt-6 py-4" aria-live="polite">
        <div className="mx-auto max-w-lg bg-white p-10 text-center shadow-card">
          <CheckCircle2Icon className="mx-auto h-12 w-12 text-cic-green" aria-hidden="true" />
          <h3 className="mt-4 text-[24px] font-semibold">Thank you, {v.name.trim().split(' ')[0]}</h3>
          <p className="mt-3 text-[14px] text-cic-muted">
            We've received your application for {position}. Your reference number is <span className="font-semibold text-cic-ink">{ref}</span>.
            Only shortlisted candidates will be contacted.
          </p>
          <p className="mt-6 text-[11px] text-cic-muted">Design concept: this form is simulated and nothing was sent.</p>
        </div>
      </div>);

  }

  const summary: [string, string][] = [
  ['Position', position],
  ['Full names', v.name],
  ['Email', v.email],
  ['Mobile', v.phone],
  ['Date of birth', v.dob],
  ['Country', v.country],
  ['Qualifications', rows.qualifications.map((r) => `${r.qualification} (${r.status}, ${r.year})`).join('; ')],
  ['Education', rows.education.map((r) => `${r.certificate}, ${r.institution}`).join('; ')],
  ['Experience', rows.experience.map((r) => `${r.position}, ${r.employer}`).join('; ')],
  ['Years of experience', v.years],
  ['Notice period', v.notice || 'Not given'],
  ['CV', file?.name ?? '']];


  return (
    <div ref={top} className="grid scroll-mt-6 gap-10 md:grid-cols-[200px_1fr]">
      {/* Stepper (Absa register pattern) */}
      <nav aria-label="Application progress">
        <ol className="flex gap-6 overflow-x-auto md:flex-col md:gap-0">
          {steps.map((s, i) => {
            const isCurrent = i === step;
            const isDone = i < step;
            return (
              <li key={s.label} className="relative flex shrink-0 gap-3 md:pb-6">
                {i < steps.length - 1 &&
                <span className="absolute left-[11px] top-7 hidden h-[calc(100%-28px)] w-px bg-cic-line md:block" aria-hidden="true" />
                }
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  disabled={!isDone}
                  aria-current={isCurrent ? 'step' : undefined}
                  className="flex items-start gap-3 text-left disabled:cursor-default">

                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] ${
                    isCurrent ? 'bg-cic-red text-white' : isDone ? 'bg-cic-burgundy text-white' : 'border border-cic-muted text-cic-muted'}`
                    }>

                    {isDone ? <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                  </span>
                  <span>
                    <span className={`block text-[15px] ${isCurrent ? 'font-semibold text-cic-red' : 'text-cic-ink'}`}>{s.label}</span>
                    {isCurrent && <span className="mt-1 hidden text-[13px] text-cic-red md:block">{s.sub}</span>}
                  </span>
                </button>
              </li>);

          })}
        </ol>
      </nav>

      <section aria-live="polite">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-cic-muted">Step {step + 1} of {steps.length}</p>

        {step === 0 &&
        <div>
            <h3 className="mt-1 text-[22px] font-semibold">Tell us about yourself</h3>
            <div className="mt-6 grid max-w-2xl gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field id="app-name" label="Full names" error={errors.name}>
                  <input id="app-name" value={v.name} onChange={(e) => set('name')(e.target.value)} autoComplete="name" placeholder="As on your ID" aria-invalid={Boolean(errors.name)} className={inputCls(errors.name)} />
                </Field>
              </div>
              <Field id="app-email" label="Email address" error={errors.email}>
                <input id="app-email" type="email" value={v.email} onChange={(e) => set('email')(e.target.value)} autoComplete="email" placeholder="name@example.com" aria-invalid={Boolean(errors.email)} className={inputCls(errors.email)} />
              </Field>
              <Field id="app-phone" label="Mobile number" error={errors.phone}>
                <input id="app-phone" type="tel" value={v.phone} onChange={(e) => set('phone')(e.target.value)} autoComplete="tel" placeholder="07XX XXX XXX" aria-invalid={Boolean(errors.phone)} className={inputCls(errors.phone)} />
              </Field>
              <Field id="app-dob" label="Date of birth" error={errors.dob}>
                <input id="app-dob" type="date" value={v.dob} onChange={(e) => set('dob')(e.target.value)} aria-invalid={Boolean(errors.dob)} className={inputCls(errors.dob)} />
              </Field>
              <Field id="app-country" label="Country" error={errors.country}>
                <Select id="app-country" value={v.country} onChange={set('country')} options={countries} error={errors.country} />
              </Field>
              <fieldset className="sm:col-span-2">
                <legend className="text-[12px] font-semibold">Gender <span className="font-normal text-cic-muted">(optional)</span></legend>
                <div className="mt-2 flex gap-6">
                  {['Male', 'Female'].map((g) =>
                <label key={g} className="flex items-center gap-2 text-[14px]">
                      <input type="radio" name="gender" value={g} checked={v.gender === g} onChange={(e) => set('gender')(e.target.value)} className="h-4 w-4 accent-[#86191F]" />
                      {g}
                    </label>
                )}
                </div>
              </fieldset>
            </div>
          </div>
        }

        {step === 1 &&
        <div>
            <h3 className="mt-1 text-[22px] font-semibold">Your qualifications</h3>
            <p className="mt-2 max-w-xl text-[14px] text-cic-muted">Add your professional qualifications, such as AIIK, ACII, FLMI or CIM, and your highest level of education.</p>
            <div className="mt-6">
              {renderGroup(groups.qualifications)}
              {renderGroup(groups.education)}
            </div>
          </div>
        }

        {step === 2 &&
        <div>
            <h3 className="mt-1 text-[22px] font-semibold">Your work experience</h3>
            <p className="mt-2 max-w-xl text-[14px] text-cic-muted">Start with your current or most recent role. Leave the end date blank if you still work there.</p>
            <div className="mt-6">{renderGroup(groups.experience)}</div>
          </div>
        }

        {step === 3 &&
        <div>
            <h3 className="mt-1 text-[22px] font-semibold">Your CV and pay</h3>
            <div className="mt-6 grid max-w-2xl gap-5 sm:grid-cols-3">
              <Field id="app-years" label="Relevant years of experience" error={errors.years}>
                <input id="app-years" type="number" min={0} max={50} value={v.years} onChange={(e) => set('years')(e.target.value)} aria-invalid={Boolean(errors.years)} className={inputCls(errors.years)} />
              </Field>
              <Field id="app-notice" label="Current notice period" optional>
                <Select id="app-notice" value={v.notice} onChange={set('notice')} options={noticePeriods} />
              </Field>
              <Field id="app-pay" label="Gross monthly pay (KES)" optional>
                <input id="app-pay" type="number" min={0} value={v.pay} onChange={(e) => set('pay')(e.target.value)} placeholder="e.g. 250000" className={inputCls()} />
              </Field>
            </div>

            <div className="mt-8 max-w-2xl">
              <p className="text-[12px] font-semibold">CV and certificates</p>
              <p className="mt-1 text-[13px] text-cic-muted">Combine your CV and certificates into one PDF, up to {MAX_MB} MB.</p>
              {file ?
            <div className="mt-3 flex items-center gap-3 border border-cic-line p-4">
                  <FileTextIcon className="h-6 w-6 shrink-0 text-cic-red" strokeWidth={1.5} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold">{file.name}</span>
                    <span className="block text-[12px] text-cic-muted">{(file.size / 1024 / 1024).toFixed(1)} MB · PDF</span>
                  </span>
                  <button type="button" onClick={() => setFile(null)} aria-label="Remove file" className="p-1 text-cic-muted hover:text-cic-red">
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div> :

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                pickFile(e.dataTransfer.files[0]);
              }}
              className={`mt-3 flex flex-wrap items-center gap-4 border bg-cic-mist p-5 ${errors.file ? 'border-cic-red' : 'border-cic-line'}`}>

                  <button
                type="button"
                onClick={() => fileInput.current?.click()}
                className="flex items-center gap-2 border border-cic-orange bg-white px-5 py-2 text-[14px] text-cic-orange transition-colors hover:bg-[#FBECEC]">

                    <UploadIcon className="h-4 w-4" aria-hidden="true" /> Choose file
                  </button>
                  <span className="text-[13px] text-cic-muted">or drag your PDF here</span>
                </div>
            }
              <input ref={fileInput} type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} aria-label="Upload CV and certificates" />
              {errors.file && <p className="mt-1 text-[12px] text-cic-red" role="alert">{errors.file}</p>}
            </div>
          </div>
        }

        {step === 4 &&
        <div>
            <h3 className="mt-1 text-[22px] font-semibold">Review your application</h3>
            <dl className="mt-6 max-w-2xl divide-y divide-cic-line border-y border-cic-line text-[14px]">
              {summary.map(([k, val]) =>
            <div key={k} className="grid grid-cols-[160px_1fr] gap-4 py-3">
                  <dt className="text-cic-muted">{k}</dt>
                  <dd className="font-semibold">{val}</dd>
                </div>
            )}
            </dl>

            <div className="mt-8 max-w-2xl space-y-6">
              {[
            { key: 'data' as const, title: 'Data protection', text: dataProtectionText, agree: 'I agree to CIC processing my information for this application.' },
            { key: 'declaration' as const, title: 'Declaration', text: declarationText, agree: 'I confirm that the information above is correct.' }].
            map((c) =>
            <div key={c.key}>
                  <p className="text-[14px] font-semibold">{c.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-cic-muted">{c.text}</p>
                  <label className="mt-3 flex items-start gap-3 text-[14px]">
                    <input
                  type="checkbox"
                  checked={consent[c.key]}
                  onChange={(e) => setConsent((s) => ({ ...s, [c.key]: e.target.checked }))}
                  className="mt-0.5 h-5 w-5 accent-[#86191F]" />

                    {c.agree}
                  </label>
                  {errors[c.key] && <p className="mt-1 text-[12px] text-cic-red" role="alert">{errors[c.key]}</p>}
                </div>
            )}
            </div>
          </div>
        }

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {step > 0 &&
          <button type="button" onClick={() => goTo(step - 1)} className="border border-cic-orange px-6 py-2.5 text-[14px] text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]">
              Back
            </button>
          }
          <button
            type="button"
            onClick={next}
            disabled={submitting}
            className="flex items-center gap-2 bg-cic-orange px-8 py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23] disabled:opacity-80">

            {submitting && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {step === steps.length - 1 ? submitting ? 'Submitting…' : 'Submit application' : 'Continue'}
          </button>
          {step === steps.length - 1 && <p className="text-[11px] text-cic-muted">Design concept: nothing is sent.</p>}
        </div>
      </section>
    </div>);

}
