// Onboarding state for the Impact design concept, kept in sessionStorage so it
// survives moving between sign-up, dashboard and profile. Nothing leaves the browser.

export type ProfileStatus = 'none' | 'draft' | 'review';

export type Onboarding = {
  facility: string;
  contactName: string;
  email: string;
  mobile: string;
  status: ProfileStatus;
  done: string[]; // completed profile section ids
  data: Record<string, string>;
};

const KEY = 'impact-onboarding';

export function loadOnboarding(): Onboarding | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as Onboarding : null;
  } catch {
    return null;
  }
}

export function saveOnboarding(o: Onboarding | null) {
  try {
    if (o) window.sessionStorage.setItem(KEY, JSON.stringify(o));else
    window.sessionStorage.removeItem(KEY);
  } catch {

    // Storage blocked: the flow still works for this page view.
  }}

// Sign-up details held between the sign-up page and the code check.
export type PendingSignup = {facility: string;type: string;name: string;email: string;mobile: string;};
const PENDING = 'impact-signup';

export function loadPending(): PendingSignup | null {
  try {
    const raw = window.sessionStorage.getItem(PENDING);
    return raw ? JSON.parse(raw) as PendingSignup : null;
  } catch {
    return null;
  }
}

export function savePending(p: PendingSignup | null) {
  try {
    if (p) window.sessionStorage.setItem(PENDING, JSON.stringify(p));else
    window.sessionStorage.removeItem(PENDING);
  } catch {

    // Storage blocked: the next page falls back to sign-up.
  }}

export const profileSections = [
{ id: 'facility', title: 'Facility details', short: 'Name, type and location' },
{ id: 'licences', title: 'Licences and services', short: 'Registration and what you offer' },
{ id: 'bank', title: 'Bank details', short: 'Where we pay your claims' },
{ id: 'contacts', title: 'Contacts', short: 'Who we talk to about claims' },
{ id: 'documents', title: 'Documents', short: 'Licence, KRA PIN and bank proof' },
{ id: 'review', title: 'Review and submit', short: 'Check and send for approval' }];


export const facilityTypes = ['Hospital', 'Medical centre or clinic', 'Pharmacy', 'Laboratory', 'Dental clinic', 'Optical clinic'];

export const counties = [
'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado',
'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu',
'Machakos', 'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', "Murang'a", 'Nairobi', 'Nakuru',
'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River',
'Tharaka-Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'];


export const services = ['Outpatient', 'Inpatient', 'Maternity', 'Laboratory', 'Pharmacy', 'Dental', 'Optical', 'Radiology'];

export const banks = [
'Absa Bank Kenya', 'Co-operative Bank', 'Diamond Trust Bank', 'Equity Bank', 'Family Bank', 'I&M Bank', 'KCB Bank',
'NCBA Bank', 'Stanbic Bank', 'Standard Chartered'];


export const contactRoles = ['Facility owner', 'Medical superintendent', 'Facility administrator', 'Claims officer', 'Accountant'];

export const requiredDocs = [
{ id: 'docLicence', label: 'Facility licence (current year)' },
{ id: 'docKra', label: 'KRA PIN certificate' },
{ id: 'docBank', label: 'Bank letter or cancelled cheque' },
{ id: 'docReg', label: 'Business registration certificate', optional: true }];
