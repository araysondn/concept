// Impact sample data. Everything here is illustrative for the design concept.

export const provider = {
  name: 'Upendo Medical Centre',
  number: 'SP-004512',
  initials: 'UM',
  town: 'Kisumu',
  payoutAccount: 'Co-operative Bank ••• 4471'
};

export type MenuItem = {label: string;icon: string;color?: string;to?: string;submenu?: {label: string;to?: string;}[];};

export const mainMenu: MenuItem[] = [
{ label: 'Home', icon: 'home', to: '/impact/dashboard' },
{ label: 'Check member cover', icon: 'search', to: '/impact/dashboard#cover' },
{ label: 'Submit a claim', icon: 'plus' }];


export const workMenu: MenuItem[] = [
{
  label: 'Claims',
  icon: 'claims',
  color: '#FEBE10',
  submenu: [
  { label: 'All claims', to: '/impact/dashboard#claims' },
  { label: 'Drafts' },
  { label: 'Awaiting vetting' },
  { label: 'Queried' },
  { label: 'Rejected' },
  { label: 'Paid' }]

},
{ label: 'Pre-authorisations', icon: 'preauth', color: '#2E9E3E', submenu: [{ label: 'Request approval' }, { label: 'My requests' }] },
{ label: 'Payments', icon: 'payments', color: '#AC232D', submenu: [{ label: 'Remittances' }, { label: 'Statements' }] },
{ label: 'Members', icon: 'members', color: '#86191F', submenu: [{ label: 'Visits today' }, { label: 'Member search' }] },
{ label: 'Reports', icon: 'reports', color: '#5F5F5F', submenu: [{ label: 'Monthly summary' }, { label: 'Claims ageing' }] }];


export const stats = [
{ label: 'Claims this month', value: '128', note: '+12 on last month', up: true },
{ label: 'Awaiting vetting', value: '14', note: '3 older than 7 days', up: false },
{ label: 'Paid this month', value: 'KES 1,284,500', note: '96 claims', up: true },
{ label: 'Average days to pay', value: '9', note: 'Target: 14 days', up: true }];


export const claimStages = ['Submitted', 'Vetted', 'Approved', 'Paid'];

export type Claim = {
  id: string;
  member: string;
  memberNo: string;
  service: string;
  date: string;
  amount: string;
  stage: number;
  queried?: boolean;
};

export const recentClaims: Claim[] = [
{ id: 'CL-26-0981', member: 'Achieng Otieno', memberNo: 'MI-2210-4471', service: 'Outpatient consultation', date: '17 Oct 2026', amount: 'KES 2,400', stage: 0 },
{ id: 'CL-26-0977', member: 'Peter Kamau', memberNo: 'MI-2208-1183', service: 'Maternity admission', date: '16 Oct 2026', amount: 'KES 38,500', stage: 1, queried: true },
{ id: 'CL-26-0965', member: 'Fatuma Hassan', memberNo: 'MI-2105-0912', service: 'Laboratory tests', date: '15 Oct 2026', amount: 'KES 4,750', stage: 2 },
{ id: 'CL-26-0958', member: 'John Mwangi', memberNo: 'MI-2301-7724', service: 'Inpatient – 3 nights', date: '13 Oct 2026', amount: 'KES 27,900', stage: 3 },
{ id: 'CL-26-0949', member: 'Grace Wanjiru', memberNo: 'MI-2207-3390', service: 'Outpatient consultation', date: '12 Oct 2026', amount: 'KES 1,800', stage: 3 }];


export const nextPayment = {
  date: '24 Oct 2026',
  amount: 'KES 412,300',
  claims: 31
};

export const sampleMember = {
  name: 'Achieng Otieno',
  plan: 'Family cover · 5 dependants',
  validTo: '31 Mar 2027',
  limits: [
  { label: 'Outpatient', used: 6400, total: 20000 },
  { label: 'Inpatient', used: 0, total: 100000 }]

};
