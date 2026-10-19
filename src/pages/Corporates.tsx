import React from 'react';
import { SegmentLanding } from '../components/segments/SegmentLanding';
import { corporatesPage } from '../data/segments';

export function Corporates() {
  return <SegmentLanding data={corporatesPage} />;
}
