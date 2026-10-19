import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { CheckCircle2Icon, ChevronDownIcon, Loader2Icon } from 'lucide-react';
import { LinkTarget, SmartLink } from './shared';

export type ContactCardData = {
  title: string;
  icon?: LucideIcon;
  /** Lines of text (address lines, phone numbers, hours). */
  lines: string[];
  link?: LinkTarget;
};

/** Absa contact/office cards: white shadow-card with ink icon, semibold title, detail lines and optional link. */
export function ContactCards({ items, columns = 3 }: {items: ContactCardData[];columns?: 2 | 3 | 4;}) {
  const cols = columns === 4 ? 'lg:grid-cols-4' : columns === 3 ? 'lg:grid-cols-3' : '';
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 ${cols}`}>
      {items.map(({ title, icon: Icon, lines, link }) =>
      <li key={title} className="flex flex-col bg-white p-5 shadow-card">
          {Icon && <Icon className="h-6 w-6 text-cic-ink" strokeWidth={1.5} aria-hidden="true" />}
          <h3 className={`text-[16px] font-semibold ${Icon ? 'mt-3' : ''}`}>{title}</h3>
          <div className="mt-2 space-y-1 text-[13px] leading-relaxed">
            {lines.map((l) =>
          <p key={l}>{l}</p>
          )}
          </div>
          {link &&
        <SmartLink target={link} className="mt-auto pt-5 text-[13px] font-semibold text-cic-burgundy underline hover:text-cic-red" />
        }
        </li>
      )}
    </ul>);

}

export type ContactFormField = {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  /** Spans both columns on desktop. */
  wide?: boolean;
};

type FormProps = {
  title?: string;
  fields: ContactFormField[];
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Absa form (Login/FormField styling): two-column fields, inline validation, simulated submit with success state. No network calls. */
export function ContactForm({
  title,
  fields,
  submitLabel = 'Send message',
  successTitle = 'Thank you, we have received your message',
  successBody = 'One of our consultants will get back to you within one business day.'
}: FormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    fields.forEach((f) => {
      const v = (values[f.id] ?? '').trim();
      if (f.required && !v) next[f.id] = `Please enter ${f.label.toLowerCase()}.`;else
      if (v && f.type === 'email' && !isEmail(v)) next[f.id] = 'Enter a valid email address.';else
      if (v && f.type === 'tel' && v.replace(/\D/g, '').length < 9) next[f.id] = 'Enter a valid phone number.';
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 700);
  };

  if (done) {
    return (
      <div className="bg-white p-10 text-center shadow-card" aria-live="polite">
        <CheckCircle2Icon className="mx-auto h-12 w-12 text-cic-green" aria-hidden="true" />
        <h3 className="mt-4 text-[22px] font-semibold">{successTitle}</h3>
        <p className="mt-3 text-[14px] text-cic-muted">{successBody}</p>
        <button
          onClick={() => {
            setValues({});
            setDone(false);
          }}
          className="mt-6 border border-cic-orange px-6 py-2.5 text-[14px] text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]">

          Send another message
        </button>
      </div>);

  }

  return (
    <form onSubmit={submit} noValidate className="bg-white p-6 shadow-card md:p-10">
      {title && <h3 className="mb-6 text-[20px] font-semibold">{title}</h3>}
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => {
          const err = errors[f.id];
          const base = `mt-1 w-full border bg-white px-3 py-2 text-[14px] outline-none focus:border-cic-burgundy ${
          err ? 'border-cic-red' : 'border-cic-line'}`;
          const common = {
            id: f.id,
            value: values[f.id] ?? '',
            'aria-invalid': Boolean(err),
            'aria-describedby': err ? `${f.id}-error` : undefined
          };
          const set = (v: string) => setValues((s) => ({ ...s, [f.id]: v }));
          return (
            <div key={f.id} className={f.wide || f.type === 'textarea' ? 'sm:col-span-2' : ''}>
              <label htmlFor={f.id} className="block text-[12px] font-semibold">
                {f.label}
                {f.required && <span className="text-cic-red"> *</span>}
              </label>
              {f.type === 'textarea' ?
              <textarea
                {...common}
                rows={5}
                placeholder={f.placeholder}
                onChange={(e) => set(e.target.value)}
                className={`${base} placeholder:italic placeholder:text-[#9a9a9a]`} /> :

              f.type === 'select' ?
              <div className="relative">
                  <select {...common} onChange={(e) => set(e.target.value)} className={`${base} appearance-none pr-9`}>
                    <option value="">Select</option>
                    {(f.options ?? []).map((o) =>
                  <option key={o} value={o}>
                        {o}
                      </option>
                  )}
                  </select>
                  <ChevronDownIcon
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cic-red"
                  aria-hidden="true" />

                </div> :

              <input
                {...common}
                type={f.type ?? 'text'}
                placeholder={f.placeholder}
                onChange={(e) => set(e.target.value)}
                className={`${base} placeholder:italic placeholder:text-[#9a9a9a]`} />

              }
              {err &&
              <p id={`${f.id}-error`} className="mt-1 text-[12px] text-cic-red">
                  {err}
                </p>
              }
            </div>);

        })}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-8 flex items-center gap-2 bg-cic-orange px-8 py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23] disabled:opacity-80">

        {loading && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {loading ? 'Sending…' : submitLabel}
      </button>
    </form>);

}
