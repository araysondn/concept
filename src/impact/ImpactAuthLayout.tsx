import React from 'react';
import { PhoneIcon } from 'lucide-react';
import { CicLogo } from '../components/CicLogo';
import { LegalFooter } from '../components/LegalFooter';
import { contact } from '../data/navigation';

const AUTH_ART = '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg';

/** Absa logon layout shared by Impact login, sign-up and verification: photo, card on the right, help, legal. */
export function ImpactAuthLayout({ children }: {children: React.ReactNode;}) {
  return (
    <div className="min-h-screen w-full bg-white text-cic-ink">
      <section className="relative flex min-h-[560px] items-center justify-center px-5 pb-12 pt-24 lg:justify-end lg:pr-[18%] lg:pt-12">
        <img src={AUTH_ART} alt="" className="absolute inset-0 h-full w-full object-cover object-left" />
        <div className="absolute left-5 top-5 flex items-center gap-3 bg-white p-2 pr-4">
          <CicLogo className="h-10" to="/impact" />
          <span className="h-8 w-px bg-cic-line" aria-hidden="true" />
          <span className="leading-tight">
            <span className="block text-[15px] font-bold text-cic-burgundy">Impact</span>
            <span className="block text-[11px] text-cic-muted">Service provider portal</span>
          </span>
        </div>
        {children}
      </section>

      <section aria-labelledby="auth-help" className="mx-auto max-w-[1440px] px-5 py-12 lg:px-[100px]">
        <h2 id="auth-help" className="text-[20px] font-semibold">Need help?</h2>
        <a href="#" className="mt-2 flex items-center gap-2 text-[18px] font-semibold hover:text-cic-red">
          <PhoneIcon className="h-4 w-4" aria-hidden="true" /> {contact.phone}
        </a>
        <p className="mt-1 text-[12px]">
          Email us at <a href="#" className="text-cic-orange hover:underline">{contact.email}</a> or WhatsApp {contact.whatsapp}
        </p>
      </section>
      <LegalFooter />
    </div>);

}

// Logon-card controls: small bold label, square field, italic placeholder, red error.
export const authLabel = 'mt-4 block text-[12px] font-semibold';
export const authInput = (err?: string) =>
`mt-1 w-full border bg-white px-3 py-2 text-[14px] outline-none placeholder:italic placeholder:text-[#9a9a9a] focus:border-cic-burgundy ${err ? 'border-cic-red' : 'border-cic-line'}`;
export const authButton = 'mt-5 flex w-full items-center justify-center gap-2 bg-cic-orange py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23] disabled:opacity-80';
