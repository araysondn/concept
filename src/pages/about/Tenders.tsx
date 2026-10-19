import React from 'react';
import { FileSearchIcon } from 'lucide-react';
import { ContentLayout, DocumentList, PageHero, Section, textLink } from '../../components/patterns';
import { openTenders } from '../../data/media';
import { Link } from 'react-router-dom';

export function Tenders() {
  return (
    <ContentLayout
      top={
      <PageHero
        title="Tenders"
        intro="Want to work with us? This is where we publish open tenders and supplier opportunities across CIC Group."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About CIC', to: '/about' }, { label: 'Tenders' }]} />

      }>

      <Section title="Open tenders" id="open-tenders">
        {openTenders.length === 0 ?
        <div className="flex flex-col items-center bg-cic-mist px-6 py-14 text-center">
            <FileSearchIcon className="h-12 w-12 text-cic-red" strokeWidth={1.25} aria-hidden="true" />
            <h3 className="mt-4 text-[22px] font-semibold">There are no open tenders right now</h3>
            <p className="mt-2 max-w-md text-[14px]">
              Please check back later for new tender opportunities and updates.
            </p>
            <Link to="/contact-us" className={`mt-6 ${textLink}`}>
              Questions? Contact us
            </Link>
          </div> :

        <DocumentList
          items={openTenders.map((t) => ({
            title: t.title,
            category: t.reference,
            date: `Closes ${t.closes}`,
            href: t.href,
            status: 'Open'
          }))} />

        }
      </Section>
    </ContentLayout>);

}
