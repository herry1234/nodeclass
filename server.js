var http = require('http');
var url = require('url');
var util = require('util');
var mongodb = require('mongodb');
var querystring = require('querystring');
var port = process.env.PORT || 1337;
var MONGOHQ_URL = "mongodb://admin:admin@widmore.mongohq.com:10000/restapp"
//var MONGOHQ_URL = 'mongodb://admin:admin@ds061747.mongolab.com:61747/herryassets';

/*

var Db = mongodb.Db;
var Connection = mongodb.Connection;
var Server = mongodb.Server;
var dbConnUrl = MONGOHQ_URL;
var dbHost = url.parse(dbConnUrl).hostname;
var dbPort = new Number(url.parse(dbConnUrl).port);
console.log(dbHost + " : " + dbPort);
var db = new Db('test', new Server(dbHost, dbPort, {safe:false}));

*/
var connectionUri = url.parse(MONGOHQ_URL);
var dbName = connectionUri.pathname.replace(/^\//, '');
mongodb.Db.connect(MONGOHQ_URL, function(e, client) {
	// console.log (util.inspect(db));
	// creates server
	if(e) throw e;
	var collection = new mongodb.Collection(client,'test_collection');
	var server = http.createServer(function(request, res) {
		if (request.method === "GET" && request.url === "/messages/list.json") {
			collection.find().toArray(function(error, results) {
				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				console.dir(results);
				res.end(JSON.stringify(results));
			});
		};
		if (request.method === "POST" && request.url === "/messages/create.json") {
			request.on('data', function(data) {
				collection.insert(querystring.parse(data.toString('utf-8')), {
						safe: true
					},
					function(error, obj) {
						if (error) throw error;
						res.end(JSON.stringify(obj));
					}
				)
			})
		};


	});
	//sets port and IP address of the server
	server.listen(port, function() {
		console.log(
			'Server is running at %s:%s ',
			server.address().address,
			server.address().port);
	});
	//db.close();
});