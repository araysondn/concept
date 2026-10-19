export type Segment = 'Individual' | 'Business' | 'Corporate' | 'Cooperative';

export type ProductCategory =
'Motor' |
'Medical' |
'Life & savings' |
'Investments' |
'Pensions' |
'Property & business' |
'Personal accident';

export type Company = 'CIC General Insurance' | 'CIC Life Assurance' | 'CIC Asset Management';

export type CatalogueProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  segments: Segment[];
  company: Company;
  description: string;
  highlights: string[];
  to?: string;
};

export const segments: Segment[] = ['Individual', 'Business', 'Corporate', 'Cooperative'];

export const categories: ProductCategory[] = [
'Motor',
'Medical',
'Life & savings',
'Investments',
'Pensions',
'Property & business',
'Personal accident'];


export const companies: Company[] = ['CIC General Insurance', 'CIC Life Assurance', 'CIC Asset Management'];

export const quickSearchTerms = ['Motor', 'Medical', 'Education', 'Retirement', 'Savings', 'Fire'];

// Product names follow the CIC Kenya menus; descriptions are written for this design concept.
const rawCatalogue: CatalogueProduct[] = [
{
  id: 'easy-bima',
  name: 'CIC Easy Bima',
  category: 'Motor',
  segments: ['Individual', 'Business'],
  company: 'CIC General Insurance',
  description: 'Comprehensive motor cover you can pay for in monthly instalments instead of one annual premium.',
  highlights: ['Pay monthly, up to 12 instalments', 'Comprehensive cover for private and commercial vehicles', 'Towing and motoring assist'],
  to: '/motor-insurance'
},
{
  id: 'motor-private',
  name: 'Motor Private Insurance',
  category: 'Motor',
  segments: ['Individual', 'Business', 'Corporate'],
  company: 'CIC General Insurance',
  description: 'Comprehensive or third party cover for vehicles used for personal and family travel.',
  highlights: ['Accidental damage, theft and fire', 'Third party liability', 'Optional excess waiver and courtesy car'],
  to: '/motor-insurance'
},
{
  id: 'motor-commercial',
  name: 'Motor Commercial Insurance',
  category: 'Motor',
  segments: ['Individual', 'Business', 'Corporate', 'Cooperative'],
  company: 'CIC General Insurance',
  description: 'Cover for vehicles that earn a living, from pick-ups and delivery vans to trucks and fleets.',
  highlights: ['Single vehicles or whole fleets', 'Comprehensive or third party', 'Cover for goods-carrying vehicles'],
  to: '/motor-insurance'
},
{
  id: 'seniors-mediplan',
  name: 'Seniors Mediplan',
  category: 'Medical',
  segments: ['Individual'],
  company: 'CIC General Insurance',
  description: 'Medical cover designed for older customers who want continued access to quality care.',
  highlights: ['Inpatient and outpatient options', 'Designed for seniors', 'Wide provider network']
},
{
  id: 'sme-medipack',
  name: 'SME Medipack',
  category: 'Medical',
  segments: ['Business'],
  company: 'CIC General Insurance',
  description: 'Group medical cover sized for small and medium businesses and their staff.',
  highlights: ['Cover for small teams', 'Inpatient and outpatient options', 'Add dependants']
},
{
  id: 'afya-bora',
  name: 'Afya Bora',
  category: 'Medical',
  segments: ['Corporate'],
  company: 'CIC General Insurance',
  description: 'Medical cover for organisations that want to look after the health of their employees.',
  highlights: ['Staff and dependants', 'Afya Bora provider panel', 'Flexible benefit limits']
},
{
  id: 'corporate-medisure',
  name: 'Corporate Medisure',
  category: 'Medical',
  segments: ['Corporate'],
  company: 'CIC General Insurance',
  description: 'Tailored group medical schemes for large employers.',
  highlights: ['Scheme designed around your workforce', 'Inpatient and outpatient', 'Corporate provider panel']
},
{
  id: 'coopcare',
  name: 'CoopCare Health Insurance',
  category: 'Medical',
  segments: ['Cooperative'],
  company: 'CIC General Insurance',
  description: 'Affordable medical cover for members of SACCOs and cooperative societies.',
  highlights: ['Built for cooperative members', 'CoopCare provider panel', 'Family cover options']
},
{
  id: 'academia',
  name: 'Academia',
  category: 'Life & savings',
  segments: ['Individual'],
  company: 'CIC Life Assurance',
  description: "A savings plan that helps you put money aside for your child's education, with life cover built in.",
  highlights: ['Save towards school fees', 'Life cover for the parent', 'Payouts timed to education milestones']
},
{
  id: 'smart-saver',
  name: 'Smart Saver',
  category: 'Life & savings',
  segments: ['Individual'],
  company: 'CIC Life Assurance',
  description: 'A disciplined savings plan with life cover, for goals that are a few years away.',
  highlights: ['Regular savings habit', 'Life cover included', 'Choose your savings term']
},
{
  id: 'haba-haba',
  name: 'Haba Haba na CIC',
  category: 'Life & savings',
  segments: ['Individual'],
  company: 'CIC Life Assurance',
  description: 'Save little by little, at your own pace, and watch it add up.',
  highlights: ['Start small', 'Flexible contributions', 'Save via mobile money']
},
{
  id: 'employee-group-life',
  name: 'Employee Group Life',
  category: 'Life & savings',
  segments: ['Cooperative', 'Corporate'],
  company: 'CIC Life Assurance',
  description: "Life cover for staff that pays a benefit to their families if the unexpected happens.",
  highlights: ['Cover for all employees', 'Benefit paid to dependants', 'One scheme to manage']
},
{
  id: 'group-credit-life',
  name: 'Group Credit Life',
  category: 'Life & savings',
  segments: ['Cooperative'],
  company: 'CIC Life Assurance',
  description: "Clears a member's outstanding loan if they pass away or become disabled, protecting the SACCO and the family.",
  highlights: ['Protects loan books', 'Protects members’ families', 'Built for SACCOs']
},
{
  id: 'loan-guard',
  name: 'Loan Guard',
  category: 'Life & savings',
  segments: ['Cooperative'],
  company: 'CIC Life Assurance',
  description: 'Protection for cooperative lending against defined borrower risks.',
  highlights: ['Safeguards cooperative loans', 'Simple administration', 'Designed with SACCOs']
},
{
  id: 'board-endowment',
  name: 'Board Endowment',
  category: 'Life & savings',
  segments: ['Cooperative'],
  company: 'CIC Life Assurance',
  description: 'A savings and life cover plan for members of cooperative boards and management committees.',
  highlights: ['Savings with life cover', 'Designed for board members', 'Lump sum at maturity']
},
{
  id: 'money-market-fund',
  name: 'CIC Money Market Fund',
  category: 'Investments',
  segments: ['Individual', 'Business', 'Corporate', 'Cooperative'],
  company: 'CIC Asset Management',
  description: 'A low-risk unit trust that earns daily interest, with access to your money at short notice.',
  highlights: ['Start with KES 5,000', 'Interest calculated daily', 'Withdraw without penalty'],
  to: '/investments'
},
{
  id: 'jipange-plus',
  name: 'Jipange Plus',
  category: 'Pensions',
  segments: ['Individual', 'Business', 'Corporate'],
  company: 'CIC Life Assurance',
  description: 'A personal pension plan that helps you plan and save for retirement on your own terms.',
  highlights: ['Save for retirement', 'Flexible contributions', 'Tax-efficient pension savings']
},
{
  id: 'income-draw-down',
  name: 'Income Draw Down',
  category: 'Pensions',
  segments: ['Business', 'Corporate'],
  company: 'CIC Life Assurance',
  description: 'Turns retirement savings into a regular income you draw over time.',
  highlights: ['Regular retirement income', 'Choose how much to draw', 'Remaining funds stay invested']
},
{
  id: 'umbrella-scheme',
  name: 'CIC Umbrella Retirement Benefits Scheme',
  category: 'Pensions',
  segments: ['Cooperative'],
  company: 'CIC Life Assurance',
  description: 'A shared retirement scheme that lets cooperatives offer pensions without running their own fund.',
  highlights: ['No need for a standalone scheme', 'Professional fund management', 'Member portal access']
},
{
  id: 'home-insurance',
  name: 'Home Insurance',
  category: 'Property & business',
  segments: ['Individual'],
  company: 'CIC General Insurance',
  description: 'Protects your house and the things inside it against fire, theft and other damage.',
  highlights: ['Buildings and contents', 'Fire and burglary', 'Domestic staff liability options']
},
{
  id: 'fire-insurance',
  name: 'Fire Insurance',
  category: 'Property & business',
  segments: ['Business', 'Corporate'],
  company: 'CIC General Insurance',
  description: 'Covers business premises, stock and equipment against fire and allied perils.',
  highlights: ['Buildings, stock and machinery', 'Allied perils extensions', 'Business continuity']
},
{
  id: 'fire-industrial',
  name: 'Fire Industrial',
  category: 'Property & business',
  segments: ['Cooperative'],
  company: 'CIC General Insurance',
  description: 'Fire cover for cooperative factories, stores and processing plants.',
  highlights: ['Factories and warehouses', 'Stock and produce', 'Machinery and plant']
},
{
  id: 'property-insurance',
  name: 'Property Insurance',
  category: 'Property & business',
  segments: ['Business', 'Corporate'],
  company: 'CIC General Insurance',
  description: 'Broad protection for commercial property and assets.',
  highlights: ['Commercial buildings', 'Assets and equipment', 'Tailored limits']
},
{
  id: 'wiba',
  name: 'WIBA',
  category: 'Property & business',
  segments: ['Business', 'Corporate', 'Cooperative'],
  company: 'CIC General Insurance',
  description: "Work Injury Benefits Act cover for employees injured at work, as employers in Kenya are required to have.",
  highlights: ['Meets WIBA requirements', 'Medical expenses for injured staff', 'Compensation for disability or death']
},
{
  id: 'professional-indemnity',
  name: 'Professional Indemnity',
  category: 'Property & business',
  segments: ['Individual'],
  company: 'CIC General Insurance',
  description: 'Protects professionals against claims arising from errors or negligence in their work.',
  highlights: ['Legal defence costs', 'Compensation claims', 'For practising professionals']
},
{
  id: 'personal-accident',
  name: 'Personal Accident',
  category: 'Personal accident',
  segments: ['Individual', 'Business', 'Corporate'],
  company: 'CIC General Insurance',
  description: 'Pays out if an accident leads to injury, disability or death, whether at work or at home.',
  highlights: ['24-hour cover', 'Medical expenses', 'Disability and death benefits']
},
{
  id: 'golfers-insurance',
  name: "Golfer's Insurance",
  category: 'Property & business',
  segments: ['Individual'],
  company: 'CIC General Insurance',
  description: 'Cover for golfers, their equipment and their liability on the course.',
  highlights: ['Golf equipment', 'Liability on the course', 'For individual golfers']
},
{
  id: 'mjengo-plus',
  name: 'Mjengo Plus Contractor All Risks',
  category: 'Property & business',
  segments: ['Individual'],
  company: 'CIC General Insurance',
  description: 'Protects the home or building you are putting up while construction is under way.',
  highlights: ['Building works in progress', 'Materials on site', 'Third party liability']
},
{
  id: 'marine-insurance',
  name: 'Marine Insurance',
  category: 'Property & business',
  segments: ['Individual', 'Business', 'Corporate'],
  company: 'CIC General Insurance',
  description: 'Covers goods you import or export against loss or damage while they are in transit.',
  highlights: ['Goods in transit', 'Imports and exports', 'Individuals and businesses']
},
{
  id: 'agriculture-insurance',
  name: 'Agriculture Insurance',
  category: 'Property & business',
  segments: ['Individual', 'Business', 'Corporate'],
  company: 'CIC General Insurance',
  description: 'Protects your crops and livestock against the risks that come with farming.',
  highlights: ['Crops', 'Livestock', 'For farmers and agribusinesses']
}];

/** The product page each category opens when a product has no page of its own. */
const categoryPage = (p: CatalogueProduct): string => {
  switch (p.category) {
    case 'Motor':return '/motor-insurance';
    case 'Medical':return '/medical-insurance';
    case 'Life & savings':return '/life-insurance';
    case 'Investments':return '/investments';
    case 'Pensions':return '/retirement';
    case 'Property & business':return p.segments.includes('Individual') ? '/home-insurance' : '/business';
    case 'Personal accident':return '/general-insurance';
  }
};

export const catalogue: CatalogueProduct[] = rawCatalogue.map((p) => ({ ...p, to: p.to ?? categoryPage(p) }));