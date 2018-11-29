const   express = require('express'),
        router = express.Router(),
        CoinBaseController = require('../controllers/coinbaseController.js');

router.get('/btc/ticker', CoinBaseController.btcTicker);
router.get('/btc/trades', CoinBaseController.btcTrades);
router.get('/btc/depth', CoinBaseController.btcDepth);

module.exports= router;

