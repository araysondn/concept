import React, { useState } from 'react';
import { CheckIcon, StarIcon } from 'lucide-react';

/** Absa-style numbered stepper for the checkout (vertical on desktop, horizontal scroll on mobile). */
export function CheckoutStepper({ steps, current, onSelect }: {steps: string[];current: number;onSelect: (i: number) => void;}) {
  return (
    <nav aria-label="Checkout progress">
      <p className="mb-4 text-[13px] text-cic-muted md:mb-6">
        Step {current + 1} of {steps.length}
      </p>
      <ol className="flex gap-6 overflow-x-auto md:flex-col md:gap-0">
        {steps.map((label, i) => {
          const isCurrent = i === current;
          const isDone = i < current;
          return (
            <li key={label} className="relative flex shrink-0 gap-3 md:pb-6">
              {i < steps.length - 1 &&
              <span className="absolute left-[11px] top-7 hidden h-[calc(100%-28px)] w-px bg-cic-line md:block" aria-hidden="true" />
              }
              <button
                type="button"
                onClick={() => onSelect(i)}
                disabled={!isDone}
                aria-current={isCurrent ? 'step' : undefined}
                className="flex items-start gap-3 text-left disabled:cursor-default">

                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] ${
                  isCurrent ? 'bg-cic-red text-white' : isDone ? 'bg-cic-burgundy text-white' : 'border border-cic-muted text-cic-muted'}`
                  }>

                  {isDone ? <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                </span>
                <span className={`text-[15px] ${isCurrent ? 'font-semibold text-cic-red' : 'text-cic-ink'}`}>{label}</span>
              </button>
            </li>);

        })}
      </ol>
    </nav>);

}

/** Yes / No question as a pair of square toggle buttons (radio semantics). */
export function YesNo({ id, question, value, onChange, error }: {id: string;question: string;value?: boolean;onChange: (v: boolean) => void;error?: string;}) {
  return (
    <fieldset className="border-b border-cic-line py-5">
      <legend id={`${id}-q`} className="float-left w-full text-[15px] font-semibold">{question}</legend>
      <div className="clear-both flex gap-3 pt-3" role="radiogroup" aria-labelledby={`${id}-q`}>
        {[true, false].map((v) =>
        <button
          key={String(v)}
          type="button"
          role="radio"
          aria-checked={value === v}
          onClick={() => onChange(v)}
          className={`min-w-[96px] border px-5 py-2 text-[14px] font-semibold transition-colors duration-150 ${
          value === v ? 'border-cic-red bg-cic-red text-white' : 'border-cic-line hover:border-cic-red'}`
          }>

            {v ? 'Yes' : 'No'}
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-[12px] text-cic-red" role="alert">{error}</p>}
    </fieldset>);

}

/** 5-star rating with a thank-you state. */
export function RateUs() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [sent, setSent] = useState(false);
  if (sent) return <p className="text-[15px] font-semibold text-cic-green" role="status">Thanks for your feedback!</p>;
  return (
    <div>
      <div className="flex gap-1" role="radiogroup" aria-label="Rate your experience" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) =>
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={rating === n}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          onMouseEnter={() => setHover(n)}
          onClick={() => setRating(n)}
          className="p-1">

            <StarIcon className={`h-7 w-7 ${n <= (hover || rating) ? 'fill-cic-amber text-cic-amber' : 'text-cic-line'}`} aria-hidden="true" />
          </button>
        )}
      </div>
      <button
        type="button"
        disabled={!rating}
        onClick={() => setSent(true)}
        className="mt-3 border border-cic-orange px-5 py-2 text-[14px] font-semibold text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC] disabled:opacity-40">

        Rate us
      </button>
    </div>);

}
