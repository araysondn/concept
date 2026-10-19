import type { LucideIcon } from 'lucide-react';
import {
  UsersIcon, UserIcon, PiggyBankIcon, ShieldCheckIcon, StethoscopeIcon, BriefcaseIcon,
  GraduationCapIcon, HeartPulseIcon, BanknoteIcon, StoreIcon } from
'lucide-react';
import type { ContentCardData, DocumentItem, Person, Stat } from '../components/patterns';

// Sources: ke.cicinsurancegroup.com/life-assurance, /general-insurance, /microinsurance-limited and
// /microinsurance-limited-catalogue (fetched 17 Oct 2026). Product one-liners are neutral summaries written
// from the product names; the source pages list names only.

export type ProductGroup = {title: string;intro?: string;icon: LucideIcon;products: ContentCardData[];};

export type Company = {
  name: string;
  tagline: string;
  intro: string[];
  facts?: Stat[];
  factsNote?: string;
  keyPoints?: Stat[];
  groups: ProductGroup[];
  people: Person[];
  reports: DocumentItem[];
};

const p = (title: string, body: string, to = '/products'): ContentCardData => ({ title, body, link: { label: 'Tell me more', to } });

const board = (name: string, title: string): Person => ({ name, title, group: 'Board of Directors' });
const mgmt = (name: string, title: string): Person => ({ name, title, group: 'Management' });

const KE = 'https://ke.cicinsurancegroup.com/wp-content/uploads';
const CAREERS = 'https://cic.co.ke/careers/wp-content/uploads';

export const lifeAssurance: Company = {
  name: 'CIC Life Assurance',
  tagline: "Protect the people who matter most, and plan for the future you want.",
  intro: [
  'CIC Life Assurance Limited was incorporated on 29 July 2009 as a wholly owned subsidiary of CIC Insurance Group Plc, following the Insurance Regulatory Authority directive to separate life and general insurance business.',
  'It was registered and licensed on 27 November 2012, and offers a wide range of life assurance products for individuals, families, groups and cooperatives.'],

  facts: [
  { label: 'Products', value: '14' },
  { label: 'Gross written premium', value: 'KES 7.1 Bn' },
  { label: 'Total assets', value: 'KES 20.9 Bn' },
  { label: 'Market share', value: '9%' }],

  factsNote: 'Quick facts as of 2026.',
  groups: [
  {
    title: 'Group life',
    intro: 'Cover for members, borrowers and employees.',
    icon: UsersIcon,
    products: [
    p('Micro-Credit Insurance', 'Protects small loans if the borrower dies or is disabled.'),
    p('Group Funeral Expenses', 'Helps families meet funeral costs for group members.', '/microinsurance'),
    p('Group Mortgage', 'Clears an outstanding mortgage if the borrower dies.'),
    p('Loan Guard Policy', 'Covers outstanding loan balances for SACCO members.', '/cooperatives'),
    p('MEPIP', 'Group life protection for members.'),
    p('Group Life Assurance', 'Life cover for employees or members under one policy.'),
    p('Group Credit Life', 'Covers loan balances owed to lenders if a borrower dies.', '/cooperatives')]

  },
  {
    title: 'Individual life',
    intro: 'Save for the big goals and protect your family along the way.',
    icon: UserIcon,
    products: [
    p('CIC Academia Policy', "Save towards your child's education.", '/investments'),
    p('CIC Invest Plan Policy', 'A savings and investment plan for your goals.', '/investments'),
    p('Smart Saver Policy', 'A disciplined way to save regularly.', '/investments'),
    p('Board Members Insurance Plan', 'Savings and cover for cooperative board members.', '/cooperatives'),
    p('Family Life Plan', 'Life cover that looks after your family.')]

  },
  {
    title: 'Individual and group pensions',
    intro: 'Plan for retirement on your own or through your employer.',
    icon: PiggyBankIcon,
    products: [
    p('CIC Jipange Pension Plan', 'A personal pension plan for your retirement.', '/retirement'),
    p('CIC Umbrella Retirement Benefits Scheme', 'A ready-made retirement scheme for employers.', '/retirement'),
    p('Guaranteed Fund Investment', 'Investment option for occupational pension schemes.', '/retirement'),
    p('CIC Annuity Plan', 'Turns your retirement savings into a regular income.', '/retirement')]

  },
  {
    title: 'Customised life solutions',
    icon: ShieldCheckIcon,
    products: [
    p('CIC Diaspora', 'Life and savings solutions for Kenyans living abroad.'),
    p('CIC M-Bima', 'Save and stay covered from your phone.')]

  }],

  people: [
  board('Gordon Owuor', 'Non-Executive Director, representing CIC Insurance Group Plc'),
  board('Meshack Miyogo', 'Managing Director'),
  board('Michael Wambia', 'Board Member'),
  board('Patrick Nyaga', 'Group Managing Director & CEO'),
  board('Anthony Munyao', 'Director'),
  board('Anthony Chege', 'Director'),
  board('Fridaclare Katusya', 'Non-Executive Director'),
  mgmt('Meshack Miyogo', 'Managing Director'),
  mgmt('Philip Kimani', 'Group Chief Financial Officer'),
  mgmt('Susan Robi', 'Director, Risk and Compliance'),
  mgmt('Tyrus Kanja', 'Head, Life Operations'),
  mgmt('Richard Nyakenogo', 'Director, Cooperatives'),
  mgmt('Caroline A. Otieno', 'Claims Manager'),
  mgmt('Maureen K. Magoma', 'Human Resource Business Partner'),
  mgmt('Mary Wanga', 'Company Secretary'),
  mgmt('Muyesu Luvai', 'Director, Special Projects (Group Chief Internal Auditor)')],

  reports: [
  { title: 'CIC Umbrella Retirement Benefits Scheme Report & Financial Statements, Year End 2025', date: '2026', category: 'Pension scheme', meta: 'PDF', href: `${KE}/2026/08/CIC-Umbrella-2025-Signed-final-copy.pdf` },
  { title: 'CIC Jipange Pension Plan Annual Report & Financial Statements, Year End 2025', date: '2026', category: 'Pension scheme', meta: 'PDF', href: `${KE}/2026/08/CIC-Jipange-Signed-Final-copy.pdf` },
  { title: 'CIC Jipange RBS AGM Notice 2025', date: '2025', category: 'AGM notice', meta: 'PDF', href: `${KE}/2025/07/CIC-JIPANGE-RBS-AGM-NOTICE-2025-Final.pdf` },
  { title: 'CIC Umbrella RBS AGM Notice & Agenda 2025', date: '2025', category: 'AGM notice', meta: 'PDF', href: `${KE}/2025/07/CIC-Umbrella-RBS-AGM-Notice-Agenda-2025-Final.pdf` },
  { title: 'Life Conflict of Interest Policy', date: '2024', category: 'Policy', meta: 'PDF', href: `${CAREERS}/2024/01/Life-Conflict-of-Interest-Policy.pdf` },
  { title: 'CIC Life Assurance Annual Report & Financial Statements 2023', date: '2023', category: 'Annual report', meta: 'PDF', href: `${KE}/2024/08/CIC-Life-Assurance-Ltd-Annual-Report-Financial-Statements-2023.pdf` },
  { title: 'CIC Umbrella Audited Accounts FY2023', date: '2023', category: 'Pension scheme', meta: 'PDF', href: `${KE}/2024/09/CIC-Umbrella-2023-FS.pdf` },
  { title: 'CIC Jipange Audited Accounts FY2023', date: '2023', category: 'Pension scheme', meta: 'PDF', href: `${KE}/2024/09/CIC-Jipange-PPP-2023-FS.pdf` },
  { title: 'CIC Jipange Plus AGM Notice', date: '2023', category: 'AGM notice', meta: 'PDF', href: `${CAREERS}/2023/07/CIC-Jipange-Plus-AGM-Notice.pdf` },
  { title: 'CIC Umbrella AGM Notice', date: '2023', category: 'AGM notice', meta: 'PDF', href: `${CAREERS}/2023/07/CIC-Umbrella-AGM-Notice.pdf` },
  { title: 'CIC Umbrella Audited Accounts FY2022', date: '2022', category: 'Pension scheme', meta: 'PDF', href: `${CAREERS}/2023/07/CIC-Umbrella-Audited-Accounts-FY2022-signed.pdf` },
  { title: 'CIC Jipange Audited Accounts FY2022', date: '2022', category: 'Pension scheme', meta: 'PDF', href: `${CAREERS}/2023/07/CIC-Jipange-Audited-Accounts-FY2022-signed.pdf` },
  { title: 'CIC Life Assurance Annual Report 2022', date: '2022', category: 'Annual report', meta: 'PDF', href: `${CAREERS}/2023/06/CIC-LIFE-Annual-Report-2022.pdf` },
  { title: 'CIC Life Assurance Annual Report & Financial Statements 2021', date: '2021', category: 'Annual report', meta: 'PDF', href: `${CAREERS}/2022/06/CIC-Life-Assurance-Annual-Report-Financial-Statements_2021.pdf` },
  { title: 'CIC Jipange Personal Pension Plan Financial Statements 2021', date: '2021', category: 'Pension scheme', meta: 'PDF', href: `${CAREERS}/2022/09/JIPANGE-2021-FINANCIALS-signed.pdf` },
  { title: 'CIC Life Assurance Annual Report & Financial Statements 2020', date: '2020', category: 'Annual report', meta: 'PDF', href: `${CAREERS}/2021/10/CIC-Life-Assurance-2020-22-06-2021.pdf` },
  { title: 'CIC Life Assurance Annual Report & Financial Statements 2019', date: '2019', category: 'Annual report', meta: 'PDF', href: `${CAREERS}/2021/10/CIC-Life-Assurance-Report-2019-20-8-2020.pdf` },
  { title: 'CIC Life Assurance Annual Report & Financial Statements 2018', date: '2018', category: 'Annual report', meta: 'PDF', href: `${CAREERS}/2021/10/CIC-Life-Assurance-Report-2018.pdf` }]

};

export const generalInsurance: Company = {
  name: 'CIC General Insurance',
  tagline: "Protect who and what you value: your car, your home, your business and your health.",
  intro: [
  'CIC General Insurance Limited was incorporated on 29 July 2009 as a wholly owned subsidiary of CIC Insurance Group Plc, in line with the Insurance Regulatory Authority directive to separate life and general business.',
  'It was registered on 27 November 2012 and offers a wide range of general insurance products for the needs of different market segments.'],

  facts: [
  { label: 'Products', value: '62' },
  { label: 'Gross written premium', value: 'KES 20 Bn' },
  { label: 'Market share', value: '8%' }],

  factsNote: 'Quick facts as of 2026.',
  groups: [
  {
    title: 'General insurance',
    intro: 'Cover for your property, vehicles, people and liabilities.',
    icon: ShieldCheckIcon,
    products: [
    p('Motor Insurance', 'Comprehensive and third party cover for private vehicles.', '/motor-insurance'),
    p('Easy Bima', 'Motor cover you can pay for in monthly instalments.', '/motor-insurance'),
    p('Fire Industrial', 'Protects buildings, plant and stock against fire and allied perils.'),
    p('Consequential Loss', 'Covers lost income after an insured fire or damage.'),
    p('Domestic Package', 'Cover for your home and its contents.'),
    p('Burglary', 'Protects your property against break-ins and theft.'),
    p('All Risks', 'Wider cover for valuable items, at home or on the move.'),
    p('Goods in Transit', 'Protects goods while they are being transported.'),
    p('Marine', 'Cover for goods imported or exported by sea, air or road.'),
    p('Professional Indemnity', 'Protects professionals against claims of negligence.'),
    p('Machinery Breakdown', 'Covers sudden breakdown of plant and machinery.'),
    p('Electronic Equipment', 'Cover for computers and electronic equipment.'),
    p('Contractors All Risks', 'Protects construction works while they are being built.'),
    p('Erection All Risks', 'Covers the installation of machinery and equipment.'),
    p('Plate Glass', 'Covers accidental breakage of fixed glass.'),
    p('Crop', 'Protects farmers against crop losses.'),
    p('Livestock', 'Cover for death of insured livestock.'),
    p('Cash (Money) Insurance', 'Protects cash in transit and on your premises.'),
    p('Fidelity Guarantee', 'Covers losses from employee dishonesty.'),
    p('Public Liability', 'Covers your legal liability to members of the public.'),
    p('WIBA', 'Work injury cover under the Work Injury Benefits Act.', '/claims'),
    p("Employer's Liability (Common Law)", 'Covers employer liability for employee injuries beyond WIBA.'),
    p('CIC Travel Insurance', 'Cover for medical and travel emergencies abroad.'),
    p('Group Personal Accident', 'Accident cover for a group of employees or members.')]

  },
  {
    title: 'Customised products',
    intro: 'Packages built for specific customers.',
    icon: BriefcaseIcon,
    products: [
    p('CIC School Guard', 'A combined insurance package for schools.'),
    p('CIC Motor Commercial Plus', 'Cover for commercial vehicles and fleets.', '/motor-insurance'),
    p('CIC Biashara Salama', 'Loan and stock protection for small businesses.', '/microinsurance'),
    p('CIC Combined Insurance', 'One policy combining key business covers.'),
    p('CIC Property Owners Insurance', 'Cover for landlords and property owners.'),
    p('CIC Jilinde Personal Accident', 'Personal accident cover for individuals.'),
    p('CIC Students Personal Accident', 'Accident cover for students.', '/microinsurance'),
    p('CIC School Bus Insurance', 'Cover for school buses.'),
    p('CIC Lady Auto', 'Motor cover designed for women drivers.', '/motor-insurance')]

  },
  {
    title: 'Medical insurance',
    intro: 'Health cover for you, your family and your team.',
    icon: StethoscopeIcon,
    products: [
    p('Family Health Insurance', 'Medical cover for you and your family.'),
    p('CIC Medisure Corporate', 'In-patient medical cover for employers.', '/corporates'),
    p('CIC Medipack (SME)', 'Medical cover for small and medium businesses.', '/business'),
    p('CIC Afya Bora', 'Medical cover for cooperative members.', '/cooperatives'),
    p('Seniors Mediplan', 'Medical cover for older adults.')]

  }],

  people: [
  board('Rose Mambo', 'Chairperson, Independent Non-Executive Director'),
  board('Edwin Otieno', 'Non-Executive Director'),
  board('Joseph Gatuni', 'Non-Executive Director, representing Co-operative Bank of Kenya'),
  board('Jackson Mbui', 'Director'),
  board('Jane Mbatia', 'Director'),
  board('Edwin Makori', 'Director'),
  board('Patrick Nyaga', 'Group Managing Director & CEO'),
  board('Fred Ruoro', 'Managing Director'),
  mgmt('Philip Kimani', 'Group Chief Financial Officer'),
  mgmt("Kang'e N. McDonald", 'Head of Medical'),
  mgmt('Faith Muriungi', 'Senior Manager, Underwriting'),
  mgmt('Mwenda P. Itumbiri', 'Senior P&C Business Partner, GB, Pharmacy & Group Functions'),
  mgmt('Susan Robi', 'Director, Risk and Compliance'),
  mgmt('Mary Wanga', 'Company Secretary'),
  mgmt('Vicky Kagema', 'Head of Sales, General Business'),
  mgmt('Edward Thagichu', 'Senior Finance Manager, General Business'),
  mgmt('Cyril T. Juma', 'Ag. Group Actuary'),
  mgmt('Scovier Juma', 'Senior Manager, Claims'),
  mgmt('Victor Otieno', 'ICT Manager, General Business'),
  mgmt('Henry Njerenga', 'Director, Branch & Distribution')],

  reports: [
  { title: 'GB Conflict of Interest Policy', date: '2024', category: 'Policy', meta: 'PDF', href: `${CAREERS}/2024/01/GB-Conflict-of-Interest-Policy.pdf` },
  { title: 'CIC General Insurance Annual Report & Financial Statements 2023', date: '2023', category: 'Annual report', meta: 'PDF', href: `${KE}/2024/08/CIC-General-Insurance-Ltd-Annual-Report-Financial-Statements-2023.pdf` },
  { title: 'CIC General Business Annual Report 2022', date: '2022', category: 'Annual report', meta: 'PDF', href: `${CAREERS}/2023/06/CIC-General-Business-Annual-Report-2022.pdf` },
  { title: 'CIC General Business Annual Report & Financial Statements 2021', date: '2021', category: 'Annual report', meta: 'PDF', href: `${CAREERS}/2022/06/CIC-General-Insurance-Annual-Report-Financial-Statements_2021.pdf` },
  { title: 'CIC General Business Annual Report & Financial Statements 2020', date: '2020', category: 'Annual report', meta: 'PDF', href: `${CAREERS}/2021/10/CIC-General-Business-22-06-2021.pdf` },
  { title: 'CIC General Business Annual Report & Financial Statements 2019', date: '2019', category: 'Annual report', meta: 'PDF', href: `${CAREERS}/2021/10/CIC-General-Business-2019-20-8-20.pdf` },
  { title: 'CIC General Business Annual Report & Financial Statements 2018', date: '2018', category: 'Annual report', meta: 'PDF', href: `${CAREERS}/2021/10/CIC-General-Business-2018.pdf` }]

};

export const microinsurance: Company = {
  name: 'CIC Microinsurance',
  tagline: 'Simple, affordable and accessible cover for individuals, households, groups and small businesses.',
  intro: [
  'CIC Microinsurance Limited was incorporated in 2021 as a wholly owned subsidiary of CIC Insurance Group Plc. It is licensed by the Insurance Regulatory Authority to underwrite microinsurance in Kenya under the Insurance (Microinsurance) Regulations, 2020 and the Insurance Act, Cap 487.',
  'Building on CIC’s history of financial inclusion, it offers simple, affordable and accessible insurance across life, health, accident, savings, funeral and property microinsurance, backed by strong risk management, digital capabilities and efficient service.'],

  keyPoints: [
  { label: 'Incorporated', value: '2021' },
  { label: 'Regulated by', value: 'IRA' },
  { label: 'Products in catalogue', value: '6' }],

  groups: [
  {
    title: 'Our product portfolio',
    intro: 'Affordable protection for individuals, families, farmers and businesses in Kenya.',
    icon: HeartPulseIcon,
    products: [
    {
      title: 'CoopCare Medical Cover',
      icon: StethoscopeIcon,
      eyebrow: 'For SACCOs, cooperatives, MFIs and registered groups',
      body: 'Medical cover for registered groups that eases the cost of healthcare.',
      points: ['In-patient cover of KES 100K to 300K', 'Out-patient cover of KES 30K to 50K', 'Built-in maternity, dental and optical benefits', 'Chronic and pre-existing conditions covered', 'Family cover up to M+6']
    },
    {
      title: 'Group Funeral Expense Cover',
      icon: UsersIcon,
      eyebrow: 'For welfare groups, SACCOs, employers and faith-based groups',
      body: 'Dignity and financial support when it matters most. For registered groups of at least 20 principal members.',
      points: ['Cover from KES 50,000 to KES 500,000', 'Nuclear and extended family options', 'Optional parents and in-laws cover', 'No upper exit age', 'Optional school fees or medical bills welfare protection']
    },
    {
      title: 'Hospital Cash Benefit',
      icon: BanknoteIcon,
      eyebrow: 'For informal sector workers, casual labourers and MSMEs',
      body: 'Income protection while you are in hospital.',
      points: ['Daily cash payout during hospital stays', 'Covers illness and accidents', 'Payments start from the 3rd day', 'Annual benefit of up to KES 50,000', 'Optional lodger fees']
    },
    {
      title: 'Biashara Salama',
      icon: StoreIcon,
      eyebrow: 'For SACCO and MFI borrowers and SMEs',
      body: 'Protects your loan and your stock, so your business can keep going.',
      points: ['Credit life insurance', 'Permanent disability cover', 'Fire and burglary protection for stock', 'Optional last expense and political violence cover']
    },
    {
      title: 'Jikinge Guards Cover',
      icon: ShieldCheckIcon,
      eyebrow: 'For security guards',
      body: 'Affordable protection for security personnel.',
      points: ['Life and disability cover', 'Accidental medical expenses', 'Weekly hospitalisation benefit', 'Funeral expense cover', 'No medical tests required']
    },
    {
      title: 'Student Personal Accident',
      icon: GraduationCapIcon,
      eyebrow: 'For schools, universities, TVETs and students on attachment',
      body: 'Protection against accidental injuries, 24/7, so learning can continue.',
      points: ['Life and disability cover', 'Accidental medical expenses', 'Weekly hospitalisation benefit', 'Funeral expense cover']
    }]

  }],

  people: [
  board('Rosemary Macharia', 'Independent Non-Executive Director'),
  board('Anne Kamau', 'Independent Non-Executive Director'),
  board('George Muiruri', 'Independent Non-Executive Director'),
  board('Christine Kahema', 'Independent Non-Executive Director'),
  board('Patrick Nyaga', 'Director; Group Managing Director & CEO'),
  board('Mary Wanga', 'Company Secretary'),
  board('Helen Osore', 'Principal Officer / Managing Director'),
  mgmt('Helen Osore', 'Principal Officer / Managing Director'),
  mgmt('Douglas Mbugua', 'Head of Distribution, Sales & Partnerships'),
  mgmt('Susan Robi', 'Director, Risk & Compliance'),
  mgmt('Cyril Juma', 'Ag. Group Actuary'),
  mgmt('Mary Wanga', 'Company Secretary'),
  mgmt('Elizabeth Njuguna', 'P&C Business Partner'),
  mgmt('Mercy Mandela', 'Finance Manager'),
  mgmt('Yolanda V. Macharia', 'Claims Manager'),
  mgmt('Sarah Wakonyo', 'Underwriter'),
  mgmt('Lyceline Bina', 'Training Officer')],

  reports: [
  { title: 'CIC Microinsurance 2025 Annual Report & Financial Statements', date: '2026', category: 'Annual report', meta: 'PDF', href: `${KE}/2026/09/2025-Microinsurance-Financials-FINAL-Booklet.pdf` },
  { title: 'CIC Microinsurance 2024 Annual Report & Financial Statements', date: '2024', category: 'Annual report', meta: 'PDF', href: `${KE}/2026/09/CIC-Microinsurance-2024-FINAL-FS.pdf` }]

};
