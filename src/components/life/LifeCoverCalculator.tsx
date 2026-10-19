import React, { useMemo, useState } from 'react';
import { CalculatorCard, MoneyField, RangeField, ResultRows } from '../product/calc';
import { formatKes } from '../../utils/currency';

/** Needs-based guide: replace income for a period, clear debts, fund education, less what is already in place. */
export function LifeCoverCalculator() {
  const [income, setIncome] = useState('');
  const [years, setYears] = useState(10);
  const [debts, setDebts] = useState('');
  const [education, setEducation] = useState('');
  const [existing, setExisting] = useState('');

  const n = (v: string) => Number(v) || 0;

  const { replacement, obligations, cover } = useMemo(() => {
    const rep = n(income) * years;
    const obl = n(debts) + n(education);
    return { replacement: rep, obligations: obl, cover: Math.max(rep + obl - n(existing), 0) };
  }, [income, years, debts, education, existing]);

  return (
    <CalculatorCard
      title="Life Cover Calculator"
      cta={{ label: 'Talk to an advisor', to: '/contact-us' }}
      result={{
        label: 'Suggested life cover',
        value: formatKes(cover),
        note: 'A guide only — speak to a CIC financial advisor for advice.'
      }}>

      <MoneyField id="annual-income" label="Your annual income" value={income} onChange={setIncome} />
      <RangeField
        id="support-years"
        label={`Years your family needs support (${years})`}
        value={years}
        min={1}
        max={25}
        onChange={setYears} />

      <MoneyField id="debts" label="Loans and mortgage" value={debts} onChange={setDebts} />
      <MoneyField id="education" label="Children's education fund" value={education} onChange={setEducation} />
      <MoneyField id="existing" label="Existing cover and savings" value={existing} onChange={setExisting} />

      <ResultRows
        rows={[
        { label: 'Income to replace', value: formatKes(replacement), info: false },
        { label: 'Debts and education', value: formatKes(obligations), info: false },
        { label: 'Less existing cover', value: `− ${formatKes(n(existing))}`, info: false }]
        } />

    </CalculatorCard>);

}
