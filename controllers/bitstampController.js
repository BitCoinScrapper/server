const axios = require('axios')
const request = require('request')
const cheerio = require('cheerio') 

function getNumbers(inputString){
    var regex=/\d+\.\d+|\.\d+|\d+/g, 
        results = [],
        n;
  
    while(n = regex.exec(inputString)) {
        results.push(parseFloat(n[0]));
    }
  
    return results
}

module.exports = {
    scrapper : (req, response) => {
        let url = 'https://www.coindesk.com/';
        request(url, function (err, res, body) {
          if (err && res.statusCode !== 200) throw err;
          let $ = cheerio.load(body)
          let news = $('a.feature')
          let key = Object.keys(news).join(',')
          let valid_Key = getNumbers(key)
          
          let news_data = valid_Key.map(key => {
            let data = news[String(key)]
            return {
              img: data.children[3].children[1].attribs.src,
              link : data.attribs.href,
              title : data.attribs.title
            }
          })
         response.status(200).json( news_data )
         
        });
    },
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
                    date : Number(datum.date)*1000,
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