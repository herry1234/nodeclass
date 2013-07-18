var util = require('util');
var mongodb = require ('mongodb');
var Db = mongodb.Db;
var Connection = mongodb.Connection;
var Server = mongodb.Server;
var host = '127.0.0.1';
var port = 27017;
var db = new Db('test', new Server(host, port, {safe:false}));
db.open(function(e, c) {
	//do something with the database here
	//console.log (util.inspect(db));
	console.log(db._state);
	db.close();
});