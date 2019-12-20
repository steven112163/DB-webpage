/**
 * @file A simple Node.js file for handling queries
 * @author Yu-Hsun Yuan <steven112163@gmail.com>
 */


var http = require('http');
var url = require('url');


http.createServer(function (req, res) {
    let q = url.parse(req.url, true).query;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(q.query);
}).listen(8080);