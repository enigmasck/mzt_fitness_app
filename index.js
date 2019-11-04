'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

//Configuration database
const mongoose   = require('mongoose');
const dbConfig   = require ('./config/database.config.js');

mongoose.Promise = global.Promise;

//Connecting to database
mongoose.connect(dbConfig.url, {
	useUnifiedTopology: true
}).then(() => {
	console.log("MongoDB connection success.");
}).catch( err => {
	console.log('Could not connect to the database. Exiting now...', err);
});

var express = require('express')();
var bodyParser = require('body-parser');
var multer  = require('multer');
var app = require('connect')();
var cors = require('cors'); //to enable CORS and all requests (OPTIONS,POST,GET etc..)
app.use(express);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-datav
app.use(cors()); //to enable CORS and all requests (OPTIONS,POST,GET etc..)

var oas3Tools = require('oas3-tools');
var jsyaml = require('js-yaml');
var serverPort = 8080;

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

/*app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});*/


// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
oas3Tools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('CORS-enabled web server listening on port: %d', serverPort);
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
