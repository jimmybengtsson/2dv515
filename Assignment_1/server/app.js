'use strict';

// Import NPM-modules
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

// Import files
let genDataSet = require('./src/controllers/GenerateDataSet');

// Generate a new item-based dataset every 5 minutes
genDataSet.itemBased();
setInterval(() => {
  genDataSet.itemBased();
}, 300000);

// Instantiate a new express-server on port 8000
let app = express();
let port = process.env.PORT || 8000;

// Use middlewares for express
app.use(bodyParser.json());
app.use(cors());

// Import express-routes and startthem
let routes = require('./src/routes/Routes.js');
routes(app);

// Start express-server
app.listen(port, () => {
  console.log('API server started on: ' + port);
});
