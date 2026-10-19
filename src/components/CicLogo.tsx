import React from 'react';
import { Link } from 'react-router-dom';

// Absa-style lockup: stacked tagline to the left of the brand mark.
export function CicLogo({ className = 'h-11', tagline = false, to = '/' }: {className?: string;tagline?: boolean;to?: string;}) {
  return (
    <Link to={to} className="flex items-center gap-1.5" aria-label={to === '/' ? 'CIC Group home – We keep our word' : 'CIC Online home'}>
      {tagline &&
      <span className="text-right text-[9px] font-semibold leading-[1.05] text-cic-ink">
          We
          <br />
          keep our
          <br />
          word
        </span>
      }
      <img src="/cic-logo.png" alt="" className={`w-auto ${className}`} />
    </Link>);

}
