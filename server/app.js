var express = require("express"); // require express.js
var db = require("./db"); // require our database (index.js)

// Middleware
var morgan = require("morgan"); // includes a few fancy methods for logging
var parser = require("body-parser"); // Cool thing Beth showed us...

// Router
var router = require("./routes.js"); // all our express.Router() routes

var app = express(); // invoke express
module.exports.app = app; // add app to exports

// Set what we are listening on.
app.set("port", 3000);

// Logging and parsing
app.use(morgan("dev")); // our logs will be concise and colorful for development
app.use(parser.json()); // returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option
// a new body object containing the the parsed data is populated on the request object of the middleware.

// Set up our routes
app.use("/classes", router);

// Serve the client files
app.use(express.static(__dirname + "/../client"));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}
