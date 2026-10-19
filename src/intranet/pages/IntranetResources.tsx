import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRightIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, DownloadIcon, SearchIcon, XIcon } from 'lucide-react';
import { IntranetLayout, PageBanner, container } from '../IntranetLayout';
import { UnderlineTabs } from '../../components/about/UnderlineTabs';
import { resourceCategories, resources } from '../data';

const ALL_TYPES = 'All types';
const PAGE_SIZE = 5;
const tabs = ['All resources', ...resourceCategories.map((c) => c.title)];
const types = [ALL_TYPES, ...Array.from(new Set(resources.map((r) => r.type)))];
const fmt = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const titleOf = (id: string) => resourceCategories.find((c) => c.id === id)!.title;

export function IntranetResources() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState(0);
  const [type, setType] = useState(ALL_TYPES);
  const docsRef = useRef<HTMLElement>(null);

  const cat = tab === 0 ? null : resourceCategories[tab - 1];
  const q = query.trim().toLowerCase();

  const docs = useMemo(
    () =>
    resources.
    filter((r) => !cat || r.category === cat.id).
    filter((r) => type === ALL_TYPES || r.type === type).
    filter((r) => !q || `${r.title} ${titleOf(r.category)} ${r.type}`.toLowerCase().includes(q)).
    sort((a, b) => b.updated.localeCompare(a.updated)),
    [cat, type, q]
  );

  const inCategory = cat ? resources.filter((r) => r.category === cat.id).length : resources.length;

  const [page, setPage] = useState(0);
  useEffect(() => setPage(0), [cat, type, q]);
  const pages = Math.max(1, Math.ceil(docs.length / PAGE_SIZE));
  const pageDocs = docs.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const openCategory = (i: number) => {
    setTab(i + 1);
    docsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const clear = () => {setQuery('');setType(ALL_TYPES);setTab(0);};

  return (
    <IntranetLayout>
      <PageBanner crumb="Resource Centre" title="Resource Centre" body="The group's shared home for policies, guides, forms and other resources." />

      <div className="border-b border-cic-line bg-cic-mist">
        <form role="search" onSubmit={(e) => {e.preventDefault();docsRef.current?.scrollIntoView({ behavior: 'smooth' });}} className={`${container} py-6`}>
          <label htmlFor="resource-search" className="block text-[12px] font-semibold">Search resources</label>
          <div className="mt-1 flex max-w-3xl">
            <div className="flex flex-1 items-center border border-r-0 border-cic-line bg-white px-3 focus-within:border-cic-burgundy">
              <SearchIcon className="h-4 w-4 shrink-0 text-cic-muted" aria-hidden="true" />
              <input
                id="resource-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. leave, VPN, expense claim"
                className="w-full bg-transparent px-2 py-2.5 text-[14px] outline-none placeholder:italic placeholder:text-[#9a9a9a]" />

              {query &&
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="p-1 text-cic-muted hover:text-cic-red">
                  <XIcon className="h-4 w-4" />
                </button>
              }
            </div>
            <button type="submit" className="bg-cic-orange px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#8A1B23]">Search</button>
          </div>
        </form>
      </div>

      <div className={container}>
        <section aria-labelledby="browse-title" className="pt-12">
          <h2 id="browse-title" className="text-[32px] font-semibold">Browse resources</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {resourceCategories.map((c, i) => {
              const count = resources.filter((r) => r.category === c.id).length;
              return (
                <article key={c.id} className="group flex flex-col bg-white shadow-card">
                  <div className="h-[150px] overflow-hidden">
                    <img src={c.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[17px] font-semibold">{c.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed">{c.body}</p>
                    <div className="mt-auto flex items-center pt-6 text-[12px]">
                      <span className="text-cic-muted">{count} resources</span>
                      <button onClick={() => openCategory(i)} className="ml-auto inline-flex items-center gap-1 font-semibold text-cic-burgundy underline hover:text-cic-red">
                        View documents <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>);

            })}
          </div>
        </section>

        <section ref={docsRef} aria-labelledby="docs-title" className="scroll-mt-6 pt-14">
          <h2 id="docs-title" className="text-[32px] font-semibold">Documents</h2>
          <p className="mt-2 text-[15px]">Choose a category, then filter by file type. Newest first.</p>
          <div className="mt-6">
            <UnderlineTabs tabs={tabs} active={tab} onChange={setTab} label="Resource categories" />
          </div>

          <div className="pt-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] text-cic-muted" aria-live="polite">
                {docs.length > 0 ?
                <>Showing {page * PAGE_SIZE + 1}–{Math.min(docs.length, (page + 1) * PAGE_SIZE)} of {docs.length}{docs.length < inCategory && <> (of {inCategory})</>} documents</> :
                <>No documents</>}
                {q && <> matching “{query.trim()}”</>}
              </p>
              <label className="flex items-center gap-2 text-[13px]">
                <span className="font-semibold">File type</span>
                <span className="relative">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="appearance-none border border-cic-line bg-white py-1.5 pl-3 pr-8 text-[13px] outline-none focus:border-cic-burgundy">

                    {types.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-cic-orange" aria-hidden="true" />
                </span>
              </label>
            </div>

            {docs.length === 0 ?
            <div className="border-t border-cic-line py-8 text-center">
                <p className="text-[16px] font-semibold">No documents match</p>
                <p className="mt-1 text-[14px] text-cic-muted">Try a different word or clear your filters.</p>
                <button onClick={clear} className="mt-4 border border-cic-orange px-5 py-1.5 text-[13px] text-cic-orange hover:bg-[#FBECEC]">Clear search and filters</button>
              </div> :

            <>
                <div className="overflow-hidden bg-white shadow-card">
                  <table className="w-full text-left text-[14px]">
                    <thead className="bg-cic-mist text-[13px]">
                      <tr>
                        <th scope="col" className="px-5 py-3 font-semibold">Document</th>
                        <th scope="col" className="hidden px-5 py-3 font-semibold md:table-cell">Category</th>
                        <th scope="col" className="hidden px-5 py-3 font-semibold sm:table-cell">Type</th>
                        <th scope="col" className="hidden px-5 py-3 font-semibold sm:table-cell">Updated</th>
                        <th scope="col" className="px-5 py-3 text-right font-semibold"><span className="sr-only">Download</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageDocs.map((d) =>
                    <tr key={d.title} className="border-t border-cic-line transition-colors hover:bg-[#FCF5F5]">
                          <td className="px-5 py-4">
                            <span className="font-semibold">{d.title}</span>
                            <span className="mt-0.5 block text-[12px] text-cic-muted sm:hidden">{d.type} · {fmt(d.updated)}</span>
                          </td>
                          <td className="hidden px-5 py-4 text-cic-muted md:table-cell">{titleOf(d.category)}</td>
                          <td className="hidden px-5 py-4 sm:table-cell">{d.type}</td>
                          <td className="hidden whitespace-nowrap px-5 py-4 text-cic-muted sm:table-cell">{fmt(d.updated)}</td>
                          <td className="px-5 py-4 text-right">
                            <a href="#" aria-label={`Download ${d.title}`} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-cic-red hover:underline">
                              <DownloadIcon className="h-4 w-4" aria-hidden="true" /> <span className="hidden lg:inline">Download</span>
                            </a>
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </div>

                {pages > 1 &&
              <nav aria-label="Document pages" className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[13px]">
                    <span className="text-cic-muted">Page {page + 1} of {pages}</span>
                    <ul className="flex items-center gap-1">
                      <li>
                        <button onClick={() => setPage(page - 1)} disabled={page === 0} aria-label="Previous page" className="flex h-8 w-8 items-center justify-center border border-cic-line hover:border-cic-red disabled:opacity-40 disabled:hover:border-cic-line">
                          <ChevronLeftIcon className="h-4 w-4" />
                        </button>
                      </li>
                      {Array.from({ length: pages }, (_, i) =>
                  <li key={i}>
                          <button
                      onClick={() => setPage(i)}
                      aria-current={i === page ? 'page' : undefined}
                      className={`h-8 min-w-[32px] border px-2 ${i === page ? 'border-cic-burgundy bg-cic-burgundy text-white' : 'border-cic-line hover:border-cic-red'}`}>

                            {i + 1}
                          </button>
                        </li>
                  )}
                      <li>
                        <button onClick={() => setPage(page + 1)} disabled={page === pages - 1} aria-label="Next page" className="flex h-8 w-8 items-center justify-center border border-cic-line hover:border-cic-red disabled:opacity-40 disabled:hover:border-cic-line">
                          <ChevronRightIcon className="h-4 w-4" />
                        </button>
                      </li>
                    </ul>
                  </nav>
              }
              </>
            }
          </div>
        </section>
      </div>
    </IntranetLayout>);

}
