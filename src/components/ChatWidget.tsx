import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircleIcon, MessagesSquareIcon } from 'lucide-react';
import { contact } from '../data/navigation';

const waNumber = contact.whatsapp.replace(/\D/g, '');
const waLocal = `0${waNumber.slice(3, 6)} ${waNumber.slice(6, 9)} ${waNumber.slice(9)}`;

const OPEN_EVENT = 'cic:open-chat';

/** Opens the chat dialog from anywhere (e.g. a "Chat with us" button in a page hero). */
export const openChat = () => window.dispatchEvent(new Event(OPEN_EVENT));

/** Floating "Chat with us" button, as on CIC Online: opens a dialog that hands over to CIC's WhatsApp assistant. */
export function ChatWidget() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    dialogRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const els = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a, button'));
      const first = els[0];
      const last = els[els.length - 1];
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
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-[28px] bg-[#8E1024] py-3.5 pl-4 pr-5 text-[14px] font-semibold text-cic-amber shadow-[0_8px_20px_rgba(142,15,36,0.35)] transition-transform duration-150 hover:scale-[1.03]">

        <MessagesSquareIcon className="h-6 w-6" aria-hidden="true" />
        Chat with us
      </button>

      <AnimatePresence>
        {open &&
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.15 }}>

            <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden="true" />
            <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
            aria-describedby="chat-desc"
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="relative flex w-[480px] max-w-full flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center shadow-[0_16px_48px_rgba(0,0,0,0.18)]">

              <span className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[radial-gradient(ellipse_at_center,#F7B9C1_0%,rgba(247,185,193,0)_100%)]">
                <MessageCircleIcon className="h-12 w-12 text-[#C8102E]" aria-hidden="true" />
              </span>
              <h2 id="chat-title" className="text-[18px] font-semibold">Chat with us on WhatsApp</h2>
              <p id="chat-desc" className="text-[14px] leading-5 text-cic-muted">
                Our chat assistant is on WhatsApp. We'll open WhatsApp so you can chat with us on {waLocal}.
              </p>
              <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-[#8E1024] px-6 text-[16px] font-semibold text-white transition-colors hover:bg-[#8E1024]/90">

                Open WhatsApp
              </a>
              <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-12 w-full items-center justify-center rounded-full px-6 text-[16px] font-semibold text-[#8E1024] transition-colors hover:bg-[#FDF2F4]">

                Not now
              </button>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}
