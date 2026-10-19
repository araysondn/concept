import { useState } from 'react';
import { isEmail, isStrongPassword } from '../utils/password';

export type Details = {firstName: string;surname: string;idNumber: string;mobile: string;};
export type Finances = {employment: string;income: string;source: string;};
export type Errors = Record<string, string>;

export function useRegistration() {
  const [step, setStep] = useState(0);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [details, setDetails] = useState<Details>({ firstName: '', surname: '', idNumber: '', mobile: '' });
  const [finances, setFinances] = useState<Finances>({ employment: '', income: '', source: '' });
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const toggleAccount = (id: string) =>
  setAccounts((a) => a.includes(id) ? a.filter((x) => x !== id) : [...a, id]);

  const validate = (s: number): Errors => {
    const e: Errors = {};
    if (s === 0) {
      if (accounts.length === 0) e.accounts = 'Choose at least one product to get started.';
      if (!isEmail(username)) e.username = 'Enter a valid email address as your username.';
      if (!isStrongPassword(password)) e.password = 'Your password does not meet all the requirements below.';
    }
    if (s === 1) {
      if (!details.firstName.trim()) e.firstName = 'Enter your first name.';
      if (!details.surname.trim()) e.surname = 'Enter your surname.';
      if (!/^\d{7,9}$/.test(details.idNumber.replace(/\s/g, ''))) e.idNumber = 'Enter a valid national ID number (7–9 digits).';
      if (details.mobile.replace(/\D/g, '').length < 10) e.mobile = 'Enter a valid 10-digit mobile number.';
    }
    if (s === 2) {
      if (!finances.employment) e.employment = 'Select your employment status.';
      if (!finances.income) e.income = 'Select your monthly income.';
      if (!finances.source) e.source = 'Select your source of funds.';
    }
    if (s === 3 && !accepted) e.accepted = 'Please accept the terms and conditions to continue.';
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0 });
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 900);
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const goTo = (s: number) => {
    if (s < step) {
      setErrors({});
      setStep(s);
    }
  };

  return {
    step, accounts, toggleAccount, username, setUsername, password, setPassword,
    details, setDetails, finances, setFinances, accepted, setAccepted,
    errors, submitting, done, next, back, goTo
  };
}