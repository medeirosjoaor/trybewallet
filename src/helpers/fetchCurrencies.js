export default async function fetchCurrencies() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const object = await response.json();

  return object;
}
