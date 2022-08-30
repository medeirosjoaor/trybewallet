export default function sum(array) {
  return array
    .reduce((previous, {
      value,
      currency,
      exchangeRates,
    }) => previous + value * exchangeRates[currency].ask, 0).toFixed(2);
}
