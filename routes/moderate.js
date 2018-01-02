var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('moderate');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
 	if(req.body.is_admin){
 		res.send({ status: 'success', message: 'Nice Job!!'});
 	}else{
 		res.send({ status: 'failure', message: 'Well, you\'ve logged in as a regular user, try as an admin now!'});
 	}
  

});

module.exports = router;
