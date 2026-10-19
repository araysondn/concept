import type { ProductPageData } from './productPage';

const images = {
  hero: '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg',
  family: '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg',
  thinking: '/5edc0fda-3296-43a7-9b4b-1fb06fa2c3e0.jpg',
  adviser: '/d694dffc-d1e8-4a02-b91b-a3916205270c.jpg',
  friends: '/19f98733-386d-4c89-bb7e-c68bd62f3cc7.jpg'
};

export const homePage: ProductPageData = {
  hero: {
    image: images.hero,
    title: 'Your home, your way, covered',
    intro: 'Protect the place you live and the things you love, from fire and burglary to everyday accidents.',
    cta: { label: 'Insure my home', to: '/contact-us' },
    disclaimer: 'Estimates use assumed rates for illustration only. Your actual premium depends on your property, location and underwriting.'
  },
  breadcrumb: [
  { label: 'Individual', to: '/' },
  { label: 'Insurance', to: '/products' },
  { label: 'Home and property insurance' }],

  help: {
    title: 'How can we help?',
    items: [
    { label: 'Get a home insurance quote', icon: 'shield', to: '/contact-us' },
    { label: 'Insure my building project', icon: 'file', to: '/products' },
    { label: 'Cover my valuables', icon: 'trophy', to: '/home-insurance#get-started' },
    { label: 'Make a fire or theft claim', icon: 'claim', to: '/claims' },
    { label: 'Download a claim form', icon: 'guide', to: '/claims#claim-forms' },
    { label: 'Talk to us', icon: 'talk', to: '/contact-us' }]

  },
  know: {
    title: 'What you need to know about home insurance',
    tabs: [
    {
      label: 'Why choose us?',
      body: 'For more than five decades CIC has protected Kenyan families with flexible insurance designed around their needs. Our home and property covers protect your house, its contents and the people who work in it, so you can rebuild and replace when the unexpected happens. We keep our word.'
    },
    {
      label: "What's covered?",
      body: 'Depending on the cover you choose, home insurance can protect:',
      points: [
      'Your building, against fire and allied perils',
      'Your contents, against fire, burglary and theft',
      'Valuable items at home or on the move, with All Risks cover',
      'Liability options for domestic staff']

    },
    {
      label: "What's not covered?",
      body: 'Like every insurance policy, home cover has exclusions. Your policy document lists them in full. Typical examples include:',
      points: [
      'Wear and tear, and gradual deterioration',
      'Loss or damage you cause on purpose',
      'Property left unattended or unsecured, unless your policy says otherwise']

    },
    {
      label: 'Making a claim',
      body: 'Had a fire or a break-in? Here is what to do:',
      points: [
      'Report theft or burglary to the police and get a police abstract.',
      'Tell CIC as soon as possible on 0703 099 120 or 020 282 3000.',
      'Complete the fire or burglary claim form from our claims page.',
      'Attach receipts, photos and any other proof of loss, then send it to us.']

    }]

  },
  apply: {
    title: 'Get cover that works for you',
    products: [
    {
      title: 'Domestic Package',
      body: 'Cover for your home and its contents in one policy, against fire, burglary and other damage.',
      image: images.hero,
      more: { label: 'Tell me more', to: '/products' },
      quote: { label: 'Get a quote', to: '/contact-us' }
    },
    {
      title: 'All Risks',
      body: 'Wider cover for valuable items such as phones, laptops, cameras and jewellery, at home or on the move.',
      more: { label: 'Tell me more', to: '/products' },
      quote: { label: 'Get a quote', to: '/contact-us' }
    }],

    promos: [
    {
      title: 'Mjengo Plus Contractor All Risks',
      body: 'Building your dream home? Protect the works, materials on site and third party liability while the project is under way.',
      bg: 'bg-cic-pink',
      link: { label: 'Tell me more', to: '/products' }
    },
    {
      title: 'Own property you let out?',
      body: 'CIC Property Owners Insurance covers landlords and property owners.',
      bg: 'bg-[#1d1d1d]',
      image: images.friends,
      imageClass: 'absolute inset-0 h-full w-full object-cover opacity-60',
      link: { label: 'Tell me more', to: '/general-insurance' }
    }],

    banner: {
      title: 'Business property and fire cover',
      body: 'Fire, burglary and property cover for your premises, stock and equipment.',
      image: images.family,
      link: { label: 'Business solutions', to: '/business' }
    }
  },
  explore: {
    title: 'Explore your options',
    feature: {
      title: 'Insure your business premises',
      body: 'Fire, burglary and property cover built for businesses.',
      image: images.family,
      imageAlt: 'Friends sharing a phone on a matatu',
      link: { label: 'Business solutions', to: '/business' }
    },
    options: [
    { title: 'Make a claim', body: 'Fire, theft and burglary claims', link: { label: 'Claims', to: '/claims' } },
    { title: 'Claim forms', body: 'Download the form you need', link: { label: 'Forms', to: '/claims#claim-forms' } }],

    wide: { title: 'Not sure which cover?', body: 'Talk to one of our financial advisors.', image: images.adviser, link: { label: 'Contact us', to: '/contact-us' } }
  },
  articles: {
    title: 'Making your home safer',
    articles: [
    { title: 'Building or contents?', body: 'Know what each cover protects.', image: images.thinking },
    { title: 'Keeping burglars out', body: 'Simple steps to secure your home.', image: images.hero },
    { title: 'Valuing your property', body: 'Why the sum insured matters.', image: images.friends },
    { title: 'Had a fire or break-in?', body: 'What to do next.', image: images.family, link: { label: 'Claims', to: '/claims' } }]

  }
};
