const { request } = require('graphql-request');

const startServer = require('../src/app');

jest.mock('../src/utils');
const utils = require('../src/utils');


describe('CalculatePrice Query: ', () => {
  const usdRate = 100.23;
  let url, app;

  beforeAll(async () => {
    utils.fetchCurrentBitcoinPrice.mockResolvedValue(usdRate);

    app = await startServer();
    const { port } = (app.address());
    url = `http://127.0.0.1:${port}`;
  });

  afterAll((done) => {
    app.close(done);
  });

  test('should subtract the margin from the btcPrice before converting when the type = sell', async () => {
    const margin = 0.2;
    const exchangeRate = 345.02
    const query = `
    {
      calculatePrice(type: sell, margin: ${margin}, exchangeRate: ${exchangeRate})
    }
    `;
    const { calculatePrice } = await request(url, query);

    const expectedPrice = (usdRate - (margin / 100)) * exchangeRate;
    expect(calculatePrice).toEqual(`NGN ${expectedPrice.toFixed(2)}`);
  });

  test('should add the margin to the btcPrice before converting when the type = buy', async () => {
    const margin = 0.2;
    const exchangeRate = 345.02
    const query = `
    {
      calculatePrice(type: buy, margin: ${margin}, exchangeRate: ${exchangeRate})
    }
    `;
    const { calculatePrice } = await request(url, query);

    const expectedPrice = (usdRate + (margin / 100)) * exchangeRate;
    expect(calculatePrice).toEqual(`NGN ${expectedPrice.toFixed(2)}`);
  });
});
