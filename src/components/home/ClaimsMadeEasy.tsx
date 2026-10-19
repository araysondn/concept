import React from 'react';
import { Link } from 'react-router-dom';
import { HeadphonesIcon, PhoneIcon, SendIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const BG = '/b94fbfcf-01cb-464f-83ac-76f9511ef27c.jpg';

const steps: {title: string;body: string;Icon: LucideIcon;}[] = [
{ title: 'Report it', body: 'Call us on 0703 099 120 or WhatsApp +254 703 099 000 as soon as you can.', Icon: PhoneIcon },
{ title: 'Submit your claim', body: 'Claim online, or download a claim form and send it with your documents.', Icon: SendIcon },
{ title: "We'll guide you", body: 'A claims officer supports you every step of the way.', Icon: HeadphonesIcon }];


/** Full-width photo with a white steps card: how to claim in three steps. */
export function ClaimsMadeEasy() {
  return (
    <section aria-labelledby="claims-easy-title" className="relative w-full overflow-hidden">
      <img src={BG} alt="" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
      <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-14 lg:px-[100px] lg:py-20">
        <div className="max-w-[400px] bg-white p-8 shadow-card">
          <h2 id="claims-easy-title" className="text-[28px] font-semibold leading-tight">Claims made easy</h2>
          <p className="mt-2 text-[14px] text-cic-muted">We keep our word when it matters most.</p>

          <ol className="mt-6">
            {steps.map(({ title, body, Icon }, i) =>
            <li key={title} className="relative flex gap-4 pb-6 last:pb-0">
                {i < steps.length - 1 &&
              <span className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px bg-cic-line" aria-hidden="true" />
              }
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FBECEC] text-cic-red" aria-hidden="true">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[15px] font-semibold">
                    <span className="text-cic-red">Step {i + 1}</span> · {title}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed">{body}</p>
                </div>
              </li>
            )}
          </ol>

          <Link
            to="/claims"
            className="mt-7 block bg-cic-orange py-2.5 text-center text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]">

            Read our claims guide
          </Link>
          <Link to="/claims#claim-online" className="mt-3 block text-center text-[13px] font-semibold text-cic-red hover:underline">
            Submit a claim online
          </Link>
        </div>
      </div>
    </section>);

}
