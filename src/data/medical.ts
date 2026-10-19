import type { ProductPageData } from './productPage';

const images = {
  hero: '/953d4772-30ed-48cf-9516-b192cb47b7e0.jpg',
  family: '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg',
  seniors: '/5edc0fda-3296-43a7-9b4b-1fb06fa2c3e0.jpg',
  adviser: '/d694dffc-d1e8-4a02-b91b-a3916205270c.jpg',
  team: '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg',
  friends: '/19f98733-386d-4c89-bb7e-c68bd62f3cc7.jpg'
};

/** Plans the cover finder can recommend, from CIC General Insurance's medical range. */
export const medicalPlans = {
  family: { name: 'Family Health Insurance', body: 'Medical cover for you and your family.' },
  seniors: { name: 'Seniors Mediplan', body: 'Medical cover for older adults who want continued access to quality care.' },
  sme: { name: 'CIC Medipack (SME)', body: 'Medical cover for small and medium businesses and their staff.' },
  corporate: { name: 'CIC Medisure Corporate', body: 'In-patient medical cover for employers.' },
  coopcare: { name: 'CoopCare Health Insurance', body: 'Affordable medical cover for members of SACCOs and cooperative societies.' },
  afyaBora: { name: 'CIC Afya Bora', body: 'Medical cover for cooperative members.' }
};

export const medicalPage: ProductPageData = {
  hero: {
    image: images.hero,
    title: 'Health cover that has your back',
    intro: "Look after yourself and the people who matter most. We'll help you find the right medical cover.",
    cta: { label: 'Get a medical quote', to: '/contact-us' },
    disclaimer: 'The cover finder suggests a plan based on your answers. We confirm cover, benefits and premiums when you get a quote.'
  },
  breadcrumb: [
  { label: 'Individual', to: '/' },
  { label: 'Insurance', to: '/products' },
  { label: 'Medical insurance' }],

  help: {
    title: 'How can we help?',
    items: [
    { label: 'Get a medical quote', icon: 'medical', to: '/contact-us' },
    { label: 'Cover for seniors', icon: 'user', to: '/medical-insurance#get-started' },
    { label: 'Medical cover for my staff', icon: 'file', to: '/business' },
    { label: 'Find a hospital on our panel', icon: 'guide', to: '/claims#provider-panels' },
    { label: 'Make a medical claim', icon: 'claim', to: '/claims' },
    { label: 'Talk to us', icon: 'talk', to: '/contact-us' }]

  },
  know: {
    title: 'What you need to know about our medical insurance',
    tabs: [
    {
      label: 'Why choose us?',
      body: 'For more than five decades CIC has helped Kenyans look after what matters most. In 2023, CIC General Insurance was named Medical Underwriter of the Year, Group Medical, at the Think Business Insurance Awards. Whether you are covering yourself, your family, your staff or your cooperative members, we have a plan built around your needs.'
    },
    {
      label: 'How it works',
      body: 'Getting covered is simple:',
      points: [
      'Tell us who needs cover: you, your family, your staff or your members.',
      'Choose a plan and the benefit limits that suit your budget.',
      'Get treatment at a hospital or clinic on your plan’s provider panel.',
      'Renew each year to keep your cover going.']

    },
    {
      label: 'Provider panels',
      body: 'Each plan has a panel of hospitals, clinics and pharmacies where you can get treatment. Download the latest panels from our claims page:',
      points: ['Afya Bora provider panel', 'Corporate provider panel', 'CoopCare provider panel', 'Additional providers']
    },
    {
      label: 'Making a medical claim',
      body: 'Most treatment at panel providers is settled directly with the provider. If you need to make a claim:',
      points: [
      'Contact us as soon as possible and tell us about the treatment.',
      'Download and complete the right claim form from our claims page.',
      'Attach your receipts, invoices and any medical reports.',
      'Send your claim to us and we’ll guide you through the rest.']

    }]

  },
  apply: {
    title: 'Get cover that works for you',
    products: [
    {
      title: medicalPlans.family.name,
      body: 'Medical cover for you and your family, so you can get the care you need without worrying about the bill.',
      image: images.family,
      more: { label: 'Tell me more', to: '/products' },
      quote: { label: 'Get a quote', to: '/contact-us' }
    },
    {
      title: medicalPlans.seniors.name,
      body: medicalPlans.seniors.body,
      image: images.seniors,
      more: { label: 'Tell me more', to: '/products' },
      quote: { label: 'Get a quote', to: '/contact-us' }
    }],

    promos: [
    {
      title: 'Medical cover for your team',
      body: 'CIC Medipack gives the people in your small or medium business access to medical cover.',
      bg: 'bg-cic-pink',
      link: { label: 'Business solutions', to: '/business' }
    },
    {
      title: 'Welcome to CIC Pharmacy',
      body: 'Caring beyond prescription. Order on WhatsApp, collect at the drive-through or get it delivered.',
      bg: 'bg-[#1d1d1d]',
      image: images.friends,
      imageClass: 'absolute inset-0 h-full w-full object-cover opacity-60',
      link: { label: 'Visit the pharmacy', to: '/pharmacy' }
    }],

    banner: {
      title: 'Health cover for cooperatives',
      body: 'CoopCare and Afya Bora are built for SACCO and cooperative members and their families.',
      image: images.team,
      link: { label: 'Cooperative solutions', to: '/cooperatives' }
    }
  },
  explore: {
    title: 'Explore your options',
    feature: {
      title: 'Cover for your employees',
      body: 'CIC Medisure Corporate gives larger employers tailored group medical schemes.',
      image: images.team,
      imageAlt: 'A group of friends travelling together',
      link: { label: 'Corporate solutions', to: '/corporates' }
    },
    options: [
    { title: 'Find a provider', body: 'Download our provider panels', link: { label: 'Provider panels', to: '/claims#provider-panels' } },
    { title: 'Make a claim', body: 'Forms and step-by-step help', link: { label: 'Claims', to: '/claims' } }],

    wide: { title: 'Not sure which plan?', body: 'Talk to one of our financial advisors.', image: images.adviser, link: { label: 'Contact us', to: '/contact-us' } }
  },
  articles: {
    title: 'Looking after your health',
    articles: [
    { title: 'Choosing a medical plan', body: 'What to look for in a cover.', image: images.family },
    { title: 'Cover as you get older', body: 'Planning for your health later in life.', image: images.seniors },
    { title: 'Your provider panel', body: 'Getting treatment the easy way.', image: images.friends, link: { label: 'Provider panels', to: '/claims#provider-panels' } },
    { title: 'Medicine, delivered', body: 'How CIC Pharmacy works.', image: images.hero, link: { label: 'CIC Pharmacy', to: '/pharmacy' } }]

  }
};

