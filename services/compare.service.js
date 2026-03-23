function normalizePrice(value) {
  if (typeof value === 'number') return value;
  if (!value) return NaN;
  // Remove currency symbols, commas, spaces
  const cleaned = value
    .toString()
    .replace(/[^0-9.]/g, ''); // keep digits and dot
  return parseFloat(cleaned);
}

export function shouldNotify(current, expected) {
  const currentPrice = normalizePrice(current);
  const expectedPrice = normalizePrice(expected);
  if (isNaN(currentPrice) || isNaN(expectedPrice)) {
    console.warn('Invalid price detected:', { current, expected });
    return false;
  }
  return currentPrice <= expectedPrice;
}