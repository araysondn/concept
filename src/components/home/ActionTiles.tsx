import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, TrendingUpIcon, GraduationCapIcon, LayoutDashboardIcon } from 'lucide-react';
import { homeActions } from '../../data/home';

const icons = { insure: ShieldCheckIcon, invest: TrendingUpIcon, plan: GraduationCapIcon, manage: LayoutDashboardIcon };

export function ActionTiles() {
  return (
    <section aria-labelledby="todo-title" className="pt-14">
      <h2 id="todo-title" className="text-[32px] font-semibold text-cic-ink">
        What would you like to do?
      </h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {homeActions.map((a) => {
          const Icon = icons[a.icon];
          return (
            <article key={a.title} className="flex min-h-[150px] flex-col bg-cic-rose p-5 text-white">
              <h3 className="flex items-center gap-3 text-[20px] font-semibold">
                <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                {a.title}
              </h3>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed">{a.body}</p>
              <div className="mt-auto flex justify-end pt-3">
                <Link
                  to={a.to}
                  className="self-end border border-white px-3 py-1.5 text-[13px] font-semibold transition-colors duration-150 hover:bg-white/15">

                  Tell me more
                </Link>
              </div>
            </article>);

        })}
      </div>
    </section>);

}
