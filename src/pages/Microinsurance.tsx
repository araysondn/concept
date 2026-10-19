import React from 'react';
import { CompanyPage } from '../components/company/CompanyPage';
import { microinsurance } from '../data/companies';

export function Microinsurance() {
  return <CompanyPage company={microinsurance} productColumns={3} />;
}
