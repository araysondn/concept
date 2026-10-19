import React from 'react';
import { Link } from 'react-router-dom';
import { AwardIcon, HeartHandshakeIcon, StethoscopeIcon, LightbulbIcon } from 'lucide-react';
import { awardFeatures, homeImages } from '../../data/home';

const icons = { award: AwardIcon, heart: HeartHandshakeIcon, medical: StethoscopeIcon, idea: LightbulbIcon };

export function HomePromos() {
  return (
    <section aria-label="Offers" className="grid gap-5 pb-14 pt-14 lg:grid-cols-[1fr_1.2fr]">
      <article className="flex flex-col overflow-hidden bg-cic-red text-white sm:flex-row">
        <img src={homeImages.retirement} alt="" className="h-48 w-full object-cover sm:h-auto sm:w-[42%]" />
        <div className="flex flex-col p-6">
          <h2 className="text-[24px] font-semibold leading-tight">
            Enjoy your sunset years, while enjoying the sunsets
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed">
            Jipange Plus helps you build a personal pension at your own pace, so you can retire on your own terms.
          </p>
          <Link
            to="/products"
            className="mt-auto self-start border border-white px-3 py-1.5 text-[13px] font-semibold transition-colors duration-150 hover:bg-white/15 max-sm:mt-5">

            Tell me more
          </Link>
        </div>
      </article>

      <article className="relative overflow-hidden text-white">
        <img src={homeImages.diver} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-cic-wine/60" aria-hidden="true" />
        <div className="relative p-6">
          <h2 className="max-w-md text-[24px] font-semibold leading-tight">Award-winning cover you can count on</h2>
          <p className="mt-3 max-w-md text-[13px]">
            CIC Life Assurance and CIC General Insurance were recognised at the 2023 Think Business Insurance Awards.
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-[75%]">
            {awardFeatures.map((f) => {
              const Icon = icons[f.icon];
              return (
                <li key={f.title}>
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  <p className="mt-2 text-[12px] font-semibold">{f.title}</p>
                  <p className="mt-1 text-[11px] leading-snug">{f.body}</p>
                </li>);

            })}
          </ul>
          <Link to="/register" className="mt-6 inline-block border border-white px-3 py-1.5 text-[13px] font-semibold transition-colors duration-150 hover:bg-white/15">
            Open an account
          </Link>
        </div>
      </article>
    </section>);

}
