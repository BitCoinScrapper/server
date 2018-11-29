var express = require('express');
var router = express.Router();
var bitflyerController = require('../controllers/bitflyerController')

router.get('/:coin/ticker', bitflyerController.getTicker);
router.get('/:coin/trades', bitflyerController.getTrades);
router.get('/:coin/depth', bitflyerController.getDepth);

module.exports = router;
