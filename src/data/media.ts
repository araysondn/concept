// Content from cicinsurancegroup.com/media-center/, /events/ and /tenders/ (October 2026).

export type PressRelease = {
  title: string;
  /** ISO date, or null when the source shows none. */
  date: string | null;
  summary?: string;
  href: string;
  /** True when the release is a PDF download rather than an article. */
  pdf?: boolean;
  /** Topic label and local illustration for the media centre (assigned for this design). */
  topic: MediaTopic;
  image: string;
};

export type MediaTopic = 'Results' | 'Launches' | 'Partnerships' | 'Sustainability' | 'Cooperatives';
export const mediaTopics: MediaTopic[] = ['Results', 'Launches', 'Partnerships', 'Sustainability', 'Cooperatives'];

const site = 'https://www.cicinsurancegroup.com';

export const pressReleases: PressRelease[] = [
{
  title: 'CIC Insurance Group PLC records a 70% rise in H1 2026 net profits',
  date: '2026-08-28',
  summary: 'Profit after tax rose 70%, to about KSh 1.09 billion.',
  href: `${site}/cic-insurance-group-plc-records-a-70-rise-in-h1-2026-net-profits/`,
  topic: 'Results',
  image: '/04fbb304-f647-46e9-b229-2e5497528707.jpg'
},
{
  title: "CIC's newly launched microinsurance subsidiary to offer affordable insurance solutions to Kenyans",
  date: '2026-07-30',
  summary: 'Launch of CIC Impact, a dedicated microinsurance subsidiary.',
  href: `${site}/cics-newly-launched-microinsurance-subsidiary-to-offer-affordable-insurance-solutions-to-kenyans/`,
  topic: 'Launches',
  image: '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg'
},
{
  title: 'CIC Asset Management Expands Offshore Investment Access for Kenyans by launching the CIC Global Balanced Special Fund',
  date: '2025-10-08',
  summary: 'A new fund that makes offshore investing more accessible to Kenyans.',
  href: `${site}/cic-asset-management-expands-offshore-investment-access-for-kenyans-by-launching-the-cic-global-balanced-special-fund/`,
  topic: 'Launches',
  image: '/cc1fa332-e7e8-46c7-847e-2ead4c6b6142.jpg'
},
{
  title: "CIC Group and Women's World Banking Partner to Advance Inclusive Insurance Solutions for Women",
  date: '2025-05-22',
  summary: "A partnership to advance women's economic empowerment through inclusive insurance.",
  href: `${site}/cic-group-and-womens-world-banking-partner-to-advance-inclusive-insurance-solutions-for-women/`,
  topic: 'Partnerships',
  image: '/953d4772-30ed-48cf-9516-b192cb47b7e0.jpg'
},
{
  title: 'CIC Insurance Group Rolls Out its Six-year Sustainability Plan 2025-2030',
  date: '2024-11-12',
  summary: 'Release of the inaugural Sustainability Report 2024 and launch of a plan built on four pillars.',
  href: `${site}/cic-insurance-group-rolls-out-its-six-year-sustainability-plan-2025-2030/`,
  topic: 'Sustainability',
  image: '/a84679f1-42c0-4e9b-ab49-645ec6530114.jpg'
},
{
  title: 'CIC Group Empowers Cooperative Societies on Digital Transformation for Sustainable Growth',
  date: null,
  href: `${site}/wp-content/uploads/2024/09/Press-Release-Cooperatives-CEOs-Forum-Fin-2024.pdf`,
  topic: 'Cooperatives',
  image: '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg',
  pdf: true
},
{
  title: 'CIC And AA Kenya Launch Accident Scene Management Service',
  date: '2022-07-20',
  summary: 'A platform that operates 24/7 to support accident response.',
  href: `${site}/cic-and-aa-kenya-launch-accident-scene-management-service/`,
  topic: 'Partnerships',
  image: '/0bcd69ea-59f9-4a30-92ae-6a8ff9493590.jpg'
},
{
  title: 'CIC Insurance Group Plc 2021 Full-year performance',
  date: '2022-03-16',
  summary: 'Profit before tax of about KSh 960 million.',
  href: `${site}/cic-insurance-group-plc-2021-full-year-performance/`,
  topic: 'Results',
  image: '/d694dffc-d1e8-4a02-b91b-a3916205270c.jpg'
},
{
  title: 'CIC Insurance Group Plc 2021 Half Year Performance',
  date: '2021-08-10',
  summary: 'Half-year profit before tax of about KSh 337 million.',
  href: `${site}/cic-insurance-group-plc-2021-half-year-performance/`,
  topic: 'Results',
  image: '/5edc0fda-3296-43a7-9b4b-1fb06fa2c3e0.jpg'
}];


export type CalendarEvent = {name: string;date: string;};

export const eventCalendar2026: CalendarEvent[] = [
{ name: 'Release of the audited financial results for the year ended 31st December 2025', date: '2026-03-31' },
{ name: 'Group Investor Briefing', date: '2026-03-31' },
{ name: '47th Annual General Meeting', date: '2026-05-08' },
{ name: "Publication of Group's Sustainability Report", date: '2026-06-30' },
{ name: 'Release of the 2026 Half-Year Financial Results', date: '2026-08-28' }];


/** The live tenders page lists none ("No Available Tenders"). */
export const openTenders: {title: string;reference: string;closes: string;href?: string;}[] = [];

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
