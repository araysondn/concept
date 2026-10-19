import React, { useState } from 'react';
import { DownloadIcon } from 'lucide-react';
import { CalculatorCard, ResultRows } from '../product/calc';
import { claimTypes } from '../../data/claims';

/** Hero card: pick a claim type, see what's involved and what to do first. */
export function ClaimStarter() {
  const [id, setId] = useState(claimTypes[0].id);
  const claim = claimTypes.find((c) => c.id === id) ?? claimTypes[0];
  const forms = claim.forms.filter((f) => f.category === 'Claim form');

  return (
    <CalculatorCard
      title="Start a claim"
      cta={{ label: 'Submit your claim online', href: '#claim-online' }}
      result={{
        label: 'What to do first',
        value: <span className="block text-[15px] font-semibold leading-snug">{claim.steps[0]}</span>
      }}>

      <fieldset className="mt-3">
        <legend className="text-[13px] text-cic-ink">What happened?</legend>
        <div className="mt-1 grid grid-cols-2 gap-2">
          {claimTypes.map((c) => {
            const selected = c.id === id;
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setId(c.id)}
                className={`flex items-center gap-2 border px-2.5 py-2 text-left text-[12.5px] font-semibold leading-tight transition-colors duration-150 ${
                selected ? 'border-cic-red bg-cic-red text-white' : 'border-cic-line text-cic-ink hover:border-cic-red'} ${
                c.id === 'wiba' ? 'col-span-2' : ''}`
                }>

                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {c.label}
              </button>);

          })}
        </div>
      </fieldset>

      <div className="mt-3">
        <ResultRows
          rows={[
          { label: 'Report it', value: claim.reportBy },
          { label: 'Steps', value: claim.steps.length },
          { label: "Documents you'll need", value: claim.documents.length }]
          } />

      </div>

      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
        {forms.length > 0 ?
        forms.map((f) =>
        <a
          key={f.title}
          href={f.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 font-semibold text-cic-orange hover:underline">

              <DownloadIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {f.title}
            </a>
        ) :

        <span className="text-cic-muted">Get the WIBA forms from your labour office.</span>
        }
      </p>
    </CalculatorCard>);

}
