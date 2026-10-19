import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { LinkTarget, SmartLink, btnPrimary, container } from './shared';

type Props = {
  title: string;
  intro?: React.ReactNode;
  /** Full-bleed background image; omit for the solid burgundy band variant. */
  image?: string;
  ctas?: LinkTarget[];
  breadcrumb?: LinkTarget[];
  /** Optional content on the right (e.g. a calculator card or stat list). */
  aside?: React.ReactNode;
};

/** Absa page hero: full-bleed image with dark overlay, or a solid cic-burgundy band when there's no imagery. */
export function PageHero({ title, intro, image, ctas = [], breadcrumb, aside }: Props) {
  return (
    <section className={`relative w-full overflow-hidden ${image ? 'bg-[#2a1a17]' : 'bg-cic-burgundy'}`}>
      {image &&
      <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
        </>
      }
      <div className={`relative ${container}`}>
        {breadcrumb && <Breadcrumb items={breadcrumb} inverse />}
        <div
          className={`flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between ${
          image ? 'py-10 lg:min-h-[380px] lg:pb-12 lg:pt-10' : 'py-10'}`
          }>

          <div className="max-w-xl pt-2 text-white">
            <h1 className={`font-semibold leading-tight ${image ? 'text-[44px] lg:text-[60px]' : 'text-[40px]'}`}>{title}</h1>
            {intro && <div className="mt-3 text-[16px] leading-relaxed">{intro}</div>}
            {ctas.length > 0 &&
            <div className="mt-8 flex flex-wrap gap-3">
                {ctas.map((c, i) =>
              <SmartLink
                key={c.label}
                target={c}
                className={
                i === 0 ?
                image ? btnPrimary : 'inline-block bg-white px-6 py-2.5 text-[15px] font-semibold text-cic-red transition-colors duration-150 hover:bg-cic-mist' :
                'inline-block border border-white px-6 py-2.5 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-white/15'
                } />

              )}
              </div>
            }
          </div>
          {aside && <div className="flex flex-col items-end">{aside}</div>}
        </div>
      </div>
    </section>);

}
