import React from 'react';
import { ContentLayout, PageHero, PromoBand, Section, Timeline } from '../../components/patterns';
import type { TimelineEntry } from '../../components/patterns';
import { historyYears } from '../../data/history';

const entries: TimelineEntry[] = historyYears.map(({ year, events }) => {
  const [first, ...rest] = events;
  const firstText = typeof first === 'string' ? first : first.text;
  const firstItems = typeof first === 'string' ? [] : first.items;
  return {
    year,
    title: firstText,
    body:
    firstItems.length + rest.length > 0 ?
    <ul className="list-disc space-y-1 pl-5">
          {firstItems.map((i) =>
      <li key={i}>{i}</li>
      )}
          {rest.map((e) =>
      typeof e === 'string' ?
      <li key={e}>{e}</li> :

      <li key={e.text}>
                {e.text}
                <ul className="mt-1 list-[circle] space-y-1 pl-5">
                  {e.items.map((i) =>
          <li key={i}>{i}</li>
          )}
                </ul>
              </li>

      )}
        </ul> :
    undefined
  };
});

export function History() {
  return (
    <ContentLayout
      top={
      <PageHero
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About us', to: '/about' }, { label: 'Our history' }]}
        title="Our story so far"
        intro="We started in 1968 as an insurance agency within the Kenya National Federation of Co-operatives. Here's how we grew into the CIC Group you know today." />

      }>

      <Section title="Our history" intro="Milestones from 1968 to 2022, newest first." id="history">
        <div className="max-w-4xl bg-white p-6 shadow-card md:p-8">
          <Timeline entries={entries} />
        </div>
      </Section>

      <section aria-label="Explore more" className="grid gap-3 pt-14 md:grid-cols-2">
        <PromoBand
          tone="red"
          title="Meet the people leading us today"
          body="Our board and senior management carry the cooperative spirit forward."
          link={{ label: 'Meet our leaders', to: '/about/leadership' }} />

        <PromoBand
          tone="wine"
          title="Listed on the NSE since 2012"
          body="Find annual reports, results and AGM documents in one place."
          link={{ label: 'Investor relations', to: '/about/investor-relations' }} />

      </section>
    </ContentLayout>);

}
