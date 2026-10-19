import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HelpMeChoose } from './HelpMeChoose';
import { FilterPanel } from './FilterPanel';
import { FundCard } from './FundCard';
import { CompareView } from './CompareView';
import { useFundFilters } from '../../hooks/useFundFilters';

const DEFAULT_COMPARE = ['mmf', 'dollar', 'balanced'];

/** Fund finder: guided filters, advanced filters, fund cards, side-by-side compare and a sticky compare bar. */
export function FundExplorer() {
  const f = useFundFilters();
  const [tab, setTab] = useState<'explore' | 'compare'>('explore');
  const [moreOpen, setMoreOpen] = useState(false);
  const [compareView, setCompareView] = useState<string[]>(DEFAULT_COMPARE);

  const openCompare = () => {
    const ids = [...f.compareIds, ...DEFAULT_COMPARE.filter((d) => !f.compareIds.includes(d))].slice(0, 3);
    setCompareView(ids);
    setTab('compare');
  };

  return (
    <section id="fund-explorer" aria-labelledby="fund-explorer-title" className="scroll-mt-6 pt-14">
      <h2 id="fund-explorer-title" className="text-[28px] font-semibold">Find the right fund for you</h2>
      <p className="mt-2 max-w-3xl text-[14px] leading-relaxed">
        Tell us how much you want to put away, for how long and how soon you might need it. We'll show you the funds and
        plans that fit, and you can compare up to three side by side.
      </p>

      <div role="tablist" aria-label="Investments view" className="mt-8 flex gap-8">
        {(['explore', 'compare'] as const).map((t) =>
        <button
          key={t}
          role="tab"
          aria-selected={tab === t}
          onClick={() => t === 'compare' ? openCompare() : setTab('explore')}
          className={`border-b-[3px] pb-1 text-[18px] capitalize transition-colors duration-150 ${
          tab === t ? 'border-cic-red font-semibold text-cic-red' : 'border-transparent hover:text-cic-red'}`
          }>

            {t}
          </button>
        )}
      </div>

      {tab === 'explore' ?
      <div className="mt-8">
          <HelpMeChoose
          amount={f.amount}
          setAmount={f.setAmount}
          horizon={f.horizon}
          setHorizon={f.setHorizon}
          access={f.access}
          setAccess={f.setAccess}
          moreOpen={moreOpen}
          onToggleMore={() => setMoreOpen((o) => !o)}
          advancedCount={f.advancedCount}
          count={f.results.length} />


          <AnimatePresence initial={false}>
            {moreOpen &&
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden">

                <FilterPanel value={f.advanced} onChange={f.setAdvanced} onClear={f.clearAdvanced} />
              </motion.div>
          }
          </AnimatePresence>

          {f.results.length === 0 ?
        <div className="mt-8 bg-cic-mist px-6 py-12 text-center">
              <p className="text-[18px] font-semibold">No products match your choices</p>
              <p className="mt-2 text-[14px] text-cic-muted">Try a longer time frame, a different amount or clear some filters.</p>
              <button onClick={f.clearAdvanced} className="mt-5 border border-cic-orange px-5 py-1.5 text-[13px] text-cic-orange hover:bg-[#FBECEC]">
                Clear filters
              </button>
            </div> :

        <div className="mt-6 grid gap-6 md:grid-cols-2">
              {f.results.map((p) => {
            const compared = f.compareIds.includes(p.id);
            return (
              <FundCard
                key={p.id}
                product={p}
                compared={compared}
                compareDisabled={!compared && f.compareIds.length >= 3}
                onToggleCompare={() => f.toggleCompare(p.id)} />);


          })}
            </div>
        }
        </div> :

      <div className="mt-8">
          <CompareView ids={compareView} onChange={setCompareView} />
        </div>
      }

      <p className="mt-12 max-w-4xl text-[11px] leading-relaxed text-cic-muted">
        Unit trusts are managed by CIC Asset Management Limited and regulated by the Capital Markets Authority. Returns
        depend on the performance of the underlying investments and are not guaranteed; past performance is not an
        indication of future performance. Minimums shown are indicative, so please check the latest fund factsheet or
        speak to a CIC financial advisor before investing.
      </p>

      <AnimatePresence>
        {tab === 'explore' && f.compareIds.length > 0 &&
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-x-0 bottom-0 z-20 border-t border-cic-line bg-white shadow-card">

            <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3 lg:px-[100px]">
              <p className="text-[14px]">
                <span className="font-semibold">{f.compareIds.length}</span> of 3 products selected to compare
              </p>
              <div className="flex gap-3">
                <button onClick={() => f.setCompareIds([])} className="text-[13px] text-cic-orange hover:underline">
                  Clear
                </button>
                <button onClick={openCompare} className="bg-cic-orange px-5 py-2 text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]">
                  Compare now
                </button>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}
