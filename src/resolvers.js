const { fetchCurrentBitcoinPrice } = require('./utils');

module.exports = {
  Query: {
    calculatePrice: async (_, args, __) => {
      const { type, margin, exchangeRate } = args;
      const btcCurrentPrice = await fetchCurrentBitcoinPrice();

      const computedMarginValue = (margin / 100);

      const finalBtcPrice = type === 'sell' ? (btcCurrentPrice - computedMarginValue) : (btcCurrentPrice + computedMarginValue)
      const btcInNaira = (finalBtcPrice * exchangeRate).toFixed(2);
      return `NGN ${btcInNaira}`;
    }
  }
}