var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const coinbaseRouter = require('./routes/coinbase.js');
var indodaxRouter = require('./routes/indodax');
var bitstampRouter = require('./routes/bitstamp');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BitCoinScraping', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`mongoose connected!`)
});

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/coinbase', coinbaseRouter);
app.use('/indodax', indodaxRouter);
app.use('/bitstamp', bitstampRouter)


module.exports = app;
