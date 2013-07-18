//nothing
var querystring = require('querystring');

var data = [{
	"name": "John",
	"message": "hi"
}];
exports.getMessages = function(msg) {
	if (msg == null) {
		//console.dir(data);
		console.log(JSON.stringify(data));
		return JSON.stringify(data);
	}
	var q = querystring.parse(msg);
	for (var i = 0; i < data.length; i++) {
		if (q.name == data[i]['name'] && q.message == data[i]['message']) {
			return JSON.stringify(data[i]);
		}
	}
},

exports.addMessage = function(msg) {
	var q = querystring.parse(msg);
	var output = {
		"name": q.name,
		"message": q.message
	}
	data.push(output);
	return JSON.stringify(output);
}