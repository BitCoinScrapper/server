var express = require('express');
var router = express.Router();
const { ticker, trades, depth } = require('../controllers/bitstampController')

router.get('/btc/ticker', ticker)
router.get('/btc/trades', trades)
router.get('/btc/depth', depth)


module.exports = router;
