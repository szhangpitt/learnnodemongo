var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Jobssss' });
});

router.get('/about', function(req, res) {
	res.render('index', {title: 'About'});
});



module.exports = router;
