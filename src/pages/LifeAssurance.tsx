import React from 'react';
import { CompanyPage } from '../components/company/CompanyPage';
import { lifeAssurance } from '../data/companies';

export function LifeAssurance() {
  return <CompanyPage company={lifeAssurance} />;
}
