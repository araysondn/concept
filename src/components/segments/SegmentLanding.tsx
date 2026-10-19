import React from 'react';
import {
  ContentLayout,
  PageHero,
  Section,
  IconLinkGrid,
  CardGrid,
  PromoBand,
  StatList,
  ContactCards,
  PageSections,
  LinkTarget } from
'../patterns';
import { MailIcon, MessageCircleIcon, PhoneIcon } from 'lucide-react';
import { SegmentPageData } from '../../data/segments';
import { contact } from '../../data/navigation';

// In-page links jump to the product-group sections (#tab-<group id>).
const target = (label: string, to: string): LinkTarget => to.startsWith('#') ? { label, href: `#tab-${to.slice(1)}` } : { label, to };

/** Absa segment landing (Business / Corporates / Cooperatives): hero, help grid, product groups, promos, contact. */
export function SegmentLanding({ data }: {data: SegmentPageData;}) {
  return (
    <ContentLayout
      top={
      <PageHero
        title={data.hero.title}
        intro={data.hero.intro}
        image={data.hero.image}
        ctas={data.hero.ctas}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: data.breadcrumb }]} />

      }>

      <Section title={data.helpTitle} className="pt-12">
        <IconLinkGrid items={data.help.map((h) => ({ label: h.label, icon: h.icon, link: target('Tell me more', h.to) }))} />
      </Section>

      {data.story &&
      <Section title={data.story.title}>
          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <div className="space-y-4 text-[14px] leading-relaxed">
              {data.story.paragraphs.map((para) =>
            <p key={para}>{para}</p>
            )}
            </div>
            <StatList stats={data.story.stats} columns={3} />
          </div>
        </Section>
      }

      <PageSections
        sections={data.groups.map((g) => ({
          id: g.id,
          content:
          <Section title={g.title} intro={g.intro} className="pt-10">
              <CardGrid
              columns={g.products.length % 3 === 0 && g.products.length < 4 ? 3 : 4}
              items={g.products.map((prod) => ({
                title: prod.name,
                body: prod.body,
                icon: prod.icon,
                link: { label: 'Tell me more', to: prod.to }
              }))} />
            
            </Section>

        }))} />

      <Section>
        <div className="grid gap-3 md:grid-cols-2">
          {data.promos.map((promo) =>
          <PromoBand key={promo.title} title={promo.title} body={promo.body} link={promo.link} tone={promo.tone} />
          )}
        </div>
      </Section>

      <Section title="Let us guide you" intro="Chat with us on WhatsApp, call us directly or email us.">
        <ContactCards
          items={[
          { title: 'WhatsApp', icon: MessageCircleIcon, lines: [contact.whatsapp] },
          { title: 'Call us', icon: PhoneIcon, lines: [contact.phone, contact.landline] },
          { title: 'Email us', icon: MailIcon, lines: [contact.email] }]
          } />

      </Section>
    </ContentLayout>);

}
