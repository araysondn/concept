import React from 'react';
import { ProductPage } from '../components/product/ProductPage';
import { ClaimStarter } from '../components/claims/ClaimStarter';
import { ClaimsExtra } from '../components/claims/ClaimsExtra';
import { claimsPage } from '../data/claims';

export function Claims() {
  return <ProductPage data={claimsPage} calculator={<ClaimStarter />} extra={<ClaimsExtra />} />;
}
