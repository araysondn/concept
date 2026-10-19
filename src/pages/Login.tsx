import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2Icon, PhoneIcon } from 'lucide-react';
import { PasswordInput } from '../components/PasswordInput';
import { LegalFooter } from '../components/LegalFooter';
import { CicLogo } from '../components/CicLogo';
import { contact } from '../data/navigation';

const LOGIN_ART = '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg';

const portals = ['Investment Portal', 'Unit Trust Portal', 'Pension Portal', 'Claims Portal'];

export function Login() {
  const navigate = useNavigate();
  const [portal, setPortal] = useState(portals[0]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{username?: string;password?: string;}>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!username.trim()) next.username = 'Please enter your member number or email.';
    if (!password) next.password = 'Please enter your password.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => navigate('/portfolio'), 700);
  };

  return (
    <div className="min-h-screen w-full bg-white text-cic-ink">
      <section className="relative flex min-h-[560px] items-center justify-center px-5 py-12 lg:justify-end lg:pr-[18%]">
        <img src={LOGIN_ART} alt="" className="absolute inset-0 h-full w-full object-cover object-left" />
        <div className="absolute left-5 top-5 bg-white p-2">
          <CicLogo className="h-10" tagline={false} />
        </div>
        <form onSubmit={submit} noValidate className="relative w-full max-w-[340px] bg-white p-10 shadow-card">
            <h1 className="text-[20px] font-semibold">Enter your logon details</h1>
            <label htmlFor="portal" className="mt-6 block text-[12px] font-semibold">
              Portal
            </label>
            <select
              id="portal"
              value={portal}
              onChange={(e) => setPortal(e.target.value)}
              className="mt-1 w-full border border-cic-line bg-white px-3 py-2 text-[14px] outline-none focus:border-cic-burgundy">

              {portals.map((p) =>
              <option key={p}>{p}</option>
              )}
            </select>

            <label htmlFor="username" className="mt-4 block text-[12px] font-semibold">
              Member number or email
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. UT-0042-118734"
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
              <a href="#" className="text-cic-orange hover:underline">Forgot your password?</a>
            </p>
            <p className="mt-3 text-center text-[13px]">
              New to CIC?{' '}
              <Link to="/register" className="text-cic-orange hover:underline">Open an account</Link>
            </p>
        </form>
      </section>

      <section aria-labelledby="login-help" className="mx-auto max-w-[1440px] px-5 py-12 lg:px-[100px]">
        <h2 id="login-help" className="text-[20px] font-semibold">Need help?</h2>
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
