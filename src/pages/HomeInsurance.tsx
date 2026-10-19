import React from 'react';
import { ProductPage } from '../components/product/ProductPage';
import { HomeEstimator } from '../components/calculators/HomeEstimator';
import { homePage } from '../data/homeCover';

export function HomeInsurance() {
  return <ProductPage data={homePage} calculator={<HomeEstimator />} />;
}
