import React, { useState } from 'react';
import {
  AlertCircleIcon, ArrowDownIcon, ArrowUpIcon, CheckCircle2Icon, ChevronRightIcon, DownloadIcon, InfoIcon,
  Loader2Icon, PlusIcon, XCircleIcon } from
'lucide-react';
import { ImpactShell, card } from '../ImpactShell';
import { claimStages, nextPayment, provider, recentClaims, sampleMember, stats } from '../data';
import type { Claim } from '../data';
import { loadOnboarding } from '../store';
import { NewProviderHome } from './NewProviderHome';

const kes = (n: number) => `KES ${n.toLocaleString('en-KE')}`;

function CardTitle({ children, action }: {children: React.ReactNode;action?: React.ReactNode;}) {
  return (
    <div className="flex items-center border-b border-cic-line px-4 py-3">
      <h2 className="text-[15px] font-semibold">{children}</h2>
      {action && <div className="ml-auto">{action}</div>}
    </div>);

}

function Stages({ claim }: {claim: Claim;}) {
  return (
    <ol className="grid w-[260px] grid-cols-4" aria-label={`Progress: ${claimStages[claim.stage]}`}>
      {claimStages.map((s, i) => {
        const reached = i <= claim.stage;
        const flagged = claim.queried && i === claim.stage;
        return (
          <li key={s} className="relative flex flex-col items-center">
            {i > 0 &&
            <span className={`absolute right-1/2 top-[5px] h-[2px] w-full ${reached ? 'bg-cic-amber' : 'bg-[#D7D7D7]'}`} aria-hidden="true" />
            }
            <span className={`relative h-3 w-3 rounded-full border-2 ${flagged ? 'border-cic-red bg-cic-red' : reached ? 'border-cic-amber bg-white' : 'border-[#D7D7D7] bg-white'}`} />
            <span className={`mt-1 text-[11px] font-semibold ${flagged ? 'text-cic-red' : reached ? 'text-cic-ink' : 'text-cic-muted/60'}`}>
              {flagged ? 'Queried' : s}
            </span>
          </li>);

      })}
    </ol>);

}

function CoverCheck() {
  const [memberNo, setMemberNo] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'active' | 'missing'>('idle');
  const [error, setError] = useState('');

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberNo.trim()) {
      setError('Enter the member number from the member card.');
      return;
    }
    setError('');
    setState('loading');
    // Design concept: numbers starting with MI are found, anything else is not.
    window.setTimeout(() => setState(/^mi/i.test(memberNo.trim()) ? 'active' : 'missing'), 700);
  };

  return (
    <section id="cover" className={card} aria-labelledby="cover-title">
      <CardTitle><span id="cover-title">Check member cover</span></CardTitle>
      <form onSubmit={check} noValidate className="px-4 py-4">
        <label className="block border border-b-2 border-[#C9D6DC] border-b-cic-burgundy bg-[#F8FAFB] px-3 pb-1.5 pt-1 focus-within:border-b-cic-red">
          <span className="block text-[11px] text-cic-muted">Member number</span>
          <input
            value={memberNo}
            onChange={(e) => {setMemberNo(e.target.value);setState('idle');}}
            placeholder="e.g. MI-2210-4471"
            aria-invalid={Boolean(error)}
            className="w-full bg-transparent text-[15px] outline-none placeholder:italic placeholder:text-[#9a9a9a]" />

        </label>
        {error && <p className="mt-1.5 text-[12px] text-cic-red">{error}</p>}
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            disabled={state === 'loading'}
            className="inline-flex h-[36px] items-center gap-2 rounded-full bg-cic-red px-8 text-[13px] font-bold text-white transition-colors hover:bg-[#8A1B23] disabled:opacity-70">

            {state === 'loading' && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {state === 'loading' ? 'CHECKING…' : 'CHECK COVER'}
          </button>
        </div>
      </form>

      <div aria-live="polite">
        {state === 'active' &&
        <div className="border-t border-cic-line px-4 py-4">
            <p className="flex items-center gap-2 text-[14px] font-semibold text-cic-green">
              <CheckCircle2Icon className="h-5 w-5" aria-hidden="true" /> Cover is active
            </p>
            <p className="mt-2 text-[14px] font-semibold">{sampleMember.name}</p>
            <p className="text-[13px] text-cic-muted">{sampleMember.plan} · valid to {sampleMember.validTo}</p>
            <ul className="mt-4 space-y-3">
              {sampleMember.limits.map((l) =>
            <li key={l.label}>
                  <div className="flex text-[13px]">
                    <span>{l.label}</span>
                    <span className="ml-auto font-semibold">{kes(l.total - l.used)} left</span>
                  </div>
                  <div className="mt-1 h-[6px] bg-[#E6E6E6]">
                    <div className="h-full bg-cic-amber" style={{ width: `${(l.total - l.used) / l.total * 100}%` }} />
                  </div>
                </li>
            )}
            </ul>
          </div>
        }
        {state === 'missing' &&
        <div className="flex gap-2 border-t border-cic-line bg-[#FDF0F1] px-4 py-3 text-[13px]">
            <XCircleIcon className="h-5 w-5 shrink-0 text-cic-red" aria-hidden="true" />
            <p>We couldn't find an active member with that number. Check the card and try again, or call the provider desk.</p>
          </div>
        }
      </div>
    </section>);

}

/** Impact home: what a CIC Microinsurance provider needs to see first. */
export function ImpactDashboard() {
  // A provider who has just signed up sees onboarding instead of the working dashboard.
  const ob = loadOnboarding();
  if (ob) return <NewProviderHome ob={ob} />;

  return (
    <ImpactShell title="Provider dashboard" active="Home">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[13px] text-cic-muted">{provider.number} · {provider.town}</p>
            <h2 className="mt-1 text-[26px] font-semibold leading-tight">Good morning, {provider.name}</h2>
          </div>
          <button className="inline-flex h-[40px] items-center gap-2 self-start rounded-full bg-cic-red px-7 text-[13px] font-bold text-white transition-colors hover:bg-[#8A1B23] md:ml-auto md:self-auto">
            <PlusIcon className="h-4 w-4" aria-hidden="true" /> SUBMIT A CLAIM
          </button>
        </div>

        <section aria-label="This month" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) =>
          <div key={s.label} className={`${card} px-4 py-4`}>
              <p className="text-[13px] text-cic-muted">{s.label}</p>
              <p className="mt-1 text-[24px] font-semibold leading-tight">{s.value}</p>
              <p className={`mt-1 flex items-center gap-1 text-[12px] ${s.up ? 'text-cic-green' : 'text-cic-red'}`}>
                {s.up ? <ArrowUpIcon className="h-3.5 w-3.5" aria-hidden="true" /> : <ArrowDownIcon className="h-3.5 w-3.5" aria-hidden="true" />}
                {s.note}
              </p>
            </div>
          )}
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <section id="claims" className={card} aria-labelledby="claims-title">
            <CardTitle action={<a href="#" className="flex items-center gap-1 text-[13px] font-semibold text-cic-red hover:underline">All claims <ChevronRightIcon className="h-4 w-4" aria-hidden="true" /></a>}>
              <span id="claims-title">Recent claims</span>
            </CardTitle>
            <ul className="divide-y divide-dashed divide-cic-line">
              {recentClaims.map((c) =>
              <li key={c.id} className="flex flex-col gap-3 px-4 py-4 xl:flex-row xl:items-center">
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px]"><strong>{c.member}</strong> <span className="text-cic-muted">| {c.memberNo}</span></p>
                    <p className="mt-0.5 text-[13px] text-cic-muted">{c.id} · {c.service} · {c.date}</p>
                  </div>
                  <p className="w-[110px] text-[14px] font-semibold xl:text-right">{c.amount}</p>
                  <Stages claim={c} />
                </li>
              )}
            </ul>
            <div className="flex items-center gap-2 border-t border-cic-line bg-[#FFF8E1] px-4 py-3 text-[13px]">
              <AlertCircleIcon className="h-4 w-4 shrink-0 text-[#B8860B]" aria-hidden="true" />
              <span><strong>1 claim is queried.</strong> Reply with the missing documents to keep it moving.</span>
              <ChevronRightIcon className="ml-auto h-4 w-4 stroke-[3] text-cic-red" aria-hidden="true" />
            </div>
          </section>

          <div className="space-y-5">
            <CoverCheck />

            <section className={card} aria-labelledby="pay-title">
              <CardTitle><span id="pay-title">Next payment</span></CardTitle>
              <div className="grid grid-cols-2 border-b border-cic-line py-3 text-center">
                <div>
                  <p className="text-[12px] text-cic-muted">Amount</p>
                  <p className="text-[20px] font-semibold leading-tight">{nextPayment.amount}</p>
                </div>
                <div>
                  <p className="text-[12px] text-cic-muted">Expected</p>
                  <p className="text-[20px] font-semibold leading-tight">{nextPayment.date}</p>
                </div>
              </div>
              <dl className="space-y-1.5 px-4 py-3 text-[13px]">
                <div className="flex"><dt className="w-[120px] text-cic-muted">Claims</dt><dd>{nextPayment.claims} approved</dd></div>
                <div className="flex"><dt className="w-[120px] text-cic-muted">Paid to</dt><dd>{provider.payoutAccount}</dd></div>
              </dl>
              <button className="flex w-full items-center justify-center gap-2 border-t border-cic-line py-2.5 text-[13px] font-semibold text-cic-red transition-colors hover:bg-black/[0.02]">
                <DownloadIcon className="h-4 w-4" aria-hidden="true" /> Download last remittance
              </button>
            </section>
          </div>
        </div>

        <a href="#" className={`${card} group mt-5 flex items-center border-t-2 border-cic-burgundy px-4 py-4`}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cic-burgundy">
            <InfoIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          <span className="ml-4">
            <span className="block text-[16px] leading-tight text-cic-burgundy">2026 provider guide and tariffs</span>
            <span className="block text-[13px] text-cic-muted">What to send with each claim type, and how vetting works</span>
          </span>
          <ChevronRightIcon className="ml-auto h-6 w-6 stroke-[1.5] text-cic-burgundy transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>

        <p className="mt-6 pb-4 text-center text-[11px] text-cic-muted">Design concept: provider, member and claim details are sample data.</p>
      </div>
    </ImpactShell>);

}
