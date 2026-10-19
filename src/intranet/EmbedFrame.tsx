import React, { useEffect, useState } from 'react';
import { ExternalLinkIcon, Loader2Icon, MessageSquareIcon } from 'lucide-react';

/**
 * Card body for third-party content loaded in an iframe (Viva Engage, Power BI, Forms…).
 * - No src yet: a placeholder the same size, so the layout can be reviewed now.
 * - src set: lazy-loaded iframe with a loading state; if it hasn't loaded after 15s
 *   (blocked by the provider, or the person isn't signed in) it offers a link instead.
 */
export function EmbedFrame({ src, title, openUrl, height = 560 }: {src?: string;title: string;openUrl?: string;height?: number;}) {
  const [state, setState] = useState<'loading' | 'ready' | 'slow'>('loading');

  useEffect(() => {
    if (!src) return;
    setState('loading');
    const t = window.setTimeout(() => setState((s) => s === 'loading' ? 'slow' : s), 15000);
    return () => window.clearTimeout(t);
  }, [src]);

  if (!src) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded border-2 border-dashed border-cic-line bg-cic-mist px-6 text-center" style={{ height }}>
        <MessageSquareIcon className="h-8 w-8 text-cic-red" strokeWidth={1.5} aria-hidden="true" />
        <p className="text-[15px] font-semibold">{title}</p>
        <p className="max-w-sm text-[13px] text-cic-muted">The live feed is embedded here. Add the embed address in <code className="bg-white px-1">src/intranet/data.ts</code> to load it.</p>
      </div>);

  }

  return (
    <div className="relative overflow-hidden rounded border border-cic-line" style={{ height }}>
      {state !== 'ready' &&
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-cic-mist text-center" role="status">
          {state === 'loading' ?
        <>
              <Loader2Icon className="h-6 w-6 animate-spin text-cic-red" aria-hidden="true" />
              <p className="text-[13px] text-cic-muted">Loading {title}…</p>
            </> :

        <>
              <p className="text-[14px] font-semibold">{title} is taking a while to load</p>
              <p className="max-w-xs text-[13px] text-cic-muted">You may need to sign in to Microsoft 365 first.</p>
              {openUrl &&
          <a href={openUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 bg-cic-orange px-4 py-1.5 text-[13px] font-semibold text-white hover:bg-[#8A1B23]">
                  Open it in a new tab <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                </a>
          }
            </>
        }
        </div>
      }
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="clipboard-write; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setState('ready')}
        className="h-full w-full border-0" />

    </div>);

}
