module.exports = {
  formatTicker(ticker) {
    return {
      vol_btc: ticker.volume,
      last: ticker.ltp,
      buy: ticker.best_bid,
      sell: ticker.best_ask,
      server_time: (new Date(ticker.timestamp).getTime()) + (1000 * 60 * 60 * 7)
    }

  },

  formatTrades(trades) {
    return trades.map(trade => {
      return {
        date: new Date(trade.exec_date).getTime() + (1000 * 60 * 60 * 7),
        price: trade.price,
        amount: trade.size,
        tid: trade.id,
        type: trade.side.toLowerCase()
      }
    })

  },

  formatDepth(depth) {
    return {
      buy: depth.bids,
      sell: depth.asks
    }
  }
}
