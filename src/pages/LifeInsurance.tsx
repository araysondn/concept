import React from 'react';
import { ProductPage } from '../components/product/ProductPage';
import { LifeCoverCalculator } from '../components/life/LifeCoverCalculator';
import { lifePage } from '../data/life';

export function LifeInsurance() {
  return <ProductPage data={lifePage} calculator={<LifeCoverCalculator />} />;
}
