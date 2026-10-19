export function formatKes(value: number): string {
  const safe = Number.isFinite(value) && value > 0 ? value : 0;
  const [whole, cents] = safe.toFixed(2).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `KES ${grouped}.${cents}`;
}

export function formatShortKes(value: number): string {
  return `KES ${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function monthlyRepayment(
price: number,
deposit: number,
balloonPct: number,
annualRate: number,
months: number)
: number {
  const principal = price - deposit;
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRate / 100 / 12;
  const balloon = price * (balloonPct / 100);
  if (r === 0) return (principal - balloon) / months;
  const factor = Math.pow(1 + r, months);
  return (principal - balloon / factor) * r / (1 - 1 / factor);
}