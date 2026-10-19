import React from 'react';

const segments = ['#86191F', '#AC232D', '#C42F39', '#FEBE10', '#C42F39', '#AC232D', '#86191F'];
const weights = [1, 3, 1, 1, 1, 3, 1];

export function BrandStripe({ className = 'h-1.5' }: {className?: string;}) {
  return (
    <div className={`flex w-full ${className}`} aria-hidden="true">
      {segments.map((c, i) =>
      <span key={i} style={{ backgroundColor: c, flexGrow: weights[i] }} />
      )}
    </div>);

}
