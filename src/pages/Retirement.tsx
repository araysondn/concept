import React from 'react';
import { Accordion, ContactForm, Section } from '../components/patterns';
import { ProductPage } from '../components/product/ProductPage';
import { PensionCalculator } from '../components/retirement/PensionCalculator';
import { retirementFaqs, retirementLeadFields, retirementPage } from '../data/retirement';

export function Retirement() {
  return (
    <ProductPage
      data={retirementPage}
      calculator={<PensionCalculator />}
      extra={
      <>
          <Section id="retirement-faqs" title="Frequently asked questions" className="scroll-mt-6 pt-14">
            <Accordion items={retirementFaqs} />
          </Section>
          <Section
          id="talk"
          className="scroll-mt-6 pt-14"
          title="Talk to a retirement specialist"
          intro="Start your journey here. Leave your details and we'll call you back at a time that suits you.">

            <div className="max-w-3xl">
              <ContactForm
              fields={retirementLeadFields}
              submitLabel="Request a callback"
              successTitle="Thank you, we'll be in touch"
              successBody="One of our retirement specialists will contact you at your preferred time." />

              <p className="mt-3 text-[12px] text-cic-muted">
                By submitting this form you agree to CIC processing your details in line with our Data Privacy Statement.
              </p>
            </div>
          </Section>
        </>
      } />);


}
