import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2Icon, Loader2Icon } from 'lucide-react';
import { RegisterStepper } from '../components/register/RegisterStepper';
import { AccountSetupStep } from '../components/register/AccountSetupStep';
import { FormField } from '../components/register/FormField';
import { LegalFooter } from '../components/LegalFooter';
import { CicLogo } from '../components/CicLogo';
import { useRegistration, Details } from '../hooks/useRegistration';
import { accountOptions, detailFields, employmentOptions, incomeOptions, fundSourceOptions } from '../data/register';

export function Register() {
  const r = useRegistration();

  return (
    <div className="min-h-screen w-full bg-white text-cic-ink">
      <header className="flex h-[60px] items-center gap-8 border-b border-cic-line px-5 lg:px-10">
        <CicLogo className="h-10" tagline={false} />
        <p className="text-[14px] font-semibold">Open a CIC account</p>
      </header>
      <div className="bg-cic-burgundy px-5 py-10 text-white lg:px-[100px]">
        <h1 className="mx-auto max-w-[1100px] text-[40px] font-semibold">Start your investment journey</h1>
      </div>

      <main className="mx-auto grid max-w-[1100px] gap-10 px-5 py-12 md:grid-cols-[180px_1fr]">
        {r.done ?
        <section className="md:col-span-2" aria-live="polite">
            <div className="mx-auto max-w-lg bg-white p-10 text-center shadow-card">
              <CheckCircle2Icon className="mx-auto h-12 w-12 text-cic-green" aria-hidden="true" />
              <h2 className="mt-4 text-[24px] font-semibold">You're all set, {r.details.firstName}!</h2>
              <p className="mt-3 text-[14px] text-cic-muted">
                Your application has been received. We'll email {r.username} once your account is active, then you can fund it via M-PESA or bank transfer.
              </p>
              <Link to="/portfolio" className="mt-6 inline-block bg-cic-orange px-6 py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]">
                Go to my portfolio
              </Link>
            </div>
          </section> :

        <>
            <RegisterStepper current={r.step} onSelect={r.goTo} />
            <section aria-live="polite">
              {r.step === 0 &&
            <AccountSetupStep
              accounts={r.accounts}
              toggleAccount={r.toggleAccount}
              username={r.username}
              setUsername={r.setUsername}
              password={r.password}
              setPassword={r.setPassword}
              errors={r.errors} />

            }

              {r.step === 1 &&
            <div>
                  <h2 className="text-[22px] font-semibold">Tell us about yourself</h2>
                  <div className="mt-6 grid max-w-xl gap-5 sm:grid-cols-2">
                    {detailFields.map((f) =>
                <FormField
                  key={f.id}
                  id={f.id}
                  label={f.label}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={r.details[f.id as keyof Details]}
                  onChange={(v) => r.setDetails({ ...r.details, [f.id]: v })}
                  error={r.errors[f.id]} />

                )}
                  </div>
                </div>
            }

              {r.step === 2 &&
            <div>
                  <h2 className="text-[22px] font-semibold">Your finances</h2>
                  <p className="mt-2 max-w-xl text-[14px] text-cic-muted">
                    As a regulated financial services provider, we need to understand your financial position before you invest.
                  </p>
                  <div className="mt-6 grid max-w-md gap-5">
                    <FormField id="employment" label="Employment status" options={employmentOptions} value={r.finances.employment} onChange={(v) => r.setFinances({ ...r.finances, employment: v })} error={r.errors.employment} />
                    <FormField id="income" label="Monthly income (after tax)" options={incomeOptions} value={r.finances.income} onChange={(v) => r.setFinances({ ...r.finances, income: v })} error={r.errors.income} />
                    <FormField id="source" label="Source of funds" options={fundSourceOptions} value={r.finances.source} onChange={(v) => r.setFinances({ ...r.finances, source: v })} error={r.errors.source} />
                  </div>
                </div>
            }

              {r.step === 3 &&
            <div>
                  <h2 className="text-[22px] font-semibold">Review your account</h2>
                  <dl className="mt-6 max-w-xl divide-y divide-cic-line border-y border-cic-line text-[14px]">
                    {[
                ['Products', accountOptions.filter((a) => r.accounts.includes(a.id)).map((a) => a.name).join(', ')],
                ['Username', r.username],
                ['Name', `${r.details.firstName} ${r.details.surname}`],
                ['ID number', r.details.idNumber],
                ['Mobile', r.details.mobile],
                ['Employment', r.finances.employment],
                ['Monthly income', r.finances.income]].
                map(([k, v]) =>
                <div key={k} className="grid grid-cols-[140px_1fr] gap-4 py-3">
                        <dt className="text-cic-muted">{k}</dt>
                        <dd className="font-semibold">{v}</dd>
                      </div>
                )}
                  </dl>
                  <label className="mt-6 flex max-w-xl items-start gap-3 text-[14px]">
                    <input type="checkbox" checked={r.accepted} onChange={(e) => r.setAccepted(e.target.checked)} className="mt-0.5 h-5 w-5 accent-cic-burgundy" />
                    I accept the <a href="#" className="text-cic-orange underline">terms and conditions</a> and confirm the information above is correct.
                  </label>
                  {r.errors.accepted && <p className="mt-2 text-[12px] text-cic-red" role="alert">{r.errors.accepted}</p>}
                </div>
            }

              <div className="mt-10 flex gap-3">
                {r.step > 0 &&
              <button onClick={r.back} className="border border-cic-orange px-6 py-2.5 text-[14px] text-cic-orange transition-colors duration-150 hover:bg-[#FBECEC]">
                    Back
                  </button>
              }
                <button
                onClick={r.next}
                disabled={r.submitting}
                className="flex items-center gap-2 bg-cic-orange px-8 py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23] disabled:opacity-80">
                
                  {r.submitting && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {r.step === 3 ? r.submitting ? 'Creating account…' : 'Create account' : 'Continue'}
                </button>
              </div>
            </section>
          </>
        }
      </main>
      <LegalFooter />
    </div>);

}