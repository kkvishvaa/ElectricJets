// Dummy price estimation formula
function estimatePrice(distance, jetType) {
  // Simple formula: base + per mile + jet type multiplier
  const base = 5000;
  const perMile = 10;
  const typeMultiplier = jetType === 'Ultra Long Range' ? 2 : jetType === 'Midsize' ? 1.2 : 1;
  return Math.round(base + distance * perMile * typeMultiplier);
}

export default estimatePrice;
