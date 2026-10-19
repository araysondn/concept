import React from 'react';
import { SegmentLanding } from '../components/segments/SegmentLanding';
import { businessPage } from '../data/segments';

export function Business() {
  return <SegmentLanding data={businessPage} />;
}
