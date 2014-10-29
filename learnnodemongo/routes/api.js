var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');

router.post('/upload', function(req, res) {
	var form = new formidable.IncomingForm({uploadDir: global.appRoot + '/uploaded', keepExtensions: true });

	form.parse(req, function(err, fields, files) {
		/*if(fields.fromPage) {
			res.redirect(fields.fromPage)
		}
		else */{
			res.writeHead(200, {'content-type': 'text/plain'});
			res.write('received upload: \n\n');
			res.end(util.inspect({err: err, fields: fields, files: files}));
		}
		
	});

	return;
});


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

router.post('/loginout', function(req, res) {
	res.json(
	{
		status: "pass", 
		realname:"testUserName", 
		userid: "testUserID"
	});
});

router.post('/fi/submithit', function(req, res) {
	res.json({status: 'pass'});
});


router.post('/fi/gethit', function(req, res) {
	var task = {
		status: "pass",
		atid: "task-0",
		userstat: {
			taskcount_submitted: 15,
			facecount_submitted: 160
		},
		td: {
			name: "谢霆锋",
			imgsPerPage: 9,
			imgs: [
			{
				id: "img-0",
				url: "data/faces/1.jpg"
			},
			{
				id: "img-1",
				url: "data/faces/2.jpg"
			},
			{
				id: "img-2",
				url: "data/faces/13.jpg"
			},
			{
				id: "img-3",
				url: "data/faces/4.jpg"
			},
			{
				id: "img-4",
				url: "data/faces/5.jpg"
			},
			{
				id: "img-5",
				url: "data/faces/16.jpg"
			},
			{
				id: "img-6",
				url: "data/faces/7.jpg"
			},
			{
				id: "img-7",
				url: "data/faces/8.jpg"
			},
			{
				id: "img-8",
				url: "data/faces/9.jpg"
			},
			{
				id: "img-9",
				url: "data/faces/10.jpg"
			},
			{
				id: "img-10",
				url: "data/faces/11.jpg"
			},
			{
				id: "img-11",
				url: "data/faces/12.jpg"
			},
			{
				id: "img-12",
				url: "data/faces/3.jpg"
			},
			{
				id: "img-13",
				url: "data/faces/14.jpg"
			},
			{
				id: "img-14",
				url: "data/faces/15.jpg"
			},
			{
				id: "img-15",
				url: "data/faces/16.jpg"
			},
			{
				id: "img-16",
				url: "data/faces/17.jpg"
			},
			{
				id: "img-17",
				url: "data/faces/18.jpg"
			},
			{
				id: "img-18",
				url: "data/faces/19.jpg"
			},
			{
				id: "img-19",
				url: "data/faces/10.jpg"
			}
			]
		},
		result: {
			wronglist: [
			"img-3",
			"img-7"
			]
		}
	};

	res.json(task);
});


router.post('/ft/submithit', function(req, res) {
	
	if(typeof req.session.imgIndex === 'undefined') {
		req.session.imgIndex = Math.floor(Math.random() * 20);
	}
	else {
		req.session.imgIndex = (req.session.imgIndex + 1) % 15;
	}
	console.log(req.session);
	
	console.log('session.imgIndex = ' + req.session.imgIndex);
	res.json({status: 'pass', imgIndex: req.session.imgIndex});
});

router.post('/ft/gethit', function(req, res) {
	console.log(req.session);
	
	if(typeof req.session.imgIndex === 'undefined') {
		req.session.imgIndex = Math.floor(Math.random() * 20);
	}
	else {
		req.session.imgIndex = (req.session.imgIndex + 1) % 15; 
	}

	
	var task = {
		atid: "543ea6d21d41c820212aca11",
		__imgIndex:  req.session.imgIndex,   
		status: "pass", 
		td: {
			img: {
				id: "543ea0b21d41c822e6785a65",   
				imsize: {
					height: 684,   
					width: 500     
				}, 
				relrect: {
					h: Math.random(),   
					w: Math.random(),                           
					x: Math.random(),                           
					y: Math.random()     
				}, 
				url: "data/faces/" + req.session.imgIndex + ".jpg"
			}, 
			name: "\u8521\u4f9d\u6797"    
		}, 
		userstat: {
			img_submitted: 131          
		}
	}

	res.json(task);
});


module.exports = router;
