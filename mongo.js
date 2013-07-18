// var util = require('util'),
// 	mongodb = require('mongodb');
// var Db = mongodb.Db;
// var Connection = mongodb.Connection;
// var Server = mongodb.Server;
// var host = process.env.MONGO_DE_HOST;
// var port = parseInt(process.env.MONGO_DE_PORT)
// var db = new Db(process.env.MONGO_DE_DB, new Server(host, port, {
// 	safe: false
// }));
// db.open(function(e, c) {
// 	console.log(db._state);
// 	db.close();
// });

//var MONGOHQ_URL = 'mongodb://admin:admin@ds061747.mongolab.com:61747/herryassets';
var MONGOHQ_URL = "mongodb://admin:admin@widmore.mongohq.com:10000/restapp"
var mongodb = require('mongodb');
var url = require('url');
var log = console.log;
var connectionUri = url.parse(MONGOHQ_URL);
var dbName = connectionUri.pathname.replace(/^\//, '');
mongodb.Db.connect(MONGOHQ_URL, function(error, client) {
	if (error) throw error;
	client.collectionNames(function(error, names) {
		if (error) throw error;
		//output all collection names
		log("Collections");
		log("===========");
		var lastCollection = null;
		names.forEach(function(colData) {
			var colName = colData.name.replace(dbName + ".", '') ;
			log(colName);
			lastCollection = colName;
		});
		var collection = new mongodb.Collection(client, lastCollection);
		log("\nDocuments in " + lastCollection);
		var documents = collection.find({}, {
			limit: 5
		});
		//output a count of all documents found
		documents.count(function(error, count) {
			log(" " + count + " documents(s) found");
			log("====================");
			// output the first 5 documents
			documents.toArray(function(error, docs) {
				if (error) throw error;
				docs.forEach(function(doc) {
					log(doc);
				});
				// close the connection
				client.close();
			});
		});
	});
});

