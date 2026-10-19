import type { ProductPageData } from './productPage';

const images = {
  hero: '/7f50d32d-99b7-46c8-b6cd-8e6f6eb8c57b.jpg',
  easyBima: '/61b1c60f-1640-4392-a6e3-cdb773233a6e.jpg',
  extras: '/a54231cd-cca7-428f-b23b-e72920a338e8.jpg',
  commercial: '/7de16e01-1d17-4357-90ce-738935a39459.jpg',
  fleet: '/0bcd69ea-59f9-4a30-92ae-6a8ff9493590.jpg',
  adviser: '/d694dffc-d1e8-4a02-b91b-a3916205270c.jpg'
};

export const motorPage: ProductPageData = {
  hero: {
    image: images.hero,
    title: 'Insure, protect, drive!',
    intro: 'Our cover is roadworthy. Take it for a spin, and pay monthly with Easy Bima.',
    cta: { label: 'Insure my car' },
    disclaimer: 'Estimates use assumed figures for illustration only. Your actual premium depends on your vehicle, usage and underwriting.'
  },
  breadcrumb: [
  { label: 'Individual', to: '/' },
  { label: 'Insurance', to: '/products' },
  { label: 'Motor insurance' }],

  help: {
    title: 'How can we help?',
    items: [
    { label: 'Get a motor quote', icon: 'car', to: '/motor-insurance#get-started' },
    { label: 'Pay monthly with Easy Bima', icon: 'calendar', to: '/motor-insurance#get-started' },
    { label: 'Make a claim', icon: 'claim', to: '/claims#claim-online' },
    { label: 'Find a CIC approved garage', icon: 'garage', to: '/claims#claim-forms' },
    { label: 'Renew my cover', icon: 'shield', to: '/login' },
    { label: 'Talk to us', icon: 'talk', to: '/contact-us' }]

  },
  know: {
    title: 'What you need to know about our motor insurance',
    tabs: [
    {
      label: 'Why choose us?',
      body: 'For more than five decades CIC has protected Kenyans with flexible insurance designed around their needs. Our comprehensive motor cover protects your vehicle, your passengers and other road users, and comes with towing, motoring assist and a network of CIC approved garages to get you back on the road. We keep our word.'
    },
    {
      label: "What's covered?",
      body: 'Comprehensive motor insurance covers you against:',
      points: [
      'Accidental and malicious damage',
      'Theft and fire',
      'Riot, strike and civil commotion',
      'Floods',
      'Legal liability to third parties for property damage, injury or death']

    },
    {
      label: 'Benefits included',
      body: 'Comprehensive cover comes with benefits that keep you moving when something goes wrong:',
      points: [
      'Towing after an accident or breakdown',
      'Motoring assist',
      'Emergency medical expenses',
      'Windscreen cover',
      'Stereo and entertainment unit cover',
      'Optional: political violence and terrorism, excess waiver and a courtesy car']

    },
    {
      label: 'Excess',
      body: 'The excess is the part of a claim you pay yourself. Example terms from the CIC Easy Bima brochure (motor private). Confirm the current terms on your policy schedule:',
      points: [
      'Third party property damage: KES 7,500',
      'Own damage and partial theft: 2.5% of the sum insured',
      'Minimum KES 20,000 and maximum KES 100,000 per claim']

    },
    {
      label: 'How to claim',
      body: 'Had an accident? Here is what happens next:',
      points: [
      'Report the incident to CIC as soon as possible through the claims portal, WhatsApp or by calling us.',
      'Share your documents: a completed claim form, driving licence, logbook and a police abstract where required.',
      'An assessor inspects the damage and your vehicle is booked into a CIC approved garage.',
      'Your car is repaired or your claim settled, less any applicable excess.']

    }]

  },
  apply: {
    title: 'Get cover that works for you',
    products: [
    {
      title: 'Motor Private – Comprehensive',
      body: 'Protection for your own car plus your liability to others, from accidental damage to theft and fire, with towing and motoring assist included.'
    },
    {
      title: 'CIC Easy Bima',
      body: 'We do motor insurance differently. Spread your premium over up to 12 monthly instalments instead of paying it all up front.',
      image: images.easyBima
    }],

    promos: [
    {
      title: 'Third Party Only cover',
      body: "The basic cover required by law under Chapter 405 of the Traffic Act. It pays for damage to other people's property and injury to third parties.",
      bg: 'bg-cic-pink'
    },
    {
      title: 'Add optional extras',
      body: 'Excess waiver, a courtesy car and political violence and terrorism cover. Get extra peace of mind.',
      bg: 'bg-[#1d1d1d]',
      image: images.extras,
      imageClass: 'absolute inset-0 h-full w-full object-cover opacity-70'
    }],

    banner: {
      title: 'Motor Commercial cover',
      body: 'Keep your business moving, from a single delivery van to a whole fleet.',
      image: images.commercial,
      link: { label: 'Tell me more', to: '/products' }
    }
  },
  explore: {
    title: 'Explore your options',
    feature: { title: 'Insure a fleet', body: 'Cover several vehicles under one policy.', image: images.fleet, imageAlt: 'Rows of parked vehicles' },
    options: [
    { title: 'Make a claim', body: 'Report an incident online or on WhatsApp' },
    { title: 'Find a garage', body: 'Repairs at CIC approved garages' }],

    wide: { title: 'Not sure which cover?', body: 'Talk to one of our financial advisors.', image: images.adviser }
  },
  articles: {
    title: 'The ins and outs of insuring a car',
    articles: [
    { title: 'Types of motor cover', body: 'Comprehensive or third party?', image: '/b94fbfcf-01cb-464f-83ac-76f9511ef27c.jpg' },
    { title: 'Planning a road trip?', body: 'Here is a safety checklist.', image: '/e8293a56-e89d-40b4-81f7-b50c0e44b3ae.jpg' },
    { title: 'Had an accident?', body: 'What to do next.', image: '/cc1fa332-e7e8-46c7-847e-2ead4c6b6142.jpg' },
    { title: 'Valuing your car', body: 'Why the sum insured matters.', image: '/b066b3bc-dbb4-40a4-aafc-1d3a8ad94905.jpg' }]

  }
};
