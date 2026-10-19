import React from 'react';

type Props = {title: string;intro?: React.ReactNode;id?: string;as?: 'h1' | 'h2';};

/** Absa section heading: 32px semibold title with optional 14px intro. */
export function SectionHeading({ title, intro, id, as = 'h2' }: Props) {
  const Tag = as;
  return (
    <div className="max-w-3xl">
      <Tag id={id} className="text-[32px] font-semibold leading-tight text-cic-ink">
        {title}
      </Tag>
      {intro && <div className="mt-3 text-[14px] leading-relaxed text-cic-ink">{intro}</div>}
    </div>);

}

/** Absa page section wrapper: consistent top spacing plus heading. */
export function Section({
  title,
  intro,
  id,
  children,
  className = 'pt-14'






}: {title?: string;intro?: React.ReactNode;id?: string;children: React.ReactNode;className?: string;}) {
  return (
    <section aria-labelledby={title && id ? id : undefined} aria-label={title && !id ? title : undefined} className={className}>
      {title && <SectionHeading title={title} intro={intro} id={id} />}
      <div className={title ? 'mt-6' : ''}>{children}</div>
    </section>);

}
