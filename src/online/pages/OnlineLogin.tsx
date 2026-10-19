import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, KeyRoundIcon, Loader2Icon, UserIcon } from 'lucide-react';
import { OnlineLayout } from '../OnlineLayout';
import { AuthSplit, Field, btnSolid, fieldCls } from '../AuthSplit';

type Role = 'customer' | 'agent';

export function OnlineLogin() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(params.get('as') === 'agent' ? 'agent' : 'customer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{username?: string;password?: string;}>({});
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = {
      username: username.trim() ? undefined : 'Enter your username',
      password: password ? undefined : 'Enter your password'
    };
    setErrors(next);
    if (next.username || next.password) return;
    setBusy(true);
    window.setTimeout(() => navigate('/portfolio'), 900);
  };

  const roleLabel = role === 'customer' ? 'Customer' : 'Agent';

  return (
    <OnlineLayout footer={false}>
      <AuthSplit>
        <div className="w-full max-w-[420px] self-center">
          <div className="text-center">
            <img src="/cic-logo.png" alt="CIC Group" className="mx-auto h-16 w-auto" />
            <h1 className="mt-5 text-[30px] font-semibold">Welcome to CIC Online</h1>
            <p className="mt-1 text-[14px] text-cic-muted">Enter your credentials to continue</p>
          </div>

          <fieldset className="mt-8">
            <legend className="sr-only">Log in as</legend>
            <div className="flex justify-center gap-8">
              {(['customer', 'agent'] as Role[]).map((r) =>
              <label key={r} className="flex cursor-pointer items-center gap-2 text-[14px]">
                  <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={role === r}
                  onChange={() => setRole(r)}
                  className="h-[18px] w-[18px] cursor-pointer accent-[#86191F]" />

                  <span className={role === r ? 'font-semibold' : 'text-cic-muted'}>Login as {r === 'customer' ? 'Customer' : 'Agent'}</span>
                </label>
              )}
            </div>
          </fieldset>

          <form onSubmit={submit} noValidate className="mt-6 space-y-5">
            <Field id="username" label="Username" required error={errors.username}>
              <div className="relative">
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 mt-0.5 h-4 w-4 -translate-y-1/2 text-cic-muted" aria-hidden="true" />
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  placeholder="Enter your username"
                  aria-invalid={Boolean(errors.username)}
                  className={`${fieldCls(errors.username)} pl-9`} />

              </div>
            </Field>
            <Field id="password" label="Password" required error={errors.password}>
              <div className="relative">
                <KeyRoundIcon className="pointer-events-none absolute left-3 top-1/2 mt-0.5 h-4 w-4 -translate-y-1/2 text-cic-muted" aria-hidden="true" />
                <input
                  id="password"
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  aria-invalid={Boolean(errors.password)}
                  className={`${fieldCls(errors.password)} pl-9 pr-10`} />

                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 mt-0.5 -translate-y-1/2 p-1 text-cic-muted hover:text-cic-red">

                  {show ? <EyeOffIcon className="h-4 w-4" aria-hidden="true" /> : <EyeIcon className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
            </Field>
            <button type="submit" disabled={busy} className={`${btnSolid} w-full`}>
              {busy && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {busy ? 'Signing in…' : `Sign In as ${roleLabel}`}
            </button>
          </form>

          <div className="mt-6 space-y-2 text-center text-[14px]">
            <p className="flex justify-center gap-6">
              <a href="#" className="text-cic-orange underline hover:text-cic-red">Forgot Username?</a>
              <a href="#" className="text-cic-orange underline hover:text-cic-red">Forgot Password?</a>
            </p>
            <p>
              Don't have an account?{' '}
              <Link to={`/online/register${role === 'agent' ? '?for=business' : ''}`} className="font-semibold text-cic-orange underline hover:text-cic-red">
                Create Account
              </Link>
            </p>
          </div>

          <div className="mt-10 border-t border-cic-line pt-5 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-cic-muted">Need help?</p>
            <p className="mt-2 flex flex-wrap justify-center gap-x-3 text-[13px]">
              <a href="#" className="text-cic-red hover:underline">Report Suspicious Activity</a>
              <span className="text-cic-line" aria-hidden="true">|</span>
              <a href="#" className="text-cic-red hover:underline">Block Account</a>
              <span className="text-cic-line" aria-hidden="true">|</span>
              <Link to="/online/contact" className="text-cic-red hover:underline">Contact Us</Link>
            </p>
          </div>
          <p className="mt-6 text-center text-[11px] text-cic-muted">Design concept: any username and password signs you in to a sample portfolio.</p>
        </div>
      </AuthSplit>
    </OnlineLayout>);

}
