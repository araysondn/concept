import React from 'react';
import { SegmentLanding } from '../components/segments/SegmentLanding';
import { cooperativesPage } from '../data/segments';

export function Cooperatives() {
  return <SegmentLanding data={cooperativesPage} />;
}
