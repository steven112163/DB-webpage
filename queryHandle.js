/**
 * @file A simple Node.js file for handling queries
 * @author Yu-Hsun Yuan <steven112163@gmail.com>
 */


/**@global Node.js http object for creating server */
const http = require('http');

/**@global Node.js url object for parsing url */
const url = require('url');

/**@global Node.js file system object for getting html file */
const fs = require('fs');

/**@global Node.js SQL object for retrieving data from MySQL */
const mysql = require('mysql');

/**@global Server IP address */
const hostname = "127.0.0.1";

/**@global Server port number */
const port = 8080;

/**@global List of files for web page */
const files = ['/interactionHandle.js', '/mystyle.css', '/bgimg-0.png', '/bgimg-1.png'
    , '/bgimg-2.png', '/bgimg-3.png', '/bgimg-4.png', '/bgimg-5.png'
    , '/bgimg-6.png', '/bgimg-7.png', '/bgimg-8.jpg', '/bgimg-9.png'];


//--------------------------------------------------------
/**
 * Construct database connection
 */
const con = mysql.createConnection({
    host: "localhost",
    user: "webuser",
    password: "!MyPassword123"
});


//--------------------------------------------------------
/**
 * Test database connection
 */
con.connect(function (err) {
    if (err)
        throw err;
    console.log("* Database connected");
});


//--------------------------------------------------------
/**
 * Construct server
 */
const server = http.createServer(function (req, res) {
    let pathName = url.parse(req.url, true).pathname;

    if (pathName == "/") {
        // Pass html to client
        fs.readFile("./index.html", function (err, html) {
            if (err) {
                throw err;
            }

            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });
    } else if (files.indexOf(pathName) >= 0) {
        // Pass other files to client
        fs.readFile("." + pathName, function (err, file) {
            if (err) {
                throw err;
            }

            res.writeHead(200);
            res.end(file);
        });
    } else if (pathName == "/queryHandle.js") {
        // Handle query and response results
        let queryData = url.parse(req.url, true).query;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        if (typeof queryData.query != 'undefined' && queryData.query) {
            res.end("Server: hi");
        } else
            res.end("Server: There is no query in your request!!!");
    } else {
        res.writeHead(404);
        res.end();
    }
});


//--------------------------------------------------------
/**
 * Start server
 */
server.listen(port, hostname, () => {
    console.log("* Server running at http://" + hostname + ":" + port + "/");
});