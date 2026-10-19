import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, BriefcaseIcon, CalendarClockIcon, CheckCircle2Icon, ClockIcon, ExternalLinkIcon, MapPinIcon, ShareIcon, UserIcon } from 'lucide-react';
import { Breadcrumb, ContentLayout, btnPrimary, container } from '../../components/patterns';
import { ApplicationForm } from '../../components/careers/ApplicationForm';
import { findJob, jobDetails, jobSlug } from '../../data/jobs';
import { vacancies } from '../../data/careers';
import { formatDate } from '../../data/media';

const HERO_IMAGE = '/cc1fa332-e7e8-46c7-847e-2ead4c6b6142.jpg';
const TODAY = new Date().toISOString().slice(0, 10);

const daysLeft = (iso: string) => Math.ceil((new Date(`${iso}T23:59:59`).getTime() - Date.now()) / 86400000);

function List({ items, icon: Icon = CheckCircle2Icon }: {items: string[];icon?: typeof CheckCircle2Icon;}) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((i) =>
      <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed">
          <Icon className="mt-1 h-4 w-4 shrink-0 text-cic-red" aria-hidden="true" />
          {i}
        </li>
      )}
    </ul>);

}

export function JobDetail() {
  const { slug = '' } = useParams();
  const job = findJob(slug);
  if (!job) return <Navigate to="/about/careers" replace />;

  const detail = jobDetails[slug];
  const closed = !!job.closes && job.closes < TODAY;
  const left = job.closes ? daysLeft(job.closes) : null;
  const others = vacancies.filter((v) => v !== job && (!v.closes || v.closes >= TODAY)).slice(0, 3);

  const facts = [
  { icon: MapPinIcon, label: 'Location', value: job.location },
  { icon: BriefcaseIcon, label: 'Job type', value: job.type },
  ...(detail?.reportsTo ? [{ icon: UserIcon, label: 'Reports to', value: detail.reportsTo }] : []),
  { icon: CalendarClockIcon, label: 'Closing date', value: job.closes ? formatDate(job.closes) : 'Not stated' }];


  return (
    <ContentLayout
      contained={false}
      top={
      <section className="relative w-full overflow-hidden bg-cic-burgundy">
          <img src={HERO_IMAGE} alt="" className="absolute inset-y-0 right-0 hidden h-full w-[45%] object-cover lg:block" style={{ objectPosition: 'center 30%' }} />
          <div className="absolute inset-y-0 right-[45%] hidden w-40 bg-gradient-to-r from-cic-burgundy to-transparent lg:block" style={{ transform: 'translateX(100%)' }} aria-hidden="true" />
          <div className={`${container} relative py-12 text-white lg:min-h-[360px]`}>
            <Breadcrumb
            items={[{ label: 'Home', to: '/' }, { label: 'About CIC', to: '/about' }, { label: 'Careers', to: '/about/careers' }, { label: job.title }]}
            inverse />

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-white px-2.5 py-1 text-[12px] font-semibold text-cic-red">{job.type}</span>
              {left !== null && !closed &&
            <span className="flex items-center gap-1 bg-cic-amber px-2.5 py-1 text-[12px] font-semibold text-cic-ink">
                  <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" /> {left <= 0 ? 'Closes today' : `${left} day${left === 1 ? '' : 's'} left to apply`}
                </span>
            }
              {closed && <span className="bg-black/30 px-2.5 py-1 text-[12px] font-semibold">Applications closed</span>}
            </div>
            <h1 className="mt-3 max-w-2xl text-[36px] font-semibold leading-tight lg:text-[48px]">{job.title}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-[15px] text-white/90">
              <MapPinIcon className="h-4 w-4" aria-hidden="true" /> {job.location} · CIC Insurance Group
            </p>
            {!closed &&
          <a href="#apply" className="mt-6 inline-block bg-white px-6 py-2.5 text-[15px] font-semibold text-cic-red hover:bg-[#FBECEC]">
                Apply now
              </a>
          }
          </div>
        </section>
      }>

      <div className={`${container} grid gap-10 py-14 lg:grid-cols-[1fr_340px]`}>
        <article>
          <Link to="/about/careers#tab-vacancies" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-cic-red hover:underline">
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> All vacancies
          </Link>

          {detail ?
          <>
              <section className="mt-6">
                <h2 className="text-[26px] font-semibold">About the role</h2>
                <p className="mt-3 text-[16px] leading-relaxed">{detail.summary}</p>
              </section>
              <section className="mt-10">
                <h2 className="text-[26px] font-semibold">What you'll do</h2>
                <List items={detail.responsibilities} />
              </section>
              <section className="mt-10 grid gap-5 md:grid-cols-2">
                <div className="bg-white p-6 shadow-card">
                  <h2 className="text-[20px] font-semibold">What you'll need</h2>
                  <List items={detail.essential} />
                </div>
                {detail.desirable &&
              <div className="bg-white p-6 shadow-card">
                    <h2 className="text-[20px] font-semibold">Nice to have</h2>
                    <List items={detail.desirable} />
                  </div>
              }
              </section>
              {detail.notes &&
            <section className="mt-10 border-l-4 border-cic-burgundy bg-cic-mist p-6">
                  <h2 className="text-[18px] font-semibold">Good to know</h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px]">
                    {detail.notes.map((n) => <li key={n}>{n}</li>)}
                  </ul>
                </section>
            }
            </> :

          <section className="mt-6 bg-white p-6 shadow-card">
              <h2 className="text-[22px] font-semibold">About the role</h2>
              <p className="mt-2 text-[15px] leading-relaxed">
                Read the full job description on our careers site, then apply here or there.
              </p>
              <a href={job.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-cic-red hover:underline">
                Full job description <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </section>
          }
        </article>

        {/* Summary card */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="bg-white shadow-card">
            <div className="h-1.5 bg-cic-orange" aria-hidden="true" />
            <dl className="divide-y divide-cic-line px-6">
              {facts.map((f) =>
              <div key={f.label} className="flex items-start gap-3 py-4">
                  <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-cic-red" strokeWidth={1.5} aria-hidden="true" />
                  <span>
                    <dt className="text-[12px] text-cic-muted">{f.label}</dt>
                    <dd className="text-[15px] font-semibold">{f.value}</dd>
                  </span>
                </div>
              )}
            </dl>
            <div className="space-y-3 p-6 pt-2">
              {closed ?
              <p className="text-[14px] text-cic-muted">This vacancy has closed.</p> :
              <a href="#apply" className={`${btnPrimary} block text-center`}>Apply now</a>
              }
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="flex w-full items-center justify-center gap-2 border border-cic-line py-2.5 text-[14px] font-semibold hover:border-cic-red hover:text-cic-red">

                <ShareIcon className="h-4 w-4" aria-hidden="true" /> Copy link to share
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Application */}
      {!closed &&
      <section id="apply" aria-labelledby="apply-title" className="scroll-mt-0 border-t border-cic-line">
          <div className="bg-cic-burgundy py-10 text-white">
            <div className={container}>
              <p className="text-[13px] text-white/80">Apply online · about 10 minutes</p>
              <h2 id="apply-title" className="mt-1 text-[36px] font-semibold leading-tight lg:text-[40px]">Apply for {job.title}</h2>
            </div>
          </div>
          <div className={`${container} py-12`}>
            <ApplicationForm position={job.title} />
          </div>
        </section>
      }

      {/* More roles */}
      {others.length > 0 &&
      <section aria-labelledby="more-roles" className={`${container} py-14`}>
          <h2 id="more-roles" className="text-[26px] font-semibold">More opportunities</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {others.map((o) =>
          <li key={o.href}>
                <Link to={`/about/careers/${jobSlug(o)}`} className="group flex h-full flex-col bg-white p-5 shadow-card hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
                  <span className="text-[12px] font-semibold uppercase tracking-wide text-cic-red">{o.type}</span>
                  <span className="mt-1 text-[17px] font-semibold leading-snug group-hover:text-cic-red">{o.title}</span>
                  <span className="mt-auto flex items-center gap-1.5 pt-4 text-[13px] text-cic-muted">
                    <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" /> {o.location}
                    {o.closes && <> · closes {formatDate(o.closes)}</>}
                  </span>
                </Link>
              </li>
          )}
          </ul>
        </section>
      }
    </ContentLayout>);

}
