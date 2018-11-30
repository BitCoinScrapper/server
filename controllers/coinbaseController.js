const request= require('request');

class coinbaseController{
  static btcTicker(req, res){
	var options = {
	  url: 'https://api.pro.coinbase.com/products/BTC-USD/ticker',
	  headers: {
		'User-Agent': 'request'
	  }
	};
 
	function callback(error, response, body) {
	  if (!error && response.statusCode == 200) {
		let info = JSON.parse(body);
		console.log(info);
		let tickerObj={
		  last:Number(info.price),
		  buy: Number(info.bid),
		  sell: Number(info.ask),
		  vol_btc: Number(info.volume),
		  server_time: new Date(info.time).getTime()
		}
		res.status(200).json(tickerObj)
	  }
	}
 
	request.get(options, callback);
  }

  static btcTrades(req, res){
    
	var options = {
	  url: 'https://api.pro.coinbase.com/products/BTC-USD/trades',
	  headers: {
		'User-Agent': 'request'
	  }
	};
 
	function callback(error, response, body) {
	  if (!error && response.statusCode == 200) {
		var info = JSON.parse(body);
		console.log(info.length);
		let tradesArr=[]
		for (let i=0; i<info.length; i++){
		  let tradesObj={
		    date: new Date(info[i].time).getTime(),
		    price: Number(info[i].price),
		    amount: Number(info[i].size),
		    tid: Number(info[i].trade_id),
		    type: info[i].side
		  }
		  tradesArr.push(tradesObj)
		}
		res.status(200).json(tradesArr)
	  }
	}
 
	request.get(options, callback);
  }

  static btcDepth(req, res){
    
	var options = {
	  url: 'https://api.pro.coinbase.com/products/BTC-USD/book?level=2',
	  headers: {
		'User-Agent': 'request'
	  }
	};
 
	function callback(error, response, body) {
	  if (!error && response.statusCode == 200) {
		var info = JSON.parse(body);
		console.log(info);
		let resultObj={}
		let buyArr=[]
		let sellArr=[]
		for (let i=0; i< info.bids.length; i++){
			let buy={
				price: Number(info.bids[i][0]),
				size: Number(info.bids[i][1])
			}
			buyArr.push(buy)
		}
		resultObj.buy=buyArr
                for (let i=0; i< info.asks.length; i++){
                        let sell={
                                price: Number(info.bids[i][0]),
                                size: Number(info.bids[i][1])
                        }
                        sellArr.push(sell)
                }
		resultObj.sell=sellArr
		
		res.status(200).json(resultObj)
	  }
	}
 
	request.get(options, callback);
  }
}

module.exports = coinbaseController;

