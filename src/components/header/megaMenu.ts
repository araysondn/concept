import type { NavItem } from '../../data/navigation';
import { generalInsurance, lifeAssurance, microinsurance } from '../../data/companies';
import { investmentProducts } from '../../data/investments';
import { retirementProducts } from '../../data/retirement';
import { claimTypes, claimsPortalUrl } from '../../data/claims';
import { businessPage, cooperativesPage, corporatesPage } from '../../data/segments';
import type { SegmentPageData } from '../../data/segments';
import type { ContentCardData } from '../patterns';
import { irTabs, nseMarketData } from '../../data/investorRelations';

export type MegaLink = NavItem & {description?: string;};
export type MegaColumn = {heading: string;links: MegaLink[];};
export type MegaPanel = {
  columns: MegaColumn[];
  promo?: {title: string;body: string;cta: NavItem;};
  viewAll?: NavItem;
};

const MAX_LINKS = 6;

/** Keep only internal routes that exist; generic catalogue links fall back to the section page. */
const productLinks = (products: ContentCardData[], fallback: string): MegaLink[] =>
products.slice(0, MAX_LINKS).map((p) => {
  const to = p.link?.to && p.link.to !== '/products' ? p.link.to : fallback;
  return { label: p.title, to };
});

const segmentPanel = (page: SegmentPageData, to: string, viewAllLabel: string): MegaPanel => ({
  columns: page.groups.map((g) => ({
    heading: g.title,
    links: g.products.slice(0, MAX_LINKS).map((p) => ({ label: p.name, to: p.to }))
  })),
  promo: page.promos[0] && {
    title: page.promos[0].title,
    body: page.promos[0].body,
    cta: { label: page.promos[0].link.label, to: page.promos[0].link.to }
  },
  viewAll: { label: viewAllLabel, to }
});

const companyPanel = (groups: typeof lifeAssurance.groups, to: string): MegaColumn[] =>
groups.slice(0, 4).map((g) => ({ heading: g.title, links: productLinks(g.products, to) }));

/** Mega-menu panels keyed by the product-bar route they open from. */
export const megaPanels: Record<string, MegaPanel> = {
  '/motor-insurance': {
    columns: [
    {
      heading: 'Cover your car',
      links: [
      { label: 'Comprehensive cover', to: '/motor-insurance', description: 'Your car, other people and their property' },
      { label: 'Third party only', to: '/motor-insurance', description: 'The cover the law requires' },
      { label: 'Easy Bima', to: '/motor-insurance', description: 'Pay for your cover monthly' },
      { label: 'Motor commercial', to: '/motor-insurance', description: 'For vans, trucks and fleets' }]

    },
    {
      heading: 'Claims and help',
      links: [
      { label: 'Make a motor claim', to: '/claims#claim-online' },
      { label: 'CIC approved garages', to: '/claims#claim-forms' },
      { label: 'Contact us', to: '/contact-us' }]

    }],

    promo: {
      title: 'Spread the cost with Easy Bima',
      body: 'Pay your motor premium in monthly instalments.',
      cta: { label: 'Get a quote', to: '/motor-insurance' }
    },
    viewAll: { label: 'View all motor insurance', to: '/motor-insurance' }
  },

  '/life-assurance': {
    columns: companyPanel(lifeAssurance.groups, '/life-assurance'),
    promo: {
      title: "Plan for your child's education",
      body: 'Save towards school and university fees with CIC Academia.',
      cta: { label: 'Explore investments', to: '/investments' }
    },
    viewAll: { label: 'View all life & savings', to: '/life-assurance' }
  },

  '/investments': {
    columns: [
    {
      heading: 'Unit trusts',
      links: investmentProducts.filter((p) => p.type === 'Unit trust').map((p) => ({ label: p.name, to: '/investments' }))
    },
    {
      heading: 'Life savings plans',
      links: investmentProducts.filter((p) => p.type === 'Life savings plan').map((p) => ({ label: p.name, to: '/investments' }))
    },
    {
      heading: 'Get started',
      links: [
      { label: 'Help me choose', to: '/investments', description: 'Find a fund that suits your goals' },
      { label: 'Compare funds', to: '/investments' },
      { label: 'Open an account', to: '/register' },
      { label: 'Log in to my portfolio', to: '/login' }]

    }],

    promo: {
      title: 'Start with the Money Market Fund',
      body: 'Invest from KES 5,000 and top up from KES 1,000.',
      cta: { label: 'Start investing', to: '/register' }
    },
    viewAll: { label: 'View all investments', to: '/investments' }
  },

  '/retirement': {
    columns: [
    {
      heading: 'For you',
      links: retirementProducts.filter((p) => /jipange/i.test(p.label)).map((p) => ({ label: p.label, to: '/retirement#tab-plans', description: 'A personal pension plan' }))
    },
    {
      heading: 'For employers',
      links: retirementProducts.filter((p) => !/jipange/i.test(p.label)).map((p) => ({ label: p.label, to: '/retirement#tab-plans' }))
    },
    {
      heading: 'Good to know',
      links: [
      { label: 'Retirement FAQs', to: '/retirement#tab-faqs' },
      { label: 'Talk to a specialist', to: '/retirement#tab-talk-to-us' },
      { label: 'Pension portal', to: '/login' }]

    }],

    promo: {
      title: 'Are you ready for the rest of your life?',
      body: 'Start saving for your sunset years with Jipange Plus.',
      cta: { label: 'Plan my retirement', to: '/retirement#tab-talk-to-us' }
    },
    viewAll: { label: 'View all retirement solutions', to: '/retirement' }
  },

  '/general-insurance': {
    columns: companyPanel(generalInsurance.groups, '/general-insurance'),
    promo: {
      title: 'Cover for what you own',
      body: 'Home, property, travel, medical and more from CIC General Insurance.',
      cta: { label: 'Find cover', to: '/products' }
    },
    viewAll: { label: 'View all general insurance', to: '/general-insurance' }
  },

  '/microinsurance': {
    columns: companyPanel(microinsurance.groups, '/microinsurance'),
    viewAll: { label: 'View all microinsurance', to: '/microinsurance' }
  },

  '/claims': {
    columns: [
    {
      heading: 'Make a claim',
      links: claimTypes.map((c) => ({ label: `${c.label} claim`.replace(/claims claim$/i, 'claims'), to: '/claims' }))
    },
    {
      heading: 'Forms and panels',
      links: [
      { label: 'Claim forms', to: '/claims#claim-forms' },
      { label: 'Medical provider panels', to: '/claims#provider-panels' },
      { label: 'CIC approved garages', to: '/claims#claim-forms' }]

    },
    {
      heading: 'Track and get help',
      links: [
      { label: 'Claims portal', href: claimsPortalUrl },
      { label: 'Contact us', to: '/contact-us' }]

    }],

    promo: {
      title: "We're here when you need us most",
      body: 'Tell us what happened and we will guide you through every step.',
      cta: { label: 'Start a claim', to: '/claims#claim-online' }
    },
    viewAll: { label: 'View all claims information', to: '/claims' }
  },

  '/business': segmentPanel(businessPage, '/business', 'View all business solutions'),
  '/corporates': segmentPanel(corporatesPage, '/corporates', 'View all corporate solutions'),
  '/cooperatives': segmentPanel(cooperativesPage, '/cooperatives', 'View all cooperative solutions'),

  '/about': {
    columns: [
    {
      heading: 'Who we are',
      links: [
      { label: 'About CIC Group', to: '/about', description: 'Our vision, mission and values' },
      { label: 'Our history', to: '/about/history', description: 'From 1968 to today' },
      { label: 'Sustainability', to: '/about/sustainability' }]

    },
    {
      heading: 'News and people',
      links: [
      { label: 'Media centre', to: '/about/media-centre' },
      { label: 'Events', to: '/about/events' },
      { label: 'Careers', to: '/about/careers' },
      { label: 'Tenders', to: '/about/tenders' }]

    },
    {
      heading: 'Get in touch',
      links: [
      { label: 'Contact us', to: '/contact-us' },
      { label: 'Data privacy statement', to: '/privacy' }]

    }],

    promo: {
      title: 'Realise your potential with us',
      body: 'See current vacancies at CIC Group.',
      cta: { label: 'View careers', to: '/about/careers#tab-vacancies' }
    },
    viewAll: { label: 'About CIC Group', to: '/about' }
  },

  '/about/leadership': {
    columns: [
    {
      heading: 'Our leadership',
      links: [
      { label: 'Board of Directors', to: '/about/leadership/board-of-directors', description: 'Group and subsidiary boards' },
      { label: 'Executive team', to: '/about/leadership/executive-team', description: 'The people who run our businesses' }]

    }],

    viewAll: { label: 'View our leadership', to: '/about/leadership/board-of-directors' }
  },

  '/about/investor-relations': {
    columns: [
    {
      heading: 'Reports and documents',
      links: irTabs.slice(0, 4).map((t) => ({ label: t.label, to: '/about/investor-relations' }))
    },
    {
      heading: 'Shareholders',
      links: [
      ...irTabs.slice(4).map((t) => ({ label: t.label, to: '/about/investor-relations' })),
      { label: nseMarketData.label, href: nseMarketData.href }]

    }],

    viewAll: { label: 'View investor relations', to: '/about/investor-relations' }
  }
};

// The Life & savings product page shares the Life Assurance panel.
megaPanels['/life-insurance'] = megaPanels['/life-assurance'];

export const panelFor = (item: NavItem): MegaPanel | undefined => item.to ? megaPanels[item.to] : undefined;
