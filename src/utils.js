const fetch = require('node-fetch');

const { COINDESK_URL } = require('./config');

const fetchCurrentBitcoinPrice = async () => {
  try {
    const response = await fetch(COINDESK_URL);
    const result = await response.json();
    return result.bpi.USD.rate_float
  } catch (error) {
    console.log(error.message);
    return Promise.reject('The Coindesk API cannot be reached. Please try again.')
  }
};

module.exports = { fetchCurrentBitcoinPrice };