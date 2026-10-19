import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { HelpItem } from '../components/HelpSection';

/** A link: `to` for routes, `href` for anchors/external; neither renders a placeholder `#`. */
export type PageLink = {label: string;to?: string;href?: string;};

export type ProductHeroData = {
  image: string;
  /** CSS object-position for the hero photo, e.g. 'center 20%' to keep a face in frame. */
  imagePosition?: string;
  title: string;
  intro: string;
  cta?: PageLink;
  /** Shown as the "Disclaimer" tooltip under the floating card. */
  disclaimer?: string;
};

export type KnowTabData = {label: string;body: ReactNode;points?: string[];};

export type ProductCardData = {
  title: string;
  body: string;
  /** Product art; falls back to `icon` (default shield) in the same slot. */
  image?: string;
  icon?: LucideIcon;
  more?: PageLink;
  quote?: PageLink;
};

export type PromoCardData = {
  title: string;
  body: string;
  /** Tailwind background class, e.g. 'bg-cic-pink' or 'bg-[#1d1d1d]'. */
  bg: string;
  image?: string;
  imageClass?: string;
  link?: PageLink;
};

export type BannerData = {title: string;body: string;image?: string;link?: PageLink;bg?: string;};

export type ApplyData = {
  title: string;
  intro?: string;
  products: ProductCardData[];
  promos?: PromoCardData[];
  banner?: BannerData;
};

export type OptionData = {title: string;body: string;link?: PageLink;image?: string;imageAlt?: string;};

export type ExploreData = {
  title: string;
  /** Left column card with an image on top. */
  feature?: OptionData;
  /** Small red-edged cards, two per row. */
  options: OptionData[];
  /** Full-width red-edged card with an optional image on the right. */
  wide?: OptionData;
};

export type ArticleData = {title: string;body: string;image?: string;link?: PageLink;};
export type ArticlesData = {title: string;articles: ArticleData[];};

export type ProductPageData = {
  hero: ProductHeroData;
  /** Breadcrumb trail; the last item is the current page. */
  breadcrumb: PageLink[];
  help?: {title: string;items: readonly HelpItem[];};
  know?: {title: string;intro?: string;tabs: KnowTabData[];};
  apply?: ApplyData;
  explore?: ExploreData;
  articles?: ArticlesData;
};
