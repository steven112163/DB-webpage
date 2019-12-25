/**
 * @file A simple Node.js server for handling queries
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
const files = ["/interactionHandle.js", "/mystyle.css", "/images/bgimg-0.png",
    "/images/bgimg-1.png", "/images/bgimg-2.png", "/images/bgimg-3.png",
    "/images/bgimg-4.png", "/images/bgimg-5.png", "/images/bgimg-6.png",
    "/images/bgimg-7.png", "/images/bgimg-8.jpg", "/images/bgimg-9.png"];


//--------------------------------------------------------
/**
 * Construct database connection
 */
const con = mysql.createConnection({
    host: "localhost",
    user: "webuser",
    password: "!MyPassword123",
    database: "IDB"
});


//--------------------------------------------------------
/**
 * Test database connection
 */
con.connect(function (err) {
    if (err)
        throw err;
    console.log("* Database connected");
    console.log("* Use Ctrl+c to terminate server\n");
});


//--------------------------------------------------------
/**
 * Construct server
 */
const server = http.createServer(function (req, res) {
    let pathName = url.parse(req.url, true).pathname;
    console.log("* Get: " + pathName);

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
            if (err)
                throw err;

            res.writeHead(200);
            res.end(file);
        });
    } else if (pathName == "/queryHandle.js") {
        // Handle query and response results
        let queryData = url.parse(req.url, true).query;
        let query = queryData.query;
        let problemNum = queryData.problemNumber;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        if (typeof query != 'undefined' && query && typeof problemNum != 'undefined' && problemNum) {
            console.log("* Retrieving data of problem " + problemNum + " from database...");
            con.query(query, function (err, result) {
                if (err)
                    throw err;
                res.end(JSON.stringify(result));
                console.log("** Data transmitted\n");
            });
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