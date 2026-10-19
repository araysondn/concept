import React from 'react';
import { PhoneIcon, MailIcon } from 'lucide-react';
import { contact } from '../data/navigation';

export function NeedHelp() {
  return (
    <section aria-labelledby="need-help-title" className="border-t border-cic-line py-12">
      <h2 id="need-help-title" className="text-[24px] font-semibold">Need help?</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:divide-x sm:divide-cic-line lg:max-w-3xl">
        <div className="flex gap-3">
          <PhoneIcon className="mt-1 h-4 w-4" aria-hidden="true" />
          <div>
            <p className="text-[15px] font-semibold">Contact us on:</p>
            <a href="#" className="mt-2 block text-[15px] hover:text-cic-red">{contact.phone}</a>
            <p className="mt-1 text-[13px]">WhatsApp {contact.whatsapp}</p>
          </div>
        </div>
        <div className="flex gap-3 sm:pl-8">
          <MailIcon className="mt-1 h-4 w-4" aria-hidden="true" />
          <div>
            <p className="text-[15px] font-semibold">Email us at:</p>
            <a href="#" className="mt-2 block text-[15px] text-cic-orange hover:underline">
              {contact.email}
            </a>
            <a href="#" className="mt-2 block text-[13px] font-semibold text-cic-orange hover:underline">
              Visit one of our 25 branches
            </a>
          </div>
        </div>
      </div>
    </section>);

}
