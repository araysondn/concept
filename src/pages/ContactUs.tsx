import React from 'react';
import { PhoneIcon, MessageSquareIcon, MailIcon, MessageCircleIcon, MapPinIcon, ShareIcon } from 'lucide-react';
import { ContactCards, ContactForm, ContentLayout, PageHero, Section } from '../components/patterns';
import { contactIntro, hqChannels, offices, socials } from '../data/contactPage';

export function ContactUs() {
  return (
    <ContentLayout
      top={
      <PageHero
        title="Contact us"
        intro="We're here to help. Call, message or email us, or send us a note below and we'll get back to you."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact us' }]} />

      }>

      <Section title="Talk to us" id="talk-to-us" intro={contactIntro}>
        <ContactCards
          columns={3}
          items={[
          { title: 'Call us', icon: PhoneIcon, lines: [hqChannels.phone, hqChannels.landline] },
          { title: 'WhatsApp', icon: MessageCircleIcon, lines: [hqChannels.whatsapp] },
          { title: 'SMS', icon: MessageSquareIcon, lines: [hqChannels.sms] },
          { title: 'Email', icon: MailIcon, lines: [hqChannels.email] },
          {
            title: 'Write to us',
            icon: MapPinIcon,
            lines: ['CIC Plaza, Mara Road, Upperhill', hqChannels.postal]
          },
          { title: 'Follow us', icon: ShareIcon, lines: socials.map((s) => s.label) }]
          } />

      </Section>

      <Section title="Our offices" id="offices" intro="CIC Group serves customers in four countries. Find the office nearest to you.">
        <ContactCards
          columns={4}
          items={offices.map((o) => ({
            title: o.title,
            lines: o.lines,
            link: { label: `Visit CIC ${o.country}`, href: o.href }
          }))} />

      </Section>

      <Section title="Send us a message" id="message">
        <div className="max-w-3xl">
          <ContactForm
            fields={[
            { id: 'firstName', label: 'First name', placeholder: 'your full name', required: true },
            { id: 'lastName', label: 'Last name', required: true },
            { id: 'email', label: 'Email address', type: 'email', placeholder: 'a valid email', required: true },
            { id: 'phone', label: 'Phone number', type: 'tel' },
            { id: 'comments', label: 'Comments', type: 'textarea', placeholder: 'more details', required: true }]
            }
            submitLabel="Submit now"
            successTitle="Thank you, we've received your message"
            successBody="One of our team will be in touch soon." />

        </div>
      </Section>
    </ContentLayout>);

}
