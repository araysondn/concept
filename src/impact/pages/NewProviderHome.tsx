import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, ChevronRightIcon, ClockIcon, FileTextIcon, LockIcon, PhoneIcon, SearchIcon, WalletIcon } from 'lucide-react';
import { ImpactShell, card } from '../ImpactShell';
import { pillSolid } from '../ui';
import { profileSections } from '../store';
import type { Onboarding } from '../store';
import { contact } from '../../data/navigation';

const sections = profileSections.filter((s) => s.id !== 'review');

const unlocks = [
{ icon: SearchIcon, title: 'Check member cover', body: 'Confirm a member is active and see what their cover has left.' },
{ icon: FileTextIcon, title: 'Submit and track claims', body: 'Send claims with documents and follow them to payment.' },
{ icon: WalletIcon, title: 'See your payments', body: 'Download remittances and statements for your facility.' }];


function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('') || 'IM';
}

/** Dashboard for a newly signed-up provider: finish the profile, then wait for approval. */
export function NewProviderHome({ ob }: {ob: Onboarding;}) {
  const done = sections.filter((s) => ob.done.includes(s.id)).length;
  const pct = Math.round(done / sections.length * 100);
  const submitted = ob.status === 'review';
  const nextSection = sections.find((s) => !ob.done.includes(s.id));
  const journey = ['Account created', 'Profile completed', 'CIC review', 'Approved'];
  const current = submitted ? 2 : 1;

  return (
    <ImpactShell
      title="Provider dashboard"
      active="Home"
      account={{ name: ob.facility, sub: submitted ? 'Awaiting approval' : 'Profile incomplete', initials: initials(ob.facility) }}>

      <div className="mx-auto max-w-[1180px]">
        <p className="text-[13px] text-cic-muted">{ob.facility}</p>
        <h2 className="mt-1 text-[26px] font-semibold leading-tight">Welcome to Impact, {ob.contactName.split(' ')[0]}</h2>

        <section aria-label="Your onboarding progress" className={`${card} mt-5 px-5 py-5`}>
          <ol className="grid grid-cols-4">
            {journey.map((s, i) => {
              const reached = i < current || i === current && submitted;
              const isCurrent = i === current;
              return (
                <li key={s} className="relative flex flex-col items-center text-center">
                  {i > 0 && <span className={`absolute right-1/2 top-[11px] h-[2px] w-full ${i <= current ? 'bg-cic-amber' : 'bg-[#D7D7D7]'}`} aria-hidden="true" />}
                  <span className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 ${i < current ? 'border-cic-amber bg-cic-amber text-white' : isCurrent ? 'border-cic-amber bg-white' : 'border-[#D7D7D7] bg-white'}`}>
                    {i < current && <CheckIcon className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />}
                  </span>
                  <span className={`mt-2 text-[13px] ${isCurrent ? 'font-bold' : reached ? 'font-semibold' : 'text-cic-muted'}`}>{s}</span>
                </li>);

            })}
          </ol>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          {submitted ?
          <section className={`${card} self-start`} aria-labelledby="review-title">
              <div className="flex items-center gap-3 border-b border-cic-line px-5 py-4">
                <ClockIcon className="h-6 w-6 text-cic-amber" aria-hidden="true" />
                <h3 id="review-title" className="text-[17px] font-semibold">Your profile is with CIC for review</h3>
              </div>
              <p className="px-5 py-4 text-[14px] leading-relaxed">
                Thanks, we've received your facility profile and documents. Our provider team will check your licence and bank
                details and email <strong>{ob.email}</strong> once you're approved. If anything is missing, we'll tell you what to send.
              </p>
              <dl className="mx-5 mb-5 space-y-1.5 bg-[#F8FAFB] px-4 py-3 text-[13px]">
                <div className="flex"><dt className="w-[150px] text-cic-muted">Reference</dt><dd className="font-semibold">IMP-{ob.mobile.replace(/\D/g, '').slice(-6) || '000000'}</dd></div>
                <div className="flex"><dt className="w-[150px] text-cic-muted">Sections submitted</dt><dd>{sections.length} of {sections.length}</dd></div>
              </dl>
            </section> :

          <section className={card} aria-labelledby="profile-title">
              <div className="border-b border-cic-line px-5 py-4">
                <div className="flex items-center">
                  <h3 id="profile-title" className="text-[17px] font-semibold">Complete your profile</h3>
                  <span className="ml-auto text-[13px] font-semibold">{done} of {sections.length} done</span>
                </div>
                <div className="mt-3 h-[6px] bg-[#E6E6E6]" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Profile completion">
                  <div className="h-full bg-cic-amber transition-[width] duration-500" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-3 text-[14px] text-cic-muted">You can check cover and submit claims once CIC approves your profile.</p>
              </div>
              <ul className="divide-y divide-dashed divide-cic-line">
                {sections.map((s, i) => {
                const isDone = ob.done.includes(s.id);
                return (
                  <li key={s.id}>
                      <Link to={`/impact/profile?step=${s.id}`} className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-black/[0.02]">
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${isDone ? 'bg-cic-green text-white' : 'border-2 border-cic-line text-cic-muted'}`}>
                          {isDone ? <CheckIcon className="h-4 w-4 stroke-[3]" aria-hidden="true" /> : i + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-semibold">{s.title}</span>
                          <span className="block text-[13px] text-cic-muted">{s.short}</span>
                        </span>
                        <span className={`text-[13px] font-semibold ${isDone ? 'text-cic-green' : 'text-cic-red'}`}>{isDone ? 'Done' : 'To do'}</span>
                        <ChevronRightIcon className="h-4 w-4 stroke-[3] text-cic-red transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    </li>);

              })}
              </ul>
              <div className="flex justify-center border-t border-cic-line py-5">
                <Link to={nextSection ? `/impact/profile?step=${nextSection.id}` : '/impact/profile?step=review'} className={pillSolid}>
                  {done === 0 ? 'Start profile' : nextSection ? 'Continue profile' : 'Review and submit'}
                </Link>
              </div>
            </section>
          }

          <div className="space-y-5">
            <section className={card} aria-labelledby="unlock-title">
              <h3 id="unlock-title" className="flex items-center gap-2 border-b border-cic-line px-4 py-3 text-[15px] font-semibold">
                <LockIcon className="h-4 w-4 text-cic-muted" aria-hidden="true" /> Unlocks after approval
              </h3>
              <ul className="space-y-4 px-4 py-4">
                {unlocks.map((u) =>
                <li key={u.title} className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FBECEC]">
                      <u.icon className="h-4 w-4 text-cic-red" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[14px] font-semibold">{u.title}</span>
                      <span className="block text-[13px] text-cic-muted">{u.body}</span>
                    </span>
                  </li>
                )}
              </ul>
            </section>

            <section className={`${card} px-4 py-4`} aria-labelledby="help-title">
              <h3 id="help-title" className="text-[15px] font-semibold">Need help with your profile?</h3>
              <a href="#" className="mt-2 flex items-center gap-2 text-[16px] font-semibold hover:text-cic-red">
                <PhoneIcon className="h-4 w-4" aria-hidden="true" /> {contact.phone}
              </a>
              <p className="mt-1 text-[13px] text-cic-muted">Email {contact.email}</p>
            </section>
          </div>
        </div>

        <p className="mt-6 pb-4 text-center text-[11px] text-cic-muted">Design concept: sign-up, verification and approval are simulated.</p>
      </div>
    </ImpactShell>);

}
