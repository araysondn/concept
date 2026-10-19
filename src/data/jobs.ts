// Job detail content from careers.cicinsurancegroup.com (October 2026), condensed for this design.
import { vacancies } from './careers';
import type { Vacancy } from './careers';

export type JobDetail = {
  reportsTo?: string;
  summary: string;
  responsibilities: string[];
  essential: string[];
  desirable?: string[];
  notes?: string[];
};

/** Slug from the careers-site URL, e.g. .../job/head-of-corporate-sales/ -> head-of-corporate-sales */
export const jobSlug = (v: Vacancy) => v.href.replace(/\/$/, '').split('/').pop() ?? '';

export const findJob = (slug: string) => vacancies.find((v) => jobSlug(v) === slug);

export const jobDetails: Record<string, JobDetail> = {
  'head-of-corporate-sales': {
    reportsTo: 'Managing Director',
    summary:
    'Lead Group Life corporate sales: set and deliver the sales strategy, grow new business and the pipeline, and keep our corporate clients and intermediaries well served.',
    responsibilities: [
    'Set and deliver the corporate sales strategy, new business targets and pipeline growth',
    'Manage relationships with corporate clients, brokers and intermediaries',
    'Win new Group Life schemes, and manage tenders and proposals',
    'Retain accounts through strong renewal management',
    'Monitor portfolio profitability with Underwriting, Reinsurance and Actuarial teams',
    'Lead and develop the Corporate Sales team',
    'Report to the Managing Director and make sure we meet regulatory and governance requirements'],

    essential: [
    "Bachelor's degree in Business, Marketing, Insurance, Actuarial Science, Finance, Economics or a related field",
    "At least 10 years' relevant experience, including 5 years in leadership",
    'Strong knowledge of Group Life products and intermediary relationships',
    'Negotiation, analytical and executive presentation skills',
    'Confident with MS Office and CRM tools'],

    desirable: [
    'Progress towards a professional qualification (AIIK, ACII, FLMI or CIM)',
    'Experience in Group Life, employee benefits or corporate insurance',
    'Established corporate and intermediary relationships',
    'Knowledge of emerging technologies'],

    notes: [
    'This role is open to internal and external candidates.',
    'Please state the position you are applying for.',
    'Only shortlisted candidates will be contacted.']

  }
};

export const qualificationStatuses = ['Completed', 'In progress', 'Not completed'];
export const noticePeriods = ['Immediately available', '2 weeks', '1 month', '2 months', '3 months or more'];
export const countries = ['Kenya', 'Uganda', 'Malawi', 'South Sudan', 'Tanzania', 'Rwanda', 'Ethiopia', 'Other'];

export const dataProtectionText =
'CIC Insurance Group becomes the data controller for the information you share. We hold it securely and do not share it with third parties unless the law requires us to.';
export const declarationText =
'I confirm that the information I have given is correct. I understand that if any of it is proven to be false, or if I have hidden relevant information, any offer may be withdrawn or my employment ended.';
