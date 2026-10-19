import React from 'react';
import { ProductPage } from '../components/product/ProductPage';
import { PremiumEstimator } from '../components/PremiumEstimator';
import { motorPage } from '../data/motor';

export function MotorInsurance() {
  return <ProductPage data={motorPage} calculator={<PremiumEstimator />} />;
}
