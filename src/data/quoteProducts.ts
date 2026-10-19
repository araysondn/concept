import type { LucideIcon } from 'lucide-react';
import {
  AmbulanceIcon, BadgeCheckIcon, BanknoteIcon, CalendarClockIcon, CarIcon, ClockIcon, CoinsIcon, FlameIcon,
  GraduationCapIcon, HeartHandshakeIcon, HeartPulseIcon, HomeIcon, LandmarkIcon, LockKeyholeIcon, PiggyBankIcon,
  ShieldCheckIcon, SmartphoneIcon, StethoscopeIcon, TrendingUpIcon, TruckIcon, UmbrellaIcon, UsersIcon, WalletIcon,
  WrenchIcon } from
'lucide-react';
import type { DocumentItem } from '../components/patterns';
import { catalogue, type CatalogueProduct, type ProductCategory } from './products';

/**
 * Product detail + checkout content for the design concept.
 * Rich products get a quote configurator with ILLUSTRATIVE pricing (assumed rates, clearly labelled — not CIC rates).
 * Every other catalogue product gets a generated page with an enquiry card.
 */

export type QuoteKind = 'motor' | 'medical' | 'education' | 'pension' | 'home' | 'accident' | 'invest';

export type Feature = {title: string;body: string;icon: LucideIcon;image?: string;};
export type Benefit = {title: string;body: string;icon: LucideIcon;};
export type AddOn = {id: string;title: string;body: string;monthly: number;};
export type FaqTopic = 'Cover' | 'Claims' | 'Payments';
export type Faq = {q: string;a: string;topic: FaqTopic;};
export type YesNoQuestion = {id: string;q: string;};

export type RichProduct = {
  id: string;
  kind: QuoteKind;
  hero: {image: string;imagePosition?: string;promise: string;};
  intro: {title: string;paragraphs: string[];image: string;imagePosition?: string;};
  features: Feature[];
  benefits: Benefit[];
  addOns: AddOn[];
  documents: DocumentItem[];
  faqs: Faq[];
  questions: YesNoQuestion[];
  /** Illustrative starting price per month, from the default configurator inputs. */
  related: string[];
};

const WP = 'https://ke.cicinsurancegroup.com/wp-content/uploads';

export const img = {
  road: '/7f50d32d-99b7-46c8-b6cd-8e6f6eb8c57b.jpg',
  car: '/61b1c60f-1640-4392-a6e3-cdb773233a6e.jpg',
  carLot: '/0bcd69ea-59f9-4a30-92ae-6a8ff9493590.jpg',
  extras: '/a54231cd-cca7-428f-b23b-e72920a338e8.jpg',
  adviser: '/d694dffc-d1e8-4a02-b91b-a3916205270c.jpg',
  smile: '/953d4772-30ed-48cf-9516-b192cb47b7e0.jpg',
  office: '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg',
  thinking: '/5edc0fda-3296-43a7-9b4b-1fb06fa2c3e0.jpg',
  commute: '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg',
  students: '/19f98733-386d-4c89-bb7e-c68bd62f3cc7.jpg',
  sky: '/a84679f1-42c0-4e9b-ab49-645ec6530114.jpg',
  chart: '/04fbb304-f647-46e9-b229-2e5497528707.jpg'
};

const healthQuestions: YesNoQuestion[] = [
{ id: 'diagnosed', q: 'Have you ever been diagnosed with or treated for cancer, heart disease or stroke?' },
{ id: 'hospitalised', q: 'In the past 5 years, have you been in hospital for more than 7 days in a row?' },
{ id: 'awaiting', q: 'Are you waiting for any medical test results or referrals?' }];


const motorQuestions: YesNoQuestion[] = [
{ id: 'accident', q: 'Has this vehicle been in an accident or had a claim in the last 3 years?' },
{ id: 'hire', q: 'Is the vehicle used to carry fare-paying passengers or goods for hire?' },
{ id: 'modified', q: 'Has the vehicle been modified from the manufacturer’s specification?' }];


const motorAddOns: AddOn[] = [
{ id: 'excess', title: 'Excess waiver', body: 'Pay no excess on an own-damage claim, so a bump doesn’t cost you out of pocket.', monthly: 450 },
{ id: 'pvt', title: 'Political violence & terrorism', body: 'Extends your cover to damage caused by political violence or terrorism.', monthly: 300 },
{ id: 'courtesy', title: 'Courtesy car', body: 'Keep moving with a courtesy car while yours is being repaired after a claim.', monthly: 600 }];


const motorFaqs: Faq[] = [
{ topic: 'Cover', q: 'What’s the difference between comprehensive and third party cover?', a: 'Third party cover pays for damage or injury you cause to other people and their property — it’s the legal minimum under the Traffic Act (Cap 405). Comprehensive cover adds your own car: accidental damage, theft, fire, riot, malicious damage and floods.' },
{ topic: 'Cover', q: 'What extra benefits come with comprehensive cover?', a: 'Towing, motoring assist, emergency medical expenses, windscreen cover and cover for your stereo or entertainment unit.' },
{ topic: 'Claims', q: 'What should I do after an accident?', a: 'Report it to the police immediately — no later than 24 hours — and get a police abstract. Then report it to us on 0703 099 120 or 020 282 3000. Don’t admit liability at the scene.' },
{ topic: 'Claims', q: 'Do I pay an excess?', a: 'Yes, for some claims. For example, the Easy Bima brochure sets own damage and partial theft at 2.5% of the sum insured (min KES 20,000, max KES 100,000). An excess waiver add-on removes it.' },
{ topic: 'Payments', q: 'Can I pay monthly?', a: 'Yes. With CIC Easy Bima you can spread your comprehensive premium over up to 12 monthly instalments.' }];


const lifeClaimsFaq: Faq = { topic: 'Claims', q: 'How does my family make a claim?', a: 'Call us on 0703 099 120 or email lifecare@cic.co.ke. We’ll send the claim form and list of documents and guide your family through every step.' };
const payMpesaFaq: Faq = { topic: 'Payments', q: 'How can I pay?', a: 'By M-PESA, standing order or bank transfer. You can choose to pay monthly or once a year.' };

export const richProducts: RichProduct[] = [
{
  id: 'easy-bima',
  kind: 'motor',
  hero: { image: img.road, promise: 'Comprehensive motor cover you can pay for monthly — up to 12 instalments.' },
  intro: {
    title: 'Drive with full cover, pay as you go',
    paragraphs: [
    'CIC Easy Bima gives you comprehensive motor insurance without the big once-a-year payment. Spread your premium over up to 12 monthly instalments and keep your car fully protected.',
    'You’re covered for accidental damage, theft, fire, third party liability, riot and floods — with towing and motoring assist when you need a hand.'],

    image: img.car
  },
  features: [
  { title: 'Pay monthly', body: 'Up to 12 instalments instead of one annual premium.', icon: CalendarClockIcon, image: img.car },
  { title: 'Comprehensive cover', body: 'Your car, other people and their property.', icon: ShieldCheckIcon, image: img.road },
  { title: 'Help on the road', body: 'Towing and motoring assist when you need it.', icon: TruckIcon, image: img.carLot }],

  benefits: [
  { title: 'Accidental and malicious damage', body: 'Repairs to your car after an accident or deliberate damage.', icon: CarIcon },
  { title: 'Theft and fire', body: 'Cover if your car is stolen or damaged by fire.', icon: FlameIcon },
  { title: 'Third party liability', body: 'Injury to other people and damage to their property.', icon: UsersIcon },
  { title: 'Windscreen and entertainment unit', body: 'Glass and your stereo or entertainment unit are included.', icon: WrenchIcon },
  { title: 'Emergency medical expenses', body: 'Immediate medical costs after an accident.', icon: AmbulanceIcon }],

  addOns: motorAddOns,
  documents: [
  { title: 'CIC Easy Bima brochure', category: 'Brochure', meta: 'PDF', href: `${WP}/2024/04/CIC-GENERAL-Easy-Bima-Brochure_V.07_2023.pdf` },
  { title: 'Motor Claim Form', category: 'Claim form', meta: 'PDF', href: `${WP}/2021/09/CIC-GENERAL-Motor-Insurance-Claim-Form.pdf` },
  { title: 'Policy wording', category: 'Policy document', meta: 'Available on request' }],

  faqs: motorFaqs,
  questions: motorQuestions,
  related: ['motor-private', 'personal-accident', 'home-insurance']
},
{
  id: 'motor-private',
  kind: 'motor',
  hero: { image: img.road, promise: 'Comprehensive or third party cover for the car you and your family rely on.' },
  intro: {
    title: 'Cover for every journey',
    paragraphs: [
    'Motor Private Insurance protects vehicles used for personal and family travel. Choose comprehensive cover for your own car as well as other people, or third party cover — the legal minimum.',
    'Add an excess waiver, a courtesy car or political violence and terrorism cover to make it yours.'],

    image: img.carLot
  },
  features: [
  { title: 'Choose your cover', body: 'Comprehensive or third party only.', icon: ShieldCheckIcon, image: img.road },
  { title: 'Approved garages', body: 'Repairs at CIC approved garages across Kenya.', icon: WrenchIcon, image: img.carLot },
  { title: 'We’re there 24/7', body: 'Towing with AA of Kenya on comprehensive cover.', icon: TruckIcon, image: img.car }],

  benefits: [
  { title: 'Accidental damage, theft and fire', body: 'Your car is protected against the most common risks.', icon: CarIcon },
  { title: 'Third party liability', body: 'Injury to other people and damage to their property.', icon: UsersIcon },
  { title: 'Riot, strike and floods', body: 'Damage from civil commotion and flooding.', icon: UmbrellaIcon },
  { title: 'Towing and motoring assist', body: 'Help getting your car to safety and repaired.', icon: TruckIcon }],

  addOns: motorAddOns,
  documents: [
  { title: 'Motor Private brochure', category: 'Brochure', meta: 'PDF', href: `${WP}/2022/10/CIC-GENERAL-Motor-Private-Brochure_V.082021.pdf` },
  { title: 'Motor Claim Form', category: 'Claim form', meta: 'PDF', href: `${WP}/2021/09/CIC-GENERAL-Motor-Insurance-Claim-Form.pdf` },
  { title: 'Policy wording', category: 'Policy document', meta: 'Available on request' }],

  faqs: motorFaqs,
  questions: motorQuestions,
  related: ['easy-bima', 'personal-accident', 'home-insurance']
},
{
  id: 'seniors-mediplan',
  kind: 'medical',
  hero: { image: img.thinking, promise: 'Medical cover designed for you in your sixties and beyond.' },
  intro: {
    title: 'Quality care, whatever your age',
    paragraphs: [
    'Seniors Mediplan is medical cover for older customers who want continued access to quality care. Choose your inpatient limit and add outpatient cover if you need it.',
    'From CIC General Insurance — named Medical Underwriter of the Year (Group Medical) at the 2023 Think Business Insurance Awards.'],

    image: img.smile
  },
  features: [
  { title: 'Made for seniors', body: 'Cover designed for customers aged 60 and over.', icon: HeartHandshakeIcon, image: img.thinking },
  { title: 'Wide provider network', body: 'Hospitals and clinics on our provider panels.', icon: StethoscopeIcon, image: img.smile },
  { title: 'Award-winning team', body: 'Medical Underwriter of the Year, Group Medical, 2023.', icon: BadgeCheckIcon, image: img.office }],

  benefits: [
  { title: 'Inpatient cover', body: 'Hospital stays, surgery and treatment up to your chosen limit.', icon: HeartPulseIcon },
  { title: 'Outpatient options', body: 'Doctor visits and prescribed medicine, if you add it.', icon: StethoscopeIcon },
  { title: 'Provider panels', body: 'Get treated at hospitals and clinics on our panel.', icon: UsersIcon },
  { title: 'CIC Pharmacy', body: 'Order medicine on WhatsApp with home delivery.', icon: SmartphoneIcon }],

  addOns: [
  { id: 'outpatient', title: 'Outpatient cover', body: 'Doctor visits, tests and prescribed medicine outside hospital.', monthly: 1800 },
  { id: 'dental-optical', title: 'Dental and optical', body: 'Check-ups, treatment and glasses up to a set limit.', monthly: 650 },
  { id: 'last-expense', title: 'Last expense', body: 'A lump sum towards funeral costs.', monthly: 250 }],

  documents: [
  { title: 'Seniors Mediplan brochure', category: 'Brochure', meta: 'Available on request' },
  { title: 'Medical provider panels', category: 'Provider panel', meta: 'See the Claims page', href: '/claims#provider-panels' }],

  faqs: [
  { topic: 'Cover', q: 'Who can join Seniors Mediplan?', a: 'It’s designed for customers aged 60 and over. Your adviser will confirm the joining age and any waiting periods when you get a quote.' },
  { topic: 'Cover', q: 'Are pre-existing conditions covered?', a: 'This depends on your health declaration. We’ll confirm what’s covered before your policy starts.' },
  { topic: 'Claims', q: 'How do I get treated?', a: 'Visit a hospital or clinic on our provider panel and show your membership card. The provider bills us directly up to your limits.' },
  payMpesaFaq],

  questions: healthQuestions,
  related: ['personal-accident', 'academia', 'jipange-plus']
},
{
  id: 'academia',
  kind: 'education',
  hero: { image: img.students, promise: 'Save for your child’s education, with life cover built in.' },
  intro: {
    title: 'Their future, planned today',
    paragraphs: [
    'Academia is a savings plan that helps you put money aside for your child’s school and university fees, with life cover for you built in.',
    'Payouts are timed to your child’s education milestones, so the money is there when the fees are due.'],

    image: img.commute
  },
  features: [
  { title: 'Save towards fees', body: 'A disciplined plan for school and university.', icon: GraduationCapIcon, image: img.students },
  { title: 'Life cover built in', body: 'Protection for the parent paying in.', icon: ShieldCheckIcon, image: img.commute },
  { title: 'Paid on time', body: 'Payouts timed to education milestones.', icon: CalendarClockIcon, image: img.office }],

  benefits: [
  { title: 'Education milestone payouts', body: 'Money released when your child needs it most.', icon: GraduationCapIcon },
  { title: 'Life cover for the parent', body: 'Protects your child’s plan if the unexpected happens.', icon: HeartHandshakeIcon },
  { title: 'Flexible contributions', body: 'Pay monthly or once a year.', icon: WalletIcon }],

  addOns: [
  { id: 'waiver', title: 'Premium waiver', body: 'We keep paying in for you if you die or become permanently disabled.', monthly: 350 },
  { id: 'ci', title: 'Critical illness rider', body: 'A lump sum if you’re diagnosed with a covered critical illness.', monthly: 500 }],

  documents: [
  { title: 'Academia brochure', category: 'Brochure', meta: 'Available on request' },
  { title: 'Death Claim Form', category: 'Claim form', meta: 'PDF', href: `${WP}/2021/09/Death-Claim-Form.pdf` },
  { title: 'Critical Illness Claim Form', category: 'Claim form', meta: 'PDF', href: `${WP}/2021/09/Critical-Illness-Claim-Form.pdf` }],

  faqs: [
  { topic: 'Cover', q: 'When does Academia pay out?', a: 'Payouts are timed to your child’s education milestones. Your adviser will set these with you.' },
  { topic: 'Cover', q: 'What happens if I die during the plan?', a: 'The life cover built into Academia protects your child’s plan. Ask about adding a premium waiver for extra peace of mind.' },
  lifeClaimsFaq,
  payMpesaFaq],

  questions: healthQuestions,
  related: ['jipange-plus', 'money-market-fund', 'seniors-mediplan']
},
{
  id: 'jipange-plus',
  kind: 'pension',
  hero: { image: img.sky, promise: 'A personal pension plan with a minimum return of 5%.' },
  intro: {
    title: 'A smart present equals a smart future',
    paragraphs: [
    'We all work towards a future that’s peaceful and comfortable after retirement. Jipange Plus is a pension plan for individuals who want to diversify their savings — and for organisations that want a staff scheme without registering a brand new pension fund.',
    'Your contributions go into a fund already registered with IRA, KRA and RBA.'],

    image: img.chart
  },
  features: [
  { title: 'Minimum return of 5%', body: 'Plus competitive returns on your savings.', icon: TrendingUpIcon, image: img.sky },
  { title: 'Tax-efficient', body: 'Contributions are tax exempt as the fund is KRA registered.', icon: LandmarkIcon, image: img.chart },
  { title: 'Lower costs', body: 'Shared administration, fund management and custody.', icon: CoinsIcon, image: img.office }],

  benefits: [
  { title: 'Already registered', body: 'No need to set up or register a separate pension fund.', icon: BadgeCheckIcon },
  { title: 'Minimum return of 5%', body: 'A guaranteed floor, with competitive returns on top.', icon: TrendingUpIcon },
  { title: 'Tax exemption', body: 'Pension contributions are tax exempt.', icon: LandmarkIcon },
  { title: 'Economies of scale', body: 'Reduced costs through consolidated services.', icon: PiggyBankIcon }],

  addOns: [],
  documents: [
  { title: 'Jipange Plus brochure', category: 'Brochure', meta: 'Available on request' },
  { title: 'Pension portal', category: 'Online service', meta: 'Log in to view statements', href: '/login' }],

  faqs: [
  { topic: 'Cover', q: 'Who is Jipange Plus for?', a: 'Individuals who want to save for retirement, and organisations that want a staff pension scheme.' },
  { topic: 'Cover', q: 'Is my return guaranteed?', a: 'Jipange Plus offers a minimum return of 5%, with competitive returns on top.' },
  { topic: 'Payments', q: 'Can I change how much I contribute?', a: 'Yes — contributions are flexible. Talk to us to change your amount.' },
  { topic: 'Claims', q: 'How do I access my savings at retirement?', a: 'Talk to a retirement specialist about your options, including income drawdown and annuities.' }],

  questions: [
  { id: 'kra', q: 'Do you have a KRA PIN?' },
  { id: 'other-scheme', q: 'Are you a member of another registered pension scheme?' },
  { id: 'resident', q: 'Are you resident in Kenya?' }],

  related: ['money-market-fund', 'academia', 'personal-accident']
},
{
  id: 'money-market-fund',
  kind: 'invest',
  hero: { image: img.office, imagePosition: 'center 22%', promise: 'Low-risk investing with daily interest — start with KES 5,000.' },
  intro: {
    title: 'Make your money work every day',
    paragraphs: [
    'The CIC Money Market Fund is a low-risk unit trust. Interest is calculated daily and credited monthly, and you can withdraw at short notice without penalty.',
    'Start with KES 5,000 and top up from KES 1,000 any time, from M-PESA or your bank.'],

    image: img.chart
  },
  features: [
  { title: 'Daily interest', body: 'Calculated daily, credited at the end of each month.', icon: TrendingUpIcon, image: img.office },
  { title: 'Easy access', body: 'Withdraw at short notice, with no penalty.', icon: LockKeyholeIcon, image: img.chart },
  { title: 'Low entry', body: 'Start with KES 5,000; top up from KES 1,000.', icon: BanknoteIcon, image: img.commute }],

  benefits: [
  { title: 'No initial fee', body: 'Your whole first deposit goes to work.', icon: CoinsIcon },
  { title: 'Low risk', body: 'Invests in deposits, Treasury bills and approved commercial paper.', icon: ShieldCheckIcon },
  { title: 'Switch funds', body: 'Move money to another CIC Asset Management fund.', icon: TrendingUpIcon },
  { title: 'Regulated', body: 'CIC Asset Management is regulated by the Capital Markets Authority.', icon: LandmarkIcon }],

  addOns: [],
  documents: [
  { title: 'CIC Money Market Fund factsheet — June 2026', category: 'Factsheet', meta: 'PDF', href: `${WP}/2026/07/CIC-Money-Market-Fund-June-2026-Factsheet.pdf` },
  { title: 'Unit trust portal', category: 'Online service', meta: 'Log in to view statements', href: '/login' }],

  faqs: [
  { topic: 'Cover', q: 'How much do I need to start?', a: 'KES 5,000 to open your account, then top up from KES 1,000.' },
  { topic: 'Cover', q: 'Are returns guaranteed?', a: 'No. Returns depend on the underlying investments and past performance is not a guide to the future.' },
  { topic: 'Payments', q: 'How do I withdraw?', a: 'Request a withdrawal on the portal or through your adviser. You can access your money at short notice without penalty.' }],

  questions: [],
  related: ['jipange-plus', 'academia', 'personal-accident']
},
{
  id: 'home-insurance',
  kind: 'home',
  hero: { image: img.office, imagePosition: 'center 22%', promise: 'Protect your house and everything inside it.' },
  intro: {
    title: 'Home is where your story lives',
    paragraphs: [
    'Home Insurance protects your house and the things inside it against fire, theft and other damage. Insure the building, your contents, or both.',
    'Add cover for your valuables away from home, and liability for your domestic staff.'],

    image: img.commute
  },
  features: [
  { title: 'Building and contents', body: 'Insure the structure, your belongings, or both.', icon: HomeIcon, image: img.office },
  { title: 'Fire and burglary', body: 'Cover for the risks that worry you most.', icon: FlameIcon, image: img.commute },
  { title: 'Domestic staff', body: 'Liability options for the people who work in your home.', icon: UsersIcon, image: img.students }],

  benefits: [
  { title: 'Fire and allied perils', body: 'Damage from fire, lightning and explosion.', icon: FlameIcon },
  { title: 'Burglary and theft', body: 'Your belongings, if they’re stolen by forced entry.', icon: LockKeyholeIcon },
  { title: 'Domestic staff liability', body: 'Injury to your domestic workers while on duty.', icon: UsersIcon }],

  addOns: [
  { id: 'all-risks', title: 'All risks for valuables', body: 'Cover for phones, laptops and jewellery, at home and away.', monthly: 400 },
  { id: 'staff', title: 'Domestic staff liability', body: 'Injury to your domestic workers while on duty.', monthly: 250 },
  { id: 'pvt', title: 'Political violence & terrorism', body: 'Extends your cover to political violence and terrorism.', monthly: 200 }],

  documents: [
  { title: 'Property Loss or Damage Claim Form', category: 'Claim form', meta: 'PDF', href: `${WP}/2021/09/Property-Loss-or-Damage-Claim-Form.pdf` },
  { title: 'Policy wording', category: 'Policy document', meta: 'Available on request' }],

  faqs: [
  { topic: 'Cover', q: 'Can I insure my contents if I rent?', a: 'Yes. Choose contents only and we’ll cover your belongings, not the building.' },
  { topic: 'Cover', q: 'How do I value my home?', a: 'Use the cost of rebuilding, not the market price. Your adviser can help you get it right.' },
  { topic: 'Claims', q: 'How do I claim after a burglary?', a: 'Report it to the police and get an abstract, then call us on 0703 099 120 and complete the Property Loss or Damage Claim Form.' },
  payMpesaFaq],

  questions: [
  { id: 'construction', q: 'Is your home built of stone, brick or concrete with a permanent roof?' },
  { id: 'loss', q: 'Have you had a loss or claim at this address in the last 3 years?' },
  { id: 'business', q: 'Is any part of the property used for business?' }],

  related: ['personal-accident', 'motor-private', 'seniors-mediplan']
},
{
  id: 'personal-accident',
  kind: 'accident',
  hero: { image: img.commute, promise: '24-hour cover if an accident leads to injury, disability or death.' },
  intro: {
    title: 'Life happens. Be ready',
    paragraphs: [
    'Personal Accident cover pays out if an accident leads to injury, disability or death — whether you’re at work, at home or on the road.',
    'It also helps with medical expenses, so you can focus on getting better.'],

    image: img.students
  },
  features: [
  { title: 'Covered 24/7', body: 'At work, at home and everywhere in between.', icon: ClockIcon, image: img.commute },
  { title: 'Medical expenses', body: 'Help with treatment costs after an accident.', icon: AmbulanceIcon, image: img.students },
  { title: 'Lump-sum benefits', body: 'For permanent disability or accidental death.', icon: HeartHandshakeIcon, image: img.office }],

  benefits: [
  { title: 'Accidental death', body: 'A lump sum for your family.', icon: HeartHandshakeIcon },
  { title: 'Permanent disability', body: 'A lump sum if an accident leaves you permanently disabled.', icon: ShieldCheckIcon },
  { title: 'Medical expenses', body: 'Treatment costs after an accident, up to a limit.', icon: AmbulanceIcon }],

  addOns: [
  { id: 'ttd', title: 'Temporary disability benefit', body: 'A weekly benefit while an injury keeps you off work.', monthly: 300 },
  { id: 'medical-plus', title: 'Higher medical expenses limit', body: 'Double your medical expenses limit.', monthly: 200 }],

  documents: [
  { title: 'Personal Accident Claim Form', category: 'Claim form', meta: 'PDF', href: `${WP}/2021/09/Personal-Accident-Claim-Form.pdf` },
  { title: 'Policy wording', category: 'Policy document', meta: 'Available on request' }],

  faqs: [
  { topic: 'Cover', q: 'Does my job affect my price?', a: 'Yes. Office work is lower risk than manual work, so it costs less to cover.' },
  { topic: 'Claims', q: 'How do I claim?', a: 'Call us on 0703 099 120 and complete the Personal Accident Claim Form. We’ll tell you which documents to attach.' },
  payMpesaFaq],

  questions: [
  { id: 'sports', q: 'Do you take part in hazardous sports such as motor racing or mountaineering?' },
  { id: 'disability', q: 'Do you have an existing disability or long-term injury?' },
  { id: 'declined', q: 'Has an insurer ever declined or cancelled your accident cover?' }],

  related: ['seniors-mediplan', 'motor-private', 'home-insurance']
}];


export const richById = Object.fromEntries(richProducts.map((p) => [p.id, p])) as Record<string, RichProduct>;

export const productById = (id?: string): CatalogueProduct | undefined => catalogue.find((p) => p.id === id);

// ---------------------------------------------------------------------------
// Illustrative pricing. All rates are ASSUMPTIONS for the design concept.
// ---------------------------------------------------------------------------

export type QuoteInputs = Record<string, string | number>;
export type Frequency = 'monthly' | 'annual';

export const defaultInputs: Record<QuoteKind, QuoteInputs> = {
  motor: { value: 1500000, use: 'private', cover: 'comprehensive', instalments: 12 },
  medical: { who: 'me', age: '60-69', limit: '1000000' },
  education: { childAge: 5, target: 2000000 },
  pension: { age: 30, contribution: 5000 },
  home: { cover: 'both', building: 5000000, contents: 1000000 },
  accident: { occupation: 'office', benefit: '2000000' },
  invest: { initial: 50000, topup: 5000, years: 5 }
};

const num = (v: string | number | undefined, fallback = 0) => {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
};

/** Annual premium (KES) for the product before add-ons. Invest returns the monthly top-up. */
export function annualPremium(kind: QuoteKind, i: QuoteInputs): number {
  switch (kind) {
    case 'motor':{
        if (i.cover === 'thirdParty') return 7500 * (i.use === 'commercial' ? 1.5 : 1);
        const base = Math.max(num(i.value) * 0.04, 30000);
        return base * (i.use === 'commercial' ? 1.25 : 1);
      }
    case 'medical':{
        const base = { '500000': 60000, '1000000': 85000, '2000000': 120000 }[String(i.limit)] ?? 85000;
        const age = { '60-69': 1, '70-79': 1.35, '80+': 1.8 }[String(i.age)] ?? 1;
        return base * age * (i.who === 'couple' ? 2 : 1);
      }
    case 'education':{
        const years = Math.max(18 - num(i.childAge), 3);
        return num(i.target) / years * 1.05;
      }
    case 'pension':
      return num(i.contribution) * 12;
    case 'home':{
        const b = i.cover === 'contents' ? 0 : num(i.building) * 0.0025;
        return Math.max(b + num(i.contents) * 0.006, 5000);
      }
    case 'accident':{
        const rate = { office: 0.0015, light: 0.0025, heavy: 0.004 }[String(i.occupation)] ?? 0.0025;
        return Math.max(num(i.benefit) * rate, 2000);
      }
    case 'invest':
      return num(i.topup) * 12;
  }
}

export const monthlyFromAnnual = (annual: number) => annual / 12;

/** Projected value for the invest/pension illustrations (monthly compounding at an assumed rate). */
export function projectValue(initial: number, monthly: number, years: number, rate: number) {
  const r = rate / 12;
  const n = Math.round(years * 12);
  const growth = Math.pow(1 + r, n);
  return initial * growth + (r === 0 ? monthly * n : monthly * ((growth - 1) / r));
}

export const ASSUMED_INVEST_RATE = 0.1;
export const ASSUMED_PENSION_RATE = 0.08;

// ---------------------------------------------------------------------------
// Quote hand-off between the product page and checkout (session only).
// ---------------------------------------------------------------------------

export type SavedQuote = {id: string;inputs: QuoteInputs;addOns: string[];frequency: Frequency;};

const key = (id: string) => `cic-quote-${id}`;

export function saveQuote(q: SavedQuote) {
  try {
    sessionStorage.setItem(key(q.id), JSON.stringify(q));
  } catch {

    /* storage unavailable — checkout falls back to defaults */}
}

export function loadQuote(id: string): SavedQuote | null {
  try {
    const raw = sessionStorage.getItem(key(id));
    return raw ? JSON.parse(raw) as SavedQuote : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Fallback content for catalogue products without a rich config.
// ---------------------------------------------------------------------------

export const categoryImage: Record<ProductCategory, {image: string;imagePosition?: string;}> = {
  Motor: { image: img.road },
  Medical: { image: img.smile },
  'Life & savings': { image: img.students },
  Investments: { image: img.office, imagePosition: 'center 22%' },
  Pensions: { image: img.sky },
  'Property & business': { image: img.office, imagePosition: 'center 22%' },
  'Personal accident': { image: img.commute }
};

export const categoryIcon: Record<ProductCategory, LucideIcon> = {
  Motor: CarIcon,
  Medical: HeartPulseIcon,
  'Life & savings': HeartHandshakeIcon,
  Investments: TrendingUpIcon,
  Pensions: UmbrellaIcon,
  'Property & business': HomeIcon,
  'Personal accident': AmbulanceIcon
};

const claimFormFor: Partial<Record<ProductCategory, DocumentItem>> = {
  Motor: { title: 'Motor Claim Form', category: 'Claim form', meta: 'PDF', href: `${WP}/2021/09/CIC-GENERAL-Motor-Insurance-Claim-Form.pdf` },
  'Property & business': { title: 'Property Loss or Damage Claim Form', category: 'Claim form', meta: 'PDF', href: `${WP}/2021/09/Property-Loss-or-Damage-Claim-Form.pdf` },
  'Personal accident': { title: 'Personal Accident Claim Form', category: 'Claim form', meta: 'PDF', href: `${WP}/2021/09/Personal-Accident-Claim-Form.pdf` },
  'Life & savings': { title: 'Death Claim Form', category: 'Claim form', meta: 'PDF', href: `${WP}/2021/09/Death-Claim-Form.pdf` }
};

export function fallbackDocuments(p: CatalogueProduct): DocumentItem[] {
  const docs: DocumentItem[] = [{ title: `${p.name} brochure`, category: 'Brochure', meta: 'Available on request' }];
  const form = claimFormFor[p.category];
  if (form) docs.push(form);
  return docs;
}

export function fallbackFaqs(p: CatalogueProduct): Faq[] {
  return [
  { topic: 'Cover', q: `Who is ${p.name} for?`, a: `It’s available to ${p.segments.map((s) => s.toLowerCase() + (s.endsWith('s') ? '' : 's')).join(', ')}. Talk to us and we’ll check it fits your needs.` },
  { topic: 'Cover', q: 'How much does it cost?', a: 'It depends on the cover you choose. Send us an enquiry and an adviser will prepare a quote for you.' },
  { topic: 'Claims', q: 'How do I make a claim?', a: 'Call us on 0703 099 120 or 020 282 3000, or start online on our Claims page. We’ll guide you through every step.' },
  payMpesaFaq];

}

/** Related products: same category first, then any rich products, excluding the current one. */
export function relatedFor(id: string, explicit?: string[]): CatalogueProduct[] {
  const self = productById(id);
  const ids = explicit ?? [
  ...catalogue.filter((p) => p.id !== id && p.category === self?.category).map((p) => p.id),
  ...richProducts.map((p) => p.id)];

  const seen = new Set<string>();
  const out: CatalogueProduct[] = [];
  for (const rid of ids) {
    if (rid === id || seen.has(rid)) continue;
    const p = productById(rid);
    if (p) {
      seen.add(rid);
      out.push(p);
    }
    if (out.length === 3) break;
  }
  return out;
}
