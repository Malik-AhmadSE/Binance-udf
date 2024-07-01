// services/binanceService.js
const axios = require('axios');

const priorityList = ['BNBUSDT', 'BTCUSDT', 'ETHUSDT', 'SOLUSDT'];

const fetchTickers = async () => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
    const tickers = response.data;

    const filteredTickers = tickers.filter(ticker => (
      parseFloat(ticker.lastPrice) !== 0 &&
      parseFloat(ticker.priceChangePercent) !== 0 &&
      parseFloat(ticker.volume) !== 0
    ));

    const sortedTickers = filteredTickers.sort((a, b) => {
      const aPriority = priorityList.indexOf(a.symbol);
      const bPriority = priorityList.indexOf(b.symbol);
      if (aPriority === -1 && bPriority === -1) {
        return 0;
      }
      if (aPriority === -1) {
        return 1;
      }
      if (bPriority === -1) {
        return -1;
      }
      return aPriority - bPriority;
    });

    const tickerObjects = sortedTickers.map(ticker => ({
      Name: ticker.symbol,
      Price: ticker.lastPrice,
      Change: ticker.priceChangePercent,
      Volume: ticker.volume
    }));

    return tickerObjects;
  } catch (error) {
    console.error('Error fetching or processing tickers:', error);
    throw error;
  }
};

module.exports = {
  fetchTickers
};
