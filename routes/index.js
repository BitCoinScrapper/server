var express = require('express');
var router = express.Router();
const bitflyerRouter = require('./bitflyer')

router.use('/bitflyer', bitflyerRouter)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
