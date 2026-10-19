import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobeIcon, MailIcon, PhoneIcon, TruckIcon } from 'lucide-react';
import { ContactCards, ContactForm, DocumentList, Section } from '../patterns';
import { claimFormFields, claimTypes, claimsPortalUrl, providerPanels } from '../../data/claims';

const forms = claimTypes.flatMap((c) => c.forms);

/** Claims page tools: forms, provider panels, the online claim form and contact channels, each with an anchor. */
export function ClaimsExtra() {
  // Scroll to #claim-forms / #provider-panels / #claim-online, including router navigation within the page.
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <>
      <Section
        id="claim-forms"
        title="Claim forms and downloads"
        intro="Download, fill in and send back the form for your claim. Forms are also available at all our offices."
        className="scroll-mt-6 pt-14">

        <DocumentList items={forms} />
      </Section>

      <Section
        id="provider-panels"
        title="Medical provider panels"
        intro="Find a hospital or clinic on your medical cover's panel."
        className="scroll-mt-6 pt-14">

        <DocumentList items={providerPanels} />
      </Section>

      <div id="claim-online" className="scroll-mt-6 pt-14">
        <ContactForm
          title="Submit your claim"
          fields={claimFormFields}
          submitLabel="Submit claim"
          successTitle="Thank you, we've received your claim"
          successBody="A claims officer will contact you shortly. Please keep your completed claim form and supporting documents ready." />

        <p className="mt-3 text-[12px] text-cic-muted">
          Design concept: this form does not send any information. On the live service you would also upload your completed claim form(s).
        </p>
      </div>

      <Section
        id="claim-contacts"
        title="Get in touch"
        intro="Report a claim as soon as you can. We'll guide you through the rest."
        className="scroll-mt-6 pt-14">

        <ContactCards
          columns={4}
          items={[
          { title: 'Report a claim', icon: PhoneIcon, lines: ['0703 099 120', '020 282 3000'] },
          { title: 'Life claims', icon: MailIcon, lines: ['lifecare@cic.co.ke'] },
          { title: 'Towing (AA of Kenya)', icon: TruckIcon, lines: ['020 697 9000', '0709 933 000', 'Comprehensive motor cover only'] },
          { title: 'Claims portal', icon: GlobeIcon, lines: ['Track and manage your claim online.'], link: { label: 'Open the claims portal', href: claimsPortalUrl } }]
          } />

      </Section>
    </>);

}
