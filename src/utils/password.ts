export const passwordRules = [
{ label: 'Be at least 8 characters long', test: (p: string) => p.length >= 8 },
{ label: 'Contain an uppercase and a lowercase letter', test: (p: string) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
{ label: 'Contain at least one number', test: (p: string) => /\d/.test(p) },
{ label: 'Contain a special character (e.g. @ # !)', test: (p: string) => /[^A-Za-z0-9]/.test(p) }];


export function isStrongPassword(p: string) {
  return passwordRules.every((r) => r.test(p));
}

export function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}