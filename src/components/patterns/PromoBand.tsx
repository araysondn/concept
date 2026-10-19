import React from 'react';
import { LinkTarget, SmartLink, btnOutlineInverse } from './shared';

type Props = {
  title: string;
  body: React.ReactNode;
  link?: LinkTarget;
  image?: string;
  /** Tailwind background class; defaults to the brand orange-slot (CIC red). */
  tone?: 'red' | 'wine' | 'pink' | 'dark';
  /** Wide banner (image on the right half) vs. compact promo card. */
  wide?: boolean;
};

const tones = {
  red: 'bg-cic-orange',
  wine: 'bg-cic-wine',
  pink: 'bg-cic-pink',
  dark: 'bg-[#1d1d1d]'
};

/** Absa split promo: solid colour block with white copy and outline button; image on the right (wide) or faded behind (compact). */
export function PromoBand({ title, body, link, image, tone = 'red', wide = false }: Props) {
  if (wide) {
    return (
      <article className={`relative flex min-h-[190px] overflow-hidden text-white shadow-card ${tones[tone]}`}>
        {image &&
        <img src={image} alt="" className="absolute bottom-0 right-0 hidden h-full w-[55%] object-cover object-right md:block" />
        }
        <div className={`relative flex flex-col p-6 md:p-8 ${image ? 'md:pr-[55%]' : ''}`}>
          <h3 className="text-[28px] font-semibold">{title}</h3>
          <div className="mt-3 text-[13px] leading-relaxed">{body}</div>
          {link && <SmartLink target={link} className={`mt-auto self-start max-md:mt-8 ${btnOutlineInverse}`} />}
        </div>
      </article>);

  }
  return (
    <article className={`relative flex min-h-[220px] overflow-hidden text-white shadow-card ${tones[tone]}`}>
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />}
      <div className="relative flex max-w-[70%] flex-col p-6">
        <h3 className="text-[19px] font-semibold">{title}</h3>
        <div className="mb-6 mt-3 text-[12.5px] leading-relaxed">{body}</div>
        {link && <SmartLink target={link} className={`mt-auto self-start ${btnOutlineInverse}`} />}
      </div>
    </article>);

}
