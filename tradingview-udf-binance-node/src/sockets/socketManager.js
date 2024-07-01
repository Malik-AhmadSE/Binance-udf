
const { fetchTickers } = require('../services/binanceService');
let allTickers = [];
let symbolSet = new Set();

const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A client connected');
    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });
  });
  setInterval(async () => {
    try {
      const tickers = await fetchTickers();
      allTickers = tickers;
      symbolSet = new Set(allTickers.map(ticker => ticker.Name));
      io.emit('tickers', allTickers);
      console.log("Triggered update");
    } catch (error) {
      console.error('Error fetching or processing tickers:', error);
    }
  }, 5000);
};

module.exports = {
  initSocket
};
