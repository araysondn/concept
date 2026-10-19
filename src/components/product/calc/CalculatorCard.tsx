import React, { ReactNode, useId } from 'react';
import { InfoIcon } from 'lucide-react';
import { BrandStripe } from '../../BrandStripe';
import { ActionLink } from '../ActionLink';
import type { PageLink } from '../../../data/productPage';

export type CalcResult = {label: ReactNode;value: ReactNode;note?: ReactNode;};

/** Absa floating calculator card: title, fields (children), grey result box, outline CTA and the brand stripe. */
export function CalculatorCard({
  title,
  children,
  result,
  cta = { label: 'Get a Full Quote' },
  onCta






}: {title: string;children: ReactNode;result: CalcResult;cta?: PageLink;onCta?: () => void;}) {
  const uid = useId();
  const ctaClass =
  'mt-4 block w-full border-2 border-cic-orange py-2 text-center text-[14px] text-cic-orange transition-colors duration-150 hover:bg-cic-orange hover:text-white';
  return (
    <section aria-labelledby={`${uid}-title`} className="w-full max-w-[380px] bg-white shadow-card">
      <div className="px-6 pb-5 pt-5">
        <h2 id={`${uid}-title`} className="text-[22px] font-semibold text-cic-ink">
          {title}
        </h2>

        {children}

        <div className="mt-4 bg-cic-mist px-4 py-4">
          <p className="flex items-center gap-1.5 text-[13px]">
            {result.label} <InfoIcon className="h-4 w-4 text-[#0a6ed1]" aria-hidden="true" />
          </p>
          <p className="mt-2 text-[24px] font-semibold text-cic-ink" aria-live="polite">
            {result.value}
          </p>
          {result.note && <p className="mt-1 text-[11px] text-cic-muted">{result.note}</p>}
        </div>

        {cta.to || cta.href ?
        <ActionLink link={cta} className={ctaClass} /> :

        <button onClick={onCta} className={ctaClass}>
            {cta.label}
          </button>
        }
      </div>
      <BrandStripe className="h-2" />
    </section>);

}
