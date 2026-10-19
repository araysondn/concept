export type NavItem = {label: string;to?: string;href?: string;};

export type Segment = 'individual' | 'business' | 'corporates' | 'cooperatives' | 'about';

/** Customer segments, shown top-left in the header (Absa: Personal / Business / Corporate). */
export const topNav: (NavItem & {segment: Segment;})[] = [
{ label: 'Individual', to: '/', segment: 'individual' },
{ label: 'Business', to: '/business', segment: 'business' },
{ label: 'Corporates', to: '/corporates', segment: 'corporates' },
{ label: 'Cooperatives', to: '/cooperatives', segment: 'cooperatives' }];


/** Burgundy product bar, one set per segment. */
export const segmentNav: Record<Segment, NavItem[]> = {
  individual: [
  { label: 'Motor insurance', to: '/motor-insurance' },
  { label: 'Medical', to: '/medical-insurance' },
  { label: 'Life & savings', to: '/life-insurance' },
  { label: 'Investments', to: '/investments' },
  { label: 'Retirement', to: '/retirement' },
  { label: 'Home & property', to: '/home-insurance' },
  { label: 'Pharmacy', to: '/pharmacy' },
  { label: 'Claims', to: '/claims' },
  { label: 'All products', to: '/products' }],

  business: [
  { label: 'Business solutions', to: '/business' },
  { label: 'Motor insurance', to: '/motor-insurance' },
  { label: 'Retirement', to: '/retirement' },
  { label: 'General insurance', to: '/general-insurance' },
  { label: 'Microinsurance', to: '/microinsurance' },
  { label: 'Claims', to: '/claims' },
  { label: 'All products', to: '/products' }],

  corporates: [
  { label: 'Corporate solutions', to: '/corporates' },
  { label: 'Retirement', to: '/retirement' },
  { label: 'Life assurance', to: '/life-assurance' },
  { label: 'General insurance', to: '/general-insurance' },
  { label: 'Investments', to: '/investments' },
  { label: 'Claims', to: '/claims' }],

  cooperatives: [
  { label: 'Cooperative solutions', to: '/cooperatives' },
  { label: 'Microinsurance', to: '/microinsurance' },
  { label: 'Retirement', to: '/retirement' },
  { label: 'Life assurance', to: '/life-assurance' },
  { label: 'Claims', to: '/claims' }],

  about: [
  { label: 'About us', to: '/about' },
  { label: 'Leadership', to: '/about/leadership' },
  { label: 'Our history', to: '/about/history' },
  { label: 'Investor relations', to: '/about/investor-relations' },
  { label: 'Sustainability', to: '/about/sustainability' },
  { label: 'Media centre', to: '/about/media-centre' },
  { label: 'Events', to: '/about/events' },
  { label: 'Tenders', to: '/about/tenders' },
  { label: 'Careers', to: '/about/careers' }]

};

/** Which segment's product bar to show for a given path. */
export function segmentFor(pathname: string): Segment {
  if (pathname.startsWith('/about') || pathname === '/contact-us' || pathname === '/privacy') return 'about';
  const seg = topNav.find((t) => t.to !== '/' && pathname.startsWith(t.to!));
  return seg ? seg.segment : 'individual';
}

/** Kept for any older imports: the Individual product bar. */
export const subNav = segmentNav.individual;

export const utilityNav: NavItem[] = [
{ label: 'About CIC', to: '/about' },
{ label: 'Media centre', to: '/about/media-centre' },
{ label: 'Blog', to: '/blog' },
{ label: 'Contact us', to: '/contact-us' }];


export const legalLinks: NavItem[] = [
{ label: 'Data Privacy Statement', to: '/privacy' },
{ label: 'Terms of Use' },
{ label: 'Service Charter' },
{ label: 'Whistleblowing' }];


export const contact = {
  phone: '+254 703 099 120',
  landline: '(020) 282 3000',
  whatsapp: '+254 703 099 000',
  email: 'info@cic.co.ke',
  headOffice: 'CIC Plaza, Mara Road, Upperhill, Nairobi, Kenya'
};

export const footerColumns: {groups: {title: string;links: NavItem[];}[];}[] = [
{
  groups: [
  {
    title: 'Quick links',
    links: [
    { label: 'Make a claim', to: '/claims' },
    { label: 'Self-service portal', to: '/online' },
    { label: 'Blog', to: '/blog' },
    { label: 'Careers', to: '/about/careers' },
    { label: 'Tenders', to: '/about/tenders' },
    { label: 'Contact us', to: '/contact-us' }]

  }]

},
{
  groups: [
  {
    title: 'Who we are',
    links: [
    { label: 'About CIC Group', to: '/about' },
    { label: 'Leadership', to: '/about/leadership' },
    { label: 'Our history', to: '/about/history' },
    { label: 'Investor relations', to: '/about/investor-relations' },
    { label: 'Sustainability', to: '/about/sustainability' },
    { label: 'Media centre', to: '/about/media-centre' },
    { label: 'Events', to: '/about/events' }]

  }]

},
{
  groups: [
  {
    title: 'Our businesses',
    links: [
    { label: 'CIC General Insurance', to: '/general-insurance' },
    { label: 'CIC Life Assurance', to: '/life-assurance' },
    { label: 'CIC Asset Management', to: '/investments' },
    { label: 'CIC Microinsurance', to: '/microinsurance' },
    { label: 'CIC Pharmacy', to: '/pharmacy' }]

  },
  {
    title: 'Solutions for',
    links: [
    { label: 'Individuals', to: '/' },
    { label: 'Businesses', to: '/business' },
    { label: 'Corporates', to: '/corporates' },
    { label: 'Cooperatives', to: '/cooperatives' }]

  }]

},
{
  groups: [
  {
    title: 'Subsidiaries',
    links: [
    { label: 'Kenya', href: 'https://ke.cicinsurancegroup.com/' },
    { label: 'Uganda', href: 'https://ug.cicinsurancegroup.com/' },
    { label: 'Malawi', href: 'https://mw.cicinsurancegroup.com/' },
    { label: 'South Sudan', href: 'https://ss.cicinsurancegroup.com/' }]

  },
  {
    title: 'Regulators',
    links: [
    { label: 'Insurance Regulatory Authority' },
    { label: 'Capital Markets Authority' },
    { label: 'Nairobi Securities Exchange' }]

  }]

}];
