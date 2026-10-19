import React from 'react';
import { ProductPage } from '../components/product/ProductPage';
import { MedicalCoverFinder } from '../components/calculators/MedicalCoverFinder';
import { medicalPage } from '../data/medical';

export function MedicalInsurance() {
  return <ProductPage data={medicalPage} calculator={<MedicalCoverFinder />} />;
}
