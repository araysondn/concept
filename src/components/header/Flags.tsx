import React from 'react';

/** Simplified national flags as inline SVG (flag emoji don't render on Windows). 3:2 ratio. */
export type CountryCode = 'KE' | 'UG' | 'MW' | 'SS';

function Kenya() {
  return (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6" fill="#000" />
      <rect y="7.33" width="30" height="5.34" fill="#BB0000" />
      <rect y="14" width="30" height="6" fill="#006600" />
      <ellipse cx="15" cy="10" rx="3.2" ry="6.4" fill="#000" stroke="#fff" strokeWidth="0.5" />
      <ellipse cx="15" cy="10" rx="1.9" ry="6.2" fill="#BB0000" />
      <ellipse cx="15" cy="10" rx="0.7" ry="1.5" fill="#fff" />
    </>);

}

function Uganda() {
  const stripes = ['#000', '#FCDC04', '#D90000', '#000', '#FCDC04', '#D90000'];
  return (
    <>
      {stripes.map((c, i) => <rect key={i} y={i * 20 / 6} width="30" height={20 / 6 + 0.05} fill={c} />)}
      <circle cx="15" cy="10" r="3.4" fill="#fff" />
      <circle cx="15" cy="10" r="1.6" fill="#9CA69C" />
    </>);

}

function Malawi() {
  return (
    <>
      <rect width="30" height="6.67" fill="#000" />
      <rect y="6.67" width="30" height="6.67" fill="#CE1126" />
      <rect y="13.33" width="30" height="6.67" fill="#339E35" />
      <path d="M10 6.67a5 5 0 0 1 10 0z" fill="#CE1126" />
      {Array.from({ length: 9 }, (_, i) => {
        const a = Math.PI * (i + 1) / 10;
        return <line key={i} x1={15 - Math.cos(a) * 5.4} y1={6.67 - Math.sin(a) * 5.4} x2={15 - Math.cos(a) * 6.6} y2={6.67 - Math.sin(a) * 6.6} stroke="#CE1126" strokeWidth="0.8" />;
      })}
    </>);

}

function SouthSudan() {
  return (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6" fill="#000" />
      <rect y="7.2" width="30" height="5.6" fill="#DA121A" />
      <rect y="14" width="30" height="6" fill="#078930" />
      <path d="M0 0L13 10L0 20z" fill="#0F47AF" />
      <path d="M4.6 7.4l.75 1.9 2.05.1-1.6 1.3.55 2-1.75-1.15-1.75 1.15.55-2-1.6-1.3 2.05-.1z" fill="#FCDD09" />
    </>);

}

const flags: Record<CountryCode, () => JSX.Element> = { KE: Kenya, UG: Uganda, MW: Malawi, SS: SouthSudan };

export function Flag({ code, className = 'h-4 w-6' }: {code: CountryCode;className?: string;}) {
  const F = flags[code];
  return (
    <svg viewBox="0 0 30 20" className={`${className} shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.12)]`} aria-hidden="true">
      <F />
    </svg>);

}
