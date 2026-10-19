import type { LucideIcon } from 'lucide-react';
import { CarIcon, FlameIcon, HeartPulseIcon, HeartHandshakeIcon, HardHatIcon } from 'lucide-react';
import { createElement } from 'react';
import type { ContactFormField, DocumentItem } from '../components/patterns';
import type { ProductPageData } from './productPage';
import { ClaimSteps } from '../components/claims/ClaimSteps';

// Source: ke.cicinsurancegroup.com/claims (fetched 17 Oct 2026). Steps and documents follow the source wording,
// with obvious typos corrected.

export type ClaimType = {
  id: string;
  label: string;
  icon: LucideIcon;
  summary: string;
  /** How soon to report, from the source steps. */
  reportBy: string;
  steps: string[];
  documents: string[];
  extra?: {title: string;items: string[];};
  forms: DocumentItem[];
};

const FORMS = 'https://ke.cicinsurancegroup.com/wp-content/uploads';

export const claimTypes: ClaimType[] = [
{
  id: 'motor',
  label: 'Motor',
  icon: CarIcon,
  summary: 'Accident, theft or damage to your vehicle.',
  reportBy: 'Police within 24 hours',
  steps: [
  'Report the accident or theft to the police immediately, and no later than 24 hours. Get a police abstract.',
  'Report the accident to CIC immediately on 0703 099 120 or 020 282 3000.',
  "Don't accept liability at the scene of an accident.",
  'Need a tow? Call AA of Kenya on 020 697 9000 or 0709 933 000 (comprehensive cover only).',
  'Clear with the police and take the vehicle to one of our recommended garages in Nairobi. Outside Nairobi, use a garage of your choice and let us know.',
  'Complete and return a claim form. You can get one at any of our offices or download it below.',
  'Attach the police abstract and a copy of the driving licence of the person who was driving.'],

  documents: [
  'Original police abstract',
  "Copy of the driving licence of the person driving at the time of the accident",
  'Policy excess',
  "Assessor's report"],

  forms: [
  { title: 'Motor Claim Form', category: 'Claim form', meta: 'PDF', href: `${FORMS}/2021/09/CIC-GENERAL-Motor-Insurance-Claim-Form.pdf` },
  { title: 'CIC Approved Garages', category: 'Garage list', meta: 'XLSX', href: `${FORMS}/2024/07/Garage-Mapping-4.xlsx` }]

},
{
  id: 'fire',
  label: 'Fire & Theft',
  icon: FlameIcon,
  summary: 'Loss or damage to your property.',
  reportBy: 'Immediately',
  steps: [
  'Report to the police immediately and get a police abstract.',
  'Report the loss to CIC immediately on our emergency or toll-free numbers.',
  'Complete and return a claim form, giving the replacement cost of the lost property.',
  'Attach a statement from a watchman, guard or any witnesses.'],

  documents: ['Police abstract', 'Replacement quotation', 'Witness statement', 'Adjustment report'],
  forms: [
  { title: 'Property Loss or Damage Claim Form', category: 'Claim form', meta: 'PDF', href: `${FORMS}/2021/09/Property-Loss-or-Damage-Claim-Form.pdf` }]

},
{
  id: 'accident',
  label: 'Personal / Group Accident',
  icon: HeartPulseIcon,
  summary: 'Injury, medical expenses or loss of income after an accident.',
  reportBy: 'Immediately',
  steps: [
  'Report the accident to CIC immediately on our emergency or toll-free numbers.',
  'Follow up with a written notification while you recover.',
  "Once you have a clean bill of health, complete and return a claim form with the doctor's prescription and medical receipts.",
  'Attach a police abstract if it was a road traffic accident or assault.',
  'Attach a copy of the death certificate if the accident was fatal.',
  'If your cover is based on salary, attach payslips for the three months before the accident.'],

  documents: [
  'Original medical expense receipts',
  'Payslips for the 3 months before the accident (employees only)',
  'Police abstract if injuries are from a road traffic accident or assault',
  'Death certificate in case of a fatal accident'],

  extra: {
    title: 'Loss of weekly income or medical expense reimbursement',
    items: [
    "Doctor's report",
    'Police abstract / P3 form',
    'Copy of identity card',
    'Original ETR receipts (medical reimbursements)',
    'Copy of recent payslip (check-off payments only)',
    'Proof of bank details (e.g. copy of ATM card)']

  },
  forms: [
  { title: 'Personal Accident Claim Form', category: 'Claim form', meta: 'PDF', href: `${FORMS}/2021/09/Personal-Accident-Claim-Form.pdf` }]

},
{
  id: 'life',
  label: 'Life claims',
  icon: HeartHandshakeIcon,
  summary: 'Death, accident or critical illness under a life policy.',
  reportBy: 'As soon as you can',
  steps: [
  'Let us know about the death, accident or critical illness diagnosis.',
  'Notify us by email at lifecare@cic.co.ke.',
  "We'll tell you which forms to complete.",
  "We review your documents and get in touch with you.",
  'Once your documents are in order, we process the claim and issue a discharge voucher.',
  'Payment follows.'],

  documents: [
  'ID of the beneficiary (original and copy)',
  'ID of the policyholder (original and copy)',
  'Burial permit (original and copy)',
  'Certificate of identity',
  'Certificate of attending physician',
  'Police abstract if an accident is involved (original and copy)',
  'Copy of the claimant’s ATM card',
  'Death certificate (original and copy)',
  'Original policy document (if lost, provide an affidavit)',
  'Post-mortem report (original and copy)',
  "Copy of the policyholder's recent payslip (check-off)"],

  extra: {
    title: 'Family Life Plan and Last Expense claims',
    items: ['Only the first six documents in the list apply.']
  },
  forms: [
  { title: 'Death Claim Form', category: 'Claim form', meta: 'PDF', href: `${FORMS}/2021/09/Death-Claim-Form.pdf` },
  { title: 'Certificate of Attending Physician', category: 'Supporting form', meta: 'PDF', href: `${FORMS}/2021/09/CERTIFICATE-OF-ATTENDING-PHYSICIAN.pdf` },
  { title: 'Certificate of Identity', category: 'Supporting form', meta: 'PDF', href: `${FORMS}/2021/09/CERTIFICATE-OF-IDENTITY.pdf` },
  { title: 'Critical Illness Claim Form', category: 'Claim form', meta: 'PDF', href: `${FORMS}/2021/09/Critical-Illness-Claim-Form.pdf` }]

},
{
  id: 'wiba',
  label: 'WIBA',
  icon: HardHatIcon,
  summary: 'Work injury claims under the Work Injury Benefits Act.',
  reportBy: 'Immediately',
  steps: [
  'Report the accident to CIC immediately on our emergency or toll-free numbers.',
  'Follow up with a written notification while the employee recovers.',
  'Complete and return a claim form.',
  "Attach the doctor's prescription and medical receipts.",
  'Attach forms WIBA 1 and 4 from the labour office.',
  'Attach a police abstract if it was a road traffic accident or assault.',
  'Attach a copy of the death certificate if the accident was fatal.',
  'If cover is based on salary, attach payslips for the three months before the accident.'],

  documents: [
  'Forms LD 104, 105 and 180',
  'Agreement between the employer and employee',
  'Payslips for the 3 months before the accident',
  'Police abstract',
  'Death certificate where applicable',
  'Original medical expense receipts'],

  forms: []
}];


export const providerPanels: DocumentItem[] = [
{ title: 'Afya Bora Provider Panel', category: 'Medical providers', date: '2026', meta: 'PDF', href: `${FORMS}/2026/08/AFYA-BORA-PROVIDER-PANEL-2026-1.pdf` },
{ title: 'Corporate Provider Panel', category: 'Medical providers', date: '2026', meta: 'PDF', href: `${FORMS}/2026/08/CORPORATE-PROVIDER-PANEL-2026-7.pdf` },
{ title: 'CoopCare Provider Panel', category: 'Medical providers', date: '2026', meta: 'PDF', href: `${FORMS}/2026/08/COOPCARE-PROVIDER-PANEL-2026-4.pdf` },
{ title: 'Additional Providers', category: 'Medical providers', date: '2025', meta: 'PDF', href: `${FORMS}/2025/08/Additional-Providers-Sheet1.pdf` }];


export const claimsPortalUrl = 'https://claimsportal.cic.co.ke:8444/SurveyorPortal_CIC/#/Main';

export const claimFormFields: ContactFormField[] = [
{ id: 'firstName', label: 'First name', required: true },
{ id: 'lastName', label: 'Last name', required: true },
{ id: 'phone', label: 'Phone number', type: 'tel', placeholder: 'e.g. 0712 345 678', required: true },
{ id: 'email', label: 'Email', type: 'email', required: true },
{ id: 'idNumber', label: 'ID / passport number', required: true },
{ id: 'policy', label: 'Policy number', required: true },
{ id: 'claimType', label: 'Type of claim', type: 'select', options: ['Motor', 'Fire & Theft', 'Personal / Group Accident', 'Life', 'WIBA'], required: true },
{ id: 'notes', label: 'Tell us what happened', type: 'textarea', wide: true }];

const images = {
  hero: '/cc1fa332-e7e8-46c7-847e-2ead4c6b6142.jpg',
  friends: '/19f98733-386d-4c89-bb7e-c68bd62f3cc7.jpg',
  thinking: '/d694dffc-d1e8-4a02-b91b-a3916205270c.jpg',
  roadTrip: '/b94fbfcf-01cb-464f-83ac-76f9511ef27c.jpg',
  valuing: '/b066b3bc-dbb4-40a4-aafc-1d3a8ad94905.jpg',
  advisor: '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg',
  garages: '/7de16e01-1d17-4357-90ce-738935a39459.jpg'
};

const claimById = (id: string) => claimTypes.find((c) => c.id === id)!;
const firstForm = (id: string) => claimById(id).forms.find((f) => f.category === 'Claim form');

/** Claims page content on the Absa product-page template (benchmarked on Motor insurance). */
export const claimsPage: ProductPageData = {
  hero: {
    image: images.hero,
    imagePosition: 'center 30%',
    title: "We're here when you need us most",
    intro: "Something happened? Tell us what, and we'll guide you through every step of your claim.",
    cta: { label: 'Submit your claim', href: '#claim-online' }
  },
  breadcrumb: [
  { label: 'Individual', to: '/' },
  { label: 'Claims' }],

  help: {
    title: 'How can we help?',
    items: [
    { label: 'Report a claim', icon: 'claim', to: '/claims#claim-online' },
    { label: 'Download a claim form', icon: 'file', to: '/claims#claim-forms' },
    { label: 'Track my claim', icon: 'monitor', to: '/claims#claim-contacts' },
    { label: 'Find a CIC approved garage', icon: 'garage', to: '/claims#claim-forms' },
    { label: 'Find a hospital on our panel', icon: 'medical', to: '/claims#provider-panels' },
    { label: 'Call us', icon: 'talk', to: '/claims#claim-contacts' }]

  },
  know: {
    title: 'How to make a claim',
    intro: 'Pick your claim type to see the steps and the documents to attach.',
    tabs: claimTypes.map((c) => ({ label: c.label, body: createElement(ClaimSteps, { claim: c }) }))
  },
  apply: {
    title: 'Get your claim started',
    intro: 'Download the right form, or send us your claim online and a claims officer will contact you.',
    products: ['motor', 'fire', 'accident', 'life'].map((id) => {
      const c = claimById(id);
      const form = firstForm(id);
      return {
        title: `${c.label.replace(/ claims$/i, '')} claims`,
        body: `${c.summary} Report it: ${c.reportBy.toLowerCase()}.`,
        icon: c.icon,
        more: form ? { label: 'Download form', href: form.href } : { label: 'All forms', href: '#claim-forms' },
        quote: { label: 'Claim online', href: '#claim-online' }
      };
    }),
    promos: [
    {
      title: 'Need a tow?',
      body: 'Call AA of Kenya on 020 697 9000 or 0709 933 000. Towing is included with comprehensive motor cover.',
      bg: 'bg-cic-pink',
      link: { label: 'Motor insurance', to: '/motor-insurance' }
    },
    {
      title: 'CIC approved garages',
      body: 'Take your vehicle to one of our approved garages for repairs. Download the latest list.',
      bg: 'bg-[#1d1d1d]',
      image: images.garages,
      imageClass: 'absolute inset-0 h-full w-full object-cover opacity-60',
      link: { label: 'Download the list', href: claimById('motor').forms.find((f) => f.category === 'Garage list')?.href }
    }],

    banner: {
      title: 'Work injury (WIBA) claims',
      body: 'Report a workplace injury immediately, then send us the claim form with forms WIBA 1 and 4 from the labour office.',
      link: { label: 'Claim online', href: '#claim-online' }
    }
  },
  explore: {
    title: 'Explore your options',
    feature: {
      title: 'Track your claim online',
      body: 'See where your claim is, any time, on the claims portal.',
      image: images.friends,
      imageAlt: 'Two friends laughing',
      link: { label: 'Open the claims portal', href: claimsPortalUrl }
    },
    options: [
    { title: 'Find a hospital', body: 'Download our medical provider panels', link: { label: 'Provider panels', href: '#provider-panels' } },
    { title: 'Talk to us', body: 'Call, email or visit any of our branches', link: { label: 'Contact us', to: '/contact-us' } }],

    wide: { title: 'Not covered yet?', body: 'Find the right cover before you need it.', image: images.advisor, link: { label: 'All products', to: '/products' } }
  },
  articles: {
    title: 'Claims, made simple',
    articles: [
    { title: 'What happens after you claim', body: 'From assessment to settlement.', image: images.thinking },
    { title: 'How to avoid claim delays', body: 'The documents that speed things up.', image: images.roadTrip },
    { title: 'Know your excess', body: 'The part of a claim you pay yourself.', image: images.valuing },
    { title: 'Claiming on life cover', body: 'What beneficiaries need to know.', image: images.advisor }]

  }
};