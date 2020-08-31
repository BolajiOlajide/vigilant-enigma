require('dotenv').config();


exports.PORT = process.env.PORT || 5000;
exports.COINDESK_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';