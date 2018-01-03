var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var crypto = require('crypto');
var salt  = "0a826b911644afd93bc23858c13e53";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('difficult');
});

router.post('/', function(req, res, next) {
	var checksum = crypto.createHash('md5').update(req.body.car + req.body.price + salt).digest("hex");
	console.log(checksum);
	if (checksum == req.body.checksum){
		console.log("valid checksum");
		if (req.body.car == 'audi' && req.body.price =='10000'){
			res.send({ status: 'success', message: 'Nice Job!!'});
		}else{
			res.send({ status: 'failure', message: 'Did you even do anything?'});
		}
	}else{
		res.send({ status: 'failure', message: 'Bad Checkcum yo!!'});
	}  

});

module.exports = router;
