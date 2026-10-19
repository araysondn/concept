// CIC Online (ciconline.com) content, October 2026. Copy is CIC Online's own; layout follows Absa standards.

export type Segment = 'personal' | 'business';

export const fundTicker: {name: string;kind: 'NAV' | 'Rate';value: string;change: string;}[] = [
{ name: 'Balanced Fund', kind: 'NAV', value: '7.66', change: '0.00%' },
{ name: 'Money Market', kind: 'Rate', value: '8.10%', change: '0.00%' },
{ name: 'Equity Fund', kind: 'NAV', value: '10.48', change: '0.00%' },
{ name: 'Wealth Fund', kind: 'Rate', value: '7.00%', change: '0.00%' },
{ name: 'Dollar Fund', kind: 'Rate', value: '4.02%', change: '0.00%' },
{ name: 'CIC Fixed Income', kind: 'Rate', value: '9.89%', change: '0.00%' },
{ name: 'CIC Global Balanced Special Fund', kind: 'NAV', value: '10.24', change: '0.00%' }];


export const heroSlides: {title: string;body: string;cta: string;to: string;image: string;position?: string;}[] = [
{
  title: 'Protect what matters the most with CIC',
  body: 'Your one-stop portal for insurance, investment, and retirement all in one place.',
  cta: 'Explore products',
  to: '#products',
  image: '/online/family-picnic.jpg',
  position: 'center 40%'
},
{
  title: 'Insurance made for every stage of life.',
  body: 'Explore general, medical, asset, life and business insurance. T&Cs apply.',
  cta: 'Insure now',
  to: '#products',
  image: '/online/family.jpg',
  position: 'center 35%'
},
{
  title: 'Grow your wealth with CIC investments.',
  body: 'Invest in funds designed to help you achieve your financial goals. T&Cs apply.',
  cta: 'Invest now',
  to: '#products',
  image: '/online/invest.jpg',
  position: 'center 25%'
},
{
  title: 'Retirement plans with flexible pension solutions.',
  body: 'Save today with pension plans designed for long-term financial security. T&Cs apply.',
  cta: 'Apply now',
  to: '#products',
  image: '/online/seniors-slide.jpg',
  position: 'center 30%'
}];


export type ProductTab = 'All products' | 'Insure' | 'Invest' | 'Pension';
export const productTabs: ProductTab[] = ['All products', 'Insure', 'Invest', 'Pension'];

export type OnlineProduct = {
  id: string;
  name: string;
  body: string;
  tab: Exclude<ProductTab, 'All products'>;
  chip: string;
  image?: string;
  badge?: string;
  comingSoon?: boolean;
  /** Corporate-site quote flow for this product, where one exists. */
  quote?: string;
};

export const productChips = ['All', 'Motor', 'Medical', 'Personal Accident', 'Golfers', 'Marine', 'Travel', 'Invest', 'Pension'];

export const onlineProducts: OnlineProduct[] = [
{ id: 'family-medisure', name: 'CIC Family Medisure', body: '100% hospital bill payments from syringes to surgeries. No surprises.', tab: 'Insure', chip: 'Medical', image: '/products/medisure.png', badge: 'From KES 2,000 a month', quote: '/checkout/seniors-mediplan' },
{ id: 'seniors-mediplan', name: 'CIC Seniors Mediplan', body: 'Healthcare cover designed for comfort and peace of mind in retirement', tab: 'Insure', chip: 'Medical', image: '/products/seniors.png', quote: '/checkout/seniors-mediplan' },
{ id: 'private-motor', name: 'Private Motor Insurance', body: 'Protect your private vehicle against accidents, theft and damage.', tab: 'Insure', chip: 'Motor', image: '/products/private-motor.png', quote: '/checkout/motor-private' },
{ id: 'motor-commercial', name: 'Motor Commercial Insurance', body: 'Cover for the vehicles that keep your business moving.', tab: 'Insure', chip: 'Motor', image: '/products/commercial-motor.png' },
{ id: 'personal-accident', name: 'Personal Accident Cover', body: 'Financial protection against accidental injury or disability.', tab: 'Insure', chip: 'Personal Accident', image: '/products/personal-accident.png', quote: '/checkout/personal-accident' },
{ id: 'marine-cargo', name: 'Marine Cargo Policy', body: 'Cover for goods in transit by sea, air and road.', tab: 'Insure', chip: 'Marine', comingSoon: true },
{ id: 'golfers', name: 'Golfers Insurance', body: 'Cover for your golf equipment, personal accident and liability on the course.', tab: 'Insure', chip: 'Golfers', image: '/products/golfers.png' },
{ id: 'travel', name: 'Travel Insurance', body: 'Medical and travel cover for your trips outside Kenya.', tab: 'Insure', chip: 'Travel', image: '/products/travel.png' },
{ id: 'money-market', name: 'CIC Money Market Fund', body: 'Low-risk investing with daily interest. Rate 8.10%.', tab: 'Invest', chip: 'Invest', image: '/products/family-hero.png', quote: '/checkout/money-market-fund' },
{ id: 'dollar-fund', name: 'CIC Dollar Fund', body: 'Save and invest in US dollars. Rate 4.02%.', tab: 'Invest', chip: 'Invest', image: '/products/family-hero.png' },
{ id: 'fixed-income', name: 'CIC Fixed Income Fund', body: 'Steady returns from government and corporate bonds. Rate 9.89%.', tab: 'Invest', chip: 'Invest', image: '/products/family-hero.png' },
{ id: 'balanced-fund', name: 'CIC Balanced Fund', body: 'A mix of shares and bonds for long-term growth. NAV 7.66.', tab: 'Invest', chip: 'Invest', image: '/products/family-hero.png' },
{ id: 'jipange', name: 'CIC Jipange', body: 'A personal pension plan with tax relief on contributions.', tab: 'Pension', chip: 'Pension', image: '/products/jipange-pension.png', quote: '/checkout/jipange-plus' },
{ id: 'personal-pension', name: 'Personal pension plans', body: 'Retire on your own terms. Contribute by M-PESA and track your balance.', tab: 'Pension', chip: 'Pension', image: '/products/jipange-pension.png' }];


export type SegmentSlide = {title: string;body: string;chips: string[];cta: string;to: string;};

export const personalSlides: SegmentSlide[] = [
{ title: 'For you and your family', body: 'Your customer centre, open 24/7. View your policies, pay premiums, make claims and download statements from your phone or computer.', chips: ['Buy cover online', 'Secure payments', 'Instant claims', 'Download statements', 'Contact customer care'], cta: 'Get started', to: '/online/register' },
{ title: 'Cover for your car, health and home', body: 'Motor, medical, travel and personal accident cover from CIC, bought and renewed online.', chips: ['Instant quotes', 'Buy cover online', 'Pay by M-PESA', 'Renewal reminders', 'Track your claims'], cta: 'Get a quote', to: '#products' },
{ title: 'Grow your money with CIC unit trusts', body: 'From money market to dollar funds. Start small and top up any time.', chips: ['Open an account online', 'Money market & dollar funds', 'Top up by M-PESA', 'Daily fund prices', 'Withdraw any time'], cta: 'Start investing', to: '/online/register' },
{ title: 'Protect your family’s future', body: 'Life, education and endowment plans like Academia and Family Protector.', chips: ['Education plans', 'Family protection', 'Endowment savings', 'Pay by M-PESA', 'Check maturity value'], cta: 'Get a quote', to: '#products' },
{ title: 'Retire on your own terms', body: 'Personal pension plans and CIC Jipange, with tax relief on contributions.', chips: ['Personal pension plans', 'CIC Jipange', 'Tax relief', 'Contribute by M-PESA', 'Track your balance'], cta: 'Start saving', to: '/online/register' },
{ title: 'Affordable cover for everyday life', body: 'Simple, low-cost cover for you, your family and your small business.', chips: ['Low-cost cover', 'Sign up on your phone', 'Pay small amounts', 'Chama & group cover', 'Dial *304#'], cta: 'Get covered', to: '/online/register' }];


export const businessSlides: SegmentSlide[] = [
{ title: 'Grow your business with CIC', body: 'Sell, serve your clients and get paid from one agent portal, on the web or in the CIC app.', chips: ['Sell instant covers', 'Manage your clients', 'Track your commission', 'Get training', 'Get agent support'], cta: 'Become an agent', to: '/online/register?as=agent' },
{ title: 'Sell motor, medical and general cover', body: 'Quote, issue and renew general insurance for your clients from one portal.', chips: ['Instant quotes', 'Issue policies online', 'Renewals in minutes', 'Claims support', 'Commission on every sale'], cta: 'Become an agent', to: '/online/register?as=agent' },
{ title: 'Help your clients grow their wealth', body: 'Offer CIC unit trusts and onboard clients digitally.', chips: ['Onboard clients digitally', 'Open client accounts', 'Track client portfolios', 'Fund price updates', 'Real-time commission'], cta: 'Become an agent', to: '/online/register?as=agent' },
{ title: 'Build lifelong client relationships', body: 'Sell life, education and endowment plans that protect families.', chips: ['Quote life plans on the go', 'Education & endowment plans', 'Premium reminders', 'Renewal commission', 'Product training'], cta: 'Become an agent', to: '/online/register?as=agent' },
{ title: 'Grow your pension book', body: 'Bring individuals and employers into CIC pension plans.', chips: ['Register members', 'Employer schemes', 'Agent desk support', 'Track contributions', 'Pension commission'], cta: 'Become an agent', to: '/online/register?as=agent' },
{ title: 'Reach more clients with micro insurance', body: 'Sell simple, low-cost cover to individuals, groups and chamas.', chips: ['Group & chama sign-up', 'M-PESA collections', 'Simple products', 'Community reach', 'Fast payouts'], cta: 'Become an agent', to: '/online/register?as=agent' }];


export const authSlides: {title: string;body: string;image: string;}[] = [
{ title: 'Caring for You, Always', body: 'Comprehensive health and medical cover that keeps you and your loved ones protected at every step.', image: '/online/care.jpg' },
{ title: 'Built for Your Family', body: "Life assurance solutions designed to secure your family's future, no matter what tomorrow holds.", image: '/online/family-picnic.jpg' },
{ title: 'Every Family Deserves Protection', body: 'From education plans to last-expense cover — one policy for every milestone that matters.', image: '/online/family.jpg' },
{ title: 'Grow Your Wealth', body: 'Professionally managed investment funds with competitive returns and low minimum amounts.', image: '/online/invest.jpg' },
{ title: 'Security in Every Season', body: "Tailored retirement and senior plans so you can enjoy life's later years with confidence.", image: '/online/seniors-slide.jpg' }];


export const contactTopics = ['General enquiry', 'Claims', 'Policy or cover', 'Payments and statements', 'Complaints', 'Something else'];

export const channels: {label: string;value: string;href: string;hint: string;}[] = [
{ label: 'Call us', value: '0703 099 120', href: 'tel:0703099120', hint: 'Monday to Friday, our team is ready to help.' },
{ label: 'WhatsApp', value: '0703 099 000', href: 'https://wa.me/254703099000', hint: 'Chat with us on WhatsApp.' },
{ label: 'Email', value: 'callc@cic.co.ke', href: 'mailto:callc@cic.co.ke', hint: 'Send us your question by email.' },
{ label: 'Visit us', value: 'CIC Plaza, Mara Road', href: 'https://maps.google.com/?q=CIC+Plaza+Mara+Road+Upper+Hill+Nairobi', hint: 'Upper Hill, Nairobi' }];


export const faqBusinesses = ['All businesses', 'General insurance', 'Investments', 'Life & pension', 'Micro insurance'];

export const faqs: {question: string;answer: string;business: string;}[] = [
{ business: 'Investments', question: 'How does unit trust compare to other forms of Investment – Fixed deposit accounts in banks, bonds, treasury bills?', answer: 'Unit Trust offers: 1. High liquidity and ease of access 2. Open ended investment period. 3. Competitive return. 4. Diversification 5. Expert opinion in decision making.' },
{ business: 'Investments', question: 'How long does it take to receive funds once a withdrawal has been made?', answer: "Withdrawal request received by 9.00 am is executed the same day & funds are transferred to the client's bank account within 2-4 working days." },
{ business: 'Investments', question: 'When do I get a purchase confirmation?', answer: 'Purchase confirmation of top-up and initial investment are sent by close of business of the following working day once funds have cleared. Kindly ensure that you clearly and correctly capture the member number to ensure we deliver on this promise.' },
{ business: 'Investments', question: 'When do I receive my monthly statement?', answer: 'The end of the Month statement is sent by the 5th working day of the following month.' },
{ business: 'Investments', question: 'How safe is my Investment?', answer: 'The Capital Market Authority regulates Investment in Unit trust. Furthermore, the roles are split between the Fund Manager, the Trustee, and the Custodian to ensure proper governance is in place. The independent party called the Trustee safeguards the asset of the scheme' },
{ business: 'Investments', question: 'What are the differences between the daily yield and effective yield?', answer: 'Daily yield is the nominal yield that does not consider the power of compounding. Effective yield is the rate of interest when the compounding of interest is considered. Interest is compounded on a monthly basis' },
{ business: 'Investments', question: 'Can CIC Asset Management (CICAM) guarantee a specific rate of return for the investments?', answer: 'CICAM cannot guarantee a specific return on Investment because all earnings are subject to market dynamics external to the organization.' },
{ business: 'Investments', question: 'Is the interest made on investments taxed? If so, what is the rate?', answer: 'Yes, interest earned on unit trust investments is subject to withholding tax at a rate of 15% as per Kenyan tax regulations.' },
{ business: 'Investments', question: 'What is Capital Gain?', answer: 'The term refers to the unit price appreciation from the initial purchase price. This gain is, however, not realized until the unit is sold.' },
{ business: 'Investments', question: 'What is a unit trust?', answer: 'A unit trust is a separate, independent legal trust set up to hold and administer the pooled funds of investors who purchase units in the trust.' }];


/** CIC Online loads its 26 branches from a live service; only the head office is published in the page code. */
export const branches: {name: string;address: string;phone?: string;}[] = [
{ name: 'Head Office – CIC Plaza', address: 'Mara Road, Upper Hill, Nairobi', phone: '0703 099 120 · (020) 282 3000' }];


export const occupations = ['Employed', 'Self-employed', 'Business owner', 'Farmer', 'Student', 'Retired', 'Other'];
export const titles = ['Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof'];
export const genders = ['Male', 'Female', 'Other'];
export const securityQuestions = [
'What was the name of your first school?',
'What is your mother’s maiden name?',
'What was the name of your first pet?',
'In which town were you born?',
'What is your favourite food?'];


export const legalLinks = ['Regulatory Disclosures', 'Privacy statement.', 'Terms of use.', 'Cookie policy'];
