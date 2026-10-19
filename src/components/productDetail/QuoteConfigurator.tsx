import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoIcon } from 'lucide-react';
import { MoneyField, RangeField, SegmentedChoice } from '../product/calc';
import { formatKes, formatShortKes } from '../../utils/currency';
import {
  ASSUMED_INVEST_RATE, ASSUMED_PENSION_RATE, annualPremium, defaultInputs, monthlyFromAnnual, projectValue, saveQuote } from
'../../data/quoteProducts';
import type { Frequency, QuoteInputs, RichProduct } from '../../data/quoteProducts';

const asText = (v: string | number | undefined) => v === undefined || v === 0 ? '' : String(v);

/** "Personalise your quote": product-specific inputs on the left, live illustrative price on the right. */
export function QuoteConfigurator({ product, name }: {product: RichProduct;name: string;}) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<QuoteInputs>(defaultInputs[product.kind]);
  const [frequency, setFrequency] = useState<Frequency>('monthly');
  const set = (k: string) => (v: string | number) => setInputs((s) => ({ ...s, [k]: v }));

  const annual = useMemo(() => annualPremium(product.kind, inputs), [product.kind, inputs]);
  const monthly = monthlyFromAnnual(annual);
  const isInvest = product.kind === 'invest';
  const isPension = product.kind === 'pension';

  const projection = isInvest ?
  projectValue(Number(inputs.initial) || 0, Number(inputs.topup) || 0, Number(inputs.years) || 1, ASSUMED_INVEST_RATE) :
  isPension ?
  projectValue(0, Number(inputs.contribution) || 0, Math.max(60 - (Number(inputs.age) || 30), 1), ASSUMED_PENSION_RATE) :
  0;

  const investTooLow = isInvest && (Number(inputs.initial) || 0) < 5000;

  const apply = () => {
    if (isInvest) {
      navigate('/register');
      return;
    }
    saveQuote({ id: product.id, inputs, addOns: [], frequency });
    navigate(`/checkout/${product.id}`);
  };

  return (
    <section id="quote" aria-labelledby="quote-title" className="scroll-mt-20 bg-[#FBECEC] py-14">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-[100px]">
        <h2 id="quote-title" className="text-[32px] font-semibold">
          {isInvest ? 'See how your money could grow' : 'Personalise your quote'}
        </h2>
        <p className="mt-2 max-w-2xl text-[15px]">
          {isInvest ?
          'Tell us how much you’d like to start with and top up, and we’ll show you an illustration.' :
          `Tell us a little about what you need and we’ll show you an illustrative price for ${name}.`}
        </p>

        <div className="mt-8 grid bg-white shadow-card lg:grid-cols-[1.3fr_1fr]">
          <div className="border-b border-cic-line p-6 lg:border-b-0 lg:border-r lg:p-8">
            <Inputs kind={product.kind} inputs={inputs} set={set} />
          </div>

          <div className="flex flex-col p-6 lg:p-8">
            {!isInvest &&
            <SegmentedChoice
              legend="How would you like to pay?"
              options={[{ value: 'monthly', label: 'Monthly' }, { value: 'annual', label: 'Annually' }] as const}
              value={frequency}
              onChange={setFrequency} />

            }

            <div className="mt-5 bg-cic-mist px-5 py-5" aria-live="polite">
              <p className="flex items-center gap-1.5 text-[13px]">
                {isInvest ? `Projected value after ${inputs.years} years` : isPension ? 'Your monthly contribution' : frequency === 'monthly' ? 'Illustrative premium per month' : 'Illustrative premium per year'}
                <InfoIcon className="h-4 w-4 text-[#0a6ed1]" aria-hidden="true" />
              </p>
              <p className="mt-2 text-[32px] font-semibold leading-tight">
                {isInvest ? formatShortKes(projection) : formatShortKes(frequency === 'monthly' ? monthly : annual)}
              </p>
              {isPension &&
              <p className="mt-2 text-[13px]">
                  Projected pot at 60: <span className="font-semibold">{formatShortKes(projection)}</span>
                </p>
              }
              <p className="mt-3 text-[11px] leading-snug text-cic-muted">
                {isInvest ?
                `Illustration only, using an assumed ${ASSUMED_INVEST_RATE * 100}% a year — not a CIC forecast. Unit trust returns are not guaranteed.` :
                isPension ?
                `Illustration only, assuming ${ASSUMED_PENSION_RATE * 100}% a year growth. Jipange Plus offers a minimum return of 5%.` :
                'Illustrative premium — not a CIC quote. Your actual premium is confirmed when you apply.'}
              </p>
            </div>

            {!isInvest && !isPension &&
            <dl className="mt-4 space-y-1 text-[13px]">
                <div className="flex justify-between">
                  <dt>Per month</dt>
                  <dd>{formatKes(monthly)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Per year</dt>
                  <dd>{formatKes(annual)}</dd>
                </div>
              </dl>
            }

            {investTooLow && <p className="mt-3 text-[12px] text-cic-red" role="alert">The minimum to start is KES 5,000.</p>}

            <button
              onClick={apply}
              disabled={investTooLow}
              className="mt-6 w-full bg-cic-orange py-3 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23] disabled:cursor-not-allowed disabled:opacity-50">

              {isInvest ? 'Start investing' : 'Apply now'}
            </button>
            <p className="mt-3 text-center text-[12px] text-cic-muted">
              {isInvest ? 'Open your account in a few minutes.' : 'Takes about 5 minutes. No payment is taken in this design concept.'}
            </p>
          </div>
        </div>
      </div>
    </section>);

}

function Inputs({ kind, inputs, set }: {kind: RichProduct['kind'];inputs: QuoteInputs;set: (k: string) => (v: string | number) => void;}) {
  const money = (k: string) => (v: string) => set(k)(Number(v) || 0);
  switch (kind) {
    case 'motor':
      return (
        <>
          <SegmentedChoice
            legend="Type of cover"
            options={[{ value: 'comprehensive', label: 'Comprehensive' }, { value: 'thirdParty', label: 'Third party only' }] as const}
            value={inputs.cover as 'comprehensive' | 'thirdParty'}
            onChange={set('cover')} />
          <SegmentedChoice
            legend="How is the vehicle used?"
            options={[{ value: 'private', label: 'Private' }, { value: 'commercial', label: 'Commercial' }] as const}
            value={inputs.use as 'private' | 'commercial'}
            onChange={set('use')} />
          {inputs.cover === 'comprehensive' ?
          <MoneyField id="q-value" label="Value of your vehicle" value={asText(inputs.value)} onChange={money('value')} /> :

          <p className="mt-3 text-[12px] text-cic-muted">Third party cover isn’t based on your car’s value.</p>
          }
          <RangeField
            id="q-instalments"
            label={`Pay in instalments (${inputs.instalments})`}
            value={Number(inputs.instalments)}
            min={1}
            max={12}
            onChange={set('instalments')}
            minLabel="1"
            maxLabel="12 months" />
        </>);

    case 'medical':
      return (
        <>
          <SegmentedChoice
            legend="Who needs cover?"
            options={[{ value: 'me', label: 'Just me' }, { value: 'couple', label: 'Me and my partner' }] as const}
            value={inputs.who as 'me' | 'couple'}
            onChange={set('who')} />
          <SegmentedChoice
            legend="Age of the oldest person"
            options={[{ value: '60-69', label: '60–69' }, { value: '70-79', label: '70–79' }, { value: '80+', label: '80+' }] as const}
            value={inputs.age as '60-69' | '70-79' | '80+'}
            onChange={set('age')} />
          <SegmentedChoice
            legend="Inpatient limit"
            options={[{ value: '500000', label: 'KES 500k' }, { value: '1000000', label: 'KES 1M' }, { value: '2000000', label: 'KES 2M' }] as const}
            value={String(inputs.limit) as '500000' | '1000000' | '2000000'}
            onChange={set('limit')} />
        </>);

    case 'education':
      return (
        <>
          <RangeField
            id="q-child"
            label={`Your child’s age (${inputs.childAge})`}
            value={Number(inputs.childAge)}
            min={0}
            max={15}
            onChange={set('childAge')}
            maxLabel="15 years" />
          <MoneyField id="q-target" label="How much do you want to save for fees?" value={asText(inputs.target)} onChange={money('target')} />
          <p className="mt-3 text-[12px] text-cic-muted">We’ll spread your saving until your child turns 18 (at least 3 years).</p>
        </>);

    case 'pension':
      return (
        <>
          <RangeField id="q-age" label={`Your age (${inputs.age})`} value={Number(inputs.age)} min={18} max={59} onChange={set('age')} />
          <MoneyField id="q-contribution" label="Monthly contribution" value={asText(inputs.contribution)} onChange={money('contribution')} />
        </>);

    case 'home':
      return (
        <>
          <SegmentedChoice
            legend="What would you like to insure?"
            options={[{ value: 'both', label: 'Building & contents' }, { value: 'contents', label: 'Contents only' }] as const}
            value={inputs.cover as 'both' | 'contents'}
            onChange={set('cover')} />
          {inputs.cover !== 'contents' &&
          <MoneyField id="q-building" label="Rebuilding cost of your home" value={asText(inputs.building)} onChange={money('building')} />
          }
          <MoneyField id="q-contents" label="Value of your contents" value={asText(inputs.contents)} onChange={money('contents')} />
        </>);

    case 'accident':
      return (
        <>
          <SegmentedChoice
            legend="What kind of work do you do?"
            options={[{ value: 'office', label: 'Office' }, { value: 'light', label: 'Light manual' }, { value: 'heavy', label: 'Heavy manual' }] as const}
            value={inputs.occupation as 'office' | 'light' | 'heavy'}
            onChange={set('occupation')} />
          <SegmentedChoice
            legend="Benefit level"
            options={[{ value: '1000000', label: 'KES 1M' }, { value: '2000000', label: 'KES 2M' }, { value: '5000000', label: 'KES 5M' }] as const}
            value={String(inputs.benefit) as '1000000' | '2000000' | '5000000'}
            onChange={set('benefit')} />
        </>);

    case 'invest':
      return (
        <>
          <MoneyField id="q-initial" label="Starting amount (min KES 5,000)" value={asText(inputs.initial)} onChange={money('initial')} />
          <MoneyField id="q-topup" label="Monthly top-up (from KES 1,000)" value={asText(inputs.topup)} onChange={money('topup')} />
          <RangeField id="q-years" label={`Years invested (${inputs.years})`} value={Number(inputs.years)} min={1} max={20} onChange={set('years')} />
        </>);

  }
}
