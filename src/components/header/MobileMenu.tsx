import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDownIcon, PhoneIcon, XIcon } from 'lucide-react';
import { NavAnchor } from '../NavAnchor';
import { CicLogo } from '../CicLogo';
import { segmentNav, topNav, utilityNav } from '../../data/navigation';
import type { Segment } from '../../data/navigation';
import { panelFor } from './megaMenu';

type Props = {open: boolean;onClose: () => void;segment: Segment;};

const segmentLabels: Record<Segment, string> = {
  individual: 'Individual',
  business: 'Business',
  corporates: 'Corporates',
  cooperatives: 'Cooperatives',
  about: 'About CIC'
};

/** Slide-in mobile navigation: segment switcher, accordion of sections, utility links. */
export function MobileMenu({ open, onClose, segment }: Props) {
  const reduce = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [seg, setSeg] = useState<Segment>(segment);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setSeg(segment);
    setExpanded(null);
  }, [open, segment]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector<HTMLElement>('button, a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !drawerRef.current) return;
      const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [open, onClose]);

  const segments: Segment[] = [...topNav.map((t) => t.segment), 'about'];

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        className="fixed inset-0 z-50 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.2 }}>

          <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
          <motion.div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className="absolute inset-y-0 right-0 flex w-full max-w-[400px] flex-col bg-white text-cic-ink shadow-card"
          initial={reduce ? { opacity: 0 } : { x: '100%' }}
          animate={reduce ? { opacity: 1 } : { x: 0 }}
          exit={reduce ? { opacity: 0 } : { x: '100%' }}
          transition={{ duration: reduce ? 0 : 0.25, ease: [0.2, 0, 0, 1] }}>

            <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-cic-line px-5">
              <CicLogo className="h-9" tagline={false} />
              <button onClick={onClose} aria-label="Close menu" className="flex items-center gap-1 p-1 text-[14px] hover:text-cic-red">
                <XIcon className="h-5 w-5" aria-hidden="true" /> Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-3 gap-2 p-5" role="group" aria-label="Choose a section">
                {segments.map((s) =>
              <button
                key={s}
                onClick={() => {
                  setSeg(s);
                  setExpanded(null);
                }}
                aria-pressed={seg === s}
                className={`border px-2 py-2 text-[13px] font-semibold transition-colors duration-150 ${
                seg === s ? 'border-cic-burgundy bg-cic-burgundy text-white' : 'border-cic-line hover:border-cic-red'}`
                }>

                    {segmentLabels[s]}
                  </button>
              )}
              </div>

              <ul className="border-t border-cic-line">
                {segmentNav[seg].map((item) => {
                const panel = panelFor(item);
                const key = item.label;
                if (!panel) {
                  return (
                    <li key={key} className="border-b border-cic-line">
                        <NavAnchor item={item} className="block px-5 py-4 text-[15px] font-semibold hover:text-cic-red" />
                      </li>);

                }
                const isOpen = expanded === key;
                const panelId = `m-panel-${key.replace(/\W+/g, '-').toLowerCase()}`;
                return (
                  <li key={key} className="border-b border-cic-line">
                      <button
                      onClick={() => setExpanded(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between px-5 py-4 text-left text-[15px] font-semibold hover:text-cic-red">

                        {item.label}
                        <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                      {isOpen &&
                    <div id={panelId} className="space-y-5 bg-cic-mist px-5 pb-5 pt-4">
                          {panel.columns.map((col) =>
                      <div key={col.heading}>
                              <p className="text-[12px] font-semibold uppercase tracking-wide text-cic-muted">{col.heading}</p>
                              <ul className="mt-2 space-y-2">
                                {col.links.map((l) =>
                          <li key={`${l.label}-${l.to ?? l.href ?? ''}`}>
                                    <NavAnchor item={l} className="text-[14px] hover:text-cic-red hover:underline" />
                                  </li>
                          )}
                              </ul>
                            </div>
                      )}
                          {panel.viewAll &&
                      <NavAnchor item={panel.viewAll} className="inline-block text-[14px] font-semibold text-cic-orange hover:underline" />
                      }
                        </div>
                    }
                    </li>);

              })}
              </ul>

              <ul className="space-y-1 px-5 py-6 text-[15px]">
                {utilityNav.map((item) =>
                <li key={item.label}>
                    <NavAnchor item={item} className="block py-2 hover:text-cic-red" />
                  </li>
                )}
              </ul>
            </div>

            <div className="shrink-0 space-y-3 border-t border-cic-line p-5">
              <NavAnchor
              item={{ label: 'Self-service portal', to: '/online' }}
              className="flex w-full items-center justify-center bg-cic-orange py-2.5 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-[#8A1B23]" />

              <p className="flex items-center justify-center gap-2 text-[13px] text-cic-muted">
                <PhoneIcon className="h-4 w-4" aria-hidden="true" /> Need help? +254 703 099 120
              </p>
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}
