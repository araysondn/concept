import React from 'react';
import { ContactCards, ContentLayout, DocumentList, PageHero, Section } from '../components/patterns';
import { dpoAddress, PrivacyBlock, privacyMeta, privacySections, requestForms } from '../data/privacy';

/** Renders **bold** runs from the verbatim source text. */
function Rich({ text }: {text: string;}) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) => i % 2 === 1 ? <strong key={i} className="font-semibold">{p}</strong> : <React.Fragment key={i}>{p}</React.Fragment>)}
    </>);

}

/** Table cells use " • " for bullet points; show them as a list. */
function Cell({ text }: {text: string;}) {
  const [lead, ...bullets] = text.split(/\s*•\s*/);
  if (bullets.length === 0) return <Rich text={text} />;
  return (
    <>
      {lead && <p><Rich text={lead} /></p>}
      <ul className="mt-1 list-disc space-y-1 pl-4">
        {bullets.map((b) =>
        <li key={b}>
            <Rich text={b} />
          </li>
        )}
      </ul>
    </>);

}

function Block({ block }: {block: PrivacyBlock;}) {
  if (block.kind === 'p') {
    return (
      <p>
        <Rich text={block.text} />
      </p>);

  }
  if (block.kind === 'ul') {
    return (
      <ul className="list-disc space-y-1.5 pl-5">
        {block.items.map((item) =>
        <li key={item}>
            <Rich text={item} />
          </li>
        )}
      </ul>);

  }
  return (
    <div className="overflow-x-auto bg-white shadow-card">
      <table className="w-full min-w-[560px] text-left text-[13px] leading-relaxed">
        <thead>
          <tr className="border-b border-cic-line bg-cic-burgundy text-white">
            {block.headers.map((h) =>
            <th key={h} scope="col" className="px-5 py-3 font-semibold">
                {h}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) =>
          'group' in row ?
          <tr key={row.group} className="border-b border-cic-line bg-cic-mist">
                <th scope="colgroup" colSpan={block.headers.length} className="px-5 py-2.5 text-[12px] font-semibold tracking-wide">
                  {row.group}
                </th>
              </tr> :

          <tr key={i} className="border-b border-cic-line align-top last:border-0">
                {row.cells.map((c, ci) =>
            <td key={ci} className={`px-5 py-4 ${ci === 0 ? 'font-semibold' : ''}`}>
                    <Cell text={c} />
                  </td>
            )}
              </tr>

          )}
        </tbody>
      </table>
    </div>);

}

export function Privacy() {
  return (
    <ContentLayout
      top={
      <PageHero
        title="Data Privacy Statement"
        intro={`Your privacy matters to us. Here's how CIC Group collects, uses and protects your personal data. ${privacyMeta.version}.`}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Data Privacy Statement' }]} />

      }>

      <div className="grid gap-10 pt-14 lg:grid-cols-[260px_1fr]">
        <nav aria-label="On this page" className="lg:sticky lg:top-6 lg:self-start">
          <p className="text-[13px] font-semibold">On this page</p>
          <ul className="mt-3 flex flex-col gap-2">
            {privacySections.map((s) =>
            <li key={s.id}>
                <a
                href={`#${s.id}`}
                className="block bg-cic-mist px-3 py-2.5 text-[13px] font-semibold transition-colors duration-150 hover:bg-cic-burgundy hover:text-white">

                  {s.title}
                </a>
              </li>
            )}
            <li>
              <a
                href="#request-forms"
                className="block bg-cic-mist px-3 py-2.5 text-[13px] font-semibold transition-colors duration-150 hover:bg-cic-burgundy hover:text-white">

                Data subject request forms
              </a>
            </li>
          </ul>
        </nav>

        <article className="min-w-0">
          <h2 className="text-[24px] font-semibold">{privacyMeta.title}</h2>
          <p className="mt-1 text-[13px] text-cic-muted">{privacyMeta.version}</p>

          {privacySections.map((s) =>
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-6 border-t border-cic-line pt-8 mt-8">
              <h3 id={`${s.id}-title`} className="text-[22px] font-semibold">
                {s.title}
              </h3>
              <div className="mt-4 space-y-4 text-[14px] leading-relaxed">
                {s.blocks.map((b, i) =>
              <Block key={i} block={b} />
              )}
              </div>
            </section>
          )}

          <Section title="Data subject request forms" id="request-forms" className="scroll-mt-6 pt-14">
            <DocumentList items={requestForms.map((f) => ({ title: f.title, category: 'PDF form', href: f.href }))} />
          </Section>

          <Section title="Our address for data processing" id="dpo" className="pt-14">
            <ContactCards columns={2} items={[{ title: dpoAddress[0], lines: dpoAddress.slice(1) }]} />
          </Section>
        </article>
      </div>
    </ContentLayout>);

}
