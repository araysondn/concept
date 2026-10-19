import React, { useCallback, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Breadcrumb, ContentLayout } from '../../components/patterns';
import type { Person } from '../../components/patterns';
import { LeaderCard } from '../../components/leadership/LeaderCard';
import { ProfileModal } from '../../components/leadership/ProfileModal';
import { leadershipViews } from '../../data/leadershipGroups';

export function Leadership() {
  const { view: slug } = useParams();
  const view = leadershipViews.find((v) => v.slug === slug);
  const [selected, setSelected] = useState<{person: Person;company: string;} | null>(null);
  const close = useCallback(() => setSelected(null), []);

  if (!view) return <Navigate to="/about/leadership/board-of-directors" replace />;

  return (
    <ContentLayout>
      <div className="pt-6">
        <Breadcrumb items={[{ label: 'About us', to: '/about' }, { label: 'Leadership', to: '/about/leadership' }, { label: view.label }]} />
      </div>

      <header className="pt-8">
        <h1 className="text-[40px] font-semibold leading-tight">Our leadership</h1>
        <p className="mt-2 max-w-2xl text-[16px]">Meet the people who lead CIC Group and keep us true to our word.</p>
      </header>

      <nav aria-label="Leadership groups" className="mt-8 border-b border-cic-line">
        <ul className="flex gap-8 text-[15px]">
          {leadershipViews.map((v) => {
            const active = v.slug === view.slug;
            return (
              <li key={v.slug}>
                <Link
                  to={`/about/leadership/${v.slug}`}
                  aria-current={active ? 'page' : undefined}
                  className={`relative block pb-3 transition-colors duration-150 ${
                  active ? 'font-semibold text-cic-red' : 'text-cic-ink hover:text-cic-red'}`
                  }>

                  {v.label}
                  {active && <span className="absolute inset-x-0 -bottom-px h-[3px] bg-cic-red" aria-hidden="true" />}
                </Link>
              </li>);

          })}
        </ul>
      </nav>

      <p className="mt-6 max-w-3xl text-[14px]">{view.intro}</p>

      <div className="space-y-14 pb-6 pt-10">
        {view.groups.filter((g) => g.people.length > 0).map((g) =>
        <section key={g.company} aria-labelledby={`grp-${g.company}`}>
            <h2 id={`grp-${g.company}`} className="inline-block border-b-[3px] border-cic-red pb-2 text-[24px] font-semibold">
              {g.company}
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {g.people.map((p) =>
            <LeaderCard key={`${g.company}-${p.name}-${p.title}`} person={p} onOpen={() => setSelected({ person: p, company: g.company })} />
            )}
            </ul>
          </section>
        )}
      </div>

      <ProfileModal person={selected?.person ?? null} company={selected?.company} onClose={close} />
    </ContentLayout>);

}
