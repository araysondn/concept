import React, { useState } from 'react';
import { CalculatorCard, MoneyField, ResultRows, SegmentedChoice } from '../product/calc';
import { formatKes } from '../../utils/currency';

// Illustrative assumptions only – not CIC rates. Actual premiums depend on underwriting.
const BUILDING_RATE = 0.25;
const CONTENTS_RATE = 0.6;
const MIN_PREMIUM = 5000;

type Cover = 'both' | 'contents';

const coverOptions = [
{ value: 'both', label: 'Building & contents' },
{ value: 'contents', label: 'Contents only' }] as
const;

export function HomeEstimator() {
  const [cover, setCover] = useState<Cover>('both');
  const [building, setBuilding] = useState('');
  const [contents, setContents] = useState('');

  const buildingNum = cover === 'both' ? Number(building) || 0 : 0;
  const contentsNum = Number(contents) || 0;
  const base = buildingNum * BUILDING_RATE / 100 + contentsNum * CONTENTS_RATE / 100;
  const annual = buildingNum + contentsNum > 0 ? Math.max(base, MIN_PREMIUM) : 0;

  return (
    <CalculatorCard
      title="Home Premium Estimator"
      result={{
        label: 'Estimated annual premium',
        value: formatKes(annual),
        note: 'Illustration only, using assumed rates — not a CIC quote.'
      }}
      cta={{ label: 'Get a home quote', to: '/contact-us' }}>

      <SegmentedChoice legend="What would you like to cover?" options={coverOptions} value={cover} onChange={setCover} />

      {cover === 'both' &&
      <MoneyField id="building-value" label="Value of building" value={building} onChange={setBuilding} />
      }
      <MoneyField id="contents-value" label="Value of contents" value={contents} onChange={setContents} />

      <ResultRows
        rows={[
        ...(cover === 'both' ? [{ label: 'Assumed building rate', value: `${BUILDING_RATE} %` }] : []),
        { label: 'Assumed contents rate', value: `${CONTENTS_RATE} %` },
        { label: 'Monthly equivalent', value: formatKes(annual / 12), info: false }]
        } />

    </CalculatorCard>);

}
