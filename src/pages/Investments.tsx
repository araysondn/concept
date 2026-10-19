import React from 'react';
import { ProductPage } from '../components/product/ProductPage';
import { InvestmentCalculator } from '../components/investments/InvestmentCalculator';
import { FundExplorer } from '../components/investments/FundExplorer';
import { investmentsPage } from '../data/investments';

export function Investments() {
  return <ProductPage data={investmentsPage} calculator={<InvestmentCalculator />} extra={<FundExplorer />} />;
}
