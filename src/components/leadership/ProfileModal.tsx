import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import type { Person } from '../patterns';
import { BrandStripe } from '../BrandStripe';
import { Portrait } from './LeaderCard';

const ease = [0.23, 1, 0.32, 1] as const;

export function ProfileModal({ person, company, onClose }: {person: Person | null;company?: string;onClose: () => void;}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!person) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [person, onClose]);

  return (
    <AnimatePresence>
      {person &&
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease }}
        onClick={onClose}>

          <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-name"
          className="relative flex max-h-[90vh] w-full max-w-[880px] flex-col overflow-hidden bg-white shadow-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22, ease }}
          onClick={(e) => e.stopPropagation()}>

            <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close profile"
            className="absolute right-3 top-3 z-10 bg-white p-1.5 text-cic-ink shadow-card hover:text-cic-red">

              <XIcon className="h-5 w-5" />
            </button>
            <div className="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-[280px_1fr]">
              <div className="bg-cic-mist">
                <Portrait person={person} className="mx-auto max-w-[280px]" />
              </div>
              <div className="px-6 py-8 md:px-10">
                {company && <p className="text-[12px] font-semibold uppercase tracking-wide text-cic-red">{company}</p>}
                <h2 id="profile-name" className="mt-1 text-[28px] font-semibold leading-tight">{person.name}</h2>
                <p className="mt-1 text-[15px] text-cic-muted">{person.title}</p>
                <div className="mt-5 border-t border-cic-line pt-5 text-[14px] leading-relaxed">
                  {person.bio ?
                <p>{person.bio}</p> :

                <p className="text-cic-muted">A full profile isn't available yet.</p>
                }
                </div>
              </div>
            </div>
            <BrandStripe className="h-1.5" />
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}
