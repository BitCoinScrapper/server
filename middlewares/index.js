const 	jwt = require('jsonwebtoken'),
	User = require('../models/user.js'),
	Task = require('../models/task.js');

class Middleware{
  static authentication(req, res, next){
    let token = req.headers.jtoken
    jwt.verify(token,'thisisoursecret',(err, result)=>{
      if(err){
        console.log(err)
	res.status(500).json({error:"Something wrong, please contact developer!"})
      } else {
	  req.decode = result
	  User.findById(req.decode.id)
	      .then(result => {
	        if (result){
		  next()
		} else {
		  res.status(500).json({error:"Something wrong, please contact developer!"})
		}
	      })
	      .catch(error => {
		console.log(error)
	        res.status(500).json({error:"Something wrong, please contact developer!"})
	      })
      };
    });
  }


};

module.exports = Middleware;
