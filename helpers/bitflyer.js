module.exports = {
  formatTicker(ticker) {
    // format
    // {
    //   "product_code": "BTC_JPY",
    //   "timestamp": "2018-11-29T13:10:34.933",
    //   "tick_id": 11176199,
    //   "best_bid": 481902,
    //   "best_ask": 482451,
    //   "best_bid_size": 0.07,
    //   "best_ask_size": 0.25,
    //   "total_bid_depth": 2279.23108557,
    //   "total_ask_depth": 1731.48879227,
    //   "ltp": 482452,
    //   "volume": 781160.86840094,
    //   "volume_by_product": 19870.75236011
    // }

    // convert to
    // {
    //   vol_btc: "496.54020510",
    //   last: "62270000",
    //   buy: "62220000",
    //   sell: "62269000",
    //   server_time: 1543488746
    // }

    return {
      vol_btc: ticker.volume,
      last: ticker.ltp,
      buy: ticker.best_bid,
      sell: ticker.best_ask,
      server_time: new Date(ticker.timestamp).getTime()
    }

  },

  formatTrades(trades) {
    // format
    // {
    //   "id": 605772040,
    //   "side": "SELL",
    //   "price": 480130,
    //   "size": 0.1,
    //   "exec_date": "2018-11-29T13:12:32.5",
    //   "buy_child_order_acceptance_id": "JRF20181129-131230-450865",
    //   "sell_child_order_acceptance_id": "JRF20181129-131232-975675"
    // }

    // convert to
    // {
    //   date: "1543488746",
    //   price: "62268000",
    //   amount: "0.02300864",
    //   tid: "12256861",
    //   type: "buy"
    // }

    return trades.map(trade => {
      return {
        date: new Date(trade.exec_date).getTime(),
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
