import React, { useCallback, useState } from 'react';
import {
  CardGrid, ContentLayout, DocumentList, PageSections, PageHero, PromoBand, Section, StatList } from
'../patterns';
import type { Person } from '../patterns';
import { LeaderCard } from '../leadership/LeaderCard';
import { ProfileModal } from '../leadership/ProfileModal';
import { enrich } from '../../data/leadershipGroups';
import type { Company } from '../../data/companies';

const peopleGroups = ['Board of Directors', 'Management'];

/** Absa-style subsidiary page: hero, then icon tabs for overview, products, leadership and reports. */
export function CompanyPage({ company, productColumns = 4 }: {company: Company;productColumns?: 2 | 3 | 4;}) {
  const stats = company.facts ?? company.keyPoints;
  const [selected, setSelected] = useState<Person | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const people = enrich(company.people);

  const tabs = [
  {
    id: 'overview',
    content:
    <>
          <Section title={`About ${company.name}`} className="pt-10">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div className="space-y-4 text-[15px] leading-relaxed">
                {company.intro.map((para) =>
            <p key={para.slice(0, 24)}>{para}</p>
            )}
              </div>
              {stats &&
          <div>
                  <StatList stats={stats} columns={2} />
                  {company.factsNote && <p className="mt-3 text-[12px] italic text-cic-muted">{company.factsNote}</p>}
                </div>
          }
            </div>
          </Section>
          <div className="pt-14">
            <PromoBand
          title="We're here when you need us most"
          body="Something happened? Here's how to make a claim, step by step, with all the forms you need."
          link={{ label: 'Make a claim', to: '/claims' }}
          wide />

          </div>
        </>

  },
  {
    id: 'products',
    content:
    <>
          {company.groups.map((g) =>
      <Section key={g.title} title={g.title} intro={g.intro} className="pt-10">
              <CardGrid items={g.products.map((prod) => ({ icon: g.icon, ...prod }))} columns={productColumns} />
            </Section>
      )}
        </>

  },
  {
    id: 'leadership',
    content:
    <div className="space-y-12 pt-10">
          {peopleGroups.map((grp) => {
        const list = people.filter((p) => p.group === grp);
        if (!list.length) return null;
        return (
          <section key={grp} aria-labelledby={`lead-${grp}`}>
                <h2 id={`lead-${grp}`} className="inline-block border-b-[3px] border-cic-red pb-2 text-[24px] font-semibold">
                  {grp}
                </h2>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  {list.map((p) =>
              <LeaderCard key={`${grp}-${p.name}-${p.title}`} person={p} onOpen={() => setSelected(p)} />
              )}
                </ul>
              </section>);

      })}
        </div>

  },
  {
    id: 'reports',
    content:
    <Section title="Reports and documents" intro="Annual reports, financial statements and notices." className="pt-10">
          <DocumentList items={company.reports} />
        </Section>

  }];


  return (
    <ContentLayout
      top={
      <PageHero
        title={company.name}
        intro={company.tagline}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Our businesses', to: '/about' }, { label: company.name }]}
        ctas={[{ label: 'Get a quote', to: '/products' }, { label: 'Make a claim', to: '/claims' }]} />

      }>

      <PageSections sections={tabs} />
      <div className="pb-14" />
      <ProfileModal person={selected} company={company.name} onClose={close} />
    </ContentLayout>);

}
