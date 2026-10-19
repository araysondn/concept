import React, { useMemo, useState } from 'react';
import { CalculatorCard, MoneyField, RangeField, ResultRows, SegmentedChoice } from '../product/calc';
import { formatKes } from '../../utils/currency';

// Illustrative assumptions only – not CIC rates or guarantees.
const GROWTH_OPTIONS = [
{ value: '6', label: '6%' },
{ value: '8', label: '8%' },
{ value: '10', label: '10%' }] as
const;
type Growth = typeof GROWTH_OPTIONS[number]['value'];

const DRAWDOWN_YEARS = 20;
const DRAWDOWN_RATE = 6;

/** Future value of a lump sum plus monthly contributions, compounded monthly. */
function projectPot(savings: number, monthly: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 12;
  if (months <= 0) return savings;
  const growth = Math.pow(1 + r, months);
  return savings * growth + (r === 0 ? monthly * months : monthly * (growth - 1) / r);
}

/** Level monthly income that runs a pot down to zero over the drawdown period. */
function monthlyIncome(pot: number) {
  const r = DRAWDOWN_RATE / 100 / 12;
  const n = DRAWDOWN_YEARS * 12;
  return pot * r / (1 - Math.pow(1 + r, -n));
}

export function PensionCalculator() {
  const [age, setAge] = useState(30);
  const [retireAt, setRetireAt] = useState(60);
  const [monthly, setMonthly] = useState('5000');
  const [savings, setSavings] = useState('');
  const [growth, setGrowth] = useState<Growth>('8');

  const changeAge = (a: number) => {
    setAge(a);
    if (retireAt <= a) setRetireAt(Math.min(a + 1, 70));
  };

  const years = Math.max(retireAt - age, 0);
  const monthlyNum = Number(monthly) || 0;
  const savingsNum = Number(savings) || 0;

  const { pot, contributed, income } = useMemo(() => {
    const p = projectPot(savingsNum, monthlyNum, Number(growth), years * 12);
    return { pot: p, contributed: savingsNum + monthlyNum * years * 12, income: monthlyIncome(p) };
  }, [savingsNum, monthlyNum, growth, years]);

  return (
    <CalculatorCard
      title="Pension Calculator"
      cta={{ label: 'Talk to a specialist', href: '#talk' }}
      result={{
        label: `Projected pot at age ${retireAt}`,
        value: formatKes(pot),
        note: 'Illustration only, using assumed returns — not a CIC quote or guarantee. Jipange Plus states a minimum return of 5%.'
      }}>

      <RangeField id="current-age" label={`Your age (${age})`} value={age} min={18} max={65} onChange={changeAge} />
      <RangeField
        id="retire-age"
        label={`Retire at (${retireAt})`}
        value={retireAt}
        min={Math.min(age + 1, 70)}
        max={70}
        onChange={setRetireAt} />

      <MoneyField id="monthly-contribution" label="Monthly contribution" value={monthly} onChange={setMonthly} />
      <MoneyField id="current-savings" label="Current pension savings (optional)" value={savings} onChange={setSavings} />
      <SegmentedChoice legend="Assumed annual growth" options={GROWTH_OPTIONS} value={growth} onChange={setGrowth} />

      <ResultRows
        rows={[
        { label: 'Years to retirement', value: years, info: false },
        { label: 'Total you put in', value: formatKes(contributed), info: false },
        { label: `Income over ${DRAWDOWN_YEARS} yrs`, value: `${formatKes(income)}/mo` }]
        } />

    </CalculatorCard>);

}
