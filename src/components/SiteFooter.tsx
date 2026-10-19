import React from 'react';
import { MailIcon, MessageCircleIcon, PhoneIcon } from 'lucide-react';
import { BrandStripe } from './BrandStripe';
import { NavAnchor } from './NavAnchor';
import { contact, footerColumns, legalLinks } from '../data/navigation';

const socials = [
{ label: 'Facebook', href: 'https://web.facebook.com/CICGroupPLC', className: 'bg-[#1877F2] rounded-full', text: 'f' },
{ label: 'X', href: 'https://twitter.com/cicgroupplc', className: 'bg-black rounded-sm', text: 'X' },
{ label: 'LinkedIn', href: 'https://www.linkedin.com/company/cic-insurance-company/', className: 'bg-[#0A66C2] rounded-sm', text: 'in' },
{ label: 'Instagram', href: 'https://www.instagram.com/cicgroupplc/', className: 'bg-[#C13584] rounded-md', text: 'ig' },
{ label: 'YouTube', href: 'https://www.youtube.com/c/CICInsuranceGroupKe/videos', className: 'bg-[#FF0000] rounded-md', text: '▶' }];


const channels = [
{ label: 'WhatsApp', value: contact.whatsapp, Icon: MessageCircleIcon },
{ label: 'Call', value: contact.phone, Icon: PhoneIcon },
{ label: 'Email', value: contact.email, Icon: MailIcon }];


export function SiteFooter() {
  return (
    <footer className="mt-6 w-full border-t border-cic-line bg-white">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-[100px]">
        <div className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[28px] font-semibold text-cic-ink">Let us guide you through your life's journey</h2>
          <div className="flex flex-wrap gap-3">
            {channels.map(({ label, value, Icon }) =>
            <a key={label} href="#" className="flex items-center gap-1.5 rounded-md bg-black px-3 py-1 text-white" aria-label={`${label} ${value}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="leading-none">
                  <span className="block text-[8px] uppercase">{label}</span>
                  <span className="block text-[14px] font-semibold">{value}</span>
                </span>
              </a>
            )}
          </div>
        </div>

        <div className="grid gap-8 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((col, ci) =>
          <div key={ci} className="space-y-8">
              {ci === 0 &&
            <div>
                  <h3 className="text-[13px] font-semibold">Social</h3>
                  <div className="mt-3 flex gap-2.5">
                    {socials.map((s) =>
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className={`flex h-7 w-7 items-center justify-center text-[12px] font-bold text-white ${s.className}`}>

                        {s.text}
                      </a>
                )}
                  </div>
                </div>
            }
              {col.groups.map((g) =>
            <div key={g.title}>
                  <h3 className="text-[13px] font-semibold">{g.title}</h3>
                  <ul className="mt-2 space-y-1.5 text-[12px]">
                    {g.links.map((l) =>
                <li key={l.label}>
                        <NavAnchor item={l} className="hover:text-cic-red hover:underline" />
                      </li>
                )}
                  </ul>
                </div>
            )}
            </div>
          )}
        </div>

        <div className="pb-6 pt-14 text-center text-[11px] text-cic-muted">
          <p>
            Head Office: {contact.headOffice} · {contact.phone} · {contact.landline}
          </p>
          <p className="mx-auto mt-4 max-w-4xl leading-relaxed">
            {legalLinks.map((l) =>
            <React.Fragment key={l.label}>
                <NavAnchor item={l} className="text-cic-red hover:underline" />{' '}
                |{' '}
              </React.Fragment>
            )}
            © Copyright 2026 CIC Group. All rights reserved. We keep our word.
          </p>
        </div>
      </div>
      <BrandStripe />
    </footer>);

}
