var express = require('express');
var router = express.Router();

/* GET all jobs. */
router.get('/jobs', function(req, res) {
	var db = req.db;
	var collection = db.get('jobcollection');
	collection.find({}, {}, function(err, docs) {
		console.log(docs);
		res.json(docs);
	});
  
});

/* GET a specific jobs. */
router.get('/jobs/:job_id', function(req, res) {
	var _id = req.params.job_id; 
	var	db = req.db; 
	var	collection = db.get('jobcollection');

	collection.findById(_id, function(err, doc) {
		console.log(doc);
		res.json(doc);
	});

});

module.exports = router;
