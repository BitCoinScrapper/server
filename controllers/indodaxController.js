const axios = require('axios')


class IndodaxController {
    static ticker(req, res) {
        axios({
            method: 'GET',
            url: 'https://indodax.com/api/btc_idr/ticker'
        })
            .then( response => {
                let ticker = response.data.ticker
                res.status(200).json({
                    last: Number(ticker.last),
                    buy: Number(ticker.buy),
                    sell: Number(ticker.sell),
                    vol_btc: Number(ticker.vol_btc),
                    server_time: ticker.server_time
                })
            })
            .catch( err => {
                res.status(500).json({
                    error: error.message
                })
            })
    }

    static trades(req, res) {
        axios({
            method: 'GET',
            url: 'https://indodax.com/api/btc_idr/trades'
        })
            .then( response => {
                let newTrades = response.data.map( obj => {
                    let newObj = {}
                    newObj.date = Number(obj.date) * 1000
                    newObj.price = Number(obj.price)
                    newObj.amount = Number(obj.amount)
                    newObj.tid = Number(obj.tid)
                    newObj.type = obj.type
                    return newObj
                })
                res.status(200).json(newTrades)
            })
            .catch( err => {
                res.status(500).json({
                    error: err.message
                })
            })
    }

    static depth(req, res) {
        axios({
            method: 'GET',
            url: 'https://indodax.com/api/btc_idr/depth'
        })
            .then( response => {
                let newBuy = response.data.buy.map( item => {
                    return {
                        price: item[0],
                        size: Number(item[1])
                    }
                })

                let newSell = response.data.sell.map( item => {
                    return {
                        price: item[0],
                        size: Number(item[1])
                    }
                })

                res.status(200).json({
                    buy: newBuy,
                    sell: newSell
                })
            })
            .catch( err => {
                res.status(500).json({
                    error: error.message
                })
            })
    }
}


module.exports = IndodaxController