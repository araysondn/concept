import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, GraduationCapIcon, XIcon } from 'lucide-react';
import { tradeWomanImage } from '../../data/portfolio';

const ease = [0.23, 1, 0.32, 1] as const;

export function OfferBanners() {
  const [visible, setVisible] = useState(true);
  const [taxOpen, setTaxOpen] = useState(true);

  return (
    <section aria-label="Offers" className="mt-6">
      <div className="flex justify-end">
        <button
          onClick={() => setVisible((v) => !v)}
          className="flex items-center gap-1 text-[13px] text-cic-red hover:underline"
          aria-expanded={visible}>
          
          {visible ? 'Hide offers' : 'Show offers'} <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {visible &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.22, ease }}
          className="overflow-hidden">
          
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <article className="relative flex min-h-[160px] overflow-hidden bg-cic-wine p-6 text-white shadow-card">
                <img src={tradeWomanImage} alt="" className="absolute bottom-0 right-0 h-full w-auto object-cover" />
                <div className="relative max-w-[62%]">
                  <h2 className="text-[19px] font-semibold">Grow a little every month</h2>
                  <p className="mt-3 text-[13px] leading-relaxed">
                    Set up a standing order into your Money Market Fund and top up from as little as KES 1,000,
                    straight from M-PESA or your bank.
                  </p>
                  <a href="#" className="mt-5 inline-block border border-white px-4 py-1.5 text-[12px] font-semibold transition-colors duration-150 hover:bg-white/15">
                    Set up a standing order
                  </a>
                </div>
              </article>
              {taxOpen &&
            <article className="relative bg-cic-berry p-6 text-white shadow-card">
                  <button
                onClick={() => setTaxOpen(false)}
                aria-label="Dismiss education plan offer"
                className="absolute right-3 top-3 rounded p-1 hover:bg-white/15">

                    <XIcon className="h-4 w-4" />
                  </button>
                  <GraduationCapIcon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                  <h2 className="mt-2 text-[19px] font-semibold">Plan for your child's education</h2>
                  <p className="mt-3 max-w-md text-[13px] leading-relaxed">
                    CIC Academia helps you save towards school and university fees, with cover that keeps the plan
                    going if the unexpected happens.
                  </p>
                  <a href="#" className="mt-5 inline-block border border-white px-4 py-1.5 text-[12px] font-semibold transition-colors duration-150 hover:bg-white/15">
                    Explore Academia
                  </a>
                </article>
            }
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}