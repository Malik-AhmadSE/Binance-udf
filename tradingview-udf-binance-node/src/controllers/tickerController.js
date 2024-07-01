
const express = require('express');
const { fetchTickers } = require('../services/binanceService');

const tickerRouter = express.Router();

tickerRouter.get('/tickers', async (req, res) => {
  try {
    const tickers = await fetchTickers();
    res.json(tickers);
  } catch (error) {
    console.error('Error fetching tickers:', error);
    res.status(500).json({ error: 'Failed to fetch tickers' });
  }
});

module.exports = {
  tickerRouter
};
