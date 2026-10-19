import React from 'react';
import { InfoIcon, CheckCircle2Icon, CircleIcon, LockKeyholeIcon } from 'lucide-react';
import { accountOptions } from '../../data/register';
import { passwordRules } from '../../utils/password';
import { PasswordInput } from '../PasswordInput';
import { Errors } from '../../hooks/useRegistration';

type Props = {
  accounts: string[];
  toggleAccount: (id: string) => void;
  username: string;
  setUsername: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  errors: Errors;
};

export function AccountSetupStep({ accounts, toggleAccount, username, setUsername, password, setPassword, errors }: Props) {
  return (
    <div>
      <fieldset>
        <legend className="text-[22px] font-semibold">What would you like to start with?</legend>
        <ul className="mt-5 space-y-5">
          {accountOptions.map((a) =>
          <li key={a.id} className="flex flex-wrap items-start gap-3">
              <input
              id={`acc-${a.id}`}
              type="checkbox"
              checked={accounts.includes(a.id)}
              onChange={() => toggleAccount(a.id)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-cic-burgundy" />
            
              <label htmlFor={`acc-${a.id}`} className="cursor-pointer">
                <span className="text-[14px] font-semibold">{a.name}</span>{' '}
                <span className="text-[14px]">{a.price}</span>
                <InfoIcon className="ml-1 inline h-3.5 w-3.5 text-cic-red" aria-hidden="true" />
                {a.note && <span className="block text-[12px] text-cic-muted">{a.note}</span>}
              </label>
              {a.tip &&
            <span className="rounded border border-cic-amber bg-[#FFF6DB] px-2 py-1 text-[11px] text-cic-ink">{a.tip}</span>
            }
            </li>
          )}
        </ul>
        {errors.accounts && <p className="mt-3 text-[13px] text-cic-red" role="alert">{errors.accounts}</p>}
      </fieldset>

      <h2 className="mt-12 text-[22px] font-semibold">Set up your login details</h2>
      <div className="mt-5 max-w-sm">
        <label htmlFor="reg-username" className="block text-[12px] font-semibold">Your username</label>
        <input
          id="reg-username"
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. wanjiru@gmail.com"
          aria-invalid={Boolean(errors.username)}
          className={`mt-1 w-full border bg-cic-mist px-3 py-2 text-[14px] outline-none placeholder:italic focus:border-cic-burgundy ${
          errors.username ? 'border-cic-red' : 'border-cic-line'}`
          } />
        
        {errors.username && <p className="mt-1 text-[12px] text-cic-red">{errors.username}</p>}

        <label htmlFor="reg-password" className="mt-5 block text-[12px] font-semibold">Choose a password</label>
        <PasswordInput
          id="reg-password"
          value={password}
          onChange={setPassword}
          placeholder="e.g. P@55w0rD"
          invalid={Boolean(errors.password)}
          describedBy="password-rules" />
        
        {errors.password && <p className="mt-1 text-[12px] text-cic-red">{errors.password}</p>}
      </div>

      <div id="password-rules" className="mt-6 flex max-w-lg gap-6 bg-white p-6 shadow-card">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FBECEC] text-cic-red">
          <LockKeyholeIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[16px] font-semibold">Your password must:</p>
          <ul className="mt-3 space-y-2 text-[13px]">
            {passwordRules.map((r) => {
              const ok = r.test(password);
              return (
                <li key={r.label} className={`flex items-center gap-2 ${ok ? 'text-cic-green' : 'text-cic-ink'}`}>
                  {ok ? <CheckCircle2Icon className="h-4 w-4" aria-hidden="true" /> : <CircleIcon className="h-4 w-4 text-cic-muted" aria-hidden="true" />}
                  {r.label}
                  <span className="sr-only">{ok ? '(met)' : '(not met)'}</span>
                </li>);

            })}
          </ul>
        </div>
      </div>
    </div>);

}