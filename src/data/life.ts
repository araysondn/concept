import { HeartHandshakeIcon, PiggyBankIcon, UsersIcon } from 'lucide-react';
import type { ProductPageData } from './productPage';
import { lifeAssurance } from './companies';

const images = {
  hero: '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg',
  students: '/19f98733-386d-4c89-bb7e-c68bd62f3cc7.jpg',
  people: '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg',
  adviser: '/d694dffc-d1e8-4a02-b91b-a3916205270c.jpg',
  smile: '/953d4772-30ed-48cf-9516-b192cb47b7e0.jpg',
  thinking: '/5edc0fda-3296-43a7-9b4b-1fb06fa2c3e0.jpg',
  sky: '/a84679f1-42c0-4e9b-ab49-645ec6530114.jpg'
};

const facts = (lifeAssurance.facts ?? []).map((f) => `${f.label}: ${f.value}`);
const groupLife = lifeAssurance.groups.find((g) => g.title === 'Group life')?.products.map((p) => p.title) ?? [];

/** Customer-facing Life & savings product page, benchmarked on the motor insurance page. */
export const lifePage: ProductPageData = {
  hero: {
    image: images.hero,
    imagePosition: 'center 18%',
    title: 'Protect what matters most',
    intro: 'Life cover and savings plans that look after the people you love, today and tomorrow.',
    cta: { label: 'Talk to an advisor', to: '/contact-us' },
    disclaimer: 'The calculator gives a guide only, based on the figures you enter. It is not a quote or financial advice.'
  },
  breadcrumb: [
  { label: 'Individual', to: '/' },
  { label: 'Insurance', to: '/products' },
  { label: 'Life & savings' }],

  help: {
    title: 'How can we help?',
    items: [
    { label: 'Get life cover', icon: 'shield', to: '/life-insurance#get-started' },
    { label: "Save for my child's education", icon: 'education' },
    { label: 'Save regularly', icon: 'growth', to: '/investments' },
    { label: 'Plan for retirement', icon: 'retire', to: '/retirement' },
    { label: 'Make a life claim', icon: 'claim', to: '/claims' },
    { label: 'Talk to us', icon: 'talk', to: '/contact-us' }]

  },
  know: {
    title: 'What you need to know about life cover',
    tabs: [
    {
      label: 'Why CIC Life?',
      body: 'CIC Life Assurance offers a wide range of life assurance products for individuals, families, groups and cooperatives, backed by more than five decades of CIC Group experience. We keep our word.',
      points: facts
    },
    {
      label: 'How life cover works',
      body: 'You pay a regular premium, and if you pass away during the term, CIC pays a lump sum to the people you choose. That money can replace your income, clear debts and keep your children in school.',
      points: [
      'Choose how much cover you need, and for how long',
      'Name your beneficiaries',
      'Some plans combine cover with savings you can use along the way']

    },
    {
      label: 'Savings plans',
      body: 'Grow your money for life’s big goals, with cover built in on selected plans:',
      points: [
      "CIC Academia – save towards your child's education",
      'Smart Saver – a disciplined way to save regularly',
      'CIC Invest Plan – a savings and investment plan for your goals',
      'Jipange Plus – a personal pension plan for your retirement']

    },
    {
      label: 'Group life for employers',
      body: 'Look after your team and your members with group cover under a single policy:',
      points: groupLife
    },
    {
      label: 'Making a life claim',
      body: "We're here when you need us most. Report the claim to CIC, share the documents listed on our claims page, and we'll guide your family through every step.",
      points: ['Call 0703 099 120 or 020 282 3000', 'Email lifecare@cic.co.ke', 'See the full list of documents on the claims page']
    }]

  },
  apply: {
    title: 'Get cover that works for you',
    products: [
    {
      title: 'Family Life Plan',
      body: 'Life cover that looks after your family if the unexpected happens, so they can keep living the life you planned together.',
      icon: HeartHandshakeIcon,
      quote: { label: 'Get a quote', to: '/contact-us' }
    },
    {
      title: 'CIC Academia',
      body: "Save towards your child's school and university fees, one step at a time, with a plan built around their education.",
      image: images.students,
      quote: { label: 'Get a quote', to: '/contact-us' }
    },
    {
      title: 'Smart Saver',
      body: 'Build the habit of saving with regular contributions towards the goals that matter to you.',
      icon: PiggyBankIcon,
      quote: { label: 'Get a quote', to: '/contact-us' }
    },
    {
      title: 'Group Life Assurance',
      body: 'Life cover for employees or members under one policy, so everyone in your organisation is looked after.',
      icon: UsersIcon,
      more: { label: 'Tell me more', to: '/corporates' },
      quote: { label: 'Get a quote', to: '/contact-us' }
    }],

    promos: [
    {
      title: 'Plan for your sunset years',
      body: 'Jipange Plus helps you build a pension pot. Try our pension calculator.',
      bg: 'bg-cic-pink',
      link: { label: 'Retirement', to: '/retirement' }
    },
    {
      title: 'Living abroad?',
      body: 'CIC Diaspora offers life and savings solutions for Kenyans living outside Kenya.',
      bg: 'bg-[#1d1d1d]',
      image: images.sky,
      imageClass: 'absolute inset-0 h-full w-full object-cover opacity-60'
    }],

    banner: {
      title: 'Save and stay covered from your phone',
      body: 'CIC M-Bima lets you save and stay covered with your mobile phone, wherever you are.',
      image: images.people
    }
  },
  explore: {
    title: 'Explore your options',
    feature: { title: "Your child's education", body: 'Start saving for school fees with CIC Academia.', image: images.students, imageAlt: 'Two students laughing' },
    options: [
    { title: 'Make a life claim', body: 'Steps and documents you need', link: { label: 'Claims', to: '/claims' } },
    { title: 'Grow your money', body: 'Unit trusts and the Money Market Fund', link: { label: 'Investments', to: '/investments' } }],

    wide: { title: 'Not sure how much cover you need?', body: 'Talk to one of our financial advisors.', image: images.adviser, link: { label: 'Talk to us', to: '/contact-us' } }
  },
  articles: {
    title: 'Life cover, made simple',
    articles: [
    { title: 'How much cover do I need?', body: 'A simple rule of thumb to start with.', image: images.thinking },
    { title: 'Life cover or savings?', body: 'Why many families need both.', image: images.smile },
    { title: 'Choosing beneficiaries', body: 'Keep your nominations up to date.', image: images.hero },
    { title: 'Saving for school fees', body: 'Start early, save steadily.', image: images.students }]

  }
};

