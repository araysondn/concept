import type { LucideIcon } from 'lucide-react';
import {
  BriefcaseIcon,
  BuildingIcon,
  CarIcon,
  ClipboardCheckIcon,
  CogIcon,
  CpuIcon,
  FlameIcon,
  GraduationCapIcon,
  HandCoinsIcon,
  HardHatIcon,
  HeartPulseIcon,
  LockIcon,
  PiggyBankIcon,
  ScaleIcon,
  ShieldCheckIcon,
  ShipIcon,
  SmartphoneIcon,
  SquareIcon,
  SproutIcon,
  StoreIcon,
  TrendingUpIcon,
  TruckIcon,
  UmbrellaIcon,
  UsersIcon } from
'lucide-react';

export type SegmentProduct = {name: string;body: string;icon: LucideIcon;to: string;};
export type ProductGroup = {id: string;title: string;intro: string;products: SegmentProduct[];};
export type HelpLink = {label: string;icon: LucideIcon;to: string;};
export type Promo = {title: string;body: string;link: {label: string;to: string;};tone: 'red' | 'wine' | 'pink' | 'dark';};

export type SegmentPageData = {
  breadcrumb: string;
  hero: {title: string;intro: string;image?: string;ctas: {label: string;to: string;}[];};
  helpTitle: string;
  help: HelpLink[];
  groups: ProductGroup[];
  promos: Promo[];
  story?: {title: string;paragraphs: string[];stats: {label: string;value: string;}[];};
};

// Product lists follow the CIC Kenya solutions pages. Card copy is written for this design concept;
// it describes what each cover is for and makes no claims about prices, limits or returns.
const p = {
  fireIndustrial: { name: 'Fire Industrial', body: 'Protects your buildings, plant and stock against fire and related perils.', icon: FlameIcon, to: '/general-insurance' },
  employersLiability: { name: 'Employers Liability', body: 'Covers your legal liability if an employee is injured or falls ill because of their work.', icon: HardHatIcon, to: '/general-insurance' },
  publicLiability: { name: 'Public Liability', body: 'Covers your liability if your business causes injury or damage to members of the public.', icon: UsersIcon, to: '/general-insurance' },
  motorPrivate: { name: 'Motor Private Insurance', body: 'Comprehensive or third party cover for the cars you and your team drive.', icon: CarIcon, to: '/motor-insurance' },
  contractors: { name: 'Contractors All Risks', body: 'Covers building works, materials on site and third party liability while a project is under way.', icon: HardHatIcon, to: '/general-insurance' },
  schoolGuard: { name: 'School Guard', body: 'A cover package put together for schools and other learning institutions.', icon: GraduationCapIcon, to: '/general-insurance' },
  businessCombined: { name: 'Business Combined Policy', body: 'Several business covers bundled into one policy, so you have one renewal to manage.', icon: BriefcaseIcon, to: '/general-insurance' },
  burglary: { name: 'Burglary', body: 'Covers loss or damage to your property after a break-in at your premises.', icon: LockIcon, to: '/general-insurance' },
  marine: { name: 'Marine Insurance', body: 'Covers goods you import or export while they are in transit.', icon: ShipIcon, to: '/general-insurance' },
  agriculture: { name: 'Agriculture Insurance', body: 'Protects crops and livestock against the risks that come with farming.', icon: SproutIcon, to: '/general-insurance' },
  professional: { name: 'Professional Indemnity', body: 'Covers claims that arise from errors or negligence in the professional services you give.', icon: ScaleIcon, to: '/general-insurance' },
  biasharaSalama: { name: 'Biashara Salama', body: 'Protects the stock and machinery your business depends on.', icon: StoreIcon, to: '/general-insurance' },
  mpesaAgents: { name: 'M-PESA Agents Insurance Package', body: 'A cover package designed around the day-to-day risks of running an M-PESA agency.', icon: SmartphoneIcon, to: '/general-insurance' },
  motorCommercial: { name: 'Motor Commercial', body: 'Cover for vehicles that carry goods or passengers for your business.', icon: TruckIcon, to: '/motor-insurance' },
  plateGlass: { name: 'Plate Glass', body: 'Covers accidental breakage of the fixed glass at your premises.', icon: SquareIcon, to: '/general-insurance' },
  erection: { name: 'Erection All Risks', body: 'Covers the installation of plant and machinery, from delivery to testing.', icon: CogIcon, to: '/general-insurance' },
  machinery: { name: 'Machinery Breakdown', body: 'Covers sudden breakdown of the machinery that keeps your operations running.', icon: CogIcon, to: '/general-insurance' },
  electronic: { name: 'Electronic Equipment', body: 'Protects computers and other electronic equipment against accidental loss or damage.', icon: CpuIcon, to: '/general-insurance' },
  investment: { name: 'Investment Solutions', body: 'Unit trust funds managed by CIC Asset Management, from low-risk to growth.', icon: TrendingUpIcon, to: '/investments' },
  savings: { name: 'Savings Solutions', body: 'Ways to put money aside regularly for the goals that matter to you.', icon: PiggyBankIcon, to: '/investments' },
  retirement: { name: 'Retirement Solutions', body: 'Pension plans and umbrella schemes for you and your staff.', icon: UmbrellaIcon, to: '/retirement' },
  smeMedipack: { name: 'Health Solutions (SME Medipack)', body: 'Medical cover for the people who work in your small or medium business.', icon: HeartPulseIcon, to: '/products' },
  corporateMedical: { name: 'Health Solutions (Corporate Medical Cover)', body: 'Group medical cover for your employees and their families.', icon: HeartPulseIcon, to: '/products' },
  lifeProtection: { name: 'Life Protection Solutions', body: 'Group life covers that support your employees’ families when it matters most.', icon: ShieldCheckIcon, to: '/life-assurance' },
  accident: { name: 'Accident', body: 'Pays out if an accident leads to injury, disability or death.', icon: HeartPulseIcon, to: '/products' }
} satisfies Record<string, SegmentProduct>;

export const businessPage: SegmentPageData = {
  breadcrumb: 'Business',
  hero: {
    title: 'Your business, covered',
    intro: 'We take care of your business, so that you can take care of business.',
    ctas: [
    { label: 'Get a quote', to: '/products' },
    { label: 'Make a claim', to: '/claims' }]

  },
  helpTitle: 'How can we help your business?',
  help: [
  { label: 'Protect my premises', icon: BuildingIcon, to: '#protect' },
  { label: 'Cover my vehicles', icon: TruckIcon, to: '/motor-insurance' },
  { label: 'Look after my staff', icon: UsersIcon, to: '#people' },
  { label: 'Grow my money', icon: TrendingUpIcon, to: '/investments' },
  { label: 'Set up a staff pension', icon: UmbrellaIcon, to: '/retirement' },
  { label: 'Make a claim', icon: ClipboardCheckIcon, to: '/claims' }],

  groups: [
  {
    id: 'protect',
    title: 'Protect your investments',
    intro: 'We know that you have invested in your business. Let us help you protect it.',
    products: [
    p.fireIndustrial, p.employersLiability, p.publicLiability, p.motorPrivate, p.contractors, p.schoolGuard,
    p.businessCombined, p.burglary, p.marine, p.agriculture, p.professional, p.biasharaSalama,
    p.mpesaAgents, p.motorCommercial, p.plateGlass]

  },
  {
    id: 'grow',
    title: 'Grow your business',
    intro: 'Ready to take your business to the next level? Put your money to work.',
    products: [p.investment, p.savings, p.retirement]
  },
  {
    id: 'people',
    title: 'Protect the people you value',
    intro: 'Good help is hard to find. Look after the people who make your business work.',
    products: [p.smeMedipack, p.lifeProtection, p.accident]
  }],

  promos: [
  {
    title: 'A staff pension without the paperwork',
    body: 'With CIC Jipange Plus or the CIC Umbrella Retirement Benefits Scheme, you can offer your team a pension without registering a scheme of your own.',
    link: { label: 'Explore retirement', to: '/retirement' },
    tone: 'red'
  },
  {
    title: 'Medical cover for your team',
    body: 'SME Medipack gives the people in your small or medium business access to medical cover.',
    link: { label: 'Tell me more', to: '/products' },
    tone: 'wine'
  }]

};

export const corporatesPage: SegmentPageData = {
  breadcrumb: 'Corporates',
  hero: {
    title: 'Keep going, with us beside you',
    intro: 'You have worked hard to get here. We are here to make sure that you keep going.',
    ctas: [
    { label: 'Talk to us', to: '/contact-us' },
    { label: 'Make a claim', to: '/claims' }]

  },
  helpTitle: 'How can we help your organisation?',
  help: [
  { label: 'Protect my assets', icon: BuildingIcon, to: '#protect' },
  { label: 'Insure my fleet', icon: TruckIcon, to: '/motor-insurance' },
  { label: 'Employee benefits', icon: UsersIcon, to: '#people' },
  { label: 'Invest our funds', icon: TrendingUpIcon, to: '/investments' },
  { label: 'Retirement schemes', icon: UmbrellaIcon, to: '/retirement' },
  { label: 'Make a claim', icon: ClipboardCheckIcon, to: '/claims' }],

  groups: [
  {
    id: 'protect',
    title: 'Protect your investments',
    intro: 'Business is risky. There are so many uncertainties, but you can sleep better knowing that we have you covered.',
    products: [
    p.fireIndustrial, p.contractors, p.motorPrivate, p.professional, p.erection, p.machinery, p.electronic,
    p.employersLiability, p.publicLiability, p.schoolGuard, p.motorCommercial, p.plateGlass, p.marine,
    p.burglary, p.agriculture]

  },
  {
    id: 'grow',
    title: 'Go further with your investments',
    intro: 'Want to diversify your portfolio while keeping risk in check? Our portfolio and investment managers are here for you.',
    products: [p.investment, p.savings, p.retirement]
  },
  {
    id: 'people',
    title: 'Protect your most valued people',
    intro: 'Your people got you here. Look after their health and their families.',
    products: [p.corporateMedical, p.lifeProtection, p.accident]
  }],

  promos: [
  {
    title: 'Retirement schemes, managed for you',
    body: 'The CICAM Segregated Umbrella Fund lets larger organisations offer a segregated scheme without carrying the legal, administrative and statutory load themselves.',
    link: { label: 'Explore retirement', to: '/retirement' },
    tone: 'red'
  },
  {
    title: 'Put your reserves to work',
    body: 'CIC Asset Management runs a range of unit trust funds, including the CIC Money Market Fund.',
    link: { label: 'View our funds', to: '/investments' },
    tone: 'wine'
  }]

};

export const cooperativesPage: SegmentPageData = {
  breadcrumb: 'Cooperatives',
  hero: {
    title: 'Born from the cooperative movement',
    intro: 'We started as part of the cooperative movement in 1968, and we still live the cooperative spirit. Let us help your SACCO or cooperative protect and grow what members have built together.',
    image: '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg',
    ctas: [
    { label: 'Talk to us', to: '/contact-us' },
    { label: 'Make a claim', to: '/claims' }]

  },
  helpTitle: 'How can we help your cooperative?',
  help: [
  { label: 'Protect member loans', icon: HandCoinsIcon, to: '#members' },
  { label: 'Cover our property', icon: BuildingIcon, to: '#protect' },
  { label: 'Insure our vehicles', icon: TruckIcon, to: '/motor-insurance' },
  { label: 'Medical cover', icon: HeartPulseIcon, to: '#members' },
  { label: 'Invest our funds', icon: TrendingUpIcon, to: '/investments' },
  { label: 'Retirement scheme', icon: UmbrellaIcon, to: '/retirement' }],

  groups: [
  {
    id: 'members',
    title: 'Look after your members',
    intro: 'Cover that protects members, their loans and the people who run your cooperative.',
    products: [
    { name: 'Loan Guard', body: 'Helps make sure a member’s loan is repaid if the unexpected happens.', icon: HandCoinsIcon, to: '/life-assurance' },
    { name: 'Group Credit Life', body: 'Life cover that settles outstanding member loans for the group.', icon: ShieldCheckIcon, to: '/life-assurance' },
    { name: 'Employee Group Life', body: 'Life cover for the people your cooperative employs.', icon: UsersIcon, to: '/life-assurance' },
    { name: 'Board Endowment', body: 'A savings and protection plan designed for board members.', icon: PiggyBankIcon, to: '/life-assurance' },
    { name: 'CoopCare Health Insurance', body: 'Medical cover designed for cooperative members and their families.', icon: HeartPulseIcon, to: '/products' }]

  },
  {
    id: 'protect',
    title: 'Protect what you own together',
    intro: 'Your cooperative’s buildings, vehicles and staff, covered.',
    products: [
    { ...p.fireIndustrial },
    { ...p.motorCommercial },
    { name: 'WIBA', body: 'Work Injury Benefits Act cover for your employees, as Kenyan employers are required to have.', icon: HardHatIcon, to: '/general-insurance' }]

  },
  {
    id: 'grow',
    title: 'Grow your cooperative’s money',
    intro: 'Invest surplus funds and plan for your staff’s retirement.',
    products: [
    { name: 'CIC Money Market Fund', body: 'A low-risk unit trust with interest calculated daily. Start from KES 5,000.', icon: TrendingUpIcon, to: '/investments' },
    { name: 'CIC Umbrella Retirement Benefits Scheme', body: 'A multi-employer pension scheme, so you can offer a pension without setting up your own.', icon: UmbrellaIcon, to: '/retirement' }]

  }],

  promos: [
  {
    title: 'The cooperative insurer',
    body: 'CIC is the only cooperative insurance group listed on the Nairobi Securities Exchange.',
    link: { label: 'Our story', to: '/about/history' },
    tone: 'red'
  },
  {
    title: 'Retirement for your staff',
    body: 'The CIC Umbrella Retirement Benefits Scheme is NSSF Act 2013 Tier II compliant.',
    link: { label: 'Explore retirement', to: '/retirement' },
    tone: 'wine'
  }],

  story: {
    title: 'Our cooperative roots',
    paragraphs: [
    'CIC began in 1968 as a department of the Kenya National Federation of Cooperatives (KNFC). Since then we have grown into a leading cooperative enterprise and micro-insurer in Africa.',
    'We still serve cooperatives, SACCOs and their members across Kenya, and we live by our core value of cooperation.'],

    stats: [
    { label: 'Founded', value: '1968' },
    { label: 'Origin', value: 'KNFC' },
    { label: 'Listed on', value: 'NSE' }]

  }
};

