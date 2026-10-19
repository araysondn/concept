import React from 'react';
import type { ClaimType } from '../../data/claims';

/** Steps and required documents for one claim type, for the "need to know" tabs. */
export function ClaimSteps({ claim }: {claim: ClaimType;}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[16px] font-semibold">Here's what to do</h3>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5">
          {claim.steps.map((s) =>
          <li key={s}>{s}</li>
          )}
        </ol>
      </div>
      <div>
        <h3 className="text-[16px] font-semibold">Documents you'll need</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {claim.documents.map((d) =>
          <li key={d}>{d}</li>
          )}
        </ul>
      </div>
      {claim.extra &&
      <div>
          <h3 className="text-[15px] font-semibold">{claim.extra.title}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {claim.extra.items.map((d) =>
          <li key={d}>{d}</li>
          )}
          </ul>
        </div>
      }
    </div>);

}
