// Posts from the CIC Kenya blog (ke.cicinsurancegroup.com). Titles, dates, authors and excerpts are from the
// source; key points are short summaries written for this design concept. Each post links to the full article.

export type BlogCategory =
'Motor' |
'Health' |
'Life & education' |
'Investments' |
'Business' |
'Insurance basics' |
'Travel';

export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO
  category: BlogCategory;
  author?: string;
  readMinutes: number;
  excerpt: string;
  keyPoints: string[];
  sourceUrl: string;
  image: string;
  /** Where the post's call to action points on this site. */
  product: {label: string;to: string;};
};

export const blogCategories: BlogCategory[] = [
'Motor',
'Health',
'Life & education',
'Investments',
'Business',
'Insurance basics',
'Travel'];


const SRC = 'https://ke.cicinsurancegroup.com';

const img = {
  outdoors: '/b94fbfcf-01cb-464f-83ac-76f9511ef27c.jpg',
  matatu: '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg',
  thinking: '/5edc0fda-3296-43a7-9b4b-1fb06fa2c3e0.jpg',
  apartment: '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg',
  steps: '/cc1fa332-e7e8-46c7-847e-2ead4c6b6142.jpg',
  chart: '/04fbb304-f647-46e9-b229-2e5497528707.jpg',
  laughing: '/953d4772-30ed-48cf-9516-b192cb47b7e0.jpg',
  friends: '/19f98733-386d-4c89-bb7e-c68bd62f3cc7.jpg',
  roadTrip: '/e8293a56-e89d-40b4-81f7-b50c0e44b3ae.jpg',
  street: '/b066b3bc-dbb4-40a4-aafc-1d3a8ad94905.jpg',
  ponder: '/d694dffc-d1e8-4a02-b91b-a3916205270c.jpg',
  driver: '/7f50d32d-99b7-46c8-b6cd-8e6f6eb8c57b.jpg',
  car: '/704e9011-4809-46c6-b106-da3c67edba48.jpg',
  diver: '/a84679f1-42c0-4e9b-ab49-645ec6530114.jpg',
  carLot: '/0bcd69ea-59f9-4a30-92ae-6a8ff9493590.jpg',
  cityMap: '/675690cd-417a-4a38-ba38-42237d2a771a.jpg',
  cityCar: '/7de16e01-1d17-4357-90ce-738935a39459.jpg'
};

const motor = { label: 'Explore motor insurance', to: '/motor-insurance' };
const medical = { label: 'Explore medical insurance', to: '/medical-insurance' };
const life = { label: 'Explore life & savings', to: '/life-insurance' };
const invest = { label: 'Explore investments', to: '/investments' };
const business = { label: 'Explore business solutions', to: '/business' };
const products = { label: 'Find the right cover', to: '/products' };

const posts: BlogPost[] = [
{
  slug: 'how-agri-insurance-protects-farmers-investments',
  title: 'How agri-insurance protects farmers’ investments',
  date: '2026-05-20',
  category: 'Business',
  author: 'Michael Mugo, MD-Designate, CIC Microinsurance Limited',
  readMinutes: 3,
  excerpt:
  'The planting season is here once again, and farmers across Kenya are looking to the skies with cautious optimism, hoping for adequate and well-distributed rainfall.',
  keyPoints: [
  'Weather is less predictable: last year’s short rains brought only 30–60% of expected rainfall, Kenya’s driest season since 1981.',
  'Agriculture contributes about 20% of GDP directly and supports more than 70% of rural households, so failed seasons hit the whole economy.',
  'Crop insurance helps farmers recover from drought, floods and disease, and keep paying for labour and equipment after a bad season.',
  'Livestock insurance compensates for losses from disease, fire or necessary emergency slaughter.'],

  sourceUrl: `${SRC}/how-agri-insurance-protects-farmers-investments/`,
  image: img.outdoors,
  product: { label: 'Explore microinsurance', to: '/microinsurance' }
},
{
  slug: 'how-collective-investment-schemes-are-transforming-community-wealth',
  title: 'How collective investment schemes are transforming community wealth',
  date: '2026-05-20',
  category: 'Investments',
  readMinutes: 3,
  excerpt:
  'Every month, individuals and groups faithfully set aside money in accounts or physical wallets as savings, unaware that funds that sit idle are not interest-earning, but a missed opportunity.',
  keyPoints: [
  'The story of BEMSTAR: a Githunguri merry-go-round that grew into a structured chama and, through a group investment account, into landowners.',
  'Collective investment schemes pool money from many investors and are regulated by the Capital Markets Authority, with independent trustees and custodians.',
  'Money market, balanced and equity funds offer diversification, professional management and lower costs than investing alone.',
  'Money market funds aim to preserve capital while earning a return, and keep your money easy to reach.'],

  sourceUrl: `${SRC}/how-collective-investment-schemes-are-transforming-community-wealth/`,
  image: img.matatu,
  product: invest
},
{
  slug: 'little-known-facts-about-education-policies',
  title: 'Little-known facts about education policies',
  date: '2026-05-20',
  category: 'Life & education',
  author: 'Meshack Miyogo, MD, CIC Life Assurance Limited',
  readMinutes: 4,
  excerpt:
  'As Kenya transitions through education reforms, the cost and complexity of education are becoming more apparent.',
  keyPoints: [
  'Education plans combine long-term saving with insurance, so school fees stay funded if illness, disability or loss of a breadwinner strikes.',
  'Premiums qualify for 15% insurance relief, reducing the tax you pay while you save.',
  'If the parent or guardian dies or is permanently disabled, future premiums can be waived; CIC pays 50% of the sum assured upfront with accrued bonuses.',
  'Once a policy has enough cash value it can become paid-up, so families keep their savings even if they have to stop paying.',
  'CIC Academia starts from KShs 2,000 and pays a lump sum at maturity, with access to a loan facility.'],

  sourceUrl: `${SRC}/little-known-facts-about-education-policies/`,
  image: img.thinking,
  product: life
},
{
  slug: 'insurance-your-trusted-partner',
  title: 'Insurance, your trusted partner',
  date: '2025-12-23',
  category: 'Insurance basics',
  author: 'Grace Joan',
  readMinutes: 3,
  excerpt:
  'Life is full of surprises, both good and challenging. From unexpected health issues to natural disasters or financial setbacks, these uncertainties can disrupt one’s plans and cause stress.',
  keyPoints: [
  'Insurance spreads the cost of unexpected events across many people who pool their premiums.',
  'It protects against financial loss, from medical bills to damage to your home.',
  'It lets families and businesses plan and take calculated risks with confidence.',
  'Digital platforms, microinsurance and pay-as-you-go models are making cover easier to buy and claim on.'],

  sourceUrl: `${SRC}/insurance-your-trusted-partner-2/`,
  image: img.apartment,
  product: products
},
{
  slug: 'challenges-of-implementing-sustainable-life-insurance-in-kenya',
  title: 'The challenges of implementing sustainable life insurance in Kenya',
  date: '2025-12-23',
  category: 'Life & education',
  author: 'Grace Joan',
  readMinutes: 3,
  excerpt:
  'Sustainable life insurance is an essential tool for ensuring long-term financial security while promoting environmental, social, and economic well-being.',
  keyPoints: [
  'Insurance penetration in Kenya is about 2.4% of GDP, against a global average of 7.4%.',
  'Low awareness, affordability pressures and a largely informal workforce make long-term premiums hard to sustain.',
  'Climate risks such as droughts and floods push up the cost of cover in vulnerable regions.',
  'Public education, government incentives and partnerships with community groups and fintechs can widen access.'],

  sourceUrl: `${SRC}/the-challenges-of-implementing-sustainable-life-insurance-in-kenya-2/`,
  image: img.steps,
  product: life
},
{
  slug: 'impacting-lives-through-money-market-funds',
  title: 'How Kenyan insurers are impacting lives through money market funds and other investment funds',
  date: '2025-12-23',
  category: 'Investments',
  author: 'Grace Joan',
  readMinutes: 3,
  excerpt:
  'In Kenya, the financial landscape is evolving, with insurance companies playing a key role in helping people grow their savings and secure their futures.',
  keyPoints: [
  'Money market funds pool money into low-risk investments such as government securities and fixed deposits.',
  'According to the CMA, money market funds made up 40% of collective investment schemes in 2023.',
  'They are liquid: you can usually access your money within one business day, and track it on your phone.',
  'Balanced, equity and fixed-income funds suit different goals and appetites for risk.'],

  sourceUrl: `${SRC}/how-kenyan-insurance-companies-are-impacting-lives-through-money-market-funds-and-other-investment-funds-2/`,
  image: img.chart,
  product: invest
},
{
  slug: 'top-questions-before-choosing-cic-health-insurance',
  title: 'Top questions to ask before choosing CIC health insurance',
  date: '2025-12-23',
  category: 'Health',
  readMinutes: 4,
  excerpt:
  'Buying health insurance is one of the most important financial decisions you can make. It not only protects your health but also shields your finances from unexpected medical bills.',
  keyPoints: [
  'Check what is covered: inpatient, outpatient, prescriptions, check-ups and maternity.',
  'Your premium depends on the plan, your age bracket and the benefit limit you choose.',
  'CIC’s network has over 1,600 providers across all 47 counties; off-panel treatment may need you to pay first and claim back.',
  'Pre-existing and chronic conditions are covered; a waiting period usually applies to new individual covers, waived when moving from another insurer within 30 days.',
  'Cashless claims at network hospitals, with optional dental, optical and maternity add-ons.'],

  sourceUrl: `${SRC}/top-questions-to-ask-before-choosing-cic-health-insurance/`,
  image: img.laughing,
  product: medical
},
{
  slug: 'cic-family-medisure',
  title: 'CIC Family Medisure: comprehensive health coverage for your loved ones',
  date: '2025-12-23',
  category: 'Health',
  readMinutes: 2,
  excerpt:
  'Finding the right health insurance for your family should not be complicated. CIC Family Medisure offers flexible, affordable medical coverage designed to give you peace of mind when it matters most.',
  keyPoints: [
  'Seven inpatient options from KSh 300,000 to KSh 10 million, with family-shared or per-person limits.',
  'Extras include personal accident cover up to KSh 1 million for the principal member, last expense cover and annual check-ups.',
  'Outpatient options cover consultations, medicines, lab tests, child immunisations and dental procedures.',
  'Principal members aged 18–59 can join, with children up to 25; at 65 you move to CIC Seniors Mediplan.'],

  sourceUrl: `${SRC}/cic-family-medisure-comprehensive-health-coverage-for-your-loved-ones/`,
  image: img.friends,
  product: medical
},
{
  slug: 'cic-travel-insurance-your-questions-answered',
  title: 'CIC Travel Insurance: your questions answered',
  date: '2025-12-11',
  category: 'Travel',
  readMinutes: 2,
  excerpt:
  'Planning your next trip? Here are the most common questions about CIC Travel Insurance to help you travel with confidence.',
  keyPoints: [
  'Covers emergency medical treatment and evacuation, cancellations, lost or delayed baggage, missed connections and personal accident.',
  'Many plans cover COVID-19 medical costs and trip interruption, subject to policy terms.',
  'Buy as soon as you book: cancellation cover starts immediately, medical and baggage cover when you travel.',
  'Family and group packages cost less than individual policies.'],

  sourceUrl: `${SRC}/cic-travel-insurance-your-questions-answered/`,
  image: img.roadTrip,
  product: products
},
{
  slug: 'what-is-professional-indemnity-cover',
  title: 'What is professional indemnity cover and do I need it?',
  date: '2025-12-10',
  category: 'Business',
  readMinutes: 3,
  excerpt:
  'Imagine this: you are a lawyer and one of your loyal clients reaches out to you to represent them in a case.',
  keyPoints: [
  'Professional indemnity covers claims arising from errors, omissions, misrepresentation or negligent advice.',
  'It pays court awards and legal defence costs, and can extend to the cost of lost documents.',
  'It builds client confidence and protects your reputation.',
  'Many employers, contractors and government tenders require it.'],

  sourceUrl: `${SRC}/what-is-a-professional-indemnity-cover-and-do-i-need-it/`,
  image: img.street,
  product: business
},
{
  slug: 'youth-and-insurance',
  title: 'Youth and insurance',
  date: '2025-10-28',
  category: 'Insurance basics',
  readMinutes: 2,
  excerpt:
  'In today’s rapidly evolving financial landscape, the youth represent a crucial demographic that the insurance industry must intentionally engage.',
  keyPoints: [
  'Young people face real risks: unemployment, health uncertainty, digital vulnerabilities and the pressure of financial independence.',
  'Insurers need digital channels, simpler language and flexible, affordable products to connect with them.',
  'CIC’s EasyBima platform offers covers such as Student Personal Accident and medical insurance on mobile.',
  'Financial literacy and mentorship help build trust and the next generation of industry leaders.'],

  sourceUrl: `${SRC}/youth-and-insurance/`,
  image: img.matatu,
  product: products
},
{
  slug: 'cic-academia-save-for-your-childs-future',
  title: 'CIC Academia: a smart and simple way to save for your child’s future',
  date: '2025-10-03',
  category: 'Life & education',
  readMinutes: 3,
  excerpt:
  'Every parent dreams of giving their child the best education possible. But let us be honest, school fees keep going up, and without a proper plan, it can feel overwhelming.',
  keyPoints: [
  'Start from KSh 2,000, choose how much to contribute and for how long.',
  'At maturity you receive a lump sum for school fees, college or a first year at university.',
  'If the policyholder dies during the term, CIC takes care of future premiums.',
  'Flexible contributions suit families whose income changes month to month.'],

  sourceUrl: `${SRC}/cic-academia-a-smart-and-simple-way-to-save-for-your-childs-future/`,
  image: img.ponder,
  product: life
},
{
  slug: 'debunking-common-myths-about-car-insurance',
  title: 'Debunking common myths about car insurance in Kenya',
  date: '2025-09-15',
  category: 'Motor',
  readMinutes: 3,
  excerpt:
  'Navigating the world of motor insurance can often be clouded by widespread myths and misconceptions.',
  keyPoints: [
  'Comprehensive cover is broad but not all-inclusive: wear and tear and negligence may be excluded.',
  'Active cover gives you immediate support such as towing and emergency medical help, not just compensation.',
  'Older cars aren’t always cheaper to insure: hard-to-find spare parts can raise the risk.',
  'A claim doesn’t automatically raise your premium, and your car’s colour has no effect on price.'],

  sourceUrl: `${SRC}/debunking-common-myths-about-car-insurance-in-kenya/`,
  image: img.driver,
  product: motor
},
{
  slug: 'factors-that-determine-motor-insurance-premiums',
  title: 'Key determining factors of motor vehicle insurance premiums in Kenya',
  date: '2025-09-15',
  category: 'Motor',
  readMinutes: 2,
  excerpt:
  'Motor vehicle insurance is an essential aspect of responsible car ownership in Kenya. Beyond being a legal requirement, it offers crucial financial protection against accidents, theft and damage.',
  keyPoints: [
  'Rare models cost more to insure because spare parts are scarce.',
  'Commercial use usually costs more than private use.',
  'Comprehensive cover costs more than the legally required third party cover.',
  'Add-ons such as a courtesy car or excess protector raise the premium; age of vehicle and policy term matter too.'],

  sourceUrl: `${SRC}/key-determining-factors-of-motor-vehicle-insurance-premiums-in-kenya/`,
  image: img.car,
  product: motor
},
{
  slug: 'personal-accident-cover-faqs',
  title: 'Personal accident cover: your FAQs answered',
  date: '2025-04-08',
  category: 'Health',
  readMinutes: 3,
  excerpt:
  'Personal Accident Cover is an insurance policy designed to provide financial protection in the event of bodily injury sustained by the insured.',
  keyPoints: [
  'Covers medical expenses up to a limit, permanent total or partial disability, temporary disability and accidental death.',
  'Accidental death pays 100% of the sum assured to your beneficiary.',
  'Ideal if your family relies on your income or you enjoy adventurous activities.',
  'It complements health insurance rather than replacing it, and you can choose your level of cover.'],

  sourceUrl: `${SRC}/personal-accident-cover-your-faqs-answered/`,
  image: img.diver,
  product: products
},
{
  slug: 'how-to-file-a-car-insurance-claim',
  title: 'How to file a car insurance claim: a step-by-step guide',
  date: '2025-01-15',
  category: 'Motor',
  readMinutes: 3,
  excerpt:
  'Filing a car insurance claim, especially in the aftermath of an accident, can be stressful. Understanding the steps involved can make the procedure smoother.',
  keyPoints: [
  'Report to the police and get a police abstract; tell your insurer or agent straight away, with photos of the scene.',
  'Fill in the claim form and submit it with the original abstract, the driver’s ID and driving licence.',
  'The vehicle is assessed at your chosen garage or an assessment centre.',
  'The insurer then authorises repairs or makes a cash-in-lieu offer, investigating first if anything doesn’t match.'],

  sourceUrl: `${SRC}/how-to-file-a-car-insurance-claim-a-step-by-step-guide/`,
  image: img.carLot,
  product: { label: 'Start a claim', to: '/claims' }
},
{
  slug: 'protecting-small-businesses-from-unexpected-losses',
  title: 'Protecting small businesses from unexpected losses',
  date: '2025-05-07',
  category: 'Business',
  readMinutes: 2,
  excerpt:
  'When the President visited Nairobi on February 9, 2025, small business owners in the Central Business District were caught off guard by road closures and restricted movement.',
  keyPoints: [
  'Political events and protests can close businesses for days while rent and wages still fall due.',
  'SMEs contribute over 30% of Kenya’s GDP, yet over half don’t survive beyond five years because of financial shocks.',
  'Public liability insurance covers claims from customers or third parties.',
  'Property insurance covers fire, theft, vandalism, natural disasters and civil unrest; CIC paid a KSh 150 million claim to help Naivas recover.'],

  sourceUrl: `${SRC}/protecting-small-businesses-from-unexpected-losses/`,
  image: img.cityCar,
  product: business
},
{
  slug: 'how-to-avoid-insurance-fraud-and-scams',
  title: 'Tips on how to avoid insurance fraud and scams',
  date: '2025-04-08',
  category: 'Insurance basics',
  readMinutes: 3,
  excerpt:
  'Insurance plays a vital role in financial planning by offering protection against unexpected risks. However, the industry faces challenges such as fraud and scams.',
  keyPoints: [
  'Check that the insurer is licensed by the Insurance Regulatory Authority.',
  'Pay only through official channels, such as company bank accounts or mobile money in the company’s name, and keep receipts.',
  'Be wary of very low premiums with very high cover, and always ask for written policy documents.',
  'Never share policy or bank details with unverified callers; report suspected fraud through CIC’s whistleblowing channel.'],

  sourceUrl: `${SRC}/tips-on-how-to-avoid-insurance-fraud-and-scams/`,
  image: img.cityMap,
  product: { label: 'Contact us', to: '/contact-us' }
}];


/** All posts, newest first. */
export const blogPosts: BlogPost[] = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const formatBlogDate = (iso: string) =>
new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
