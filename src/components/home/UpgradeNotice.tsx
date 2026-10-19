import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { homeImages } from '../../data/home';

export function UpgradeNotice() {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence initial={false}>
      {open &&
      <motion.section
        aria-label="About CIC Group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="relative mt-10 flex overflow-hidden bg-cic-blush text-white">

          <div className="relative z-10 max-w-xl p-8 md:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-[13px] font-bold">
              CIC
            </span>
            <h2 className="mt-5 text-[28px] font-semibold">More than five decades helping people achieve financial security</h2>
            <p className="mt-4 text-[15px] leading-relaxed">
              At CIC, we keep our word. With 125+ products and over a million customers, we're always aiming to exceed
              your expectations with creative solutions that keep up with your needs.
            </p>
          </div>
          <img
          src={homeImages.upgrade}
          alt=""
          className="absolute bottom-0 right-0 hidden h-full w-[34%] object-cover object-top md:block" />

          <button
          onClick={() => setOpen(false)}
          aria-label="Dismiss notice"
          className="absolute right-4 top-4 z-10 rounded p-1 transition-colors duration-150 hover:bg-white/15">

            <XIcon className="h-6 w-6" />
          </button>
        </motion.section>
      }
    </AnimatePresence>);

}
