import { useMemo, useState } from 'react';
import { investmentProducts, amountOptions, horizonOptions, accessOptions } from '../data/investments';

export type AdvancedFilters = {risk: string;type: string;currency: string;features: string[];};

const emptyAdvanced: AdvancedFilters = { risk: '', type: '', currency: '', features: [] };

export function useFundFilters() {
  const [amount, setAmount] = useState(amountOptions[1].label);
  const [horizon, setHorizon] = useState(horizonOptions[2].label);
  const [access, setAccess] = useState(accessOptions[1].label);
  const [advanced, setAdvanced] = useState<AdvancedFilters>(emptyAdvanced);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const results = useMemo(() => {
    const a = amountOptions.find((o) => o.label === amount);
    const h = horizonOptions.find((o) => o.label === horizon);
    const ac = accessOptions.find((o) => o.label === access);
    return investmentProducts.filter(
      (p) =>
      (!a || p.minKes <= a.max) && (
      !h || p.horizonYears <= h.years) && (
      !ac || ac.access.length === 0 || ac.access.includes(p.access)) && (
      !advanced.risk || p.risk === advanced.risk) && (
      !advanced.type || p.type === advanced.type) && (
      !advanced.currency || p.currency === advanced.currency) &&
      advanced.features.every((f) => p.features.includes(f))
    );
  }, [amount, horizon, access, advanced]);

  const advancedCount =
  (advanced.risk ? 1 : 0) + (advanced.type ? 1 : 0) + (advanced.currency ? 1 : 0) + advanced.features.length;

  const toggleCompare = (id: string) =>
  setCompareIds((ids) => ids.includes(id) ? ids.filter((x) => x !== id) : ids.length >= 3 ? ids : [...ids, id]);

  return {
    amount, setAmount, horizon, setHorizon, access, setAccess,
    advanced, setAdvanced, clearAdvanced: () => setAdvanced(emptyAdvanced), advancedCount,
    results, compareIds, setCompareIds, toggleCompare
  };
}
