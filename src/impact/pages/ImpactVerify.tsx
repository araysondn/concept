import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import { ImpactAuthLayout, authButton, authInput, authLabel } from '../ImpactAuthLayout';
import { loadPending, saveOnboarding, savePending } from '../store';

const RESEND_AFTER = 30;

/** Impact sign-up, second page: confirm the SMS code, then open the dashboard. */
export function ImpactVerify() {
  const navigate = useNavigate();
  const pending = loadPending();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useState(RESEND_AFTER);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (wait <= 0) return;
    const t = window.setTimeout(() => setWait((w) => w - 1), 1000);
    return () => window.clearTimeout(t);
  }, [wait]);

  if (!pending) return <Navigate to="/impact/signup" replace />;

  const masked = pending.mobile.replace(/\D/g, '').replace(/^(\d{3,6})\d{3}(\d{3})$/, '$1•••$2');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setError('Please enter the 6-digit code we sent you.');
      return;
    }
    setError('');
    setLoading(true);
    window.setTimeout(() => {
      saveOnboarding({
        facility: pending.facility,
        contactName: pending.name,
        email: pending.email,
        mobile: pending.mobile,
        status: 'none',
        done: [],
        data: { facilityName: pending.facility, facilityType: pending.type, contactName: pending.name, contactEmail: pending.email, contactPhone: pending.mobile }
      });
      savePending(null);
      navigate('/impact/dashboard');
    }, 800);
  };

  return (
    <ImpactAuthLayout>
      <form onSubmit={submit} noValidate className="relative w-full max-w-[340px] bg-white p-10 shadow-card">
        <h1 className="text-[20px] font-semibold">Enter your verification code</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-cic-muted">
          We sent a 6-digit code by SMS to <strong className="text-cic-ink">{masked || pending.mobile}</strong>.
        </p>

        <label htmlFor="code" className={authLabel.replace('mt-4', 'mt-6')}>Verification code</label>
        <input
          id="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          placeholder="000000"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'code-error' : 'code-hint'}
          className={`${authInput(error)} text-center text-[20px] tracking-[0.5em] placeholder:tracking-[0.5em]`} />

        {error ?
        <p id="code-error" className="mt-1 text-[12px] text-cic-red">{error}</p> :
        <p id="code-hint" className="mt-1 text-[12px] text-cic-muted">Design concept: any 6 digits work.</p>}

        <button type="submit" disabled={loading} className={authButton}>
          {loading && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {loading ? 'Creating your account…' : 'Verify and continue'}
        </button>

        <p className="mt-6 text-center text-[13px]" aria-live="polite">
          {wait > 0 ?
          <span className="text-cic-muted">{resent ? 'New code sent. ' : ''}Resend code in {wait}s</span> :

          <button type="button" onClick={() => {setWait(RESEND_AFTER);setResent(true);}} className="text-cic-orange hover:underline">
              Resend code
            </button>
          }
        </p>
        <p className="mt-3 text-center text-[13px]">
          Wrong number?{' '}
          <Link to="/impact/signup" className="text-cic-orange hover:underline">Change it</Link>
        </p>
      </form>
    </ImpactAuthLayout>);

}
