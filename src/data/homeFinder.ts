import type { ProductCategory } from './products';

/** Home "I'm looking for insurance on" tabs: which catalogue products each tab features. */
export type FinderTab = {
  id: string;
  label: string;
  /** Catalogue categories counted for "View all". */
  categories: ProductCategory[];
  /** Catalogue ids shown as cards, in order (up to 4). */
  featured: string[];
};

export const finderTabs: FinderTab[] = [
{ id: 'motor', label: 'Motor', categories: ['Motor', 'Personal accident'], featured: ['easy-bima', 'motor-private', 'motor-commercial', 'personal-accident'] },
{ id: 'medical', label: 'Medical', categories: ['Medical'], featured: ['afya-bora', 'seniors-mediplan', 'sme-medipack', 'coopcare'] },
{ id: 'life', label: 'Life & savings', categories: ['Life & savings'], featured: ['academia', 'smart-saver', 'haba-haba', 'employee-group-life'] },
{ id: 'investments', label: 'Investments', categories: ['Investments', 'Life & savings'], featured: ['money-market-fund', 'smart-saver', 'haba-haba', 'academia'] },
{ id: 'retirement', label: 'Retirement', categories: ['Pensions'], featured: ['jipange-plus', 'umbrella-scheme', 'income-draw-down'] },
{ id: 'home', label: 'Home & property', categories: ['Property & business'], featured: ['home-insurance', 'fire-insurance', 'property-insurance', 'mjengo-plus'] }];


/** Hero "Trending" chips → product detail pages. */
export const trendingProducts: {label: string;id: string;}[] = [
{ label: 'Easy Bima', id: 'easy-bima' },
{ label: 'Medical cover', id: 'afya-bora' },
{ label: 'Education plan', id: 'academia' },
{ label: 'Money Market Fund', id: 'money-market-fund' },
{ label: 'Retirement', id: 'jipange-plus' },
{ label: 'Home insurance', id: 'home-insurance' }];
