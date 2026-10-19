import React, { ReactNode } from 'react';
import { InfoIcon } from 'lucide-react';
import { ActionLink } from './ActionLink';
import type { ProductHeroData } from '../../data/productPage';

/** Absa product hero: full-bleed photo, headline and CTA on the left, floating card (e.g. a calculator) on the right. */
export function ProductHero({ hero, aside }: {hero: ProductHeroData;aside?: ReactNode;}) {
  return (
    <section className="relative w-full overflow-hidden bg-[#2a1a17]">
      <img
        src={hero.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={hero.imagePosition ? { objectPosition: hero.imagePosition } : undefined} />
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-10 lg:flex-row lg:items-start lg:justify-between lg:px-[100px] lg:pb-4 lg:pt-8">
        <div className="max-w-xl pt-4 text-white">
          <h1 className="text-[44px] font-semibold leading-tight lg:text-[60px]">{hero.title}</h1>
          <p className="mt-3 text-[16px]">{hero.intro}</p>
          {hero.cta &&
          <ActionLink
            link={hero.cta}
            className="mt-8 inline-block bg-cic-orange px-6 py-2.5 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]" />

          }
        </div>
        {(aside || hero.disclaimer) &&
        <div id="get-started" className="flex scroll-mt-6 flex-col items-end">
            {aside}
            {hero.disclaimer &&
          <button className="mt-10 flex items-center gap-1.5 text-[15px] text-white" title={hero.disclaimer}>
                Disclaimer <InfoIcon className="h-4 w-4 text-[#5aa9ff]" aria-hidden="true" />
              </button>
          }
          </div>
        }
      </div>
    </section>);

}
