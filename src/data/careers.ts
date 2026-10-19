// Content from careers.cicinsurancegroup.com (October 2026).

export const careersIntro =
'Whether you are a recent graduate or an experienced professional, CIC Insurance Group Plc is hiring in a variety of career tracks and offers a supportive workplace that encourages success.';

export const whatsInItForYou = [
'Work with a talented team',
'Continuous growth and learning',
'Supportive and approachable leadership',
'Team spirit and commitment'];


export const benefits = [
{
  title: 'Focus on your health',
  body: 'A flexible and attractive benefits plan in our medical and life insurance to take care of you and your loved ones.'
},
{
  title: 'Investment in your future',
  body: 'We invest in your future through a generous retirement benefits plan.'
},
{
  title: 'Rest and relaxation',
  body: 'A friendly and flexible leave plan for our employees.'
}];


export const applicationSteps = [
{ title: 'Apply for the job', body: 'Or submit a professional profile.' },
{ title: 'Screening', body: 'With HR.' },
{ title: 'Job related task evaluation', body: 'A skill test.' },
{ title: 'In-person interview', body: 'With your potential manager and team.' },
{ title: 'Evaluation and job offer', body: 'Have you been successful?' },
{ title: 'Join the team', body: 'Join the team and enjoy.' }];


export type Vacancy = {
  title: string;
  location: string;
  type: string;
  posted: string;
  /** ISO closing date, or null when the listing shows none. */
  closes: string | null;
  href: string;
};

const jobs = 'https://careers.cicinsurancegroup.com/job';

export const vacancies: Vacancy[] = [
{ title: 'Credit Control Officer', location: 'Juba', type: 'Contract', posted: '2026-10-16', closes: '2026-11-05', href: `${jobs}/credit-control-officer/` },
{ title: 'Head of Corporate Sales', location: 'Nairobi', type: 'Full Time', posted: '2026-10-15', closes: '2026-10-21', href: `${jobs}/head-of-corporate-sales/` },
{ title: 'Business Development Executives', location: 'Anywhere', type: 'Contract', posted: '2026-09-17', closes: '2026-10-31', href: `${jobs}/business-development-executives-5/` },
{ title: 'Call Centre Nursing Executive (Contract)', location: 'Nairobi', type: 'Contract', posted: '2026-09-17', closes: '2026-10-31', href: `${jobs}/call-centre-nursing-executive-contract-3/` },
{ title: 'Operations Officer: Reconciliation & Performance', location: 'Anywhere', type: 'Full Time', posted: '2024-05-21', closes: null, href: `${jobs}/operations-officer-reconciliation-performance/` },
{ title: 'Sales Officers – Retail Life (Alternative Channels)', location: 'Anywhere', type: 'Financial Advisers', posted: '2024-05-15', closes: null, href: `${jobs}/sales-officers-retail-life-alternativel-channels-2/` },
{ title: 'Pension Administrator', location: 'Anywhere', type: 'Full Time', posted: '2024-03-26', closes: null, href: `${jobs}/pension-administrator/` },
{ title: 'Finance Assistant – Meru', location: 'Anywhere', type: 'Full Time', posted: '2024-03-26', closes: null, href: `${jobs}/finance-assistant-meru/` },
{ title: 'Underwriting & Claims (Operations Manager) – General Insurance, CIC South Sudan', location: 'Anywhere', type: 'Full Time', posted: '2024-03-25', closes: null, href: `${jobs}/underwriting-claims-operations-manager-general-insurance-cic-south-sudan-2/` }];


export const careersSite = 'https://careers.cicinsurancegroup.com/';
