import React, { ReactNode } from 'react';

export type PageSection = {id: string;content: ReactNode;};

/** Renders page sections one after another; each is anchored at #tab-<id> so in-page links can jump to it. */
export function PageSections({ sections }: {sections: PageSection[];}) {
  return (
    <>
      {sections.map((s) =>
      <div key={s.id} id={`tab-${s.id}`} className="scroll-mt-6">
          {s.content}
        </div>
      )}
    </>);

}
