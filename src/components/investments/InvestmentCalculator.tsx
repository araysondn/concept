import React, { useMemo, useState } from 'react';
import { CalculatorCard, MoneyField, RangeField, ResultRows, SegmentedChoice } from '../product/calc';
import { investmentProducts } from '../../data/investments';

// Illustrative assumptions only – not CIC forecasts. Unit trust returns are not guaranteed.
const FUNDS = [
{ value: 'mmf', label: 'Money market', rate: 10 },
{ value: 'balanced', label: 'Balanced', rate: 11 },
{ value: 'equity', label: 'Equity', rate: 12 },
{ value: 'dollar', label: 'Dollar', rate: 5 }] as
const;

type FundId = typeof FUNDS[number]['value'];

function formatMoney(value: number, currency: string) {
  const safe = Number.isFinite(value) && value > 0 ? value : 0;
  return `${currency} ${safe.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Future value with monthly compounding: lump sum plus monthly top-ups made at the end of each month. */
function project(initial: number, monthly: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  const growth = Math.pow(1 + r, n);
  return initial * growth + (r === 0 ? monthly * n : monthly * (growth - 1) / r);
}

export function InvestmentCalculator() {
  const [fundId, setFundId] = useState<FundId>('mmf');
  const [initial, setInitial] = useState('');
  const [monthly, setMonthly] = useState('');
  const [years, setYears] = useState(5);

  const fund = FUNDS.find((f) => f.value === fundId)!;
  const product = investmentProducts.find((p) => p.id === fundId);
  const currency = product?.currency ?? 'KES';
  const minimum = product?.minInvestment ?? null;

  const initialNum = Number(initial) || 0;
  const monthlyNum = Number(monthly) || 0;
  const belowMinimum = minimum !== null && initial !== '' && initialNum < minimum;

  const { total, contributed } = useMemo(() => {
    if (belowMinimum || initialNum <= 0 && monthlyNum <= 0) return { total: 0, contributed: 0 };
    return {
      total: project(initialNum, monthlyNum, fund.rate, years),
      contributed: initialNum + monthlyNum * years * 12
    };
  }, [belowMinimum, initialNum, monthlyNum, fund.rate, years]);

  return (
    <CalculatorCard
      title="Investment Growth Calculator"
      cta={{ label: 'Start investing', to: '/register' }}
      result={{
        label: `Projected value after ${years} ${years === 1 ? 'year' : 'years'}`,
        value: formatMoney(total, currency),
        note: 'Illustration only. Unit trust returns are not guaranteed; past performance is not a guide to future returns.'
      }}>

      <SegmentedChoice legend="Choose a fund" options={FUNDS} value={fundId} onChange={setFundId} />
      <MoneyField
        id="initial-amount"
        label="Amount to start with"
        prefix={currency}
        value={initial}
        onChange={setInitial}
        error={belowMinimum ? `The minimum to start is ${formatMoney(minimum!, currency).replace('.00', '')}.` : undefined} />

      <MoneyField id="monthly-topup" label="Monthly top-up (optional)" prefix={currency} value={monthly} onChange={setMonthly} />
      <RangeField
        id="years"
        label={`Invest for ${years} ${years === 1 ? 'year' : 'years'}`}
        value={years}
        min={1}
        max={20}
        onChange={setYears}
        minLabel="1 yr"
        maxLabel="20 yrs" />

      <ResultRows
        rows={[
        { label: 'Total you put in', value: formatMoney(contributed, currency), info: false },
        { label: 'Estimated growth', value: formatMoney(Math.max(total - contributed, 0), currency), info: false },
        { label: 'Assumed rate, not a CIC forecast', value: `${fund.rate}% p.a.` }]
        } />

    </CalculatorCard>);

}
