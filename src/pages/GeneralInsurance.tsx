import React from 'react';
import { CompanyPage } from '../components/company/CompanyPage';
import { generalInsurance } from '../data/companies';

export function GeneralInsurance() {
  return <CompanyPage company={generalInsurance} />;
}
