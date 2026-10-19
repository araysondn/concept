import React from 'react';
import { ProductPage } from '../components/product/ProductPage';
import { OrderCard } from '../components/pharmacy/OrderCard';
import { pharmacyPage } from '../data/pharmacy';

export function Pharmacy() {
  return <ProductPage data={pharmacyPage} calculator={<OrderCard />} />;
}
