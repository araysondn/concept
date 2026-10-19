import type { ContactFormField } from '../components/patterns';
import type { ProductPageData } from './productPage';

export type RetirementProduct = {
  label: string;
  title: string;
  paragraphs: string[];
  listTitle?: string;
  points?: string[];
  forWho?: string;
};

// Product copy is quoted from CIC Kenya's Retirement Solutions page.
export const retirementProducts: RetirementProduct[] = [
{
  label: 'CIC Jipange Plus',
  title: 'Why Jipange Plus',
  paragraphs: [
  "A smart present equals a smart future. We all work towards a future that's peaceful and comfortable after retirement.",
  'This is a pension plan for individuals who wish to diversify their saving options, and for organisations that wish to set up a staff pension scheme for their employees without going through the hassles of registering a brand new pension scheme.'],

  listTitle: 'What you get',
  points: [
  'Contribution into a pension fund which is already registered with IRA, KRA and RBA (no need to set up or register a separate pension fund)',
  'A minimum return of 5%',
  'Competitive returns',
  'Tax exemption of pension contributions, since the fund is registered with KRA',
  'Reduced costs due to economies of scale and consolidation of services (administration, fund management, trusteeship and custody)'],

  forWho: 'Individuals, and organisations that want a staff pension scheme.'
},
{
  label: 'CIC Umbrella Retirement Benefits Scheme',
  title: 'Why the CIC Umbrella Retirement Benefits Scheme',
  paragraphs: [
  'A multi-employer retirement benefits scheme open to groups (employers) who come together in a pool by making contributions to the scheme.',
  'The scheme lets each employer choose the level and type of benefits their employees will enjoy at retirement. The scheme is also NSSF Act 2013 Tier II contributions compliant.'],

  forWho: "SME's and start-up organisations."
},
{
  label: 'Umbrella Scheme – Segregated',
  title: 'Why the Umbrella Scheme – Segregated',
  paragraphs: [
  "The CICAM segregated Umbrella fund is designed for small to medium enterprises (SME's) as well as larger organisations that want a segregated retirement benefits scheme, but don't want to be entangled in the legal, administrative and statutory liabilities that apply to segregated schemes.",
  'A larger portion of this fund is invested in high growth assets, which are expected to yield a higher return in the long run. The investments are well diversified to manage risk.'],

  forWho: 'SMEs and larger organisations.'
}];


export const retirementFaqs = [
{
  title: 'Who should invest in the CIC Umbrella Fund?',
  body: 'The fund provides a solution to organisations that find setting up a retirement fund, and continuously complying with the complex legal and statutory demands, a challenge in both monetary and human resource cost.'
},
{
  title: 'Who does CIC offer the Annuity Plan to?',
  body: 'CIC Group offers guaranteed annuities to both single life and joint life, with an option of 3 guarantee periods: no guarantee period, a 5-year guarantee period and a 10-year guarantee period. Annuity payments are usually fixed amounts, or amounts increasing annually by 3% or 5%.'
},
{
  title: 'With the Income Draw Down Fund, what happens if an individual dies?',
  body: 'On the death of the individual member, the fund can be used to provide an income to the nominated beneficiaries, either by continuing the income drawdown arrangement or by buying an annuity. If income is not taken in this way, the balance may be paid to the nominated beneficiaries.'
}];


export const retirementLeadFields: ContactFormField[] = [
{ id: 'firstName', label: 'First name', required: true },
{ id: 'lastName', label: 'Last name', required: true },
{
  id: 'interest',
  label: 'What are you interested in?',
  type: 'select',
  required: true,
  wide: true,
  options: ['Retirement planning', 'Savings & Investments', 'Health Insurance', 'Life Assurance', 'Protecting my assets', 'Travel Insurance']
},
{ id: 'email', label: 'Email', type: 'email', required: true },
{ id: 'phone', label: 'Phone', type: 'tel', required: true },
{ id: 'callback', label: 'Would you like a callback?', type: 'select', options: ['Yes', 'No'] },
{ id: 'date', label: 'Preferred date', placeholder: 'e.g. 24 October 2026' },
{ id: 'time', label: 'Preferred time', placeholder: 'e.g. 10:00am' }];


export const retirementRelated = [
{ title: 'CIC Money Market Fund', body: 'Keep your savings working, with interest calculated daily.', to: '/investments' },
{ title: 'Life assurance', body: 'Protect your family’s future alongside your retirement savings.', to: '/life-assurance' },
{ title: 'Business solutions', body: 'Cover and benefits for your business and your team.', to: '/business' },
{ title: 'Corporate solutions', body: 'Retirement schemes and employee benefits for larger organisations.', to: '/corporates' }];


const images = {
  hero: '/a84679f1-42c0-4e9b-ab49-645ec6530114.jpg',
  portal: '/04fbb304-f647-46e9-b229-2e5497528707.jpg',
  adviser: '/d694dffc-d1e8-4a02-b91b-a3916205270c.jpg',
  people: '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg',
  office: '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg',
  students: '/19f98733-386d-4c89-bb7e-c68bd62f3cc7.jpg',
  thinking: '/5edc0fda-3296-43a7-9b4b-1fb06fa2c3e0.jpg'
};

const productTab = (prod: RetirementProduct) => ({
  label: prod.label,
  body: [...prod.paragraphs, prod.forWho ? `Who it's for: ${prod.forWho}` : ''].filter(Boolean).join(' '),
  points: prod.points
});

/** Product page content for /retirement, benchmarked on the motor insurance page. */
export const retirementPage: ProductPageData = {
  hero: {
    image: images.hero,
    title: 'Enjoy your sunset years',
    intro: "You've earned a retirement worth looking forward to. Let us help you plan for it, starting today.",
    cta: { label: 'Talk to a specialist', href: '#talk' },
    disclaimer: 'Projections use assumed returns for illustration only. Actual returns depend on fund performance and are not guaranteed.'
  },
  breadcrumb: [
  { label: 'Individual', to: '/' },
  { label: 'Save and invest', to: '/investments' },
  { label: 'Retirement' }],

  help: {
    title: 'How can we help?',
    items: [
    { label: 'Start a personal pension', icon: 'retire', to: '/retirement#get-started' },
    { label: 'Set up a staff scheme', icon: 'user', to: '/retirement#talk' },
    { label: 'Check my pension balance', icon: 'monitor', to: '/login' },
    { label: 'Turn savings into income', icon: 'growth', to: '/retirement#retirement-faqs' },
    { label: 'Claim retirement benefits', icon: 'claim', to: '/claims' },
    { label: 'Talk to us', icon: 'talk', to: '/contact-us' }]

  },
  know: {
    title: 'What you need to know about our retirement plans',
    tabs: retirementProducts.map(productTab)
  },
  apply: {
    title: 'Plans that work for you',
    products: [
    {
      title: 'CIC Jipange Plus',
      body: 'A personal pension plan for individuals, and an easy way for organisations to give staff a pension without registering a scheme of their own.',
      more: { label: 'Tell me more', href: '#talk' },
      quote: { label: 'Get started', href: '#talk' }
    },
    {
      title: 'CIC Umbrella Retirement Benefits Scheme',
      body: "A multi-employer scheme for SME's and start-ups. Choose the benefits your team gets, with NSSF Tier II compliant contributions.",
      image: images.portal,
      more: { label: 'Tell me more', href: '#talk' },
      quote: { label: 'Join the scheme', href: '#talk' }
    }],

    promos: [
    {
      title: 'Umbrella Scheme – Segregated',
      body: 'Your own segregated scheme, without the legal, administrative and statutory load of running one.',
      bg: 'bg-cic-pink',
      link: { label: 'Tell me more', href: '#talk' }
    },
    {
      title: 'Turn your pot into an income',
      body: 'Annuities and income drawdown give you a regular income once you stop working.',
      bg: 'bg-[#1d1d1d]',
      image: images.office,
      imageClass: 'absolute inset-0 h-full w-full object-cover opacity-60',
      link: { label: 'Read the FAQs', href: '#retirement-faqs' }
    }],

    banner: {
      title: 'Pension for your whole team',
      body: 'Give your employees a retirement plan they can count on, with administration, fund management and trusteeship handled for you.',
      image: images.people,
      link: { label: 'Tell me more', to: '/business' }
    }
  },
  explore: {
    title: 'Explore your options',
    feature: { title: 'Check your pension online', body: 'Log in to the pension portal to see your balance and statements.', image: images.portal, imageAlt: 'Illustration of a woman presenting a chart', link: { label: 'Pension portal', to: '/login' } },
    options: [
    { title: 'Retirement FAQs', body: 'Annuities, drawdown and umbrella funds explained', link: { label: 'Read more', href: '#retirement-faqs' } },
    { title: 'Grow your savings', body: 'Invest alongside your pension', link: { label: 'Investments', to: '/investments' } }],

    wide: { title: 'Not sure where to start?', body: 'Talk to one of our retirement specialists.', image: images.adviser, link: { label: 'Talk to us', href: '#talk' } }
  },
  articles: {
    title: 'Planning for the rest of your life',
    articles: [
    { title: 'How much do I need to retire?', body: 'A simple way to work out your number.', image: images.thinking },
    { title: 'NSSF Tier II explained', body: 'What it means for you and your employer.', image: images.office },
    { title: 'Income drawdown vs annuity', body: 'Two ways to turn savings into income.', image: images.hero },
    { title: 'Starting early', body: 'Why time matters more than amount.', image: images.students }]

  }
};
