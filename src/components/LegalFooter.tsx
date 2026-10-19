import React from 'react';
import { BrandStripe } from './BrandStripe';
import { NavAnchor } from './NavAnchor';
import { legalLinks } from '../data/navigation';

export function LegalFooter({ extended = false }: {extended?: boolean;}) {
  return (
    <footer className="w-full">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-[100px]">
        <p className="border-t border-cic-line py-8 text-center text-[11px] leading-relaxed text-cic-muted">
          {legalLinks.map((l) =>
          <React.Fragment key={l.label}>
              <NavAnchor item={l} className="text-cic-red hover:underline" />{' '}
              |{' '}
            </React.Fragment>
          )}
          © Copyright 2026 CIC Group. All rights reserved.{' '}
          {extended ?
          'CIC Asset Management Limited is regulated by the Capital Markets Authority. Unit trust prices fluctuate and past performance is not an indication of future performance. Any illustrative values shown here are for information only and do not constitute investment advice.' :
          'CIC General Insurance and CIC Life Assurance are regulated by the Insurance Regulatory Authority.'}
        </p>
      </div>
      <BrandStripe />
    </footer>);

}
