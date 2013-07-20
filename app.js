var mongo = require('mongodb');
var express = require('express');
var monk = require('monk');
var db = monk("mongodb://admin:admin@widmore.mongohq.com:10000/restapp");
var app = new express();
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	//listDatabases op is NOT allowed for remote mongohq. 
	
	// db.driver.admin.listDatabases(function(e,dbs) {
	// 	console.dir(dbs);
	// 	res.json(dbs);
	// });
});
app.get('/collections', function(req, res) {
	db.driver.collectionNames(function(e, names) {
		res.json(names);
	})
});
app.get('/collections/:name', function(req, res) {
	var collection = db.get(req.params.name);
	collection.find({}, {
		limit: 20
	}, function(e, docs) {
		res.json(docs);
	})
});
app.listen(3000);