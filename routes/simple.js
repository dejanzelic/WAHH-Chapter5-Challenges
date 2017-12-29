var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('simple');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	var valid_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 	if(valid_email.test(req.body.email)){
 		res.send({ status: 'failure', message: 'Thats just an email though!'});
 	}else{
 		res.send({ status: 'success', message: 'Nice Job!!'});
 	}
  

});

module.exports = router;
