var express = require('express');
var router = express.Router();
var Email = require('email');

/* GET home page. */
router.get('/', function(req, res) {


	res.render('index', { title: 'Jobssss' });


});

router.get('/form', function(req, res) {
	res.render('form', {title: 'Form', path: '/form'});
});

router.get('/about', function(req, res) {
	console.log(Email);
	var myMsg = new Email({ from: "me@example.com" , to:   "szhangpitt@gmail.com" , subject: "Knock knock..." , body: "Who's there?"});

	myMsg.send(function(err) {
		console.log(err);
	});
	
	res.render('index', {title: 'About'});
});



module.exports = router;
