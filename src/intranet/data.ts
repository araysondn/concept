// CIC Group intranet content, from the 2026-10-02 prototype and cic-intranet-prototype.html.

export const me = { name: 'Amara', fullName: 'Amara Mwangi', email: 'amara.mwangi@cic.co.ke', where: 'Claims · Nairobi', initials: 'AM' };

export type NavItem = {label: string;to?: string;children?: {label: string;to?: string;}[];allLabel?: string;};

export const nav: NavItem[] = [
{ label: 'Home', to: '/intranet' },
{ label: 'Self-service', children: [{ label: 'Asset Tracker' }, { label: 'Design Desk' }, { label: 'Travel Desk' }], allLabel: 'All self-service apps' },
{ label: 'Departments', children: [{ label: 'Finance' }, { label: 'Brand & Comms' }, { label: 'People & Culture' }, { label: 'ICT & Digital' }], allLabel: 'All departments' },
{ label: 'News', to: '/intranet/news' },
{ label: 'Events', to: '/intranet/events' },
{ label: 'Resource Centre', to: '/intranet/resources' }];


export const footerLinks = ['Contact Corporate Comms', 'Report an issue', 'Privacy notice', 'Accessibility'];

/** Roles from the prototype: the dashboard's tasks change with the role you view as. */
export const roles = [
{ id: 'user', name: 'End user', desc: 'Request and track your own items', stats: [[3, 'My open requests'], [1, 'Waiting on others'], [5, 'Completed this month']], next: ['Next up: Submit receipts for your Kisumu trip', 'Due Friday, 16 Oct', 'Open'] },
{ id: 'pa', name: 'PA / Admin', desc: 'Book and request on behalf of others', stats: [[4, 'Requests on behalf'], [1, 'Drafts to finish'], [2, 'Booked this week']], next: ['Next up: Complete booking for the Group CEO’s Mombasa trip', 'Flights held until 5:00 PM today', 'Continue'] },
{ id: 'approver', name: 'Reviewer / approver', desc: 'Review and approve your team’s requests', stats: [[5, 'Pending approvals'], [2, 'Due this week'], [7, 'Approved this week']], next: ['Next up: Approve 3 travel requests from your team', 'Oldest has waited 2 days', 'Review'] },
{ id: 'hod', name: 'HOD – Claims', desc: 'Final sign-off for the Claims department', stats: [[2, 'Pending approvals'], [1, 'Due this week'], [1, 'Completed this week']], next: ['Next up: Approve pending leave requests', '2 requests waiting on you', 'Open'] },
{ id: 'finance', name: 'Finance', desc: 'Imprest, per diems and the asset register', stats: [[6, 'Advances to process'], [3, 'Reconciliations due'], [12, 'Paid this week']], next: ['Next up: Process imprest for 4 approved trips', 'KES 186,400 in total', 'Process'] },
{ id: 'sys', name: 'System user (IT/Admin)', desc: 'Configure workflows and reference data', stats: [[2, 'Config requests'], [1, 'Failed syncs'], [4, 'Resolved this week']], next: ['Next up: Review last night’s failed HR sync', '1 job needs attention', 'Review'] },
{ id: 'ict', name: 'ICT admin', desc: 'Manage users, access and roles', stats: [[8, 'Access requests'], [3, 'Role changes'], [15, 'Granted this week']], next: ['Next up: Grant Design Desk access to 3 new joiners', 'Requested by People & Culture', 'Review'] }] as
const;
export type Role = typeof roles[number];

export const heroSlides = [
{ tag: 'Company news', title: 'CEO Town Hall: our priorities for the year ahead', body: 'Join the Group CEO on 15 September for the plan, the numbers and your questions.', image: '/intranet/hero-townhall.jpg' },
{ tag: 'People & Culture', title: 'Flexible leave is now live on ESS', body: 'Book flexi-days and compressed weeks in two clicks.', image: '/intranet/hero-retirement.jpg' },
{ tag: 'Subsidiary spotlight', title: 'CIC General wins regional claims excellence award', body: 'Fastest motor claims settlement in East Africa.', image: '/intranet/hero-investment.jpg' }];


export const newJoiners = [
{ name: 'Brian Otieno', team: 'Underwriting · Nairobi', joined: 'Joined Sep 1' },
{ name: 'Faith Wanjiru', team: 'Claims · Mombasa', joined: 'Joined Sep 1' },
{ name: 'Kevin Mutua', team: 'Finance · Nairobi', joined: 'Joined Aug 25' },
{ name: 'Grace Achieng', team: 'ICT & Digital · Nairobi', joined: 'Joined Aug 25' },
{ name: 'Peter Kamau', team: 'Corporate Comms · Nairobi', joined: 'Joined Aug 18' },
{ name: 'Rose Atieno', team: 'People & Culture · Kisumu', joined: 'Joined Aug 18' },
{ name: 'Daniel Mwangi', team: 'ICT & Digital · Nairobi', joined: 'Joined Aug 11' },
{ name: 'Lydia Kemboi', team: 'People & Culture · Nairobi', joined: 'Joined Aug 11' },
{ name: 'Aisha Noor', team: 'ICT & Digital · Mombasa', joined: 'Joined Aug 4' }];


export const homeEvents = [
{ day: '08', month: 'Sept', title: 'CIC Family Day', where: 'Two Rivers Mall', time: '9:00 AM' },
{ day: '15', month: 'Sept', title: 'Quarterly Town Hall', where: 'Head Office Auditorium', time: '2:00 PM' },
{ day: '22', month: 'Sept', title: 'Wellness Wednesday', where: 'Nairobi Office', time: '12:30 PM' }];


export type Reaction = 'like' | 'heart' | 'party';
export type Post = {
  id: string;
  who: string;
  initials?: string;
  team?: boolean; // posted by a team rather than a person
  type: 'Praise' | 'Announcement' | 'Update' | 'Question';
  where: string;
  time: string;
  title: string;
  body: string;
  reactions: Partial<Record<Reaction, number>>;
};

export const posts: Post[] = [
{ id: 'p1', who: 'Grace Achieng', type: 'Praise', where: 'All Company', time: '18m', title: 'Shoutout to the Claims Team', body: 'Amazing turnaround on the Q3 client escalations this week – true team spirit!', reactions: { like: 24, heart: 12, party: 8 } },
{ id: 'p2', who: 'IT Support Team', initials: 'IT', team: true, type: 'Announcement', where: 'IT Community', time: '1h', title: 'Scheduled maintenance tonight', body: 'Systems will be briefly unavailable 11PM–1AM for planned upgrades.', reactions: { like: 9, heart: 3 } },
{ id: 'p3', who: 'Faith Wanjiru', type: 'Update', where: 'Claims', time: '3h', title: 'Motor claims turnaround now under 48 hours', body: 'Thanks to everyone who piloted the new digital assessment flow in Mombasa and Nairobi. Average turnaround for motor claims dropped from 5 days to under 48 hours in September, and customer satisfaction scores rose 11 points. From November the flow rolls out to Kisumu, Nakuru and Eldoret. Branch leads, please book your team onto one of the walkthrough sessions on the Claims workspace before the end of October.', reactions: { like: 31, heart: 9, party: 6 } },
{ id: 'p4', who: 'People & Culture', initials: 'PC', team: true, type: 'Announcement', where: 'All Company', time: '5h', title: 'Open enrolment for the medical scheme closes Friday', body: 'Add dependants or change your cover level in ESS before 17 October.', reactions: { like: 14, heart: 2 } },
{ id: 'p5', who: 'Peter Kamau', type: 'Praise', where: 'Corporate Comms', time: 'Yesterday', title: 'Thank you, Brand & Comms', body: 'The AGM report layout landed two days early – brilliant work from Dennis and the Design Desk.', reactions: { like: 18, heart: 7, party: 4 } },
{ id: 'p6', who: 'Kevin Mutua', type: 'Question', where: 'Finance', time: 'Yesterday', title: 'Per diem rates for Uganda trips?', body: 'Does the new travel policy apply the regional per diem table to Kampala, or the international one?', reactions: { like: 3 } },
{ id: 'p7', who: 'Grace Achieng', type: 'Update', where: 'ICT & Digital', time: '2 days', title: 'MFA rollout: 72% of staff enrolled', body: 'Set up the Microsoft Authenticator app before 30 October to keep access to email.', reactions: { like: 22, heart: 1 } },
{ id: 'p8', who: 'Rose Atieno', type: 'Praise', where: 'Kisumu branch', time: '3 days', title: 'Welcome to the Kisumu team', body: 'Please join us in welcoming Lydia, Daniel and Aisha who joined us this month.', reactions: { like: 27, heart: 11, party: 9 } }];


/**
 * Third-party embeds. Paste the embed address from the provider as src (for Viva Engage: the community's
 * embed code in Viva Engage, or use the Viva Engage web part when this runs inside SharePoint).
 * Leave src empty to show the placeholder.
 */
export const embeds = {
  conversations: { src: '', title: 'Viva Engage – All Company', openUrl: 'https://engage.cloud.microsoft/', height: 560 }
};

export const quickLinks = ['My payslip', 'Leave booking', 'Submit a claim', 'IT helpdesk', 'Expense report', 'Staff directory'];
export const newsTopics = ['Company News', 'HR Updates', 'IT Notices', 'Subsidiary Spotlight'] as const;
export type NewsTopic = typeof newsTopics[number];

export type Article = {
  id: string;
  topic: NewsTopic;
  title: string;
  summary: string;
  author: string;
  date: string;
  longDate: string;
  likes: number;
  comments: number;
  image?: string;
  placeholder?: 'dark' | 'amber';
};

export const articles: Article[] = [
{ id: 'ngr-0512', topic: 'Company News', title: 'CIC Group Reports Strong H1 2026 Growth Across All Subsidiaries', summary: 'Group revenue and underwriting margins both improved on the back of disciplined claims management and continued growth in the bancassurance channel.', author: 'Group Communications', date: '28 Sept 2026', longDate: '28 September 2026', likes: 42, comments: 4, image: '/intranet/hero-investment.jpg' },
{ id: 'ngr-0505', topic: 'HR Updates', title: 'New Flexible Leave Policy Now Live on ESS', summary: 'Staff can now apply for flexible leave blocks directly through the Employee Self-Service portal, cutting approval time from days to hours.', author: 'People & Culture', date: '26 Sept 2026', longDate: '26 September 2026', likes: 24, comments: 3, image: '/intranet/hero-retirement.jpg' },
{ id: 'ngr-0498', topic: 'IT Notices', title: 'Scheduled Core Systems Upgrade This Weekend', summary: 'Core policy and claims systems will be briefly unavailable this Saturday night as ICT rolls out a scheduled infrastructure upgrade.', author: 'ICT & Digital', date: '24 Sept 2026', longDate: '24 September 2026', likes: 15, comments: 0, placeholder: 'dark' },
{ id: 'ngr-0501', topic: 'Subsidiary Spotlight', title: 'CIC General Wins Regional Claims Excellence Award', summary: 'CIC General Insurance was recognised for fastest average claims turnaround among regional insurers at this year’s industry awards.', author: 'CIC General Insurance', date: '22 Sept 2026', longDate: '22 September 2026', likes: 31, comments: 1, image: '/intranet/hero-investment.jpg' },
{ id: 'ngr-0533', topic: 'Company News', title: 'Group CEO Shares FY26 Strategic Priorities', summary: 'In this quarter’s town hall, the Group CEO outlined three strategic priorities for the remainder of FY26, from digital claims to regional growth.', author: 'Executive Office', date: '19 Sept 2026', longDate: '19 September 2026', likes: 38, comments: 0, image: '/intranet/hero-retirement.jpg' },
{ id: 'ngr-0471', topic: 'HR Updates', title: "Meet This Quarter's New Leadership Hires", summary: 'Three senior leaders joined CIC this quarter across Actuarial, Treasury and People & Culture. Here’s a quick introduction to each of them.', author: 'People & Culture', date: '15 Sept 2026', longDate: '15 September 2026', likes: 19, comments: 0, placeholder: 'amber' },
{ id: 'ngr-0455', topic: 'IT Notices', title: 'Multi-Factor Authentication Rolling Out Group-Wide', summary: 'MFA will become mandatory for all staff accessing CIC systems remotely starting next month. Here’s how to set it up in under five minutes.', author: 'ICT & Digital', date: '11 Sept 2026', longDate: '11 September 2026', likes: 22, comments: 1, image: '/intranet/hero-home.jpg' }];


// The prototype's article body is placeholder copy; it is kept as-is.
export const articleBody = {
  intro: 'Laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  heading: 'What to expect',
  rest: 'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis iste natus error.'
};

export const eventTypes = ['Company-wide', 'Regional', 'Wellness'] as const;
export type EventType = typeof eventTypes[number];

export type IntranetEvent = {
  id: string;
  date: string; // ISO
  title: string;
  type: EventType;
  where: string;
  time: string;
  mode: 'Physical' | 'Virtual' | 'Hybrid';
};

export const featuredEvent: IntranetEvent = { id: 'family-day', date: '2026-10-29', title: 'CIC Family Day 2026', type: 'Company-wide', where: 'Two Rivers Mall, Nairobi', time: '9:00 AM - 4:00 PM', mode: 'Physical' };

export const nextEvents: IntranetEvent[] = [
{ id: 'q3-town-hall', date: '2026-10-08', title: 'Q3 Regional Performance Town Hall', type: 'Company-wide', where: 'Head Office Auditorium', time: '10:00 AM', mode: 'Physical' },
{ id: 'digital-skills', date: '2026-10-14', title: 'Digital Skills Workshop', type: 'Company-wide', where: 'Online', time: '2:00 PM', mode: 'Virtual' },
{ id: 'mindfulness', date: '2026-10-21', title: 'Midweek Wellness & Mindfulness Session', type: 'Wellness', where: 'Nairobi Office', time: '12:30 PM', mode: 'Physical' },
featuredEvent];


export const upcomingEvents: IntranetEvent[] = [
{ id: 'product-briefing', date: '2026-11-05', title: 'New Product Line Regional Briefing', type: 'Regional', where: 'Kisumu Regional Office', time: '10:00 AM - 12:00 PM', mode: 'Physical' },
{ id: 'nutrition-clinic', date: '2026-11-18', title: 'Wellness Wednesday: Nutrition Clinic', type: 'Wellness', where: 'Nairobi Office', time: '11:00 AM - 12:00 PM', mode: 'Physical' },
{ id: 'fy27-kickoff', date: '2026-11-25', title: 'FY27 Planning Kickoff Briefing', type: 'Company-wide', where: 'Head Office Auditorium', time: '9:00 AM - 12:00 PM', mode: 'Hybrid' },
{ id: 'recognition-breakfast', date: '2026-12-12', title: 'Year-End Staff Recognition Breakfast', type: 'Company-wide', where: 'Head Office Auditorium', time: '8:00 AM - 10:00 AM', mode: 'Physical' }];


export const resourceCategories = [
{ id: 'people', title: 'People & Culture Templates', body: 'People forms, policies, onboarding resources and staff templates.', image: '/intranet/res-people.jpg' },
{ id: 'it', title: 'IT Guides', body: 'Access, security and device support guides.', image: '/intranet/res-it.jpg' },
{ id: 'finance', title: 'Finance Forms', body: 'Claims, cash requests and procurement forms.', image: '/intranet/res-finance.jpg' },
{ id: 'brand', title: 'Brand Assets', body: 'Logos, templates and brand guidelines.', image: '/intranet/res-brand.jpg' }];


export type Resource = {title: string;category: string;type: 'PDF' | 'XLSX' | 'DOCX' | 'PPTX' | 'ZIP';updated: string;};

// The first five are the prototype's "Recently Added" list; the rest fill each category to the prototype's counts (4, 3, 3, 3).
export const resources: Resource[] = [
{ title: 'Leave Application Template', category: 'people', type: 'PDF', updated: '2026-09-28' },
{ title: 'ICT Acceptable Use Guide', category: 'it', type: 'PDF', updated: '2026-09-24' },
{ title: 'Annual Leave Policy 2026', category: 'people', type: 'PDF', updated: '2026-08-22' },
{ title: 'Staff Expense Claim Form', category: 'finance', type: 'XLSX', updated: '2026-08-18' },
{ title: 'CIC Brand Guidelines 2026', category: 'brand', type: 'PDF', updated: '2026-08-10' },
{ title: 'New Staff Onboarding Checklist', category: 'people', type: 'DOCX', updated: '2026-07-30' },
{ title: 'Multi-Factor Authentication Setup Guide', category: 'it', type: 'PDF', updated: '2026-07-21' },
{ title: 'Petty Cash Request Form', category: 'finance', type: 'XLSX', updated: '2026-07-15' },
{ title: 'CIC Presentation Template', category: 'brand', type: 'PPTX', updated: '2026-07-08' },
{ title: 'Performance Review Form', category: 'people', type: 'DOCX', updated: '2026-06-26' },
{ title: 'Remote Access (VPN) Guide', category: 'it', type: 'PDF', updated: '2026-06-17' },
{ title: 'Procurement Request Form', category: 'finance', type: 'PDF', updated: '2026-06-09' },
{ title: 'CIC Logo Pack', category: 'brand', type: 'ZIP', updated: '2026-05-28' }];
