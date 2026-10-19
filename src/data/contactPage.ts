// Content from cicinsurancegroup.com/contact-us/ (October 2026).

export const contactIntro =
"Communication is the foundation of any relationship. As an award-winning insurance group, we pride ourselves in our clarity and availability to further assist. Feel free to reach out to us with any questions you might have. We're available on the social channels listed below, as well as through our email and phone number. While you're here, why not talk to us through the form below?";

export const hqChannels = {
  phone: '0703 099 120',
  phoneIntl: '+254 703 099 120',
  landline: '(020) 282 3000',
  sms: '22471',
  email: 'callc@cic.co.ke',
  whatsapp: '+254 703 099 000',
  postal: 'P.O. Box 59485-00200, Nairobi'
};

export const socials = [
{ label: 'X', href: 'https://twitter.com/cicgroupplc' },
{ label: 'Facebook', href: 'https://web.facebook.com/CICGroupPLC' },
{ label: 'LinkedIn', href: 'https://www.linkedin.com/company/cic-insurance-company/' },
{ label: 'Instagram', href: 'https://www.instagram.com/cicgroupplc/' },
{ label: 'YouTube', href: 'https://www.youtube.com/c/CICInsuranceGroupKe' }];


export type Office = {country: string;title: string;lines: string[];href: string;};

export const offices: Office[] = [
{
  country: 'Kenya',
  title: 'CIC Kenya Head Office',
  lines: ['CIC Plaza, Mara Road, Upperhill, Nairobi', 'Tel: (+254) 703 099 120 / (020) 282 3000'],
  href: 'https://ke.cicinsurancegroup.com/'
},
{
  country: 'Uganda',
  title: 'CIC Uganda',
  lines: [
  'Block A, Plot 7-11, Buganda Road, next to Buganda Rd Magistrates Court',
  'P.O. Box 34975, Kampala',
  'Mobile: +256 200 900 100 / +256 312 307 600',
  'Email: cic@ug.cicinsurancegroup.com'],

  href: 'https://ug.cicinsurancegroup.com/'
},
{
  country: 'South Sudan',
  title: 'CIC South Sudan',
  lines: ['CIC Plaza, Plot 714B-3K-South, Kololo', 'Mobile: +211 0954 280 280', 'Email: info@ss.cicinsurancegroup.com'],
  href: 'https://ss.cicinsurancegroup.com/'
},
{
  country: 'Malawi',
  title: 'CIC Malawi',
  lines: ['Musco House, Area 3, Lilongwe', 'Mobile: +265 (1) 751 026', 'Email: malawi@mw.cicinsurancegroup.com'],
  href: 'https://mw.cicinsurancegroup.com/'
}];
