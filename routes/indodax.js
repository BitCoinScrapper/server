const express = require('express');
const router = express.Router();
const IndodaxController = require('../controllers/indodaxController')


router.get('/btc/ticker', IndodaxController.ticker)
router.get('/btc/trades', IndodaxController.trades)
router.get('/btc/depth', IndodaxController.depth)

module.exports = router;


