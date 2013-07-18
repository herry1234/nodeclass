/*
This file is the 'My' solotion for stream-adventure.
https://github.com/substack/stream-adventure

*/

//#1 Beep
//console.log("beep boop");


//#2 pipline
// var fs = require('fs');
//     fs.createReadStream(process.argv[2]).pipe(process.stdout);

//#3
//     var fs = require('fs');
//     process.stdin.pipe(process.stdout);


//#4
// var through = require('through');
// var tr = through(write, end);
// //tr.write('beep\n');
// //tr.write('boop\n');
// //tr.end();
// process.stdin.pipe(tr).pipe(process.stdout);
// function write (buf) {

// 	var output = buf.toString().toUpperCase();
//     this.queue(output);

//   }
// function end () { 
//     this.queue(null);
// 	//console.log('__END__') 
// }

// #5
// var through = require('through');

// var split = require('split');
// var line_number = 0;
// process.stdin
//     .pipe(split())
//     .pipe(through(function (line) {

//          //console.log(line_number);
//         if(line_number % 2 == 1) {
//                 var output = line.toString().toUpperCase();
//                 output += '\n';
//                 this.queue(output);

//         };
//         if(line_number % 2 == 0) {
//                 var output = line.toString().toLowerCase();
//                 output += '\n';
//                 this.queue(output);

//         }
//         line_number ++;
//         //console.dir(line.toString());

//     })).pipe(process.stdout);
// ;

//#6

// var concat = require('concat-stream');
// process.stdin.pipe(concat(function(data) {
//     //data.pipe(process.stdout);
//     var text = data.toString();
//     var output = text.split("").reverse().join("");
//     console.log(output);
// }));


//#7
// var through = require('through');


//    function write (buf) { 
//        var output = buf.toString().toUpperCase();
//        this.queue(output) 
//    }
//    function end () {
//     this.queue(null)
// }

//   var http = require('http');
//    var fs = require('fs');
//    var server = http.createServer(function (req, res) {
//        if (req.method === 'POST') {
//            req.pipe(through(write, end)).pipe(res);
//        }
//    });
//    server.listen(8000);


//#8
// var request = require('request');
// var r = request.post('http://127.0.0.1:8000/');

// process.stdin.pipe(r).pipe(process.stdout);


//#9


// var ws = require('websocket-stream');
// var stream = ws('ws://localhost:8000');
// stream.on('data', function () {
//     console.log("data");
// })
// stream.on('error', function () {
//     console.log("error");
// })
// stream.on('end', function () {
//     console.log("end");
// })
// stream.end('hello\n');


//#10

// var trumpet = require('trumpet');
//     var tr = trumpet();

//     var stream = tr.select('.loud').createStream();
//      var through = require('through');


//     function write (buf) { 
//         var output = buf.toString().toUpperCase();
//         this.queue(output);
//     }
//     function end () {
//      this.queue(null);
//  }
//  stream.pipe(through(write,end)).pipe(stream);

//  process.stdin.pipe(tr).pipe(process.stdout);


//#11

// var crypto = require('crypto');
// var stream = crypto.createDecipher('aes256', process.argv[2]);
// process.stdin.pipe(stream).pipe(process.stdout);


//#12


/*
It is a stream that is both readable and writable. 
The written data is used to compute the hash. 
Once the writable side of the stream is ended, 
use the read() method to get the computed hash digest. 
The legacy update and digest methods are also supported.

*/
var zlib = require('zlib');
var zs = zlib.createGunzip();
var crypto = require('crypto');
var through = require('through');

var cs = crypto.createDecipher(process.argv[2], process.argv[3]);

var tar = require('tar');
var parser = tar.Parse();
parser.on('entry', function(e) {
    if (e.type !== 'File') return;
    var os = crypto.createHash('md5', {
        encoding: 'hex'
    });
    e.pipe(os).pipe(through(null, function() {
        var output = ' ' + e.path + '\n';
        this.queue(output);

    })).pipe(process.stdout);

});
process.stdin.pipe(cs).pipe(zs).pipe(parser);