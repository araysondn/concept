// Source: cicinsurancegroup.com/about/ (copy verbatim).
import type { Stat } from '../components/patterns';

export const aboutHeroImage = '/7e45657b-c6f1-479d-bba6-c3b011592377.jpg';

export const aboutIntro: string[] = [
'CIC Group has for more than five decades shouldered the risks of clients by providing flexible insurance and financial services built around their needs. With time, we have innovatively created customized products that have positioned us as a trusted insurance and financial services provider. Our positioning is simplified and captured in our tagline “We Keep Our Word” reinforcing our commitment to the market.',
'Started as a department of Kenya National Federation of Cooperatives (KNFC) in 1968, the company has since become a leading cooperative enterprise and micro-insurer in Africa, with three subsidiaries in Kenya, namely CIC General Insurance Ltd, CIC Life Assurance Ltd, and CIC Asset Management Ltd. The group has a regional footprint with a presence in South Sudan, Uganda, and Malawi.',
'As the only cooperative insurance entity listed at the Nairobi Securities Exchange (NSE), we provide cutting-edge financial services to over 1 million customers through a robust system of 25 local branches, over 1000 financial advisors, and multiple online platforms.',
'Our expertise has been recognized over the years, winning awards as the AKI Group Life Company of the Year since 2015, the Best Motor Insurer at the Cheki Awards 2020, and the Decade of Excellence Insurance Kenya 2021 Award. With decades of excellence and a strong corporate brand, CIC Group serves a wide range of customers from Cooperatives to Corporates, SMEs, NGOs, Government entities, and individuals.'];


export const vision = 'To be a World class provider of insurance and other financial services';
export const mission = 'To help people achieve financial freedom';

export const coreValues: {label: string;body: string;}[] = [
{ label: 'Integrity', body: 'Be fair and transparent' },
{ label: 'Dynamism', body: 'Be passionate and innovative' },
{ label: 'Performance', body: 'Be efficient and results driven' },
{ label: 'Cooperation', body: 'Live the cooperative spirit' }];


/** Quick facts exactly as the site shows them (no currency is given for the "B" figures). */
export const quickFacts: Stat[] = [
{ label: 'Happy Clients', value: '1M+' },
{ label: 'Gross Written Premium', value: '23.7B' },
{ label: 'Asset Management Unit trust Market Share', value: '38.5%' },
{ label: 'Employees & Agents', value: '1.4K' },
{ label: 'Assets', value: '46.7B' },
{ label: 'Life Assurance Market Share', value: '9%' },
{ label: 'General Business Market Share', value: '7.6%' }];


export const subsidiaries: {country: string;href: string;}[] = [
{ country: 'Kenya', href: 'https://ke.cicinsurancegroup.com/' },
{ country: 'Uganda', href: 'https://ug.cicinsurancegroup.com/' },
{ country: 'Malawi', href: 'https://mw.cicinsurancegroup.com/' },
{ country: 'South Sudan', href: 'https://ss.cicinsurancegroup.com/' }];
