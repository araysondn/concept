import React, { useState } from 'react';
import { CalculatorCard, RangeField, ResultRows, SegmentedChoice } from '../product/calc';
import { medicalPlans } from '../../data/medical';

type Who = 'me' | 'family' | 'business' | 'coop';
type Age = 'under60' | 'over60';

const whoOptions = [
{ value: 'me', label: 'Me' },
{ value: 'family', label: 'Family' },
{ value: 'business', label: 'Business' },
{ value: 'coop', label: 'Co-op' }] as
const;

const ageOptions = [
{ value: 'under60', label: 'Under 60' },
{ value: 'over60', label: '60 and over' }] as
const;

const peopleRange: Record<Who, {min: number;max: number;}> = {
  me: { min: 1, max: 1 },
  family: { min: 2, max: 10 },
  business: { min: 1, max: 100 },
  coop: { min: 1, max: 100 }
};

/** Suggests a CIC medical plan from who needs cover; no prices are shown. */
export function MedicalCoverFinder() {
  const [who, setWho] = useState<Who>('family');
  const [people, setPeople] = useState(4);
  const [age, setAge] = useState<Age>('under60');

  const range = peopleRange[who];
  const count = Math.min(Math.max(people, range.min), range.max);
  const personal = who === 'me' || who === 'family';

  const plan =
  personal ? age === 'over60' ? medicalPlans.seniors : medicalPlans.family :
  who === 'business' ? medicalPlans.sme :
  medicalPlans.coopcare;

  const alternative =
  who === 'business' ?
  { label: 'Larger employer?', value: medicalPlans.corporate.name } :
  who === 'coop' ?
  { label: 'Also consider', value: medicalPlans.afyaBora.name } :
  null;

  const peopleLabel = who === 'business' ? 'employees' : who === 'coop' ? 'members' : 'people';

  return (
    <CalculatorCard
      title="Medical Cover Finder"
      result={{
        label: 'We recommend',
        value: plan.name,
        note: "We'll confirm cover and premiums when you get a quote."
      }}
      cta={{ label: 'Get a medical quote', to: '/contact-us' }}>

      <SegmentedChoice legend="Who needs cover?" options={whoOptions} value={who} onChange={setWho} />

      {range.max > range.min &&
      <RangeField
        id="medical-people"
        label={`Number of ${peopleLabel} (${count})`}
        value={count}
        min={range.min}
        max={range.max}
        onChange={setPeople}
        info={false} />

      }

      {personal &&
      <SegmentedChoice legend="Age of the oldest person covered" options={ageOptions} value={age} onChange={setAge} />
      }

      <ResultRows
        rows={[
        { label: 'Covering', value: `${count} ${count === 1 && peopleLabel === 'people' ? 'person' : peopleLabel}`, info: false },
        ...(alternative ? [{ ...alternative, info: false }] : [])]
        } />

    </CalculatorCard>);

}
