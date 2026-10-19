import React, { useMemo, useState } from 'react';
import { CalculatorCard, MoneyField, RangeField, ResultRows } from './product/calc';
import { formatKes } from '../utils/currency';

// Illustrative assumptions only – not CIC rates. Actual premiums depend on underwriting.
const RATE = 4;
const MIN_PREMIUM = 30000;

export function PremiumEstimator() {
  const [value, setValue] = useState('');
  const [accessories, setAccessories] = useState('');
  const [instalments, setInstalments] = useState(12);

  const valueNum = Number(value) || 0;
  const accessoriesNum = Number(accessories) || 0;
  const accessoriesError = accessoriesNum > 0 && accessoriesNum >= valueNum;

  const payment = useMemo(() => {
    if (accessoriesError || valueNum <= 0) return 0;
    const annual = Math.max((valueNum + accessoriesNum) * RATE / 100, MIN_PREMIUM);
    return annual / instalments;
  }, [valueNum, accessoriesNum, instalments, accessoriesError]);

  return (
    <CalculatorCard
      title="Motor Premium Estimator"
      result={{
        label: instalments === 1 ? 'Estimated annual premium' : 'Estimated monthly instalment',
        value: formatKes(payment),
        note: 'Illustration only, not a CIC quote.'
      }}>

      <MoneyField id="vehicle-value" label="Value of vehicle" value={value} onChange={setValue} />
      <MoneyField
        id="accessories"
        label="Accessories value (optional)"
        value={accessories}
        onChange={setAccessories}
        error={accessoriesError ? 'Accessories must be worth less than the vehicle.' : undefined} />

      <RangeField
        id="instalments"
        label={`Easy Bima instalments (${instalments} ${instalments === 1 ? 'payment' : 'months'})`}
        value={instalments}
        min={1}
        max={12}
        onChange={setInstalments} />

      <ResultRows
        rows={[
        { label: 'Assumed rate (illustrative)', value: `${RATE} %` },
        { label: 'Assumed minimum premium', value: formatKes(MIN_PREMIUM) }]
        } />

    </CalculatorCard>);

}
