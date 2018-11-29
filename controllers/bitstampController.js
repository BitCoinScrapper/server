const axios = require('axios')

module.exports = {
    ticker: (req, res) =>{
        axios({
            method : 'GET',
            url : 'https://www.bitstamp.net/api/ticker/'
        })
        .then( ({ data }) => {
            let ticker =  {
                    last : Number(data.last),
                    buy : Number(data.bid),
                    sell : Number(data.ask),
                    vol_btc : Number(data.volume),
                    server_time : Number(data.timestamp)
                }
            res.status(200).json( ticker )
        })
        .catch( error => {
            res.status(500).json( {error : error.message } )
        })
    },
    trades : (req, res) => {
        axios({
            method : 'GET',
            url : 'https://www.bitstamp.net/api/transactions/'    
        })
        .then(({ data }) => {
            let transactions = data.map(datum => {
                return {
                    date : Number(datum.date),
                    price : Number(datum.tid),
                    amount : Number(datum.amount),
                    tid : Number(datum.tid),
                    type : datum.type === 0 ? "buy" : "sell"
                }
            })
            res.status(200).json( transactions )
        })
        .catch( error => {
            res.status(500).json( {error : error.message })
        })
    },
    depth : (req, res) => {
        axios({
            method : 'GET',
            url : 'https://www.bitstamp.net/api/order_book/'
        })
        .then( ({ data }) => {
            let depth = {
                buy : data.bids.map(bid => {
                    return {
                        price : Number(bid[0]),
                        size : Number(bid[1])
                    }
                }),
                sell : data.asks.map(ask =>{
                    return {
                        price : Number(ask[0]),
                        size : Number(ask[1])
                    }
                })
            }
            res.status(200).json( depth )
        })
        .catch( error => {
            res.status(500).json( {error : error.message })
        })
    }
}