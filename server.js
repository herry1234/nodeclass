var http = require('http');
var port = process.env.PORT || 1337;
var MONGOHQ_URL = 'mongodb://admin:admin@ds061747.mongolab.com:61747/herryassets';
var mongodb = require('mongodb');
var Db = mongodb.Db;
var Connection = mongodb.Connection;
var Server = mongodb.Server;
var dbConnUrl = MONGOHQ_URL;
var dbHost = url.parse(dbConnUrl).hostname;
var dbPort = new Number(url.parse(dbConnUrl).port);
console.log(dbHost + dbPort);
var db = new Db('test', new Server(dbHost, dbPort, {}));
db.open(function(e, c) {
	// console.log (util.inspect(db));
	// creates server
	var server = http.createServer(function(req, res) {
		//sets the right header and status code
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		//outputs string with line end symbol
		res.end("MongoDB connected: " + db._state);
	});
	//sets port and IP address of the server
	server.listen(port, function() {
		console.log(
			'Server is running at %s:%s ',
			server.address().address,
			server.address().port);
	});
	db.close();
});
