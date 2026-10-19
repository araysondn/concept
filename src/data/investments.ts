import type { ProductPageData } from './productPage';

export type ProductType = 'Unit trust' | 'Life savings plan';
export type Currency = 'KES' | 'USD';

export type InvestmentProduct = {
  id: string;
  name: string;
  type: ProductType;
  provider: 'CIC Asset Management' | 'CIC Life Assurance';
  currency: Currency;
  /** Minimum initial investment in the product's own currency; null = set when you speak to an adviser. */
  minInvestment: number | null;
  minTopUp: number | null;
  /** Rough KES equivalent of the minimum, used only by the "I plan to invest" filter. */
  minKes: number;
  earnings: string;
  risk: string;
  access: string;
  horizonYears: number;
  body: string;
  features: string[];
};

export const investmentProducts: InvestmentProduct[] = [
{ id: 'mmf', name: 'CIC Money Market Fund', type: 'Unit trust', provider: 'CIC Asset Management', currency: 'KES', minInvestment: 5000, minTopUp: 1000, minKes: 5000, earnings: 'Daily interest, credited monthly', risk: 'Low', access: 'Within a few days', horizonYears: 1, features: ['Top up anytime', 'Switch between CIC funds', 'No initial fee'], body: 'Aims to preserve your capital while protecting it from inflation. Invests in fixed and call deposits, Treasury bills and approved commercial paper. Withdraw at short notice with no penalty.' },
{ id: 'dollar', name: 'CIC Dollar Fund', type: 'Unit trust', provider: 'CIC Asset Management', currency: 'USD', minInvestment: 1000, minTopUp: 100, minKes: 130000, earnings: 'Interest-based', risk: 'Low', access: 'Within a few days', horizonYears: 1, features: ['Invest in US dollars', 'Top up anytime', 'Switch between CIC funds'], body: 'Save and grow your money in US dollars. Aims to preserve capital with some long-term growth, a good fit for school fees abroad, travel or diaspora savings.' },
{ id: 'balanced', name: 'CIC Balanced Fund', type: 'Unit trust', provider: 'CIC Asset Management', currency: 'KES', minInvestment: null, minTopUp: null, minKes: 0, earnings: 'Market-linked', risk: 'Medium', access: 'Within a few days', horizonYears: 3, features: ['Top up anytime', 'Switch between CIC funds'], body: 'A mix of shares and fixed income for investors looking for medium returns with an average tolerance for risk.' },
{ id: 'equity', name: 'CIC Equity Fund', type: 'Unit trust', provider: 'CIC Asset Management', currency: 'KES', minInvestment: 5000, minTopUp: 1000, minKes: 5000, earnings: 'Market-linked', risk: 'High', access: 'Within a few days', horizonYears: 5, features: ['Shares on the NSE', 'Top up anytime', 'Switch between CIC funds'], body: 'Built for long-term growth, with at least 60% invested in shares listed on the Nairobi Securities Exchange. Best for investors comfortable with market ups and downs.' },
{ id: 'wealth', name: 'CIC Wealth Fund', type: 'Unit trust', provider: 'CIC Asset Management', currency: 'KES', minInvestment: 5000000, minTopUp: 1000000, minKes: 5000000, earnings: 'Market-linked', risk: 'Low to medium', access: 'Within a few days', horizonYears: 3, features: ['Switch between CIC funds'], body: 'For larger investors and institutions who want steady growth with a low-to-medium risk profile.' },
{ id: 'smart-saver', name: 'Smart Saver', type: 'Life savings plan', provider: 'CIC Life Assurance', currency: 'KES', minInvestment: null, minTopUp: null, minKes: 0, earnings: 'Plan-linked', risk: 'Low', access: 'At end of plan term', horizonYears: 3, features: ['Small regular amounts'], body: 'A disciplined savings plan from CIC Life that helps you put money aside regularly towards a goal you choose.' },
{ id: 'academia', name: 'Academia', type: 'Life savings plan', provider: 'CIC Life Assurance', currency: 'KES', minInvestment: null, minTopUp: null, minKes: 0, earnings: 'Plan-linked', risk: 'Low', access: 'At end of plan term', horizonYears: 5, features: ['Saving for education', 'Small regular amounts'], body: "Save for your child's education with payouts planned around the school years." },
{ id: 'jipange', name: 'Jipange Plus', type: 'Life savings plan', provider: 'CIC Life Assurance', currency: 'KES', minInvestment: null, minTopUp: null, minKes: 0, earnings: 'Plan-linked', risk: 'Low', access: 'At retirement', horizonYears: 10, features: ['Saving for retirement', 'Small regular amounts'], body: 'A personal retirement plan, so you can enjoy your sunset years. Contribute at your own pace and build a pension pot you control.' },
{ id: 'haba-haba', name: 'Haba Haba na CIC', type: 'Life savings plan', provider: 'CIC Life Assurance', currency: 'KES', minInvestment: null, minTopUp: null, minKes: 0, earnings: 'Plan-linked', risk: 'Low', access: 'At end of plan term', horizonYears: 1, features: ['Small regular amounts'], body: 'Haba haba hujaza kibaba: save small amounts, little by little, and watch them add up.' }];


export const amountOptions = [
{ label: 'Under KES 5,000', max: 4999 },
{ label: 'KES 5,000 - 99,999', max: 99999 },
{ label: 'KES 100,000 - 4,999,999', max: 4999999 },
{ label: 'KES 5 million or more', max: Infinity }];


export const horizonOptions = [
{ label: '1 year', years: 1 },
{ label: '3 years', years: 3 },
{ label: '5 years', years: 5 },
{ label: '10 years or more', years: 10 }];


export const accessOptions = [
{ label: 'Only at retirement', access: [] as string[] },
{ label: 'At the end of my plan', access: ['Within a few days', 'At end of plan term'] },
{ label: 'At any time', access: ['Within a few days'] }];


export const riskLevels = ['Low', 'Low to medium', 'Medium', 'High'];
export const productTypes: ProductType[] = ['Unit trust', 'Life savings plan'];
export const currencies: Currency[] = ['KES', 'USD'];
export const featureOptions = [
'Top up anytime',
'Switch between CIC funds',
'No initial fee',
'Invest in US dollars',
'Shares on the NSE',
'Small regular amounts',
'Saving for education',
'Saving for retirement'];


export const investmentsIllustration = "/5edc0fda-3296-43a7-9b4b-1fb06fa2c3e0.jpg";

export function formatMinimum(p: InvestmentProduct, value: number | null): string {
  if (value === null) return 'Ask an adviser';
  return `${p.currency} ${value.toLocaleString('en-KE')}`;
}

const images = {
  hero: '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg',
  thinking: '/5edc0fda-3296-43a7-9b4b-1fb06fa2c3e0.jpg',
  students: '/19f98733-386d-4c89-bb7e-c68bd62f3cc7.jpg',
  adviser: '/d694dffc-d1e8-4a02-b91b-a3916205270c.jpg',
  chart: '/04fbb304-f647-46e9-b229-2e5497528707.jpg',
  smile: '/953d4772-30ed-48cf-9516-b192cb47b7e0.jpg',
  commute: '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg',
  diver: '/a84679f1-42c0-4e9b-ab49-645ec6530114.jpg'
};

export const investmentsPage: ProductPageData = {
  hero: {
    image: images.hero,
    imagePosition: 'center 22%',
    title: 'We are invested in your success',
    intro: 'Start your investment journey today. Grow your money with CIC Asset Management, from as little as KES 5,000.',
    cta: { label: 'Start investing', to: '/register' },
    disclaimer: 'Projections use assumed rates for illustration only. Unit trust returns are not guaranteed and past performance is not a guide to future returns.'
  },
  breadcrumb: [
  { label: 'Individual', to: '/' },
  { label: 'Investments' }],

  help: {
    title: 'How can we help?',
    items: [
    { label: 'Start investing online', icon: 'growth', to: '/register' },
    { label: 'Top up or withdraw', icon: 'monitor', to: '/login' },
    { label: 'Save for school fees', icon: 'education', to: '/life-assurance' },
    { label: 'Plan for retirement', icon: 'retire', to: '/retirement' },
    { label: 'Get my statement', icon: 'file', to: '/login' },
    { label: 'Talk to an adviser', icon: 'talk', to: '/contact-us' }]

  },
  know: {
    title: 'What you need to know about investing with us',
    tabs: [
    {
      label: 'Why invest with us?',
      body: 'CIC Asset Management is one of the largest unit trust managers in Kenya, with a 38.5% share of the unit trust market. We have more than five decades of helping people achieve financial security.',
      points: [
      'Funds for every goal, from parking cash to long-term growth',
      'Invest and top up from M-PESA or your bank',
      'Track your money online through the self-service portal',
      'Regulated by the Capital Markets Authority']

    },
    {
      label: 'How unit trusts work',
      body: 'A unit trust pools money from many investors and a professional fund manager invests it on everyone’s behalf. You buy units in the fund, and the value of your units rises or falls with the investments the fund holds.',
      points: [
      'You can start small and add to your investment over time',
      'Your money is spread across many investments, which helps manage risk',
      'Unit prices are calculated every business day']

    },
    {
      label: 'Money Market Fund',
      body: 'Our Money Market Fund is a low-risk place to grow your savings while keeping them within reach.',
      points: [
      'Start with KES 5,000 and top up from KES 1,000',
      'Interest is calculated daily and credited monthly',
      'Withdraw at short notice with no penalty',
      'No initial fee']

    },
    {
      label: 'Fees and charges',
      body: 'Each fund has an annual management fee, which is taken from the fund rather than charged to you separately. Some funds may also have an initial fee. The latest fees for each fund are set out in its factsheet, so check it or ask an adviser before you invest.'
    },
    {
      label: 'How to invest',
      body: 'Open your account online in a few minutes, then fund it the way that suits you.',
      points: [
      'Register online and choose your fund',
      'Pay in through M-PESA or a bank transfer',
      'Set up a monthly standing order to keep growing',
      'Log in to the self-service portal to top up, withdraw or download statements']

    }]

  },
  apply: {
    title: 'Choose a fund that works for you',
    intro: 'Whether you want somewhere safe to park your money, to save in dollars or to grow your wealth over the long term.',
    products: [
    {
      title: 'CIC Money Market Fund',
      body: 'Low risk, with interest calculated daily. Start with KES 5,000 and top up from KES 1,000.',
      image: images.thinking,
      more: { label: 'Tell me more', href: '#fund-explorer' },
      quote: { label: 'Invest now', to: '/register' }
    },
    {
      title: 'CIC Dollar Fund',
      body: 'Save and invest in US dollars. Start with USD 1,000 and top up from USD 100.',
      more: { label: 'Tell me more', href: '#fund-explorer' },
      quote: { label: 'Invest now', to: '/register' }
    }],

    promos: [
    {
      title: 'Plan for their education',
      body: 'Save towards school and university fees with CIC Academia.',
      bg: 'bg-cic-pink',
      image: images.students,
      imageClass: 'absolute inset-0 h-full w-full object-cover opacity-30',
      link: { label: 'Tell me more', to: '/life-assurance' }
    },
    {
      title: 'Enjoy your sunset years',
      body: 'Build your own pension with Jipange Plus.',
      bg: 'bg-[#1d1d1d]',
      link: { label: 'Tell me more', to: '/retirement' }
    }],

    banner: {
      title: 'Grow your wealth over the long term',
      body: 'Our Balanced and Equity funds invest in shares and fixed income for investors with a longer time frame.',
      link: { label: 'Compare funds', href: '#fund-explorer' }
    }
  },
  explore: {
    title: 'Explore your options',
    feature: {
      title: 'Compare our funds',
      body: 'Put up to three funds side by side to see which suits you.',
      image: images.chart,
      imageAlt: 'Woman presenting a chart',
      link: { label: 'Compare now', href: '#fund-explorer' }
    },
    options: [
    { title: 'Invest online', body: 'Open an account and start investing in minutes.', link: { label: 'Get started', to: '/register' } },
    { title: 'Self-service portal', body: 'Top up, withdraw and download statements.', link: { label: 'Log in', to: '/login' } },
    { title: 'Fund reports', body: 'Read our financial reports and disclosures.', link: { label: 'View reports', to: '/about/investor-relations' } },
    { title: 'Retirement planning', body: 'Turn today’s savings into tomorrow’s income.', link: { label: 'Find out more', to: '/retirement' } }],

    wide: {
      title: 'Not sure where to start?',
      body: 'Talk to one of our financial advisors.',
      image: images.adviser,
      link: { label: 'Contact us', to: '/contact-us' }
    }
  },
  articles: {
    title: 'Grow your money know-how',
    articles: [
    { title: 'What is a money market fund?', body: 'A simple way to earn on cash you may need soon.', image: images.commute },
    { title: 'Unit trusts vs fixed deposits', body: 'How they differ, and when each makes sense.', image: images.chart },
    { title: 'How compound growth works', body: 'Why starting early makes a big difference.', image: images.smile },
    { title: 'Saving in dollars', body: 'What to think about before you invest in USD.', image: images.diver }]

  }
};