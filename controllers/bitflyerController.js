const axios = require('axios')
const { formatTicker, formatTrades, formatDepth } = require('../helpers/bitflyer')

module.exports = {
  getTicker(req, res) {
    axios
      .get('https://api.bitflyer.com/v1/ticker')
      .then(({ data: ticker }) => {
        res.status(200).json(formatTicker(ticker))
      })
      .catch(error => {
        res.status(500).json({ error: error.message })
      })
  },

  getTrades(req, res) {
    axios
      .get('https://api.bitflyer.com/v1/executions')
      .then(({ data: trades }) => {
        res.status(200).json(formatTrades(trades))
      })
      .catch(error => {
        res.status(500).json({ error: error.message })
      })
  },

  getDepth(req, res) {
    axios
      .get('https://api.bitflyer.com/v1/board')
      .then(({ data: depth }) => {
        res.status(200).json(formatDepth(depth))
      })
      .catch(error => {
        res.status(500).json({ error: error.message })
      })
  }
}