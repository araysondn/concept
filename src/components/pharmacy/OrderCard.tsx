import React, { useState } from 'react';
import { CalculatorCard, SegmentedChoice } from '../product/calc';
import { TextField } from './TextField';
import { pharmacyContact } from '../../data/pharmacy';

type Method = 'delivery' | 'drive' | 'pickup';

const methods = [
{ value: 'delivery', label: 'Home delivery' },
{ value: 'drive', label: 'Drive-through' },
{ value: 'pickup', label: 'Pick up in store' }] as
const;

const methodText: Record<Method, string> = {
  delivery: 'home delivery',
  drive: 'drive-through collection',
  pickup: 'pick up in store'
};

/** Hero card: collects order details and hands off to WhatsApp. Nothing is sent from this page. */
export function OrderCard() {
  const [method, setMethod] = useState<Method>('delivery');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [prescription, setPrescription] = useState(false);

  const message = [
  'Hello CIC Pharmacy, I would like to place an order.',
  name.trim() && `Name: ${name.trim()}`,
  phone.trim() && `Phone: ${phone.trim()}`,
  `I'd like ${methodText[method]}.`,
  prescription && 'I have a prescription to share.'].
  filter(Boolean).join('\n');

  const whatsapp = `${pharmacyContact.whatsappOrder.split('?')[0]}?text=${encodeURIComponent(message)}`;

  return (
    <CalculatorCard
      title="Order your medicine"
      result={{
        label: "We're open today",
        value: '7am – 7pm',
        note: `Call ${pharmacyContact.phones[0]}. Design concept — orders are placed on WhatsApp.`
      }}
      cta={{ label: 'Order on WhatsApp', href: whatsapp }}>

      <SegmentedChoice legend="How would you like it?" options={methods} value={method} onChange={setMethod} />
      <TextField id="order-name" label="Your name" value={name} onChange={setName} placeholder="e.g. Wanjiru Kamau" autoComplete="name" />
      <TextField id="order-phone" label="Phone number" type="tel" value={phone} onChange={setPhone} placeholder="e.g. 0712 345 678" autoComplete="tel" />
      <label className="mt-3 flex items-center gap-2 text-[13px]">
        <input
          type="checkbox"
          checked={prescription}
          onChange={(e) => setPrescription(e.target.checked)}
          className="h-4 w-4 accent-cic-burgundy" />

        I have a prescription
      </label>
    </CalculatorCard>);

}
