import { createElement } from 'react';
import { PillIcon, ShoppingBagIcon, SparklesIcon, TruckIcon } from 'lucide-react';
import type { ProductPageData } from './productPage';

// Contact details and hours follow CIC Kenya's Pharmacy page. Service copy is written for this design concept.
export const pharmacyServices = [
{ title: 'Prescription services', body: 'Expert dispensing and personal advice on how to take your medicine.' },
{ title: 'Over-the-counter medicines', body: 'Everyday essentials such as cold remedies and pain relief.' },
{ title: 'Health and wellness products', body: 'Vitamins, supplements, skincare and beauty products.' },
{ title: 'Home delivery and drive-through', body: 'Get your medication without leaving your home or your car.' }];


export const pharmacyOrderSteps = [
{ title: 'Send us your order', body: 'WhatsApp your prescription or the products you need to 0115 222 777.' },
{ title: 'Choose how to get it', body: 'Home delivery or drive-through. Whatever is easier for you.' },
{ title: 'Get well soon', body: 'Need advice on your medicine? Our pharmacy team is here to help.' }];


export const pharmacyContact = {
  location: ['Mara Road, opposite KMA', 'Nairobi'],
  hours: ['Monday to Sunday: 7:00am – 7:00pm', 'Public holidays: 7:00am – 7:00pm'],
  phones: ['0728 227 070', '0115 222 777 (call or WhatsApp)'],
  email: 'cicpharmacy@cic.co.ke',
  whatsappOrder: 'https://wa.me/254115222777?text=Place%20an%20Order%20or%20Learn%20More%20about%20the%20CIC%20Pharmacy'
};

const images = {
  hero: '/19f98733-386d-4c89-bb7e-c68bd62f3cc7.jpg',
  phone: '/c5b67aca-d746-4e14-961c-9a80fac072bb.jpg',
  seniors: '/5edc0fda-3296-43a7-9b4b-1fb06fa2c3e0.jpg',
  home: '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg',
  advice: '/d694dffc-d1e8-4a02-b91b-a3916205270c.jpg',
  smile: '/953d4772-30ed-48cf-9516-b192cb47b7e0.jpg'
};

const serviceIcons = [PillIcon, ShoppingBagIcon, SparklesIcon, TruckIcon];

const order = { label: 'Order on WhatsApp', href: pharmacyContact.whatsappOrder };

const visitUs = createElement(
  'div',
  { className: 'grid gap-4 sm:grid-cols-2' },
  [
  ['Where to find us', pharmacyContact.location],
  ['Opening hours', pharmacyContact.hours],
  ['Call us', pharmacyContact.phones],
  ['Email us', [pharmacyContact.email]]].
  map(([title, lines]) =>
  createElement(
    'div',
    { key: title as string },
    createElement('p', { className: 'font-semibold' }, title as string),
    ...(lines as string[]).map((l) => createElement('p', { key: l }, l))
  )
  )
);

export const pharmacyPage: ProductPageData = {
  hero: {
    image: images.hero,
    imagePosition: 'center 30%',
    title: 'Caring beyond prescription',
    intro: 'Your neighbourhood pharmacy, from CIC. Order on WhatsApp and get your medicine delivered, or collect it at our drive-through.',
    cta: order,
    disclaimer: 'Orders are placed and confirmed on WhatsApp. Prescription medicines are dispensed only against a valid prescription.'
  },
  breadcrumb: [
  { label: 'Individual', to: '/' },
  { label: 'Pharmacy' }],

  help: {
    title: 'How can we help?',
    items: [
    { label: 'Order medicine', icon: 'phone', to: '/pharmacy#get-started' },
    { label: 'Refill a prescription', icon: 'file', to: '/pharmacy#get-started' },
    { label: 'Home delivery', icon: 'car', to: '/pharmacy#need-to-know-delivery-drive-through' },
    { label: 'Drive-through', icon: 'garage', to: '/pharmacy#need-to-know-delivery-drive-through' },
    { label: 'Talk to a pharmacist', icon: 'talk', to: '/contact-us' },
    { label: 'Opening hours', icon: 'calendar', to: '/pharmacy#need-to-know-visit-us' }]

  },
  know: {
    title: 'What you need to know about CIC Pharmacy',
    tabs: [
    {
      label: 'Our services',
      body: 'Everything you need to look after your health, in one place:',
      points: pharmacyServices.map((s) => `${s.title}: ${s.body}`)
    },
    {
      label: 'How ordering works',
      body: "It takes three simple steps:",
      points: pharmacyOrderSteps.map((s) => `${s.title}: ${s.body}`)
    },
    {
      label: 'Delivery & drive-through',
      body: "Get your medication without leaving your home or your car. Choose home delivery when you order on WhatsApp, or drive up to our pharmacy on Mara Road and we'll bring your order to you."
    },
    {
      label: 'Paying',
      body: 'Cash, mobile money and insurance cover where accepted — confirm with the pharmacy when you place your order.'
    },
    {
      label: 'Visit us',
      body: visitUs
    }]

  },
  apply: {
    title: 'Here for your health, every day',
    intro: 'From your prescription to everyday essentials, our pharmacy team is ready to help.',
    products: pharmacyServices.slice(0, 2).map((s, i) => ({
      title: s.title,
      body: s.body,
      icon: serviceIcons[i],
      more: { label: 'Talk to a pharmacist', to: '/contact-us' },
      quote: order
    })),
    promos: [
    {
      title: 'Medical insurance',
      body: 'Health cover that has your back. Find the right plan for you and your family.',
      bg: 'bg-cic-pink',
      link: { label: 'Explore medical cover', to: '/medical-insurance' }
    },
    {
      title: 'Seniors Mediplan',
      body: 'Medical cover for older adults who want continued access to quality care.',
      bg: 'bg-[#1d1d1d]',
      image: images.seniors,
      imageClass: 'absolute inset-0 h-full w-full object-cover opacity-50',
      link: { label: 'Tell me more', to: '/medical-insurance' }
    }],

    banner: {
      title: 'Home delivery and drive-through',
      body: 'Health and wellness products, vitamins and everyday essentials, brought to your door.',
      image: images.home,
      link: order
    }
  },
  explore: {
    title: 'Explore your options',
    feature: {
      title: 'Order on WhatsApp',
      body: 'Send your prescription or the products you need to 0115 222 777.',
      image: images.phone,
      imageAlt: 'Friends looking at a phone',
      link: order
    },
    options: [
    { title: 'Call us', body: pharmacyContact.phones.join(' · '), link: { label: 'Contact us', to: '/contact-us' } },
    { title: 'Email us', body: pharmacyContact.email, link: { label: 'Send an email', href: `mailto:${pharmacyContact.email}` } }],

    wide: {
      title: 'Covered by CIC medical insurance?',
      body: 'Find out how your plan works and where you can use it.',
      image: images.advice,
      link: { label: 'Medical insurance', to: '/medical-insurance' }
    }
  },
  articles: {
    title: 'Looking after your health',
    articles: [
    { title: 'Storing your medicines safely', body: 'Keep them cool, dry and out of reach of children.', image: images.home },
    { title: 'Getting the most from your pharmacist', body: 'Questions worth asking at the counter.', image: images.smile },
    { title: 'Managing repeat prescriptions', body: 'Never run out of the medicine you rely on.', image: images.seniors },
    { title: 'Generic vs branded medicines', body: 'What the difference means for you.', image: images.advice }]

  }
};
