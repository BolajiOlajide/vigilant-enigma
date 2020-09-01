const fetch = require('node-fetch');

const { fetchCurrentBitcoinPrice } = require('../src/utils');
const { COINDESK_URL } = require('../src/config');


jest.mock('node-fetch', () => jest.fn());
const usdRate = 345.203;

beforeAll(() => {
  fetch.mockImplementationOnce(()=> Promise.resolve({
    ok: true,
    status: 200,
    json: () => ({ bpi: { USD: { rate_float: usdRate } } })
  }))
});

test('should return the rate_float field from COINDESK api', async () => {
  const result = await fetchCurrentBitcoinPrice();

  expect(result).toEqual(usdRate);
  expect(fetch).toHaveBeenCalledWith(COINDESK_URL);
});