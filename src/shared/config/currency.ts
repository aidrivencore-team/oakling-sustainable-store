export type Currency = 'GBP' | 'EUR';

export const currencies: Record<Currency, { symbol: string; code: string; rate: number }> = {
  GBP: { symbol: '£', code: 'GBP', rate: 1 },
  EUR: { symbol: '€', code: 'EUR', rate: 1.17 },
};

export const defaultCurrency: Currency = 'GBP';

export function formatPrice(priceInGBP: number, currency: Currency = defaultCurrency): string {
  const { symbol, rate } = currencies[currency];
  const convertedPrice = priceInGBP * rate;
  return `${symbol}${convertedPrice.toFixed(2)}`;
}
