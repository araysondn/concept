// Source: cicinsurancegroup.com/sustainability/ (copy verbatim).
import type { DocumentItem } from '../components/patterns';

export const latestReport: DocumentItem = {
  title: 'CIC Group Sustainability Report 2025',
  category: 'Sustainability Report',
  date: '2025',
  href: 'https://www.cicinsurancegroup.com/wp-content/uploads/2026/08/2025-Sustainability-Report-CIC-Insurance-Group-Plc_compressed.pdf'
};

export const sustainabilityDocuments: DocumentItem[] = [
latestReport,
{
  title: 'CIC Group Sustainability Report 2024',
  category: 'Sustainability Report',
  date: '2024',
  href: 'https://www.cicinsurancegroup.com/wp-content/uploads/2025/07/CIC-Insurance-Group-Plc-2024-Sustainability-Report-2024_compressed.pdf'
},
{
  title: 'CIC Group Sustainability Report 2023',
  category: 'Sustainability Report',
  date: '2023',
  href: 'https://www.cicinsurancegroup.com/wp-content/uploads/2025/08/CIC-Insurance-Group-PLC-The-Sustainability-Report-2023-min.pdf'
},
{
  title: 'Sustainability Policy',
  category: 'Policy',
  href: 'https://www.cicinsurancegroup.com/wp-content/uploads/2024/11/Sustainability-Policy-1.pdf'
}];


export const policyStatement: string[] = [
'CIC commits to be an impact and growth catalyst for sustainable insurance and investment in Africa by integrating sustainability into business operations to drive decisions. We aim for continuous improvement in economic, environmental, and social sustainability performance. We acknowledge our responsibility to ensure that insurance and financial services are accessible to all, and to protect the economy, environment and society.',
'In alignment with our sustainability commitment, we pledge to encourage community development through CIC Foundation, support local entrepreneurship, foster sustainable practices, promote diversity, equality and inclusion, improve the employee engagement index and improve the customer satisfaction index.'];


export const pillars: {title: string;body: string;}[] = [
{
  title: 'Environmental Stewardship',
  body: 'We are committed to reducing our environmental footprint and actively engaging with our stakeholders to promote environmental conservation and responsible resource management.'
},
{
  title: 'Social Responsibility',
  body: 'We are committed to supporting the well-being and prosperity of the communities in which we operate by promoting diversity, equity, and inclusion within our workforce, ensuring equal opportunities for all employees.'
},
{
  title: 'Economic Resilience',
  body: 'We are committed to integrating sustainability considerations into our risk assessment, underwriting and investment processes, incentivizing and rewarding sustainable practices among our clients.'
},
{
  title: 'Responsible Governance',
  body: 'We are committed to ethical leadership, transparency, and stakeholder engagement.'
}];


export const guidingPrinciples: {title: string;sdgs: string;points: string[];}[] = [
{
  title: 'Economic',
  sdgs: 'SDG 8',
  points: ['Encourage community development through the CIC Foundation', 'Support local entrepreneurship']
},
{ title: 'Environmental', sdgs: 'SDGs 9, 12, 13', points: ['Foster sustainable practices'] },
{
  title: 'Social',
  sdgs: 'SDGs 1, 3',
  points: ['Promote diversity, equality and inclusion', 'Improve employee engagement Index', 'Enhance customer engagement']
}];


export const sdgs: string[] = [
'SDG 1: No Poverty',
'SDG 3: Good Health and Well-Being',
'SDG 8: Decent work and economic growth',
'SDG 9: Industry, Innovation and Infrastructure',
'SDG 12: Responsible Consumption and Production',
'SDG 13: Climate Action'];


export const globalCompact: {area: string;principles: string[];}[] = [
{
  area: 'Human Rights',
  principles: [
  'Principle 1: Businesses should support and respect the protection of internationally proclaimed human rights; and',
  'Principle 2: make sure that they are not complicit in human rights abuses']

},
{
  area: 'Labour',
  principles: [
  'Principle 3: Businesses should uphold the freedom of association and the effective recognition of the right to collective bargaining;',
  'Principle 4: the elimination of all forms of forced and compulsory labour;',
  'Principle 5 : the effective abolition of child labour; and',
  'Principle 6: the elimination of discrimination in respect of employment and occupation']

},
{
  area: 'Environment',
  principles: [
  'Principle 7: Businesses should support a precautionary approach to environmental challenges;',
  'Principle 8: undertake initiatives to promote greater environmental responsibility; and',
  'Principle 9: encourage the development and diffusion of environmentally friendly technologies.']

},
{
  area: 'Anti-corruption',
  principles: ['Principle 10: Businesses should work against corruption in all its forms, including extortion and bribery']
}];


export const womensEmpowerment: string[] = [
'Establish high-level corporate leadership for gender equality.',
'Treat all women and men fairly at work – respect and support human rights and nondiscrimination.',
'Ensure the health, safety and well- being of all women and men workers.',
'Promote education, training and professional development for women.',
'Implement enterprise development, supply chain and marketing practices that empower women.',
'Promote equality through community initiatives and advocacy.',
'Measure and report on progress to achieve gender equality.'];


export const nairobiDeclaration: {title: string;body: string;}[] = [
{
  title: 'Risk Management',
  body: 'Advance the assessment, management and disclosure of climate change-related risks and opportunities.'
},
{
  title: 'Insurance',
  body: 'Support the Insurance Sustainable Development Goals (Insurance SDGs) being developed by the PSI to harness insurance products and solutions to help achieve the SDG.'
},
{
  title: 'Investment',
  body: 'Support the transition to a resilient, net-zero emissions economy, building on the work of the UN-convened Net-Zero Asset Owner Alliance'
},
{
  title: 'Policy, regulatory and industry engagement',
  body: 'Engage with policymakers, regulators and industry associations on key sustainability issues for the African insurance industry'
},
{
  title: 'Sustainable insurance thinking practices',
  body: 'Promote the adoption and implementation of the four Principles for Sustainable Insurance across African insurance markets'
}];
