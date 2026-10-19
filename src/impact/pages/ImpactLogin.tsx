import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import { PasswordInput } from '../../components/PasswordInput';
import { ImpactAuthLayout } from '../ImpactAuthLayout';
import { loadOnboarding, saveOnboarding } from '../store';

/** Impact: sign-in for CIC Microinsurance service providers, on the Absa logon layout. */
export function ImpactLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{username?: string;password?: string;}>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!username.trim()) next.username = 'Please enter your provider number or email.';
    if (!password) next.password = 'Please enter your password.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    // The email used at sign-up resumes onboarding; any other login shows the sample approved provider.
    const ob = loadOnboarding();
    if (ob && ob.email.toLowerCase() !== username.trim().toLowerCase()) saveOnboarding(null);
    window.setTimeout(() => navigate('/impact/dashboard'), 700);
  };

  return (
    <ImpactAuthLayout>
        <form onSubmit={submit} noValidate className="relative w-full max-w-[340px] bg-white p-10 shadow-card">
            <h1 className="text-[20px] font-semibold">Enter your logon details</h1>

            <label htmlFor="username" className="mt-6 block text-[12px] font-semibold">
              Provider number or email
            </label>
            <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. SP-004512"
            autoComplete="username"
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? 'username-error' : undefined}
            className={`mt-1 w-full border px-3 py-2 text-[14px] outline-none placeholder:italic placeholder:text-[#9a9a9a] focus:border-cic-burgundy ${
            errors.username ? 'border-cic-red' : 'border-cic-line'}`
            } />

            {errors.username && <p id="username-error" className="mt-1 text-[12px] text-cic-red">{errors.username}</p>}

            <label htmlFor="password" className="mt-4 block text-[12px] font-semibold">
              Password
            </label>
            <PasswordInput
            id="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            invalid={Boolean(errors.password)}
            describedBy={errors.password ? 'password-error' : undefined} />

            {errors.password && <p id="password-error" className="mt-1 text-[12px] text-cic-red">{errors.password}</p>}

            <button
            type="submit"
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2 bg-cic-orange py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23] disabled:opacity-80">

              {loading && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {loading ? 'Logging you in…' : "Let's continue"}
            </button>

            <p className="mt-6 text-center text-[13px]">
              Forgot <a href="#" className="text-cic-orange hover:underline">username</a> or{' '}
              <a href="#" className="text-cic-orange hover:underline">password</a>?
            </p>
            <p className="mt-3 text-center text-[13px]">
              Not on our panel yet?{' '}
              <Link to="/impact/signup" className="text-cic-orange hover:underline">Apply to join</Link>
            </p>
          </form>
    </ImpactAuthLayout>);

}
